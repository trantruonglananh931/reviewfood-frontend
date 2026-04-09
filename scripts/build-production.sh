#!/bin/bash

# Build for Production

echo "🚀 Building for Production..."

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
  echo "❌ .env.production not found!"
  echo "Creating .env.production..."
  cat > .env.production << EOF
VITE_API_URL=/api
EOF
  echo "✅ .env.production created with default values"
fi

echo "📦 Building application..."
npm run build

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Build successful!"
  echo ""
  echo "📝 Production Configuration:"
  echo "  - Build output: ./dist"
  echo "  - Backend API: /api (relative path)"
  echo ""
  echo "🧪 To preview the production build locally, run:"
  echo "  npm run preview"
  echo ""
  echo "📤 Next steps to deploy on Render:"
  echo "  1. Push code to GitHub (main branch)"
  echo "  2. Render will automatically build and deploy"
  echo "  3. Your site will be available at: https://reviewfood-frontend.onrender.com"
else
  echo "❌ Build failed!"
  exit 1
fi
