# Hướng Dẫn Deploy ReviewFood Frontend

## 📋 Tổng Quát

Dự án được setup để chạy trên 2 environment:
- **Local**: Chạy trên máy local kết nối tới backend local @ `http://localhost:3001`
- **Production**: Deploy trên Render, sử dụng `/api` (proxy tới backend)

---

## 🏠 Phần 1: Chạy Local (Development)

### 1.1 Cài Đặt Dependency
```bash
npm install
```

### 1.2 Kiểm Tra File `.env.local`
File `.env.local` đã được setup:
```
VITE_API_URL=http://localhost:3001/api
```

### 1.3 Khởi Động Development Server
```bash
npm run dev
```

Ứng dụng sẽ chạy ở `http://localhost:5173` và kết nối tới backend tại `http://localhost:3001/api`

---

## 🚀 Phần 2: Deploy Lên Render (Production)

### 2.1 Chuẩn Bị Render
1. Vào [https://render.com](https://render.com)
2. Login/Sign up với tài khoản của bạn
3. New → Static Site hoặc Web Service

### 2.2 Kết Nối Git Repository
1. Click "Connect a repository"
2. Chọn GitHub repository chứa code (`reviewfood-frontend`)
3. Chọn branch muốn deploy (e.g., `main`)

### 2.3 Cấu Hình Build Settings
Render sẽ tự động đọc `render.yaml` và setup:

- **Build Command**: `npm run build`
- **Publish Directory**: `./dist`
- **Environment Variables**: `VITE_API_URL=/api`

### 2.4 Deploy
1. Render sẽ tự động build khi push code lên branch
2. Hoặc manual: Dashboard → Service → Manual Deploy

---

## 🔄 Phần 3: Chuyển Đổi Giữa 2 Phiên Bản

### Chuyển sang Local (Development)
Đảm bảo sử dụng `.env.local`:
```bash
# Xóa cache build (optional)
rm -rf dist

# Chạy dev mode
npm run dev
```

**Cấu hình hiện tại trong `.env.local`:**
```
VITE_API_URL=http://localhost:3001/api
```

### Chuyển sang Production (Test Build)
Để test bản build production trước khi deploy:
```bash
# Build production
npm run build

# Preview production build locally
npm run preview
```

**Cấu hình production trong `.env.production`:**
```
VITE_API_URL=/api
```

### Cách Chuyển Đổi Backend API
Nếu muốn đổi backend endpoint local, chỉnh sửa `.env.local`:

```bash
# .env.local - sửa URL backend local
VITE_API_URL=http://localhost:YOUR_PORT/api
```

Sau đó restart dev server:
```bash
# Dừng dev server (Ctrl+C)
# Chạy lại dev server
npm run dev
```

---

## 📁 File Cấu Hình

### `.env.local` (Development)
```
VITE_API_URL=http://localhost:3001/api
```
- Sử dụng khi chạy `npm run dev`
- **KHÔNG** commit lên Git

### `.env.production` (Production)
```
VITE_API_URL=/api
```
- Sử dụng khi build production (`npm run build`)
- Sử dụng relative path `/api` cho Render

### `render.yaml` (Render Config)
```yaml
services:
  - type: web
    name: reviewfood-frontend
    env: static
    buildCommand: npm run build
    staticPublishPath: ./dist
    envVars:
      - key: VITE_API_URL
        scope: build
        value: /api
```

### `vite.config.ts`
```typescript
server: {
  proxy: {
    '/api': {
      target: process.env.VITE_API_URL || 'http://localhost:3001',
      changeOrigin: true,
      secure: false,
      ws: true,
    },
  },
}
```

---

## ✅ Checklist

### Trước khi push lên Render
- [ ] Chạy `npm run build` không lỗi
- [ ] Chạy `npm run preview` test bản build
- [ ] `.env.local` không được committed (kiểm tra `.gitignore`)

### Development Checklist
- [ ] `npm install` cài đủ dependency
- [ ] `.env.local` đã setup
- [ ] Backend local đang chạy ở port 3001
- [ ] `npm run dev` khởi động thành công

---

## 🐛 Troubleshooting

### "Cannot GET /api/..." khi chạy local
**Nguyên nhân**: Backend không chạy hoặc sai port
**Giải pháp**: 
- Kiểm tra backend đang chạy ở port nào
- Cập nhật `VITE_API_URL` trong `.env.local`
- Restart dev server

### "CORS error" khi gọi API trên Production
**Nguyên nhân**: Backend không setup CORS cho frontend URL
**Giải pháp**:
- Kiểm tra backend CORS config
- Thêm Render deploy URL vào CORS allowlist

### Build thất bại trên Render
**Nguyên nhân**: Đôi khi là cache issue
**Giải pháp**:
- Clear build cache: Render Dashboard → Settings → Clear Build Cache
- Manual redeploy

---

## 📞 Links Hữu Ích

- [Vite Docs](https://vitejs.dev/)
- [Render Docs](https://docs.render.com/)
- [Environment Variables in Render](https://docs.render.com/environment-variables)
- [Static Site Deployment](https://docs.render.com/static-sites)
