import { NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { Kid } from '@/entities/Kid';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const kidRepository = AppDataSource.getRepository(Kid);
  const kids = await kidRepository.find();
  return NextResponse.json(kids);
}

export async function POST(request: Request) {
  const { name } = await request.json();
  const kidRepository = AppDataSource.getRepository(Kid);
  const qrCode = uuidv4();
  const kid = kidRepository.create({
    name,
    qrCode,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await kidRepository.save(kid);
  return NextResponse.json(kid);
}