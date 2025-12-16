"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PredictionForm from '../components/PredictionForm';
import ResultDisplay from '../components/ResultDisplay';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import { Flame, Activity, Map as MapIcon } from 'lucide-react';
import axios from 'axios';

const MapComponent = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full glass-card flex items-center justify-center animate-pulse text-gray-400">Loading Map Data...</div>
});

export default function Home() {
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hotspots, setHotspots] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      try {
        const hRes = await axios.get('http://localhost:8000/history');
        const mapRes = await axios.get('http://localhost:8000/hotspots');
        setHistory(hRes.data);
        setHotspots(mapRes.data);
      } catch (e) {
        console.error("Failed to fetch backend data. Is it running?", e);
      }
    };
    fetchData();
  }, []);

  const handlePredict = async (data: any) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/predict', data);
      setPrediction(res.data);
    } catch (error) {
      console.error(error);
      alert("Prediction failed. Ensure the backend is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 pb-20 gap-8">
      <header className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg shadow-orange-500/20">
            <Flame className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              PyroGuard AI
            </h1>
            <p className="text-sm text-gray-500">Advanced Forest Fire Prediction System</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <span className="flex items-center gap-2"><Activity className="w-4 h-4 text-green-500" /> System Active</span>
          <div className="w-px h-4 bg-white/10"></div>
          <span>v1.0.0</span>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Input */}
        <div className="order-2 lg:order-1 lg:col-span-4 space-y-8">
          <PredictionForm onPredict={handlePredict} loading={loading} />

          {/* History Chart */}
          <div className="glass-card hidden lg:flex flex-col h-64">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">30-Day Risk Trend</h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history}>
                  <defs>
                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="risk" stroke="#f97316" fillOpacity={1} fill="url(#colorRisk)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Visualization */}
        <div className="order-1 lg:order-2 lg:col-span-8 space-y-8">

          {prediction && (
            <ResultDisplay probability={prediction.probability} riskLevel={prediction.risk_level} />
          )}

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-200 flex items-center gap-2">
              <MapIcon className="w-6 h-6 text-orange-500" /> Live Surveillance
            </h2>
            <MapComponent hotspots={hotspots} />
          </div>

          {/* Mobile History */}
          <div className="glass-card lg:hidden h-64 flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Risk Trend</h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history}>
                  <defs>
                    <linearGradient id="colorRiskMobile" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="risk" stroke="#f97316" fillOpacity={1} fill="url(#colorRiskMobile)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
