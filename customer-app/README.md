# Thợ Nhanh – App Khách hàng (React Native / Expo)

Frontend **App Khách hàng**, dựng theo bản thiết kế Figma Make và **đã gắn backend FastAPI**
(`fastapi-main`). Mọi dữ liệu (dịch vụ, đơn, thợ, chat, địa chỉ, thanh toán...) lấy qua API trong `src/api/`.

- Expo SDK 57 · React Native 0.86 · TypeScript
- Không dùng thư viện điều hướng ngoài: một router nhỏ tự viết (giống luồng `useState` của bản thiết kế)

---

## 1. Chuẩn bị (làm 1 lần)

1. Cài **Node.js bản LTS** (https://nodejs.org) – kiểm tra: `node -v`
2. Trên điện thoại cài app **Expo Go** (App Store / Google Play)
3. Điện thoại và máy tính phải **cùng mạng Wi-Fi**

## 2. Chạy backend trước

Trong thư mục `fastapi-main` (cần PostgreSQL + PostGIS, đã chạy `db/schema.sql`):

```bash
pip install -r requirements.txt
cp .env.example .env        # sửa DATABASE_URL, JWT_SECRET
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

`--host 0.0.0.0` để điện thoại trong cùng Wi-Fi gọi được. Cần có ít nhất 1 danh mục + dịch vụ
(tạo bằng web quản trị, hoặc chạy `python -m scripts.seed_dashboard`).

## 3. Chạy app

Mở terminal tại thư mục project (thư mục có file `package.json`):

```bash
cp .env.example .env        # sửa EXPO_PUBLIC_API_URL = IP máy chạy backend
npm install
npx expo install --fix
npx expo start -c
```

- Xem IP máy: Windows `ipconfig` (IPv4 Address), Linux/macOS `ip a` / `ifconfig`.
- Đổi `.env` xong phải chạy lại `npx expo start -c`.
- Màn đăng nhập hiện địa chỉ máy chủ đang dùng ở cuối trang để kiểm tra.
- Windows: nếu điện thoại không gọi được backend, mở cổng 8000 trong Windows Firewall.

- `npx expo install --fix` đảm bảo mọi thư viện đúng phiên bản với Expo Go.
- Khi `expo start` chạy sẽ hiện **mã QR** trong terminal:
  - **Android**: mở Expo Go → *Scan QR code* → quét mã.
  - **iPhone**: mở app **Camera** → quét mã → bấm thông báo mở bằng Expo Go.

Lưu code là app tự reload trên điện thoại.

## 4. Test luồng khi chưa có app thợ / thuật toán ghép

Đơn tạo xong ở trạng thái "Đang tìm thợ". Dùng script giả lập thợ trong `fastapi-main`
(mã đơn xem ở app, dạng `ĐH-12` -> 12):

```bash
python -m scripts.simulate_worker 12 accepted
python -m scripts.simulate_worker 12 on_the_way
python -m scripts.simulate_worker 12 in_progress
python -m scripts.simulate_worker 12 quote 50000 "Thay van khoá"
python -m scripts.simulate_worker 12 completed
python -m scripts.simulate_worker 12 confirm-cash
```

App tự cập nhật sau vài giây (màn Thợ phù hợp / Theo dõi / Chat tự hỏi lại server).
Thanh toán MoMo/VNPay đang là sandbox giả lập: chỉ chạy khi backend để `DEBUG=true`.

## 5. Lỗi thường gặp

| Lỗi | Cách xử lý |
|---|---|
| Điện thoại không kết nối được | Chạy `npx expo start --tunnel` (lần đầu sẽ hỏi cài `@expo/ngrok`, chọn Yes). Hoặc tắt VPN / kiểm tra cùng Wi-Fi. |
| "Project is incompatible with this version of Expo Go" | Expo Go đã lên SDK mới hơn: `npx expo install expo@latest` rồi `npx expo install --fix`. |
| Lỗi lạ sau khi đổi thư viện | `npx expo start -c` (xóa cache). |
| "Không kết nối được máy chủ" | Kiểm tra `EXPO_PUBLIC_API_URL` đúng IP LAN, backend chạy `--host 0.0.0.0`, cùng Wi-Fi, firewall mở cổng 8000. |
| Đăng nhập báo không phải tài khoản khách | Tài khoản thợ/admin không dùng được app này, đăng ký tài khoản mới. |
| Ô nhập chữ bị bàn phím che (Android) | Báo lại để chỉnh `KeyboardAvoidingView` trong `src/navigation/CustomerApp.tsx`. |

Muốn xem thử không cần điện thoại: cài Android Studio / Xcode rồi bấm `a` (Android) hoặc `i` (iOS) trong terminal đang chạy Expo.

## 6. Cấu trúc thư mục

```
App.tsx                      Điểm vào (SafeAreaProvider + AuthProvider)
src/
  api/
    client.ts                fetch + token + timeout + đổi lỗi FastAPI thành câu tiếng Việt
    types.ts                 Kiểu dữ liệu khớp schema backend
    index.ts                 Mỗi hàm = 1 endpoint (api.createOrder, api.getTracking...)
  auth/AuthContext.tsx       Đăng nhập/đăng ký/đăng xuất, lưu token bằng expo-secure-store
  hooks/
    useApi.ts                useApi (tải + loading/lỗi/làm mới), useInterval (polling)
    useCurrentOrder.ts       Tìm đơn đang chạy khi mở tab Theo dõi / Tin nhắn
  utils/format.ts            Ngày giờ (giờ VN), tiền, nhãn trạng thái, khoảng cách, icon dịch vụ
  utils/cancel.ts            Hộp chọn lý do hủy đơn
  theme/index.ts             Màu, gradient, shadow (theme xanh lá)
  data/mock.ts               Nội dung tĩnh còn lại: FAQ, thẻ nhận xét nhanh
  navigation/                ScreenName, BACK_MAP, params (orderId, service), shell + thanh tab
  components/                Icon, Avatar, StarRating, PulseDot, Screen/Header, BottomNav,
                             GradientButton, ProfileParts, StateView (đang tải/lỗi/rỗng)
  screens/                   17 màn hình (thêm Đăng nhập, Thông báo)
```

## 7. Danh sách màn hình

| Tab | Màn hình | File |
|---|---|---|
| Trang chủ | Trang chủ | `HomeScreen` |
| | Đặt dịch vụ | `BookScreen` |
| | Thợ phù hợp (ghép cặp) | `MatchScreen` |
| Theo dõi | Theo dõi thợ (bản đồ + tiến trình) | `TrackScreen` |
| Tin nhắn | Chat với thợ | `ChatScreen` |
| Đơn hàng | Lịch sử đơn hàng | `HistoryScreen` |
| | Đánh giá dịch vụ | `ReviewScreen` |
| (trước khi vào app) | Đăng nhập / Đăng ký | `LoginScreen` |
| Trang chủ | Thông báo (bấm chuông) | `NotificationsScreen` |
| Tài khoản | Tài khoản | `ProfileScreen` |
| | Đánh giá của tôi | `ReviewsMineScreen` |
| | Phương thức thanh toán | `PaymentMethodsScreen` |
| | Lịch sử giao dịch | `TransactionsScreen` |
| | Thông tin cá nhân | `PersonalInfoScreen` |
| | Địa chỉ của tôi | `AddressesScreen` |
| | Trung tâm trợ giúp | `HelpCenterScreen` |
| | Liên hệ CSKH | `SupportContactScreen` |

Luồng chính: Trang chủ → chọn dịch vụ → Đặt dịch vụ → Thợ phù hợp → Chọn thợ → Theo dõi → Chat.

## 8. Màn hình nào gọi API nào

| Màn hình | API |
|---|---|
| Đăng nhập | `POST /auth/register`, `POST /auth/login`, `GET /auth/me` |
| Trang chủ | `GET /catalog/services`, `GET /customer/orders?group=active|completed`, `GET /notifications/unread-count` |
| Đặt dịch vụ | `GET /customer/addresses`, `POST /customer/orders` |
| Thợ phù hợp | `GET /customer/orders/{id}` (5s/lần), `GET /customer/workers/{id}`, `PATCH .../cancel` |
| Theo dõi | `GET /customer/orders/{id}`, `GET .../tracking` (5s/lần), `POST .../extra-quotes/{qid}/approve|reject`, `POST .../payments`, `POST /customer/payments/{id}/sandbox-confirm`, `POST .../complaints`, `POST /customer/warranties/{id}/claim` |
| Chat | `GET/POST /orders/{id}/messages` (4s/lần), `POST .../messages/read` |
| Đánh giá | `POST /customer/orders/{id}/review` |
| Lịch sử đơn | `GET /customer/orders` (phân trang) |
| Tài khoản | các API đếm ở trên + `GET /customer/reviews`, `GET /customer/payments` |
| Thông tin cá nhân | `PATCH /customer/profile` |
| Địa chỉ | `GET/POST/PATCH/DELETE /customer/addresses` (+ GPS bằng `expo-location`) |
| Thông báo | `GET /notifications`, `PATCH /notifications/{id}/read`, `PATCH /notifications/read-all` |

## 9. Ghi chú

- Luồng: Trang chủ → Đặt dịch vụ → Thợ phù hợp (chờ thợ nhận) → Theo dõi → Chat → (hoàn thành) Thanh toán → Đánh giá.
- Bấm đơn trong Lịch sử: đơn chưa có thợ mở "Thợ phù hợp", còn lại mở "Theo dõi" (có thanh toán, đánh giá, bảo hành).
- Giờ hẹn luôn tính theo giờ Việt Nam, không phụ thuộc múi giờ điện thoại.
- Bản đồ ở màn Theo dõi vẫn là hình minh hoạ; khoảng cách/ETA tính từ toạ độ thật (Haversine).
- Chưa có: upload ảnh (backend chưa có API), WebSocket (đang dùng polling), push FCM, cổng MoMo/VNPay thật.
