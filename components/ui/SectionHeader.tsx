import Reveal from "@/components/ornaments/Reveal";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  /** "dark" untuk section berlatar gelap */
  tone?: "light" | "dark";
  className?: string;
}

export default function SectionHeader({ title, subtitle, tone = "light", className = "" }: SectionHeaderProps) {
  const titleColor = tone === "dark" ? "text-ivory-light" : "text-olive";
  const subColor = tone === "dark" ? "text-ivory/85" : "text-olive/65";

  return (
    <div className={`relative z-10 text-center mb-10 ${className}`}>
      <Reveal as="h2" from="zoom" className={`script-title ${titleColor}`}>
        {title}
      </Reveal>
      {subtitle && (
        <Reveal as="p" delay={0.15} className={`mt-4 font-serif text-[17px] leading-snug ${subColor}`}>
          {subtitle}
        </Reveal>
      )}
    </div>
  );
}
