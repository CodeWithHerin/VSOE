'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function AIConcierge() {
    const { t, language } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: t.ai.greeting }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // Update greeting when language changes
    useEffect(() => {
        setMessages(prev => {
            const newMsgs = [...prev];
            if (newMsgs.length > 0 && newMsgs[0].role === 'assistant') {
                newMsgs[0].content = t.ai.greeting;
            }
            return newMsgs;
        });
    }, [t.ai.greeting]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user' as const, content: input.trim() };
        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: updatedMessages }),
            });

            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'I apologise — I am unable to connect at the moment. Please try again shortly.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Trigger */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-8 right-20 z-50 p-4 rounded-full bg-vsoe-gold text-vsoe-midnight shadow-[0_0_30px_rgba(197,160,89,0.3)] hover:scale-110 transition-transform duration-300 ${isOpen ? 'hidden' : 'flex'}`}
            >
                <Sparkles size={24} />
            </motion.button>

            {/* Chat Interface */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        onWheel={(e) => e.stopPropagation()}
                        onTouchMove={(e) => e.stopPropagation()}
                        className="fixed bottom-8 right-20 z-50 w-96 h-[500px] bg-vsoe-midnight border border-vsoe-gold/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="p-4 bg-vsoe-gold/10 border-b border-vsoe-gold/20 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-vsoe-gold flex items-center justify-center">
                                    <Sparkles size={16} className="text-vsoe-midnight" />
                                </div>
                                <div>
                                    <h3 className="text-vsoe-gold font-serif font-bold">Vitesse Concierge</h3>
                                    <p className="text-[10px] text-vsoe-cream/60 uppercase tracking-widest">
                                        {isLoading ? 'Typing...' : 'Always at your service'}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-vsoe-cream/60 hover:text-vsoe-gold">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto overscroll-contain min-h-0 p-4 space-y-4">
                            {messages.map((msg, i) => {
                                const hasBookAction = msg.content.includes('[ACTION_BOOK]');
                                const displayContent = msg.content.replace(/\[ACTION_BOOK\]/g, '').trim();

                                return (
                                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user'
                                                ? 'bg-vsoe-gold text-vsoe-midnight rounded-br-none'
                                                : 'bg-white/5 text-vsoe-cream border border-white/10 rounded-bl-none'
                                            }`}>
                                            {displayContent}
                                            {hasBookAction && msg.role === 'assistant' && (
                                                <a 
                                                    href={`/${language?.toLowerCase() || 'en'}/book`}
                                                    className="mt-3 block text-center bg-vsoe-gold text-vsoe-midnight py-2 px-4 rounded-md font-serif font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
                                                >
                                                    Proceed to Booking
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Typing Indicator */}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="max-w-[80%] p-3 rounded-lg rounded-bl-none bg-white/5 border border-white/10 flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-vsoe-gold/70 animate-bounce [animation-delay:0ms]" />
                                        <span className="w-2 h-2 rounded-full bg-vsoe-gold/70 animate-bounce [animation-delay:150ms]" />
                                        <span className="w-2 h-2 rounded-full bg-vsoe-gold/70 animate-bounce [animation-delay:300ms]" />
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-vsoe-gold/20 bg-black/20">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder={isLoading ? 'Vitesse is thinking...' : 'Ask about journeys, dining, or suites...'}
                                    disabled={isLoading}
                                    className="flex-1 bg-transparent border-none text-vsoe-cream placeholder-vsoe-cream/30 focus:ring-0 text-sm disabled:opacity-50"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={isLoading || !input.trim()}
                                    className="text-vsoe-gold hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
