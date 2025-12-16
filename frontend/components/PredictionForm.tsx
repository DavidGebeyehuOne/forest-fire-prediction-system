"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Droplets, Wind, CloudRain, TreeDeciduous, Loader2 } from 'lucide-react';

interface PredictionFormProps {
  onPredict: (data: any) => void;
  loading: boolean;
}

export default function PredictionForm({ onPredict, loading }: PredictionFormProps) {
  const [formData, setFormData] = useState({
    temperature: 30,
    humidity: 40,
    wind_speed: 15,
    rainfall: 0,
    vegetation: 0.5
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
        Environmental Data
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Thermometer className="w-4 h-4 text-orange-500" /> Temperature (°C)
          </label>
          <input 
            type="number" step="0.1" name="temperature" 
            value={formData.temperature} onChange={handleChange}
            className="input-field" required 
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Droplets className="w-4 h-4 text-blue-400" /> Humidity (%)
          </label>
          <input 
            type="number" step="0.1" name="humidity" 
            value={formData.humidity} onChange={handleChange}
            className="input-field" required 
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Wind className="w-4 h-4 text-gray-400" /> Wind Speed (km/h)
          </label>
          <input 
            type="number" step="0.1" name="wind_speed" 
            value={formData.wind_speed} onChange={handleChange}
            className="input-field" required 
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <CloudRain className="w-4 h-4 text-blue-300" /> Rainfall (mm)
          </label>
          <input 
            type="number" step="0.1" name="rainfall" 
            value={formData.rainfall} onChange={handleChange}
            className="input-field" required 
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <TreeDeciduous className="w-4 h-4 text-green-500" /> Vegetation Index (0-1)
          </label>
          <input 
            type="number" step="0.01" min="0" max="1" name="vegetation" 
            value={formData.vegetation} onChange={handleChange}
            className="input-field" required 
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary mt-6 flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : "Analyze Risk"}
        </button>

      </form>
    </motion.div>
  );
}
