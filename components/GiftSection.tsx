"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Gift } from "lucide-react";
import { WEDDING_DATA, EASE, SPRING } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";

interface BankCardProps {
  bank: string;
  accountNumber: string;
  accountName: string;
  delay: number;
}

function BankCard({ bank, accountNumber, accountName, delay }: BankCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE.OUT_QUART, delay }}
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(91,24,29,0.12)" }}
      className="card-elegant relative overflow-hidden"
    >
      {/* Top decoration */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blossom to-transparent" />

      {/* Bank name */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-petal rounded-xl flex items-center justify-center">
          <span className="font-display text-sm font-bold italic text-ink">{bank.charAt(0)}</span>
        </div>
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-ink/50">Bank</p>
          <p className="font-display text-lg font-bold italic text-ink">{bank}</p>
        </div>
      </div>

      {/* Account number */}
      <div className="bg-blossom/30 rounded-xl px-4 py-3 mb-3">
        <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-ink/40 mb-1">
          Nomor Rekening
        </p>
        <p className="font-sans text-xl font-medium tracking-[0.15em] text-ink">
          {accountNumber.match(/.{1,4}/g)?.join(" ")}
        </p>
      </div>

      {/* Account name */}
      <p className="font-serif text-sm italic text-ink/60 mb-4">a.n. {accountName}</p>

      {/* Copy button */}
      <button onClick={handleCopy} className="btn-outline w-full justify-center text-[10px]">
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="copied"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={SPRING.SNAPPY}
              className="flex items-center gap-2"
            >
              <Check size={12} />
              Tersalin!
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={SPRING.SNAPPY}
              className="flex items-center gap-2"
            >
              <Copy size={12} />
              Salin Nomor Rekening
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

export default function GiftSection() {
  return (
    <section className="bg-petal py-20 md:py-28">
      <div className="section-container max-w-2xl">
        <SectionHeader
          eyebrow="Amplop Digital"
          title="Hadiah & Doa"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE.OUT_QUART }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blossom/20 rounded-full mb-4">
            <Gift size={24} className="text-ink" />
          </div>
          <p className="font-serif text-sm md:text-base italic text-ink/70 max-w-md mx-auto leading-relaxed">
            Doa dan kehadiran Anda adalah hadiah terindah bagi kami. Namun jika Anda
            ingin memberikan hadiah, Anda dapat mengirimkannya melalui:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {WEDDING_DATA.bankAccounts.map((account, i) => (
            <BankCard
              key={account.bank}
              bank={account.bank}
              accountNumber={account.accountNumber}
              accountName={account.accountName}
              delay={i * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
