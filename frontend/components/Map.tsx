"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

// Fix for default Leaflet icons in Next.js
import L from 'leaflet';

// Only run on client
const iconFix = () => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
};

interface Hotspot {
    lat: number;
    lng: number;
    risk: string;
}

interface MapProps {
    hotspots: Hotspot[];
}

const MapController = () => {
    const map = useMap();
    useEffect(() => {
        map.invalidateSize();
    }, [map]);
    return null;
}

export default function MapComponent({ hotspots }: MapProps) {
    useEffect(() => {
        iconFix();
    }, []);

    // San Francisco/California default center
    const center: [number, number] = [37.7749, -122.4194];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card w-full h-[400px] overflow-hidden relative z-0" // relative z-0 to avoid overlapping
        >
            <h3 className="text-xl font-semibold mb-4 text-gray-200 absolute top-4 left-6 z-[500] bg-black/50 px-3 py-1 rounded-md backdrop-blur-md">
                Live Hotspots
            </h3>
            <MapContainer center={center} zoom={6} scrollWheelZoom={false} className="w-full h-full rounded-xl">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                <MapController />

                {hotspots.map((spot, idx) => (
                    <CircleMarker
                        key={idx}
                        center={[spot.lat, spot.lng]}
                        radius={15}
                        pathOptions={{
                            color: spot.risk === "Critical" ? '#ef4444' : '#f97316',
                            fillColor: spot.risk === "Critical" ? '#ef4444' : '#f97316',
                            fillOpacity: 0.6
                        }}
                    >
                        <Popup className="glass-popup">
                            <div className="text-black font-semibold">
                                Risk: {spot.risk}
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>
        </motion.div>
    );
}
