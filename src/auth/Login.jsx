import { useState, useRef } from 'react';
import { Eye, EyeOff, User, BookOpen, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [step, setStep] = useState('role');
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const roles = [
    {
      id: 'student',
      name: 'Student',
      icon: User,
      description: 'Access courses, grades, and class schedules',
      color: '#06b6d4',
      darkColor: '#0891b2',
      path: '/student/dashboard'
    },
    {
      id: 'professor',
      name: 'Professor',
      icon: BookOpen,
      description: 'Manage courses and supervise students',
      color: '#f59e0b',
      darkColor: '#d97706',
      path: '/professor/dashboard'
    },
    {
      id: 'admin',
      name: 'Administrator',
      icon: Shield,
      description: 'Manage system and user accounts',
      color: '#a855f7',
      darkColor: '#9333ea',
      path: '/admin/dashboard'
    }
  ];

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 320;
      const newPosition = scrollPosition + (direction === 'left' ? -scrollAmount : scrollAmount);
      container.scrollLeft = newPosition;
      setScrollPosition(newPosition);
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setStep('login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRole) {
      navigate(selectedRole.path);
    }
  };

  const handleBackToRole = () => {
    setStep('role');
    setSelectedRole(null);
    setEmail('');
    setPassword('');
  };



  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-4 md:p-8" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)'
    }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-60"
          style={{
            background: 'rgba(102, 126, 234, 0.4)',
            top: '-50px',
            left: '-50px',
            animation: 'blob-animate 8s infinite ease-in-out'
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-60"
          style={{
            background: 'rgba(240, 147, 251, 0.3)',
            bottom: '-100px',
            right: '-50px',
            animation: 'blob-animate 12s infinite ease-in-out reverse'
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full blur-3xl opacity-60"
          style={{
            background: 'rgba(79, 172, 254, 0.4)',
            bottom: '100px',
            left: '50px',
            animation: 'blob-animate 10s infinite ease-in-out'
          }}
        />
        <div
          className="absolute w-[450px] h-[450px] rounded-full blur-3xl opacity-60"
          style={{
            background: 'rgba(0, 242, 254, 0.3)',
            top: '200px',
            right: '100px',
            animation: 'blob-animate 14s infinite ease-in-out reverse'
          }}
        />
      </div>

      <style>{`
        @keyframes blob-animate {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(30px, -50px); }
          66% { transform: translate(-20px, 20px); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); }
          50% { box-shadow: 0 0 40px rgba(0, 0, 0, 0.15); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-border {
          0%, 100% { border-color: #e5e7eb; }
          50% { border-color: #d1d5db; }
        }
        .slide-up { animation: slideUp 0.6s ease-out; }
        .fade-in { animation: fadeIn 0.6s ease-out; }
        .role-card { 
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); 
          border: 2px solid transparent;
        }
        .role-card:hover { 
          transform: translateY(-20px) scale(1.02); 
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2) !important;
        }
        input:focus {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>

      <div className="relative z-10 w-full max-w-6xl">
        {step === 'role' ? (
          <div className="fade-in text-center">
            <div className="mb-12 md:mb-20">
              <div className="inline-block mb-6">
                <div className="text-5xl md:text-6xl font-black text-white" style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}>
                  FCI Arish
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' }}>
                Sign in to your account
              </h1>
              <p className="text-lg md:text-xl text-white/90 font-light" style={{ letterSpacing: '1.5px' }}>
                Choose your role to access the system
              </p>
            </div>

            <div className="flex items-center gap-4 md:gap-5 mb-12">
              <button
                className="flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                onClick={() => handleScroll('left')}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  color: 'white',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <ChevronLeft size={24} />
              </button>

              <div
                className="flex-1 flex gap-6 overflow-x-auto px-2"
                ref={scrollContainerRef}
                style={{ scrollbarWidth: 'none', scrollBehavior: 'smooth' }}
              >
                {roles.map((role) => {
                  const IconComponent = role.icon;
                  return (
                    <div
                      key={role.id}
                      className="role-card flex-shrink-0 w-72 bg-white/95 rounded-3xl p-8 shadow-2xl cursor-pointer backdrop-blur-sm"
                      onClick={() => handleRoleSelect(role)}
                      style={{ border: '2px solid rgba(255, 255, 255, 0.5)' }}
                    >
                      <div
                        className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl"
                        style={{ background: `linear-gradient(90deg, transparent, ${role.color}, transparent)` }}
                      />
                      
                      <div
                        className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-white shadow-lg"
                        style={{ 
                          background: `linear-gradient(135deg, ${role.color} 0%, ${role.darkColor} 100%)`,
                          boxShadow: `0 12px 24px ${role.color}40`
                        }}
                      >
                        <IconComponent size={48} strokeWidth={1.5} />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {role.name}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 min-h-12 text-sm leading-relaxed font-medium">
                        {role.description}
                      </p>
                      
                      <div className="flex justify-center">
                        <div 
                          className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
                          style={{ background: role.color, color: 'white' }}
                        >
                          <ChevronRight size={20} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                className="flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                onClick={() => handleScroll('right')}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  color: 'white',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <p className="text-white/90 text-base font-medium tracking-wide">
              Select your role to access personalized dashboard
            </p>
          </div>
        ) : (
          <div className="slide-up w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden" style={{
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3)',
            minHeight: '700px'
          }}>
            {/* Back button */}
            <button
              className="absolute top-6 right-6 z-20 inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-all duration-300 text-sm font-semibold hover:scale-110"
              onClick={handleBackToRole}
            >
              ← Back
            </button>

            <div className="flex h-full">
              {/* Left Side - Icon & Description */}
              <div className="w-1/2 flex flex-col items-center justify-end pb-16 p-12 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${selectedRole?.color}15 0%, ${selectedRole?.darkColor}10 100%)`
                }}>
                
                {/* Animated background circles */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <div className="absolute top-10 right-10 w-40 h-40 rounded-full animate-pulse" style={{ background: selectedRole?.color }}></div>
                  <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full animate-pulse" style={{ background: selectedRole?.darkColor, animationDelay: '1s' }}></div>
                </div>

                {/* Icon with enhanced shadow */}
                <div
                  className="w-48 h-48 rounded-full flex items-center justify-center text-white shadow-2xl mb-8 relative z-10 transition-all duration-500 hover:scale-105"
                  style={{ 
                    background: `linear-gradient(135deg, ${selectedRole?.color} 0%, ${selectedRole?.darkColor} 100%)`,
                    boxShadow: `0 20px 60px ${selectedRole?.color}50, inset 0 1px 0 rgba(255,255,255,0.2)`
                  }}
                >
                  {selectedRole?.icon && <selectedRole.icon size={100} strokeWidth={1.2} />}
                </div>

                {/* Description with better styling */}
                <div className="text-center relative z-10">
                  <h3 className="text-3xl font-black mb-4 tracking-tight" style={{ color: selectedRole?.color }}>
                    {selectedRole?.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-sm font-medium">
                    {selectedRole?.id === 'student' && 'Access your courses, grades, schedules and academic resources'}
                    {selectedRole?.id === 'professor' && 'Manage your courses, grades and supervise students'}
                    {selectedRole?.id === 'admin' && 'Manage system, users and all platform features'}
                  </p>
                  <div className="mt-8 space-y-3">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-700 font-semibold hover:translate-x-1 transition-transform">
                      <span className="text-xl" style={{ color: selectedRole?.color }}>✓</span>
                      <span>Secure & Encrypted</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-700 font-semibold hover:translate-x-1 transition-transform">
                      <span className="text-xl" style={{ color: selectedRole?.color }}>✓</span>
                      <span>24/7 Access</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-700 font-semibold hover:translate-x-1 transition-transform">
                      <span className="text-xl" style={{ color: selectedRole?.color }}>✓</span>
                      <span>Mobile Friendly</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="w-1/2 flex flex-col justify-end pb-16 px-6 relative">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-30" style={{
                  background: `linear-gradient(180deg, transparent 0%, ${selectedRole?.color}05 100%)`
                }}></div>

                {/* Header */}
                <div className="mb-4 relative z-10">
                  <h2 className="text-4xl font-black text-gray-900 mb-1 tracking-tight">
                    Welcome Back 👋
                  </h2>
                  <p className="text-gray-500 text-sm font-semibold tracking-wide">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
                  {/* Email Field */}
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-1 group-hover:translate-x-0.5 transition-transform">
                      📧 Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-300 hover:border-gray-300 focus:shadow-lg"
                      style={{
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = selectedRole?.color;
                        e.target.style.boxShadow = `inset 0 1px 3px rgba(0,0,0,0.05), 0 0 0 3px ${selectedRole?.color}20`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.05)';
                      }}
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="group">
                    <label htmlFor="password" className="block text-sm font-bold text-gray-800 mb-1 group-hover:translate-x-0.5 transition-transform">
                      🔒 Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-300 hover:border-gray-300 focus:shadow-lg pr-10"
                        style={{
                          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = selectedRole?.color;
                          e.target.style.boxShadow = `inset 0 1px 3px rgba(0,0,0,0.05), 0 0 0 3px ${selectedRole?.color}20`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.05)';
                        }}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all p-1 hover:scale-110"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex justify-between items-center pt-0">
                    <label className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer hover:text-gray-900 transition-colors group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 cursor-pointer transition-all group-hover:scale-110" 
                        style={{ accentColor: selectedRole?.color }}
                      />
                      <span className="font-semibold">Remember</span>
                    </label>
                    <a href="#" className="text-sm font-semibold transition-all hover:underline hover:translate-x-0.5" style={{ color: selectedRole?.color }}>
                      Forgot?
                    </a>
                  </div>

                  {/* Sign In Button */}
                  <button
                    type="submit"
                    className="w-full py-3 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:shadow-xl hover:-translate-y-1 active:translate-y-0 text-sm mt-3 relative overflow-hidden group"
                    style={{
                      background: `linear-gradient(135deg, ${selectedRole?.color} 0%, ${selectedRole?.darkColor} 100%)`,
                      boxShadow: `0 12px 30px ${selectedRole?.color}40`
                    }}
                  >
                    <span className="relative z-10">🚀 Sign In</span>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300"></div>
                  </button>

                  {/* Divider */}
                  <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-2 bg-white text-gray-400 font-semibold text-sm">OR</span>
                    </div>
                  </div>

                  {/* Support Link */}
                  <p className="text-center text-sm text-gray-600 font-medium leading-tight">
                    Need help?{' '}
                    <a href="#" className="font-bold transition-all hover:underline hover:translate-x-0.5 inline-block" style={{ color: selectedRole?.color }}>
                      Support
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
