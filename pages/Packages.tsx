import React, { useState } from 'react';
import ThreeDTiltCard from '../components/ThreeDTiltCard';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Language } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface PackagesProps {
  lang: Language;
}

const PackageCard: React.FC<{ pkg: any, isEn: boolean }> = ({ pkg, isEn }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <ThreeDTiltCard className="h-full">
      <div className={`relative h-full p-6 rounded-2xl bg-slate-900 border ${pkg.popular ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 'border-slate-700'} flex flex-col transition-all duration-300`}>
        {pkg.popular && (
          <div className="absolute top-0 right-0 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            {isEn ? 'BEST VALUE' : 'أفضل قيمة'}
          </div>
        )}
        <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-6">
          {pkg.price}
        </div>
        
        <ul className="space-y-4 mb-8 flex-grow">
          {pkg.features.map((feat: string, i: number) => (
            <li key={i} className="flex items-start gap-3 text-gray-300">
              <Check size={18} className="text-cyan-400 mt-1 flex-shrink-0" />
              <span className="text-sm">{feat}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <button 
            onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
            className="flex items-center justify-center gap-1 w-full text-gray-400 hover:text-white text-sm mb-4 transition-colors focus:outline-none"
          >
            {isExpanded ? (isEn ? 'Hide Details' : 'إخفاء التفاصيل') : (isEn ? 'View Details' : 'عرض التفاصيل')}
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pb-4">
                  <p className="text-gray-400 text-sm leading-relaxed p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                    {pkg.details}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button className={`w-full py-3 rounded-full font-bold transition-all text-sm ${
            pkg.popular 
              ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg' 
              : 'bg-slate-800 hover:bg-slate-700 text-white'
          }`}>
            {isEn ? 'Choose Plan' : 'اختر الخطة'}
          </button>
        </div>
      </div>
    </ThreeDTiltCard>
  );
};

const Packages: React.FC<PackagesProps> = ({ lang }) => {
  const isEn = lang === 'en';

  const packages = [
    {
      name: isEn ? 'Starter' : 'الباقة الأولى',
      price: isEn ? '2000 EGP' : '٢٠٠٠ جنيه',
      features: isEn 
        ? ['3 Designs', '1 Reel Video', '1 Sponsored Ad']
        : ['٣ تصميمات', '١ فيديو ريلز', '١ إعلان ممول'],
      details: isEn 
        ? 'Perfect for small businesses starting their digital journey. Get essential social media assets to establish your presence.'
        : 'مثالية للشركات الصغيرة التي تبدأ رحلتها الرقمية. احصل على أصول التواصل الاجتماعي الأساسية لتأسيس تواجدك.',
      popular: false
    },
    {
      name: isEn ? 'Standard' : 'الباقة الثانية',
      price: isEn ? '4000 EGP' : '٤٠٠٠ جنيه',
      features: isEn
        ? ['6 Designs', '2 Reel Videos', '2 Sponsored Ads']
        : ['٦ تصميمات', '٢ فيديو ريلز', '٢ إعلان ممول'],
      details: isEn
        ? 'Ideal for growing brands. A balanced mix of static and dynamic content designed to boost engagement and reach.'
        : 'مثالية للعلامات التجارية النامية. مزيج متوازن من المحتوى الثابت والديناميكي المصمم لزيادة التفاعل والوصول.',
      popular: true
    },
    {
      name: isEn ? 'Pro' : 'الباقة الثالثة',
      price: isEn ? '6500 EGP' : '٦٥٠٠ جنيه',
      features: isEn
        ? ['12 Designs', '4 Reel Videos', '4 Sponsored Ads']
        : ['١٢ تصميم', '٤ فيديو ريلز', '٤ إعلان ممول'],
      details: isEn
        ? 'For established businesses needing consistent high-quality content output to maintain a strong market position.'
        : 'للشركات القائمة التي تحتاج إلى محتوى عالي الجودة ومستمر للحفاظ على مكانة قوية في السوق.',
      popular: false
    },
    {
      name: isEn ? 'Elite' : 'الباقة الرابعة',
      price: isEn ? '10000 EGP' : '١٠٠٠٠ جنيه',
      features: isEn
        ? ['18 Designs', '10 Reel Videos', '10 Sponsored Ads']
        : ['١٨ تصميم', '١٠ فيديو ريلز', '١٠ إعلان ممول'],
      details: isEn
        ? 'Maximum impact with comprehensive coverage. Dominate your niche with aggressive content marketing strategies.'
        : 'أقصى تأثير مع تغطية شاملة. سيطر على مجالك باستراتيجيات تسويق بالمحتوى قوية.',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-7xl mx-auto flex flex-col items-center">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{isEn ? 'Packages' : 'الباقات'}</h2>
        <p className="text-gray-400">{isEn ? 'Choose the plan that fits your needs.' : 'اختر الخطة التي تناسب احتياجاتك.'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
        {packages.map((pkg, idx) => (
          <PackageCard key={idx} pkg={pkg} isEn={isEn} />
        ))}
      </div>
    </div>
  );
};

export default Packages;