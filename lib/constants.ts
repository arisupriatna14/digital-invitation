export const WEDDING_DATA = {
  groom: {
    name: "Ari Supriatna, S.Kom",
    nickname: "Ari",
    father: "Bapak Sutisna",
    mother: "Ibu Suryati",
    bio: "Putra pertama dari pasangan yang berbahagia",
    photo: "/images/groom.jpg",
    instagram: "",
  },
  bride: {
    name: "Atikah Sulastri, S.Keb., Bdn",
    nickname: "Atikah",
    father: "Bapak Lili, S.Pd (Atin SRZ)",
    mother: "Ibu Sri Rezeki Srz",
    bio: "Putri pertama dari pasangan yang berbahagia",
    photo: "/images/bride.jpg",
    instagram: "",
  },
  akad: {
    date: new Date("2027-01-11T09:00:00"),
    endTime: "11.00",
    venue: "Rumah Mempelai Wanita",
    // Dipisah per koma menjadi baris pada undangan
    address: "Kp. Sawah 01/09 Desa Panyaungan, Kec. Cihara Kab. Lebak, Banten",
    mapsUrl: "https://maps.google.com",
  },
  resepsi: {
    date: new Date("2027-01-11T11:00:00"),
    endTime: "Selesai",
    venue: "Rumah Mempelai Wanita",
    address: "Kp. Sawah 01/09 Desa Panyaungan, Kec. Cihara Kab. Lebak, Banten",
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
  hashtag: "#AriAtikahBersatu",
  quote: {
    title: "QS. Ar-Rum Ayat 21",
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    arabic:
      "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    text: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    source: "Q.S. Ar-Rum: 21",
  },
  // Kosongkan string foto untuk menampilkan placeholder
  photos: {
    cover: "/images/photos/photo-4.jpg",
    hero: "/images/photos/photo-8.jpg",
    couple: ["/images/photos/photo-1.jpg", "/images/photos/photo-2.jpg"],
    event: ["/images/photos/photo-6.jpg", "/images/photos/photo-7.jpg"],
  },
  loveStory: [
    {
      title: "Awal Bertemu",
      text: "[Ceritakan bagaimana kalian pertama kali bertemu. Sebuah sapaan sederhana yang perlahan tumbuh menjadi pertemanan yang hangat.]",
      photo: "/images/photos/photo-9.jpg",
    },
    {
      title: "Tumbuh Bersama",
      text: "[Ceritakan perjalanan kalian. Melewati berbagai musim dengan sabar, saling memahami, dan saling menguatkan.]",
      photo: "/images/photos/photo-5.jpg",
    },
    {
      title: "Selamanya Dimulai",
      text: "[Ceritakan momen lamaran. Dengan restu kedua keluarga, kami memutuskan untuk melangkah ke jenjang pernikahan.]",
      photo: "/images/photos/photo-3.jpg",
    },
  ],
  liveStream: {
    url: "",
    thumbnail: "",
  },
  rundown: [
    { time: "09.00", title: "Akad Nikah" },
    { time: "10.00", title: "Sesi Foto Keluarga" },
    { time: "11.00", title: "Penyambutan Tamu" },
    { time: "11.30", title: "Kirab Pengantin" },
    { time: "12.00", title: "Ramah Tamah & Jamuan" },
    { time: "13.00", title: "Sesi Foto Bersama" },
    { time: "14.00", title: "Penutup" },
  ],
  // ID video YouTube prewedding, kosongkan untuk menyembunyikan
  preweddingVideoId: "",
  instagramFilterUrl: "",
  giftAddress: {
    name: "Atikah Sulastri",
    phone: "08xxxxxxxxxx",
    address: "[Alamat pengiriman kado]",
  },
  // Rekomendasi kado; image kosong = tampilkan placeholder
  giftWishlist: [
    { name: "Elite Clad Frypan 24cm", note: "Stein, 5-ply stainless steel", image: "/images/gifts/frypan.jpg", url: "https://s.shopee.co.id/6fiqDqNaN1" },
    { name: "Elite Clad Complete", note: "Stein, set lengkap 5-ply stainless steel", image: "/images/gifts/elite-clad.jpg", url: "https://s.shopee.co.id/3B8y3WUN0X" },
    { name: "Cooling Blanket 2.0 Plus", note: "Glacier Grey", image: "/images/gifts/cooling-blanket.jpg", url: "https://s.shopee.co.id/2BGQropV4n" },
    { name: "Polar Cooling Fitted Sheet", note: "Glacier Grey", image: "/images/gifts/fitted-sheet.jpg", url: "https://s.shopee.co.id/4qHC2mD3js" },
    { name: "Tineco Vacuum Cleaner", note: "Floor One Switch i5 Power Kit II", image: "/images/gifts/tineco.jpg", url: "https://s.shopee.co.id/8fTucArIX2" },
  ],
  music: {
    src: "/audio/background.m4a",
    title: "TheOvertunes — I Still Love You",
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

// Foto latar (carousel) untuk section pembuka & save the date
export const BACKGROUND_IMAGES = ["/images/bg/bg-1.jpg"];

export const GALLERY_IMAGES = [
  { src: "/images/photos/photo-1.jpg", alt: "Foto Prewedding 1" },
  { src: "/images/photos/photo-2.jpg", alt: "Foto Prewedding 2" },
  { src: "/images/photos/photo-3.jpg", alt: "Foto Prewedding 3" },
  { src: "/images/photos/photo-4.jpg", alt: "Foto Prewedding 4" },
  { src: "/images/photos/photo-5.jpg", alt: "Foto Prewedding 5" },
  { src: "/images/photos/photo-6.jpg", alt: "Foto Prewedding 6" },
  { src: "/images/photos/photo-7.jpg", alt: "Foto Prewedding 7" },
  { src: "/images/photos/photo-8.jpg", alt: "Foto Prewedding 8" },
  { src: "/images/photos/photo-9.jpg", alt: "Foto Prewedding 9" },
];
