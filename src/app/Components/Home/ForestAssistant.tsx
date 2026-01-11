
import React, { useState, useRef, useEffect } from 'react';
import { generateForestAdvice } from '../Anothers/geminiService';
import { Message } from '@/type';

interface ForestAssistantProps {
    onClose: () => void;
}

const ForestAssistant: React.FC<ForestAssistantProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: "Hello! I'm your Vanagrow Forest Assistant. How can I help you restore the planet today?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        const botResponse = await generateForestAdvice(input);
        const botMessage: Message = { role: 'model', text: botResponse };

        setIsTyping(false);
        setMessages(prev => [...prev, botMessage]);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-deep-forest/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg h-[600px] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border border-sage/10 animate-in slide-in-from-bottom-8 duration-500">
                {/* Header */}
                <div className="bg-deep-forest p-6 flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-deep-forest">
                            <span className="material-symbols-outlined text-2xl font-bold">eco</span>
                        </div>
                        <div>
                            <h3 className="font-black text-lg tracking-tight">Forest Assistant</h3>
                            <p className="text-xs text-primary font-bold animate-pulse">Online & Helpful</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="size-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-background-light">
                    {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm font-medium leading-relaxed ${m.role === 'user'
                                    ? 'bg-primary text-deep-forest rounded-tr-none'
                                    : 'bg-white border border-sage/10 text-sage rounded-tl-none'
                                    }`}
                            >
                                {m.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-sage/10 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                                <div className="size-2 bg-sage/30 rounded-full animate-bounce"></div>
                                <div className="size-2 bg-sage/30 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                <div className="size-2 bg-sage/30 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-6 bg-white border-t border-sage/10 flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about reforestation..."
                        className="flex-grow h-12 px-5 rounded-full bg-background-light border-transparent focus:border-primary focus:ring-0 text-sm font-medium transition-all"
                    />
                    <button
                        type="submit"
                        disabled={isTyping}
                        className="size-12 rounded-full bg-primary text-deep-forest flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                    >
                        <span className="material-symbols-outlined font-bold">send</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForestAssistant;
