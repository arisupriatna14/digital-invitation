"use client";

import { motion } from "framer-motion";
import { WEDDING_DATA } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import EventCard from "@/components/ui/EventCard";

export default function EventSection() {
  return (
    <section className="bg-gradient-to-b from-petal to-petal-light/70 py-20 md:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blossom/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blossom/20 to-transparent" />
      </div>

      <div className="section-container">
        <SectionHeader
          eyebrow="Detail Acara"
          title="Rangkaian Acara"
          subtitle="Kami dengan sukacita mengundang kehadiran Anda"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <EventCard
            event={{
              type: "Akad Nikah",
              date: WEDDING_DATA.akad.date,
              endTime: WEDDING_DATA.akad.endTime,
              venue: WEDDING_DATA.akad.venue,
              address: WEDDING_DATA.akad.address,
              mapsUrl: WEDDING_DATA.akad.mapsUrl,
            }}
            delay={0.1}
          />
          <EventCard
            event={{
              type: "Resepsi Pernikahan",
              date: WEDDING_DATA.resepsi.date,
              endTime: WEDDING_DATA.resepsi.endTime,
              venue: WEDDING_DATA.resepsi.venue,
              address: WEDDING_DATA.resepsi.address,
              mapsUrl: WEDDING_DATA.resepsi.mapsUrl,
            }}
            delay={0.25}
          />
        </div>

        {/* Save the date note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center font-serif text-sm italic text-ink/45 mt-8"
        >
          Kehadiran Bapak / Ibu / Saudara / Saudari merupakan kehormatan bagi kami
        </motion.p>
      </div>
    </section>
  );
}
