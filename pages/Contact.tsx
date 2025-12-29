import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { Language } from '../types';

interface ContactProps {
  lang: Language;
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const isEn = lang === 'en';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
          _subject: `New Contact from Contact Page: ${formData.name}`,
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
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info & Map */}
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">{isEn ? 'Get in Touch' : 'اتصل بنا'}</h2>
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
  );
};

export default Contact;