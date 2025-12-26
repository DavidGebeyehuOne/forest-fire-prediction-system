import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib
import os

MODEL_PATH = "forest_fire_model.pkl"

class FireRiskModel:
    def __init__(self):
        self.model = None
        self.load_or_train()

    def generate_synthetic_data(self, n_samples=1000):
        np.random.seed(42)
        # Features: Temperature (C), Humidity (%), Wind Speed (km/h), Rainfall (mm), Vegetation (0-1)
        
        data = {
            'temperature': np.random.uniform(10, 45, n_samples),
            'humidity': np.random.uniform(10, 90, n_samples),
            'wind_speed': np.random.uniform(0, 50, n_samples),
            'rainfall': np.random.uniform(0, 20, n_samples),
            'vegetation': np.random.uniform(0, 1, n_samples)
        }
        
        df = pd.DataFrame(data)
        
        # Risk Algorithm for labelling (Simulation)
        # Heat + Dryness + Wind = High Risk
        # Rain reduces risk drastically
        
        # Normalize inputs for formula
        temp_n = (df['temperature'] - 10) / 35
        hum_inv_n = (90 - df['humidity']) / 80
        wind_n = df['wind_speed'] / 50
        rain_inv_n = (20 - df['rainfall']) / 20
        
        # Synthesize risk score (0 to 1) with some noise
        risk_score = (
            0.4 * temp_n + 
            0.3 * hum_inv_n + 
            0.2 * wind_n + 
            0.1 * rain_inv_n + 
            0.1 * df['vegetation'] # Denser vegetation can mean more fuel, but initialized wet vegetation is safer. Let's assume dry fuel logic so +risk.
        )
        
        # Add random noise
        risk_score += np.random.normal(0, 0.05, n_samples)
        risk_score = np.clip(risk_score, 0, 1)
        
        return df, risk_score

    def train(self):
        print("Training new model...")
        X, y = self.generate_synthetic_data()
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.model.fit(X_train, y_train)
        
        score = self.model.score(X_test, y_test)
        print(f"Model trained. R^2 Score: {score}")
        
        joblib.dump(self.model, MODEL_PATH)

    def load_or_train(self):
        if os.path.exists(MODEL_PATH):
            try:
                self.model = joblib.load(MODEL_PATH)
                print("Model loaded from disk.")
            except:
                self.train()
        else:
            self.train()

    def normalize_input(self, temperature, humidity, wind_speed, rainfall, vegetation):
        """Normalize inputs to (0, 1) range based on environmental bounds."""
        return {
            'temperature': (temperature - 10) / 35,
            'humidity': (90 - humidity) / 80, # Inverse: lower humidity = higher risk
            'wind_speed': wind_speed / 50,
            'rainfall': (20 - rainfall) / 20, # Inverse: lower rain = higher risk
            'vegetation': vegetation
        }

    def predict(self, temperature, humidity, wind_speed, rainfall, vegetation):
        if not self.model:
            self.load_or_train()
            
        input_data = pd.DataFrame([{
            'temperature': temperature,
            'humidity': humidity,
            'wind_speed': wind_speed,
            'rainfall': rainfall,
            'vegetation': vegetation
        }])
        
        prediction = self.model.predict(input_data)[0]
        prob = max(0.0, min(1.0, prediction))
        
        # Performance "Contribution Analysis" (Simulated based on feature influence)
        normalized = self.normalize_input(temperature, humidity, wind_speed, rainfall, vegetation)
        analysis = []
        weights = {'temperature': 0.4, 'humidity': 0.3, 'wind_speed': 0.2, 'rainfall': 0.1, 'vegetation': 0.1}
        
        for feature, val in normalized.items():
            contribution = val * weights.get(feature, 0.1)
            analysis.append({
                "feature": feature.replace('_', ' ').title(),
                "contribution": round(contribution, 2),
                "impact": "High" if val > 0.7 else "Moderate" if val > 0.4 else "Low"
            })
            
        return prob, analysis

    def get_risk_level(self, probability):
        if probability < 0.3:
            return "Low"
        elif probability < 0.6:
            return "Medium"
        elif probability < 0.8:
            return "High"
        else:
            return "Critical"

fire_model = FireRiskModel()
