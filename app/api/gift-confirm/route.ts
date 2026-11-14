import { NextRequest, NextResponse } from "next/server";
import { generateId } from "@/lib/utils";
import path from "path";

interface GiftConfirmation {
  id: string;
  name: string;
  amount: number;
  bank: string;
  /** Nama file bukti di data/uploads (dev) atau null bila tidak tersimpan (production) */
  proofFile: string | null;
  createdAt: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

// In-memory store for production (Vercel read-only filesystem)
const memoryStore: GiftConfirmation[] = [];

async function readStore(): Promise<GiftConfirmation[]> {
  if (process.env.NODE_ENV === "production") return memoryStore;
  try {
    const { promises: fs } = await import("fs");
    const filePath = path.join(process.cwd(), "data", "gift-confirmations.json");
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeStore(data: GiftConfirmation[]): Promise<void> {
  if (process.env.NODE_ENV === "production") {
    memoryStore.length = 0;
    memoryStore.push(...data);
    return;
  }
  const { promises: fs } = await import("fs");
  const filePath = path.join(process.cwd(), "data", "gift-confirmations.json");
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Simpan gambar bukti ke data/uploads (hanya saat development)
async function saveProof(id: string, file: File): Promise<string | null> {
  if (process.env.NODE_ENV === "production") return null;
  const { promises: fs } = await import("fs");
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const dir = path.join(process.cwd(), "data", "uploads");
  await fs.mkdir(dir, { recursive: true });
  const fileName = `${id}.${ext}`;
  await fs.writeFile(path.join(dir, fileName), Buffer.from(await file.arrayBuffer()));
  return fileName;
}

export async function GET() {
  const data = await readStore();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const name = form.get("name");
  const amount = Number(form.get("amount"));
  const bank = form.get("bank");
  const proof = form.get("proof");

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Nama wajib diisi" }, { status: 400 });
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: "Nominal tidak valid" }, { status: 400 });
  }
  if (!(proof instanceof File) || proof.size === 0) {
    return NextResponse.json({ error: "Bukti transfer wajib diunggah" }, { status: 400 });
  }
  if (!proof.type.startsWith("image/")) {
    return NextResponse.json({ error: "Bukti transfer harus berupa gambar" }, { status: 400 });
  }
  if (proof.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "Ukuran gambar maksimal 5 MB" }, { status: 400 });
  }

  const id = generateId();
  const entry: GiftConfirmation = {
    id,
    name: name.trim(),
    amount,
    bank: typeof bank === "string" ? bank : "",
    proofFile: await saveProof(id, proof),
    createdAt: new Date().toISOString(),
  };

  const data = await readStore();
  data.unshift(entry);
  await writeStore(data);

  return NextResponse.json(entry, { status: 201 });
}
