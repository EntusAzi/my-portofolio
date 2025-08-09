'use client'
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion'; // Perhatikan: ganti dari 'motion/react' ke 'framer-motion'

interface ScrollLineProps {
  className?: string;
  color?: string;
  glowColor?: string;
  thickness?: number;
  height?: string;
}

export default function ScrollLine({
  className = '',
  color = '#00ffff',
  glowColor = 'rgba(0, 255, 255, 0.6)',
  thickness = 4,
  height = '100%'
}: ScrollLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute left-0 w-full ${className}`} // Ubah dari left-1/2 ke left-0 dan width full
      style={{ height, top: '0px' }}
    >
      <motion.div
        className="relative w-full h-full mx-auto" // Tambahkan mx-auto untuk memusatkan
        style={{ maxWidth: '1200px' }} // Batasi lebar maksimum
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Vertical line */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 origin-top"
          style={{
            width: `${thickness}px`,
            height: lineHeight,
            backgroundColor: color,
            boxShadow: `0 0 ${thickness * 3}px ${glowColor}`,
          }}
          initial={{ scaleY: 0 }}
          animate={isVisible ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />

        {/* Dot di awal (top) */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 rounded-full"
          style={{
            width: `${thickness * 4}px`,
            height: `${thickness * 4}px`,
            backgroundColor: color,
            boxShadow: `0 0 ${thickness * 8}px ${glowColor}`,
            top: '0%'
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />

        {/* Dot di akhir (bottom) */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 rounded-full"
          style={{
            width: `${thickness * 4}px`,
            height: `${thickness * 4}px`,
            backgroundColor: color,
            boxShadow: `0 0 ${thickness * 8}px ${glowColor}`,
            top: '100%'
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />

        <div
          className="absolute left-1/2 transform -translate-x-1/2 w-full h-full"
          style={{
            background: `linear-gradient(to bottom, transparent, ${color}15, transparent)`,
            width: `${thickness * 3}px`
          }}
        />
      </motion.div>
    </div>
  );
}