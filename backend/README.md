# 🧠 PyroGuard AI - Predictive Engine

The **Intelligence Layer** of PyroGuard AI. This Python-driven engine handles the complex mathematical modeling and real-time inference required for forest fire risk prediction.

## 🔬 Machine Learning Pipeline

### **Model Architecture**
The engine utilizes a **Random Forest Regressor** ensemble. This choice was driven by the model's robustness against noise and its ability to capture non-linear relationships between climatic variables.

### **Mathematical Foundation (Data Synthesis)**
The model is trained on synthesized environmental data based on the following risk logic:
- **Thermal Stress**: $T > 30°C$ significantly increases risk.
- **Surface Aridity**: Risk is inversely proportional to humidity levels.
- **Oxygen Supply**: High wind speeds ($> 25 km/h$) act as a catalyst for fire spread.
- **Precipitation Buffer**: Rainfall provides a drastic reduction in probability.
- **Biomass Load**: Vegetation density (0-1) acts as the fuel constant.

### **Normalization & Scaling**
All incoming real-time data is normalized to a $(0, 1)$ range before inference to ensure feature parity:
- **Temperature**: Scaled between $10°C$ and $45°C$.
- **Humidity**: Inversion scaling (lower humidity = higher risk weight).
- **Wind**: Linear scaling up to $50 km/h$.

## 📡 API Reference

### `POST /predict`
The core inference endpoint.
- **Payload**: `JSON` containing climatic variables.
- **Returns**: Risk probability $(\%)$, Risk level classification, and critical alert flags.

### `GET /history`
Synthesizes a 30-day "Dynamic Trend" using a random walk algorithm with localized variance to simulate realistic environmental fluctuations for the frontend charts.

### `GET /hotspots`
Generates geospatial coordinates for simulated fire hotspots, concentrated around high-risk variance centers.

## 🛠️ Internal Structure
- `main.py`: FastAPI application routing and middleware configuration.
- `model.py`: The `FireRiskModel` class managing the Scikit-Learn lifecycle.
- `requirements.txt`: Minimalist dependency list for fast containerization.

## ⚡ Execution
The engine is designed to be lightweight and stateless. It supports high-concurrency requests via `uvicorn` and can be easily wrapped in Docker for cloud deployment.

---
Built with Python & Scikit-Learn for Environmental Conservation.
