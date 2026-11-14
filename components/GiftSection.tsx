"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate as animateValue, type PanInfo } from "framer-motion";
import { Copy, Check, Gift, ChevronDown, ShoppingBag, Heart, ImagePlus, Send, AlertCircle, CheckCircle2, X, Receipt, RotateCcw, Hand, ChevronsLeft, ChevronsRight } from "lucide-react";
import { WEDDING_DATA, EASE, SPRING } from "@/lib/constants";
import { copyToClipboard } from "@/lib/utils";
import SectionHeader from "@/components/ui/SectionHeader";
import Photo from "@/components/ornaments/Photo";

// Pilih bank lewat dropdown; nomor rekening bank terpilih bisa disalin
function BankSelector() {
  const accounts = WEDDING_DATA.bankAccounts;
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const account = accounts[selected];

  const handleCopy = async () => {
    if (!(await copyToClipboard(account.accountNumber))) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px 0px" }}
      transition={{ duration: 0.7, ease: EASE.OUT_QUART }}
      className="rounded-2xl border border-olive/10 bg-ivory-light p-6"
    >
      <label className="font-sans text-[10px] uppercase tracking-[0.25em] text-olive/60 block mb-2">Pilih Bank</label>
      <div className="relative">
        <select
          value={selected}
          onChange={(e) => setSelected(Number(e.target.value))}
          className="input-olive appearance-none pr-10 font-display text-lg italic"
        >
          {accounts.map((acc, i) => (
            <option key={acc.bank} value={i}>
              {acc.bank} — a.n. {acc.accountName}
            </option>
          ))}
        </select>
        <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-olive/60" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={account.bank}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-4 rounded-xl bg-ivory px-4 py-3"
        >
          <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-olive/50 mb-1">Nomor Rekening {account.bank}</p>
          <p className="font-sans text-xl font-medium tracking-[0.15em] text-olive">
            {account.accountNumber.match(/.{1,4}/g)?.join(" ")}
          </p>
          <p className="font-serif text-sm italic text-olive/60 mt-1">a.n. {account.accountName}</p>
        </motion.div>
      </AnimatePresence>

      <button onClick={handleCopy} className="btn-olive w-full mt-4">
        {copied ? <Check size={12} /> : <Copy size={12} />}
        {copied ? "Tersalin!" : "Salin Nomor Rekening"}
      </button>
      <button onClick={() => setConfirmOpen(true)} className="btn-outline-olive w-full mt-3">
        <Receipt size={13} />
        Konfirmasi Transfer
      </button>

      <TransferConfirmModal open={confirmOpen} onClose={() => setConfirmOpen(false)} defaultBank={account.bank} />
    </motion.div>
  );
}

// Popup (bottom sheet di HP, dialog di layar lebar) berisi form konfirmasi
function TransferConfirmModal({ open, onClose, defaultBank }: { open: boolean; onClose: () => void; defaultBank: string }) {
  // Kunci scroll halaman selama popup terbuka
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-olive/70 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Konfirmasi transfer"
            initial={{ y: "100%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.5 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92svh] w-full max-w-[480px] overflow-y-auto rounded-t-[28px] bg-ivory-light shadow-2xl sm:max-h-[90vh] sm:rounded-[28px]"
          >
            {/* Pegangan bottom sheet & tombol tutup */}
            <div className="sticky top-0 z-10 flex items-center justify-between bg-ivory-light/95 px-5 pt-3 pb-2 backdrop-blur">
              <span className="mx-auto h-1.5 w-12 rounded-full bg-olive/20 sm:hidden" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup"
                className="absolute right-4 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-olive/10 text-olive transition hover:bg-olive/20"
              >
                <X size={16} />
              </button>
            </div>
            <div className="px-5 pb-8 pt-1">
              <TransferConfirmForm defaultBank={defaultBank} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type FormStatus = "idle" | "loading" | "success" | "error";

// Form konfirmasi transfer: nama, nominal, dan unggah bukti
function TransferConfirmForm({ defaultBank }: { defaultBank: string }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState(defaultBank);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Nominal ditampilkan dengan pemisah ribuan, disimpan sebagai angka
  const amountNumber = Number(amount.replace(/\D/g, ""));
  const amountDisplay = amountNumber ? amountNumber.toLocaleString("id-ID") : "";

  const handleFile = (f: File | null) => {
    if (preview) URL.revokeObjectURL(preview);
    if (!f) {
      setFile(null);
      setPreview(null);
      return;
    }
    if (!f.type.startsWith("image/")) {
      setErrorMsg("Bukti transfer harus berupa gambar (JPG/PNG).");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setErrorMsg("Ukuran gambar maksimal 5 MB.");
      return;
    }
    setErrorMsg("");
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !amountNumber || !file) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const form = new FormData();
      form.append("name", name.trim());
      form.append("amount", String(amountNumber));
      form.append("bank", bank);
      form.append("proof", file);
      const res = await fetch("/api/gift-confirm", { method: "POST", body: form });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? "Terjadi kesalahan. Silakan coba lagi.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("Terjadi kesalahan. Silakan coba lagi.");
      setStatus("error");
    }
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {status !== "success" ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
            className="space-y-4"
          >
            <div className="text-center mb-2">
              <h4 className="font-script text-3xl leading-tight text-olive">Konfirmasi Transfer</h4>
              <p className="font-serif text-sm text-olive/60 mt-1">Agar kami dapat mencatat dan mengucapkan terima kasih</p>
            </div>

            <div>
              <label className="font-sans text-[10px] uppercase tracking-[0.25em] text-olive/60 block mb-2">
                Nama Pengirim <span className="text-olive-soft">*</span>
              </label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Anda" required className="input-olive" />
            </div>

            <div>
              <label className="font-sans text-[10px] uppercase tracking-[0.25em] text-olive/60 block mb-2">
                Nominal <span className="text-olive-soft">*</span>
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-sans text-sm text-olive/50">Rp</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={amountDisplay}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="500.000"
                  required
                  className="input-olive pl-11"
                />
              </div>
            </div>

            <div>
              <label className="font-sans text-[10px] uppercase tracking-[0.25em] text-olive/60 block mb-2">Transfer ke</label>
              <div className="relative">
                <select value={bank} onChange={(e) => setBank(e.target.value)} className="input-olive appearance-none pr-10">
                  {WEDDING_DATA.bankAccounts.map((acc) => (
                    <option key={acc.bank} value={acc.bank}>{acc.bank} — {acc.accountName}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-olive/60" />
              </div>
            </div>

            <div>
              <label className="font-sans text-[10px] uppercase tracking-[0.25em] text-olive/60 block mb-2">
                Bukti Transfer <span className="text-olive-soft">*</span>
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                className="hidden"
              />
              {preview ? (
                <div className="relative overflow-hidden rounded-xl border border-olive/15 bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="Pratinjau bukti transfer" className="max-h-64 w-full object-contain" />
                  <div className="flex items-center justify-between gap-3 border-t border-olive/10 px-4 py-2.5">
                    <span className="truncate font-sans text-xs text-olive/70">{file?.name}</span>
                    <button type="button" onClick={() => handleFile(null)} className="shrink-0 font-sans text-xs text-olive underline underline-offset-4">
                      Ganti
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-olive/25 bg-white px-4 py-7 text-olive/60 transition hover:border-olive/50 hover:text-olive"
                >
                  <ImagePlus size={22} />
                  <span className="font-sans text-xs">Ketuk untuk memilih gambar bukti transfer</span>
                  <span className="font-sans text-[10px] text-olive/40">JPG atau PNG, maks. 5 MB</span>
                </button>
              )}
            </div>

            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-red-600"
                >
                  <AlertCircle size={16} />
                  <span className="font-sans text-xs">{errorMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button type="submit" disabled={status === "loading" || !name.trim() || !amountNumber || !file} className="btn-olive w-full">
              {status === "loading" ? (
                <span className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-3 h-3 border border-ivory-light/40 border-t-ivory-light rounded-full"
                  />
                  Mengirim...
                </span>
              ) : (
                <>
                  <Send size={13} />
                  Kirim Konfirmasi
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...SPRING.BOUNCY, delay: 0.1 }}
            className="px-2 py-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ ...SPRING.BOUNCY, delay: 0.3 }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-olive/10"
            >
              <CheckCircle2 size={32} className="text-olive" />
            </motion.div>
            <h4 className="font-script text-4xl text-olive mb-2">Terima Kasih, {name}!</h4>
            <p className="font-serif text-sm italic text-olive/60">
              Konfirmasi transfer sebesar Rp {amountNumber.toLocaleString("id-ID")} telah kami terima.
              Semoga kebaikan Anda dibalas berlipat ganda.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Alamat pengiriman kado fisik
function GiftAddress() {
  const { name, phone, address } = WEDDING_DATA.giftAddress;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!(await copyToClipboard(`${name}\n${phone}\n${address}`))) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE.OUT_QUART, delay: 0.3 }}
      className="relative mt-8 bg-olive rounded-3xl px-6 py-7 text-ivory-light overflow-hidden"
    >
      <p className="font-script text-4xl leading-tight">Kirim Kado</p>
      <div className="flex items-start justify-between gap-4 mt-3">
        <div className="font-serif text-[16px] leading-relaxed">
          <p>{name}</p>
          <p className="text-ivory/75">{phone}</p>
          <p className="text-ivory/75">{address}</p>
        </div>
        <button
          onClick={handleCopy}
          aria-label="Salin alamat"
          className="shrink-0 w-9 h-9 rounded-md bg-ivory-light text-olive flex items-center justify-center"
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
        </button>
      </div>
    </motion.div>
  );
}

// Rekomendasi kado: tumpukan kartu yang bisa digeser (swipe) seperti Tinder
const SWIPE_THRESHOLD = 90;

function WishlistCard({
  item,
  index,
  total,
  onSwiped,
  showHint,
  onInteract,
}: {
  item: (typeof WEDDING_DATA.giftWishlist)[number];
  index: number;
  total: number;
  onSwiped: () => void;
  /** Tampilkan petunjuk geser (hanya sebelum tamu pernah menggeser) */
  showHint: boolean;
  onInteract: () => void;
}) {
  const x = useMotionValue(0);

  // Kartu "mengintip" ke kanan lalu ke kiri sekali, sebagai isyarat bisa digeser
  useEffect(() => {
    if (!showHint) return;
    const t = setTimeout(() => {
      animateValue(x, [0, 42, -42, 0], { duration: 1.8, ease: "easeInOut" });
    }, 900);
    return () => clearTimeout(t);
  }, [showHint, x]);
  const rotate = useTransform(x, [-250, 250], [-14, 14]);
  const likeOpacity = useTransform(x, [30, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-30, -120], [0, 1]);

  const flyOut = (dir: 1 | -1) => {
    animateValue(x, dir * 600, { duration: 0.4, ease: EASE.OUT_QUART }).then(onSwiped);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD || info.velocity.x > 500) flyOut(1);
    else if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -500) flyOut(-1);
    else animateValue(x, 0, { type: "spring", stiffness: 400, damping: 30 });
  };

  return (
    <motion.article
      drag="x"
      dragElastic={0.9}
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={onInteract}
      onDragEnd={handleDragEnd}
      style={{ x, rotate }}
      className="absolute inset-0 cursor-grab touch-pan-y overflow-hidden rounded-[26px] border border-olive/10 bg-ivory-light active:cursor-grabbing"
    >
      {/* Stempel saat digeser */}
      <motion.span
        style={{ opacity: likeOpacity }}
        className="pointer-events-none absolute left-5 top-5 z-10 rotate-[-14deg] rounded-md border-[3px] border-[#7C9A4E] px-2 py-0.5 font-caps text-base font-bold tracking-[0.2em] text-[#7C9A4E]"
      >
        SUKA
      </motion.span>
      <motion.span
        style={{ opacity: nopeOpacity }}
        className="pointer-events-none absolute right-5 top-5 z-10 rotate-[14deg] rounded-md border-[3px] border-blossom px-2 py-0.5 font-caps text-base font-bold tracking-[0.2em] text-blossom"
      >
        LEWATI
      </motion.span>

      <div className="relative m-3 overflow-hidden rounded-[20px] bg-ivory">
        <div className="relative w-full" style={{ paddingBottom: "100%" }}>
          <Photo src={item.image} alt={item.name} className="pointer-events-none absolute inset-0 h-full w-full select-none" />
        </div>
        <span className="absolute bottom-3 left-3 rounded-full bg-white/85 px-2.5 py-1 font-sans text-[9px] uppercase tracking-[0.2em] text-olive">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
      {/* Petunjuk geser di atas foto */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8, transition: { duration: 0.2 } }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="pointer-events-none absolute inset-x-0 top-[52%] z-10 flex justify-center"
          >
            <div className="flex items-center gap-2 rounded-full bg-olive/85 px-4 py-2 text-ivory-light shadow-lg backdrop-blur-sm">
              <ChevronsLeft size={16} className="opacity-80" />
              <motion.span
                animate={{ x: [-8, 8, -8], rotate: [-8, 8, -8] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="flex"
              >
                <Hand size={18} />
              </motion.span>
              <span className="font-sans text-[11px] tracking-wide">Geser kartu ke kiri / kanan</span>
              <ChevronsRight size={16} className="opacity-80" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-5 pb-5 text-center">
        <h4 className="font-display text-lg italic leading-tight text-olive">{item.name}</h4>
        {item.note && <p className="mt-1 font-serif text-sm text-olive/60">{item.note}</p>}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onPointerDown={(e) => e.stopPropagation()}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#EE4D2D] px-5 py-2.5 font-sans text-xs font-medium text-white transition-all duration-300 hover:bg-[#D8431F] active:scale-95"
        >
          <ShoppingBag size={14} />
          Lihat di Shopee
        </a>
      </div>
    </motion.article>
  );
}

function GiftWishlist() {
  const items = WEDDING_DATA.giftWishlist;
  const [cursor, setCursor] = useState(0); // berapa kartu sudah digeser
  const [hintDismissed, setHintDismissed] = useState(false);
  const showHint = !hintDismissed && cursor === 0;
  const remaining = items.slice(cursor);
  const visible = remaining.slice(0, 3); // kartu teratas + 2 di belakangnya

  if (items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px 0px" }}
      transition={{ duration: 0.8, ease: EASE.OUT_QUART }}
      className="mt-14"
    >
      <div className="text-center">
        <span className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.3em] text-olive/60">
          <Heart size={11} className="fill-blossom text-blossom" /> Wishlist Kado
        </span>
        <h3 className="mt-2 font-script text-4xl leading-tight text-olive">Rekomendasi Kado</h3>
        <p className="mx-auto mt-2 max-w-xs font-serif text-[16px] leading-snug text-olive/70">
          Geser kartu ke kiri atau kanan untuk melihat barang yang sedang kami impikan
        </p>
      </div>

      {/* Tumpukan kartu */}
      <div className="relative mx-auto mt-8 w-[min(80vw,340px)]" style={{ aspectRatio: "340 / 470" }}>
        <AnimatePresence>
          {remaining.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center rounded-[26px] border border-dashed border-olive/25 bg-ivory-light/60 px-6 text-center"
            >
              <Heart size={28} className="fill-blossom text-blossom" />
              <p className="mt-4 font-display text-lg italic text-olive">Itu semua wishlist kami</p>
              <p className="mt-1 font-serif text-sm text-olive/60">Terima kasih sudah melihat-lihat</p>
              <button type="button" onClick={() => setCursor(0)} className="btn-outline-olive mt-5">
                <RotateCcw size={13} /> Lihat Lagi
              </button>
            </motion.div>
          ) : (
            visible
              .map((item, i) => (
                // Kartu di belakang dirender lebih dulu agar yang teratas paling depan
                <motion.div
                  key={item.name}
                  initial={{ scale: 0.9, y: 30, opacity: 0 }}
                  animate={{ scale: 1 - i * 0.05, y: i * 14, opacity: 1 - i * 0.12 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  style={{ zIndex: 10 - i, transformOrigin: "bottom center" }}
                  className="absolute inset-0"
                >
                  {i === 0 ? (
                    <WishlistCard
                      item={item}
                      index={cursor}
                      total={items.length}
                      showHint={showHint}
                      onInteract={() => setHintDismissed(true)}
                      onSwiped={() => {
                        setHintDismissed(true);
                        setCursor((c) => c + 1);
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 overflow-hidden rounded-[26px] border border-olive/10 bg-ivory-light">
                      <div className="m-3 overflow-hidden rounded-[20px] bg-ivory" style={{ paddingBottom: "100%" }} />
                    </div>
                  )}
                </motion.div>
              ))
              .reverse()
          )}
        </AnimatePresence>
      </div>

      {/* Indikator */}
      <div className="mt-12 flex justify-center gap-1.5">
        {items.map((_, i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === cursor ? "w-5 bg-olive" : i < cursor ? "w-1.5 bg-olive/50" : "w-1.5 bg-olive/20"}`} />
        ))}
      </div>
    </motion.div>
  );
}

export default function GiftSection() {
  return (
    <section className="section bg-white">
      <div>
        <SectionHeader title="Kirim Hadiah" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE.OUT_QUART }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 bg-olive/10 rounded-full mb-4">
            <Gift size={24} className="text-olive" />
          </div>
          <p className="font-serif text-[17px] text-olive/70 max-w-md mx-auto leading-snug">
            Doa dan kehadiran Anda adalah hadiah terindah bagi kami. Namun jika Anda
            ingin memberikan hadiah, Anda dapat mengirimkannya melalui:
          </p>
        </motion.div>

        <BankSelector />

        <GiftAddress />
        <GiftWishlist />
      </div>
    </section>
  );
}
