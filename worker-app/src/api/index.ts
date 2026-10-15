/** Toàn bộ API mà App Thợ dùng — mỗi hàm ứng với 1 endpoint backend */
import { http, uploadImage } from './client';
import type {
  AppNotification,
  Availability,
  BankAccount,
  CatalogCategory,
  CatalogService,
  DocType,
  EarningItem,
  EarningSummary,
  HomeData,
  JobDetail,
  JobGroup,
  JobItem,
  LoginResult,
  Message,
  Offer,
  Paginated,
  Performance,
  Period,
  ProvidersConfig,
  Report,
  ReviewsPage,
  User,
  Wallet,
  WalletTx,
  WorkerDocument,
  WorkerMe,
  WorkerSkill,
  Withdrawal,
} from './types';

export * from './types';
export { ApiError, errMsg, getToken, setOnUnauthorized, setToken, uploadImage } from './client';
export type { LocalImage } from './client';

const ROLE = 'worker' as const;

export const api = {
  // ---------- Đăng nhập ----------
  login: (identifier: string, password: string) =>
    http.post<LoginResult>('/auth/login', { identifier: identifier.trim(), password, role: ROLE }),
  register: (data: { full_name: string; email: string; password: string; phone?: string | null }) =>
    http.post<User>('/auth/register', { ...data, email: data.email.trim(), role: ROLE }),
  me: () => http.get<User>('/auth/me'),
  providers: () => http.get<ProvidersConfig>('/auth/providers'),
  google: (token: { id_token?: string; access_token?: string }) => http.post<LoginResult>('/auth/google', { ...token, role: ROLE }),
  facebook: (accessToken: string) => http.post<LoginResult>('/auth/facebook', { access_token: accessToken, role: ROLE }),
  forgotPassword: (email: string) =>
    http.postWithMessage<{ debug_code?: string } | null>('/auth/forgot-password', { email: email.trim() }),
  resetPassword: (email: string, code: string, newPassword: string) =>
    http.post<null>('/auth/reset-password', { email: email.trim(), code, new_password: newPassword }),
  changePassword: (oldPassword: string | null, newPassword: string) =>
    http.post<null>('/auth/change-password', { old_password: oldPassword, new_password: newPassword }),

  // ---------- Hồ sơ & xác minh ----------
  workerMe: () => http.get<WorkerMe>('/worker/me'),
  updateProfile: (data: {
    full_name?: string;
    phone?: string;
    avatar_url?: string | null;
    bio?: string | null;
    experience_years?: number;
    service_radius_km?: number;
  }) => http.patch<WorkerMe>('/worker/profile', data),
  setServices: (serviceIds: number[]) => http.put<WorkerSkill[]>('/worker/services', { service_ids: serviceIds }),
  addDocument: (docType: DocType, fileUrl: string) =>
    http.post<WorkerDocument>('/worker/documents', { doc_type: docType, file_url: fileUrl }),
  deleteDocument: (id: number) => http.del<null>(`/worker/documents/${id}`),
  submitVerification: () => http.post<WorkerMe>('/worker/verification/submit'),
  setBankAccount: (data: { bank_name: string; account_number: string; account_holder: string }) =>
    http.put<BankAccount>('/worker/bank-account', data),

  // ---------- Nhận đơn ----------
  home: () => http.get<HomeData>('/worker/home'),
  setAvailability: (online: boolean, coords?: { latitude: number; longitude: number } | null) =>
    http.patch<{ availability: Availability; location_fresh: boolean }>('/worker/availability', { online, ...(coords ?? {}) }),
  updateLocation: (latitude: number, longitude: number) => http.patch<unknown>('/worker/location', { latitude, longitude }),
  currentOffer: () => http.get<Offer | null>('/worker/offers/current'),
  acceptOffer: (offerId: number) => http.post<JobDetail>(`/worker/offers/${offerId}/accept`),
  rejectOffer: (offerId: number, reason?: string | null) => http.post<null>(`/worker/offers/${offerId}/reject`, { reason: reason ?? null }),

  // ---------- Đơn của tôi ----------
  jobs: (group: JobGroup, page = 1, pageSize = 20) =>
    http.get<Paginated<JobItem>>('/worker/orders', { group, page, page_size: pageSize }),
  job: (id: number) => http.get<JobDetail>(`/worker/orders/${id}`),
  advance: (id: number, status: string, safetyConfirmed = false) =>
    http.postWithMessage<JobDetail>(`/worker/orders/${id}/status`, { status, safety_confirmed: safetyConfirmed }),
  cancelJob: (id: number, reason: string) =>
    http.postWithMessage<{ id: number; status: string }>(`/worker/orders/${id}/cancel`, { reason }),
  addPhotos: (id: number, kind: 'before' | 'after', urls: string[]) =>
    http.post<JobDetail>(`/worker/orders/${id}/photos`, { kind, urls }),
  deletePhoto: (id: number, photoId: number) => http.del<JobDetail>(`/worker/orders/${id}/photos/${photoId}`),
  createQuote: (id: number, description: string, amount: number) =>
    http.post<JobDetail>(`/worker/orders/${id}/extra-quotes`, { description, amount }),
  cancelQuote: (id: number, quoteId: number) => http.post<JobDetail>(`/worker/orders/${id}/extra-quotes/${quoteId}/cancel`),
  confirmCash: (id: number) => http.postWithMessage<JobDetail>(`/worker/orders/${id}/confirm-cash`),
  report: (id: number, reason: string, description?: string | null) =>
    http.post<Report>(`/worker/orders/${id}/report`, { reason, description: description || null }),
  reports: (page = 1) => http.get<Paginated<Report>>('/worker/reports', { page, page_size: 20 }),

  // ---------- Thu nhập & ví ----------
  earningsSummary: (period: Period) => http.get<EarningSummary>('/worker/earnings/summary', { period }),
  earnings: (page = 1, pageSize = 20) => http.get<Paginated<EarningItem>>('/worker/earnings', { page, page_size: pageSize }),
  wallet: () => http.get<Wallet>('/worker/wallet'),
  walletTransactions: (page = 1) => http.get<Paginated<WalletTx>>('/worker/wallet/transactions', { page, page_size: 30 }),
  withdraw: (amount: number) => http.postWithMessage<Withdrawal>('/worker/wallet/withdrawals', { amount }),
  withdrawals: (page = 1) => http.get<Paginated<Withdrawal>>('/worker/wallet/withdrawals', { page, page_size: 20 }),
  topup: (amount: number, method: 'momo' | 'vnpay') => http.post<Wallet>('/worker/wallet/topup', { amount, method }),

  // ---------- Đánh giá & hiệu suất ----------
  reviews: (rating: number | null, page = 1) =>
    http.get<ReviewsPage>('/worker/reviews', { rating: rating ?? undefined, page, page_size: 20 }),
  performance: () => http.get<Performance>('/worker/performance'),

  // ---------- Danh mục dịch vụ ----------
  categories: () => http.get<CatalogCategory[]>('/catalog/categories'),
  services: () => http.get<CatalogService[]>('/catalog/services'),

  // ---------- Chat ----------
  messages: (orderId: number, beforeId?: number) =>
    http.get<Message[]>(`/orders/${orderId}/messages`, { before_id: beforeId, limit: 50 }),
  sendMessage: (orderId: number, content: string | null, imageUrl?: string | null) =>
    http.post<Message>(`/orders/${orderId}/messages`, { content, image_url: imageUrl ?? null }),
  markMessagesRead: (orderId: number) => http.post<{ updated: number }>(`/orders/${orderId}/messages/read`),

  // ---------- Thông báo ----------
  notifications: (page = 1) => http.get<Paginated<AppNotification>>('/notifications', { page, page_size: 30 }),
  unreadCount: () => http.get<{ unread: number }>('/notifications/unread-count'),
  markNotificationRead: (id: number) => http.patch<AppNotification>(`/notifications/${id}/read`),
  markAllNotificationsRead: () => http.patch<{ updated: number }>('/notifications/read-all'),
  registerDevice: (token: string, platform: 'android' | 'ios' | 'web') =>
    http.post<null>('/notifications/device-tokens', { token, platform }),
  removeDevice: (token: string) => http.del<null>(`/notifications/device-tokens/${encodeURIComponent(token)}`),

  upload: uploadImage,
};

/** Khoá cache cho TanStack Query */
export const qk = {
  me: ['me'] as const,
  home: ['home'] as const,
  offer: ['offer'] as const,
  jobs: (group: JobGroup) => ['jobs', group] as const,
  job: (id: number) => ['job', id] as const,
  messages: (id: number) => ['messages', id] as const,
  earnings: (period: Period) => ['earnings', period] as const,
  earningItems: ['earningItems'] as const,
  wallet: ['wallet'] as const,
  walletTx: ['walletTx'] as const,
  withdrawals: ['withdrawals'] as const,
  reviews: (rating: number | null) => ['reviews', rating] as const,
  performance: ['performance'] as const,
  notifications: ['notifications'] as const,
  unread: ['unread'] as const,
  catalog: ['catalog'] as const,
  reports: ['reports'] as const,
  providers: ['providers'] as const,
};
