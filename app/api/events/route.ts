import { NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { Event } from '@/entities/Event';

export async function GET() {
  const eventRepository = AppDataSource.getRepository(Event);
  const events = await eventRepository.find();
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const { name, date } = await request.json();
  const eventRepository = AppDataSource.getRepository(Event);
  const event = eventRepository.create({
    name,
    date: new Date(date),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await eventRepository.save(event);
  return NextResponse.json(event);
}