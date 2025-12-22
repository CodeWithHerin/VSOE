'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TextRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    width?: "fit-content" | "100%";
}

export default function TextReveal({ children, className = "", delay = 0, width = "fit-content" }: TextRevealProps) {
    return (
        <div style={{ position: "relative", width, overflow: "hidden" }} className={className}>
            <motion.div
                variants={{
                    hidden: { y: "100%" },
                    visible: { y: 0 }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                    duration: 0.8,
                    delay: delay,
                    ease: [0.25, 1, 0.5, 1] // Cubic bezier for "luxurious" ease
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
