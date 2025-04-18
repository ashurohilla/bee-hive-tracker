'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {createCrop} from "../../../src/lib/api/addcrop"

export default function page() {
  const [formData, setFormData] = useState({
    name: '',
    floweringStart: '',
    floweringEnd: '',
    latitude: '',
    longitude: '',
    recommendedHiveDensity: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await createCrop(formData);

      setSuccess('Crop entry added successfully!');
      setError('');
      setFormData({
        name: '',
        floweringStart: '',
        floweringEnd: '',
        latitude: '',
        longitude: '',
        recommendedHiveDensity: '',
      });

      setTimeout(() => router.push('/dashboard'), 1000);
    } catch (err) {
        console.log(err)
      setError(err.response?.data?.message || 'Error adding crop');
      setSuccess('');
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8 p-6 shadow-xl">
      <CardHeader>
        <CardTitle>Add New Crop</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="default">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div>
            <Label htmlFor="name">Crop Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="floweringStart">Flowering Start</Label>
              <Input type="date" id="floweringStart" name="floweringStart" value={formData.floweringStart} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="floweringEnd">Flowering End</Label>
              <Input type="date" id="floweringEnd" name="floweringEnd" value={formData.floweringEnd} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="latitude">Latitude</Label>
              <Input type="number" id="latitude" name="latitude" value={formData.latitude} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="longitude">Longitude</Label>
              <Input type="number" id="longitude" name="longitude" value={formData.longitude} onChange={handleChange} required />
            </div>
          </div>

          <div>
            <Label htmlFor="recommendedHiveDensity">Recommended Hive Density</Label>
            <Input type="number" id="recommendedHiveDensity" name="recommendedHiveDensity" value={formData.recommendedHiveDensity} onChange={handleChange} required />
          </div>

          <Button type="submit" className="w-full">
            Add Crop Entry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
