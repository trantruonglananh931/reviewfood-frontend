import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { RegisterRequest } from '../../types/post';

export default function Register() {
  const [formData, setFormData] = useState<RegisterRequest & { confirmPassword: string }>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { username, email, password, confirmPassword } = formData;

      if (!username || !email || !password || !confirmPassword) {
        setError('Vui lòng điền tất cả các trường');
        setIsLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError('Mật khẩu không khớp');
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Mật khẩu phải có ít nhất 6 ký tự');
        setIsLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Vui lòng nhập địa chỉ email hợp lệ');
        setIsLoading(false);
        return;
      }

      await register({
        username,
        email,
        password,
      });

      setError('');
      alert('Đăng ký thành công! Vui lòng đăng nhập với thông tin của bạn.');
      navigate('/login');
    } catch (err: any) {
      const errorMessage = 
        err.response?.data?.message || 
        err.response?.data?.error ||
        err.response?.data?.errors?.[0] ||
        err.message ||
        'Đăng ký thất bại. Vui lòng thử lại.';
      
      setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* LEFT SIDE - IMAGE */}
      <div 
        className="hidden md:flex md:w-1/2 bg-contain bg-no-repeat bg-center"
        style={{
          backgroundImage: 'url(https://i.pinimg.com/1200x/15/ff/ec/15ffec292e4134a52d83b145dc3f0d5d.jpg)',
        }}
      />

      {/* RIGHT SIDE - FORM */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-start pt-4 px-6 md:px-12">
        <div className="w-full max-w">
            
            {/* HEADING */}
            <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
              Tạo Tài Khoản
            </h1>
            
            <p className="text-gray-600 mb-8">
              Đã có tài khoản?{' '}
              <Link to="/login" className="text-red-600 font-bold hover:text-red-700">
                Đăng Nhập
              </Link>
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* ERROR */}
              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              {/* USERNAME INPUT */}
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Tên người dùng"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-pink-200 text-gray-800 placeholder-gray-600 rounded-2xl outline-none focus:ring-2 focus:ring-pink-400 focus:bg-pink-100 transition disabled:opacity-50"
                />
              </div>

              {/* EMAIL INPUT */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-pink-200 text-gray-800 placeholder-gray-600 rounded-2xl outline-none focus:ring-2 focus:ring-pink-400 focus:bg-pink-100 transition disabled:opacity-50"
                />
              </div>

              {/* PASSWORD INPUT */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-pink-200 text-gray-800 placeholder-gray-600 rounded-2xl outline-none focus:ring-2 focus:ring-pink-400 focus:bg-pink-100 transition disabled:opacity-50 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-600 text-xl"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>

              {/* CONFIRM PASSWORD INPUT */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-pink-200 text-gray-800 placeholder-gray-600 rounded-2xl outline-none focus:ring-2 focus:ring-pink-400 focus:bg-pink-100 transition disabled:opacity-50 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-3.5 text-gray-600 text-xl"
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>

              {/* OR */}
              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-red-600"></div>
                <span className="px-3 text-red-600 font-medium">HOẶC</span>
                <div className="flex-1 h-px bg-red-600"></div>
              </div>

              {/* SOCIAL BUTTONS */}
              <div className="flex gap-4 justify-center">
                <button type="button" className="w-14 h-14 rounded-full border-2 border-gray-300 hover:border-gray-400 flex items-center justify-center text-2xl">
                  🔍
                </button>
                <button type="button" className="w-14 h-14 rounded-full border-2 border-gray-300 hover:border-gray-400 flex items-center justify-center text-2xl">
                  f
                </button>
                <button type="button" className="w-14 h-14 rounded-full border-2 border-gray-300 hover:border-gray-400 flex items-center justify-center text-2xl">
                  🍎
                </button>
              </div>

              {/* SIGN UP BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 mt-8 bg-gradient-to-r from-pink-400 to-red-400 text-white font-bold text-lg rounded-full hover:shadow-lg transition disabled:opacity-50"
              >
                {isLoading ? 'Đang đăng ký...' : 'Đăng Ký'}
              </button>

            </form>
          </div>
        </div>
    </div>
  );

}
