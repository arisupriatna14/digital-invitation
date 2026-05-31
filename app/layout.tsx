import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Poppins } from "next/font/google";
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
    <html lang="id" className={`${playfair.variable} ${cormorant.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased bg-petal text-ink overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
