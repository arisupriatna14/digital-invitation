import Image from "next/image";

interface BouquetClusterProps {
  /** Lebar total rangkaian (px) */
  width?: number;
  /** Aset bouquet yang dipakai */
  src?: string;
  className?: string;
}

const ASPECT = 430 / 480; // tinggi/lebar aset bouquet

// Dua bouquet dicerminkan: rose menyebar di atas, ekor daun
// bertemu meruncing di bawah-tengah -> bentuk segitiga terbalik (▽).
export default function BouquetCluster({
  width = 220,
  src = "/images/flowers/bouquet.png",
  className = "",
}: BouquetClusterProps) {
  const overlap = 0.34; // seberapa banyak kedua bouquet bertumpang di tengah
  const bw = Math.round(width / (2 - overlap));
  const bh = Math.round(bw * ASPECT);

  return (
    <div className={`relative ${className}`} style={{ width, height: bh }}>
      <Image
        src={src}
        alt=""
        aria-hidden
        width={bw}
        height={bh}
        style={{ width: bw, height: bh }}
        className="absolute left-0 top-0 select-none"
      />
      <Image
        src={src}
        alt=""
        aria-hidden
        width={bw}
        height={bh}
        style={{ width: bw, height: bh }}
        className="absolute right-0 top-0 select-none scale-x-[-1]"
      />
    </div>
  );
}
