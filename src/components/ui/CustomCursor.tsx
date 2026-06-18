'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isTouch, setIsTouch] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia('(pointer: coarse)');
        setIsTouch(mq.matches);
    }, []);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 40, stiffness: 250, mass: 0.8 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        window.addEventListener('mousemove', moveCursor);

        // Add hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .interactive-area');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        // MutationObserver to attach listeners to new elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    const newInteractiveElements = document.querySelectorAll('a, button, .interactive-area');
                    newInteractiveElements.forEach(el => {
                        el.removeEventListener('mouseenter', handleMouseEnter); // Prevent duplicates
                        el.removeEventListener('mouseleave', handleMouseLeave);
                        el.addEventListener('mouseenter', handleMouseEnter);
                        el.addEventListener('mouseleave', handleMouseLeave);
                    });
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
            observer.disconnect();
        };
    }, [cursorX, cursorY, isVisible]);

    if (isTouch || !isVisible) return null;

    return (
        <>
            {/* Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-vsoe-gold rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                    x: "-50%",
                    y: "-50%"
                }}
            />
            {/* Outline */}
            <motion.div
                className="fixed top-0 left-0 border border-vsoe-gold rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    x: "-50%",
                    y: "-50%"
                }}
                animate={{
                    width: isHovering ? 60 : 32,
                    height: isHovering ? 60 : 32,
                    backgroundColor: "transparent",
                    borderColor: "#c5a059",
                    borderWidth: isHovering ? "1px" : "1px",
                    opacity: isHovering ? 1 : 0.5,
                    scale: isHovering ? 1.1 : 1
                }}
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 300
                }}
            />
        </>
    );
}
