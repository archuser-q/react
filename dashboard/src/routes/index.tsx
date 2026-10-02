import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: AdminDashboard,
})

import {
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import {
  Home,
  ClipboardList,
  MessageSquare,
  User,
  Wallet,
  Zap,
  ChevronRight,
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  Shield,
  CheckCircle,
  Phone,
  Send,
  Bell,
  Search,
  AlertCircle,
  Navigation,
  TrendingUp,
  Award,
  Calendar,
  Camera,
  DollarSign,
  X,
  Check,
  Activity,
  LayoutDashboard,
  BarChart2,
  Settings,
  Filter,
  Download,
  MoreHorizontal,
  TrendingDown,
  ToggleRight,
  CircleDot,
  Zap as ZapIcon,
  Plus,
  Sparkles,
  Timer,
  BadgeCheck,
  LogOut,
  HelpCircle,
  Gift,
  Banknote,
  FileText,
  Percent,
  Sliders,
  UserCheck,
  Users,
  ThumbsUp,
  Globe,
  CalendarDays,
  Map,
  Wrench,
  Eye,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// ── Theme System ──────────────────────────────────────────────────────────────

type Theme = {
  primary: string;
  primaryLight: string;
  primaryMuted: string;
  gradient: string;
};

const GREEN_THEME: Theme = {
  primary: "#059669",
  primaryLight: "#ECFDF5",
  primaryMuted: "#6EE7B7",
  gradient: "linear-gradient(135deg, #059669 0%, #10B981 100%)",
};

const BLUE_THEME: Theme = {
  primary: "#2563EB",
  primaryLight: "#EFF6FF",
  primaryMuted: "#93C5FD",
  gradient: "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)",
};

const ThemeCtx = createContext<Theme>(GREEN_THEME);
const useTheme = () => useContext(ThemeCtx);

function op(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "dan_dung",
    label: "Điện dân dụng",
    icon: Zap,
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
  {
    id: "lap_dat",
    label: "Lắp đặt điện",
    icon: Activity,
    color: "#3B82F6",
    bg: "#EFF6FF",
  },
  {
    id: "cau_dao",
    label: "Thay cầu dao",
    icon: ToggleRight,
    color: "#EF4444",
    bg: "#FEF2F2",
  },
  {
    id: "den_led",
    label: "Lắp đèn LED",
    icon: Sparkles,
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    id: "o_cam",
    label: "Lắp ổ cắm",
    icon: CircleDot,
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    id: "kiem_tra",
    label: "An toàn điện",
    icon: CheckCircle,
    color: "#0891B2",
    bg: "#ECFEFF",
  },
];

const MATCHED_WORKERS = [
  {
    id: 1,
    name: "Trần Minh Đức",
    specialty: "Điện dân dụng",
    experience: "8 năm",
    rating: 4.9,
    reviews: 312,
    distance: "1.2 km",
    eta: "8 phút",
    trust: 98,
    price: "350.000đ",
    orders: 1247,
    verified: true,
  },
  {
    id: 2,
    name: "Nguyễn Văn Bình",
    specialty: "Lắp đặt điện",
    experience: "5 năm",
    rating: 4.8,
    reviews: 198,
    distance: "2.1 km",
    eta: "13 phút",
    trust: 93,
    price: "320.000đ",
    orders: 876,
    verified: true,
  },
  {
    id: 3,
    name: "Lê Quang Minh",
    specialty: "Điện dân dụng",
    experience: "3 năm",
    rating: 4.7,
    reviews: 87,
    distance: "3.4 km",
    eta: "20 phút",
    trust: 88,
    price: "290.000đ",
    orders: 432,
    verified: false,
  },
];

const CHAT_MESSAGES = [
  {
    id: 1,
    from: "worker",
    text: "Chào anh/chị, em đang trên đường đến ạ. Khoảng 8 phút nữa em tới.",
    time: "14:12",
  },
  {
    id: 2,
    from: "customer",
    text: "OK bạn ơi, mình đang ở nhà. Chuông không kêu, bạn nhắn khi đến nhé.",
    time: "14:13",
  },
  {
    id: 3,
    from: "worker",
    text: "Dạ em sẽ nhắn ạ. Vấn đề điện là bị mất điện một phòng hay toàn nhà vậy anh/chị?",
    time: "14:13",
  },
  {
    id: 4,
    from: "customer",
    text: "Chỉ phòng bếp thôi bạn. Hôm qua còn dùng được.",
    time: "14:14",
  },
  {
    id: 5,
    from: "worker",
    text: "Dạ có thể do CB hoặc cầu chì ạ, em sẽ kiểm tra kỹ. Em đến rồi ạ 🙏",
    time: "14:20",
  },
];

const EARNINGS_DATA = [
  { day: "T2", amount: 420 },
  { day: "T3", amount: 680 },
  { day: "T4", amount: 290 },
  { day: "T5", amount: 750 },
  { day: "T6", amount: 930 },
  { day: "T7", amount: 1120 },
  { day: "CN", amount: 860 },
];

// ── Admin Data ────────────────────────────────────────────────────────────────

const revenueData = [
  { month: "T1", revenue: 48, orders: 312 },
  { month: "T2", revenue: 52, orders: 341 },
  { month: "T3", revenue: 61, orders: 398 },
  { month: "T4", revenue: 55, orders: 362 },
  { month: "T5", revenue: 73, orders: 471 },
  { month: "T6", revenue: 82, orders: 534 },
  { month: "T7", revenue: 78, orders: 508 },
  { month: "T8", revenue: 91, orders: 589 },
  { month: "T9", revenue: 88, orders: 572 },
];

const customerGrowthData = [
  { month: "T1", new: 45, total: 180 },
  { month: "T2", new: 62, total: 220 },
  { month: "T3", new: 78, total: 285 },
  { month: "T4", new: 55, total: 326 },
  { month: "T5", new: 91, total: 398 },
  { month: "T6", new: 103, total: 478 },
  { month: "T7", new: 88, total: 548 },
  { month: "T8", new: 120, total: 645 },
  { month: "T9", new: 97, total: 724 },
];

const serviceRevenueData = [
  { name: "Điện dân dụng", revenue: 37, color: "#F59E0B" },
  { name: "Lắp đặt điện", revenue: 28, color: "#3B82F6" },
  { name: "Thay cầu dao", revenue: 18, color: "#EF4444" },
  { name: "Lắp đèn LED", revenue: 10, color: "#8B5CF6" },
  { name: "Lắp ổ cắm", revenue: 7, color: "#10B981" },
];

const workerActivityData = [
  { time: "6h", active: 18, busy: 12 },
  { time: "8h", active: 42, busy: 31 },
  { time: "10h", active: 67, busy: 58 },
  { time: "12h", active: 55, busy: 49 },
  { time: "14h", active: 71, busy: 63 },
  { time: "16h", active: 83, busy: 74 },
  { time: "18h", active: 76, busy: 65 },
  { time: "20h", active: 41, busy: 33 },
];

const ratingDistribution = [
  { stars: "5★", count: 832, pct: 69 },
  { stars: "4★", count: 261, pct: 22 },
  { stars: "3★", count: 72, pct: 6 },
  { stars: "2★", count: 24, pct: 2 },
  { stars: "1★", count: 15, pct: 1 },
];

const districtData = [
  {
    district: "Cầu Giấy",
    orders: 187,
    revenue: "65.4tr",
    growth: 12,
  },
  {
    district: "Đống Đa",
    orders: 154,
    revenue: "53.9tr",
    growth: 8,
  },
  {
    district: "Hoàng Mai",
    orders: 132,
    revenue: "46.2tr",
    growth: 15,
  },
  {
    district: "Thanh Xuân",
    orders: 118,
    revenue: "41.3tr",
    growth: -3,
  },
  {
    district: "Hà Đông",
    orders: 97,
    revenue: "33.9tr",
    growth: 21,
  },
];

const customersData = [
  {
    id: "KH-001",
    name: "Nguyễn Thu Hà",
    phone: "0912 345 678",
    area: "Đống Đa",
    orders: 23,
    spent: "8.4tr",
    rating: 4.8,
    joined: "T1/2025",
    status: "vip",
  },
  {
    id: "KH-002",
    name: "Lê Thị Hoa",
    phone: "0934 567 890",
    area: "Cầu Giấy",
    orders: 15,
    spent: "5.1tr",
    rating: 4.6,
    joined: "T3/2025",
    status: "active",
  },
  {
    id: "KH-003",
    name: "Phạm Đức Thành",
    phone: "0956 789 012",
    area: "Hoàng Mai",
    orders: 8,
    spent: "2.8tr",
    rating: 4.3,
    joined: "T5/2025",
    status: "active",
  },
  {
    id: "KH-004",
    name: "Trần Thu Hương",
    phone: "0978 901 234",
    area: "Thanh Xuân",
    orders: 31,
    spent: "11.2tr",
    rating: 4.9,
    joined: "T8/2024",
    status: "vip",
  },
  {
    id: "KH-005",
    name: "Vũ Minh Khoa",
    phone: "0901 234 567",
    area: "Nam Từ Liêm",
    orders: 5,
    spent: "1.6tr",
    rating: 4.1,
    joined: "T7/2025",
    status: "new",
  },
  {
    id: "KH-006",
    name: "Bùi Thị Mai",
    phone: "0923 456 789",
    area: "Tây Hồ",
    orders: 18,
    spent: "6.3tr",
    rating: 4.7,
    joined: "T2/2025",
    status: "active",
  },
  {
    id: "KH-007",
    name: "Ngô Quang Vinh",
    phone: "0945 678 901",
    area: "Long Biên",
    orders: 12,
    spent: "4.1tr",
    rating: 4.4,
    joined: "T4/2025",
    status: "inactive",
  },
  {
    id: "KH-008",
    name: "Đinh Thị Nga",
    phone: "0967 890 123",
    area: "Hà Đông",
    orders: 9,
    spent: "3.2tr",
    rating: 4.2,
    joined: "T6/2025",
    status: "active",
  },
];

const workersData = [
  {
    id: "TH-001",
    name: "Trần Minh Đức",
    specialty: "Điện dân dụng",
    rating: 4.9,
    trust: 98,
    orders: 1247,
    revenue: "45.2tr",
    status: "active",
    joined: "T6/2024",
    verified: true,
  },
  {
    id: "TH-002",
    name: "Phạm Quốc Hùng",
    specialty: "Lắp đặt điện",
    rating: 4.8,
    trust: 95,
    orders: 1118,
    revenue: "38.9tr",
    status: "busy",
    joined: "T8/2024",
    verified: true,
  },
  {
    id: "TH-003",
    name: "Nguyễn Văn Bình",
    specialty: "Thay cầu dao",
    rating: 4.8,
    trust: 93,
    orders: 1103,
    revenue: "33.1tr",
    status: "active",
    joined: "T9/2024",
    verified: true,
  },
  {
    id: "TH-004",
    name: "Lê Văn Tùng",
    specialty: "Điện dân dụng",
    rating: 4.7,
    trust: 91,
    orders: 998,
    revenue: "28.4tr",
    status: "busy",
    joined: "T11/2024",
    verified: true,
  },
  {
    id: "TH-005",
    name: "Đỗ Hải Nam",
    specialty: "Lắp đặt điện",
    rating: 4.6,
    trust: 85,
    orders: 654,
    revenue: "19.7tr",
    status: "offline",
    joined: "T1/2025",
    verified: true,
  },
  {
    id: "TH-006",
    name: "Hoàng Minh Tuấn",
    specialty: "An toàn điện",
    rating: 4.5,
    trust: 78,
    orders: 421,
    revenue: "12.3tr",
    status: "pending",
    joined: "T6/2025",
    verified: false,
  },
  {
    id: "TH-007",
    name: "Lý Văn Sơn",
    specialty: "Điện dân dụng",
    rating: 4.4,
    trust: 72,
    orders: 287,
    revenue: "8.1tr",
    status: "active",
    joined: "T8/2025",
    verified: false,
  },
];

const complaintsData = [
  {
    id: "KN-041",
    customer: "Bùi Thị Mai",
    worker: "Lê Văn Tùng",
    service: "Điện dân dụng",
    issue: "Thợ đến muộn 45 phút không báo trước",
    severity: "medium",
    status: "open",
    time: "1 giờ trước",
  },
  {
    id: "KN-040",
    customer: "Ngô Quang Vinh",
    worker: "Đỗ Hải Nam",
    service: "Lắp đặt điện",
    issue: "Báo giá 350k nhưng thu 520k không giải thích",
    severity: "high",
    status: "processing",
    time: "3 giờ trước",
  },
  {
    id: "KN-039",
    customer: "Đinh Thị Nga",
    worker: "Hoàng Minh Tuấn",
    service: "An toàn điện",
    issue: "Kiểm tra xong vẫn bị sự cố điện, chất lượng kém",
    severity: "high",
    status: "open",
    time: "5 giờ trước",
  },
  {
    id: "KN-038",
    customer: "Trần Văn Đức",
    worker: "Nguyễn Văn Bình",
    service: "Thay cầu dao",
    issue:
      "Thợ không mang đủ dụng cụ, phải về lấy rồi quay lại",
    severity: "low",
    status: "resolved",
    time: "1 ngày trước",
  },
  {
    id: "KN-037",
    customer: "Phạm Thị Lan",
    worker: "Trần Minh Đức",
    service: "Lắp đèn LED",
    issue:
      "Đèn lắp xong bị chập, thợ xử lý nhưng không nhận lỗi",
    severity: "medium",
    status: "resolved",
    time: "2 ngày trước",
  },
  {
    id: "KN-036",
    customer: "Cao Thị Minh",
    worker: "Phạm Quốc Hùng",
    service: "Điện dân dụng",
    issue: "Sửa xong nhưng lỗi xuất hiện lại sau 3 ngày",
    severity: "high",
    status: "open",
    time: "3 ngày trước",
  },
];

const allOrdersData = [
  {
    id: "ĐH-2941",
    customer: "Nguyễn Văn An",
    service: "Điện dân dụng",
    worker: "Trần Minh Đức",
    area: "Cầu Giấy, HN",
    status: "completed",
    amount: "350.000đ",
    time: "14:32",
  },
  {
    id: "ĐH-2940",
    customer: "Lê Thị Hoa",
    service: "Lắp đèn LED",
    worker: "Phạm Quốc Hùng",
    area: "Đống Đa, HN",
    status: "in_progress",
    amount: "480.000đ",
    time: "14:18",
  },
  {
    id: "ĐH-2939",
    customer: "Phạm Đức Thành",
    service: "Thay cầu dao",
    worker: "Nguyễn Văn Bình",
    area: "Hoàng Mai, HN",
    status: "in_progress",
    amount: "220.000đ",
    time: "13:55",
  },
  {
    id: "ĐH-2938",
    customer: "Trần Thu Hương",
    service: "Điện dân dụng",
    worker: "Lê Văn Tùng",
    area: "Thanh Xuân, HN",
    status: "pending",
    amount: "410.000đ",
    time: "13:41",
  },
  {
    id: "ĐH-2937",
    customer: "Vũ Minh Khoa",
    service: "Lắp đặt điện",
    worker: "Đỗ Hải Nam",
    area: "Nam Từ Liêm, HN",
    status: "completed",
    amount: "650.000đ",
    time: "12:30",
  },
  {
    id: "ĐH-2936",
    customer: "Bùi Thị Mai",
    service: "Lắp ổ cắm",
    worker: "Trần Minh Đức",
    area: "Tây Hồ, HN",
    status: "completed",
    amount: "180.000đ",
    time: "11:15",
  },
  {
    id: "ĐH-2935",
    customer: "Cao Văn Bình",
    service: "An toàn điện",
    worker: "Hoàng Minh Tuấn",
    area: "Hà Đông, HN",
    status: "cancelled",
    amount: "0đ",
    time: "10:20",
  },
  {
    id: "ĐH-2934",
    customer: "Nguyễn Thị Lan",
    service: "Điện dân dụng",
    worker: "Lý Văn Sơn",
    area: "Cầu Giấy, HN",
    status: "completed",
    amount: "290.000đ",
    time: "09:45",
  },
];

const topWorkers = [
  {
    name: "Trần Minh Đức",
    specialty: "Điện",
    orders: 127,
    rating: 4.9,
    score: 98,
    status: "active",
  },
  {
    name: "Phạm Quốc Hùng",
    specialty: "Lắp đặt",
    orders: 118,
    rating: 4.8,
    score: 95,
    status: "busy",
  },
  {
    name: "Nguyễn Văn Bình",
    specialty: "Cầu dao",
    orders: 103,
    rating: 4.8,
    score: 93,
    status: "active",
  },
  {
    name: "Lê Văn Tùng",
    specialty: "Điện",
    orders: 98,
    rating: 4.7,
    score: 91,
    status: "busy",
  },
];

// ── Shared Components ─────────────────────────────────────────────────────────

function MobileStatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between px-5 pt-3 pb-1 text-xs font-medium flex-shrink-0 ${dark ? "text-white" : "text-[#111827]"}`}
    >
      <span className="font-mono font-semibold">9:41</span>
      <div className="flex items-center gap-1">
        <div className="flex gap-0.5 items-end h-3">
          {[2, 3, 4, 4].map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-sm ${dark ? "bg-white" : "bg-[#111827]"}`}
              style={{ height: `${h * 2.5}px` }}
            />
          ))}
        </div>
        <svg
          viewBox="0 0 24 12"
          width="16"
          height="8"
          fill="currentColor"
          className="opacity-80"
        >
          <rect
            x="1"
            y="3"
            width="18"
            height="8"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <rect
            x="19"
            y="5"
            width="2"
            height="4"
            rx="1"
            fill="currentColor"
            opacity="0.5"
          />
          <rect
            x="2.5"
            y="4.5"
            width="14"
            height="5"
            rx="1"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}

function PhoneFrame({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
        {label}
      </div>
      <div
        className="relative bg-[#111] rounded-[44px] shadow-2xl overflow-hidden flex-shrink-0"
        style={{
          width: 375,
          height: 780,
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.08), 0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#111] rounded-b-2xl z-10" />
        <div className="absolute inset-[3px] rounded-[41px] bg-white overflow-hidden flex flex-col">
          {children}
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full" />
      </div>
    </div>
  );
}

function WorkerAvatar({
  name,
  size = 40,
}: {
  name: string;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .slice(-2)
    .map((n) => n[0])
    .join("");
  const colors = [
    "#F59E0B",
    "#3B82F6",
    "#10B981",
    "#8B5CF6",
    "#EF4444",
    "#0891B2",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: size * 0.35,
      }}
    >
      {initials}
    </div>
  );
}

function StarRating({
  value,
  max = 5,
  size = 12,
}: {
  value: number;
  max?: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < Math.floor(value)
              ? "fill-amber-400 text-amber-400"
              : "text-gray-200"
          }
        />
      ))}
    </div>
  );
}

function ProfileSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 mb-2">
        {title}
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function ProfileItem({
  label,
  icon: Icon,
  sub,
  badge,
  danger,
  onClick,
}: {
  label: string;
  icon: React.ElementType;
  sub?: string;
  badge?: string | number;
  danger?: boolean;
  onClick?: () => void;
}) {
  const theme = useTheme();
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors"
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: danger ? "#FEF2F2" : theme.primaryLight,
        }}
      >
        <Icon
          size={16}
          style={{ color: danger ? "#EF4444" : theme.primary }}
        />
      </div>
      <div className="flex-1 text-left min-w-0">
        <div
          className={`text-sm font-medium ${danger ? "text-red-600" : "text-[#111827]"}`}
        >
          {label}
        </div>
        {sub && (
          <div className="text-xs text-gray-400 mt-0.5">
            {sub}
          </div>
        )}
      </div>
      {badge && (
        <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
          {badge}
        </span>
      )}
      {!danger && (
        <ChevronRight
          size={15}
          className="text-gray-300 flex-shrink-0"
        />
      )}
    </button>
  );
}

function DetailHeader({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) {
  return (
    <div className="flex items-center gap-3 bg-white px-4 py-3.5 border-b border-gray-100">
      <button
        onClick={onBack}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 -ml-1"
      >
        <ArrowLeft size={18} className="text-[#111827]" />
      </button>
      <h1 className="text-base font-bold text-[#111827]">
        {title}
      </h1>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left bg-white rounded-2xl border border-gray-100 p-3.5"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#111827] pr-2">
          {q}
        </span>
        <ChevronRight
          size={15}
          className={`text-gray-300 flex-shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
        />
      </div>
      {open && (
        <div className="text-xs text-gray-500 leading-relaxed mt-2">
          {a}
        </div>
      )}
    </button>
  );
}

// ── CUSTOMER SCREENS ──────────────────────────────────────────────────────────

function CHome({
  onNavigate,
}: {
  onNavigate: (s: string, d?: unknown) => void;
}) {
  const theme = useTheme();
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-white">
      <MobileStatusBar />
      <div className="px-5 pt-2 pb-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400">Xin chào 👋</p>
            <h1 className="text-base font-bold text-[#111827]">
              Nguyễn Thu Hà
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="relative w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: theme.primaryLight }}
            >
              <Bell
                size={17}
                style={{ color: theme.primary }}
              />
              <span
                className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full border border-white"
                style={{ background: theme.primary }}
              />
            </button>
            <WorkerAvatar name="Nguyễn Thu Hà" size={36} />
          </div>
        </div>
        <div className="flex items-center gap-3 bg-[#F3F4F6] rounded-2xl px-4 py-3">
          <Search size={16} className="text-gray-400" />
          <span className="text-sm text-gray-400">
            Tìm dịch vụ điện bạn cần...
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 space-y-5 pb-24 [&::-webkit-scrollbar]:hidden">
        <div
          className="rounded-2xl p-4 flex items-center gap-3 cursor-pointer"
          style={{ background: theme.gradient }}
          onClick={() => onNavigate("track")}
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Navigation size={18} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-medium opacity-80">
              Đơn đang thực hiện
            </div>
            <div className="text-white text-sm font-bold mt-0.5 truncate">
              Sửa điện phòng bếp
            </div>
            <div className="text-white/70 text-xs mt-0.5">
              Thợ Trần Minh Đức · Đang trên đường
            </div>
          </div>
          <ChevronRight
            size={16}
            className="text-white/70 flex-shrink-0"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#111827]">
              Dịch vụ điện
            </h2>
            <button
              className="text-xs font-medium"
              style={{ color: theme.primary }}
            >
              Xem tất cả
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => onNavigate("book", s)}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: s.bg }}
                  >
                    <Icon
                      size={20}
                      style={{ color: s.color }}
                    />
                  </div>
                  <span className="text-xs font-medium text-[#374151] text-center leading-tight">
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden bg-[#0D1117] p-4 flex items-center gap-4">
          <div className="flex-1">
            <div
              className="text-[10px] font-semibold tracking-wider uppercase mb-1"
              style={{ color: theme.primary }}
            >
              Ưu đãi hôm nay
            </div>
            <div className="text-white text-sm font-bold leading-tight">
              Giảm 50.000đ cho lần đặt đầu tiên
            </div>
            <button
              className="mt-2 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
              style={{ background: theme.primary }}
            >
              Dùng ngay
            </button>
          </div>
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: op(theme.primary, 0.2) }}
          >
            <Sparkles
              size={28}
              style={{ color: theme.primary }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#111827]">
              Đơn gần đây
            </h2>
            <button
              className="text-xs font-medium"
              style={{ color: theme.primary }}
              onClick={() => onNavigate("history")}
            >
              Xem lịch sử
            </button>
          </div>
          {[
            {
              service: "Sửa điện phòng bếp",
              worker: "Trần Minh Đức",
              date: "18/09/2026",
              amount: "350.000đ",
            },
            {
              service: "Lắp đèn LED phòng khách",
              worker: "Phạm Quốc Hùng",
              date: "10/09/2026",
              amount: "280.000đ",
            },
          ].map((o, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: theme.primaryLight }}
              >
                <Zap
                  size={18}
                  style={{ color: theme.primary }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[#111827] truncate">
                  {o.service}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {o.worker} · {o.date}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-semibold text-[#111827]">
                  {o.amount}
                </div>
                <div className="text-xs text-emerald-600 font-medium">
                  Hoàn thành
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CBook({
  onNavigate,
  service,
}: {
  onNavigate: (s: string, d?: unknown) => void;
  service: (typeof SERVICES)[0] | null;
}) {
  const theme = useTheme();
  const [address, setAddress] = useState(
    "54 Nguyễn Chí Thanh, Đống Đa, HN",
  );
  const [desc, setDesc] = useState("");
  const svc = service || SERVICES[0];
  const Icon = svc.icon;
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-white">
      <MobileStatusBar />
      <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100">
        <button
          onClick={() => onNavigate("home")}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <ArrowLeft size={16} />
        </button>
        <h1 className="text-base font-bold text-[#111827]">
          Đặt dịch vụ
        </h1>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 pb-28 space-y-5 [&::-webkit-scrollbar]:hidden">
        <div
          className="flex items-center gap-3 p-4 rounded-2xl border-2"
          style={{
            borderColor: op(theme.primary, 0.3),
            background: theme.primaryLight,
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: svc.bg }}
          >
            <Icon size={22} style={{ color: svc.color }} />
          </div>
          <div>
            <div
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: theme.primary }}
            >
              Dịch vụ đã chọn
            </div>
            <div className="text-sm font-bold text-[#111827] mt-0.5">
              {svc.label}
            </div>
          </div>
          <button
            onClick={() => onNavigate("home")}
            className="ml-auto text-gray-400"
          >
            <X size={16} />
          </button>
        </div>
        <div>
          <label className="text-xs font-semibold text-[#374151] uppercase tracking-wide block mb-2">
            Địa chỉ
          </label>
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200">
            <MapPin
              size={16}
              className="flex-shrink-0"
              style={{ color: theme.primary }}
            />
            <input
              className="flex-1 bg-transparent text-sm text-[#111827] outline-none"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-[#374151] uppercase tracking-wide block mb-2">
            Thời gian
          </label>
          <div className="grid grid-cols-2 gap-3">
            {["Ngay bây giờ", "Đặt lịch hẹn"].map((opt, i) => (
              <button
                key={i}
                className="py-3 rounded-2xl border text-sm font-medium"
                style={
                  i === 0
                    ? {
                        borderColor: theme.primary,
                        background: theme.primary,
                        color: "white",
                      }
                    : {}
                }
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-[#374151] uppercase tracking-wide block mb-2">
            Mô tả vấn đề
          </label>
          <textarea
            className="w-full bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200 text-sm outline-none resize-none placeholder:text-gray-400"
            rows={3}
            placeholder="Mô tả chi tiết..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#374151] uppercase tracking-wide block mb-2">
            Ảnh mô tả
          </label>
          <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center gap-1.5 text-gray-400">
            <Camera size={22} />
            <span className="text-xs">Thêm ảnh</span>
          </button>
        </div>
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Giá ước tính</span>
            <span className="font-bold text-[#111827]">
              200.000 – 500.000đ
            </span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-20 left-3 right-3">
        <button
          onClick={() => onNavigate("match")}
          className="w-full py-4 rounded-2xl font-bold text-white text-sm shadow-lg"
          style={{ background: theme.gradient }}
        >
          Tìm thợ phù hợp →
        </button>
      </div>
    </div>
  );
}

function CMatch({
  onNavigate,
}: {
  onNavigate: (s: string, d?: unknown) => void;
}) {
  const theme = useTheme();
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-white">
      <MobileStatusBar />
      <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100">
        <button
          onClick={() => onNavigate("book")}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <h1 className="text-base font-bold text-[#111827]">
            Thợ phù hợp
          </h1>
          <p className="text-xs text-gray-400">
            3 thợ trong bán kính 5km · Trust Score
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 pb-28 space-y-3 [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center gap-2 py-2 px-3 bg-[#F0F9FF] rounded-xl border border-blue-100">
          <ZapIcon
            size={13}
            className="text-blue-500 flex-shrink-0"
          />
          <span className="text-xs text-blue-700">
            Thuật toán <strong>Weighted Scoring</strong> · Ưu
            tiên chuyên gia điện
          </span>
        </div>
        {MATCHED_WORKERS.map((w) => (
          <div
            key={w.id}
            onClick={() =>
              setSelected(w.id === selected ? null : w.id)
            }
            className="p-4 rounded-2xl border-2 transition-all cursor-pointer"
            style={{
              borderColor:
                selected === w.id ? theme.primary : "#F3F4F6",
              background:
                selected === w.id
                  ? op(theme.primary, 0.04)
                  : "white",
            }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="relative">
                <WorkerAvatar name={w.name} size={48} />
                {w.verified && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <BadgeCheck
                      size={12}
                      className="text-white"
                    />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#111827]">
                    {w.name}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: theme.primary }}
                  >
                    {w.price}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {w.specialty} · {w.experience} kinh nghiệm
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-1">
                    <Star
                      size={11}
                      className="fill-amber-400 text-amber-400"
                    />
                    <span className="text-xs font-semibold">
                      {w.rating}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({w.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin
                      size={10}
                      className="text-gray-400"
                    />
                    <span className="text-xs text-gray-400">
                      {w.distance}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock
                      size={10}
                      className="text-gray-400"
                    />
                    <span className="text-xs text-gray-400">
                      ~{w.eta}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield
                size={12}
                className="text-emerald-500 flex-shrink-0"
              />
              <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-emerald-500"
                  style={{ width: `${w.trust}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600">
                {w.trust}/100
              </span>
            </div>
            {selected === w.id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("track");
                }}
                className="mt-3 w-full py-2.5 rounded-xl font-semibold text-white text-sm"
                style={{ background: theme.primary }}
              >
                Chọn thợ này
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CTrack({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const theme = useTheme();
  const steps = [
    { label: "Đã đặt", done: true },
    { label: "Thợ đến", done: true },
    { label: "Đang sửa", done: false, active: true },
    { label: "Hoàn thành", done: false },
  ];
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-white">
      <MobileStatusBar dark />
      <div
        className="relative flex-shrink-0"
        style={{ height: 320 }}
      >
        <div className="absolute inset-0 bg-[#E8EDF3]">
          <svg width="100%" height="100%" viewBox="0 0 375 320">
            <rect
              x="0"
              y="0"
              width="375"
              height="320"
              fill="#E8EDF3"
            />
            {(
              [
                [20, 40, 120, 80],
                [160, 40, 80, 100],
                [260, 20, 95, 120],
                [20, 140, 80, 60],
                [120, 160, 100, 60],
                [240, 150, 120, 80],
                [20, 220, 140, 80],
                [180, 220, 80, 80],
                [280, 220, 95, 80],
              ] as number[][]
            ).map(([x, y, w, h], i) => (
              <rect
                key={i}
                x={x}
                y={y}
                width={w}
                height={h}
                rx="4"
                fill="#DAE0E8"
              />
            ))}
            <rect
              x="0"
              y="130"
              width="375"
              height="16"
              fill="#F4F6F8"
            />
            <rect
              x="0"
              y="210"
              width="375"
              height="16"
              fill="#F4F6F8"
            />
            <rect
              x="140"
              y="0"
              width="16"
              height="320"
              fill="#F4F6F8"
            />
            <rect
              x="250"
              y="0"
              width="16"
              height="320"
              fill="#F4F6F8"
            />
            <path
              d="M 90 270 Q 140 270 140 210 Q 140 138 260 138"
              stroke={theme.primary}
              strokeWidth="3"
              fill="none"
              strokeDasharray="6 4"
            />
            <circle
              cx="200"
              cy="138"
              r="14"
              fill={theme.primary}
            />
            <circle cx="200" cy="138" r="8" fill="white" />
            <circle
              cx="200"
              cy="138"
              r="20"
              fill={theme.primary}
              fillOpacity="0.2"
            />
            <circle cx="90" cy="270" r="12" fill="#111827" />
            <circle cx="90" cy="270" r="6" fill="white" />
          </svg>
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <button
              onClick={() => onNavigate("home")}
              className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"
            >
              <ArrowLeft size={15} />
            </button>
            <div className="bg-white rounded-full px-3 py-1.5 shadow text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Thợ đang trên đường · 4 phút
            </div>
            <button className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
              <Phone
                size={15}
                style={{ color: theme.primary }}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-white rounded-t-3xl -mt-4 relative z-10 flex flex-col px-5 pt-5 pb-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <WorkerAvatar name="Trần Minh Đức" size={48} />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold text-[#111827]">
              Trần Minh Đức
            </div>
            <div className="text-xs text-gray-400">
              Điện dân dụng · ĐH-2942
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Star
                size={11}
                className="fill-amber-400 text-amber-400"
              />
              <span className="text-xs font-semibold">4.9</span>
              <span className="text-xs text-gray-400">
                (312)
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigate("chat")}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: theme.primaryLight }}
          >
            <MessageSquare
              size={17}
              style={{ color: theme.primary }}
            />
          </button>
        </div>
        <div className="flex items-center gap-0 mb-5">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center border-2"
                  style={{
                    background: step.done
                      ? theme.primary
                      : "white",
                    borderColor:
                      step.done || step.active
                        ? theme.primary
                        : "#E5E7EB",
                  }}
                >
                  {step.done ? (
                    <Check size={12} className="text-white" />
                  ) : step.active ? (
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ background: theme.primary }}
                    />
                  ) : null}
                </div>
                <span
                  className="text-[9px] mt-1 font-medium text-center w-12"
                  style={{
                    color:
                      step.done || step.active
                        ? theme.primary
                        : "#D1D5DB",
                  }}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="flex-1 h-0.5 -mt-4"
                  style={{
                    background: step.done
                      ? theme.primary
                      : "#E5E7EB",
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="bg-gray-50 rounded-2xl p-4 space-y-2.5">
          {[
            { label: "Dịch vụ", value: "Sửa điện phòng bếp" },
            {
              label: "Địa chỉ",
              value: "54 Nguyễn Chí Thanh, Đống Đa",
            },
            { label: "Giá ước tính", value: "350.000đ" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-center"
            >
              <span className="text-gray-400 text-xs">
                {item.label}
              </span>
              <span className="font-medium text-[#111827] text-xs">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CChat({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const theme = useTheme();
  const [msg, setMsg] = useState("");
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-white">
      <MobileStatusBar />
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
        <button
          onClick={() => onNavigate("track")}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <ArrowLeft size={15} />
        </button>
        <WorkerAvatar name="Trần Minh Đức" size={36} />
        <div className="flex-1">
          <div className="text-sm font-bold text-[#111827]">
            Trần Minh Đức
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            Đang hoạt động
          </div>
        </div>
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: theme.primaryLight }}
        >
          <Phone size={15} style={{ color: theme.primary }} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 [&::-webkit-scrollbar]:hidden">
        {CHAT_MESSAGES.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.from === "customer" ? "justify-end" : "justify-start"} gap-2`}
          >
            {m.from === "worker" && (
              <WorkerAvatar name="Trần Minh Đức" size={28} />
            )}
            <div
              className="max-w-[75%] rounded-2xl px-3.5 py-2.5"
              style={
                m.from === "customer"
                  ? {
                      background: theme.primary,
                      color: "white",
                      borderBottomRightRadius: 4,
                    }
                  : {
                      background: "#F3F4F6",
                      color: "#111827",
                      borderBottomLeftRadius: 4,
                    }
              }
            >
              <p className="text-xs leading-relaxed">
                {m.text}
              </p>
              <div
                className="text-[10px] mt-1"
                style={{
                  color:
                    m.from === "customer"
                      ? "rgba(255,255,255,0.6)"
                      : "#9CA3AF",
                  textAlign:
                    m.from === "customer" ? "right" : "left",
                }}
              >
                {m.time}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-2">
        <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2.5 gap-2">
          <input
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
            placeholder="Nhập tin nhắn..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <Camera size={16} className="text-gray-400" />
        </div>
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center shadow"
          style={{ background: theme.primary }}
        >
          <Send size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
}

function CReview({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const theme = useTheme();
  const [stars, setStars] = useState(5);
  const [tags, setTags] = useState<string[]>([
    "Đến đúng giờ",
    "Tay nghề tốt",
  ]);
  const allTags = [
    "Đến đúng giờ",
    "Tay nghề tốt",
    "Giá hợp lý",
    "Thân thiện",
    "Gọn gàng",
    "Báo giá minh bạch",
  ];
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-white">
      <MobileStatusBar />
      <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100">
        <button
          onClick={() => onNavigate("home")}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <ArrowLeft size={15} />
        </button>
        <h1 className="text-base font-bold text-[#111827]">
          Đánh giá dịch vụ
        </h1>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-6 [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-col items-center gap-4 mb-6">
          <WorkerAvatar name="Trần Minh Đức" size={72} />
          <div className="text-center">
            <div className="text-base font-bold text-[#111827]">
              Trần Minh Đức
            </div>
            <div className="text-sm text-gray-400 mt-0.5">
              Sửa điện phòng bếp · 21/09/2026
            </div>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} onClick={() => setStars(s)}>
                <Star
                  size={36}
                  className={
                    s <= stars
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-200"
                  }
                />
              </button>
            ))}
          </div>
          <div className="text-sm font-semibold text-[#111827]">
            {stars === 5
              ? "Xuất sắc!"
              : stars === 4
                ? "Rất tốt"
                : stars === 3
                  ? "Tạm ổn"
                  : "Chưa hài lòng"}
          </div>
        </div>
        <div className="mb-4">
          <div className="text-xs font-semibold text-[#374151] uppercase tracking-wide mb-2">
            Nhận xét nhanh
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((t) => {
              const active = tags.includes(t);
              return (
                <button
                  key={t}
                  onClick={() =>
                    setTags(
                      active
                        ? tags.filter((x) => x !== t)
                        : [...tags, t],
                    )
                  }
                  className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
                  style={
                    active
                      ? {
                          background: theme.primary,
                          color: "white",
                          borderColor: theme.primary,
                        }
                      : {
                          background: "white",
                          color: "#6B7280",
                          borderColor: "#E5E7EB",
                        }
                  }
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mb-6">
          <div className="text-xs font-semibold text-[#374151] uppercase tracking-wide mb-2">
            Nhận xét của bạn
          </div>
          <textarea
            className="w-full bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200 text-sm outline-none resize-none placeholder:text-gray-400"
            rows={3}
            defaultValue="Thợ Đức làm việc rất chuyên nghiệp, đúng giờ và sửa xong rất nhanh."
          />
        </div>
        <button
          onClick={() => onNavigate("home")}
          className="w-full py-4 rounded-2xl font-bold text-white text-sm shadow-lg"
          style={{ background: theme.gradient }}
        >
          Gửi đánh giá
        </button>
      </div>
    </div>
  );
}

function CHistory({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const theme = useTheme();
  const orders = [
    {
      id: "ĐH-2942",
      service: "Sửa điện phòng bếp",
      worker: "Trần Minh Đức",
      date: "21/09/2026",
      status: "in_progress",
      amount: "350.000đ",
    },
    {
      id: "ĐH-2891",
      service: "Lắp đèn LED phòng khách",
      worker: "Phạm Quốc Hùng",
      date: "10/09/2026",
      status: "completed",
      amount: "280.000đ",
    },
    {
      id: "ĐH-2834",
      service: "Thay cầu dao MCB",
      worker: "Nguyễn Văn Bình",
      date: "28/08/2026",
      status: "completed",
      amount: "220.000đ",
    },
    {
      id: "ĐH-2780",
      service: "Lắp ổ cắm phòng ngủ",
      worker: "Lê Quang Minh",
      date: "15/08/2026",
      status: "completed",
      amount: "180.000đ",
    },
  ];
  const statusMap: Record<
    string,
    { label: string; cls: string }
  > = {
    in_progress: {
      label: "Đang làm",
      cls: "text-blue-600 bg-blue-50",
    },
    completed: {
      label: "Hoàn thành",
      cls: "text-emerald-600 bg-emerald-50",
    },
    cancelled: {
      label: "Đã hủy",
      cls: "text-red-500 bg-red-50",
    },
  };
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-white">
      <MobileStatusBar />
      <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100">
        <button
          onClick={() => onNavigate("home")}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <ArrowLeft size={15} />
        </button>
        <h1 className="text-base font-bold text-[#111827]">
          Lịch sử đơn hàng
        </h1>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 pb-24 [&::-webkit-scrollbar]:hidden">
        {orders.map((o) => {
          const s = statusMap[o.status];
          return (
            <div
              key={o.id}
              className="mb-3 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-sm font-bold text-[#111827]">
                    {o.service}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {o.worker} · {o.date}
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.cls}`}
                >
                  {s.label}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-400 font-mono">
                  {o.id}
                </span>
                <span
                  className="text-sm font-bold"
                  style={{ color: theme.primary }}
                >
                  {o.amount}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CProfile({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const theme = useTheme();
  const soon = () => alert("Tính năng đang phát triển");
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#F3F4F6]">
      <MobileStatusBar />
      <div className="bg-white px-5 pt-3 pb-5">
        <h1 className="text-base font-bold text-[#111827] mb-4">
          Tài khoản
        </h1>
        <div className="flex items-center gap-3 mb-4">
          <WorkerAvatar name="Nguyễn Thu Hà" size={56} />
          <div className="flex-1">
            <div className="text-base font-bold text-[#111827]">
              Nguyễn Thu Hà
            </div>
            <div className="text-xs text-gray-400 mt-0.5">
              0912 345 678 · Đống Đa, Hà Nội
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Star
                size={11}
                className="fill-amber-400 text-amber-400"
              />
              <span className="text-xs font-semibold text-[#111827]">
                4.8
              </span>
              <span className="text-xs text-gray-400">
                · 23 đơn
              </span>
            </div>
          </div>
          <button
            onClick={soon}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold"
            style={{
              background: theme.primaryLight,
              color: theme.primary,
            }}
          >
            Chỉnh sửa
          </button>
        </div>
        <div
          className="p-4 rounded-2xl flex items-center gap-3 text-white"
          style={{
            background:
              "linear-gradient(135deg, #0D1117, #1A2035)",
          }}
        >
          <Wallet size={20} />
          <div>
            <div className="text-xs opacity-60">Số dư ví</div>
            <div className="text-lg font-bold font-mono">
              150.000đ
            </div>
          </div>
          <button
            onClick={soon}
            className="ml-auto bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-lg"
          >
            Nạp tiền
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-2 pb-24 [&::-webkit-scrollbar]:hidden">
        <ProfileSection title="Đơn hàng">
          <ProfileItem
            label="Lịch sử đơn hàng"
            icon={ClipboardList}
            sub="23 đơn đã hoàn thành"
            onClick={() => onNavigate("history")}
          />
          <ProfileItem
            label="Đơn đang thực hiện"
            icon={Navigation}
            sub="1 đơn đang chạy"
            badge={1}
            onClick={() => onNavigate("track")}
          />
          <ProfileItem
            label="Đánh giá của tôi"
            icon={Star}
            sub="12 đánh giá đã gửi"
            onClick={() => onNavigate("reviewsMine")}
          />
        </ProfileSection>
        <ProfileSection title="Thanh toán">
          <ProfileItem
            label="Phương thức thanh toán"
            icon={Banknote}
            sub="Thêm thẻ / ví điện tử"
            onClick={() => onNavigate("payment")}
          />
          <ProfileItem
            label="Lịch sử giao dịch"
            icon={DollarSign}
            onClick={() => onNavigate("transactions")}
          />
        </ProfileSection>
        <ProfileSection title="Tài khoản">
          <ProfileItem
            label="Thông tin cá nhân"
            icon={User}
            sub="Nguyễn Thu Hà · 0912 345 678"
            onClick={() => onNavigate("personalInfo")}
          />
          <ProfileItem
            label="Địa chỉ của tôi"
            icon={MapPin}
            sub="2 địa chỉ đã lưu"
            onClick={() => onNavigate("addresses")}
          />
        </ProfileSection>
        <ProfileSection title="Hỗ trợ">
          <ProfileItem
            label="Trung tâm trợ giúp"
            icon={HelpCircle}
            onClick={() => onNavigate("help")}
          />
          <ProfileItem
            label="Liên hệ CSKH"
            icon={Phone}
            sub="Hỗ trợ 24/7"
            onClick={() => onNavigate("support")}
          />
        </ProfileSection>
        <div className="mt-4 mb-2">
          <ProfileItem
            label="Đăng xuất"
            icon={LogOut}
            danger
            onClick={soon}
          />
        </div>
      </div>
    </div>
  );
}

function CReviewsMine({ onNavigate }: { onNavigate: (s: string) => void }) {
  const reviews = [
    { name: "Trần Minh Đức", service: "Sửa điện dân dụng", date: "18/09/2026", stars: 5, comment: "Thợ đến đúng giờ, sửa nhanh gọn, giá hợp lý." },
    { name: "Lê Văn Hùng", service: "Lắp đèn LED", date: "10/09/2026", stars: 4, comment: "Làm ổn nhưng hơi trễ hẹn 15 phút." },
    { name: "Phạm Quốc Anh", service: "Thay cầu dao", date: "02/09/2026", stars: 5, comment: "Rất chuyên nghiệp, tư vấn nhiệt tình." },
  ];
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#F3F4F6]">
      <MobileStatusBar />
      <DetailHeader title="Đánh giá của tôi" onBack={() => onNavigate("profile")} />
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 pb-24 [&::-webkit-scrollbar]:hidden">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-semibold text-[#111827]">{r.name}</span>
              <span className="text-[11px] text-gray-400">{r.date}</span>
            </div>
            <div className="text-xs text-gray-400 mb-1.5">{r.service}</div>
            <StarRating value={r.stars} />
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CPaymentMethods({ onNavigate }: { onNavigate: (s: string) => void }) {
  const theme = useTheme();
  const methods = [
    { label: "Ví ThoNhanh Pay", sub: "Số dư: 150.000đ", isDefault: true },
    { label: "Thẻ Vietcombank", sub: "**** **** **** 4521", isDefault: false },
    { label: "MoMo", sub: "0912 345 678", isDefault: false },
  ];
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#F3F4F6]">
      <MobileStatusBar />
      <DetailHeader title="Phương thức thanh toán" onBack={() => onNavigate("profile")} />
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2.5 pb-24 [&::-webkit-scrollbar]:hidden">
        {methods.map((m, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: theme.primaryLight }}>
              <Banknote size={16} style={{ color: theme.primary }} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-[#111827]">{m.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{m.sub}</div>
            </div>
            {m.isDefault && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: theme.primaryLight, color: theme.primary }}>Mặc định</span>}
          </div>
        ))}
        <button className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl p-3.5 text-sm font-medium" style={{ color: theme.primary }}>
          <Plus size={16} /> Thêm phương thức
        </button>
      </div>
    </div>
  );
}

function CTransactions({ onNavigate }: { onNavigate: (s: string) => void }) {
  const txs = [
    { label: "Thanh toán dịch vụ điện", date: "18/09/2026 · 14:20", amount: -280000 },
    { label: "Nạp tiền vào ví", date: "15/09/2026 · 09:05", amount: 200000 },
    { label: "Thanh toán lắp đèn LED", date: "10/09/2026 · 16:40", amount: -150000 },
    { label: "Hoàn tiền khiếu nại", date: "05/09/2026 · 11:00", amount: 50000 },
  ];
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#F3F4F6]">
      <MobileStatusBar />
      <DetailHeader title="Lịch sử giao dịch" onBack={() => onNavigate("profile")} />
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2 pb-24 [&::-webkit-scrollbar]:hidden">
        {txs.map((t, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-3.5 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${t.amount > 0 ? "bg-emerald-50" : "bg-red-50"}`}>
              {t.amount > 0 ? <TrendingUp size={16} className="text-emerald-600" /> : <TrendingDown size={16} className="text-red-500" />}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-[#111827]">{t.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{t.date}</div>
            </div>
            <span className={`text-sm font-bold font-mono ${t.amount > 0 ? "text-emerald-600" : "text-red-500"}`}>
              {t.amount > 0 ? "+" : ""}{t.amount.toLocaleString("vi-VN")}đ
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CPersonalInfo({ onNavigate }: { onNavigate: (s: string) => void }) {
  const theme = useTheme();
  const fields = [
    { label: "Họ và tên", value: "Nguyễn Thu Hà", icon: User },
    { label: "Số điện thoại", value: "0912 345 678", icon: Phone },
    { label: "Email", value: "thuha.nguyen@gmail.com", icon: Send },
    { label: "Ngày sinh", value: "12/05/1995", icon: Calendar },
    { label: "Giới tính", value: "Nữ", icon: User },
  ];
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#F3F4F6]">
      <MobileStatusBar />
      <DetailHeader title="Thông tin cá nhân" onBack={() => onNavigate("profile")} />
      <div className="flex-1 overflow-y-auto px-5 py-4 pb-24 [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-col items-center mb-5">
          <WorkerAvatar name="Nguyễn Thu Hà" size={72} />
          <button className="text-xs font-semibold mt-2" style={{ color: theme.primary }}>Đổi ảnh đại diện</button>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100">
          {fields.map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-3.5">
              <f.icon size={16} className="text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-xs text-gray-400">{f.label}</div>
                <div className="text-sm font-medium text-[#111827] mt-0.5">{f.value}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-3 rounded-2xl text-sm font-semibold text-white" style={{ background: theme.primary }}>Cập nhật thông tin</button>
      </div>
    </div>
  );
}

function CAddresses({ onNavigate }: { onNavigate: (s: string) => void }) {
  const theme = useTheme();
  const list = [
    { label: "Nhà riêng", address: "Số 12, ngõ 88 Láng Hạ, Đống Đa, Hà Nội", isDefault: true },
    { label: "Công ty", address: "Tòa CT3, Khu đô thị Mỹ Đình, Nam Từ Liêm, Hà Nội", isDefault: false },
  ];
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#F3F4F6]">
      <MobileStatusBar />
      <DetailHeader title="Địa chỉ của tôi" onBack={() => onNavigate("profile")} />
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2.5 pb-24 [&::-webkit-scrollbar]:hidden">
        {list.map((a, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-3.5 flex gap-3">
            <MapPin size={18} className="flex-shrink-0 mt-0.5" style={{ color: theme.primary }} />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[#111827]">{a.label}</span>
                {a.isDefault && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: theme.primaryLight, color: theme.primary }}>Mặc định</span>}
              </div>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{a.address}</p>
            </div>
          </div>
        ))}
        <button className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl p-3.5 text-sm font-medium" style={{ color: theme.primary }}>
          <Plus size={16} /> Thêm địa chỉ mới
        </button>
      </div>
    </div>
  );
}

function CHelpCenter({ onNavigate }: { onNavigate: (s: string) => void }) {
  const faqs = [
    { q: "Làm sao để đặt dịch vụ sửa điện?", a: "Vào Trang chủ, chọn loại dịch vụ điện cần dùng, điền địa chỉ và thời gian mong muốn rồi bấm Đặt ngay." },
    { q: "Tôi có thể hủy đơn đã đặt không?", a: "Có thể hủy miễn phí trước khi thợ nhận đơn. Sau khi thợ đã nhận, vui lòng liên hệ CSKH để được hỗ trợ." },
    { q: "Thanh toán bằng cách nào?", a: "Bạn có thể thanh toán qua ví ThoNhanh Pay, thẻ ngân hàng, MoMo hoặc tiền mặt trực tiếp cho thợ." },
    { q: "Nếu thợ làm không đạt yêu cầu thì sao?", a: "Mọi đơn hàng đều có bảo hành 30 ngày, bạn có thể gửi khiếu nại trong mục Bảo hành & Khiếu nại." },
  ];
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#F3F4F6]">
      <MobileStatusBar />
      <DetailHeader title="Trung tâm trợ giúp" onBack={() => onNavigate("profile")} />
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2 pb-24 [&::-webkit-scrollbar]:hidden">
        {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
      </div>
    </div>
  );
}

function CSupportContact({ onNavigate }: { onNavigate: (s: string) => void }) {
  const theme = useTheme();
  const options = [
    { label: "Gọi hotline", sub: "1900 6868 · 24/7", icon: Phone },
    { label: "Chat với CSKH", sub: "Phản hồi trong 5 phút", icon: MessageSquare },
    { label: "Gửi email", sub: "hotro@thonhanh.vn", icon: Send },
  ];
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#F3F4F6]">
      <MobileStatusBar />
      <DetailHeader title="Liên hệ CSKH" onBack={() => onNavigate("profile")} />
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2.5 pb-24 [&::-webkit-scrollbar]:hidden">
        {options.map((o, i) => (
          <button key={i} className="w-full flex items-center gap-3 bg-white rounded-2xl border border-gray-100 p-3.5 text-left">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: theme.primaryLight }}>
              <o.icon size={16} style={{ color: theme.primary }} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-[#111827]">{o.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{o.sub}</div>
            </div>
            <ChevronRight size={15} className="text-gray-300" />
          </button>
        ))}
      </div>
    </div>
  );
}
// ── Customer Phone ─────────────────────────────────────────────────────────────

type CScreen =
  | "home"
  | "book"
  | "match"
  | "track"
  | "chat"
  | "review"
  | "history"
  | "profile"
  | "reviewsMine"
  | "payment"
  | "transactions"
  | "personalInfo"
  | "addresses"
  | "help"
  | "support";
const C_PROFILE_SUB = [
  "profile",
  "history",
  "reviewsMine",
  "payment",
  "transactions",
  "personalInfo",
  "addresses",
  "help",
  "support",
];
const C_NAV = [
  { id: "home", icon: Home, label: "Trang chủ" },
  { id: "book", icon: ClipboardList, label: "Đặt dịch vụ" },
  { id: "track", icon: Navigation, label: "Theo dõi" },
  { id: "chat", icon: MessageSquare, label: "Chat" },
  { id: "profile", icon: User, label: "Tài khoản" },
];

function CustomerPhone() {
  const theme = useTheme();
  const [screen, setScreen] = useState<CScreen>("home");
  const [selectedService, setSelectedService] = useState<
    (typeof SERVICES)[0] | null
  >(null);

  const nav = (s: string, data?: unknown) => {
    if (data && s === "book")
      setSelectedService(data as (typeof SERVICES)[0]);
    setScreen(s as CScreen);
  };

  const activeNavId = ["home", "book", "match"].includes(screen)
    ? "home"
    : screen === "track"
      ? "track"
      : screen === "chat"
        ? "chat"
        : C_PROFILE_SUB.includes(screen)
          ? "profile"
          : "home";

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <CHome onNavigate={nav} />;
      case "book":
        return (
          <CBook onNavigate={nav} service={selectedService} />
        );
      case "match":
        return <CMatch onNavigate={nav} />;
      case "track":
        return <CTrack onNavigate={nav} />;
      case "chat":
        return <CChat onNavigate={nav} />;
      case "review":
        return <CReview onNavigate={nav} />;
      case "history":
        return <CHistory onNavigate={nav} />;
      case "profile":
        return <CProfile onNavigate={nav} />;
      case "reviewsMine":
        return <CReviewsMine onNavigate={nav} />;
      case "payment":
        return <CPaymentMethods onNavigate={nav} />;
      case "transactions":
        return <CTransactions onNavigate={nav} />;
      case "personalInfo":
        return <CPersonalInfo onNavigate={nav} />;
      case "addresses":
        return <CAddresses onNavigate={nav} />;
      case "help":
        return <CHelpCenter onNavigate={nav} />;
      case "support":
        return <CSupportContact onNavigate={nav} />;
      default:
        return <CHome onNavigate={nav} />;
    }
  };

  return (
    <PhoneFrame label="App Khách hàng">
      <div className="flex flex-col h-full relative">
        {renderScreen()}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center px-2 pt-2 pb-6 z-20">
          {C_NAV.map((item) => {
            const Icon = item.icon;
            const active = activeNavId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => nav(item.id)}
                className="flex-1 flex flex-col items-center gap-1 py-1"
              >
                <div
                  className="w-10 h-7 rounded-xl flex items-center justify-center"
                  style={
                    active
                      ? { background: theme.primaryLight }
                      : {}
                  }
                >
                  <Icon
                    size={19}
                    style={{
                      color: active ? theme.primary : "#D1D5DB",
                    }}
                  />
                </div>
                <span
                  className="text-[9px] font-medium"
                  style={{
                    color: active ? theme.primary : "#9CA3AF",
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </PhoneFrame>
  );
}

// ── WORKER SCREENS ────────────────────────────────────────────────────────────

function WDashboard({
  onNavigate,
  isOnline,
  setOnline,
}: {
  onNavigate: (s: string) => void;
  isOnline: boolean;
  setOnline: (v: boolean) => void;
}) {
  const theme = useTheme();
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#F3F4F6]">
      <div
        className="px-5 pt-0 pb-6"
        style={{
          background: isOnline ? theme.primary : "#111827",
        }}
      >
        <MobileStatusBar dark />
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-white/60">
              Xin chào, thợ 👷
            </p>
            <h1 className="text-base font-bold text-white">
              Trần Minh Đức
            </h1>
          </div>
          <button className="relative w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <Bell size={17} className="text-white" />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-white rounded-full" />
          </button>
        </div>
        <div className="bg-white/15 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-white">
              {isOnline ? "Đang nhận đơn" : "Không nhận đơn"}
            </div>
            <div className="text-xs text-white/60 mt-0.5">
              {isOnline
                ? "Thuật toán đang ghép cặp"
                : "Bật để bắt đầu nhận việc"}
            </div>
          </div>
          <button
            onClick={() => setOnline(!isOnline)}
            className="relative w-14 h-7 rounded-full transition-colors"
            style={{
              background: isOnline
                ? "white"
                : "rgba(255,255,255,0.3)",
            }}
          >
            <div
              className="absolute top-0.5 w-6 h-6 rounded-full shadow transition-transform"
              style={{
                transform: isOnline
                  ? "translateX(28px)"
                  : "translateX(2px)",
                background: isOnline ? theme.primary : "white",
              }}
            />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 pb-24 space-y-4 [&::-webkit-scrollbar]:hidden">
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "Đơn hôm nay",
              value: "7",
              sub: "hoàn thành",
            },
            {
              label: "Thu nhập",
              value: "930K",
              sub: "hôm nay",
            },
            { label: "Trust Score", value: "98", sub: "/100" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-3 border border-gray-100"
            >
              <div className="text-xs text-gray-400">
                {s.label}
              </div>
              <div className="text-base font-bold text-[#111827] font-mono mt-1">
                {s.value}
              </div>
              <div className="text-[10px] text-gray-400">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
        {isOnline && (
          <div
            className="rounded-2xl border-2 p-4 cursor-pointer"
            style={{ borderColor: theme.primary }}
            onClick={() => onNavigate("incoming")}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full animate-ping"
                  style={{ background: theme.primary }}
                />
                <span
                  className="text-xs font-bold uppercase tracking-wide"
                  style={{ color: theme.primary }}
                >
                  Đơn hàng mới!
                </span>
              </div>
              <div
                className="flex items-center gap-1 text-white text-xs font-mono font-bold px-2 py-0.5 rounded-full"
                style={{ background: theme.primary }}
              >
                <Timer size={10} />
                <span>28s</span>
              </div>
            </div>
            <div className="text-sm font-bold text-[#111827]">
              Thay cầu dao MCB phòng ngủ
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin size={11} /> 1.8 km
              </div>
              <div className="flex items-center gap-1">
                <DollarSign size={11} /> ~220.000đ
              </div>
              <div className="flex items-center gap-1">
                <Clock size={11} /> ~1 giờ
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-500">
                Bỏ qua
              </button>
              <button
                className="flex-1 py-2 rounded-xl text-white text-xs font-bold"
                style={{ background: theme.primary }}
              >
                Nhận đơn
              </button>
            </div>
          </div>
        )}
        <div>
          <div className="text-xs font-semibold text-[#374151] uppercase tracking-wide mb-3">
            Đơn hôm nay
          </div>
          {[
            {
              time: "08:30",
              service: "Sửa cầu dao điện",
              customer: "Lê Thị Hoa",
              amount: "180.000đ",
              done: true,
            },
            {
              time: "10:15",
              service: "Lắp ổ cắm phòng ngủ",
              customer: "Vũ Minh Khoa",
              amount: "120.000đ",
              done: true,
            },
            {
              time: "13:45",
              service: "Sửa điện phòng bếp",
              customer: "Nguyễn Thu Hà",
              amount: "350.000đ",
              done: false,
              current: true,
            },
          ].map((o, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 py-3 border-b border-gray-100 last:border-0 ${o.current ? "cursor-pointer" : ""}`}
              onClick={
                o.current
                  ? () => onNavigate("active")
                  : undefined
              }
            >
              <div className="text-xs font-mono text-gray-400 w-10 flex-shrink-0">
                {o.time}
              </div>
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background: o.done
                    ? "#10B981"
                    : o.current
                      ? theme.primary
                      : "#D1D5DB",
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-[#111827] truncate">
                  {o.service}
                </div>
                <div className="text-xs text-gray-400">
                  {o.customer}
                </div>
              </div>
              <div className="text-xs font-bold text-[#111827] font-mono">
                {o.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WIncoming({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const theme = useTheme();
  const [timer, setTimer] = useState(28);
  useEffect(() => {
    const t = setInterval(
      () => setTimer((v) => Math.max(0, v - 1)),
      1000,
    );
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-white">
      <MobileStatusBar />
      <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100">
        <button
          onClick={() => onNavigate("dashboard")}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <ArrowLeft size={15} />
        </button>
        <h1 className="text-base font-bold text-[#111827] flex-1">
          Đơn hàng mới
        </h1>
        <div
          className="w-12 h-12 rounded-full border-4 flex items-center justify-center"
          style={{ borderColor: theme.primary }}
        >
          <span
            className="text-sm font-bold font-mono"
            style={{ color: theme.primary }}
          >
            {timer}s
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-5 pb-28 space-y-4 [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
          <WorkerAvatar name="Phạm Đức Thành" size={48} />
          <div className="flex-1">
            <div className="text-sm font-bold text-[#111827]">
              Phạm Đức Thành
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <StarRating value={4.6} size={11} />
              <span className="text-xs text-gray-400 ml-1">
                4.6 · 12 đơn
              </span>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-2xl border border-gray-200 space-y-3">
          {[
            {
              label: "Dịch vụ",
              value: "Thay cầu dao MCB phòng ngủ",
              icon: ToggleRight,
            },
            {
              label: "Địa chỉ",
              value: "78 Hoàng Quốc Việt, Cầu Giấy, HN",
              icon: MapPin,
            },
            {
              label: "Khoảng cách",
              value: "1.8 km từ vị trí bạn",
              icon: Navigation,
            },
            {
              label: "Thời gian",
              value: "Ngay bây giờ",
              icon: Clock,
            },
            {
              label: "Mô tả",
              value:
                "Cầu dao MCB bị nhảy liên tục, không giữ được",
              icon: AlertCircle,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-start gap-3"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: theme.primaryLight }}
                >
                  <Icon
                    size={13}
                    style={{ color: theme.primary }}
                  />
                </div>
                <div>
                  <div className="text-xs text-gray-400">
                    {item.label}
                  </div>
                  <div className="text-sm font-medium text-[#111827] mt-0.5">
                    {item.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="flex items-center justify-between p-4 rounded-2xl border"
          style={{
            background: theme.primaryLight,
            borderColor: op(theme.primary, 0.2),
          }}
        >
          <div>
            <div
              className="text-xs font-semibold"
              style={{ color: theme.primary }}
            >
              Thu nhập ước tính
            </div>
            <div className="text-xl font-bold text-[#111827] font-mono mt-1">
              ~220.000đ
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 text-right">
              Thời gian
            </div>
            <div className="text-sm font-bold text-[#111827] text-right mt-1">
              ~1 giờ
            </div>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => onNavigate("dashboard")}
            className="flex-1 py-4 rounded-2xl border border-gray-200 text-gray-500 font-semibold text-sm"
          >
            Từ chối
          </button>
          <button
            onClick={() => onNavigate("active")}
            className="flex-1 py-4 rounded-2xl text-white font-bold text-sm shadow-lg"
            style={{ background: theme.gradient }}
          >
            Nhận đơn
          </button>
        </div>
      </div>
    </div>
  );
}

function WActive({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const theme = useTheme();
  const [statusIdx, setStatusIdx] = useState(1);
  const statuses = [
    "Đang di chuyển",
    "Đã đến nơi",
    "Đang sửa chữa",
    "Hoàn thành",
  ];
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-white">
      <MobileStatusBar />
      <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-3">
        <button
          onClick={() => onNavigate("dashboard")}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <ArrowLeft size={15} />
        </button>
        <h1 className="text-base font-bold text-[#111827] flex-1">
          Đơn đang thực hiện
        </h1>
        <span className="text-xs font-mono text-gray-400">
          ĐH-2939
        </span>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 pb-28 space-y-4 [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
          <WorkerAvatar name="Phạm Đức Thành" size={44} />
          <div className="flex-1">
            <div className="text-sm font-bold text-[#111827]">
              Phạm Đức Thành
            </div>
            <div className="text-xs text-gray-400 mt-0.5">
              78 Hoàng Quốc Việt, Cầu Giấy
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: theme.primaryLight }}
            >
              <Phone
                size={15}
                style={{ color: theme.primary }}
              />
            </button>
            <button
              onClick={() => onNavigate("wChat")}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: theme.primaryLight }}
            >
              <MessageSquare
                size={15}
                style={{ color: theme.primary }}
              />
            </button>
          </div>
        </div>
        <button className="w-full flex items-center gap-3 p-4 rounded-2xl bg-[#0D1117] text-white">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <Navigation
              size={17}
              style={{ color: theme.primary }}
            />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold">
              Dẫn đường tới khách
            </div>
            <div className="text-xs text-white/50 mt-0.5">
              1.8 km · ~10 phút đi xe máy
            </div>
          </div>
          <ChevronRight
            size={16}
            className="ml-auto text-white/40"
          />
        </button>
        <div>
          <div className="text-xs font-semibold text-[#374151] uppercase tracking-wide mb-3">
            Cập nhật trạng thái
          </div>
          <div className="flex flex-col gap-2">
            {statuses.map((s, i) => (
              <button
                key={s}
                onClick={() => setStatusIdx(i)}
                disabled={i > statusIdx + 1}
                className="flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all"
                style={{
                  borderColor:
                    i === statusIdx
                      ? theme.primary
                      : i < statusIdx
                        ? "#A7F3D0"
                        : "#F3F4F6",
                  background:
                    i === statusIdx
                      ? theme.primaryLight
                      : i < statusIdx
                        ? "#ECFDF5"
                        : "white",
                  opacity: i > statusIdx + 1 ? 0.5 : 1,
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      i < statusIdx
                        ? "#10B981"
                        : i === statusIdx
                          ? theme.primary
                          : "#E5E7EB",
                  }}
                >
                  {i < statusIdx ? (
                    <Check size={12} className="text-white" />
                  ) : (
                    <span className="text-white text-xs font-bold">
                      {i + 1}
                    </span>
                  )}
                </div>
                <span
                  className="text-sm font-medium"
                  style={{
                    color:
                      i === statusIdx
                        ? theme.primary
                        : i < statusIdx
                          ? "#065F46"
                          : "#9CA3AF",
                  }}
                >
                  {s}
                </span>
                {i === statusIdx && (
                  <ChevronRight
                    size={15}
                    className="ml-auto"
                    style={{ color: theme.primary }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        <button className="w-full p-4 rounded-2xl border-2 border-dashed border-gray-200 flex items-center gap-3 text-gray-400">
          <Plus size={18} />
          <span className="text-sm font-medium">
            Báo giá phát sinh
          </span>
        </button>
        {statusIdx === statuses.length - 1 && (
          <button
            onClick={() => onNavigate("dashboard")}
            className="w-full py-4 rounded-2xl text-white font-bold text-sm shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, #10B981, #059669)",
            }}
          >
            Xác nhận hoàn thành ✓
          </button>
        )}
      </div>
    </div>
  );
}

function WEarnings({
  onNavigate: _onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const theme = useTheme();
  const [period, setPeriod] = useState<
    "today" | "week" | "month"
  >("week");
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#F3F4F6]">
      <MobileStatusBar />
      <div className="px-5 py-3 bg-white border-b border-gray-100">
        <h1 className="text-base font-bold text-[#111827]">
          Thu nhập
        </h1>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 pb-24 space-y-4 [&::-webkit-scrollbar]:hidden">
        <div
          className="p-5 rounded-2xl text-white"
          style={{ background: theme.gradient }}
        >
          <div className="text-xs text-white/70 mb-1">
            Số dư ví
          </div>
          <div className="text-3xl font-bold font-mono">
            2.340.000đ
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-white/70">
            <TrendingUp size={12} />
            <span>Tháng này: +5.100.000đ</span>
          </div>
          <button className="mt-4 bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-xl">
            Rút tiền
          </button>
        </div>
        <div className="flex bg-white rounded-2xl p-1 border border-gray-100">
          {(["today", "week", "month"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="flex-1 py-2 rounded-xl text-xs font-semibold transition-colors"
              style={
                period === p
                  ? {
                      background: theme.primary,
                      color: "white",
                    }
                  : { color: "#9CA3AF" }
              }
            >
              {p === "today"
                ? "Hôm nay"
                : p === "week"
                  ? "Tuần này"
                  : "Tháng này"}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="text-xs font-semibold text-[#374151] mb-3">
            7 ngày gần nhất
          </div>
          <ResponsiveContainer width="100%" height={130}>
            <BarChart
              data={EARNINGS_DATA}
              margin={{
                left: -20,
                right: 0,
                top: 0,
                bottom: 0,
              }}
              barSize={24}
            >
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(v) => [`${v}K`, "Thu nhập"]}
                contentStyle={{
                  fontSize: 11,
                  background: "#111827",
                  border: "none",
                  borderRadius: 8,
                  color: "#fff",
                }}
              />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {EARNINGS_DATA.map((_, i) => (
                  <Cell
                    key={i}
                    fill={
                      i === 5
                        ? theme.primary
                        : theme.primaryMuted
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              label: "Tổng đơn",
              value: "47",
              unit: "đơn tuần này",
            },
            { label: "Đơn TB/ngày", value: "6.7", unit: "đơn" },
            {
              label: "Thu nhập TB",
              value: "732K",
              unit: "mỗi ngày",
            },
            {
              label: "Hoa hồng",
              value: "–155K",
              unit: "tuần này",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-3 border border-gray-100"
            >
              <div className="text-xs text-gray-400">
                {s.label}
              </div>
              <div className="text-base font-bold text-[#111827] font-mono mt-1">
                {s.value}
              </div>
              <div className="text-[10px] text-gray-400">
                {s.unit}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WProfile({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const theme = useTheme();
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#F3F4F6]">
      <MobileStatusBar />
      <div className="bg-white px-5 pt-3 pb-5">
        <h1 className="text-base font-bold text-[#111827] mb-4">
          Hồ sơ thợ
        </h1>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <WorkerAvatar name="Trần Minh Đức" size={64} />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
              <BadgeCheck size={14} className="text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="text-base font-bold text-[#111827]">
              Trần Minh Đức
            </div>
            <div className="text-xs text-gray-400">
              Điện dân dụng · 8 năm kinh nghiệm
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <Star
                size={12}
                className="fill-amber-400 text-amber-400"
              />
              <span className="text-xs font-bold">4.9</span>
              <span className="text-xs text-gray-400">
                · 1.247 đơn
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-2xl">
          <Shield
            size={16}
            className="text-emerald-600 flex-shrink-0"
          />
          <div className="flex-1">
            <div className="flex-1 bg-emerald-200 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full bg-emerald-500"
                style={{ width: "98%" }}
              />
            </div>
          </div>
          <span className="text-sm font-bold text-emerald-600 font-mono">
            98/100
          </span>
          <span className="text-xs text-emerald-600">
            Top 5%
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-2 pb-24 [&::-webkit-scrollbar]:hidden">
        <ProfileSection title="Hồ sơ nghề nghiệp">
          <ProfileItem
            label="Kỹ năng & Chuyên môn"
            icon={Zap}
            sub="Điện dân dụng, Lắp đặt, Cầu dao"
            onClick={() => onNavigate("wSkills")}
          />
          <ProfileItem
            label="Khu vực hoạt động"
            icon={Map}
            sub="Cầu Giấy, Đống Đa, Hoàng Mai"
            onClick={() => onNavigate("wAreas")}
          />
          <ProfileItem
            label="Lịch làm việc"
            icon={CalendarDays}
            sub="T2–CN · 7:00–20:00"
            onClick={() => onNavigate("wSchedule")}
          />
        </ProfileSection>
        <ProfileSection title="Xác minh & Chứng nhận">
          <ProfileItem
            label="Trạng thái xác minh"
            icon={UserCheck}
            sub="Đã xác minh CMND ✓"
            onClick={() => onNavigate("wVerification")}
          />
          <ProfileItem
            label="Bằng nghề & Chứng chỉ"
            icon={BadgeCheck}
            sub="Chứng chỉ điện dân dụng"
            onClick={() => onNavigate("wCertificates")}
          />
        </ProfileSection>
        <ProfileSection title="Tài chính">
          <ProfileItem
            label="Ngân hàng liên kết"
            icon={Banknote}
            sub="Vietcombank · ****3456"
            onClick={() => onNavigate("wBank")}
          />
          <ProfileItem
            label="Rút tiền"
            icon={DollarSign}
            sub="Số dư: 2.340.000đ"
            onClick={() => onNavigate("wWithdraw")}
          />
        </ProfileSection>
        <ProfileSection title="Hỗ trợ & Cài đặt">
          <ProfileItem
            label="Trung tâm trợ giúp"
            icon={HelpCircle}
            onClick={() => onNavigate("wHelp")}
          />
          <ProfileItem
            label="Báo cáo sự cố"
            icon={AlertCircle}
            onClick={() => onNavigate("wReportIssue")}
          />
        </ProfileSection>
        <div className="mt-4 mb-2">
          <ProfileItem
            label="Đăng xuất"
            icon={LogOut}
            danger
            onClick={() => alert("Đăng xuất (demo)")}
          />
        </div>
      </div>
    </div>
  );
}

function WSkills({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const theme = useTheme();
  const skills = [
    { label: "Điện dân dụng", level: "Chuyên gia" },
    { label: "Lắp đặt hệ thống điện", level: "Chuyên gia" },
    { label: "Thay cầu dao, aptomat", level: "Thành thạo" },
    { label: "Lắp đèn LED, ổ cắm", level: "Thành thạo" },
    { label: "Sửa chữa tủ điện", level: "Cơ bản" },
  ];
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#F3F4F6]">
      <MobileStatusBar />
      <DetailHeader
        title="Kỹ năng & Chuyên môn"
        onBack={() => onNavigate("profile")}
      />
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2.5 pb-24 [&::-webkit-scrollbar]:hidden">
        {skills.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-3.5 flex items-center gap-3"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: theme.primaryLight }}
            >
              <Zap size={16} style={{ color: theme.primary }} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-[#111827]">
                {s.label}
              </div>
            </div>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: theme.primaryLight,
                color: theme.primary,
              }}
            >
              {s.level}
            </span>
          </div>
        ))}
        <button
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl p-3.5 text-sm font-medium"
          style={{ color: theme.primary }}
        >
          <Plus size={16} /> Thêm kỹ năng
        </button>
      </div>
    </div>
  );
}

function WAreas({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const theme = useTheme();
  const areas = [
    { label: "Cầu Giấy", active: true },
    { label: "Đống Đa", active: true },
    { label: "Hoàng Mai", active: true },
    { label: "Thanh Xuân", active: false },
    { label: "Nam Từ Liêm", active: false },
  ];
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#F3F4F6]">
      <MobileStatusBar />
      <DetailHeader
        title="Khu vực hoạt động"
        onBack={() => onNavigate("profile")}
      />
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2.5 pb-24 [&::-webkit-scrollbar]:hidden">
        <p className="text-xs text-gray-400 mb-1">
          Chọn các quận/huyện bạn nhận đơn
        </p>
        {areas.map((a, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-3.5 flex items-center gap-3"
          >
            <MapPin
              size={16}
              className="flex-shrink-0"
              style={{
                color: a.active ? theme.primary : "#D1D5DB",
              }}
            />
            <span className="flex-1 text-sm font-medium text-[#111827]">
              {a.label}
            </span>
            <div
              className="w-9 h-5 rounded-full flex items-center px-0.5"
              style={{
                background: a.active
                  ? theme.primary
                  : "#E5E7EB",
              }}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${a.active ? "translate-x-4" : ""}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WSchedule({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const theme = useTheme();
  const days = [
    { d: "Thứ 2", hours: "7:00 - 20:00" },
    { d: "Thứ 3", hours: "7:00 - 20:00" },
    { d: "Thứ 4", hours: "7:00 - 20:00" },
    { d: "Thứ 5", hours: "7:00 - 20:00" },
    { d: "Thứ 6", hours: "7:00 - 20:00" },
    { d: "Thứ 7", hours: "8:00 - 18:00" },
    { d: "Chủ nhật", hours: "Nghỉ", off: true },
  ];
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#F3F4F6]">
      <MobileStatusBar />
      <DetailHeader
        title="Lịch làm việc"
        onBack={() => onNavigate("profile")}
      />
      <div className="flex-1 overflow-y-auto px-5 py-4 pb-24 [&::-webkit-scrollbar]:hidden">
        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100">
          {days.map((d, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3.5"
            >
              <Clock
                size={16}
                className="text-gray-400 flex-shrink-0"
              />
              <span className="flex-1 text-sm font-medium text-[#111827]">
                {d.d}
              </span>
              <span
                className={`text-xs font-mono ${d.off ? "text-gray-400" : "text-[#111827]"}`}
              >
                {d.hours}
              </span>
            </div>
          ))}
        </div>
        <button
          className="w-full mt-4 py-3 rounded-2xl text-sm font-semibold text-white"
          style={{ background: theme.primary }}
        >
          Chỉnh sửa lịch
        </button>
      </div>
    </div>
  );
}

function WVerification({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const items = [
    { label: "Số điện thoại", status: "Đã xác minh" },
    { label: "CMND/CCCD", status: "Đã xác minh" },
    { label: "Ảnh chân dung", status: "Đã xác minh" },
    { label: "Địa chỉ thường trú", status: "Đang chờ duyệt" },
  ];
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#F3F4F6]">
      <MobileStatusBar />
      <DetailHeader
        title="Trạng thái xác minh"
        onBack={() => onNavigate("profile")}
      />
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2.5 pb-24 [&::-webkit-scrollbar]:hidden">
        {items.map((it, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-3.5 flex items-center gap-3"
          >
            <CheckCircle
              size={18}
              className={
                it.status === "Đã xác minh"
                  ? "text-emerald-500"
                  : "text-amber-500"
              }
            />
            <span className="flex-1 text-sm font-medium text-[#111827]">
              {it.label}
            </span>
            <span
              className={`text-xs font-semibold ${it.status === "Đã xác minh" ? "text-emerald-600" : "text-amber-600"}`}
            >
              {it.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WCertificates({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const theme = useTheme();
  const certs = [
    {
      label: "Chứng chỉ điện dân dụng",
      issuer: "Sở LĐTBXH Hà Nội",
      exp: "Còn hạn đến 12/2027",
    },
    {
      label: "Chứng chỉ an toàn điện",
      issuer: "Trung tâm dạy nghề Hà Nội",
      exp: "Còn hạn đến 06/2027",
    },
  ];
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#F3F4F6]">
      <MobileStatusBar />
      <DetailHeader
        title="Bằng nghề & Chứng chỉ"
        onBack={() => onNavigate("profile")}
      />
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2.5 pb-24 [&::-webkit-scrollbar]:hidden">
        {certs.map((c, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-3.5 flex gap-3"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: theme.primaryLight }}
            >
              <FileText
                size={16}
                style={{ color: theme.primary }}
              />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-[#111827]">
                {c.label}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">
                {c.issuer}
              </div>
              <div className="text-xs text-emerald-600 mt-0.5">
                {c.exp}
              </div>
            </div>
          </div>
        ))}
        <button
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl p-3.5 text-sm font-medium"
          style={{ color: theme.primary }}
        >
          <Camera size={16} /> Tải lên chứng chỉ mới
        </button>
      </div>
    </div>
  );
}

function WBank({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const theme = useTheme();
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#F3F4F6]">
      <MobileStatusBar />
      <DetailHeader
        title="Ngân hàng liên kết"
        onBack={() => onNavigate("profile")}
      />
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2.5 pb-24 [&::-webkit-scrollbar]:hidden">
        <div className="bg-white rounded-2xl border border-gray-100 p-3.5 flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: theme.primaryLight }}
          >
            <Banknote
              size={16}
              style={{ color: theme.primary }}
            />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-[#111827]">
              Vietcombank
            </div>
            <div className="text-xs text-gray-400 mt-0.5">
              **** **** **** 3456 · Trần Minh Đức
            </div>
          </div>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: theme.primaryLight,
              color: theme.primary,
            }}
          >
            Mặc định
          </span>
        </div>
        <button
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl p-3.5 text-sm font-medium"
          style={{ color: theme.primary }}
        >
          <Plus size={16} /> Liên kết tài khoản khác
        </button>
      </div>
    </div>
  );
}

function WWithdraw({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const theme = useTheme();
  const [amount, setAmount] = useState("500000");
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#F3F4F6]">
      <MobileStatusBar />
      <DetailHeader
        title="Rút tiền"
        onBack={() => onNavigate("profile")}
      />
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 pb-24 [&::-webkit-scrollbar]:hidden">
        <div
          className="p-4 rounded-2xl text-white"
          style={{
            background:
              "linear-gradient(135deg, #0D1117, #1A2035)",
          }}
        >
          <div className="text-xs opacity-60">
            Số dư khả dụng
          </div>
          <div className="text-xl font-bold font-mono mt-1">
            2.340.000đ
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-[#374151] uppercase tracking-wide block mb-2">
            Số tiền muốn rút
          </label>
          <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 border border-gray-200">
            <DollarSign
              size={16}
              className="flex-shrink-0"
              style={{ color: theme.primary }}
            />
            <input
              className="flex-1 bg-transparent text-sm font-mono text-[#111827] outline-none"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <span className="text-sm text-gray-400">đ</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-3.5 flex items-center gap-3">
          <Banknote
            size={16}
            className="text-gray-400 flex-shrink-0"
          />
          <div className="flex-1 text-xs text-gray-500">
            Rút về Vietcombank **** 3456
          </div>
        </div>
        <button
          className="w-full py-3 rounded-2xl text-sm font-semibold text-white"
          style={{ background: theme.primary }}
        >
          Xác nhận rút tiền
        </button>
      </div>
    </div>
  );
}

function WHelp({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const faqs = [
    {
      q: "Khi nào tiền được cộng vào ví?",
      a: "Ngay sau khi khách xác nhận hoàn thành đơn, tiền sẽ được cộng vào số dư của bạn.",
    },
    {
      q: "Làm sao để tăng thứ hạng tìm kiếm?",
      a: "Duy trì tỷ lệ nhận đơn cao, đánh giá tốt và điểm tin cậy trên 90 sẽ giúp bạn hiện ưu tiên hơn.",
    },
    {
      q: "Tôi bị khách hủy đơn đột ngột thì sao?",
      a: "Bạn vẫn được ghi nhận công sức di chuyển và có thể báo cáo sự cố để được hỗ trợ bồi thường.",
    },
  ];
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#F3F4F6]">
      <MobileStatusBar />
      <DetailHeader
        title="Trung tâm trợ giúp"
        onBack={() => onNavigate("profile")}
      />
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2 pb-24 [&::-webkit-scrollbar]:hidden">
        {faqs.map((f, i) => (
          <FAQItem key={i} q={f.q} a={f.a} />
        ))}
      </div>
    </div>
  );
}

function WReportIssue({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const theme = useTheme();
  const [type, setType] = useState("Khách hàng vắng mặt");
  const [desc, setDesc] = useState("");
  const types = [
    "Khách hàng vắng mặt",
    "Sự cố kỹ thuật app",
    "Tranh chấp thanh toán",
    "Khác",
  ];
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-[#F3F4F6]">
      <MobileStatusBar />
      <DetailHeader
        title="Báo cáo sự cố"
        onBack={() => onNavigate("profile")}
      />
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 pb-24 [&::-webkit-scrollbar]:hidden">
        <div>
          <label className="text-xs font-semibold text-[#374151] uppercase tracking-wide block mb-2">
            Loại sự cố
          </label>
          <div className="grid grid-cols-2 gap-2">
            {types.map((t, i) => (
              <button
                key={i}
                onClick={() => setType(t)}
                className="py-2.5 rounded-xl border text-xs font-medium"
                style={
                  type === t
                    ? {
                        borderColor: theme.primary,
                        background: theme.primaryLight,
                        color: theme.primary,
                      }
                    : {
                        borderColor: "#E5E7EB",
                        color: "#374151",
                      }
                }
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-[#374151] uppercase tracking-wide block mb-2">
            Mô tả chi tiết
          </label>
          <textarea
            className="w-full bg-white rounded-2xl px-4 py-3 border border-gray-200 text-sm text-[#111827] outline-none min-h-24"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Mô tả sự việc..."
          />
        </div>
        <button
          className="w-full py-3 rounded-2xl text-sm font-semibold text-white"
          style={{ background: theme.primary }}
        >
          Gửi báo cáo
        </button>
      </div>
    </div>
  );
}

// ── Worker Phone ───────────────────────────────────────────────────────────────

type WScreen =
  | "dashboard"
  | "incoming"
  | "active"
  | "earnings"
  | "profile"
  | "wChat"
  | "wSkills"
  | "wAreas"
  | "wSchedule"
  | "wVerification"
  | "wCertificates"
  | "wBank"
  | "wWithdraw"
  | "wHelp"
  | "wReportIssue";
const W_PROFILE_SUB = [
  "profile",
  "wSkills",
  "wAreas",
  "wSchedule",
  "wVerification",
  "wCertificates",
  "wBank",
  "wWithdraw",
  "wHelp",
  "wReportIssue",
];
const W_NAV = [
  { id: "dashboard", icon: Home, label: "Trang chủ" },
  { id: "incoming", icon: Bell, label: "Đơn đến" },
  { id: "active", icon: Wrench, label: "Đang làm" },
  { id: "earnings", icon: Wallet, label: "Thu nhập" },
  { id: "profile", icon: User, label: "Hồ sơ" },
];

function WorkerPhone({ label }: { label: string }) {
  const theme = useTheme();
  const [screen, setScreen] = useState<WScreen>("dashboard");
  const [isOnline, setIsOnline] = useState(true);
  const nav = (s: string) => setScreen(s as WScreen);
  const activeNavId =
    screen === "wChat"
      ? "active"
      : W_PROFILE_SUB.includes(screen)
        ? "profile"
        : screen;

  const renderScreen = () => {
    switch (screen) {
      case "dashboard":
        return (
          <WDashboard
            onNavigate={nav}
            isOnline={isOnline}
            setOnline={setIsOnline}
          />
        );
      case "incoming":
        return <WIncoming onNavigate={nav} />;
      case "active":
        return <WActive onNavigate={nav} />;
      case "earnings":
        return <WEarnings onNavigate={nav} />;
      case "profile":
        return <WProfile onNavigate={nav} />;
      case "wChat":
        return <CChat onNavigate={nav} />;
      case "wSkills":
        return <WSkills onNavigate={nav} />;
      case "wAreas":
        return <WAreas onNavigate={nav} />;
      case "wSchedule":
        return <WSchedule onNavigate={nav} />;
      case "wVerification":
        return <WVerification onNavigate={nav} />;
      case "wCertificates":
        return <WCertificates onNavigate={nav} />;
      case "wBank":
        return <WBank onNavigate={nav} />;
      case "wWithdraw":
        return <WWithdraw onNavigate={nav} />;
      case "wHelp":
        return <WHelp onNavigate={nav} />;
      case "wReportIssue":
        return <WReportIssue onNavigate={nav} />;
      default:
        return (
          <WDashboard
            onNavigate={nav}
            isOnline={isOnline}
            setOnline={setIsOnline}
          />
        );
    }
  };

  return (
    <PhoneFrame label={label}>
      <div className="flex flex-col h-full relative">
        {renderScreen()}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center px-2 pt-2 pb-6 z-20">
          {W_NAV.map((item) => {
            const Icon = item.icon;
            const active = activeNavId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => nav(item.id)}
                className="flex-1 flex flex-col items-center gap-1 py-1 relative"
              >
                {item.id === "incoming" && isOnline && (
                  <span
                    className="absolute top-0 right-1/2 translate-x-2 -translate-y-0.5 w-2 h-2 rounded-full border border-white"
                    style={{ background: theme.primary }}
                  />
                )}
                <div
                  className="w-10 h-7 rounded-xl flex items-center justify-center"
                  style={
                    active
                      ? { background: theme.primaryLight }
                      : {}
                  }
                >
                  <Icon
                    size={19}
                    style={{
                      color: active ? theme.primary : "#D1D5DB",
                    }}
                  />
                </div>
                <span
                  className="text-[9px] font-medium"
                  style={{
                    color: active ? theme.primary : "#9CA3AF",
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </PhoneFrame>
  );
}

// ── ADMIN COMPONENTS ──────────────────────────────────────────────────────────

const ADMIN_PRIMARY = "#7C3AED";
const ADMIN_LIGHT = "#F5F3FF";

function AdminStatusBadge({ status }: { status: string }) {
  const m: Record<string, { label: string; cls: string }> = {
    completed: {
      label: "Hoàn thành",
      cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    in_progress: {
      label: "Đang làm",
      cls: "bg-blue-50 text-blue-700 border-blue-200",
    },
    pending: {
      label: "Chờ thợ",
      cls: "bg-amber-50 text-amber-700 border-amber-200",
    },
    cancelled: {
      label: "Hủy",
      cls: "bg-red-50 text-red-600 border-red-200",
    },
  };
  const s = m[status] ?? {
    label: status,
    cls: "bg-gray-100 text-gray-600 border-gray-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium border ${s.cls}`}
    >
      {s.label}
    </span>
  );
}

function AdminKpi({
  label,
  value,
  sub,
  trend,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  trend: number;
  icon: React.ElementType;
  accent?: boolean;
}) {
  const up = trend >= 0;
  return (
    <div
      className={`rounded-xl p-5 flex flex-col gap-3 ${accent ? "text-white" : "bg-card border border-border"}`}
      style={accent ? { background: ADMIN_PRIMARY } : {}}
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-[10px] font-medium tracking-widest uppercase ${accent ? "text-white/70" : "text-muted-foreground"}`}
        >
          {label}
        </span>
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center`}
          style={
            accent
              ? { background: "rgba(255,255,255,0.15)" }
              : { background: ADMIN_LIGHT }
          }
        >
          <Icon
            size={14}
            style={{ color: accent ? "white" : ADMIN_PRIMARY }}
          />
        </div>
      </div>
      <div>
        <div
          className={`text-2xl font-bold font-mono ${accent ? "text-white" : "text-foreground"}`}
        >
          {value}
        </div>
        <div
          className={`text-xs mt-0.5 ${accent ? "text-white/60" : "text-muted-foreground"}`}
        >
          {sub}
        </div>
      </div>
      <div
        className={`flex items-center gap-1 text-xs font-medium ${accent ? "text-white/80" : up ? "text-emerald-600" : "text-red-500"}`}
      >
        {up ? (
          <TrendingUp size={11} />
        ) : (
          <TrendingDown size={11} />
        )}
        {up ? "+" : ""}
        {trend}% so với tháng trước
      </div>
    </div>
  );
}

function AdminDashboardMain() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <AdminKpi
          label="Doanh thu tháng"
          value="88.4tr"
          sub="572 đơn hàng"
          trend={12.3}
          icon={TrendingUp}
          accent
        />
        <AdminKpi
          label="Đơn hôm nay"
          value="127"
          sub="47 đang thực hiện"
          trend={8.1}
          icon={ClipboardList}
        />
        <AdminKpi
          label="Thợ trực tuyến"
          value="83"
          sub="trong tổng số 241"
          trend={-3.2}
          icon={Wrench}
        />
        <AdminKpi
          label="Điểm hài lòng"
          value="4.82"
          sub="1.204 đánh giá"
          trend={0.4}
          icon={Star}
        />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground text-sm">
                Doanh thu & đơn hàng
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                9 tháng gần nhất
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart
              data={revenueData}
              margin={{
                top: 0,
                right: 0,
                left: -24,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="gR"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={ADMIN_PRIMARY}
                    stopOpacity={0.15}
                  />
                  <stop
                    offset="95%"
                    stopColor={ADMIN_PRIMARY}
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient
                  id="gO"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#3B82F6"
                    stopOpacity={0.12}
                  />
                  <stop
                    offset="95%"
                    stopColor="#3B82F6"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(0,0,0,0.05)"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 11,
                  background: "#1E1230",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  color: "#fff",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={ADMIN_PRIMARY}
                strokeWidth={2}
                fill="url(#gR)"
                dot={false}
                name="Doanh thu (tr)"
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#gO)"
                dot={false}
                name="Đơn hàng"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground text-sm mb-4">
            Cơ cấu dịch vụ
          </h3>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie
                data={serviceRevenueData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={58}
                dataKey="revenue"
                stroke="none"
              >
                {serviceRevenueData.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => [`${v}%`, ""]}
                contentStyle={{
                  fontSize: 11,
                  background: "#1E1230",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-1.5 mt-2">
            {serviceRevenueData.map((d) => (
              <div
                key={d.name}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: d.color }}
                  />
                  <span className="text-muted-foreground">
                    {d.name}
                  </span>
                </div>
                <span className="font-mono font-medium text-foreground">
                  {d.revenue}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground text-sm mb-3">
            Hoạt động thợ hôm nay
          </h3>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart
              data={workerActivityData}
              margin={{
                left: -24,
                right: 0,
                top: 0,
                bottom: 0,
              }}
              barGap={2}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(0,0,0,0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 9, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 11,
                  background: "#1E1230",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  color: "#fff",
                }}
              />
              <Bar
                dataKey="active"
                fill="#10B981"
                radius={[2, 2, 0, 0]}
                maxBarSize={14}
                name="Sẵn sàng"
              />
              <Bar
                dataKey="busy"
                fill={ADMIN_PRIMARY}
                radius={[2, 2, 0, 0]}
                maxBarSize={14}
                name="Đang bận"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground text-sm mb-3">
            Thợ xuất sắc · T9
          </h3>
          <div className="flex flex-col gap-2.5">
            {topWorkers.map((w, i) => (
              <div
                key={w.name}
                className="flex items-center gap-2.5"
              >
                <span className="text-xs font-mono text-muted-foreground w-4">
                  {i + 1}
                </span>
                <WorkerAvatar name={w.name} size={28} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-foreground truncate">
                    {w.name}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {w.specialty} · {w.orders} đơn
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-medium text-foreground">
                    {w.score}
                  </div>
                  <div
                    className={`text-[10px] ${w.status === "active" ? "text-emerald-600" : "text-blue-600"}`}
                  >
                    {w.status === "active" ? "Online" : "Bận"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground text-sm">
              Khiếu nại mới
            </h3>
            <span className="bg-red-50 text-red-600 border border-red-200 text-xs font-mono px-1.5 py-0.5 rounded">
              3
            </span>
          </div>
          {complaintsData
            .filter((c) => c.status === "open")
            .slice(0, 3)
            .map((c) => (
              <div
                key={c.id}
                className="mb-2 p-3 rounded-lg bg-secondary hover:bg-muted transition-colors cursor-pointer"
              >
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {c.id}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {c.time}
                  </span>
                </div>
                <div className="text-xs font-medium text-foreground">
                  {c.customer}
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5 truncate">
                  {c.issue}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="bg-card rounded-xl border border-border">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground text-sm">
            Đơn hàng gần đây
          </h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 text-xs text-muted-foreground border border-border rounded-lg px-2.5 py-1.5">
              <Filter size={11} /> Lọc
            </button>
            <button className="flex items-center gap-1 text-xs text-muted-foreground border border-border rounded-lg px-2.5 py-1.5">
              <Download size={11} /> Xuất
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                {[
                  "Mã đơn",
                  "Khách hàng",
                  "Dịch vụ",
                  "Thợ",
                  "Khu vực",
                  "Trạng thái",
                  "Giá trị",
                  "Giờ",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-muted-foreground font-medium tracking-widest uppercase text-[10px]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allOrdersData.slice(0, 5).map((o, i) => (
                <tr
                  key={o.id}
                  className={`border-b border-border last:border-0 hover:bg-secondary transition-colors ${i % 2 ? "bg-secondary/40" : ""}`}
                >
                  <td className="px-4 py-3 font-mono text-foreground font-medium">
                    {o.id}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {o.customer}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {o.service}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {o.worker}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {o.area}
                  </td>
                  <td className="px-4 py-3">
                    <AdminStatusBadge status={o.status} />
                  </td>
                  <td className="px-4 py-3 font-mono font-medium text-foreground">
                    {o.amount}
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">
                    {o.time}
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminOrders() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const statuses = [
    "all",
    "in_progress",
    "pending",
    "completed",
    "cancelled",
  ];
  const statusLabels: Record<string, string> = {
    all: "Tất cả",
    in_progress: "Đang làm",
    pending: "Chờ thợ",
    completed: "Hoàn thành",
    cancelled: "Đã hủy",
  };
  const filtered = allOrdersData.filter((o) => {
    if (statusFilter !== "all" && o.status !== statusFilter)
      return false;
    if (
      search &&
      !o.customer
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      !o.service.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            label: "Tổng đơn hôm nay",
            value: "127",
            color: "text-foreground",
          },
          {
            label: "Đang thực hiện",
            value: "47",
            color: "text-blue-600",
          },
          {
            label: "Hoàn thành",
            value: "73",
            color: "text-emerald-600",
          },
          {
            label: "Đã hủy",
            value: "7",
            color: "text-red-500",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-card rounded-xl border border-border p-4"
          >
            <div className="text-xs text-muted-foreground">
              {s.label}
            </div>
            <div
              className={`text-2xl font-bold font-mono mt-1 ${s.color}`}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-card rounded-xl border border-border p-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2 flex-1 min-w-48">
          <Search size={13} className="text-muted-foreground" />
          <input
            className="bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground flex-1"
            placeholder="Tìm kiếm khách hàng, dịch vụ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={
                statusFilter === s
                  ? {
                      background: ADMIN_PRIMARY,
                      color: "white",
                    }
                  : { color: "#6B7280" }
              }
            >
              {statusLabels[s]}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1 text-xs text-muted-foreground border border-border rounded-lg px-3 py-2">
          <Download size={11} /> Xuất CSV
        </button>
      </div>
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              {[
                "Mã đơn",
                "Khách hàng",
                "Dịch vụ",
                "Thợ phụ trách",
                "Khu vực",
                "Trạng thái",
                "Giá trị",
                "Thời gian",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-muted-foreground font-medium tracking-widest uppercase text-[10px]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((o, i) => (
              <tr
                key={o.id}
                className={`border-b border-border last:border-0 hover:bg-secondary/60 transition-colors ${i % 2 ? "bg-secondary/30" : ""}`}
              >
                <td
                  className="px-4 py-3 font-mono font-medium"
                  style={{ color: ADMIN_PRIMARY }}
                >
                  {o.id}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <WorkerAvatar name={o.customer} size={24} />
                    <span className="text-foreground">
                      {o.customer}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {o.service}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {o.worker}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {o.area}
                </td>
                <td className="px-4 py-3">
                  <AdminStatusBadge status={o.status} />
                </td>
                <td className="px-4 py-3 font-mono font-medium text-foreground">
                  {o.amount}
                </td>
                <td className="px-4 py-3 font-mono text-muted-foreground">
                  {o.time}
                </td>
                <td className="px-4 py-3">
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground text-sm">
            Không tìm thấy đơn hàng phù hợp
          </div>
        )}
        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Hiển thị {filtered.length} / {allOrdersData.length}{" "}
            đơn
          </span>
          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className="w-7 h-7 rounded text-xs font-medium"
                style={
                  p === 1
                    ? {
                        background: ADMIN_PRIMARY,
                        color: "white",
                      }
                    : { color: "#6B7280" }
                }
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminCustomers() {
  const [search, setSearch] = useState("");
  const statusMap: Record<
    string,
    { label: string; cls: string }
  > = {
    vip: {
      label: "VIP",
      cls: "bg-amber-50 text-amber-700 border-amber-200",
    },
    active: {
      label: "Hoạt động",
      cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    new: {
      label: "Mới",
      cls: "bg-blue-50 text-blue-700 border-blue-200",
    },
    inactive: {
      label: "Không HĐ",
      cls: "bg-gray-100 text-gray-500 border-gray-200",
    },
  };
  const filtered = customersData.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search),
  );
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            label: "Tổng khách hàng",
            value: "724",
            sub: "+97 tháng này",
            icon: Users,
          },
          {
            label: "Khách VIP",
            value: "48",
            sub: "≥20 đơn",
            icon: Award,
          },
          {
            label: "Khách mới T9",
            value: "97",
            sub: "+12% so với T8",
            icon: UserCheck,
          },
          {
            label: "Đang hoạt động",
            value: "631",
            sub: "87% tổng số",
            icon: Activity,
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-card rounded-xl border border-border p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                {s.label}
              </span>
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: ADMIN_LIGHT }}
              >
                <s.icon
                  size={13}
                  style={{ color: ADMIN_PRIMARY }}
                />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono text-foreground">
              {s.value}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {s.sub}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-card rounded-xl border border-border p-4 flex gap-3">
        <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2 flex-1">
          <Search size={13} className="text-muted-foreground" />
          <input
            className="bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground flex-1"
            placeholder="Tìm theo tên, số điện thoại..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-1 text-xs text-muted-foreground border border-border rounded-lg px-3 py-2">
          <Filter size={11} /> Lọc
        </button>
        <button className="flex items-center gap-1 text-xs text-muted-foreground border border-border rounded-lg px-3 py-2">
          <Download size={11} /> Xuất
        </button>
      </div>
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              {[
                "Khách hàng",
                "Số điện thoại",
                "Khu vực",
                "Tổng đơn",
                "Đã chi",
                "Rating",
                "Trạng thái",
                "Tham gia",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-muted-foreground font-medium tracking-widest uppercase text-[10px]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => {
              const s = statusMap[c.status];
              return (
                <tr
                  key={c.id}
                  className={`border-b border-border last:border-0 hover:bg-secondary/60 transition-colors ${i % 2 ? "bg-secondary/30" : ""}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <WorkerAvatar name={c.name} size={28} />
                      <div>
                        <div className="font-medium text-foreground">
                          {c.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono">
                          {c.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">
                    {c.phone}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {c.area}
                  </td>
                  <td className="px-4 py-3 font-mono font-medium text-foreground">
                    {c.orders}
                  </td>
                  <td className="px-4 py-3 font-mono font-medium text-foreground">
                    {c.spent}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star
                        size={10}
                        className="fill-amber-400 text-amber-400"
                      />
                      <span className="font-medium text-foreground">
                        {c.rating}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${s.cls}`}
                    >
                      {s.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {c.joined}
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-muted-foreground hover:text-foreground">
                      <Eye size={13} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Hiển thị {filtered.length} / {customersData.length}{" "}
            khách hàng
          </span>
          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className="w-7 h-7 rounded text-xs font-medium"
                style={
                  p === 1
                    ? {
                        background: ADMIN_PRIMARY,
                        color: "white",
                      }
                    : { color: "#6B7280" }
                }
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminWorkers() {
  const [statusFilter, setStatusFilter] = useState("all");
  const workerStatusMap: Record<
    string,
    { label: string; cls: string; dot: string }
  > = {
    active: {
      label: "Online",
      cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
    },
    busy: {
      label: "Đang bận",
      cls: "bg-blue-50 text-blue-700 border-blue-200",
      dot: "bg-blue-500",
    },
    offline: {
      label: "Offline",
      cls: "bg-gray-100 text-gray-500 border-gray-200",
      dot: "bg-gray-400",
    },
    pending: {
      label: "Chờ duyệt",
      cls: "bg-amber-50 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
    },
  };
  const statusTabs = [
    "all",
    "active",
    "busy",
    "offline",
    "pending",
  ];
  const statusTabLabels: Record<string, string> = {
    all: "Tất cả",
    active: "Online",
    busy: "Bận",
    offline: "Offline",
    pending: "Chờ duyệt",
  };
  const filtered = workersData.filter(
    (w) => statusFilter === "all" || w.status === statusFilter,
  );
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            label: "Tổng thợ",
            value: "241",
            sub: "Đang đăng ký",
            icon: Wrench,
          },
          {
            label: "Đang online",
            value: "83",
            sub: "34% sẵn sàng",
            icon: Activity,
          },
          {
            label: "Đang bận",
            value: "54",
            sub: "22% đang làm việc",
            icon: Clock,
          },
          {
            label: "Chờ duyệt",
            value: "12",
            sub: "Hồ sơ mới",
            icon: AlertCircle,
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-card rounded-xl border border-border p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                {s.label}
              </span>
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: ADMIN_LIGHT }}
              >
                <s.icon
                  size={13}
                  style={{ color: ADMIN_PRIMARY }}
                />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono text-foreground">
              {s.value}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {s.sub}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-card rounded-xl border border-border p-3 flex gap-1">
        {statusTabs.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className="flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={
              statusFilter === s
                ? { background: ADMIN_PRIMARY, color: "white" }
                : { color: "#6B7280" }
            }
          >
            {statusTabLabels[s]}
          </button>
        ))}
      </div>
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              {[
                "Thợ kỹ thuật",
                "Chuyên môn",
                "Trust Score",
                "Đơn hàng",
                "Doanh thu",
                "Rating",
                "Trạng thái",
                "Xác minh",
                "Tham gia",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-muted-foreground font-medium tracking-widest uppercase text-[10px]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((w, i) => {
              const s = workerStatusMap[w.status];
              return (
                <tr
                  key={w.id}
                  className={`border-b border-border last:border-0 hover:bg-secondary/60 transition-colors ${i % 2 ? "bg-secondary/30" : ""}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <WorkerAvatar name={w.name} size={28} />
                      <div>
                        <div className="font-medium text-foreground">
                          {w.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono">
                          {w.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {w.specialty}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            width: `${w.trust}%`,
                            background: ADMIN_PRIMARY,
                          }}
                        />
                      </div>
                      <span className="font-mono text-xs font-medium text-foreground">
                        {w.trust}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono font-medium text-foreground">
                    {w.orders.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-mono font-medium text-foreground">
                    {w.revenue}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star
                        size={10}
                        className="fill-amber-400 text-amber-400"
                      />
                      <span className="font-medium text-foreground">
                        {w.rating}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${s.dot}`}
                      />
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${s.cls}`}
                      >
                        {s.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {w.verified ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <BadgeCheck size={13} />
                        Đã xác minh
                      </span>
                    ) : (
                      <span className="text-amber-600 text-xs">
                        Chờ xét duyệt
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {w.joined}
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal size={13} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Hiển thị {filtered.length} / {workersData.length}{" "}
            thợ
          </span>
          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className="w-7 h-7 rounded text-xs font-medium"
                style={
                  p === 1
                    ? {
                        background: ADMIN_PRIMARY,
                        color: "white",
                      }
                    : { color: "#6B7280" }
                }
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminComplaints() {
  const [filter, setFilter] = useState("all");
  const severityMap: Record<
    string,
    { label: string; cls: string }
  > = {
    high: {
      label: "Nghiêm trọng",
      cls: "bg-red-50 text-red-700 border-red-200",
    },
    medium: {
      label: "Trung bình",
      cls: "bg-amber-50 text-amber-700 border-amber-200",
    },
    low: {
      label: "Nhẹ",
      cls: "bg-gray-100 text-gray-600 border-gray-200",
    },
  };
  const statusMap: Record<
    string,
    { label: string; cls: string }
  > = {
    open: {
      label: "Chưa xử lý",
      cls: "bg-red-50 text-red-600 border-red-200",
    },
    processing: {
      label: "Đang xử lý",
      cls: "bg-blue-50 text-blue-600 border-blue-200",
    },
    resolved: {
      label: "Đã giải quyết",
      cls: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
  };
  const filtered = complaintsData.filter(
    (c) => filter === "all" || c.status === filter,
  );
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            label: "Tổng khiếu nại",
            value: String(complaintsData.length),
            color: "text-foreground",
            icon: AlertCircle,
          },
          {
            label: "Chưa xử lý",
            value: String(
              complaintsData.filter((c) => c.status === "open")
                .length,
            ),
            color: "text-red-600",
            icon: AlertCircle,
          },
          {
            label: "Đang xử lý",
            value: String(
              complaintsData.filter(
                (c) => c.status === "processing",
              ).length,
            ),
            color: "text-blue-600",
            icon: Clock,
          },
          {
            label: "Đã giải quyết",
            value: String(
              complaintsData.filter(
                (c) => c.status === "resolved",
              ).length,
            ),
            color: "text-emerald-600",
            icon: CheckCircle,
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-card rounded-xl border border-border p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                {s.label}
              </span>
              <s.icon size={14} className={s.color} />
            </div>
            <div
              className={`text-2xl font-bold font-mono ${s.color}`}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-card rounded-xl border border-border p-3 flex gap-1">
        {["all", "open", "processing", "resolved"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className="flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={
              filter === s
                ? { background: ADMIN_PRIMARY, color: "white" }
                : { color: "#6B7280" }
            }
          >
            {
              {
                all: "Tất cả",
                open: "Chưa xử lý",
                processing: "Đang xử lý",
                resolved: "Đã giải quyết",
              }[s]
            }
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((c) => {
          const sev = severityMap[c.severity];
          const st = statusMap[c.status];
          return (
            <div
              key={c.id}
              className="bg-card rounded-xl border border-border p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <WorkerAvatar name={c.customer} size={36} />
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {c.customer}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 font-mono">
                      {c.id} · {c.time}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${sev.cls}`}
                  >
                    {sev.label}
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${st.cls}`}
                  >
                    {st.label}
                  </span>
                </div>
              </div>
              <div className="bg-secondary rounded-lg p-3 mb-3">
                <div className="text-xs text-muted-foreground mb-1">
                  Nội dung khiếu nại · Dịch vụ: {c.service}
                </div>
                <div className="text-sm text-foreground">
                  {c.issue}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Wrench size={12} />
                  <span>
                    Thợ liên quan:{" "}
                    <span className="text-foreground font-medium">
                      {c.worker}
                    </span>
                  </span>
                </div>
                {c.status !== "resolved" && (
                  <div className="flex gap-2">
                    {c.status === "open" && (
                      <button className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:bg-secondary">
                        Bỏ qua
                      </button>
                    )}
                    <button
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
                      style={{ background: ADMIN_PRIMARY }}
                    >
                      {c.status === "open"
                        ? "Xử lý ngay"
                        : "Đánh dấu giải quyết"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AdminAnalytics() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground text-sm mb-1">
            Tăng trưởng khách hàng
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Khách mới & Tổng khách theo tháng
          </p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart
              data={customerGrowthData}
              margin={{
                top: 0,
                right: 0,
                left: -24,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="gNew"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={ADMIN_PRIMARY}
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor={ADMIN_PRIMARY}
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient
                  id="gTotal"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#10B981"
                    stopOpacity={0.12}
                  />
                  <stop
                    offset="95%"
                    stopColor="#10B981"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(0,0,0,0.05)"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 11,
                  background: "#1E1230",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  color: "#fff",
                }}
              />
              <Area
                type="monotone"
                dataKey="new"
                stroke={ADMIN_PRIMARY}
                strokeWidth={2}
                fill="url(#gNew)"
                dot={false}
                name="Khách mới"
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#gTotal)"
                dot={false}
                name="Tổng khách"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground text-sm mb-1">
            Doanh thu theo dịch vụ điện
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Phân bổ doanh thu T9/2026
          </p>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart
              data={serviceRevenueData}
              layout="vertical"
              margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis
                type="number"
                tick={{ fontSize: 9, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fontSize: 10, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 11,
                  background: "#1E1230",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  color: "#fff",
                }}
              />
              <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                {serviceRevenueData.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-1">
            {serviceRevenueData.map((d) => (
              <div
                key={d.name}
                className="flex items-center gap-2 text-xs"
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: d.color }}
                />
                <span className="text-muted-foreground flex-1">
                  {d.name}
                </span>
                <span className="font-mono font-medium text-foreground">
                  {d.revenue}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground text-sm mb-4">
            Phân bố đánh giá
          </h3>
          {ratingDistribution.map((r) => (
            <div
              key={r.stars}
              className="flex items-center gap-3 mb-2.5"
            >
              <span className="text-xs font-mono text-foreground w-6">
                {r.stars}
              </span>
              <div className="flex-1 bg-secondary rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${r.pct}%`,
                    background:
                      r.pct >= 50
                        ? "#10B981"
                        : r.pct >= 20
                          ? ADMIN_PRIMARY
                          : "#F59E0B",
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground font-mono w-12 text-right">
                {r.count}
              </span>
              <span className="text-xs text-muted-foreground w-8 text-right">
                {r.pct}%
              </span>
            </div>
          ))}
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <div className="text-center">
              <div className="text-2xl font-bold font-mono text-foreground">
                4.82
              </div>
              <div className="text-xs text-muted-foreground">
                Điểm TB
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold font-mono text-foreground">
                1,204
              </div>
              <div className="text-xs text-muted-foreground">
                Đánh giá
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold font-mono text-emerald-600">
                91%
              </div>
              <div className="text-xs text-muted-foreground">
                Tích cực
              </div>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground text-sm mb-4">
            Top khu vực · T9/2026
          </h3>
          {districtData.map((d, i) => (
            <div
              key={d.district}
              className="flex items-center gap-3 mb-3 last:mb-0"
            >
              <span className="text-xs font-mono text-muted-foreground w-4">
                {i + 1}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">
                    {d.district}
                  </span>
                  <span className="text-xs font-mono font-medium text-foreground">
                    {d.revenue}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-secondary rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${(d.orders / 200) * 100}%`,
                        background: ADMIN_PRIMARY,
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {d.orders} đơn
                  </span>
                  <span
                    className={`text-[10px] font-medium ${d.growth >= 0 ? "text-emerald-600" : "text-red-500"}`}
                  >
                    {d.growth >= 0 ? "+" : ""}
                    {d.growth}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-semibold text-foreground text-sm mb-4">
          Hoạt động thợ theo giờ
        </h3>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart
            data={workerActivityData}
            margin={{ left: -20, right: 0, top: 0, bottom: 0 }}
            barGap={3}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(0,0,0,0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                fontSize: 11,
                background: "#1E1230",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                color: "#fff",
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar
              dataKey="active"
              fill="#10B981"
              radius={[3, 3, 0, 0]}
              maxBarSize={18}
              name="Sẵn sàng"
            />
            <Bar
              dataKey="busy"
              fill={ADMIN_PRIMARY}
              radius={[3, 3, 0, 0]}
              maxBarSize={18}
              name="Đang bận"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function AdminSettings() {
  const [commission, setCommission] = useState(15);
  const [radius, setRadius] = useState(5);
  const [autoMatch, setAutoMatch] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [emailReport, setEmailReport] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-start">
      {/* Cột trái */}
      <div className="flex flex-col gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground text-sm mb-4 flex items-center gap-2">
            <Sliders size={15} style={{ color: ADMIN_PRIMARY }} />
            Cài đặt nền tảng
          </h3>
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-foreground font-medium">Tỷ lệ hoa hồng nền tảng</label>
                <span className="text-sm font-bold font-mono" style={{ color: ADMIN_PRIMARY }}>{commission}%</span>
              </div>
              <input
                type="range" min="5" max="30" value={commission}
                onChange={(e) => setCommission(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: ADMIN_PRIMARY }}
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1"><span>5%</span><span>30%</span></div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-foreground font-medium">Bán kính tìm thợ</label>
                <span className="text-sm font-bold font-mono" style={{ color: ADMIN_PRIMARY }}>{radius} km</span>
              </div>
              <input
                type="range" min="1" max="20" value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: ADMIN_PRIMARY }}
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1"><span>1 km</span><span>20 km</span></div>
            </div>
            <div className="flex items-center justify-between py-3 border-t border-border">
              <div>
                <div className="text-sm text-foreground font-medium">Tự động ghép cặp thợ</div>
                <div className="text-xs text-muted-foreground mt-0.5">Tự động gửi đơn đến thợ phù hợp nhất</div>
              </div>
              <button
                onClick={() => setAutoMatch(!autoMatch)}
                className="relative w-12 h-6 rounded-full transition-colors"
                style={{ background: autoMatch ? ADMIN_PRIMARY : "#CBD5E1" }}
              >
                <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform" style={{ transform: autoMatch ? "translateX(26px)" : "translateX(2px)" }} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Timeout nhận đơn", value: "30 giây" },
                { label: "Bảo hành mặc định", value: "30 ngày" },
                { label: "Giá tối thiểu", value: "100.000đ" },
                { label: "Giá tối đa", value: "5.000.000đ" },
              ].map((s) => (
                <div key={s.label} className="p-3 bg-secondary rounded-lg">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{s.label}</div>
                  <div className="text-sm font-semibold text-foreground mt-1">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground text-sm mb-4 flex items-center gap-2">
            <Zap size={15} style={{ color: ADMIN_PRIMARY }} />
            Quản lý dịch vụ điện
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {SERVICES.map((svc) => {
              const Icon = svc.icon;
              return (
                <div key={svc.id} className="flex items-center gap-2.5 p-3 bg-secondary rounded-lg">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: svc.bg }}>
                    <Icon size={15} style={{ color: svc.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-foreground truncate">{svc.label}</div>
                    <div className="text-[10px] text-muted-foreground font-mono">15% hoa hồng</div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cột phải */}
      <div className="flex flex-col gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground text-sm mb-4 flex items-center gap-2">
            <Bell size={15} style={{ color: ADMIN_PRIMARY }} />
            Thông báo hệ thống
          </h3>
          <div className="space-y-4">
            {[
              { label: "SMS thông báo", sub: "Gửi SMS xác nhận đơn hàng cho khách & thợ", state: smsNotif, set: setSmsNotif },
              { label: "Báo cáo email", sub: "Email báo cáo doanh thu hàng ngày cho admin", state: emailReport, set: setEmailReport },
              { label: "Push notification", sub: "Thông báo đẩy trên app di động", state: pushNotif, set: setPushNotif },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <div className="text-sm text-foreground font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.sub}</div>
                </div>
                <button
                  onClick={() => item.set(!item.state)}
                  className="relative w-12 h-6 rounded-full transition-colors"
                  style={{ background: item.state ? ADMIN_PRIMARY : "#CBD5E1" }}
                >
                  <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform" style={{ transform: item.state ? "translateX(26px)" : "translateX(2px)" }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground text-sm mb-4 flex items-center gap-2">
            <Globe size={15} style={{ color: ADMIN_PRIMARY }} />
            Trạng thái hệ thống
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Matching Engine", uptime: "99.9%" },
              { label: "Geospatial API", uptime: "99.7%" },
              { label: "Trust Score", uptime: "100%" },
              { label: "Payment Gateway", uptime: "99.8%" },
              { label: "SMS Service", uptime: "98.9%" },
              { label: "Database", uptime: "99.99%" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div>
                  <div className="text-xs font-medium text-foreground">{s.label}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Uptime: {s.uptime}</div>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md flex-shrink-0">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-700">OK</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-secondary rounded-lg flex items-center justify-between">
            <div className="text-xs text-muted-foreground">Phiên bản hệ thống</div>
            <span className="text-xs font-mono font-medium text-foreground">v2.4.1 · Build 2026.09.21</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const adminNavItems = [
  {
    id: "dashboard",
    label: "Tổng quan",
    icon: LayoutDashboard,
  },
  {
    id: "orders",
    label: "Đơn hàng",
    icon: ClipboardList,
    badge: 127,
  },
  { id: "customers", label: "Khách hàng", icon: Users },
  { id: "workers", label: "Thợ kỹ thuật", icon: Wrench },
  {
    id: "complaints",
    label: "Khiếu nại",
    icon: AlertCircle,
    badge: 3,
  },
  { id: "analytics", label: "Thống kê", icon: BarChart2 },
  { id: "settings", label: "Cài đặt", icon: Settings },
];

function AdminDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeNav) {
      case "dashboard":
        return <AdminDashboardMain />;
      case "orders":
        return <AdminOrders />;
      case "customers":
        return <AdminCustomers />;
      case "workers":
        return <AdminWorkers />;
      case "complaints":
        return <AdminComplaints />;
      case "analytics":
        return <AdminAnalytics />;
      case "settings":
        return <AdminSettings />;
      default:
        return <AdminDashboardMain />;
    }
  };

  return (
    <div
      className="flex h-full overflow-hidden"
      style={
        {
          "--primary": ADMIN_PRIMARY,
          "--primary-foreground": "#FFFFFF",
          "--accent": ADMIN_LIGHT,
          "--accent-foreground": ADMIN_PRIMARY,
          "--ring": ADMIN_PRIMARY,
          "--sidebar": "#170F2E",
          "--sidebar-foreground": "#E2E8F0",
          "--sidebar-primary": ADMIN_PRIMARY,
          "--sidebar-primary-foreground": "#FFFFFF",
          "--sidebar-accent": "#231A45",
          "--sidebar-accent-foreground": "#CBD5E1",
          "--sidebar-border": "rgba(255,255,255,0.07)",
          "--sidebar-ring": ADMIN_PRIMARY,
        } as React.CSSProperties
      }
    >
      <aside
        className="flex flex-col bg-sidebar border-r border-sidebar-border flex-shrink-0 transition-all"
        style={{ width: collapsed ? 64 : 220 }}
      >
        <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: ADMIN_PRIMARY }}
          >
            <Zap size={15} className="text-white" />
          </div>
          {!collapsed && (
            <div>
              <div className="text-white font-bold text-sm tracking-wide">
                THỢ ĐIỆN
              </div>
              <div className="text-sidebar-foreground/40 text-[10px] tracking-widest uppercase">
                Admin Console
              </div>
            </div>
          )}
        </div>
        <nav className="flex-1 py-3">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const active = item.id === activeNav;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors relative ${active ? "bg-sidebar-accent text-white" : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/60"}`}
              >
                <div className="relative flex-shrink-0">
                  <Icon size={15} />
                  {(item as { badge?: number }).badge && (
                    <span
                      className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 text-white text-[9px] rounded-full flex items-center justify-center font-mono"
                      style={{ background: ADMIN_PRIMARY }}
                    >
                      {(item as { badge?: number }).badge! > 99
                        ? "99+"
                        : (item as { badge?: number }).badge}
                    </span>
                  )}
                </div>
                {!collapsed && (
                  <span className="truncate">{item.label}</span>
                )}
                {active && (
                  <span
                    className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r"
                    style={{ background: ADMIN_PRIMARY }}
                  />
                )}
              </button>
            );
          })}
        </nav>
        {!collapsed && (
          <div className="mx-3 mb-3 p-3 rounded-lg bg-sidebar-accent border border-sidebar-border">
            <div className="text-[10px] text-sidebar-foreground/50 uppercase tracking-wider mb-2">
              Thuật toán
            </div>
            {["Matching", "Geospatial", "Trust Score"].map(
              (a) => (
                <div
                  key={a}
                  className="flex items-center justify-between mb-1"
                >
                  <span className="text-[11px] text-sidebar-foreground/60 font-mono">
                    {a}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full" />
                    OK
                  </span>
                </div>
              ),
            )}
          </div>
        )}
        <div
          className="flex items-center gap-3 px-4 py-4 border-t border-sidebar-border cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          <div
            className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
            style={{ background: ADMIN_PRIMARY }}
          >
            A
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-sidebar-foreground truncate">
                Admin Hệ thống
              </div>
              <div className="text-[10px] text-sidebar-foreground/40">
                super_admin
              </div>
            </div>
          )}
        </div>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-3.5 bg-card border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="text-sm font-semibold text-foreground">
              {
                adminNavItems.find((n) => n.id === activeNav)
                  ?.label
              }
            </div>
            <div className="text-[10px] text-muted-foreground font-mono hidden md:block">
              Thứ Tư, 23/09/2026 · 14:35
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden md:flex items-center bg-secondary border border-border rounded-lg px-3 py-1.5 gap-2 w-48">
              <Search
                size={12}
                className="text-muted-foreground"
              />
              <span className="text-xs text-muted-foreground">
                Tìm kiếm...
              </span>
            </div>
            <button className="relative w-8 h-8 rounded-lg border border-border bg-secondary flex items-center justify-center text-muted-foreground">
              <Bell size={13} />
              <span
                className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
                style={{ background: ADMIN_PRIMARY }}
              />
            </button>
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-lg px-2 py-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono font-medium text-emerald-700">
                LIVE
              </span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-5 [&::-webkit-scrollbar]:hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

// ── ROOT APP ──────────────────────────────────────────────────────────────────

type AppMode = "mobile" | "admin";

export default function App() {
  const [mode, setMode] = useState<AppMode>("mobile");
  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <header className="flex items-center justify-between px-6 py-3 bg-[#0D1117] border-b border-white/8 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: ADMIN_PRIMARY }}
          >
            <Zap size={14} className="text-white" />
          </div>
          <div>
            <span className="text-white font-bold text-sm tracking-wide">
              THỢ ĐIỆN
            </span>
            <span className="text-white/30 text-xs ml-2">
              · UI Prototype
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-white/8 rounded-xl p-1">
          {(
            [
              {
                id: "mobile",
                label: "App Di động",
                icon: Phone,
              },
              {
                id: "admin",
                label: "Web Quản trị",
                icon: LayoutDashboard,
              },
            ] as {
              id: AppMode;
              label: string;
              icon: React.ElementType;
            }[]
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setMode(id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
              style={
                mode === id
                  ? {
                      background: ADMIN_PRIMARY,
                      color: "white",
                    }
                  : { color: "rgba(255,255,255,0.5)" }
              }
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          v1.0.0-mvp · T9/2026
        </div>
      </header>
      {mode === "admin" ? (
        <div className="flex-1 overflow-hidden bg-background">
          <AdminDashboard />
        </div>
      ) : (
        <div className="flex-1 overflow-auto bg-[#F0F2F5] [&::-webkit-scrollbar]:hidden">
          <div className="text-center py-4 px-6">
            <p className="text-xs text-muted-foreground">
              <span
                className="font-semibold"
                style={{ color: GREEN_THEME.primary }}
              >
                App Khách hàng
              </span>{" "}
              ·{" "}
              <span
                className="font-semibold"
                style={{ color: BLUE_THEME.primary }}
              >
                App Thợ kỹ thuật
              </span>{" "}
              · Nhấn vào các màn hình để điều hướng
            </p>
          </div>
          <div className="flex items-start justify-center gap-12 px-6 pb-10">
            <ThemeCtx.Provider value={GREEN_THEME}>
              <CustomerPhone />
            </ThemeCtx.Provider>
            <ThemeCtx.Provider value={BLUE_THEME}>
              <WorkerPhone label="App Thợ kỹ thuật" />
            </ThemeCtx.Provider>
          </div>
        </div>
      )}
    </div>
  );
}
