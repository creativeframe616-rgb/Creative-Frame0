import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatWidgetProps {
  lang: 'en' | 'ar';
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: lang === 'en' ? 'Hello! How can I help you realize your creative vision today?' : 'مرحباً! كيف يمكنني مساعدتك في تحقيق رؤيتك الإبداعية اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update greeting when language changes if no conversation yet
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'model') {
       setMessages([{ 
         role: 'model', 
         text: lang === 'en' 
           ? 'Hello! How can I help you realize your creative vision today?' 
           : 'مرحباً! كيف يمكنني مساعدتك في تحقيق رؤيتك الإبداعية اليوم؟' 
       }]);
    }
  }, [lang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      // Convert internal state history to format expected by service
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await sendMessageToGemini(userMsg, history);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: lang === 'en' ? 'Error connecting to AI.' : 'عذراً، حدث خطأ أثناء الاتصال بالمساعد الذكي.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const isRTL = lang === 'ar';

  return (
    <div className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-50 flex flex-col ${isRTL ? 'items-start' : 'items-end'}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: '500px' }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Sparkles size={18} className="animate-pulse" />
                <span className="font-bold">{lang === 'en' ? 'Creative AI' : 'المساعد الإبداعي'}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/95 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
              {messages.map((msg, idx) => {
                // Determine alignment logic based on Language + Role
                // In LTR: User=Right (justify-end), Model=Left (justify-start)
                // In RTL: User=Right (justify-start), Model=Left (justify-end)
                // Note: In Flex row with dir=rtl, 'start' is Right and 'end' is Left.
                // We want User on the visual Right side and Model on visual Left side always?
                // Usually in Arabic chat apps:
                // Me (User) -> Right side.
                // Other (Model) -> Left side.
                // So:
                // LTR: User (Right) -> justify-end. Model (Left) -> justify-start.
                // RTL: User (Right) -> justify-start. Model (Left) -> justify-end.
                
                let justifyClass = '';
                if (lang === 'en') {
                    justifyClass = msg.role === 'user' ? 'justify-end' : 'justify-start';
                } else {
                    justifyClass = msg.role === 'user' ? 'justify-start' : 'justify-end';
                }

                return (
                  <div
                    key={idx}
                    className={`flex ${justifyClass}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-cyan-600 text-white ' + (isRTL ? 'rounded-br-none' : 'rounded-br-none') 
                          : 'bg-slate-800 text-gray-200 border border-slate-700 ' + (isRTL ? 'rounded-bl-none' : 'rounded-bl-none')
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              {isLoading && (
                 <div className={`flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
                  <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700 flex gap-1 items-center">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={lang === 'en' ? "Ask about our services..." : "اسأل عن خدماتنا..."}
                className={`flex-1 bg-slate-800 text-white text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className={`p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${isRTL ? 'rotate-180' : ''}`}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-full shadow-lg shadow-cyan-500/30 flex items-center justify-center text-white z-50"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>
    </div>
  );
};

export default ChatWidget;