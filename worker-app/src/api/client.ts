/**
 * HTTP client gọi backend FastAPI (THỢ NHANH API).
 * - Tự gắn token, timeout 15 giây
 * - Đổi lỗi của FastAPI/Pydantic thành câu tiếng Việt để hiển thị
 * - Backend luôn bọc dữ liệu: { success, message, data } -> trả về data (kèm message nếu cần)
 */
import { Platform } from 'react-native';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import { apiUrl } from '../config/env';

const TIMEOUT_MS = 15000;
const UPLOAD_TIMEOUT_MS = 60000;

let token: string | null = null;
let onUnauthorized: (() => void) | null = null;

export function setToken(t: string | null) {
  token = t;
}

export function getToken() {
  return token;
}

export function setOnUnauthorized(cb: (() => void) | null) {
  onUnauthorized = cb;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function errorMessage(body: unknown, status: number): string {
  const detail = (body as { detail?: unknown } | null)?.detail;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail) && detail.length) {
    const first = detail[0] as { msg?: string; loc?: (string | number)[] };
    const msg = String(first?.msg ?? '').replace(/^Value error,\s*/i, '');
    const field = Array.isArray(first?.loc) ? first.loc[first.loc.length - 1] : '';
    if (/[À-ỹ]/.test(msg)) return msg;
    const FIELD: Record<string, string> = {
      email: 'Email',
      password: 'Mật khẩu',
      new_password: 'Mật khẩu mới',
      phone: 'Số điện thoại',
      full_name: 'Họ tên',
      amount: 'Số tiền',
      account_number: 'Số tài khoản',
      code: 'Mã xác nhận',
    };
    if (/valid email/i.test(msg)) return 'Email không hợp lệ';
    if (/at least (\d+)/i.test(msg)) return `${FIELD[String(field)] ?? field}: tối thiểu ${msg.match(/at least (\d+)/i)![1]} ký tự`;
    if (/should match pattern/i.test(msg)) return `${FIELD[String(field)] ?? field} không đúng định dạng`;
    return field ? `${FIELD[String(field)] ?? field}: ${msg}` : msg;
  }
  if (status === 413) return 'Ảnh quá lớn';
  if (status >= 500) return 'Máy chủ đang gặp sự cố, vui lòng thử lại sau';
  return `Lỗi ${status}`;
}

type Query = Record<string, string | number | boolean | null | undefined>;

export type ApiResult<T> = { data: T; message: string };

async function raw<T>(method: string, path: string, body?: unknown, query?: Query, timeout = TIMEOUT_MS, isForm = false): Promise<ApiResult<T>> {
  const base = apiUrl();
  let url = base + path;
  if (query) {
    const qs = Object.entries(query)
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
      .join('&');
    if (qs) url += `?${qs}`;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body !== undefined && !isForm ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body === undefined ? undefined : isForm ? (body as FormData) : JSON.stringify(body),
      signal: controller.signal,
      credentials: 'omit',
    });
  } catch {
    throw new ApiError(controller.signal.aborted ? 'Máy chủ phản hồi quá lâu, vui lòng thử lại.' : networkMessage(base), 0);
  } finally {
    clearTimeout(timer);
  }

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    if (res.status === 401 && token && onUnauthorized) onUnauthorized();
    throw new ApiError(errorMessage(json, res.status), res.status);
  }
  return { data: (json?.data ?? null) as T, message: json?.message ?? 'OK' };
}

async function request<T>(method: string, path: string, body?: unknown, query?: Query): Promise<T> {
  return (await raw<T>(method, path, body, query)).data;
}

export const http = {
  get: <T>(path: string, query?: Query) => request<T>('GET', path, undefined, query),
  post: <T>(path: string, body?: unknown) => request<T>('POST', path, body ?? {}),
  patch: <T>(path: string, body?: unknown) => request<T>('PATCH', path, body ?? {}),
  put: <T>(path: string, body?: unknown) => request<T>('PUT', path, body ?? {}),
  del: <T>(path: string) => request<T>('DELETE', path),
  /** Giữ cả câu thông báo của server (VD "Đã xác nhận thu 370.000đ tiền mặt") */
  postWithMessage: <T>(path: string, body?: unknown) => raw<T>('POST', path, body ?? {}),
};

function networkMessage(base: string) {
  return `Không kết nối được máy chủ (${base}). Kiểm tra mạng / địa chỉ máy chủ.`;
}

/** Ảnh chọn từ máy (expo-image-picker) */
export type LocalImage = {
  uri: string;
  mimeType?: string | null;
  fileName?: string | null;
  file?: Blob | null;
  width?: number;
  height?: number;
};

/** Cạnh dài tối đa của ảnh gửi lên: đủ rõ để xem giấy tờ / hiện trạng, nhẹ (~300–600 KB) để gửi nhanh bằng 4G */
const MAX_SIDE = 1600;

/**
 * Thu nhỏ + nén ảnh trước khi gửi. Camera điện thoại bây giờ chụp 50–200 MP (5–15 MB/ảnh):
 * gửi nguyên ảnh vừa chậm, vừa vượt giới hạn 8 MB của máy chủ. Lỗi khi thu nhỏ thì gửi ảnh gốc.
 */
async function shrink(img: LocalImage): Promise<LocalImage> {
  try {
    const ctx = ImageManipulator.manipulate(img.uri);
    const w = img.width ?? 0;
    const h = img.height ?? 0;
    if (w && h && Math.max(w, h) > MAX_SIDE) ctx.resize(w >= h ? { width: MAX_SIDE } : { height: MAX_SIDE });
    const ref = await ctx.renderAsync();
    const out = await ref.saveAsync({ compress: 0.72, format: SaveFormat.JPEG });
    return { uri: out.uri, mimeType: 'image/jpeg', fileName: `photo-${Date.now()}.jpg`, file: null, width: out.width, height: out.height };
  } catch {
    return img;
  }
}

/**
 * Gửi multipart bằng XMLHttpRequest của React Native.
 * Từ Expo SDK 54, `fetch` toàn cục là `expo/fetch` — không gửi được tệp dạng { uri } trong FormData
 * (báo lỗi trước cả khi kết nối). XMLHttpRequest vẫn đọc tệp từ uri và gửi bằng mạng gốc của máy.
 */
function xhrPost(path: string, form: FormData, timeout: number): Promise<{ status: number; body: unknown }> {
  const base = apiUrl();
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', base + path);
    xhr.setRequestHeader('Accept', 'application/json');
    if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.timeout = timeout;
    xhr.onload = () => {
      let body: unknown = null;
      try {
        body = JSON.parse(xhr.responseText);
      } catch {
        body = null;
      }
      resolve({ status: xhr.status, body });
    };
    xhr.onerror = () => reject(new ApiError(networkMessage(base), 0));
    xhr.ontimeout = () => reject(new ApiError('Mạng chậm, gửi ảnh quá lâu. Thử lại hoặc chọn ảnh khác.', 0));
    xhr.send(form);
  });
}

/** Tải ảnh lên POST /uploads, trả về URL công khai */
export async function uploadImage(original: LocalImage): Promise<string> {
  const img = await shrink(original);
  const form = new FormData();
  const name = img.fileName || `photo-${Date.now()}.jpg`;
  const type = img.mimeType || 'image/jpeg';
  if (Platform.OS === 'web') {
    const blob = img.file ?? (await (await fetch(img.uri)).blob());
    form.append('file', blob, name);
    const res = await raw<{ url: string }>('POST', '/uploads', form, undefined, UPLOAD_TIMEOUT_MS, true);
    return res.data.url;
  }
  form.append('file', { uri: img.uri, name, type } as unknown as Blob);
  const { status, body } = await xhrPost('/uploads', form, UPLOAD_TIMEOUT_MS);
  if (status < 200 || status >= 300) {
    if (status === 401 && token && onUnauthorized) onUnauthorized();
    throw new ApiError(errorMessage(body, status), status);
  }
  return (body as { data: { url: string } }).data.url;
}

export function errMsg(e: unknown): string {
  if (e instanceof Error) return e.message;
  return 'Đã có lỗi xảy ra';
}
