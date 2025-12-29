import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Share2, Check } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  description: string;
  category: string;
  isEn: boolean;
}

const VideoModal: React.FC<VideoModalProps> = ({ 
  isOpen, 
  onClose, 
  videoUrl, 
  title, 
  description, 
  category,
  isEn 
}) => {
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  // Helper to determine embed type and URL
  const getEmbedUrl = (url: string) => {
    if (url.includes('facebook.com') || url.includes('fb.watch')) {
      // Convert Facebook share URL to embed URL
      // Need to encode the URL
      const encodedUrl = encodeURIComponent(url);
      return `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=0&width=1000`;
    }
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('v=') ? url.split('v=')[1].split('&')[0] : url.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return url;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: videoUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(videoUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const embedSrc = getEmbedUrl(videoUrl);
  const isDirectVideo = !videoUrl.includes('facebook') && !videoUrl.includes('youtube') && !videoUrl.includes('vimeo');
  // Check if it looks like a vertical video (Reel/Short) based on keywords, 
  // though for responsive CSS we usually stick to a max-height container.
  const isReel = title.toLowerCase().includes('reel') || category.toLowerCase().includes('ads');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/95 backdrop-blur-xl"
        onClick={onClose}
      >
        {/* Main Container */}
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close Button (Floating) */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-red-500/80 text-white rounded-full backdrop-blur-md transition-all border border-white/10"
          >
            <X size={24} />
          </button>

          {/* Video Player Section */}
          <div className={`relative bg-black flex items-center justify-center ${isReel ? 'md:w-1/2 lg:w-1/3' : 'md:w-3/4'} w-full border-b md:border-b-0 md:border-r border-slate-800`}>
             {/* Neon Glow Behind */}
             <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-fuchsia-500/10 pointer-events-none"></div>
             
             <div className={`w-full h-full flex items-center justify-center ${isReel ? 'aspect-[9/16]' : 'aspect-video'}`}>
               {isDirectVideo ? (
                 <video controls autoPlay className="w-full h-full rounded-lg shadow-lg object-contain">
                   <source src={embedSrc} type="video/mp4" />
                   Your browser does not support the video tag.
                 </video>
               ) : (
                 <iframe 
                   src={embedSrc}
                   className="w-full h-full rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                   style={{ border: 'none', overflow: 'hidden' }}
                   width="100%"
                   height="100%"
                   allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" 
                   allowFullScreen={true}
                   title={title}
                 ></iframe>
               )}
             </div>
          </div>

          {/* Info / Sidebar Section */}
          <div className={`flex flex-col p-6 md:p-8 bg-slate-900 ${isReel ? 'md:w-1/2 lg:w-2/3' : 'md:w-1/4'} overflow-y-auto custom-scrollbar`}>
             <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-cyan-900/30 text-cyan-400 border border-cyan-900/50 mb-3">
                  {category.toUpperCase()}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  {title}
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-full mb-6"></div>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  {description}
                </p>
             </div>

             <div className="mt-auto space-y-4">
                <a 
                  href={videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all border border-slate-600 hover:border-cyan-500 group"
                >
                  <span>{isEn ? 'Open Original Link' : 'فتح الرابط الأصلي'}</span>
                  <ExternalLink size={18} className="group-hover:text-cyan-400 transition-colors" />
                </a>

                <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-gray-500 text-sm">
                   <span>Creative Frame Studio</span>
                   <div className="flex gap-3 items-center">
                     <AnimatePresence>
                        {isCopied && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-green-400 text-xs font-bold"
                          >
                            {isEn ? 'Copied!' : 'تم النسخ!'}
                          </motion.span>
                        )}
                     </AnimatePresence>
                     <button 
                       onClick={handleShare}
                       className="p-2 hover:bg-slate-800 rounded-full transition-colors text-gray-400 hover:text-white"
                       title={isEn ? 'Share' : 'مشاركة'}
                     >
                       {isCopied ? <Check size={18} className="text-green-400" /> : <Share2 size={18} />}
                     </button>
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoModal;