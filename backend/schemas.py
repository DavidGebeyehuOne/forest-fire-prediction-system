from pydantic import BaseModel, Field
from typing import List, Optional

class PredictionRequest(BaseModel):
    temperature: float = Field(..., description="Temperature in Celsius")
    humidity: float = Field(..., description="Relative humidity percentage")
    wind_speed: float = Field(..., description="Wind speed in km/h")
    rainfall: float = Field(..., description="Recent rainfall in mm")
    vegetation: float = Field(..., description="Vegetation density index (0-1)")

class RiskAnalysis(BaseModel):
    feature: str
    contribution: float
    impact: str

class PredictionResponse(BaseModel):
    probability: float
    risk_level: str
    alert: bool
    analysis: List[RiskAnalysis]

class Hotspot(BaseModel):
    lat: float
    lng: float
    risk: str

class HistoryPoint(BaseModel):
    day: str
    risk: float
