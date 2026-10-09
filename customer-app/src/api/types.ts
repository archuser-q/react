// Kiểu dữ liệu khớp với schema của backend (app/schemas/customer.py, user.py)
// Giờ trả về dạng "2026-10-07T14:20:00" — giờ Việt Nam, không kèm múi giờ.

export type User = {
  id: number;
  phone: string;
  email: string | null;
  full_name: string;
  avatar_url: string | null;
  role: 'customer' | 'worker' | 'admin';
  status: string;
  created_at: string;
};

export type Paginated<T> = { items: T[]; total: number; page: number; page_size: number };

export type CatalogService = {
  id: number;
  category_id: number;
  name: string;
  description: string | null;
  base_price: number;
  unit: string | null;
};

export type CatalogCategory = {
  id: number;
  parent_id: number | null;
  name: string;
  description: string | null;
  icon_url: string | null;
  services_count: number;
};

export type Address = {
  id: number;
  label: string | null;
  address_line: string;
  latitude: number;
  longitude: number;
  is_default: boolean;
  created_at: string;
};

export type OrderStatus =
  | 'pending'
  | 'matched'
  | 'accepted'
  | 'on_the_way'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type OrderGroup = 'active' | 'completed' | 'cancelled';

export type WorkerBrief = {
  id: number;
  full_name: string;
  phone: string;
  avatar_url: string | null;
  trust_score: number; // 0..1
  review_count: number;
  completed_orders: number;
};

export type OrderItem = {
  id: number;
  status: OrderStatus;
  service_name: string;
  category_name: string;
  address_line: string;
  scheduled_at: string | null;
  estimated_price: number | null;
  final_price: number | null;
  worker: WorkerBrief | null;
  created_at: string;
  completed_at: string | null;
};

export type ExtraQuote = {
  id: number;
  description: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  responded_at: string | null;
};

export type PaymentMethod = 'cash' | 'momo' | 'vnpay';

export type Payment = {
  id: number;
  amount: number;
  method: PaymentMethod;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  transaction_code: string | null;
  created_at: string;
  paid_at: string | null;
};

export type Review = { id: number; rating: number; comment: string | null; created_at: string };

export type Warranty = {
  id: number;
  order_id: number;
  terms: string | null;
  start_date: string;
  end_date: string;
  status: 'active' | 'claimed' | 'expired';
};

export type OrderDetail = OrderItem & {
  service_id: number;
  latitude: number;
  longitude: number;
  description: string | null;
  image_urls: string[];
  matching_mode: 'instant' | 'batch' | null;
  cancel_reason: string | null;
  accepted_at: string | null;
  total_amount: number | null;
  history: { status: OrderStatus; created_at: string }[];
  extra_quotes: ExtraQuote[];
  payments: Payment[];
  review: Review | null;
  warranty: Warranty | null;
  can_cancel: boolean;
  can_pay: boolean;
  can_review: boolean;
};

export type Tracking = {
  order_id: number;
  status: OrderStatus;
  destination_latitude: number;
  destination_longitude: number;
  worker_latitude: number | null;
  worker_longitude: number | null;
  location_updated_at: string | null;
};

export type Message = {
  id: number;
  sender_id: number;
  is_mine: boolean;
  content: string | null;
  image_url: string | null;
  is_read: boolean;
  created_at: string;
};

export type WorkerPublic = {
  id: number;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  experience_years: number;
  trust_score: number;
  review_count: number;
  completed_orders: number;
  services: string[];
  recent_reviews: { rating: number; comment: string | null; customer_name: string; created_at: string }[];
};

export type MyReview = {
  id: number;
  order_id: number;
  worker_id: number;
  worker_name: string;
  service_name: string;
  rating: number;
  comment: string | null;
  created_at: string;
};

export type MyPayment = Payment & { order_id: number; service_name: string };

export type Complaint = {
  id: number;
  order_id: number;
  reason: string;
  description: string | null;
  status: 'open' | 'processing' | 'resolved' | 'rejected';
  resolution: string | null;
  created_at: string;
  resolved_at: string | null;
};

export type AppNotification = {
  id: number;
  title: string;
  body: string | null;
  type: string | null;
  reference_id: number | null;
  is_read: boolean;
  created_at: string;
};
