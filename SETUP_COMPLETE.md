# 📋 Deployment Setup Summary

Ngày Setup: 9 Tháng 4, 2026

## ✅ Điều kiện đã xong

### 1. Local Development Environment
- ✅ File `.env.local` đã tạo
  ```
  VITE_API_URL=http://localhost:3001/api
  ```
- ✅ `package.json` setup với scripts: `dev`, `build`, `preview`
- ✅ `vite.config.ts` đã update để đọc env variables

### 2. Production Environment  
- ✅ File `.env.production` đã tồn tại
  ```
  VITE_API_URL=/api
  ```
- ✅ `render.yaml` đã cấu hình sẵn

### 3. Configuration Files
- ✅ `axiosClient.ts` sử dụng `import.meta.env.VITE_API_URL`
- ✅ `.gitignore` bảo vệ `.env.local` (không commit)

### 4. Documentation
- ✅ `DEPLOYMENT_GUIDE.md` - Hướng dẫn chi tiết
- ✅ `QUICK_SWITCH.md` - Quick reference
- ✅ Scripts: `switch-to-local.sh`, `build-production.sh`

---

## 🚀 Cách Sử Dụng

### Option 1: Local Development
```bash
npm run dev
```
- Frontend: http://localhost:5173
- API: http://localhost:3001/api

### Option 2: Production Build
```bash
npm run build
```
Output: `./dist` (ready for Render)

### Option 3: Test Production Locally
```bash
npm run build
npm run preview
```

---

## 📤 Deploy lên Render

### Lần Đầu (Setup)
1. Vào https://render.com
2. New → Static Site
3. Connect GitHub repository: `reviewfood-frontend`
4. Render sẽ tự động đọc `render.yaml`
5. Click Deploy

### Những Lần Sau (Auto Deploy)
```bash
git push origin main
# Render tự động build & deploy
```

---

## 🔀 Chuyển Đổi Giữa 2 Bản

### → Sang Local
```bash
npm run dev
```

### → Sang Production
```bash
npm run build
git push origin main  # Render sẽ deploy
```

---

## 📁 Project Structure

```
reviewfood-frontend/
├── .env.local              ← Local config (NOT committed)
├── .env.production         ← Production config
├── vite.config.ts          ← Vite config (env-aware)
├── render.yaml             ← Render deploy config
├── DEPLOYMENT_GUIDE.md     ← Full guide
├── QUICK_SWITCH.md         ← Quick reference
└── scripts/
    ├── switch-to-local.sh
    └── build-production.sh
```

---

## 🔗 Environment Setup

| Environment | API URL | File | Used by |
|------------|---------|------|---------|
| Development | `http://localhost:3001/api` | `.env.local` | `npm run dev` |
| Production | `/api` | `.env.production` | `npm run build` |

---

## ⚙️ Vite Config

`vite.config.ts` đã update để:
- Đọc `VITE_API_URL` từ `.env.local` hoặc `.env.production`
- Setup API proxy cho development
- Fallback nếu env không tìm thấy

---

## 🧪 Testing

### Test Local Development
```bash
npm run dev
# Mở http://localhost:5173 kiểm tra
```

### Test Production Build
```bash
npm run build
npm run preview
# Mở http://localhost:4173 kiểm tra
```

---

## 📊 Frontend Deployment Status

| Component | Status | Notes |
|-----------|--------|-------|
| Local Dev | ✅ Ready | `npm run dev` |
| Production Build | ✅ Ready | `npm run build` |
| Render Deploy | ✅ Ready | `git push origin main` |
| API Proxy | ✅ Configured | Hỗ trợ localhost & /api |
| Env Variables | ✅ Setup | .env.local & .env.production |

---

## 💡 Next Steps

1. **Kiểm tra Backend**
   - Đảm bảo backend đang chạy ở `http://localhost:3001`
   - Hoặc update port trong `.env.local`

2. **Test Local**
   ```bash
   npm run dev
   ```

3. **Deploy Production**
   ```bash
   npm run build
   git push origin main
   ```

---

## 🆘 Cần Sự Giúp Đỡ?

- **Local not connecting to API?** → Kiểm tra port backend & update `.env.local`
- **Build failed?** → Xem error logs, thử `npm install` lại
- **Production not working?** → Kiểm tra Render dashboard logs

---

**Setup by**: GitHub Copilot
**Date**: April 9, 2026
**Status**: ✅ Complete & Ready to Deploy
