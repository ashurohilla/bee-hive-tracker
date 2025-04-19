'use client';

import { useState } from 'react';
import { getNearbyCrops } from '../src/lib/api/getnearbycrop';
import { Input } from '../src/components/ui/input';
import { Button } from '../src/components/ui/button';
import { Card , CardHeader, CardContent, CardTitle } from '../src/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function NearbyCropsPage() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [radius, setRadius] = useState('100');
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNearby = async () => {
    setLoading(true);
    try {
      const data = await getNearbyCrops({
        latitude: Number(latitude),
        longitude: Number(longitude),
        radius: Number(radius),
      });
      setCrops(data);
    } catch (err) {
      alert(err?.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Nearby Crops</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <Input
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
          <Input
            placeholder="Radius (in km)"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
          />
          <Button onClick={fetchNearby} disabled={loading} className="md:col-span-3">
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Fetch Nearby Crops'}
          </Button>
        </CardContent>
      </Card>

      {crops.length > 0 && (
        <div className="grid gap-4">
          {crops.map((crop, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{crop.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>🌱 Location: ({crop.latitude}, {crop.longitude})</p>
                <p>🌸 Flowering: {crop.floweringStart?.slice(0, 10)} ➡ {crop.floweringEnd?.slice(0, 10)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
