"use client";

import React, { useState } from 'react';
import { Search, Loader2, MapPin } from 'lucide-react';
import axios from 'axios';
import { WeatherData } from '../types';

interface CitySearchProps {
    onCityFound: (data: WeatherData) => void;
}

export default function CitySearch({ onCityFound }: CitySearchProps) {
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!city.trim()) return;

        setLoading(true);
        try {
            // 1. Geocoding via Nominatim
            const geoRes = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`);

            if (geoRes.data.length === 0) {
                alert("City not found.");
                return;
            }

            const { lat, lon, display_name } = geoRes.data[0];
            const latitude = parseFloat(lat);
            const longitude = parseFloat(lon);

            // 2. Weather via Open-Meteo
            const weatherRes = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation&wind_speed_unit=kmh`);

            const current = weatherRes.current || weatherRes.data.current;

            onCityFound({
                temperature: current.temperature_2m,
                humidity: current.relative_humidity_2m,
                wind_speed: current.wind_speed_10m,
                rainfall: current.precipitation,
                lat: latitude,
                lng: longitude,
                cityName: display_name.split(',')[0]
            });

            setCity('');
        } catch (error) {
            console.error("Search failed:", error);
            alert("Failed to fetch city data. Check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mb-8">
            <form onSubmit={handleSearch} className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    {loading ? (
                        <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
                    ) : (
                        <Search className="w-5 h-5 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                    )}
                </div>
                <input
                    type="text"
                    placeholder="Search city for real-time risk analysis..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all backdrop-blur-md"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-2 top-2 bottom-2 bg-orange-600 hover:bg-orange-500 text-white px-4 rounded-xl transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2 text-sm font-medium"
                >
                    <MapPin className="w-4 h-4" />
                    Locate
                </button>
            </form>
        </div>
    );
}
