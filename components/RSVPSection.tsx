"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { EASE, SPRING } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";

type Status = "idle" | "loading" | "success" | "error";

export default function RSVPSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guests, setGuests] = useState(1);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || attending === null) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, attending, guests: attending ? guests : 0 }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-gradient-to-b from-petal to-petal-light/50 py-20 md:py-28">
      <div className="section-container max-w-xl">
        <SectionHeader
          eyebrow="Konfirmasi Kehadiran"
          title="RSVP"
          subtitle="Mohon konfirmasi kehadiran Anda selambatnya 3 hari sebelum acara"
        />

        <AnimatePresence mode="wait">
          {status !== "success" ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.25 } }}
              transition={{ duration: 0.5, ease: EASE.OUT_QUART }}
              className="card-elegant space-y-5"
            >
              {/* Name */}
              <div>
                <label className="font-sans text-[10px] uppercase tracking-[0.25em] text-ink/60 block mb-2">
                  Nama Lengkap <span className="text-blossom">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Anda"
                  required
                  className="input-elegant"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="font-sans text-[10px] uppercase tracking-[0.25em] text-ink/60 block mb-2">
                  Nomor HP / WhatsApp
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08xxxxxxxxxx (opsional)"
                  className="input-elegant"
                />
              </div>

              {/* Attending radio */}
              <div>
                <label className="font-sans text-[10px] uppercase tracking-[0.25em] text-ink/60 block mb-3">
                  Konfirmasi Kehadiran <span className="text-blossom">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: true, label: "Insya Allah Hadir" },
                    { value: false, label: "Mohon Maaf, Tidak Hadir" },
                  ].map((option) => (
                    <button
                      key={String(option.value)}
                      type="button"
                      onClick={() => setAttending(option.value)}
                      className={`py-3 px-4 rounded-xl border-2 font-sans text-xs text-center transition-all duration-200 ${
                        attending === option.value
                          ? "border-ink bg-ink text-cream-light"
                          : "border-blossom/30 bg-cream-light text-ink/70 hover:border-blossom/60"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest count */}
              <AnimatePresence>
                {attending === true && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: EASE.OUT_QUART }}
                  >
                    <label className="font-sans text-[10px] uppercase tracking-[0.25em] text-ink/60 block mb-2">
                      Jumlah Tamu
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                        className="w-9 h-9 rounded-full border-2 border-blossom/40 flex items-center justify-center text-ink hover:border-ink hover:bg-ink hover:text-cream-light transition-all duration-200 text-sm font-bold"
                      >
                        −
                      </button>
                      <span className="font-display text-xl text-ink min-w-[2ch] text-center">
                        {guests}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuests((g) => Math.min(5, g + 1))}
                        className="w-9 h-9 rounded-full border-2 border-blossom/40 flex items-center justify-center text-ink hover:border-ink hover:bg-ink hover:text-cream-light transition-all duration-200 text-sm font-bold"
                      >
                        +
                      </button>
                      <span className="font-sans text-xs text-ink/50">orang (maks. 5)</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error message */}
              <AnimatePresence>
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-red-600 bg-red-50 rounded-xl px-4 py-3"
                  >
                    <AlertCircle size={16} />
                    <span className="font-sans text-xs">
                      Terjadi kesalahan. Silakan coba lagi.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === "loading" || !name.trim() || attending === null}
                className="btn-primary w-full justify-center"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block w-3 h-3 border border-cream-light/40 border-t-cream-light rounded-full"
                    />
                    Mengirim...
                  </span>
                ) : (
                  "Kirim Konfirmasi"
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ ...SPRING.BOUNCY, delay: 0.1 }}
              className="card-elegant text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ...SPRING.BOUNCY, delay: 0.3 }}
                className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle2 size={32} className="text-sage-dark-dark" />
              </motion.div>
              <h3 className="font-display text-xl italic text-ink mb-2">
                Terima Kasih, {name}!
              </h3>
              <p className="font-serif text-sm italic text-ink/60">
                {attending
                  ? "Kami sangat menantikan kehadiran Anda. Sampai jumpa di hari istimewa kami!"
                  : "Kami sangat menghargai kabar dari Anda. Doa Anda berarti bagi kami."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
