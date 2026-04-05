🚀 Blog Frontend - React Client
📌 Overview

This project is a React Frontend Application for a Blog Platform, built to interact with a Spring Boot RESTful API.

The frontend allows users to:

Browse blog posts
View post details
Comment on posts
React to posts (LIKE, LOVE, ANGRY)
Authenticate using JWT

👉 This application consumes a deployed backend API and provides a clean, user-friendly interface.

🌐 Backend API

🔗 Base URL:
https://reviewfood-h4j4.onrender.com

⚠️ Note:

The backend is hosted on a free cloud service
It may take 20–50 seconds to wake up on the first request
✨ Features
🔐 Authentication
Register new account
Login with JWT
Store token in localStorage
Attach token to API requests
📝 Blog Features
View all posts
View post details
Display comments by post
Add comments
React to posts
💬 Interaction System
Comment system per post
Reaction system (1 user = 1 reaction per post)
Dynamic UI updates after interactions
🏗️ Project Structure
src/
│── api/                # Handle API calls (axios)
│── pages/              # Main pages (Home, Detail, Login...)
│── components/         # Reusable UI components
│── routes/             # Routing setup
│── hooks/              # Custom hooks (optional)
│── utils/              # Helper functions
│── App.jsx
│── main.jsx
🛠️ Tech Stack
React (Vite)
Axios
React Router
Tailwind CSS (optional)
📡 API Integration
🔑 Authentication
POST /api/auth/register
POST /api/auth/login
📝 Posts
GET /api/posts
💬 Comments
GET  /api/comments/{postId}
POST /api/comments/{postId}
❤️ Reactions
POST /api/reactions/{postId}?type=LIKE
🔐 Authentication Handling
After login → store JWT in localStorage
Attach token to requests:
Authorization: Bearer <token>
⚙️ Setup & Run
1. Install dependencies
npm install
2. Run development server
npm run dev

👉 App runs at:

http://localhost:5173
🔧 Environment Config (Recommended)

Create .env file:

VITE_API_URL=https://reviewfood-h4j4.onrender.com/api

Then use in code:

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});
🚧 Future Improvements
Pagination for posts
Search & filtering
UI/UX improvements
Image upload support
Dark mode
Responsive design optimization