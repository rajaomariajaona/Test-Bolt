import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">Church Event Attendance</h1>
      <div className="space-y-4">
        <Link href="/kids">
          <Button className="w-full">Manage Kids</Button>
        </Link>
        <Link href="/events">
          <Button className="w-full">Manage Events</Button>
        </Link>
        <Link href="/check-in">
          <Button className="w-full">Check-in</Button>
        </Link>
      </div>
    </div>
  );
}