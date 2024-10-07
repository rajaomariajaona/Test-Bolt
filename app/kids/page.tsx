"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QRCodeSVG } from 'qrcode.react';

export default function KidsPage() {
  const [kids, setKids] = useState([]);
  const [newKidName, setNewKidName] = useState('');

  useEffect(() => {
    fetchKids();
  }, []);

  const fetchKids = async () => {
    const response = await fetch('/api/kids');
    const data = await response.json();
    setKids(data);
  };

  const addKid = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/kids', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newKidName }),
    });
    if (response.ok) {
      setNewKidName('');
      fetchKids();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Kids</h1>
      <form onSubmit={addKid} className="mb-4">
        <Input
          type="text"
          value={newKidName}
          onChange={(e) => setNewKidName(e.target.value)}
          placeholder="Enter kid's name"
          className="mr-2"
        />
        <Button type="submit">Add Kid</Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kids.map((kid) => (
          <Card key={kid.id}>
            <CardHeader>
              <CardTitle>{kid.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <QRCodeSVG value={kid.qrCode} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}