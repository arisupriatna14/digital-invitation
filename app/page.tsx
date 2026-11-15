"use client";

import { useState, useRef } from "react";
import EnvelopeOpening from "@/components/EnvelopeOpening";
import Hero from "@/components/Hero";
import OpeningSection from "@/components/OpeningSection";
import CoupleSection from "@/components/CoupleSection";
import LoveStoryCollageSection from "@/components/LoveStoryCollageSection";
import SaveTheDateSection from "@/components/SaveTheDateSection";
import EventSection from "@/components/EventSection";
import LiveStreamSection from "@/components/LiveStreamSection";
import RSVPSection from "@/components/RSVPSection";
import PhotoboothSection from "@/components/PhotoboothSection";
import FootageSection from "@/components/FootageSection";
import GiftSection, { GiftWishlistSection } from "@/components/GiftSection";
import WishesSection from "@/components/WishesSection";
import ClosingSection from "@/components/ClosingSection";
import MusicPlayer, { type MusicPlayerRef } from "@/components/ui/MusicPlayer";
import { WEDDING_DATA, BACKGROUND_IMAGES } from "@/lib/constants";
import BackgroundCarousel from "@/components/ornaments/BackgroundCarousel";
import { formatDate } from "@/lib/utils";

// Panel kiri (desktop) seperti layout side-to-side referensi
function SidePane() {
  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 right-[480px] bg-olive flex-col items-center justify-center text-center text-ivory-light">
      <BackgroundCarousel images={BACKGROUND_IMAGES} dim={0.4} />
      <div className="relative z-10">
        <p className="font-serif text-sm tracking-[0.3em] uppercase text-ivory/75">The Wedding of</p>
        <h1 className="font-script text-7xl mt-4">
          {WEDDING_DATA.groom.nickname} &amp; {WEDDING_DATA.bride.nickname}
        </h1>
        <p className="font-serif text-lg mt-6">{formatDate(WEDDING_DATA.akad.date)}</p>
        <p className="font-serif text-base mt-2 text-ivory/75">{WEDDING_DATA.hashtag}</p>
      </div>
    </aside>
  );
}

export default function Page() {
  // Undangan dirender di balik sampul saat sampul mulai memudar (crossfade),
  // lalu sampul dilepas setelah animasinya selesai.
  const [opened, setOpened] = useState(false);
  const [coverDone, setCoverDone] = useState(false);
  const musicRef = useRef<MusicPlayerRef>(null);

  // Sampul tetap di posisi pertama agar instansinya tidak dibuat ulang
  // (animasi pembukaannya sedang berjalan) saat undangan mulai dirender.
  // Pemutar musik dipasang sejak awal dan play() dipanggil langsung di klik
  // tombol/segel, karena browser HP hanya mengizinkan autoplay dari aksi klik.
  return (
    <>
      <MusicPlayer ref={musicRef} hidden={!opened} />
      {!coverDone && (
        <EnvelopeOpening
          onClick={() => musicRef.current?.startMusic()}
          onOpen={() => setOpened(true)}
          onDone={() => setCoverDone(true)}
        />
      )}
      {opened && <Invitation />}
    </>
  );
}

function Invitation() {
  return (
    <>
      <SidePane />
      <main className="invite-column lg:mr-0 lg:ml-auto">
        <Hero />
        <OpeningSection />
        <CoupleSection />
        {/* Kisah Cinta versi lama (LoveStorySection) disembunyikan; komponennya tetap ada */}
        <LoveStoryCollageSection />
        <SaveTheDateSection />
        <EventSection />
        <LiveStreamSection />
        {/* Potret Kami (GallerySection) disembunyikan; komponennya tetap ada */}
        <PhotoboothSection />
        <FootageSection />
        <GiftSection />
        <GiftWishlistSection />
        <RSVPSection />
        <WishesSection />
        <ClosingSection />
      </main>
    </>
  );
}
