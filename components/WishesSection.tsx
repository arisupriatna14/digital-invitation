"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Quote } from "lucide-react";
import { EASE, BACKGROUND_IMAGES } from "@/lib/constants";
import BackgroundCarousel from "@/components/ornaments/BackgroundCarousel";
import { generateId, getRelativeTime } from "@/lib/utils";
import SectionHeader from "@/components/ui/SectionHeader";

interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

function WishCard({ wish }: { wish: Wish }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0, y: -20 }}
      animate={{ opacity: 1, height: "auto", y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: EASE.OUT_QUART }}
      className="bg-ivory-light border border-olive/10 rounded-2xl shadow-sm p-6 relative overflow-hidden"
    >
      <Quote size={28} className="text-olive-soft/50 mb-2 rotate-180" />
      <p className="font-serif text-sm md:text-base italic text-olive/75 leading-relaxed mb-3">
        {wish.message}
      </p>
      <div className="flex items-center justify-between pt-2 border-t border-olive/10">
        <p className="font-sans text-xs font-semibold text-olive/70">{wish.name}</p>
        <p className="font-sans text-[10px] text-olive/30">
          {getRelativeTime(new Date(wish.createdAt))}
        </p>
      </div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-ivory-light border border-olive/10 rounded-2xl shadow-sm p-6 space-y-3">
      <div className="skeleton h-3 w-3/4 rounded-full" />
      <div className="skeleton h-3 w-full rounded-full" />
      <div className="skeleton h-3 w-5/6 rounded-full" />
      <div className="skeleton h-3 w-1/3 rounded-full mt-4" />
    </div>
  );
}

export default function WishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/api/wishes")
      .then((r) => r.json())
      .then((data) => { setWishes(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitting(true);

    // Optimistic update
    const optimisticWish: Wish = {
      id: generateId(),
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };
    setWishes((prev) => [optimisticWish, ...prev]);
    setName("");
    setMessage("");

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: optimisticWish.name, message: optimisticWish.message }),
      });
      if (res.ok) {
        const newWish = await res.json();
        setWishes((prev) =>
          prev.map((w) => (w.id === optimisticWish.id ? newWish : w))
        );
      }
    } catch {
      // Keep optimistic wish even on error
    } finally {
      setSubmitting(false);
    }
  };

  const displayedWishes = showAll ? wishes : wishes.slice(0, 5);

  return (
    <section className="section bg-olive">
      <BackgroundCarousel images={BACKGROUND_IMAGES} dim={0.5} />
      <div className="relative z-10">
        <SectionHeader
          title="Kirim Doa Restu"
          tone="dark"
          subtitle="Tulis ucapan dan doa terbaik Anda untuk kami"
        />

        <div className="space-y-6">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE.OUT_QUART }}
          >
            <form onSubmit={handleSubmit} className="bg-ivory-light border border-olive/10 rounded-2xl shadow-sm p-6 space-y-4">
              <div>
                <label className="font-sans text-[10px] uppercase tracking-[0.25em] text-olive/60 block mb-2">
                  Nama
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Anda"
                  required
                  className="input-olive"
                />
              </div>
              <div>
                <label className="font-sans text-[10px] uppercase tracking-[0.25em] text-olive/60 block mb-2">
                  Ucapan & Doa{" "}
                  <span className="normal-case text-olive/30">({message.length}/500)</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                  placeholder="Tuliskan ucapan dan doa terbaik Anda..."
                  rows={4}
                  required
                  className="input-olive resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting || !name.trim() || !message.trim()}
                className="btn-olive w-full"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block w-3 h-3 border border-ivory-light/40 border-t-ivory-light rounded-full"
                    />
                    Mengirim...
                  </span>
                ) : (
                  <>
                    <Send size={13} />
                    Kirim Ucapan
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Wishes feed */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE.OUT_QUART, delay: 0.1 }}
            className="space-y-4 max-h-[520px] overflow-y-auto scrollbar-thin"
          >
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              <>
                <AnimatePresence initial={false}>
                  {displayedWishes.map((wish) => (
                    <WishCard key={wish.id} wish={wish} />
                  ))}
                </AnimatePresence>
                {!showAll && wishes.length > 5 && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setShowAll(true)}
                    className="w-full text-center font-serif text-base text-ivory-light underline underline-offset-4 py-2"
                  >
                    Tampilkan lebih banyak ({wishes.length})
                  </motion.button>
                )}
                {wishes.length === 0 && !loading && (
                  <div className="bg-ivory-light border border-olive/10 rounded-2xl shadow-sm p-6 text-center py-8">
                    <p className="font-serif text-sm italic text-olive/40">
                      Jadilah yang pertama mengirim ucapan
                    </p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
