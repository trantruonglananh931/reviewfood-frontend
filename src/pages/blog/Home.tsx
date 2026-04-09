import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Chào mừng! 👋
          </h1>

          <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-lg text-gray-700 mb-2">
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Username:</span> {user?.username}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600 text-lg">
              Bạn đã đăng nhập thành công! Trang Home đang được phát triển.
            </p>
            <p className="text-gray-600 text-lg">
              Sắp có: Danh sách bài viết, bình luận, và các tính năng khác.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
