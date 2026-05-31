"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";
import { formatDate, formatTime } from "@/lib/utils";
import { EASE } from "@/lib/constants";

interface EventData {
  type: string;
  date: Date;
  endTime: string;
  venue: string;
  address: string;
  mapsUrl: string;
}

export default function EventCard({ event, delay = 0 }: { event: EventData; delay?: number }) {
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Pernikahan Ari & Atikah — ${event.type}`
  )}&dates=${event.date.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${event.date.toISOString().replace(/[-:]/g, "").split(".")[0]}Z&location=${encodeURIComponent(event.address)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE.OUT_QUART, delay }}
      whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(75,59,71,0.1)" }}
      className="card-elegant relative overflow-hidden group"
    >
      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blossom/60 via-sage/60 to-blossom/60 origin-left rounded-t-2xl"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE.OUT_EXPO, delay: delay + 0.3 }}
      />

      {/* Tiny floral decoration top-right */}
      <div className="absolute top-4 right-4 opacity-25">
        <svg width="32" height="32" viewBox="0 0 32 32">
          {[0, 72, 144, 216, 288].map((a, i) => (
            <ellipse
              key={i}
              cx={16 + Math.cos((a * Math.PI) / 180) * 7}
              cy={16 + Math.sin((a * Math.PI) / 180) * 7}
              rx="4" ry="2"
              transform={`rotate(${a} ${16 + Math.cos((a * Math.PI) / 180) * 7} ${16 + Math.sin((a * Math.PI) / 180) * 7})`}
              fill="#C9798A"
            />
          ))}
          <circle cx="16" cy="16" r="3" fill="#F0B8C4" />
        </svg>
      </div>

      {/* Badge */}
      <span className="inline-block bg-petal text-blossom text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-full mb-4 font-sans font-medium border border-blossom/20">
        {event.type}
      </span>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Calendar size={15} className="text-sage mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-sans text-[10px] text-ink/40 uppercase tracking-wide mb-0.5">Tanggal</p>
            <p className="font-serif text-base text-ink/85">{formatDate(event.date)}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock size={15} className="text-sage mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-sans text-[10px] text-ink/40 uppercase tracking-wide mb-0.5">Waktu</p>
            <p className="font-serif text-base text-ink/85">{formatTime(event.date)} – {event.endTime} WIB</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin size={15} className="text-sage mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-sans text-[10px] text-ink/40 uppercase tracking-wide mb-0.5">Lokasi</p>
            <p className="font-serif text-base font-medium text-ink/90">{event.venue}</p>
            <p className="font-sans text-xs text-ink/50 mt-0.5">{event.address}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-5 pt-4 border-t border-blossom/10">
        <a href={event.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline text-[10px] py-2 px-4">
          <MapPin size={11} /> Lihat Peta
        </a>
        <a href={calendarUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost text-[10px] py-2 px-3">
          <ExternalLink size={11} /> Simpan
        </a>
      </div>
    </motion.div>
  );
}
