#!/bin/sh
# Chạy mỗi lần container khởi động: ghi địa chỉ API vào /config.js cho bản web.
# Để trống API_URL -> app tự gọi http://<máy đang mở trang>:8000/api/v1 (chạy chung máy với backend là được).
set -e
cat > /usr/share/nginx/html/config.js <<CFG
window.__THONHANH_CONFIG__ = { apiUrl: "${API_URL:-}" };
CFG
echo "[worker-app] API_URL='${API_URL:-<tự động: cùng máy, cổng 8000>}'"
