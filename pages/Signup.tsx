import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Language, User } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface SignupProps {
  lang: Language;
  onLogin?: (user: User) => void;
}

const Signup: React.FC<SignupProps> = ({ lang, onLogin }) => {
  const isEn = lang === 'en';
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleGoogleSignup = () => {
    setIsLoading(true);
    // Simulate API delay for Google Auth Flow
    setTimeout(() => {
      const mockUser: User = {
        name: isEn ? "New Creative User" : "مستخدم مبدع جديد",
        email: "newuser@creativeframe.com",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
      };
      
      if (onLogin) {
        onLogin(mockUser);
        navigate('/');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API delay for Registration
    setTimeout(() => {
      const mockUser: User = {
        name: formData.name || (isEn ? "New User" : "مستخدم جديد"),
        email: formData.email,
        avatar: "" // No avatar for email signup initially
      };
      
      if (onLogin) {
        onLogin(mockUser);
        navigate('/');
      }
      setIsLoading(false);
    }, 1500);
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
       {/* Ambient Background */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[120px]"></div>
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

          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 to-cyan-500"></div>
          
          <div className="text-center mb-8 mt-4">
             <h2 className="text-3xl font-bold text-white mb-2">{isEn ? 'Join Us' : 'انضم إلينا'}</h2>
             <p className="text-gray-400">{isEn ? 'Start your creative journey today' : 'ابدأ رحلتك الإبداعية اليوم'}</p>
          </div>

          <form className="space-y-4" onSubmit={handleEmailSignup}>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">{isEn ? 'Full Name' : 'الاسم الكامل'}</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors" 
                placeholder={isEn ? "John Doe" : "الاسم"} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">{isEn ? 'Email' : 'البريد الإلكتروني'}</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors" 
                placeholder="user@example.com" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">{isEn ? 'Password' : 'كلمة المرور'}</label>
              <input 
                type="password" 
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors" 
                placeholder="••••••••" 
              />
            </div>

            <button disabled={isLoading} className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-cyan-500/30 transition-all transform hover:scale-[1.02] mt-4">
              {isLoading ? (isEn ? 'Creating Account...' : 'جاري إنشاء الحساب...') : (isEn ? 'Create Account' : 'إنشاء حساب')}
            </button>
            
            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-700"></div>
                <span className="flex-shrink-0 mx-4 text-gray-500 text-sm">{isEn ? 'Or' : 'أو'}</span>
                <div className="flex-grow border-t border-slate-700"></div>
            </div>

            <button 
              type="button" 
              onClick={handleGoogleSignup}
              disabled={isLoading}
              className="w-full bg-white text-slate-900 font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
               {isLoading ? (
                 <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
               ) : (
                 <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
               )}
               {isEn ? 'Sign up with Google' : 'التسجيل عبر جوجل'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              {isEn ? "Already have an account?" : "لديك حساب بالفعل؟"}{' '}
              <Link to="/login" className="text-cyan-400 font-bold hover:text-white transition-colors">
                {isEn ? 'Login' : 'تسجيل الدخول'}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;