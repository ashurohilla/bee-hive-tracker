'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import {createhive}  from "../src/lib/api/createhive"
export default function HiveLoggerForm() {
  const [formData, setFormData] = useState({
    hiveId: '',
    datePlaced: '',
    latitude: '',
    longitude: '',
    numColonies: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createhive(formData);

      toast.success('Hive logged successfully!');
      setFormData({
        hiveId: '',
        datePlaced: '',
        latitude: '',
        longitude: '',
        numColonies: '',
      });
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Error logging hive');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto mt-10 p-6">
      <CardHeader>
        <CardTitle className="text-2xl">Log New Hive</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <Label htmlFor="hiveId">Hive ID</Label>
            <Input name="hiveId" value={formData.hiveId} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="datePlaced">Date Placed</Label>
            <Input type="date" name="datePlaced" value={formData.datePlaced} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="latitude">Latitude</Label>
            <Input name="latitude" type="number" value={formData.latitude} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="longitude">Longitude</Label>
            <Input name="longitude" type="number" value={formData.longitude} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="numColonies">Number of Colonies</Label>
            <Input name="numColonies" type="number" value={formData.numColonies} onChange={handleChange} required />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'Logging...' : 'Log Hive'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
