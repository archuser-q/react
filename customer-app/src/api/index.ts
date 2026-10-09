/** Toàn bộ API mà app khách hàng dùng — mỗi hàm ứng với 1 endpoint backend */
import { http } from './client';
import type {
  Address,
  AppNotification,
  CatalogCategory,
  CatalogService,
  Complaint,
  Message,
  MyPayment,
  MyReview,
  OrderDetail,
  OrderGroup,
  OrderItem,
  Paginated,
  Payment,
  PaymentMethod,
  Review,
  Tracking,
  User,
  WorkerPublic,
} from './types';

export * from './types';
export { API_URL, ApiError, errMsg, setOnUnauthorized, setToken } from './client';

export const api = {
  // Auth
  login: (phone: string, password: string) =>
    http.post<{ access_token: string; token_type: string; user: User }>('/auth/login', { phone, password }),
  register: (data: { phone: string; password: string; full_name: string; email?: string | null }) =>
    http.post<User>('/auth/register', { ...data, role: 'customer' }),
  me: () => http.get<User>('/auth/me'),

  // Hồ sơ, địa chỉ
  updateProfile: (data: { full_name?: string; email?: string | null }) => http.patch<User>('/customer/profile', data),
  listAddresses: () => http.get<Address[]>('/customer/addresses'),
  createAddress: (data: {
    label?: string | null;
    address_line: string;
    latitude: number;
    longitude: number;
    is_default?: boolean;
  }) => http.post<Address>('/customer/addresses', data),
  updateAddress: (id: number, data: { label?: string | null; address_line?: string; is_default?: boolean }) =>
    http.patch<Address>(`/customer/addresses/${id}`, data),
  deleteAddress: (id: number) => http.del<null>(`/customer/addresses/${id}`),

  // Danh mục dịch vụ
  listCategories: () => http.get<CatalogCategory[]>('/catalog/categories'),
  listServices: (q?: { category_id?: number; keyword?: string }) => http.get<CatalogService[]>('/catalog/services', q),

  // Đơn hàng
  createOrder: (data: {
    service_id: number;
    address_id: number;
    description?: string | null;
    scheduled_at?: string | null;
    matching_mode?: 'instant' | 'batch';
  }) => http.post<OrderDetail>('/customer/orders', data),
  listOrders: (q: { group?: OrderGroup; page?: number; page_size?: number } = {}) =>
    http.get<Paginated<OrderItem>>('/customer/orders', q),
  getOrder: (id: number) => http.get<OrderDetail>(`/customer/orders/${id}`),
  cancelOrder: (id: number, reason: string) =>
    http.patch<{ id: number; status: string }>(`/customer/orders/${id}/cancel`, { reason }),
  getTracking: (id: number) => http.get<Tracking>(`/customer/orders/${id}/tracking`),
  respondQuote: (orderId: number, quoteId: number, approve: boolean) =>
    http.post<{ id: number; status: string; total_amount: number | null }>(
      `/customer/orders/${orderId}/extra-quotes/${quoteId}/${approve ? 'approve' : 'reject'}`,
    ),
  getWorker: (id: number) => http.get<WorkerPublic>(`/customer/workers/${id}`),

  // Chat
  listMessages: (orderId: number, q?: { before_id?: number; limit?: number }) =>
    http.get<Message[]>(`/orders/${orderId}/messages`, q),
  sendMessage: (orderId: number, content: string) => http.post<Message>(`/orders/${orderId}/messages`, { content }),
  markMessagesRead: (orderId: number) => http.post<{ updated: number }>(`/orders/${orderId}/messages/read`),

  // Thanh toán
  createPayment: (orderId: number, method: PaymentMethod) =>
    http.post<Payment & { order_id: number; pay_url: string | null }>(`/customer/orders/${orderId}/payments`, { method }),
  sandboxConfirm: (paymentId: number) => http.post<Payment>(`/customer/payments/${paymentId}/sandbox-confirm`),
  listMyPayments: (q: { page?: number; page_size?: number } = {}) =>
    http.get<Paginated<MyPayment>>('/customer/payments', q),

  // Đánh giá, khiếu nại, bảo hành
  createReview: (orderId: number, rating: number, comment: string | null) =>
    http.post<Review>(`/customer/orders/${orderId}/review`, { rating, comment }),
  listMyReviews: (q: { page?: number; page_size?: number } = {}) =>
    http.get<Paginated<MyReview>>('/customer/reviews', q),
  createComplaint: (orderId: number, reason: string, description?: string | null) =>
    http.post<Complaint>(`/customer/orders/${orderId}/complaints`, { reason, description }),
  claimWarranty: (warrantyId: number, description: string) =>
    http.post<{ complaint: Complaint }>(`/customer/warranties/${warrantyId}/claim`, { description }),

  // Thông báo
  listNotifications: (q: { unread_only?: boolean; page?: number; page_size?: number } = {}) =>
    http.get<Paginated<AppNotification>>('/notifications', q),
  unreadCount: () => http.get<{ unread: number }>('/notifications/unread-count'),
  markNotificationRead: (id: number) => http.patch<AppNotification>(`/notifications/${id}/read`),
  markAllNotificationsRead: () => http.patch<{ updated: number }>('/notifications/read-all'),
};
