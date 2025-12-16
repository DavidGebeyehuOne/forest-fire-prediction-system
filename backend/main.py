from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from model import fire_model
import random

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionRequest(BaseModel):
    temperature: float
    humidity: float
    wind_speed: float
    rainfall: float
    vegetation: float

@app.post("/predict")
def predict_fire_risk(data: PredictionRequest):
    prob = fire_model.predict(
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
        "alert": level in ["High", "Critical"]
    }

@app.get("/history")
def get_history():
    # Mock historical data for charts
    history = []
    # Generate some fake daily trend
    base_risk = 0.3
    for i in range(30):
        base_risk += random.uniform(-0.1, 0.1)
        base_risk = max(0, min(1, base_risk))
        history.append({
            "day": f"Day {i+1}",
            "risk": base_risk
        })
    return history

@app.get("/hotspots")
def get_hotspots():
    # Mock hotspots for the map
    # Centered around a generic location for demo purposes (e.g., California/Amazon)
    # Let's use random points near a center
    center_lat = 37.7749
    center_lng = -122.4194
    
    hotspots = []
    for _ in range(5):
        hotspots.append({
            "lat": center_lat + random.uniform(-0.5, 0.5),
            "lng": center_lng + random.uniform(-0.5, 0.5),
            "risk": random.choice(["High", "Critical"])
        })
    return hotspots

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
