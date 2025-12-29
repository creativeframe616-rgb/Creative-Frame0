import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Packages from './pages/Packages';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChatWidget from './components/ChatWidget';
import { Language, User } from './types';
import { Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC<{ lang: Language }> = ({ lang }) => (
  <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 text-center sm:text-left grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Creative Frame</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          {lang === 'en' 
            ? 'We are a team of visionary creators dedicated to bringing your brand to life through compelling visual storytelling.'
            : 'نحن فريق من المبدعين ذوي الرؤية المكرسين لإحياء علامتك التجارية من خلال سرد القصص المرئي الجذاب.'}
        </p>
      </div>
      <div>
        <h4 className="text-lg font-bold text-white mb-4">{lang === 'en' ? 'Quick Links' : 'روابط سريعة'}</h4>
        <ul className="space-y-2 text-gray-500">
          <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">About Us</span></li>
          <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">Careers</span></li>
          <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">Blog</span></li>
        </ul>
      </div>
      <div>
         <h4 className="text-lg font-bold text-white mb-4">{lang === 'en' ? 'Services' : 'خدمات'}</h4>
         <ul className="space-y-2 text-gray-500">
          <li>Video Editing</li>
          <li>Motion Graphics</li>
          <li>Marketing</li>
         </ul>
      </div>
      <div>
        <h4 className="text-lg font-bold text-white mb-4">{lang === 'en' ? 'Follow Us' : 'تابعنا'}</h4>
        <div className="flex justify-center sm:justify-start gap-4">
          <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors"><Twitter size={20} /></a>
          <a href="#" className="text-gray-500 hover:text-fuchsia-500 transition-colors"><Instagram size={20} /></a>
          <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors"><Linkedin size={20} /></a>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
      <p>&copy; 2024 Creative Frame. All rights reserved.</p>
      <div className="flex gap-4 mt-4 md:mt-0">
        <span className="cursor-pointer hover:text-gray-400">Privacy Policy</span>
        <span className="cursor-pointer hover:text-gray-400">Terms of Service</span>
      </div>
    </div>
  </footer>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Ensures scroll resets when navigating in HashRouter environment (Blogger)
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const [user, setUser] = useState<User | null>(null);

  // Update document direction and font based on language
  useEffect(() => {
    document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
    document.documentElement.lang = lang;
    if (lang === 'ar') {
      document.body.classList.remove('font-poppins');
      document.body.classList.add('font-cairo');
    } else {
      document.body.classList.remove('font-cairo');
      document.body.classList.add('font-poppins');
    }
  }, [lang]);

  // Check for logged in user
  useEffect(() => {
    const storedUser = localStorage.getItem('creative_frame_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('creative_frame_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('creative_frame_user');
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-white flex flex-col`}>
      <Navbar lang={lang} setLang={setLang} user={user} onLogout={handleLogout} />
      <ScrollToTop />
      
      <main className="flex-grow relative">
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/services" element={<Services lang={lang} />} />
          <Route path="/portfolio" element={<Portfolio lang={lang} />} />
          <Route path="/packages" element={<Packages lang={lang} />} />
          <Route path="/contact" element={<Contact lang={lang} />} />
          <Route path="/about" element={<div className="pt-32 text-center text-gray-500">About Page Coming Soon</div>} />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" replace /> : <Login lang={lang} onLogin={handleLogin} />} 
          />
          <Route 
            path="/signup" 
            element={user ? <Navigate to="/" replace /> : <Signup lang={lang} onLogin={handleLogin} />} 
          />
        </Routes>
      </main>

      <Footer lang={lang} />
      <ChatWidget lang={lang} />
    </div>
  );
};

const App: React.FC = () => {
  // HashRouter is critical for Blogger hosting to prevent 404s on sub-pages
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;