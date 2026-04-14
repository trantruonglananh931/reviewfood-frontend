# 🔄 Quick Switch Between Local & Production

## Tóm Tắt Nhanh

|      Command      |          Dùng cho          | Nhận xét |
|-------------------|----------------------------|---------|
| `npm run dev`     | 💻 Local Development       | Backend: `http://localhost:3001/api` |
| `npm run build`   | 🚀 Production Build        | Backend: `/api` (Render) |
| `npm run preview` | 🧪 Test Production Locally | Xem trước build production |

---

## 🏠 Chạy Local (Development)

```bash
npm run dev
```

**Kết quả:**
- Frontend: http://localhost:5173
- Backend: http://localhost:3001/api (qua `.env.local`)

---

## 🚀 Deploy Production (Render)

### Bước 1: Build Local
```bash
npm run build
```

### Bước 2: Push lên Git
```bash
git add .
git commit -m "Update deployment"
git push origin main
```

### Bước 3: Render tự động deploy
- Render sẽ tự động build & deploy sau khi push
- Website sẽ available ở: `https://reviewfood-frontend.onrender.com`

---

## 📝 File Cấu Hình

### `.env.local` ← Local Development
```
VITE_API_URL=http://localhost:3001/api
```

### `.env.production` ← Production (Render)
```
VITE_API_URL=/api
```

### `render.yaml` ← Deploy Config
Tự động cấu hình trên Render

---

## ✅ Kiểm Tra Configuration

```bash
# Kiểm tra local environment
cat .env.local

# Kiểm tra production environment
cat .env.production

# Test production build locally
npm run build && npm run preview
```

---

## 🐛 Nếu Gặp Lỗi

### Backend API không response
1. Kiểm tra backend đang chạy: `http://localhost:3001`
2. Cập nhật `.env.local` nếu port khác
3. Restart dev server: Ctrl+C → `npm run dev`

### Build thất bại
```bash
# Clear cache
rm -rf dist node_modules/.vite

# Cài lại
npm install

# Build lại
npm run build
```

---

## 📊 Status

- **Local**: ✅ Sẵn sàng
- **Production (Render)**: ✅ Sẵn sàng
- **API Proxy**: ✅ Configured
- **Environment Variables**: ✅ Setup

---

**Chi tiết đầy đủ**: Xem [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
