'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { X, Sparkles, Minimize2, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Bonsoir. I am your Digital Maître d'. How may I curate your journey on the Venice Simplon-Orient-Express today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isLoading]);

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
            setMessages(prev => [...prev, { role: 'assistant', content: "I apologize, but I seem to be momentarily disconnected from the concierge service. Please try again in a moment." }]);
        } finally {
            setIsLoading(false);
            // Focus input after sending for better UX
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, rotateX: -5 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95, rotateX: -5 }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        className="mb-4 w-[22rem] md:w-[24rem] h-[28rem] md:h-[32rem] bg-vsoe-midnight/90 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden pointer-events-auto flex flex-col relative"
                    >
                        {/* Starry Background Effect */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute w-1 h-1 bg-white rounded-full top-10 left-10 opacity-50 animate-pulse" />
                            <div className="absolute w-0.5 h-0.5 bg-white rounded-full top-20 right-20 opacity-30 animate-pulse delay-75" />
                            <div className="absolute w-1 h-1 bg-vsoe-gold rounded-full bottom-32 left-1/2 opacity-40 animate-pulse delay-150" />
                            <div className="absolute w-0.5 h-0.5 bg-white rounded-full bottom-10 right-10 opacity-20 animate-pulse delay-300" />
                        </div>

                        {/* Noise Overlay */}
                        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none z-0" />

                        {/* Header */}
                        <div className="relative z-10 bg-gradient-to-b from-white/10 to-transparent p-4 flex justify-between items-center border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-vsoe-gold/30 to-vsoe-gold/10 flex items-center justify-center border border-vsoe-gold/40 shadow-[0_0_15px_rgba(184,134,11,0.3)]">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-vsoe-gold drop-shadow-md">
                                        <path d="M12 22L2 4H6L12 15L18 4H22L12 22Z" fill="currentColor" fillOpacity="0.9" />
                                        <path d="M12 22L2 4H6L12 15L18 4H22L12 22Z" stroke="currentColor" strokeWidth="0.5" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-serif text-lg tracking-wide text-vsoe-steam">Concierge</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-vsoe-gold/80">Vitesse AI</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                            >
                                <Minimize2 size={16} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            className="relative z-10 flex-1 min-h-0 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-vsoe-gold/20 scrollbar-track-transparent overscroll-contain scroll-smooth"
                            onWheel={(e) => e.stopPropagation()}
                        >
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className={cn(
                                        "max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-lg backdrop-blur-sm",
                                        msg.role === 'user'
                                            ? "ml-auto bg-vsoe-gold/90 text-vsoe-midnight font-medium rounded-br-sm border border-vsoe-gold/20"
                                            : "mr-auto bg-vsoe-midnight/60 text-vsoe-steam/90 border border-white/10 rounded-bl-sm"
                                    )}
                                >
                                    {msg.content}
                                </motion.div>
                            ))}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mr-auto bg-vsoe-midnight/60 p-4 rounded-2xl rounded-bl-sm border border-white/10 w-16 h-10 flex items-center justify-center"
                                >
                                    <div className="flex gap-1">
                                        <motion.span
                                            animate={{ y: [0, -4, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                                            className="w-1 h-1 bg-vsoe-gold rounded-full"
                                        />
                                        <motion.span
                                            animate={{ y: [0, -4, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                                            className="w-1 h-1 bg-vsoe-gold rounded-full"
                                        />
                                        <motion.span
                                            animate={{ y: [0, -4, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                                            className="w-1 h-1 bg-vsoe-gold rounded-full"
                                        />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="relative z-10 p-4 bg-gradient-to-t from-black/20 to-transparent flex-shrink-0">
                            <div className="relative group">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about your journey..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-vsoe-steam placeholder:text-white/20 focus:outline-none focus:border-vsoe-gold/40 focus:bg-white/10 transition-all font-sans text-sm shadow-inner"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-vsoe-gold/10 text-vsoe-gold rounded-lg hover:bg-vsoe-gold hover:text-vsoe-midnight disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-vsoe-gold transition-all duration-300"
                                >
                                    <ArrowUp size={16} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <div className="pointer-events-auto">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "w-14 h-14 rounded-full shadow-[0_0_30px_rgba(184,134,11,0.3)] flex items-center justify-center transition-all duration-500 relative group overflow-hidden border border-white/10",
                        isOpen ? "bg-vsoe-steam text-vsoe-midnight" : "bg-vsoe-midnight/80 backdrop-blur-md text-vsoe-gold"
                    )}
                >
                    <div className="absolute inset-0 bg-vsoe-gold/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full" />
                    {isOpen ? <X size={24} /> : <Sparkles size={24} />}
                </motion.button>
            </div>
        </div>
    );
}





