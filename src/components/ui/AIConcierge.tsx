'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

export default function AIConcierge() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'system', content: 'Good evening. I am Vitesse, your personal concierge. How may I assist you with your journey today?' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { role: 'user', content: input }]);
        setInput('');

        // Mock Response
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'system', content: 'I have noted your request. Checking availability for the Grand Suite...' }]);
        }, 1000);
    };

    return (
        <>
            {/* Floating Trigger */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-vsoe-gold text-vsoe-midnight shadow-[0_0_30px_rgba(197,160,89,0.3)] hover:scale-110 transition-transform duration-300 ${isOpen ? 'hidden' : 'flex'}`}
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
                        className="fixed bottom-8 right-8 z-50 w-96 h-[500px] bg-vsoe-midnight border border-vsoe-gold/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="p-4 bg-vsoe-gold/10 border-b border-vsoe-gold/20 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-vsoe-gold flex items-center justify-center">
                                    <Sparkles size={16} className="text-vsoe-midnight" />
                                </div>
                                <div>
                                    <h3 className="text-vsoe-gold font-serif font-bold">Vitesse Concierge</h3>
                                    <p className="text-[10px] text-vsoe-cream/60 uppercase tracking-widest">Always at your service</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-vsoe-cream/60 hover:text-vsoe-gold">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user'
                                            ? 'bg-vsoe-gold text-vsoe-midnight rounded-br-none'
                                            : 'bg-white/5 text-vsoe-cream border border-white/10 rounded-bl-none'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-vsoe-gold/20 bg-black/20">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about journeys, dining, or suites..."
                                    className="flex-1 bg-transparent border-none text-vsoe-cream placeholder-vsoe-cream/30 focus:ring-0 text-sm"
                                />
                                <button onClick={handleSend} className="text-vsoe-gold hover:text-white transition-colors">
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
