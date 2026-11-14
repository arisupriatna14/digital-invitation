import { WEDDING_DATA } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import Polaroid from "@/components/ornaments/Polaroid";
import Flower from "@/components/ornaments/Flower";
import Reveal from "@/components/ornaments/Reveal";

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

interface PersonProps {
  label: string;
  name: string;
  parentLine: string;
  father: string;
  mother: string;
  instagram: string;
  align: "left" | "right";
}

function Person({ label, name, parentLine, father, mother, instagram, align }: PersonProps) {
  const right = align === "right";
  return (
    <Reveal from={right ? "right" : "left"} className={right ? "text-right" : "text-left"}>
      <p className="font-serif italic text-[17px] text-olive">{label}</p>
      <h3 className="font-script text-[44px] leading-tight text-olive mt-1">{name}</h3>
      <p className="font-serif italic text-[16px] text-olive/90 mt-3 leading-snug">
        {parentLine} {father}
        <br />&amp; {mother}
      </p>
      {instagram && (
        <a
          href={`https://instagram.com/${instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-4 font-serif text-[15px] text-olive border-b border-olive/60"
        >
          <InstagramIcon /> @{instagram}
        </a>
      )}
    </Reveal>
  );
}

export default function CoupleSection() {
  const { groom, bride, photos } = WEDDING_DATA;

  return (
    <section className="section bg-white">
      <SectionHeader
        title="Mempelai"
        subtitle="Setiap kisah cinta itu unik, dan kisah kami membawa kami pada hari yang tak terlupakan ini. Dengan penuh sukacita, kami mengundang Anda merayakan persatuan kami."
      />

      {/* Dua polaroid bertumpuk dengan rangkaian bunga */}
      <div className="relative h-[430px] -mx-6">
        <Flower name="carnation" width={90} className="absolute left-[44%] top-0 z-20" from="down" delay={0.5} rotate={10} />
        <Polaroid src={photos.couple[0]} alt={groom.name} rotate={-4} className="absolute left-3 top-14 w-[52%] z-10" delay={0.1} />
        <Polaroid src={photos.couple[1]} alt={bride.name} rotate={6} className="absolute right-3 top-2 w-[50%]" delay={0.3} />
        <Flower name="bouquet" width={170} className="absolute left-[28%] bottom-[-30px] z-20" from="up" delay={0.7} />
        <Flower name="leaf-pink-sprig" width={60} className="absolute right-0 top-[45%] z-20" from="right" delay={0.9} rotate={-20} />
      </div>

      <div className="relative mt-16 space-y-4">
        <Person
          label="Mempelai Pria"
          name={groom.name}
          parentLine="Putra dari"
          father={groom.father}
          mother={groom.mother}
          instagram={groom.instagram}
          align="left"
        />
        <Reveal from="zoom" className="text-center font-display text-[110px] leading-none text-olive/15 select-none" >
          &amp;
        </Reveal>
        <Person
          label="Mempelai Wanita"
          name={bride.name}
          parentLine="Putri dari"
          father={bride.father}
          mother={bride.mother}
          instagram={bride.instagram}
          align="right"
        />
      </div>
    </section>
  );
}
