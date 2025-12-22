'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function MagneticButton({ children, className = "", onClick }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const mouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } = ref.current!.getBoundingClientRect();
        // Calculate center
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Calculate distance from center (increased strength for better 'stick')
        const x = (clientX - centerX) * 0.35;
        const y = (clientY - centerY) * 0.35;

        setPosition({ x, y });
    };

    const mouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.div
            ref={ref}
            onMouseMove={mouseMove}
            onMouseLeave={mouseLeave}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`cursor-pointer ${className}`}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}
