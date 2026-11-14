"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCountdownValues, type CountdownValues } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: Date;
  /** Tata letak: grid 2x2 atau satu baris 4 kolom */
  layout?: "grid" | "row";
  /** Kelas tambahan untuk angka & label (font, ukuran, warna) */
  numberClassName?: string;
  labelClassName?: string;
  className?: string;
}

const BOX_LABELS = ["Hari", "Jam", "Menit", "Detik"];

export default function CountdownTimer({
  targetDate,
  layout = "grid",
  numberClassName = "font-serif text-[40px]",
  labelClassName = "font-serif text-[15px]",
  className = "",
}: CountdownTimerProps) {
  const [values, setValues] = useState<CountdownValues | null>(null);

  useEffect(() => {
    setValues(getCountdownValues(targetDate));
    const interval = setInterval(() => {
      setValues(getCountdownValues(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const boxes = values ? [values.days, values.hours, values.minutes, values.seconds] : [0, 0, 0, 0];

  return (
    <div
      className={`${layout === "grid" ? "grid grid-cols-2 gap-x-6 gap-y-3" : "flex items-start justify-center gap-[1.2em]"} text-center ${className}`}
    >
      {boxes.map((val, i) => (
        <div key={BOX_LABELS[i]} className="flex flex-col items-center">
          <div className="overflow-hidden" style={{ height: "1.05em", fontSize: "inherit" }}>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={val}
                initial={{ y: "-40%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "40%", opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`block leading-none tabular-nums ${numberClassName}`}
              >
                {String(val).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className={`mt-1 ${labelClassName}`}>{BOX_LABELS[i]}</span>
        </div>
      ))}
    </div>
  );
}
