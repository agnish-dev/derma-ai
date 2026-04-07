import os
import json
import io
import base64
import numpy as np
import tensorflow as tf
from PIL import Image
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from utils import map_triage_level

app = FastAPI(title="Derma Guide Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and class indices
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'model.h5')
CLASS_INDICES_PATH = os.path.join(BASE_DIR, 'class_indices.json')

model = None
class_indices = None
idx_to_class = None

@app.on_event("startup")
async def load_model():
    global model, class_indices, idx_to_class
    if os.path.exists(MODEL_PATH) and os.path.exists(CLASS_INDICES_PATH):
        print("Loading Model...")
        model = tf.keras.models.load_model(MODEL_PATH)
        with open(CLASS_INDICES_PATH, 'r') as f:
            class_indices = json.load(f)
            idx_to_class = {v: k for k, v in class_indices.items()}
        print("Model loaded.")
    else:
        print("Warning: Model or class indices not found. Run train.py first.")

class SurveyData(BaseModel):
    duration: str
    pain: str
    spreading: str
    history: str
    fever: str

class ClassifyRequest(BaseModel):
    image: str # Base64
    survey: SurveyData

def process_image(img_base64):
    if img_base64.startswith('data:image'):
        img_base64 = img_base64.split(',')[1]
    img_data = base64.b64decode(img_base64)
    img = Image.open(io.BytesIO(img_data)).convert('RGB')
    img = img.resize((224, 224))
    img_arr = np.array(img) / 255.0
    img_arr = np.expand_dims(img_arr, axis=0)
    return img_arr

@app.post("/classify")
async def classify_endpoint(req: ClassifyRequest):
    if model is None:
        raise HTTPException(status_code=503, detail="Model is not loaded.")
    
    try:
        img_arr = process_image(req.image)
        predictions = model.predict(img_arr)
        pred_idx = np.argmax(predictions[0])
        predicted_class = idx_to_class[pred_idx]
        confidence = float(np.max(predictions[0]))

        # Calculate triage based on predicted class + survey details
        danger_level = map_triage_level(predicted_class, req.survey.dict())

        return {
            "predicted_class": predicted_class,
            "confidence": confidence,
            "danger_level": danger_level
        }
    except Exception as e:
        print(f"Error during classification: {e}")
        raise HTTPException(status_code=500, detail="Internal server error during classification")
