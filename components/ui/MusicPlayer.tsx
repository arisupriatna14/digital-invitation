"use client";

import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VolumeX } from "lucide-react";
import { SPRING, WEDDING_DATA } from "@/lib/constants";

export interface MusicPlayerRef {
  /** Panggil langsung di dalam handler klik agar lolos kebijakan autoplay browser */
  startMusic: () => void;
}

interface MusicPlayerProps {
  /** Sembunyikan tombol (mis. saat sampul masih tampil) */
  hidden?: boolean;
}

const MusicPlayer = forwardRef<MusicPlayerRef, MusicPlayerProps>(function MusicPlayer({ hidden = false }, ref) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    startMusic: () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          // Autoplay ditolak: coba lagi pada sentuhan/klik berikutnya
          const retry = () => {
            audio.play().then(() => setPlaying(true)).catch(() => {});
          };
          document.addEventListener("pointerdown", retry, { once: true });
        });
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
      <audio ref={audioRef} src={WEDDING_DATA.music.src} loop preload="auto" />
      <motion.button
        onClick={toggle}
        className={`fixed bottom-5 right-5 z-[60] w-12 h-12 rounded-full shadow-xl shadow-black/40 ${hidden ? "hidden" : ""}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={SPRING.SNAPPY}
        title={playing ? "Matikan musik" : "Putar musik"}
        aria-label={playing ? "Matikan musik" : "Putar musik"}
      >
        {/* Piringan hitam berputar saat musik diputar */}
        <span
          className={`absolute inset-0 rounded-full animate-spin-slow ${playing ? "" : "[animation-play-state:paused]"}`}
          style={{
            background:
              "repeating-radial-gradient(circle, #1a1a1a 0 2px, #2b2b2b 2px 3px), #111",
          }}
        >
          <span className="absolute inset-[34%] rounded-full bg-gradient-to-br from-[#C9A04F] to-[#8A6424]" />
          <span className="absolute inset-[46%] rounded-full bg-black" />
        </span>
        <AnimatePresence>
          {!playing && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={SPRING.SNAPPY}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-ivory-light text-olive flex items-center justify-center"
            >
              <VolumeX size={11} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
});

export default MusicPlayer;
