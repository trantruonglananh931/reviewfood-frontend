import { useEffect, useState } from 'react';
import PostCard from '../../components/PostCard';
import CreatePostModal from '../../components/CreatePostModal';
import { getAllPosts } from '../../api/postApi';
// import { useAuth } from '../../context/AuthContext';
import type { Post } from '../../types/post';

function Home() {
  // const { user } = useAuth();
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
                className="w-full bg-linear-to-b from-yellow-50  shadow-sm p-4 hover:shadow-md transition-shadow"
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

            {/* Empty State */}
            {!loading && posts.length === 0 && !error && (
              <div className="bg-white  shadow-sm p-12 text-center">
                <p className="text-gray-600 text-lg mb-2">📝 Chưa có bài viết nào</p>
                <p className="text-gray-500">Quay lại sau để xem các bài viết mới</p>
              </div>
            )}

            {/* Posts Feed - Single Column */}
            {!loading && posts.length > 0 && (
              <div className="space-y-6">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>

          {/* Tin ngắn 4/12 */}
          <div className="w-full md:w-4/12">
            <div className="bg-white shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-orange-600 mb-4">🟢 SLIDE 1 – Excel Approach</h2>
              <ul className="space-y-2 mb-4">
                <li className="text-gray-700 text-sm font-semibold">Cách tiếp cận:</li>
                <li className="text-gray-700 text-sm">- Làm sạch dữ liệu (Price, Rating về dạng số)</li>
                <li className="text-gray-700 text-sm">- Sử dụng Pivot Table để phân tích</li>
                <li className="text-gray-700 text-sm">- Áp dụng filter để xử lý điều kiện</li>
                <li className="text-gray-700 text-sm">- Dùng VLOOKUP để điền dữ liệu thiếu</li>
                <li className="text-gray-700 text-sm font-semibold mt-2">Các bước:</li>
                <li className="text-gray-700 text-sm">1. Clean & structure data</li>
                <li className="text-gray-700 text-sm">2. Pivot Table (Average Price & Rating)</li>
                <li className="text-gray-700 text-sm">3. VLOOKUP để fill missing values</li>
                <li className="text-gray-700 text-sm">4. Research các phương pháp liên hệ</li>
              </ul>
              <h2 className="text-lg font-semibold text-orange-600 mb-4">🟡 SLIDE 2 – Price Insight</h2>
              <ul className="space-y-2 mb-4">
                <li className="text-gray-700 text-sm">- Xe Certified có giá cao nhất</li>
                <li className="text-gray-700 text-sm">- Premium đứng giữa, Standard thấp nhất</li>
                <li className="text-gray-700 text-sm">- Giá có xu hướng ổn định theo năm</li>
              </ul>
              <h2 className="text-lg font-semibold text-orange-600 mb-4">🟡 SLIDE 3 – Mileage Insight</h2>
              <ul className="space-y-2 mb-4">
                <li className="text-gray-700 text-sm">- Xe có mileage thấp (&lt;50,000) có giá cao hơn</li>
                <li className="text-gray-700 text-sm">- Mileage càng cao → giá càng giảm</li>
              </ul>
              <h2 className="text-lg font-semibold text-orange-600 mb-4">🟡 SLIDE 4 – Rating Insight</h2>
              <ul className="space-y-2 mb-4">
                <li className="text-gray-700 text-sm">- Xe có rating cao thường có giá cao hơn</li>
                <li className="text-gray-700 text-sm">- Certified thường có rating tốt hơn</li>
              </ul>
              <h2 className="text-lg font-semibold text-orange-600 mb-4">🟡 SLIDE 5 – Tổng hợp Insight</h2>
              <ul className="space-y-2">
                <li className="text-gray-700 text-sm font-semibold">Giá phụ thuộc vào:</li>
                <li className="text-gray-700 text-sm">- Badge</li>
                <li className="text-gray-700 text-sm">- Mileage</li>
                <li className="text-gray-700 text-sm">- Rating</li>
                <li className="text-gray-700 text-sm">- Certified có giá trị cao nhất</li>
                <li className="text-gray-700 text-sm">- Mileage thấp giúp giữ giá tốt hơn</li>
              </ul>
            </div>
            {/* Có thể thêm các widget khác ở đây */}
          </div>

          {/* Phần thứ 3 - 4/12 */}
          <div className="w-full md:w-4/12">
            <div className="bg-white shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-blue-600 mb-4">🇻🇳 Tiếng Việt (ngắn gọn)</h2>
              <ul className="space-y-3">
                <li className="text-gray-700 text-sm">📄 Trang Liên hệ</li>
                <li className="text-gray-700 text-sm">✉️ Email hỗ trợ</li>
                <li className="text-gray-700 text-sm">🔍 WHOIS domain</li>
                <li className="text-gray-700 text-sm">🌐 Mạng xã hội: Facebook, LinkedIn, Twitter</li>
                <li className="text-gray-700 text-sm">💬 Live chat trên web</li>
                <li className="text-gray-700 text-sm">📞 Hotline / SĐT</li>
                <li className="text-gray-700 text-sm">📝 Form đăng ký / góp ý</li>
                <li className="text-gray-700 text-sm">🔗 LinkedIn công ty/nhân viên</li>
                <li className="text-gray-700 text-sm">🏢 Google Business</li>
                <li className="text-gray-700 text-sm">🗣️ Diễn đàn / cộng đồng</li>
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
