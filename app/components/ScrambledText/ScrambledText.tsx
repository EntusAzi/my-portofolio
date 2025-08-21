'use client'
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style = {},
  children,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    // Find all text elements (h1, p, etc.) within the component
    const textElements = rootRef.current.querySelectorAll("h1, p, h2, h3, h4, h5, h6, span, div");
    
    if (textElements.length === 0) return;

    const splits: SplitText[] = [];
    const allChars: HTMLElement[] = [];

    // Process each text element
    textElements.forEach((element) => {
      const split = SplitText.create(element, {
        type: "chars",
        charsClass: "inline-block will-change-transform",
      });
      
      splits.push(split);
      
      split.chars.forEach((el) => {
        const c = el as HTMLElement;
        gsap.set(c, { attr: { "data-content": c.innerHTML } });
        allChars.push(c);
      });
    });

    const handleMove = (e: PointerEvent) => {
      allChars.forEach((c) => {
        const { left, top, width, height } = c.getBoundingClientRect();
        const dx = e.clientX - (left + width / 2);
        const dy = e.clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          gsap.to(c, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: c.dataset.content || "",
              chars: scrambleChars,
              speed,
            },
            ease: "none",
          });
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener("pointermove", handleMove);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      // Revert all splits
      splits.forEach(split => split.revert());
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div
      ref={rootRef}
      className={`m-[7vw] max-w-[800px] font-mono text-[clamp(14px,4vw,32px)] text-white ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default ScrambledText;
