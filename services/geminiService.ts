import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const sendMessageToGemini = async (message: string, history: { role: 'user' | 'model', text: string }[]) => {
  if (!ai) {
    // Mock response if no API key
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve("أنا مساعد ذكي تجريبي لـ Creative Frame. يرجى ضبط مفتاح API للتحدث بشكل حقيقي! (رد محاكى)");
      }, 1000);
    });
  }

  try {
    // Format history to match the Google GenAI SDK expectation
    // Note: The SDK expects history to be passed when creating the chat
    const formattedHistory = history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    }));

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash-latest',
      config: {
        systemInstruction: `أنت المساعد الذكي لشركة "Creative Frame" (الإطار الإبداعي)، وهي وكالة إبداعية متميزة في الشرق الأوسط.
        يجب أن يكون ردك دائماً باللغة العربية، بأسلوب احترافي، سينمائي، ومبدع وجذاب.
        
        خدماتنا تشمل:
        - مونتاج الفيديو (Video Editing)
        - الموشن جرافيك (Motion Graphics)
        - التصميم الجرافيكي (Graphic Design)
        - التسويق الرقمي (Digital Marketing)
        - التصوير الفوتوغرافي (Photography)
        
        تعليمات الرد:
        1. تحدث بلهجة ترحيبية ومشجعة.
        2. جاوب على الأسئلة حول خدماتنا بإيجاز ودقة.
        3. شجع العملاء دائماً على بدء مشروع جديد أو زيارة صفحة "تواصل معنا".
        4. استخدم مصطلحات فنية بسيطة عند الحاجة لإظهار الاحترافية (مثل "Quality", "Timeline", "Creative Vision").
        `,
      },
      history: formattedHistory
    });

    const result = await chat.sendMessage({ message: message });
    return result.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "عذراً، أواجه مشكلة بسيطة في الاتصال بالخادم الإبداعي حالياً. يرجى المحاولة مرة أخرى لاحقاً.";
  }
};