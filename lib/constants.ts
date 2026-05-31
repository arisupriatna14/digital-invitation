export const WEDDING_DATA = {
  groom: {
    name: "Ari Supriatna",
    nickname: "Ari",
    father: "Bapak [Nama Ayah Ari]",
    mother: "Ibu [Nama Ibu Ari]",
    bio: "Putra pertama dari pasangan yang berbahagia",
    photo: "/images/groom.jpg",
    instagram: "",
  },
  bride: {
    name: "Atikah Sulastri",
    nickname: "Atikah",
    father: "Bapak [Nama Ayah Atikah]",
    mother: "Ibu [Nama Ibu Atikah]",
    bio: "Putri pertama dari pasangan yang berbahagia",
    photo: "/images/bride.jpg",
    instagram: "",
  },
  akad: {
    date: new Date("2025-03-15T09:00:00"),
    endTime: "11.00",
    venue: "Masjid Al-Ikhlas",
    address: "Jl. Contoh No. 1, Jakarta Selatan",
    mapsUrl: "https://maps.google.com",
  },
  resepsi: {
    date: new Date("2025-03-15T11:00:00"),
    endTime: "14.00",
    venue: "Gedung Serbaguna Indah",
    address: "Jl. Contoh No. 2, Jakarta Selatan",
    mapsUrl: "https://maps.google.com",
  },
  bankAccounts: [
    {
      bank: "BCA",
      accountNumber: "1234567890",
      accountName: "Ari Supriatna",
    },
    {
      bank: "BRI",
      accountNumber: "0987654321",
      accountName: "Atikah Sulastri",
    },
  ],
  music: {
    src: "/audio/background.mp3",
    title: "Sholawat — Latar",
  },
};

export const EASE = {
  OUT_QUART: [0.25, 0.46, 0.45, 0.94] as const,
  OUT_EXPO: [0.19, 1.0, 0.22, 1.0] as const,
  OUT_CIRC: [0.0, 0.55, 0.45, 1.0] as const,
  IN_OUT_SINE: [0.37, 0, 0.63, 1] as const,
};

export const SPRING = {
  SNAPPY: { type: "spring" as const, stiffness: 400, damping: 25 },
  GENTLE: { type: "spring" as const, stiffness: 100, damping: 20, mass: 1 },
  BOUNCY: { type: "spring" as const, stiffness: 300, damping: 15 },
  FLUID: { type: "spring" as const, stiffness: 60, damping: 20, mass: 1.2 },
};

export const GALLERY_IMAGES = [
  { src: "https://placehold.co/400x560/f2e5c5/5b181d?text=Foto+1", alt: "Foto Prewedding 1" },
  { src: "https://placehold.co/400x320/e8c0c8/5b181d?text=Foto+2", alt: "Foto Prewedding 2" },
  { src: "https://placehold.co/400x480/bdd0c4/5b181d?text=Foto+3", alt: "Foto Prewedding 3" },
  { src: "https://placehold.co/400x600/faf3e0/5b181d?text=Foto+4", alt: "Foto Prewedding 4" },
  { src: "https://placehold.co/400x340/e8c0c8/5b181d?text=Foto+5", alt: "Foto Prewedding 5" },
  { src: "https://placehold.co/400x520/f2e5c5/5b181d?text=Foto+6", alt: "Foto Prewedding 6" },
  { src: "https://placehold.co/400x400/bdd0c4/5b181d?text=Foto+7", alt: "Foto Prewedding 7" },
  { src: "https://placehold.co/400x560/faf3e0/5b181d?text=Foto+8", alt: "Foto Prewedding 8" },
  { src: "https://placehold.co/400x380/e8c0c8/5b181d?text=Foto+9", alt: "Foto Prewedding 9" },
  { src: "https://placehold.co/400x500/f2e5c5/5b181d?text=Foto+10", alt: "Foto Prewedding 10" },
];
