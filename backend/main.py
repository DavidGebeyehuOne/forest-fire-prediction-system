from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import fire_model
from schemas import PredictionRequest, PredictionResponse, Hotspot, HistoryPoint
import random
import logging

# Setup Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="PyroGuard AI Engine",
    description="Advanced ML Backend for Forest Fire Prediction",
    version="1.0.0"
)

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict", response_model=PredictionResponse)
def predict_fire_risk(data: PredictionRequest):
    try:
        logger.info(f"Received prediction request: {data}")
        prob, analysis = fire_model.predict(
            data.temperature, 
            data.humidity, 
            data.wind_speed, 
            data.rainfall, 
            data.vegetation
        )
        level = fire_model.get_risk_level(prob)
        
        return {
            "probability": prob,
            "risk_level": level,
            "alert": level in ["High", "Critical"],
            "analysis": analysis
        }
    except Exception as e:
        logger.error(f"Prediction failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal AI Engine Error")

@app.get("/history", response_model=list[HistoryPoint])
def get_history():
    # Mock historical data using a more 'natural' random walk
    history = []
    base_risk = 0.3
    for i in range(30):
        base_risk += random.uniform(-0.08, 0.08)
        base_risk = max(0.1, min(0.9, base_risk))
        history.append({
            "day": f"Day {i+1}",
            "risk": round(base_risk, 2)
        })
    return history

@app.get("/hotspots", response_model=list[Hotspot])
def get_hotspots():
    # Simulated hotspots with varied risk levels
    center_lat = 37.7749
    center_lng = -122.4194
    
    hotspots = []
    for _ in range(8):
        hotspots.append({
            "lat": center_lat + random.uniform(-0.6, 0.6),
            "lng": center_lng + random.uniform(-0.6, 0.6),
            "risk": random.choice(["Medium", "High", "Critical"])
        })
    return hotspots

@app.get("/status")
def get_status():
    return {"status": "operational", "model": "RandomForestRegressor", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
