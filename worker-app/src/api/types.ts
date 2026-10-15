// Kiểu dữ liệu khớp schema backend (app/schemas/worker_app.py, auth.py, customer.py)
// Giờ trả về dạng "2026-10-07T14:20:00" — giờ Việt Nam, không kèm múi giờ.

export type Role = 'customer' | 'worker' | 'admin';

export type User = {
  id: number;
  phone: string | null;
  email: string | null;
  full_name: string;
  avatar_url: string | null;
  role: Role;
  status: string;
  created_at: string;
};

export type Paginated<T> = { items: T[]; total: number; page: number; page_size: number };

export type LoginResult = { access_token: string; token_type: string; user: User; is_new?: boolean };

export type ProvidersConfig = {
  google: { web_client_id: string | null; android_client_id: string | null; ios_client_id: string | null } | null;
  facebook: { app_id: string } | null;
  password_reset_by_email: boolean;
  smtp_configured: boolean;
};

// ---------- Hồ sơ ----------

export type DocType = 'id_card_front' | 'id_card_back' | 'portrait' | 'certificate';
export type DocStatus = 'pending' | 'approved' | 'rejected';
export type VerificationStatus = 'pending' | 'approved' | 'rejected';
export type Availability = 'online' | 'busy' | 'offline';

export type WorkerDocument = {
  id: number;
  worker_id: number;
  doc_type: DocType;
  file_url: string;
  status: DocStatus;
  reject_reason: string | null;
  uploaded_at: string;
  reviewed_at: string | null;
};

export type WorkerSkill = {
  service_id: number;
  name: string;
  category_id: number;
  category_name: string;
  base_price: number;
  unit: string | null;
};


export type BankAccount = { bank_name: string; account_number: string; account_holder: string; updated_at: string };

export type Onboarding = {
  verification_status: VerificationStatus;
  submitted_at: string | null;
  has_phone: boolean;
  has_skills: boolean;
  documents: Record<DocType, DocStatus | null>;
  reject_reasons: string[];
  missing: string[];
  can_submit: boolean;
};

export type WorkerMe = {
  user: User;
  profile: {
    bio: string | null;
    experience_years: number;
    service_radius_km: number;
    availability: Availability;
    verification_status: VerificationStatus;
    trust_score: number;
    review_count: number;
    completed_orders: number;
    rating_avg: number | null;
    current_latitude: number | null;
    current_longitude: number | null;
    location_updated_at: string | null;
    submitted_at: string | null;
    level: WorkerLevel;
  };
  skills: WorkerSkill[];
  documents: WorkerDocument[];
  bank_account: BankAccount | null;
  onboarding: Onboarding;
  settings: {
    commission_rate: number;
    min_withdrawal: number;
    wallet_debt_limit: number;
    location_max_age_minutes: number;
    warranty_days: number;
  };
};

// ---------- Đơn ----------

export type OrderStatus =
  | 'pending'
  | 'matched'
  | 'accepted'
  | 'on_the_way'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type Offer = {
  id: number;
  order_id: number;
  status: string;
  round: number;
  mode: 'instant' | 'batch' | null;
  sent_at: string;
  expires_at: string | null;
  expires_in_seconds: number;
  timeout_seconds: number;
  match_score: number | null;
  distance_km: number | null;
  service_id: number;
  service_name: string;
  category_name: string;
  description: string | null;
  image_urls: string[];
  address_line: string;
  latitude: number;
  longitude: number;
  scheduled_at: string | null;
  estimated_price: number | null;
  estimated_earning: number | null;
  commission_rate: number;
  customer_name: string;
};

export type JobItem = {
  id: number;
  status: OrderStatus;
  service_name: string;
  category_name: string;
  address_line: string;
  latitude: number;
  longitude: number;
  scheduled_at: string | null;
  created_at: string;
  accepted_at: string | null;
  completed_at: string | null;
  estimated_price: number | null;
  final_price: number | null;
  total_amount: number | null;
  customer_name: string;
  paid: boolean;
  payment_method: 'cash' | 'momo' | 'vnpay' | null;
  net_earning: number | null;
  unread_messages: number;
  /** Số sao khách đánh giá (đơn đã hoàn thành) */
  rating?: number | null;
};

export type JobPhoto = { id: number; kind: 'before' | 'after'; url: string; created_at: string };
export type JobQuote = {
  id: number;
  description: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  created_at: string;
  responded_at: string | null;
};
export type JobPayment = {
  id: number;
  amount: number;
  method: 'cash' | 'momo' | 'vnpay';
  status: 'pending' | 'success' | 'failed' | 'refunded';
  transaction_code: string | null;
  created_at: string;
  paid_at: string | null;
};

export type JobDetail = JobItem & {
  service_id: number;
  description: string | null;
  image_urls: string[];
  cancel_reason: string | null;
  customer: { id: number; full_name: string; phone: string | null; avatar_url: string | null };
  distance_km: number | null;
  history: { status: OrderStatus; created_at: string }[];
  photos: JobPhoto[];
  extra_quotes: JobQuote[];
  payments: JobPayment[];
  review: { rating: number; comment: string | null; created_at: string } | null;
  warranty: { terms: string | null; start_date: string; end_date: string; status: string } | null;
  earning: { gross_amount: number; commission_amount: number; net_amount: number } | null;
  estimated_earning: number | null;
  next_status: OrderStatus | null;
  next_action: string | null;
  can_cancel: boolean;
  cancel_requeues: boolean;
  can_quote: boolean;
  can_add_photos: boolean;
  can_confirm_cash: boolean;
  can_chat: boolean;
  can_report: boolean;
  needs_after_photo: boolean;
  needs_safety_check: boolean;
  safety_checked_at: string | null;
  /** Đơn hẹn trước còn xa giờ hẹn: lúc sớm nhất được bắt đầu di chuyển (null = đi được ngay) */
  start_available_at: string | null;
  has_pending_quote: boolean;
  amount_to_collect: number | null;
};

export type JobGroup = 'active' | 'completed' | 'cancelled' | 'history';

export type HomeData = {
  availability: Availability;
  verification_status: VerificationStatus;
  can_go_online: boolean;
  blockers: string[];
  location_fresh: boolean;
  today: { completed: number; net_income: number; gross_income: number };
  rating_avg: number | null;
  review_count: number;
  trust_score: number;
  wallet_balance: number;
  wallet_restricted: boolean;
  current_offer: Offer | null;
  active_job: JobItem | null;
  upcoming: JobItem[];
  unread_notifications: number;
  matching_mode: 'instant' | 'batch';
  location: { latitude: number; longitude: number; updated_at: string | null } | null;
  service_radius_km: number;
  level: WorkerLevel;
  week: { completed: number; net_income: number; gross_income: number };
};

export type WorkerLevel = {
  key: 'dong' | 'bac' | 'vang' | 'kim_cuong';
  name: string;
  completed: number;
  next_name: string | null;
  next_jobs: number | null;
  next_rating: number | null;
  progress: number;
};

// ---------- Thu nhập, ví ----------

export type Period = 'today' | 'week' | 'month';

export type EarningSummary = {
  period: Period;
  label: string;
  start: string;
  end: string;
  totals: {
    orders: number;
    gross: number;
    commission: number;
    net: number;
    cash_collected: number;
    online_received: number;
    avg_net_per_order: number;
  };
  previous_net: number;
  change_percent: number | null;
  chart: { key: string; label: string; net: number; orders: number }[];
  unpaid_orders: number;
  unpaid_amount: number;
};

export type EarningItem = {
  order_id: number;
  service_name: string;
  gross_amount: number;
  commission_amount: number;
  net_amount: number;
  payment_method: string | null;
  created_at: string;
};

export type WalletTx = {
  id: number;
  type: 'earning' | 'commission' | 'withdrawal' | 'withdrawal_refund' | 'topup' | 'adjustment';
  amount: number;
  description: string | null;
  order_id: number | null;
  created_at: string;
};

export type Wallet = {
  balance: number;
  available_for_withdrawal: number;
  debt_limit: number;
  restricted: boolean;
  min_withdrawal: number;
  pending_withdrawal: number;
  bank_account: BankAccount | null;
  recent: WalletTx[];
};

export type Withdrawal = {
  id: number;
  amount: number;
  bank_name: string;
  account_number: string;
  account_holder: string;
  status: 'pending' | 'completed' | 'rejected';
  transaction_code: string | null;
  note: string | null;
  created_at: string;
  processed_at: string | null;
};

// ---------- Đánh giá, hiệu suất ----------

export type Review = {
  id: number;
  order_id: number;
  rating: number;
  comment: string | null;
  customer_name: string;
  service_name: string;
  created_at: string;
};

export type ReviewsPage = Paginated<Review> & {
  summary: { rating_avg: number | null; review_count: number; distribution: Record<string, number> };
};

export type Performance = {
  period_days: number;
  offers_received: number;
  offers_accepted: number;
  offers_rejected: number;
  offers_expired: number;
  acceptance_rate: number | null;
  jobs_completed: number;
  jobs_cancelled_by_worker: number;
  completion_rate: number | null;
  rating_avg: number | null;
  review_count: number;
  trust_score: number;
  total_completed: number;
  total_net: number;
};

// ---------- Khác ----------

export type CatalogCategory = {
  id: number;
  parent_id: number | null;
  name: string;
  description: string | null;
  icon_url: string | null;
  services_count: number;
};

export type CatalogService = {
  id: number;
  category_id: number;
  name: string;
  description: string | null;
  base_price: number;
  unit: string | null;
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

export type AppNotification = {
  id: number;
  title: string;
  body: string | null;
  type: string | null;
  reference_id: number | null;
  is_read: boolean;
  created_at: string;
};

export type Report = {
  id: number;
  order_id: number;
  reason: string;
  description: string | null;
  status: 'open' | 'processing' | 'resolved' | 'rejected';
  resolution: string | null;
  created_at: string;
  resolved_at: string | null;
};
