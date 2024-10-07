"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CheckInPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [scanResult, setScanResult] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const response = await fetch('/api/events');
    const data = await response.json();
    setEvents(data);
  };

  const handleScan = async (e) => {
    e.preventDefault();
    if (qrCode && selectedEvent) {
      setScanResult('Processing...');
      const response = await fetch('/api/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrCode, eventId: selectedEvent }),
      });
      if (response.ok) {
        const data = await response.json();
        setScanResult(`Checked in: ${data.kidName}`);
      } else {
        setScanResult('Check-in failed');
      }
      setQrCode('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Check-in</h1>
      <Select onValueChange={setSelectedEvent} value={selectedEvent}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Select an event" />
        </SelectTrigger>
        <SelectContent>
          {events.map((event) => (
            <SelectItem key={event.id} value={event.id}>
              {event.name} - {new Date(event.date).toLocaleString()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedEvent && (
        <form onSubmit={handleScan} className="mb-4">
          <Input
            type="text"
            value={qrCode}
            onChange={(e) => setQrCode(e.target.value)}
            placeholder="Enter QR Code"
            className="mb-2"
          />
          <Button type="submit">Check In</Button>
        </form>
      )}
      <p className="text-center">{scanResult}</p>
    </div>
  );
}