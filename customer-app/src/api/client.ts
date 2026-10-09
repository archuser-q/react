/**
 * HTTP client gọi backend FastAPI (THỢ NHANH API).
 *
 * Địa chỉ backend đặt trong file .env ở gốc project:
 *   EXPO_PUBLIC_API_URL=http://192.168.1.10:8000/api/v1
 * (điện thoại thật phải dùng IP LAN của máy chạy backend, không dùng localhost)
 */

export const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:8000/api/v1').replace(/\/+$/, '');

const TIMEOUT_MS = 15000;

let token: string | null = null;
let onUnauthorized: (() => void) | null = null;

export function setToken(t: string | null) {
  token = t;
}

/** Gọi khi token hết hạn / tài khoản bị khoá (AuthContext đăng ký để tự đăng xuất) */
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

/** Lấy câu báo lỗi từ response của FastAPI */
function errorMessage(body: any, status: number): string {
  const detail = body?.detail;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail) && detail.length) {
    // Lỗi validate của Pydantic: [{loc, msg}]
    const first = detail[0];
    const msg = String(first?.msg ?? '').replace(/^Value error,\s*/i, '');
    const field = Array.isArray(first?.loc) ? first.loc[first.loc.length - 1] : '';
    // Câu tiếng Việt do backend tự viết thì hiện thẳng, câu tiếng Anh của Pydantic thì kèm tên trường
    return field && !/[À-ỹ]/.test(msg) ? `${field}: ${msg}` : msg;
  }
  if (status >= 500) return 'Máy chủ đang gặp sự cố, vui lòng thử lại sau';
  return `Lỗi ${status}`;
}

type Query = Record<string, string | number | boolean | null | undefined>;

async function request<T>(method: string, path: string, body?: unknown, query?: Query): Promise<T> {
  let url = API_URL + path;
  if (query) {
    const qs = Object.entries(query)
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
      .join('&');
    if (qs) url += `?${qs}`;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch {
    throw new ApiError(`Không kết nối được máy chủ (${API_URL})`, 0);
  } finally {
    clearTimeout(timer);
  }

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    if (res.status === 401 && token && onUnauthorized) onUnauthorized();
    throw new ApiError(errorMessage(json, res.status), res.status);
  }
  // Backend luôn bọc: { success, message, data }
  return (json?.data ?? null) as T;
}

export const http = {
  get: <T>(path: string, query?: Query) => request<T>('GET', path, undefined, query),
  post: <T>(path: string, body?: unknown) => request<T>('POST', path, body ?? {}),
  patch: <T>(path: string, body?: unknown) => request<T>('PATCH', path, body ?? {}),
  del: <T>(path: string) => request<T>('DELETE', path),
};

/** Lấy câu báo lỗi để hiện Alert */
export function errMsg(e: unknown): string {
  if (e instanceof Error) return e.message;
  return 'Đã có lỗi xảy ra';
}
