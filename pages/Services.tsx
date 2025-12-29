import React from 'react';
import { motion } from 'framer-motion';
import ThreeDTiltCard from '../components/ThreeDTiltCard';
import { Video, Camera, Edit3, Megaphone, MonitorPlay, PenTool } from 'lucide-react';
import { Language } from '../types';

interface ServicesProps {
  lang: Language;
}

const Services: React.FC<ServicesProps> = ({ lang }) => {
  const isEn = lang === 'en';

  const services = [
    {
      id: 'video',
      title: isEn ? 'Video Editing' : 'مونتاج الفيديو',
      desc: isEn ? 'Cinematic cuts, color grading, and sound design that tells a story.' : 'قص سينمائي، تصحيح ألوان، وهندسة صوتية تحكي قصة.',
      icon: <Video size={40} className="text-cyan-400" />,
      color: 'from-cyan-900/20 to-slate-900'
    },
    {
      id: 'motion',
      title: isEn ? 'Motion Graphics' : 'موشن جرافيك',
      desc: isEn ? 'Bringing static designs to life with smooth and engaging animation.' : 'تحويل التصاميم الثابتة إلى حياة مع رسوم متحركة سلسة وجذابة.',
      icon: <MonitorPlay size={40} className="text-fuchsia-500" />,
      color: 'from-fuchsia-900/20 to-slate-900'
    },
    {
      id: 'design',
      title: isEn ? 'Graphic Design' : 'تصميم جرافيك',
      desc: isEn ? 'Brand identity, social media posts, and print materials.' : 'هوية بصرية، منشورات سوشيال ميديا، ومطبوعات.',
      icon: <PenTool size={40} className="text-orange-500" />,
      color: 'from-orange-900/20 to-slate-900'
    },
    {
      id: 'marketing',
      title: isEn ? 'Digital Marketing' : 'تسويق رقمي',
      desc: isEn ? 'Strategic campaigns to boost your reach and engagement.' : 'حملات استراتيجية لتعزيز وصولك وتفاعلك.',
      icon: <Megaphone size={40} className="text-green-400" />,
      color: 'from-green-900/20 to-slate-900'
    },
    {
      id: 'photo',
      title: isEn ? 'Photography' : 'تصوير فوتوغرافـي',
      desc: isEn ? 'Professional product and portrait photography.' : 'تصوير احترافي للمنتجات والبورتريه.',
      icon: <Camera size={40} className="text-yellow-400" />,
      color: 'from-yellow-900/20 to-slate-900'
    },
    {
      id: 'ads',
      title: isEn ? 'Advertising' : 'إعلانات',
      desc: isEn ? 'Creative ad concepts that convert viewers into customers.' : 'أفكار إعلانية إبداعية تحول المشاهدين إلى عملاء.',
      icon: <Edit3 size={40} className="text-purple-400" />,
      color: 'from-purple-900/20 to-slate-900'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {isEn ? 'Our Services' : 'خدمات'}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <ThreeDTiltCard className="h-full">
              <div className={`h-full p-8 rounded-2xl bg-gradient-to-br ${service.color} border border-slate-700 hover:border-slate-500 transition-all group relative overflow-hidden`}>
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform scale-150">
                  {service.icon}
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 p-4 bg-slate-950/50 w-fit rounded-xl border border-slate-800 group-hover:border-slate-600 transition-colors shadow-lg">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-6 flex-grow">
                    {service.desc}
                  </p>
                  
                  <button className="text-cyan-400 font-medium group-hover:text-cyan-300 flex items-center gap-2 mt-auto">
                    {isEn ? 'Learn More' : 'اقرأ المزيد'} <span className="text-lg">→</span>
                  </button>
                </div>
              </div>
            </ThreeDTiltCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;