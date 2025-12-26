# 🌲 PyroGuard AI - Frontend Observer

Welcome to the **Front-end Intelligence** layer of PyroGuard AI. This module provides a high-fidelity dashboard for environmental monitoring, predictive analytics, and spatial risk visualization.

## 🎨 Design Philosophy: "Midnight Obsidian"
The interface is crafted with a professional, dark-mode aesthetic designed for long-shift monitoring in command centers. 
- **Glassmorphism**: All UI components utilize a backdrop-blur effect (`.glass-card`) for depth and focus.
- **Dynamic Gradients**: Specifically tuned orange-to-red gradients (`from-orange-500 to-red-600`) represent fire intensity.
- **Micro-interactions**: Framer Motion handles the 'breathiness' of the UI, making it feel alive and responsive.

## 🧱 Component Architecture

### 1. **`PredictionForm.tsx`**
The primary data ingestion point. It provides a specialized input suite for environmental variables including:
- **Climatic Inputs**: Temperature (°C), Humidity (%), Wind Speed (km/h), and Rainfall (mm).
- **Environmental Context**: Vegetation density index using a specialized range slider.

### 2. **`ResultDisplay.tsx`**
A high-impact data visualization component that translates probability scores into actionable intelligence:
- **Risk Level Alerts**: Color-coded indicators (Green → Red).
- **Probability Gauges**: High-contrast display for immediate recognition.

### 3. **`Map.tsx`**
An interactive surveillance layer using `react-leaflet` (or similar) to display coordinated hotspots. It provides:
- **Hotspot Pinpoints**: High-risk locations identified by the backend.
- **Live Overlays**: Visual representation of "Active Surveillance" zones.

### 4. **`ResultDisplay.tsx`**
Renders complex data trends using **Recharts**, providing a 30-day "Risk Trajectory" to identify seasonal patterns.

## 🛠️ Performance Optimizations
- **Dynamic Imports**: Map components are dynamically loaded with a pulse-animation fallback to ensure fast TTI (Time to Interactive).
- **Tailwind JIT**: Custom glassmorphism utilities are pre-compiled for minimal CSS footprint.
- **Axios Interceptors**: Global error handling for backend connectivity issues.

## 📡 Backend Communication
The frontend is pre-configured to talk to the FastAPI engine at `localhost:8000`. 

| Feature | Endpoint | Method |
| :--- | :--- | :--- |
| Prediction | `/predict` | `POST` |
| Risk History | `/history` | `GET` |
| Hotspots | `/hotspots` | `GET` |

## 🚀 Deployment
Optimal hosting includes **Vercel** or **Netlify**. Ensure the `NEXT_PUBLIC_API_URL` environment variable points to your deployed backend.

---
Part of the **PyroGuard AI** ecosystem.
