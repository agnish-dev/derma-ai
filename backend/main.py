"""
Derma Guide Backend — Application Entry Point

This module creates the FastAPI instance, registers middleware,
mounts API routers, and triggers model loading on startup.

Run with: uvicorn main:app --reload
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from ml.vision import load_model
from api.routes import router as classify_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup / shutdown lifecycle hook."""
    await load_model()
    yield  # app is running
    print("Shutting down Derma Guide Backend.")


app = FastAPI(
    title="Derma Guide Backend",
    description="AI-powered skin condition classification and triage API.",
    version="1.0.0",
    lifespan=lifespan,
)

# ── CORS ────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routes ──────────────────────────────────────────────────────────────
app.include_router(classify_router)
