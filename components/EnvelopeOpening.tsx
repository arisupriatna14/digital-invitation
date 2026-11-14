"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimate } from "framer-motion";
import { Mail } from "lucide-react";
import { EASE, WEDDING_DATA } from "@/lib/constants";
import Photo from "@/components/ornaments/Photo";

interface EnvelopeOpeningProps {
  /** Dipanggil sinkron saat tombol/segel diklik (untuk memulai musik) */
  onClick: () => void;
  /** Dipanggil saat undangan boleh mulai dirender di balik sampul */
  onOpen: () => void;
  /** Dipanggil setelah sampul selesai memudar dan boleh dilepas */
  onDone: () => void;
}

const GREEN = "#1F3A24";
const OUT = [0.19, 1, 0.22, 1] as const;

// Area di atas garis V kantong amplop (persen kanvas), melingkar di atas segel
const CLIP_POCKET =
  // Garis V diukur dari piksel gambar amplop: sudut kiri (200,518), puncak (586,755), sudut kanan (935,477)
  "polygon(6.3% -1.4%, 87.3% -1.4%, 87.3% 51.84%, 68.68% 51.84%, 45.41% 62.59%, 19.66% 53.43%, 6.3% 53.43%)";

// Semua posisi dalam persen terhadap kanvas 690 x 1190 (ukuran desain),
// ukuran teks memakai cqw agar ikut menskala dengan kanvas.
export default function EnvelopeOpening({ onClick, onOpen, onDone }: EnvelopeOpeningProps) {
  const [scope, animate] = useAnimate();
  const [guestName, setGuestName] = useState<string>("");
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const name = params.get("to");
      if (name) setGuestName(decodeURIComponent(name));
    }
  }, []);

  const handleOpen = async () => {
    if (isOpening) return;
    setIsOpening(true);
    // Musik harus dimulai di sini, masih di dalam call stack klik (sebelum await)
    onClick();

    // 1. Segel terlepas; judul, nama tamu & tombol memudar
    animate("#title", { y: -24, opacity: 0 }, { duration: 0.6, ease: EASE.IN_OUT_SINE });
    animate("#guest", { y: 24, opacity: 0 }, { duration: 0.5, ease: EASE.IN_OUT_SINE });
    await animate("#seal", { scale: 1.5, opacity: 0 }, { duration: 0.4, ease: EASE.OUT_QUART });

    // 2. Foto ditarik keluar dari amplop sambil menegak, bunga menyingkir ke samping
    animate("#anthurium", { x: "-45%", y: "10%", rotate: -14, opacity: 0 }, { duration: 1, ease: EASE.OUT_CIRC });
    animate("#bouquet", { x: "45%", y: "8%", rotate: 14, opacity: 0 }, { duration: 1, ease: EASE.OUT_CIRC });
    animate("#envelope", { y: "22%", opacity: 0 }, { duration: 0.9, ease: EASE.IN_OUT_SINE, delay: 0.25 });
    await animate("#cover-photo", { y: "-55%", rotate: 0 }, { duration: 0.9, ease: EASE.OUT_EXPO });

    // 3. Undangan mulai dirender di balik sampul; foto melaju ke arah layar
    onOpen();
    animate("#cover-photo", { scale: 1.35, opacity: 0 }, { duration: 0.7, ease: EASE.IN_OUT_SINE });
    await animate("#canvas", { scale: 1.06 }, { duration: 0.7, ease: EASE.IN_OUT_SINE });

    // 4. Sampul memudar memperlihatkan undangan (crossfade)
    await animate(scope.current, { opacity: 0 }, { duration: 0.8, ease: EASE.IN_OUT_SINE });
    onDone();
  };

  return (
    <div ref={scope} className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#F1F1EE]">
      {/* Latar satin, zoom-out perlahan seperti referensi */}
      <motion.div
        className="absolute inset-0 bg-satin"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 7, ease: OUT }}
      />

      {/* Kanvas berskala: lebar = min(lebar layar, tinggi layar * 690/1190).
          Dipusatkan lewat flex (bukan transform) agar animasi scale saat
          dibuka tidak menggeser posisinya. */}
      <div
        id="canvas"
        className="relative [container-type:inline-size]"
        style={{
          width: "min(100vw, calc(100svh * 690 / 1190))",
          aspectRatio: "690 / 1190",
        }}
      >
        {/* Judul */}
        <div id="title" className="absolute inset-0 pointer-events-none" style={{ color: GREEN }}>
          <motion.div
            initial={{ opacity: 0, scale: 1.25 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.4, ease: OUT, delay: 0.3 }}
            className="absolute inset-x-0 top-[9%] text-center"
          >
            <p className="font-caps text-[3.5cqw] tracking-[0.14em]">The wedding of</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 1.25 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.4, ease: OUT, delay: 0.5 }}
            className="absolute inset-0"
          >
            <span className="absolute left-[29%] top-[12.5%] font-script text-[17cqw] leading-none">
              {WEDDING_DATA.groom.nickname} &amp;
            </span>
            <span className="absolute left-[32%] top-[18.5%] font-script text-[17cqw] leading-none">
              {WEDDING_DATA.bride.nickname}
            </span>
          </motion.div>
        </div>

        {/* Amplop (aset gambar) */}
        <motion.div
          id="envelope"
          initial={{ opacity: 0, y: "12%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: OUT, delay: 0.8 }}
          className="absolute left-[6.33%] top-[33.4%] w-[81%]"
        >
          <Image src="/images/cover/envelope.png" alt="" aria-hidden width={1215} height={1220} className="h-auto w-full" priority />
        </motion.div>

        {/* Foto polaroid: dipotong mengikuti garis V kantong agar tampak masuk ke amplop */}
        <div className="pointer-events-none absolute inset-0" style={{ clipPath: CLIP_POCKET }}>
          <motion.div
            id="cover-photo"
            initial={{ opacity: 0, y: "25%", rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: -5 }}
            transition={{ duration: 2, ease: OUT, delay: 1.1 }}
            className="absolute left-[19.6%] top-[28.5%] w-[52%] bg-[#F7F6F1] p-[2%] pb-[7%] shadow-[0_4px_14px_rgba(0,0,0,0.18)]"
          >
            {/* Foto dibuat lebih panjang ke bawah sehingga tepi bawah kartunya
                tersembunyi di dalam kantong amplop (tidak terlihat terpotong) */}
            <Photo src={WEDDING_DATA.photos.cover} alt="Foto mempelai" position="center 40%" className="aspect-[345/400] w-full" />
          </motion.div>
        </div>

        {/* Anthurium merah muda, kiri (masuk dari kiri-bawah). Dipotong dengan
            garis V kantong yang sama seperti foto agar batangnya tampak masuk ke amplop */}
        <div className="pointer-events-none absolute inset-0" style={{ clipPath: CLIP_POCKET }}>
        <motion.div
          id="anthurium"
          initial={{ opacity: 0, x: "-30%", y: "15%" }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 2.4, ease: OUT, delay: 1.6 }}
          className="pointer-events-none absolute left-[6.5%] top-[37.8%] w-[21%]"
        >
          <motion.div
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="origin-bottom"
          >
            <Image src="/images/cover/anthurium-pink.png" alt="" aria-hidden width={275} height={432} className="h-auto w-full" priority />
          </motion.div>
        </motion.div>
        </div>

        {/* Buket putih, kanan (masuk dari kanan-bawah) */}
        <motion.div
          id="bouquet"
          initial={{ opacity: 0, x: "25%", y: "10%", rotate: 12 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: 12 }}
          transition={{ duration: 2.6, ease: OUT, delay: 1.9 }}
          style={{ transformOrigin: "50% 15%" }}
          className="pointer-events-none absolute left-[46%] top-[36%] w-[58%]"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4.5 }}
          >
            <Image src="/images/cover/bouquet-calla.png" alt="" aria-hidden width={560} height={700} className="h-auto w-full" priority />
          </motion.div>
        </motion.div>

        {/* Segel di puncak V kantong (menutup ujung potongan foto), sekaligus
            tombol buka. Pembungkus #seal dianimasikan saat dibuka, terpisah dari
            animasi masuk tombolnya agar tidak saling menimpa. */}
        <div id="seal" className="absolute left-[37.7%] top-[55.6%] w-[16.1%]">
          <motion.button
            onClick={handleOpen}
            disabled={isOpening}
            aria-label="Buka undangan"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1.04 }}
            transition={{ type: "spring", stiffness: 180, damping: 14, delay: 2.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.96 }}
            className="block w-full"
          >
            <Image src="/images/cover/wax-seal-pink.png" alt="" aria-hidden width={241} height={231} className="h-auto w-full" priority />
          </motion.button>
        </div>

        {/* Nama tamu & tombol */}
        <motion.div
          id="guest"
          initial={{ opacity: 0, y: "30%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: OUT, delay: 2.7 }}
          className="absolute inset-x-0 top-[80%] text-center font-sans"
          style={{ color: GREEN }}
        >
          <p className="text-[4cqw] leading-[1.4]">Dear,</p>
          <p className="text-[4cqw] leading-[1.4]">{guestName || "Tamu Undangan"}</p>
          <button
            onClick={handleOpen}
            disabled={isOpening}
            className="mt-[3.5cqw] inline-flex h-[8.7cqw] w-[44%] items-center justify-center gap-[1.5cqw] rounded-full bg-[#9C9B60] text-[3.7cqw] text-white shadow-[0_3px_8px_rgba(0,0,0,0.18)] transition-all duration-300 hover:bg-[#8B8A52] active:scale-95 disabled:opacity-70"
          >
            <Mail className="h-[3.6cqw] w-[3.6cqw]" />
            {isOpening ? "Membuka..." : "Buka Undangan"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
