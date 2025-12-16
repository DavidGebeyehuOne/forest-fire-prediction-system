"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Flame } from 'lucide-react';

interface ResultDisplayProps {
    probability: number;
    riskLevel: string;
}

export default function ResultDisplay({ probability, riskLevel }: ResultDisplayProps) {

    const getColor = (prob: number) => {
        if (prob < 0.3) return 'text-green-500';
        if (prob < 0.6) return 'text-yellow-500';
        if (prob < 0.8) return 'text-orange-500';
        return 'text-red-500';
    };

    const getBgColor = (prob: number) => {
        if (prob < 0.3) return 'bg-green-500';
        if (prob < 0.6) return 'bg-yellow-500';
        if (prob < 0.8) return 'bg-orange-500';
        return 'bg-red-500';
    };

    const percentage = Math.round(probability * 100);

    // Calculate stroke dasharray for the gauge (half circle)
    // Radius = 80, Circumference = 2 * pi * 80 = 502. 
    // Half is 251.
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (probability * circumference) / 2; // only populate half

    // Rotation logic: Map 0-1 to -90 to +90 degrees?
    // Actually simpler with dashoffset on a semi-circle usually.

    // Let's use simple CSS conic gradient or rotation for simplicity and reliability.

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-md mx-auto flex flex-col items-center justify-center p-8 text-center"
        >
            <h3 className="text-xl font-semibold mb-6 text-gray-200">Fire Risk Assessment</h3>

            <div className="relative w-48 h-24 overflow-hidden mb-4">
                {/* Background Arc */}
                <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[12px] border-white/10 box-border"></div>
                {/* Progress Arc - rotated div or simple CSS manipulation */}
                <motion.div
                    initial={{ rotate: -180 }}
                    animate={{ rotate: -180 + (probability * 180) }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`absolute top-0 left-0 w-48 h-48 rounded-full border-[12px] border-b-transparent border-r-transparent border-l-transparent ${getColor(probability).replace('text', 'border')} box-border origin-center`}
                    style={{
                        clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
                        transformOrigin: '50% 50%'
                    }}
                />
                {/* Needle/Value is hard with just divs, let's just center the text */}
            </div>

            <div className="mt-2 text-5xl font-bold text-white mb-2">
                {percentage}%
            </div>

            <div className={`px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${getBgColor(probability)}/20 ${getColor(probability)} border ${getColor(probability).replace('text', 'border')}`}>
                {riskLevel} Risk
            </div>

            <p className="mt-6 text-sm text-gray-400">
                {riskLevel === "Critical" && "Immediate action required. Extreme fire danger."}
                {riskLevel === "High" && "Conditions are dangerous. High likelihood of fire."}
                {riskLevel === "Medium" && "Moderate risk. Exercise caution."}
                {riskLevel === "Low" && "Low risk. Conditions are stable."}
            </p>

        </motion.div>
    );
}
