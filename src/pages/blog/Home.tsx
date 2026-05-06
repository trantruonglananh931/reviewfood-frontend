import { useEffect, useState } from 'react';
import CreatePostModal from '../../components/CreatePostModal';
import PostCard from '../../components/PostCard';
import { getAllPosts } from '../../api/postApi';
import { useAuth } from '../../context/AuthContext';
import type { Post } from '../../types/post';

function Home() {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllPosts();
      setPosts(data);
    } catch (err: any) {
      console.error('Failed to fetch posts:', err);
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Không thể tải danh sách bài viết. Vui lòng thử lại sau.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-yellow-50 to-orange-50">
      <div className="container">
        <div className="flex flex-col md:flex-row ">
          {/* Bảng tin 4/12 */}
          <div className="w-full md:w-4/12 ">
            {/* Create Post Button - For authenticated users */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-white shadow-sm p-4 hover:shadow-md transition-shadow mb-6 rounded"
            >
              <div className="flex items-center gap-3 text-gray-600 hover:text-blue-600">
                <span className="text-2xl">✏️</span>
                <span className="font-semibold">Bạn đang nghĩ gì?</span>
              </div>
            </button>

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 p-4 mb-8">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="">
                {/* Skeleton loaders */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-6 animate-pulse">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-48 bg-gray-200 rounded mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Posts Feed */}
            {!loading && !error && (
              <div className="bg-white shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">💡 Mẹo Viết Review Tuyệt Vời</h2>
                <ul className="space-y-4 text-sm text-gray-700">
                  <li>
                    <div className="font-semibold">🔹 Mô tả chi tiết hương vị</div>
                    <span className="block text-gray-600">Không chỉ nói "ngon", hãy mô tả vị chua, cay, mặn, ngọt</span>
                  </li>
                  <li>
                    <div className="font-semibold">🔹 Nhận xét chất lượng nguyên liệu</div>
                    <span className="block text-gray-600">Tươi sống, độ chín, độ nóng/lạnh phù hợp</span>
                  </li>
                  <li>
                    <div className="font-semibold">🔹 Đánh giá phục vụ & không gian</div>
                    <span className="block text-gray-600">Tốc độ phục vụ, sạch sẽ, không khí quán</span>
                  </li>
                  <li>
                    <div className="font-semibold">🔹 So sánh giá với chất lượng</div>
                    <span className="block text-gray-600">Đáng tiền hay không? So với quán khác thế nào?</span>
                  </li>
                </ul>
              </div>
            )}
            
          </div>

          {/* Tin ngắn 4/12 */}
          <div className="w-full md:w-4/12">
            <div className="bg-white shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-orange-600 mb-4">⭐ Review tốt nhất</h2>
              <ul className="space-y-2 mb-4">
                <li className="text-gray-700 text-sm font-semibold">Đặc điểm:</li>
                <li className="text-gray-700 text-sm">- Mô tả chi tiết, cụ thể từng phần ăn</li>
                <li className="text-gray-700 text-sm">- Có ảnh chất lượng, rõ nét</li>
                <li className="text-gray-700 text-sm">- So sánh hợp lý với giá cả</li>
                <li className="text-gray-700 text-sm">- Nhận xét về phục vụ & không gian</li>
              </ul>
              <h2 className="text-lg font-semibold text-orange-600 mb-4">🍕 Phân loại nhà hàng</h2>
              <ul className="space-y-2 mb-4">
                <li className="text-gray-700 text-sm">- Ăn vặt: nhanh, rẻ, tiện</li>
                <li className="text-gray-700 text-sm">- Bình dân: đa dạng, giá tốt</li>
                <li className="text-gray-700 text-sm">- Cao cấp: chất lượng cao, phục vụ tốt</li>
              </ul>
              <h2 className="text-lg font-semibold text-orange-600 mb-4">📊 Yếu tố ảnh hưởng đánh giá</h2>
              <ul className="space-y-2 mb-4">
                <li className="text-gray-700 text-sm">- Hương vị: chiếm 40% đánh giá</li>
                <li className="text-gray-700 text-sm">- Giá cả: chiếm 30% đánh giá</li>
                <li className="text-gray-700 text-sm">- Chất lượng: chiếm 20% đánh giá</li>
                <li className="text-gray-700 text-sm">- Không gian & phục vụ: chiếm 10%</li>
              </ul>
              <h2 className="text-lg font-semibold text-orange-600 mb-4">✅ Lưu ý khi review</h2>
              <ul className="space-y-2">
                <li className="text-gray-700 text-sm">- Trung thực, khách quan</li>
                <li className="text-gray-700 text-sm">- Tránh bình luận mang tính cá nhân</li>
                <li className="text-gray-700 text-sm">- Ghi chú tên món ăn cụ thể</li>
                <li className="text-gray-700 text-sm">- Cập nhật ngày viết review</li>
              </ul>
            </div>
          </div>

          {/* Phần thứ 3 - 4/12 */}
          <div className="w-full md:w-4/12">
            <div className="bg-white shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-blue-600 mb-4">�️ Cách đánh giá chi tiết</h2>
              <ul className="space-y-3">
                <li className="text-gray-700 text-sm">
                  <span className="font-semibold">Hương vị</span>
                  <span className="block text-gray-600">Mô tả vị cơ bản, độ nóng, độ chín</span>
                </li>
                <li className="text-gray-700 text-sm">
                  <span className="font-semibold">Chất lượng</span>
                  <span className="block text-gray-600">Nguyên liệu tươi, sạch sẽ, an toàn</span>
                </li>
                <li className="text-gray-700 text-sm">
                  <span className="font-semibold">Giá cả</span>
                  <span className="block text-gray-600">Xứng đáng so với phần ăn và chất lượng</span>
                </li>
                <li className="text-gray-700 text-sm">
                  <span className="font-semibold">Phục vụ</span>
                  <span className="block text-gray-600">Tốc độ, thái độ, chuyên nghiệp</span>
                </li>
                <li className="text-gray-700 text-sm">
                  <span className="font-semibold">Không gian</span>
                  <span className="block text-gray-600">Sạch sẽ, thoải mái, vệ sinh tốt</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={fetchPosts}
      />
    </div>
  );
}

export default Home;
