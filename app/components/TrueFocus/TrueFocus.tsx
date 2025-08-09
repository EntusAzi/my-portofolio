'use client'
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface TrueFocusProps {
    sentence?: string;
    manualMode?: boolean;
    blurAmount?: number;
    borderColor?: string;
    glowColor?: string;
    animationDuration?: number;
    pauseBetweenAnimations?: number;
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
    borderColor = "green",
    glowColor = "rgba(0, 255, 0, 0.6)",
    animationDuration = 0.5,
    pauseBetweenAnimations = 1,
}) => {
    const words = sentence.split(" ");
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 });
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [focusedWords, setFocusedWords] = useState<{ start: number; end: number }>({ start: 0, end: 1 });

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
            if (!containerRef.current) return;
            
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setMousePosition({ x, y });

            // Hitung kata mana yang paling dekat dengan cursor
            let closestIndex = 0;
            let minDistance = Infinity;

            wordRefs.current.forEach((wordRef, index) => {
                if (wordRef) {
                    const wordRect = wordRef.getBoundingClientRect();
                    const wordCenterX = wordRect.left + wordRect.width / 2 - rect.left;
                    const wordCenterY = wordRect.top + wordRect.height / 2 - rect.top;
                    
                    const distance = Math.sqrt(
                        Math.pow(x - wordCenterX, 2) + Math.pow(y - wordCenterY, 2)
                    );
                    
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestIndex = index;
                    }
                }
            });

            // Kunci fokus pada pasangan 2 kata
            // Jika jumlah kata ganjil, kata terakhir akan fokus sendiri
            let startIndex, endIndex;
            
            if (words.length % 2 === 0) {
                // Jumlah kata genap - selalu fokus 2 kata
                startIndex = Math.floor(closestIndex / 2) * 2;
                endIndex = startIndex + 1;
            } else {
                // Jumlah kata ganjil
                if (closestIndex === words.length - 1) {
                    // Kata terakhir - fokus sendiri
                    startIndex = closestIndex;
                    endIndex = closestIndex;
                } else {
                    // Kata lainnya - fokus 2 kata
                    startIndex = Math.floor(closestIndex / 2) * 2;
                    endIndex = startIndex + 1;
                }
            }
            
            // Pastikan tidak melebihi batas array
            startIndex = Math.max(0, Math.min(startIndex, words.length - 1));
            endIndex = Math.min(endIndex, words.length - 1);
            
            // Pastikan fokus selalu pada pasangan yang tepat
            if (endIndex - startIndex === 1) {
                // Fokus 2 kata - pastikan selalu pasangan yang benar
                if (startIndex % 2 !== 0) {
                    startIndex = startIndex - 1;
                    endIndex = endIndex - 1;
                }
            }
            
            // Hanya update fokus jika benar-benar berbeda
            const newFocus = { start: startIndex, end: endIndex };
            setFocusedWords(prevFocus => {
                if (prevFocus.start !== newFocus.start || prevFocus.end !== newFocus.end) {
                    return newFocus;
                }
                return prevFocus;
            });
            setCurrentIndex(closestIndex);
        };

        if (manualMode) {
            document.addEventListener('mousemove', handleMouseMove);
            return () => document.removeEventListener('mousemove', handleMouseMove);
        }
    }, [manualMode, words.length]);

    useEffect(() => {
        if (currentIndex === null || currentIndex === -1) return;
        if (!wordRefs.current[currentIndex] || !containerRef.current) return;

        const parentRect = containerRef.current.getBoundingClientRect();
        
        // Hitung area fokus untuk 2 kata
        const startWord = wordRefs.current[focusedWords.start];
        const endWord = wordRefs.current[focusedWords.end];
        
        if (startWord && endWord) {
            const startRect = startWord.getBoundingClientRect();
            const endRect = endWord.getBoundingClientRect();
            
            const focusX = startRect.left - parentRect.left;
            const focusY = startRect.top - parentRect.top;
            const focusWidth = (endRect.left + endRect.width) - startRect.left;
            const focusHeight = Math.max(startRect.height, endRect.height);

            setFocusRect({
                x: focusX,
                y: focusY,
                width: focusWidth,
                height: focusHeight,
            });
        }
    }, [currentIndex, focusedWords, words.length]);

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

    return (
        <div
            className="relative flex gap-4 justify-start items-center flex-nowrap overflow-visible"
            ref={containerRef}
        >
            {words.map((word, index) => {
                const isActive = index >= focusedWords.start && index <= focusedWords.end;
                return (
                    <span
                        key={index}
                        ref={(el) => { wordRefs.current[index] = el; }}
                        className="relative text-[2.5rem] font-black cursor-pointer whitespace-nowrap"
                        style={{
                            filter: manualMode
                                ? isActive
                                    ? `blur(0px)`
                                    : `blur(${blurAmount}px)`
                                : isActive
                                    ? `blur(0px)`
                                    : `blur(${blurAmount}px)`,
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
                    opacity: currentIndex >= 0 ? 1 : 0,
                }}
                transition={{
                    duration: animationDuration,
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
                        filter: "drop-shadow(0 0 4px var(--border-color))",
                    }}
                ></span>
                <span
                    className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] right-[-10px] border-l-0 border-b-0"
                    style={{
                        borderColor: "var(--border-color)",
                        filter: "drop-shadow(0 0 4px var(--border-color))",
                    }}
                ></span>
                <span
                    className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] left-[-10px] border-r-0 border-t-0"
                    style={{
                        borderColor: "var(--border-color)",
                        filter: "drop-shadow(0 0 4px var(--border-color))",
                    }}
                ></span>
                <span
                    className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] right-[-10px] border-l-0 border-t-0"
                    style={{
                        borderColor: "var(--border-color)",
                        filter: "drop-shadow(0 0 4px var(--border-color))",
                    }}
                ></span>
            </motion.div>
        </div>
    );
};

export default TrueFocus;