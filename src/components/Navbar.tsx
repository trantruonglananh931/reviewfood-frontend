import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="w-full bg-gradient-to-r from-yellow-300 to-orange-100 px-8 py-4 flex items-center justify-between border-b border-amber-200 shadow-sm">
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-xl font-bold text-red-600">🍽️ ReviewFood</Link>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-red-500 hover:text-orange-600 font-medium">Trang Chủ</a>
          <a href="#" className="text-red-500 hover:text-orange-600 font-medium">Danh Mục</a>
          <a href="#" className="text-red-500 hover:text-orange-600 font-medium">Về Chúng Tôi</a>
        </div>
      </div>

      {/* Auth Buttons / Profile */}
      <div className="flex items-center space-x-3">
        {isAuthenticated && user ? (
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 px-4 py-2 rounded-sm text-red-600 hover:bg-orange-200 font-medium"
            >
              <span>👤 {user.username || user.email}</span>
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-sm shadow-lg z-50">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-800">{user.username || user.email}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-medium"
                >
                  Đăng Xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="px-5 py-2 text-blue-600 border-2 border-blue-600 hover:bg-blue-50 font-semibold rounded-full transition-all duration-200"
            >
              Đăng Nhập
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 text-white bg-orange-600 hover:bg-orange-700 font-semibold rounded-full transition-all duration-200 shadow-md"
            >
              Đăng Ký
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
