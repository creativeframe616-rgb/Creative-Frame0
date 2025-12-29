import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Language, User } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface LoginProps {
  lang: Language;
  onLogin?: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ lang, onLogin }) => {
  const isEn = lang === 'en';
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    
    // Simulate API delay for Google Auth Flow
    setTimeout(() => {
      const mockUser: User = {
        name: isEn ? "Creative User" : "مستخدم مبدع",
        email: "user@creativeframe.com",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
      };
      
      if (onLogin) {
        onLogin(mockUser);
        navigate('/');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
       {/* Ambient Background */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px]"></div>
       </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 relative z-10"
      >
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className={`absolute top-6 ${isEn ? 'left-6' : 'right-6'} z-20 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10`}
            title={isEn ? "Return to Home" : "العودة للرئيسية"}
          >
            {isEn ? <ArrowLeft size={24} /> : <ArrowRight size={24} />}
          </button>

          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500"></div>
          
          <div className="text-center mb-8 mt-4">
             <h2 className="text-3xl font-bold text-white mb-2">{isEn ? 'Welcome Back' : 'مرحباً بعودتك'}</h2>
             <p className="text-gray-400">{isEn ? 'Access your creative dashboard' : 'ادخل إلى لوحة التحكم الخاصة بك'}</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">{isEn ? 'Email' : 'البريد الإلكتروني'}</label>
              <input type="email" className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-colors" placeholder="user@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">{isEn ? 'Password' : 'كلمة المرور'}</label>
              <input type="password" className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-colors" placeholder="••••••••" />
            </div>
            
            <div className="flex items-center justify-between text-sm">
               <label className="flex items-center text-gray-400">
                 <input type="checkbox" className="mr-2 bg-slate-800 border-slate-700 rounded" />
                 {isEn ? 'Remember me' : 'تذكرني'}
               </label>
               <a href="#" className="text-cyan-400 hover:text-cyan-300">{isEn ? 'Forgot Password?' : 'نسيت كلمة المرور؟'}</a>
            </div>

            <button className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-fuchsia-500/30 transition-all transform hover:scale-[1.02]">
              {isEn ? 'Sign In' : 'تسجيل الدخول'}
            </button>
            
            <button 
              type="button" 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full bg-white text-slate-900 font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
               {isLoading ? (
                 <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
               ) : (
                 <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
               )}
               {isLoading 
                  ? (isEn ? 'Authenticating...' : 'جاري التحقق...') 
                  : (isEn ? 'Sign in with Google' : 'الدخول عبر جوجل')}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              {isEn ? "Don't have an account?" : "ليس لديك حساب؟"}{' '}
              <Link to="/signup" className="text-cyan-400 font-bold hover:text-white transition-colors">
                {isEn ? 'Create Account' : 'إنشاء حساب'}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;