import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThreeDTiltCard from '../components/ThreeDTiltCard';
import { Language } from '../types';
import { Play, X, ZoomIn, ExternalLink } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import VideoModal from '../components/VideoModal';

interface PortfolioProps {
  lang: Language;
}

const Portfolio: React.FC<PortfolioProps> = ({ lang }) => {
  const isEn = lang === 'en';
  const location = useLocation();
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Effect to handle incoming state from Home page clicks
  useEffect(() => {
    if (location.state && location.state.category) {
      setFilter(location.state.category);
      // Clear state history to prevent sticking on refresh (optional, but good UX)
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const categories = [
    { id: 'All', label: isEn ? 'All' : 'الكل' },
    { id: 'Video', label: isEn ? 'Video' : 'فيديو' },
    { id: 'Motion', label: isEn ? 'Motion' : 'موشن' },
    { id: 'Design', label: isEn ? 'Design' : 'تصميم' },
    { id: 'Ads', label: isEn ? 'Ads' : 'إعلانات' },
  ];
  
  const projects = [
    { 
      id: 8, 
      title: isEn ? 'Cinematic Showcase' : 'عرض سينمائي', 
      cat: 'Video', 
      type: 'video',
      desc: isEn ? 'A dynamic showcase of storytelling through video editing.' : 'عرض ديناميكي لسرد القصص من خلال مونتاج الفيديو.',
      img: 'https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?q=80&w=2664&auto=format&fit=crop',
      link: 'https://www.facebook.com/reel/1115660304075494'
    },
    { 
      id: 7, 
      title: isEn ? 'Viral Facebook Reel' : 'ريلز فيسبوك تفاعلي', 
      cat: 'Ads', 
      type: 'video',
      desc: isEn ? 'High engagement short-form video content designed for social media algorithms.' : 'محتوى فيديو قصير عالي التفاعل مصمم لخوارزميات وسائل التواصل الاجتماعي.',
      img: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1974&auto=format&fit=crop',
      link: 'https://www.facebook.com/share/r/1BRrCnXyVx/'
    },
    { 
      id: 1, 
      title: isEn ? 'Neon Cyberpunk' : 'نيون سايبر بانك', 
      cat: 'Motion', 
      type: 'video',
      desc: isEn ? 'A futuristic motion graphics piece exploring neon aesthetics.' : 'قطعة موشن جرافيك مستقبلية تستكشف جماليات النيون.',
      img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
      link: 'https://www.youtube.com/watch?v=LXb3EKWsInQ'
    },
    { 
      id: 2, 
      title: isEn ? 'Luxury Brand Promo' : 'إعلان علامة تجارية فاخرة', 
      cat: 'Video', 
      type: 'video',
      desc: isEn ? 'High-end commercial for a luxury fashion brand.' : 'إعلان تجاري راقي لعلامة أزياء فاخرة.',
      img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop' 
    },
    { 
      id: 3, 
      title: isEn ? 'Minimalist Poster' : 'ملصق بسيط', 
      cat: 'Design', 
      type: 'image',
      desc: isEn ? 'Abstract poster design for a modern art exhibition.' : 'تصميم ملصق تجريدي لمعرض فن حديث.',
      img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop' 
    },
    { 
      id: 4, 
      title: isEn ? 'Social Media Campaign' : 'حملة تواصل اجتماعي', 
      cat: 'Ads', 
      type: 'image',
      desc: isEn ? 'Viral social media visual series for a tech startup.' : 'سلسلة بصرية فيروسية لشركة ناشئة في مجال التكنولوجيا.',
      img: 'https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2000&auto=format&fit=crop' 
    },
    { 
      id: 5, 
      title: isEn ? 'Tech Product Reveal' : 'كشف منتج تقني', 
      cat: 'Motion', 
      type: 'video',
      desc: isEn ? '3D product animation revealing the new X-Phone.' : 'رسوم متحركة ثلاثية الأبعاد تكشف عن الهاتف الجديد.',
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop' 
    },
    { 
      id: 6, 
      title: isEn ? 'Fashion Edit' : 'مونتاج أزياء', 
      cat: 'Video', 
      type: 'video',
      desc: isEn ? 'Fast-paced rhythmic edit for a street wear collection.' : 'مونتاج إيقاعي سريع لمجموعة ملابس الشارع.',
      img: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=2059&auto=format&fit=crop' 
    },
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.cat === filter);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    if (project.type === 'video') {
      setShowVideoModal(true);
    }
  };

  const closeModals = () => {
    setSelectedProject(null);
    setShowVideoModal(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{isEn ? 'Our Portfolio' : 'معرض الأعمال'}</h2>
        <p className="text-gray-400">{isEn ? 'A selection of our finest work.' : 'مجموعة مختارة من أفضل أعمالنا.'}</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-6 py-2 rounded-full border transition-all duration-300 ${
              filter === cat.id
                ? 'bg-cyan-600 border-cyan-500 text-white shadow-[0_0_15px_rgba(8,145,178,0.5)]' 
                : 'bg-transparent border-slate-700 text-gray-400 hover:border-slate-500 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <ThreeDTiltCard className="group" onClick={() => handleProjectClick(project)}>
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 cursor-pointer">
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>

                  {/* Center Icon (Play/Zoom) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.3)]">
                       {project.type === 'video' ? <Play className="fill-white text-white ml-1" size={24} /> : <ZoomIn className="text-white" size={24} />}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1 block">{project.cat}</span>
                    <h3 className="text-xl font-bold text-white leading-tight">{project.title}</h3>
                  </div>
                </div>
              </ThreeDTiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Render the specialized Video Modal if project type is video */}
      {selectedProject && selectedProject.type === 'video' && (
        <VideoModal 
          isOpen={showVideoModal}
          onClose={closeModals}
          videoUrl={selectedProject.link || ''}
          title={selectedProject.title}
          description={selectedProject.desc}
          category={selectedProject.cat}
          isEn={isEn}
        />
      )}

      {/* Standard Image Modal for non-video projects */}
      <AnimatePresence>
        {selectedProject && selectedProject.type !== 'video' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
            onClick={closeModals}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={closeModals}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-96 relative bg-black">
                   <img 
                      src={selectedProject.img} 
                      alt={selectedProject.title} 
                      className="w-full h-full object-cover opacity-90"
                    />
                </div>
                
                <div className="p-8 flex flex-col justify-center">
                  <div className="mb-2">
                     <span className="bg-cyan-900/30 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                       {selectedProject.cat.toUpperCase()}
                     </span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-8">
                    {selectedProject.desc}
                  </p>
                  
                  <div className="flex gap-4">
                    <button className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                      {isEn ? 'View Project' : 'عرض المشروع'} <ExternalLink size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;