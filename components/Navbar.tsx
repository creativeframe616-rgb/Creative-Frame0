import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, LogOut, User as UserIcon } from 'lucide-react';
import { Language, User } from '../types';
import Logo from './Logo';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, user, onLogout }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  const navItems = [
    { label: lang === 'en' ? 'Home' : 'الرئيسية', path: '/' },
    { label: lang === 'en' ? 'Services' : 'خدمات', path: '/services' },
    { label: lang === 'en' ? 'Portfolio' : 'أعمال', path: '/portfolio' },
    { label: lang === 'en' ? 'Packages' : 'الباقات', path: '/packages' },
    { label: lang === 'en' ? 'About' : 'من نحن', path: '/about' },
    { label: lang === 'en' ? 'Contact' : 'اتصل بنا', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
            {/* Increased size w-14 h-14 to accommodate the new SVG padding */}
            <Logo className="w-14 h-14 group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.5)] transition-all" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 hidden sm:block">
              {lang === 'en' ? 'Creative Frame' : 'الإطار الإبداعي'}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4 rtl:space-x-reverse">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-cyan-400 bg-slate-900/50 shadow-[0_0_10px_rgba(0,229,255,0.3)]'
                      : 'text-gray-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
             <button
              onClick={toggleLang}
              className="p-2 text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <Globe size={18} />
              <span className="text-sm font-medium">{lang === 'en' ? 'AR' : 'EN'}</span>
            </button>
            
            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-slate-800 rtl:border-l-0 rtl:border-r rtl:pr-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 p-[2px]">
                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-bold text-cyan-400">{user.name.charAt(0)}</span>
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-medium hidden lg:block">{user.name}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  title={lang === 'en' ? 'Logout' : 'تسجيل خروج'}
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105">
                {lang === 'en' ? 'Login' : 'تسجيل دخول'}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'text-cyan-400 bg-slate-800'
                    : 'text-gray-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
             <div className="flex items-center justify-between px-3 py-4 border-t border-slate-700 mt-4">
               <button
                  onClick={() => { toggleLang(); setIsOpen(false); }}
                  className="text-gray-300 hover:text-white flex items-center gap-2"
                >
                  <Globe size={18} /> {lang === 'en' ? 'Switch to Arabic' : 'تغيير للإنجليزية'}
                </button>
                
                {user ? (
                   <div className="flex items-center gap-3">
                     <span className="font-medium text-cyan-400">{user.name}</span>
                     <button 
                        onClick={() => { onLogout(); setIsOpen(false); }}
                        className="text-red-400 text-sm font-medium"
                      >
                        {lang === 'en' ? 'Logout' : 'خروج'}
                      </button>
                   </div>
                ) : (
                  <Link 
                    to="/login" 
                    onClick={() => setIsOpen(false)}
                    className="text-cyan-400 font-bold"
                  >
                    {lang === 'en' ? 'Login' : 'دخول'}
                  </Link>
                )}
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;