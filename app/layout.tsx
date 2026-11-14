import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Poppins, Pinyon_Script, Cinzel, Fredoka, Special_Elite } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  variable: "--font-pinyon",
  display: "swap",
  weight: "400",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "500", "700"],
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
  weight: ["500", "600"],
});

const specialElite = Special_Elite({
  subsets: ["latin"],
  variable: "--font-typewriter",
  display: "swap",
  weight: "400",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Undangan Pernikahan Ari & Atikah",
  description:
    "Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam pernikahan kami. Sabtu, 15 Maret 2025.",
  openGraph: {
    title: "Undangan Pernikahan Ari Supriatna & Atikah Sulastri",
    description:
      "Dengan memohon ridha Allah SWT, kami mengundang Anda untuk hadir dalam hari bahagia kami.",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${cormorant.variable} ${poppins.variable} ${pinyon.variable} ${cinzel.variable} ${fredoka.variable} ${specialElite.variable}`}>
      <body className="font-serif antialiased bg-olive text-olive overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
