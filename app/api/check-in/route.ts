import { NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { Kid } from '@/entities/Kid';
import { Event } from '@/entities/Event';
import { Attendance } from '@/entities/Attendance';

export async function POST(request: Request) {
  const { qrCode, eventId } = await request.json();
  const kidRepository = AppDataSource.getRepository(Kid);
  const eventRepository = AppDataSource.getRepository(Event);
  const attendanceRepository = AppDataSource.getRepository(Attendance);

  const kid = await kidRepository.findOne({ where: { qrCode } });
  if (!kid) {
    return NextResponse.json({ error: 'Kid not found' }, { status: 404 });
  }

  const event = await eventRepository.findOne({ where: { id: eventId } });
  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }

  const attendance = attendanceRepository.create({
    kid,
    event,
    checkInTime: new Date(),
  });
  await attendanceRepository.save(attendance);

  return NextResponse.json({ kidName: kid.name, attendance });
}