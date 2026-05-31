"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import EnvelopeOpening from "@/components/EnvelopeOpening";
import Hero from "@/components/Hero";
import OpeningSection from "@/components/OpeningSection";
import CoupleSection from "@/components/CoupleSection";
import EventSection from "@/components/EventSection";
import GallerySection from "@/components/GallerySection";
import RSVPSection from "@/components/RSVPSection";
import GiftSection from "@/components/GiftSection";
import WishesSection from "@/components/WishesSection";
import ClosingSection from "@/components/ClosingSection";
import MusicPlayer, { type MusicPlayerRef } from "@/components/ui/MusicPlayer";

const FloatingPetals = dynamic(() => import("@/components/ui/FloatingPetals"), {
  ssr: false,
});

export default function Page() {
  const [opened, setOpened] = useState(false);
  const musicRef = useRef<MusicPlayerRef>(null);

  const handleOpen = () => {
    setOpened(true);
    // Start music after user gesture (satisfies browser autoplay policy)
    setTimeout(() => {
      musicRef.current?.startMusic();
    }, 800);
  };

  if (!opened) {
    return <EnvelopeOpening onOpen={handleOpen} />;
  }

  return (
    <>
      <FloatingPetals />
      <MusicPlayer ref={musicRef} />
      <main className="relative z-10">
        <Hero />
        <OpeningSection />
        <CoupleSection />
        <EventSection />
        <GallerySection />
        <RSVPSection />
        <GiftSection />
        <WishesSection />
        <ClosingSection />
      </main>
    </>
  );
}
