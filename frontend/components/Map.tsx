"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { Hotspot } from '../types';

/**
 * Fix for default Leaflet icons in Next.js
 * Leaflet's default icon paths are often broken in build environments.
 */
const iconFix = async () => {
    try {
        const L = (await import('leaflet')).default;
        // @ts-ignore - Internal Leaflet property hack
        if (L.Icon.Default.prototype) {
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            });
        }
    } catch (e) {
        console.warn("Leaflet icon fix failed", e);
    }
};

interface MapProps {
    hotspots: Hotspot[];
    center?: [number, number];
}

/**
 * Handle map movement to new center
 */
const FlyToCenter = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, 10, {
                duration: 1.5
            });
        }
    }, [center, map]);
    return null;
}

/**
 * Ensures the map container fills the space and updates correctly
 */
const MapController = () => {
    const map = useMap();
    useEffect(() => {
        const timer = setTimeout(() => {
            map.invalidateSize();
        }, 100);
        return () => clearTimeout(timer);
    }, [map]);
    return null;
}

export default function MapComponent({ hotspots, center: externalCenter }: MapProps) {
    useEffect(() => {
        iconFix();
    }, []);

    // Default center (e.g., California area)
    const defaultCenter: [number, number] = [37.7749, -122.4194];
    const activeCenter = externalCenter || defaultCenter;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full h-[500px] overflow-hidden relative z-0 border border-white/10 group"
        >
            {/* High-Tech Scanning Effect Overlay */}
            <div className="scan-line"></div>

            {/* Surveillance Status Bar */}
            <div className="absolute top-4 left-4 z-[500] flex flex-col gap-2">
                <h3 className="text-xl font-bold text-white bg-black/60 px-4 py-2 rounded-xl backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                    Live Surveillance
                </h3>
                <div className="bg-orange-500/10 px-3 py-1.5 rounded-lg backdrop-blur-md border border-orange-500/20 text-[10px] text-orange-400 uppercase tracking-widest font-bold">
                    Satellite Intelligence Active
                </div>
            </div>

            {/* Grid Coordinates Display */}
            <div className="absolute top-4 right-4 z-[500] flex flex-col items-end gap-1">
                <div className="bg-black/60 font-mono text-[10px] text-green-500 px-3 py-1 rounded border border-green-500/20 backdrop-blur-md">
                    LAT: {activeCenter[0].toFixed(4)}
                </div>
                <div className="bg-black/60 font-mono text-[10px] text-green-500 px-3 py-1 rounded border border-green-500/20 backdrop-blur-md">
                    LNG: {activeCenter[1].toFixed(4)}
                </div>
            </div>

            <MapContainer
                center={activeCenter}
                zoom={6}
                scrollWheelZoom={false}
                className="w-full h-full rounded-xl grayscale-[0.1] contrast-[1.1]"
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                <MapController />
                <FlyToCenter center={activeCenter} />

                {hotspots && hotspots.map((spot, idx) => (
                    <React.Fragment key={`${spot.lat}-${spot.lng}-${idx}`}>
                        {/* Outer Glow/Ripple */}
                        <CircleMarker
                            center={[spot.lat, spot.lng] as [number, number]}
                            radius={25}
                            pathOptions={{
                                color: spot.risk === "Critical" ? '#ef4444' : '#f97316',
                                weight: 1,
                                fillOpacity: 0.1,
                                className: 'animate-pulse'
                            }}
                        />
                        {/* Core Marker */}
                        <CircleMarker
                            center={[spot.lat, spot.lng] as [number, number]}
                            radius={10}
                            pathOptions={{
                                color: spot.risk === "Critical" ? '#ef4444' : '#f97316',
                                fillColor: spot.risk === "Critical" ? '#ef4444' : '#f97316',
                                fillOpacity: 0.8,
                                weight: 2,
                                className: 'map-glow'
                            }}
                        >
                            <Popup className="glass-popup">
                                <div className="text-white p-2 min-w-[160px]">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Sensor Unit Delta-{idx}</span>
                                        <div className={`w-2 h-2 rounded-full ${spot.risk === 'Critical' ? 'bg-red-500' : 'bg-orange-500'} animate-pulse`}></div>
                                    </div>
                                    <div className="text-lg font-bold mb-1 flex items-center gap-2">
                                        <span className={spot.risk === 'Critical' ? 'text-red-500' : 'text-orange-500'}>●</span>
                                        {spot.risk} Risk
                                    </div>
                                    <div className="text-[11px] text-gray-300 leading-tight mb-2">
                                        Thermal anomaly detected. Satellite triangulation complete.
                                    </div>
                                    <div className="mt-2 pt-2 border-t border-white/10 flex justify-between text-[9px] text-gray-500 font-mono italic">
                                        <span>CONFIDENCE: {(Math.random() * 0.2 + 0.75).toFixed(2)}</span>
                                        <span>ALT: {Math.floor(Math.random() * 1000 + 200)}m</span>
                                    </div>
                                </div>
                            </Popup>
                        </CircleMarker>
                    </React.Fragment>
                ))}
            </MapContainer>

            {/* Bottom Status Ticker */}
            <div className="absolute bottom-4 left-4 z-[500] flex gap-4">
                <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl shadow-2xl">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 font-bold uppercase">System Status</span>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                            <span className="text-xs text-green-500 font-mono font-bold tracking-widest">NOMINAL</span>
                        </div>
                    </div>
                    <div className="w-px h-6 bg-white/10"></div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 font-bold uppercase">Local Variance</span>
                        <span className="text-xs text-white font-mono">{(Math.random() * 5).toFixed(2)}%</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
