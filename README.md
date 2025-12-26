# 🔥 PyroGuard AI: Advanced Forest Fire Prediction System

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-v0.100+-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-Latest-F7931E?style=for-the-badge&logo=scikit-learn)](https://scikit-learn.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**PyroGuard AI** is a state-of-the-art, full-stack predictive platform designed to mitigate the devastating impact of forest fires. By synthesizing real-time climatic variables with advanced Machine Learning, it provides high-precision risk assessments and live surveillance capabilities.

---

## 🏗️ System Architecture

The project follows a decoupled client-server architecture:

- **Frontend (The Observer)**: A Next.js 15 application featuring a premium "Midnight Obsidian" dashboard. It handles data visualization, interactive mapping, and user interaction.
- **Backend (The Intelligence)**: A FastAPI service that manages the Machine Learning lifecycle—from training the Random Forest model to serving real-time inference.
- **ML Model**: A high-efficiency Random Forest Regressor optimized for environmental data analysis.

---

## 🎨 Frontend: The Observer Dashboard

Built with a professional, dark-mode aesthetic for long-shift monitoring in command centers.

### **Design Philosophy: "Midnight Obsidian"**
- **Glassmorphism**: UI components utilize a backdrop-blur effect (`.glass-card`) for depth and focus.
- **Micro-interactions**: Framer Motion handles the 'breathiness' of the UI, making it feel alive and responsive.

### **Core Components**
- **`PredictionForm`**: Specialized input suite for environmental variables (Temp, Humidity, Wind, etc.).
- **`ResultDisplay`**: Translates probability scores into actionable intelligence with color-coded alerts and probability gauges.
*   **`Live Map`**: Interactive surveillance layer displaying coordinated hotspots and active zones.
*   **`Risk Trend Chart`**: Visualizes 30-day "Risk Trajectories" to identify seasonal patterns using Recharts.

---

## 🧠 Backend: The Predictive Engine

A Python-driven engine handling complex mathematical modeling and real-time inference.

### **ML Pipeline & Logic**
- **Architecture**: Random Forest Regressor ensemble, chosen for robustness against noise and non-linear relationship capture.
- **Data Normalization**: Incoming data is scaled to a (0,1) range based on environmental bounds:
    - **Thermal Stress**: $T > 30°C$ increases risk.
    - **Surface Aridity**: Inverse relationship with humidity.
    - **Oxygen Supply**: High wind speeds act as a catalyst.
- **Contribution Analysis**: The engine calculates the specific impact of each environmental factor on the final risk score, providing transparency (XAI).

---

## 🚀 Key Features

1.  **Precision Risk Prediction**: Instant probability scores based on 5 key environmental metrics.
2.  **Live Surveillance Map**: Real-time visualization of hotspots for strategic deployment.
3.  **Historical Trend Analysis**: 30-day risk patterns to identify emerging threats.
4.  **System Health Monitoring**: Real-time status indicators for backend connectivity.

---

## 📡 API Reference

| Feature | Endpoint | Method | Response |
| :--- | :--- | :--- | :--- |
| **Prediction** | `/predict` | `POST` | Probability, Risk Level, Factor Analysis |
| **Hotspots** | `/hotspots` | `GET` | List of coordinate-based risk points |
| **History** | `/history` | `GET` | 30-day risk trend data |
| **Status** | `/status` | `GET` | Operational health of the AI module |

---

## 🛠️ Tech Stack & Dependencies

### **Frontend**
- Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Recharts, Axios, Lucide Icons.

### **Backend**
- Python, FastAPI, Scikit-Learn, Pandas, NumPy, Joblib, Uvicorn.

---

## 🚦 Getting Started

### **The Quick Start (Full-Stack)**

1. **Initialize Intelligence (Backend)**:
   ```bash
   cd backend
   pip install -r requirements.txt
   python main.py
   ```
   *Runs on `http://localhost:8000`*

2. **Initialize Interface (Frontend)**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   *Runs on `http://localhost:3000`*

---

## 📄 License
This project is licensed under the MIT License.

---
Developed with ❤️ for a Greener Future.
