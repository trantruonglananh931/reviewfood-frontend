#!/bin/bash

# Switch to Local Development Environment

echo "🔄 Switching to Local Development Environment..."

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
  echo "❌ .env.local not found!"
  echo "Creating .env.local..."
  cat > .env.local << EOF
VITE_API_URL=http://localhost:3001/api
EOF
  echo "✅ .env.local created with default values"
fi

# Check if vite dev server is running, if not start it
if ! lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
  echo "ℹ️  Dev server not running. Starting npm run dev..."
  npm run dev
else
  echo "✅ Dev server already running at http://localhost:5173"
fi

echo ""
echo "📝 Configuration:"
echo "  - Frontend: http://localhost:5173"
echo "  - Backend API: http://localhost:3001/api (from .env.local)"
echo ""
echo "💡 To stop the dev server, press Ctrl+C"
