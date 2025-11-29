'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageSquare, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Bonjour. I am the Digital Maître d' of Project Vitesse. How may I assist you with your journey today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, { role: 'user', content: userMessage }]
                }),
            });

            if (!response.ok) throw new Error('Failed to fetch');

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: "I apologize, but I seem to be having trouble connecting to the concierge service." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="mb-4 w-96 bg-vsoe-midnight/95 backdrop-blur-md border border-vsoe-gold/30 shadow-2xl rounded-lg overflow-hidden pointer-events-auto"
                    >
                        {/* Header */}
                        <div className="bg-vsoe-midnight border-b border-vsoe-gold/20 p-4 flex justify-between items-center">
                            <div className="flex items-center gap-2 text-vsoe-gold">
                                <Sparkles size={18} />
                                <h3 className="font-serif text-lg tracking-wide">Concierge</h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-vsoe-gold/60 hover:text-vsoe-gold transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="h-96 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-vsoe-gold/20">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={cn(
                                        "max-w-[85%] p-3 rounded-lg text-sm leading-relaxed",
                                        msg.role === 'user'
                                            ? "ml-auto bg-vsoe-gold/10 text-vsoe-steam border border-vsoe-gold/20 rounded-br-none"
                                            : "mr-auto bg-black/20 text-vsoe-steam/90 border border-white/5 rounded-bl-none"
                                    )}
                                >
                                    {msg.content}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="mr-auto bg-black/20 p-3 rounded-lg rounded-bl-none">
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-vsoe-gold/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 bg-vsoe-gold/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 bg-vsoe-gold/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-4 border-t border-vsoe-gold/20 bg-black/20">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about availability..."
                                    className="w-full bg-vsoe-midnight border border-vsoe-gold/30 rounded-md py-2 pl-3 pr-10 text-vsoe-steam placeholder:text-vsoe-steam/30 focus:outline-none focus:border-vsoe-gold/60 transition-colors font-sans text-sm"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-vsoe-gold hover:text-white disabled:opacity-50 transition-colors"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-vsoe-gold text-vsoe-midnight rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors pointer-events-auto z-50"
            >
                <MessageSquare size={24} />
            </motion.button>
        </div>
    );
}
