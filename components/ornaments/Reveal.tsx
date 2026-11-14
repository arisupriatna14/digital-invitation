"use client";

import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "up" | "left" | "right" | "zoom";
  as?: "div" | "p" | "h2" | "h3";
}

const INITIAL = {
  up: { opacity: 0, y: 30 },
  left: { opacity: 0, x: -40 },
  right: { opacity: 0, x: 40 },
  zoom: { opacity: 0, scale: 0.85 },
};

// Animasi masuk saat elemen terlihat (padanan data-aos di referensi).
export default function Reveal({ children, className = "", delay = 0, from = "up", as = "div" }: RevealProps) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={INITIAL[from]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px 0px" }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay }}
    >
      {children}
    </Comp>
  );
}
