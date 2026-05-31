import { NextRequest, NextResponse } from "next/server";
import { generateId } from "@/lib/utils";
import path from "path";

interface RSVPEntry {
  id: string;
  name: string;
  phone: string;
  attending: boolean;
  guests: number;
  createdAt: string;
}

// In-memory store for production (Vercel read-only filesystem)
const memoryStore: RSVPEntry[] = [];

async function readStore(): Promise<RSVPEntry[]> {
  if (process.env.NODE_ENV === "production") return memoryStore;
  try {
    const { promises: fs } = await import("fs");
    const filePath = path.join(process.cwd(), "data", "rsvp.json");
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeStore(data: RSVPEntry[]): Promise<void> {
  if (process.env.NODE_ENV === "production") {
    memoryStore.length = 0;
    memoryStore.push(...data);
    return;
  }
  const { promises: fs } = await import("fs");
  const filePath = path.join(process.cwd(), "data", "rsvp.json");
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const data = await readStore();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, phone = "", attending, guests = 1 } = body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Nama wajib diisi" }, { status: 400 });
  }
  if (typeof attending !== "boolean") {
    return NextResponse.json({ error: "Konfirmasi kehadiran wajib dipilih" }, { status: 400 });
  }

  const entry: RSVPEntry = {
    id: generateId(),
    name: name.trim(),
    phone: phone.trim(),
    attending,
    guests: attending ? Math.min(Math.max(1, Number(guests)), 5) : 0,
    createdAt: new Date().toISOString(),
  };

  const data = await readStore();
  data.push(entry);
  await writeStore(data);

  return NextResponse.json(entry, { status: 201 });
}
