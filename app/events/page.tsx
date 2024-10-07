"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [newEventName, setNewEventName] = useState('');
  const [newEventDate, setNewEventDate] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const response = await fetch('/api/events');
    const data = await response.json();
    setEvents(data);
  };

  const addEvent = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newEventName, date: newEventDate }),
    });
    if (response.ok) {
      setNewEventName('');
      setNewEventDate('');
      fetchEvents();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Events</h1>
      <form onSubmit={addEvent} className="mb-4">
        <Input
          type="text"
          value={newEventName}
          onChange={(e) => setNewEventName(e.target.value)}
          placeholder="Enter event name"
          className="mr-2 mb-2"
        />
        <Input
          type="datetime-local"
          value={newEventDate}
          onChange={(e) => setNewEventDate(e.target.value)}
          className="mr-2 mb-2"
        />
        <Button type="submit">Add Event</Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Date: {new Date(event.date).toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}