"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";



const mockHives = [
  {
    id: "hive-001",
    position: [51.505, -0.09],
    name: "Central London Hive",
    status: "Active",
    radius: 2000,
  },
  {
    id: "hive-002",
    position: [51.51, -0.1],
    name: "North London Hive",
    status: "Inactive",
    radius: 1500,
  },
  {
    id: "hive-003",
    position: [51.49, -0.08],
    name: "South London Hive",
    status: "Active",
    radius: 1800,
  },
];

// Dynamically import the Leaflet components with SSR disabled
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false },
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const Circle = dynamic(
  () => import("react-leaflet").then((mod) => mod.Circle),
  { ssr: false },
);

const InteractiveMap = () => {
  const [hives, setHives] = useState(mockHives);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [customIcon, setCustomIcon] = useState(null);

  useEffect(() => {
    // This ensures the map is only rendered client-side
    setMapLoaded(true);

    // Initialize the Leaflet icon on the client side
    import("leaflet").then((L) => {
      setCustomIcon(
        new L.Icon({
          iconUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      );
    });
  }, []);

  if (!mapLoaded || !customIcon) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-black-surface rounded-lg border border-black-border p-4">
        <div className="text-black-secondary">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black-surface rounded-lg border border-black-border p-4">
      <div className="w-full h-full rounded-lg overflow-hidden">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          {/* Dark theme map tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {hives.map((hive) => (
            <React.Fragment key={hive.id}>
              <Marker position={hive.position} icon={customIcon}>
                <Popup className="text-gray-800">
                  <div>
                    <h3 className="font-bold">{hive.name}</h3>
                    <p>Status: {hive.status}</p>
                    <p>Coverage: {hive.radius}m</p>
                  </div>
                </Popup>
              </Marker>
              <Circle
                center={hive.position}
                radius={hive.radius}
                pathOptions={{
                  color: hive.status === "Active" ? "#4ade80" : "#f87171",
                  fillColor:
                    hive.status === "Active" ? "#4ade8080" : "#f8717180",
                  fillOpacity: 0.2,
                }}
              />
            </React.Fragment>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default InteractiveMap;
