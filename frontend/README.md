# 🌲 PyroGuard AI - Frontend Observer

Welcome to the **Front-end Intelligence** layer of PyroGuard AI. This module provides a high-fidelity dashboard for environmental monitoring, predictive analytics, and spatial risk visualization.

## 🎨 Design Philosophy: "Midnight Obsidian"
The interface is crafted with a professional, dark-mode aesthetic designed for long-shift monitoring in command centers. 
- **Glassmorphism**: All UI components utilize a backdrop-blur effect (`.glass-card`) for depth and focus.
- **Dynamic Gradients**: Specifically tuned orange-to-red gradients (`from-orange-500 to-red-600`) represent fire intensity.
- **Micro-interactions**: Framer Motion handles the 'breathiness' of the UI, making it feel alive and responsive.

## ⚙️ Getting Started

To get the frontend surveillance dashboard up and running:

### 📥 1. Installation
Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

### 🚀 2. Launch Development Server
```bash
npm run dev
```
The dashboard will be available at [http://localhost:3000](http://localhost:3000).

*Note: Ensure the Python backend is running on port 8000 for predictive data.*

## 🧱 Component Architecture

### 1. **`PredictionForm.tsx`**
The primary data ingestion point. It provides a specialized input suite for environmental variables and supports **Real-time City Search** to auto-populate weather data.

### 2. **`ResultDisplay.tsx`**
A high-impact data visualization component that translates probability scores into actionable intelligence with color-coded risk levels.

### 3. **`Map.tsx`**
A high-tech interactive surveillance layer with scanning animations, pulsing markers, and real-time geocoding.

### 4. **`Risk Trend Chart`**
Renders complex data trends using **Recharts**, providing a 30-day "Risk Trajectory" to identify patterns.

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
