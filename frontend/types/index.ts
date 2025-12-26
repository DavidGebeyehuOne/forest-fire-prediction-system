export interface Hotspot {
    lat: number;
    lng: number;
    risk: string;
}

export interface PredictionAnalysis {
    feature: string;
    contribution: number;
    impact: string;
}

export interface PredictionResponse {
    probability: number;
    risk_level: string;
    alert: boolean;
    analysis: PredictionAnalysis[];
}

export interface WeatherData {
    temperature: number;
    humidity: number;
    wind_speed: number;
    rainfall: number;
    lat: number;
    lng: number;
    cityName: string;
}
