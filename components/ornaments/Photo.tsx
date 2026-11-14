import { WEDDING_DATA } from "@/lib/constants";

interface PhotoProps {
  src?: string;
  alt?: string;
  className?: string;
  /** object-position, mis. "center 35%" agar wajah tetap terlihat saat dipotong */
  position?: string;
}

// Foto dengan placeholder elegan saat belum ada file foto.
export default function Photo({ src, alt = "", className = "", position = "center" }: PhotoProps) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={`object-cover ${className}`} style={{ objectPosition: position }} loading="lazy" />;
  }

  return (
    <div
      className={`flex flex-col items-center justify-center bg-gradient-to-br from-ivory-light via-ivory to-ivory-dark text-olive/50 ${className}`}
      role="img"
      aria-label={alt || "Foto"}
    >
      <span className="font-script text-4xl leading-none">
        {WEDDING_DATA.groom.nickname.charAt(0)}&amp;{WEDDING_DATA.bride.nickname.charAt(0)}
      </span>
      <span className="mt-2 font-sans text-[9px] uppercase tracking-[0.3em] text-olive/35">Foto</span>
    </div>
  );
}
