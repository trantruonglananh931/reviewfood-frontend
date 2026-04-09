🚀 Blog Platform Frontend - React + TypeScript
📌 Overview

This project is a React Frontend Application (TypeScript) for the Blog Platform API, designed to provide a clean and user-friendly interface for interacting with the backend system.

The application allows users to browse blog posts, view details, interact through comments and reactions, and authenticate securely using JWT.

👉 This frontend consumes a deployed Spring Boot RESTful API.

🌐 Backend API

🔗 Base URL:
https://reviewfood-h4j4.onrender.com

⚠️ Note:

Backend is hosted on a free cloud service (Render)
First request may take 20–50 seconds to wake up
✨ Features
🔐 Authentication
User registration
User login
JWT token storage (localStorage / sessionStorage)
Auto attach token to API requests
📰 Blog Features
View all posts
View post details
Responsive UI for reading content
💬 Interaction Features
Comment on posts
View comments by post
React to posts:
LIKE 👍
LOVE ❤️
ANGRY 😡

👉 Each user can react only once per post

👤 User Experience
Clean UI with modern design
Loading states (handling API delay)
Error handling & notifications
Responsive (mobile-friendly)
🏗️ Project Structure
src/
│── components/      # Reusable UI components
│── pages/           # Page-level components
│── services/        # API calls (Axios)
│── hooks/           # Custom React hooks
│── types/           # TypeScript interfaces/types
│── utils/           # Helper functions
│── context/         # Auth context (JWT handling)
│── App.tsx
│── main.tsx
🛠️ Tech Stack
React
TypeScript
Axios
React Router DOM
Tailwind CSS (or CSS/SCSS tùy bạn)
Vite (recommended) / CRA
🔐 Authentication Flow
User logs in
Backend returns JWT token
Token is stored in browser
All protected requests include:
Authorization: Bearer <token>
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