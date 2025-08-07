'use client'
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface TrueFocusProps {
    sentence?: string;
    manualMode?: boolean;
    blurAmount?: number;
    borderColor?: string;
    glowColor?: string;
    animationDuration?: number;
    pauseBetweenAnimations?: number;
    focusWords?: number; // Number of words to focus at once
    fontSize?: string; // Font size class
}

interface FocusRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
    sentence = "True Focus",
    manualMode = false,
    blurAmount = 5,
    borderColor = "red",
    glowColor = "#00FFFF",
    animationDuration = 0.5,
    pauseBetweenAnimations = 1,
    focusWords = 2, // Default to focus 2 words
    fontSize = "text-[3rem]", // Default font size
}) => {
    const words = sentence.split(" ");
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 });
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        if (!manualMode) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % words.length);
            }, (animationDuration + pauseBetweenAnimations) * 1000);

            return () => clearInterval(interval);
        }
    }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }
        };

        if (manualMode) {
            document.addEventListener('mousemove', handleMouseMove);
            return () => document.removeEventListener('mousemove', handleMouseMove);
        }
    }, [manualMode]);

    useEffect(() => {
        if (currentIndex === null || currentIndex === -1) return;
        if (!wordRefs.current[currentIndex] || !containerRef.current) return;

        const parentRect = containerRef.current.getBoundingClientRect();
        const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

        // Calculate focus rect for multiple words
        let startIndex = Math.max(0, currentIndex);
        let endIndex = Math.min(words.length - 1, currentIndex + focusWords - 1);
        
        if (startIndex === endIndex) {
            // Single word focus
            setFocusRect({
                x: activeRect.left - parentRect.left,
                y: activeRect.top - parentRect.top,
                width: activeRect.width,
                height: activeRect.height,
            });
        } else {
            // Multiple words focus
            const startRect = wordRefs.current[startIndex]?.getBoundingClientRect();
            const endRect = wordRefs.current[endIndex]?.getBoundingClientRect();
            
            if (startRect && endRect) {
                setFocusRect({
                    x: startRect.left - parentRect.left,
                    y: startRect.top - parentRect.top,
                    width: (endRect.right - startRect.left),
                    height: startRect.height,
                });
            }
        }
    }, [currentIndex, words.length, focusWords]);

    const handleMouseEnter = (index: number) => {
        if (manualMode) {
            setLastActiveIndex(index);
            setCurrentIndex(index);
        }
    };

    const handleMouseLeave = () => {
        if (manualMode) {
            setCurrentIndex(lastActiveIndex!);
        }
    };

    // Find closest word to mouse position with faster response
    const getClosestWordIndex = () => {
        if (!manualMode) return currentIndex;
        
        let closestIndex = 0;
        let closestDistance = Infinity;
        
        wordRefs.current.forEach((wordRef, index) => {
            if (wordRef) {
                const rect = wordRef.getBoundingClientRect();
                const wordCenterX = rect.left + rect.width / 2;
                const wordCenterY = rect.top + rect.height / 2;
                
                const distance = Math.sqrt(
                    Math.pow(mousePosition.x - (wordCenterX - (containerRef.current?.getBoundingClientRect().left || 0)), 2) +
                    Math.pow(mousePosition.y - (wordCenterY - (containerRef.current?.getBoundingClientRect().top || 0)), 2)
                );
                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            }
        });
        
        return closestIndex;
    };

    const activeIndex = manualMode ? getClosestWordIndex() : currentIndex;

    // Check if a word should be focused (for multiple word focus)
    const isWordFocused = (index: number) => {
        return index >= activeIndex && index < activeIndex + focusWords;
    };

    return (
        <div
            className="relative flex gap-4 justify-center items-center flex-wrap"
            ref={containerRef}
        >
            {words.map((word, index) => {
                const isActive = isWordFocused(index);
                return (
                    <span
                        key={index}
                        ref={(el) => { wordRefs.current[index] = el; }}
                        className={`relative font-black cursor-pointer text-white ${fontSize}`}
                        style={{
                            filter: isActive ? `blur(0px)` : `blur(${blurAmount}px)`,
                            transition: `filter ${animationDuration}s ease`,
                        } as React.CSSProperties}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {word}
                    </span>
                );
            })}

            <motion.div
                className="absolute top-0 left-0 pointer-events-none box-border border-0"
                animate={{
                    x: focusRect.x,
                    y: focusRect.y,
                    width: focusRect.width,
                    height: focusRect.height,
                    opacity: activeIndex >= 0 ? 1 : 0,
                }}
                transition={{
                    duration: animationDuration,
                    ease: "easeOut"
                }}
                style={{
                    "--border-color": borderColor,
                    "--glow-color": glowColor,
                } as React.CSSProperties}
            >
                <span
                    className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] left-[-10px] border-r-0 border-b-0"
                    style={{
                        borderColor: "var(--border-color)",
                        filter: "drop-shadow(0 0 8px var(--glow-color))",
                        boxShadow: "0 0 8px var(--glow-color)"
                    }}
                ></span>
                <span
                    className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] right-[-10px] border-l-0 border-b-0"
                    style={{
                        borderColor: "var(--border-color)",
                        filter: "drop-shadow(0 0 8px var(--glow-color))",
                        boxShadow: "0 0 8px var(--glow-color)"
                    }}
                ></span>
                <span
                    className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] left-[-10px] border-r-0 border-t-0"
                    style={{
                        borderColor: "var(--border-color)",
                        filter: "drop-shadow(0 0 8px var(--glow-color))",
                        boxShadow: "0 0 8px var(--glow-color)"
                    }}
                ></span>
                <span
                    className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] right-[-10px] border-l-0 border-t-0"
                    style={{
                        borderColor: "var(--border-color)",
                        filter: "drop-shadow(0 0 8px var(--glow-color))",
                        boxShadow: "0 0 8px var(--glow-color)"
                    }}
                ></span>
            </motion.div>
        </div>
    );
};

export default TrueFocus;