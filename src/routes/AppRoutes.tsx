import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/blog/Home";
import PostDetail from "../pages/blog/PostDetail";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/posts/:id" element={<PostDetail />} />

      {/* Protected Routes */}

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;