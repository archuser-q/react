// Cấu hình lúc chạy cho bản web (Docker ghi đè file này từ biến môi trường API_URL).
// Để trống apiUrl: app tự gọi http://<máy đang mở web>:8000/api/v1
window.__THONHANH_CONFIG__ = window.__THONHANH_CONFIG__ || { apiUrl: '' };
