"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCountdownValues, type CountdownValues } from "@/lib/utils";
import { SPRING } from "@/lib/constants";

interface CountdownTimerProps {
  targetDate: Date;
}

const BOX_LABELS = ["Hari", "Jam", "Menit", "Detik"];

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [values, setValues] = useState<CountdownValues | null>(null);

  useEffect(() => {
    setValues(getCountdownValues(targetDate));
    const interval = setInterval(() => {
      setValues(getCountdownValues(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!values) return <div className="h-24" />;

  if (values.isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={SPRING.BOUNCY}
        className="text-center"
      >
        <p className="font-display text-2xl italic text-ink">
          Hari Bahagia Telah Tiba
        </p>
        <p className="font-sans text-xs text-blossom mt-1 tracking-widest uppercase">
          Semoga menjadi berkah
        </p>
      </motion.div>
    );
  }

  const boxes = [values.days, values.hours, values.minutes, values.seconds];

  return (
    <div className="flex items-center justify-center gap-2 md:gap-3">
      {boxes.map((val, i) => (
        <div key={BOX_LABELS[i]} className="flex items-center gap-2 md:gap-3">
          <div className="flex flex-col items-center">
            <div className="bg-cream border border-blossom/20 rounded-xl shadow-sm px-3 py-2 md:px-5 md:py-3 min-w-[56px] md:min-w-[72px] text-center">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={val}
                  initial={{ y: -12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 12, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="block font-display text-2xl md:text-3xl font-bold text-ink tabular-nums"
                >
                  {String(val).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-ink/50 mt-1.5">
              {BOX_LABELS[i]}
            </span>
          </div>
          {i < 3 && (
            <span className="font-display text-xl text-blossom/60 mb-5 animate-pulse">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
