import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Play, Award, Users, Clock, Video, MonitorPlay, PenTool, Check, Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import ThreeDTiltCard from '../components/ThreeDTiltCard';
import { Link, useNavigate } from 'react-router-dom';
import { Language } from '../types';
import Logo from '../components/Logo';

interface HomeProps {
  lang: Language;
}

// Helper component for animating numbers
const Counter: React.FC<{ value: string; label: string; icon: React.ReactNode }> = ({ value, label, icon }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  
  // Extract number from string (e.g., "150+" -> 150)
  const target = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepTime = duration / steps;
      let current = 0;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <ThreeDTiltCard className="h-full">
      <div ref={ref} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 h-full flex flex-col items-center justify-center text-center group hover:bg-slate-800 transition-colors">
        <div className="mb-4 p-4 rounded-full bg-slate-900 shadow-inner group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-3xl font-bold text-white mb-1 flex items-center justify-center gap-1">
          {count}{suffix}
        </h3>
        <p className="text-gray-400 font-medium text-sm">{label}</p>
      </div>
    </ThreeDTiltCard>
  );
};

const Home: React.FC<HomeProps> = ({ lang }) => {
  const isEn = lang === 'en';
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const stats = [
    { label: isEn ? 'Projects Completed' : 'مشاريع مكتملة', value: '150+', icon: <Award className="w-6 h-6 text-cyan-400" /> },
    { label: isEn ? 'Happy Clients' : 'عملاء سعداء', value: '80+', icon: <Users className="w-6 h-6 text-fuchsia-500" /> },
    { label: isEn ? 'Years Experience' : 'سنوات خبرة', value: '5+', icon: <Clock className="w-6 h-6 text-orange-500" /> },
  ];

  const services = [
    {
      id: 'video',
      title: isEn ? 'Video Editing' : 'مونتاج الفيديو',
      desc: isEn ? 'Cinematic cuts, color grading, and sound design.' : 'قص سينمائي، تصحيح ألوان، وهندسة صوتية.',
      icon: <Video size={32} className="text-cyan-400" />,
      color: 'from-cyan-900/20 to-slate-900'
    },
    {
      id: 'motion',
      title: isEn ? 'Motion Graphics' : 'موشن جرافيك',
      desc: isEn ? 'Bringing static designs to life with animation.' : 'تحويل التصاميم الثابتة إلى حياة مع رسوم متحركة.',
      icon: <MonitorPlay size={32} className="text-fuchsia-500" />,
      color: 'from-fuchsia-900/20 to-slate-900'
    },
    {
      id: 'design',
      title: isEn ? 'Graphic Design' : 'تصميم جرافيك',
      desc: isEn ? 'Brand identity and social media creatives.' : 'هوية بصرية وتصاميم السوشيال ميديا.',
      icon: <PenTool size={32} className="text-orange-500" />,
      color: 'from-orange-900/20 to-slate-900'
    }
  ];

  const projects = [
    { 
      id: 1, 
      title: isEn ? 'Neon Cyberpunk' : 'نيون سايبر بانك', 
      cat: 'Motion', 
      img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop' 
    },
    { 
      id: 2, 
      title: isEn ? 'Luxury Brand' : 'علامة تجارية فاخرة', 
      cat: 'Video', 
      img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop' 
    },
    { 
      id: 3, 
      title: isEn ? 'Tech Reveal' : 'كشف منتج تقني', 
      cat: 'Motion', 
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop' 
    }
  ];

  const packages = [
    {
      name: isEn ? 'Starter' : 'الباقة الأولى',
      price: isEn ? '2000 EGP' : '٢٠٠٠ جنيه',
      features: isEn 
        ? ['3 Designs', '1 Reel Video', '1 Sponsored Ad']
        : ['٣ تصميمات', '١ فيديو ريلز', '١ إعلان ممول'],
      popular: false
    },
    {
      name: isEn ? 'Standard' : 'الباقة الثانية',
      price: isEn ? '4000 EGP' : '٤٠٠٠ جنيه',
      features: isEn
        ? ['6 Designs', '2 Reel Videos', '2 Sponsored Ads']
        : ['٦ تصميمات', '٢ فيديو ريلز', '٢ إعلان ممول'],
      popular: true
    },
    {
      name: isEn ? 'Pro' : 'الباقة الثالثة',
      price: isEn ? '6500 EGP' : '٦٥٠٠ جنيه',
      features: isEn
        ? ['12 Designs', '4 Reel Videos', '4 Sponsored Ads']
        : ['١٢ تصميم', '٤ فيديو ريلز', '٤ إعلان ممول'],
      popular: false
    },
    {
      name: isEn ? 'Elite' : 'الباقة الرابعة',
      price: isEn ? '10000 EGP' : '١٠٠٠٠ جنيه',
      features: isEn
        ? ['18 Designs', '10 Reel Videos', '10 Sponsored Ads']
        : ['١٨ تصميم', '١٠ فيديو ريلز', '١٠ إعلان ممول'],
      popular: false
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch("https://formsubmit.co/ajax/creativeframe616@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          _subject: `New Contact from Website: ${formData.name}`, // Email subject
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950"></div>
        
        {/* Animated Particles/Shapes */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-fuchsia-500/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex flex-col items-center"
          >
             {/* Logo */}
             <motion.div
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="mb-6 drop-shadow-[0_0_25px_rgba(0,229,255,0.4)]"
             >
                <Logo className="w-32 h-32 md:w-40 md:h-40" />
             </motion.div>

             <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-fuchsia-500">
                Creative Frame
              </span>
            </h1>
            <p className="text-xl md:text-3xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              {isEn ? 'Turning ideas into visual reality.' : 'نحو أفكار تتحول إلى واقع بصري'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 mt-8"
          >
            <Link to="/contact" className="group relative px-8 py-4 bg-transparent border border-cyan-500 text-cyan-400 font-bold rounded-full overflow-hidden transition-all hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]">
               <span className="relative z-10 flex items-center gap-2">
                 {isEn ? 'Start Project' : 'ابدأ مشروعك'} <ArrowRight size={20} className={!isEn ? "rotate-180" : ""} />
               </span>
            </Link>
            <Link to="/portfolio" className="group px-8 py-4 bg-slate-800 text-white font-bold rounded-full hover:bg-slate-700 transition-all flex items-center gap-2 hover:shadow-lg">
              <Play size={20} className="fill-current" />
              {isEn ? 'View Portfolio' : 'شاهد البورتفوليو'}
            </Link>
          </motion.div>
          
          {/* 3D Floating Camera Element (Abstract) */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
            className="mt-20 opacity-80 hidden md:block"
          >
            <div className="w-24 h-40 border-2 border-slate-700 rounded-3xl relative backdrop-blur-sm bg-white/5 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="w-16 h-16 rounded-full border border-slate-500 flex items-center justify-center">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-fuchsia-600 animate-pulse"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with Animation */}
      <section className="py-12 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
             <Counter key={idx} {...stat} />
          ))}
        </div>
      </section>

      {/* Services Section Preview - Clickable */}
      <section className="py-20 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{isEn ? 'Our Services' : 'خدمات'}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {services.map((service, idx) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="cursor-pointer"
              >
                <Link to="/services">
                  <ThreeDTiltCard className="h-full">
                    <div className={`h-full p-8 rounded-2xl bg-gradient-to-br ${service.color} border border-slate-800 hover:border-slate-600 transition-all group`}>
                      <div className="mb-6 p-4 bg-slate-950/50 w-fit rounded-xl border border-slate-800 shadow-lg">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-between">
                        {service.title}
                        <ArrowRight size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${!isEn && 'rotate-180'}`} />
                      </h3>
                      <p className="text-gray-400 leading-relaxed mb-4 text-sm">
                        {service.desc}
                      </p>
                    </div>
                  </ThreeDTiltCard>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/services" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold transition-colors">
              {isEn ? 'View All Services' : 'عرض جميع الخدمات'} <ArrowRight size={20} className={!isEn ? "rotate-180" : ""} />
            </Link>
          </div>
        </div>
      </section>

      {/* Works/Portfolio Section Preview - Clickable & Smart Linking */}
      <section className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="text-center md:text-left rtl:md:text-right">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{isEn ? 'Featured Works' : 'أبرز الأعمال'}</h2>
              <p className="text-gray-400 max-w-lg">{isEn ? 'A glimpse into our creative universe.' : 'لمحة عن عالمنا الإبداعي.'}</p>
            </div>
            <Link to="/portfolio" className="hidden md:flex items-center gap-2 px-6 py-3 border border-slate-600 rounded-full hover:bg-slate-800 transition-all text-sm font-bold">
               {isEn ? 'View Portfolio' : 'معرض الأعمال'} <ArrowRight size={16} className={!isEn ? "rotate-180" : ""} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="cursor-pointer"
                onClick={() => navigate('/portfolio', { state: { category: project.cat } })}
              >
                <ThreeDTiltCard className="group h-full">
                  <div className="relative h-64 rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
                    <img 
                      src={project.img} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1 block">{project.cat}</span>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                        {project.title}
                        <ArrowRight size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${!isEn && 'rotate-180'}`} />
                      </h3>
                    </div>
                  </div>
                </ThreeDTiltCard>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
             <Link to="/portfolio" className="inline-flex items-center gap-2 text-white font-bold border-b border-cyan-500 pb-1">
               {isEn ? 'View Portfolio' : 'معرض الأعمال'} <ArrowRight size={16} className={!isEn ? "rotate-180" : ""} />
            </Link>
          </div>
        </div>
      </section>

      {/* Packages Section - Clickable */}
      <section className="py-20 bg-slate-950 relative">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-900/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{isEn ? 'Our Packages' : 'باقاتنا'}</h2>
            <p className="text-gray-400">{isEn ? 'Choose the plan that suits your goals.' : 'اختر الخطة التي تناسب أهدافك.'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {packages.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link to="/packages">
                  <ThreeDTiltCard className="h-full">
                    <div className={`relative h-full p-6 rounded-2xl bg-slate-900/80 border ${pkg.popular ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'border-slate-800'} flex flex-col backdrop-blur-sm group hover:bg-slate-800 transition-colors`}>
                      {pkg.popular && (
                        <div className="absolute top-0 right-0 bg-cyan-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                          POPULAR
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-white mb-2">{pkg.name}</h3>
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-6">
                        {pkg.price}
                      </div>
                      
                      <ul className="space-y-3 mb-8 flex-grow">
                        {pkg.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                            <Check size={14} className="text-cyan-400 mt-1 flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      <div className={`w-full py-2 rounded-lg font-bold transition-all text-xs text-center ${
                        pkg.popular 
                          ? 'bg-cyan-600 group-hover:bg-cyan-500 text-white' 
                          : 'bg-slate-800 group-hover:bg-slate-700 text-white'
                      }`}>
                        {isEn ? 'View Details' : 'عرض التفاصيل'}
                      </div>
                    </div>
                  </ThreeDTiltCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Added to Home */}
      <section className="py-20 bg-slate-900 border-t border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Info & Map */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{isEn ? 'Get in Touch' : 'اتصل بنا'}</h2>
                <p className="text-gray-400 text-lg">
                  {isEn ? "Let's create something amazing together." : "دعنا نصنع شيئاً مذهلاً سوياً."}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400">
                    <Mail size={20} />
                  </div>
                  <span>creativeframe616@gmail.com</span>
                </div>
                 <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-fuchsia-500">
                    <Phone size={20} />
                  </div>
                  <a href="tel:+201033543723" className="hover:text-white transition-colors" dir="ltr">01033543723</a>
                </div>
                 <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-orange-500">
                    <MapPin size={20} />
                  </div>
                  <span>{isEn ? 'Mansoura, Egypt' : 'المنصورة، مصر'}</span>
                </div>
              </div>

              {/* Interactive 3D Map Placeholder */}
              <div className="w-full h-64 bg-slate-800 rounded-2xl overflow-hidden relative group perspective-1000 border border-slate-700">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-slate-900/80 backdrop-blur-sm px-6 py-2 rounded-full border border-cyan-500 text-cyan-400 font-bold animate-pulse">
                        {isEn ? 'Locate Studio' : 'موقع الاستوديو'}
                    </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-700 backdrop-blur-md">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">{isEn ? 'Name' : 'الاسم'}</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">{isEn ? 'Email' : 'البريد الإلكتروني'}</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">{isEn ? 'Phone Number' : 'رقم الهاتف'}</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">{isEn ? 'Subject' : 'الموضوع'}</label>
                     <select 
                        name="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                     >
                        <option value="General Inquiry">{isEn ? 'General Inquiry' : 'استفسار عام'}</option>
                        <option value="Start a Project">{isEn ? 'Start a Project' : 'بدء مشروع'}</option>
                        <option value="Job Application">{isEn ? 'Job Application' : 'توظيف'}</option>
                     </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">{isEn ? 'Message' : 'الرسالة'}</label>
                  <textarea 
                    name="message"
                    rows={4} 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  ></textarea>
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-lg shadow-lg shadow-cyan-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} /> {isEn ? 'Sending...' : 'جاري الإرسال...'}
                    </>
                  ) : (
                    <>
                      {isEn ? 'Send Message' : 'إرسال الرسالة'} <Send size={20} />
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <p className="text-green-400 text-center text-sm font-medium animate-pulse">
                    {isEn ? 'Message sent successfully! We will contact you soon.' : 'تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.'}
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-400 text-center text-sm font-medium">
                    {isEn ? 'Something went wrong. Please try again.' : 'حدث خطأ ما. يرجى المحاولة مرة أخرى.'}
                  </p>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;