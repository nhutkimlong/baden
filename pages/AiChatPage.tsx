import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader } from 'lucide-react';
import { getAiResponse } from '../services/geminiService';
import { ChatMessage, PageProps } from '../types';
import Header from '../components/Header';

const AiChatPage: React.FC<PageProps> = ({ theme, toggleTheme }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: 'Xin chào! Tôi là Bà Đen AI, trợ lý ảo của bạn. Tôi có thể giúp gì cho bạn?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    const history: { role: 'user' | 'model'; parts: { text: string }[] }[] = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));

    try {
      const aiResponseText = await getAiResponse(input, history);
      const aiMessage: ChatMessage = { sender: 'ai', text: aiResponseText };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { sender: 'ai', text: 'Rất tiếc, đã có lỗi xảy ra. Vui lòng thử lại.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-slate-900">
      <Header title="Trợ lý AI" theme={theme} toggleTheme={toggleTheme}/>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white flex-shrink-0">
                <Bot size={20} />
              </div>
            )}
            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-green-600 text-white rounded-br-none' : 'bg-white dark:bg-slate-700 text-gray-800 dark:text-slate-100 rounded-bl-none shadow-sm'}`}>
              <p className="text-sm">{msg.text}</p>
            </div>
            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-slate-600 flex items-center justify-center text-gray-600 dark:text-slate-200 flex-shrink-0">
                <User size={20} />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white flex-shrink-0">
                    <Bot size={20} />
                </div>
                <div className="max-w-xs md:max-w-md p-3 rounded-2xl bg-white dark:bg-slate-700 text-gray-800 dark:text-slate-100 rounded-bl-none shadow-sm flex items-center">
                    <Loader size={20} className="animate-spin text-gray-500" />
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white dark:bg-slate-800 border-t dark:border-slate-700">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập câu hỏi của bạn..."
            className="flex-1 px-4 py-2 border dark:border-slate-600 rounded-full bg-gray-100 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-green-600"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-green-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg disabled:bg-green-400"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiChatPage;