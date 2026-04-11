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
        <Link to="/" className="text-xl font-bold text-red-600">ReviewFood</Link>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-red-500 hover:text-orange-600 font-medium">Trang Chủ</a>
          <a href="#" className="text-red-500 hover:text-orange-600 font-medium">Danh Mục</a>
          <a href="#" className="text-red-500 hover:text-orange-600 font-medium">Về Chúng Tôi</a>
        </div>
      </div>

      {/* Profile Dropdown */}
      <div className="relative">
        <button 
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center space-x-2 text-red-500 hover:text-orange-600 font-medium focus:outline-none"
        >
          <span>Hồ Sơ</span>
          <span className="text-2xl">👤</span>
        </button>

        {/* Dropdown Menu */}
        {showProfileMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-amber-50 border border-amber-200 rounded-lg shadow-lg z-50">
            {isAuthenticated && user ? (
              <>
                <div className="px-4 py-3 border-b border-amber-200">
                  <p className="text-sm font-semibold text-gray-800">{user.username || user.email}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-orange-100 font-medium"
                >
                  Đăng Xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setShowProfileMenu(false)}
                  className="block px-4 py-2 text-red-600 hover:bg-orange-100 font-medium"
                >
                  Đăng Nhập
                </Link>
                <Link
                  to="/register"
                  onClick={() => setShowProfileMenu(false)}
                  className="block px-4 py-2 text-red-600 hover:bg-orange-100 font-medium border-t border-amber-200"
                >
                  Đăng Ký
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
