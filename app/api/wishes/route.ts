import { NextRequest, NextResponse } from "next/server";
import { generateId } from "@/lib/utils";
import path from "path";

interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

const SEED_WISH: Wish = {
  id: "seed-1",
  name: "Keluarga Besar",
  message:
    "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fi khair. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
  createdAt: "2025-01-01T00:00:00.000Z",
};

// In-memory store for production
const memoryStore: Wish[] = [SEED_WISH];

async function readStore(): Promise<Wish[]> {
  if (process.env.NODE_ENV === "production") return memoryStore;
  try {
    const { promises: fs } = await import("fs");
    const filePath = path.join(process.cwd(), "data", "wishes.json");
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [SEED_WISH];
  }
}

async function writeStore(data: Wish[]): Promise<void> {
  if (process.env.NODE_ENV === "production") {
    memoryStore.length = 0;
    memoryStore.push(...data);
    return;
  }
  const { promises: fs } = await import("fs");
  const filePath = path.join(process.cwd(), "data", "wishes.json");
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const data = await readStore();
  const sorted = [...data].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json(sorted);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, message } = body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Nama wajib diisi" }, { status: 400 });
  }
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json({ error: "Ucapan wajib diisi" }, { status: 400 });
  }
  if (message.trim().length > 500) {
    return NextResponse.json({ error: "Ucapan maksimal 500 karakter" }, { status: 400 });
  }

  const entry: Wish = {
    id: generateId(),
    name: name.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };

  const data = await readStore();
  data.unshift(entry);
  await writeStore(data);

  return NextResponse.json(entry, { status: 201 });
}
