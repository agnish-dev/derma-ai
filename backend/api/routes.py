"""
API routes — FastAPI router containing the classification endpoint.
"""

from fastapi import APIRouter, HTTPException

from schemas.models import ClassifyRequest, ClassifyResponse
from ml.vision import preprocess_image, predict
from utils import map_triage_level

router = APIRouter()


@router.post("/classify", response_model=ClassifyResponse)
async def classify_endpoint(req: ClassifyRequest):
    """
    Accept a base64 image and survey data, run the ML model,
    calculate triage urgency, and return a structured response.
    """
    from ml.vision import model  # runtime check

    if model is None:
        raise HTTPException(
            status_code=503,
            detail="Model is not loaded. Please ensure model.h5 exists.",
        )

    try:
        img_arr = preprocess_image(req.image)
        predicted_class, confidence = predict(img_arr)

        # Combine ML prediction with survey answers for triage
        danger_level = map_triage_level(predicted_class, req.survey.dict())

        return ClassifyResponse(
            predicted_class=predicted_class,
            confidence=confidence,
            danger_level=danger_level,
        )
    except Exception as e:
        print(f"Error during classification: {e}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error during classification.",
        )
