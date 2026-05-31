"use client";

import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, VolumeX } from "lucide-react";
import { SPRING, WEDDING_DATA } from "@/lib/constants";

export interface MusicPlayerRef {
  startMusic: () => void;
}

const MusicPlayer = forwardRef<MusicPlayerRef>(function MusicPlayer(_, ref) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    startMusic: () => {
      audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
    },
  }));

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src={WEDDING_DATA.music.src} loop preload="none" />
      <motion.button
        onClick={toggle}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 bg-ink/90 text-cream-light rounded-full flex items-center justify-center shadow-xl shadow-ink/30 overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={SPRING.SNAPPY}
        title={playing ? "Matikan musik" : "Putar musik"}
      >
        {/* Pulse ring */}
        {playing && (
          <motion.div
            className="absolute inset-0 rounded-full bg-blossom/40"
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={playing ? "playing" : "paused"}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={SPRING.SNAPPY}
            className="relative z-10"
          >
            {playing ? <Music2 size={18} /> : <VolumeX size={18} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </>
  );
});

export default MusicPlayer;
