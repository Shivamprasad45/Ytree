
import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface GeminiAssistantProps {
    onProductSelect: (productName: string) => void;
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ onProductSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [suggestion, setSuggestion] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const askAssistant = async () => {
        if (!prompt.trim()) return;

        setIsLoading(true);
        setSuggestion(null);

        try {
            const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
            const model = genAI.getGenerativeModel({
                model: "gemini-3-flash-preview",
                systemInstruction: 'You are an eco-shopping assistant. Your goal is to help people find sustainable alternatives to common products.',
            });

            const result = await model.generateContent(`I want to buy something eco-friendly. ${prompt}. Suggest one specific product type or brand name that would be a great sustainable choice. Keep it short (max 10 words).`);

            const text = result.response.text() || "Try searching for reusable bamboo products!";
            setSuggestion(text);
        } catch (error) {
            console.error('Error with Gemini:', error);
            setSuggestion("I'm having trouble thinking of an eco-alternative right now. Try searching for 'Bamboo'!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-16 w-full bg-white rounded-2xl border border-[#f0f4f0] p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-[#1dc91d] text-white p-2 rounded-lg">
                            <span className="material-symbols-outlined">auto_awesome</span>
                        </div>
                        <h3 className="text-xl font-extrabold">Can&apos;t find what you&apos;re looking for?</h3>
                    </div>
                    <p className="text-gray-500 font-medium mb-6">
                        Ask our AI assistant for a sustainable alternative to any product you usually buy.
                        We&apos;ll help you find an eco-friendly version that plants trees.
                    </p>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="e.g., 'sustainable replacement for plastic razors'"
                            className="flex-1 rounded-xl border-[#f0f4f0] focus:ring-[#1dc91d] focus:border-[#1dc91d]"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && askAssistant()}
                        />
                        <button
                            className="bg-[#112111] text-white px-6 py-2 rounded-xl font-bold disabled:opacity-50"
                            onClick={askAssistant}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Thinking...' : 'Ask AI'}
                        </button>
                    </div>

                    {suggestion && (
                        <div className="mt-6 p-4 bg-[#1dc91d]/5 rounded-xl border border-[#1dc91d]/20 animate-in fade-in slide-in-from-top-2">
                            <p className="text-sm font-bold text-[#1dc91d] mb-1 uppercase tracking-wider">AI Suggestion</p>
                            <p className="text-[#112111] font-semibold flex items-center gap-2">
                                &quot;{suggestion}&quot;
                                <button
                                    onClick={() => onProductSelect(suggestion)}
                                    className="text-xs bg-[#1dc91d] text-white px-2 py-1 rounded hover:bg-[#1dc91d]/90"
                                >
                                    Search
                                </button>
                            </p>
                        </div>
                    )}
                </div>

                <div className="hidden lg:block w-64 h-64 bg-gray-50 rounded-2xl overflow-hidden grayscale opacity-40">
                    <img
                        src="https://picsum.photos/seed/nature/400/400"
                        alt="AI Visual"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default GeminiAssistant;
