'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface HeavyButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'ghost';
    children: React.ReactNode;
}

const crystalHover = {
    scale: 1.02,
    transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1] as const // Cubic bezier for smooth "glass-like" refraction timing
    }
};

const heavyClick = {
    scale: 0.98,
    transition: {
        type: "spring",
        mass: 0.5, // Lighter on the click for responsiveness
        stiffness: 200,
        damping: 10
    }
} as const;

export default function HeavyButton({
    className,
    variant = 'primary',
    children,
    ...props
}: HeavyButtonProps) {

    const baseStyles = "relative px-8 py-4 font-serif text-lg tracking-widest uppercase transition-colors duration-300 border border-transparent";

    const variants = {
        primary: "bg-vsoe-gold text-vsoe-midnight hover:bg-white hover:text-vsoe-midnight",
        secondary: "bg-transparent border-vsoe-gold text-vsoe-gold hover:bg-vsoe-gold/10",
        ghost: "bg-transparent text-vsoe-steam hover:text-vsoe-gold"
    };

    return (
        <motion.button
            className={cn(baseStyles, variants[variant], className)}
            whileHover={crystalHover}
            whileTap={heavyClick}
            {...props}
        >
            {children}
        </motion.button>
    );
}
