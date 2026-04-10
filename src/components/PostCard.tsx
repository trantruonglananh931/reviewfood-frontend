import { Link } from 'react-router-dom';
import type { Post } from '../types/post';

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  // Truncate content to show preview
  const contentPreview = post.content.length > 200 
    ? post.content.substring(0, 200) + '...' 
    : post.content;

  // Format date
  const formattedDate = new Date(post.createdAt).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Link to={`/posts/${post.id}`} className="block hover:shadow-md transition-shadow">
      <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all">
        
        {/* Post Header - Author Info */}
        <div className="px-6 pt-4 pb-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {(post.author?.username || 'A').charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {post.author?.username || 'Anonymous'}
                </p>
                <p className="text-xs text-gray-500">{formattedDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Post Title */}
        <div className="px-6 pt-4">
          <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600">
            {post.title}
          </h2>
        </div>

        {/* Post Image */}
        {post.imageUrl && (
          <div className="relative w-full h-96 overflow-hidden bg-gray-200 mb-4">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Post Content Preview */}
        <div className="px-6 pb-4">
          <p className="text-gray-700 text-base leading-relaxed line-clamp-4">
            {contentPreview}
          </p>
        </div>

        {/* Post Footer - Interactions */}
        <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 hover:bg-gray-50">
          {post.comments && post.comments.length > 0 && (
            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
              <span>💬</span>
              <span className="font-medium">{post.comments.length} bình luận</span>
            </div>
          )}
          <span className="text-xs text-gray-400">Xem chi tiết →</span>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
