@echo off
title Derma-Guide AI Starter
echo ===================================================
echo   Starting Derma-Guide AI Full Stack Application
echo ===================================================
echo.

:: Launch FastAPI Backend in a new terminal window
echo [SERVER] Initializing Python Backend API...
start "Derma-Guide Backend" cmd /k "cd backend && call .\venv\Scripts\activate.bat && echo Starting Uvicorn Server... && uvicorn main:app --reload || echo Failed to start backend! Make sure venv is configured."

:: Launch Next.js Frontend in a new terminal window
echo [CLIENT] Initializing Next.js Frontend...
start "Derma-Guide Frontend" cmd /k "npm run dev || echo Failed to start frontend! Make sure you ran npm install."

echo.
echo All services have been launched in separate windows!
echo - Web App:    http://localhost:3000
echo - API Server: http://127.0.0.1:8000
echo.
pause
