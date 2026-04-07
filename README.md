# Derma-Guide AI 🩺✨

Derma-Guide AI is an interactive, AI-powered progressive web application (PWA) designed to provide early, non-diagnostic skin condition triage and guidance. By combining edge-ready machine learning with rapid symptom surveying, Derma-Guide offers users instant feedback, urgency scoring, and next-step recommendations for dermatological concerns.

![Derma-Guide Interface Mockup](https://via.placeholder.com/800x400?text=Derma-Guide+AI)

## 🌟 Key Features

- **AI Skin Classification**: Utilizes a customized TensorFlow MobileNetV2 model to analyze user-uploaded or camera-captured images for a variety of localized skin conditions (e.g., ringworm, impetigo, cellulitis).
- **Reactive Symptom Survey**: Pairs visual analysis with a dynamic clinical questionnaire (assessing pain, duration, spreading, and fever) to assign a realistic urgency modifier.
- **Smart Triage Engine**: Returns an algorithmic urgency status—_Routine_, _See Doctor_, or _Seek Care Today_—empowering users to make safer health decisions.
- **Persistent Medical History**: A fully isolated, local-first Zustand architectural store securely saves personal consultation history and survey logs across guest or authenticated sessions.
- **Beautiful Dark Mode UI**: Built with Next.js 15, Tailwind v4, and Framer Motion, featuring glassmorphism elements, CSS-animated starry backdrops, and interactive accordion-style widgets.

## 🏗️ Architecture

The repository is structured as a full-stack monorepo:
1. **Frontend**: A Next.js (React 19) App Router application utilizing Tailwind CSS for styling, `framer-motion` for complex physics animations, and `zustand` for persistent client-side state management.
2. **Backend**: A robust FastAPI (Python) service wrapping a pre-trained TensorFlow/Keras computer vision pipeline.

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0
- Python == 3.10+
- `npm` or `yarn`

### 1. Launch the Backend API
The backend requires a Python virtual environment to serve the TensorFlow model.
```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```
_The API will begin serving requests at `http://127.0.0.1:8000`._

### 2. Launch the Frontend Application
In a separate terminal window, start the Next.js development server.
```bash
npm install
npm run dev
```
_The application will be accessible at `http://localhost:3000`._

### 3. Upload to GitHub
To easily upload or update your project on GitHub, run these commands in the root directory:
```bash
# Stage all your changes
git add .

# Commit the changes with a message (you can change the message)
git commit -m "Update project files"

# Push to your repository (assuming you already added the remote origin)
git push origin main
```

## 📋 Disclaimer

**Derma-Guide AI is strictly a decision-support tool, not a diagnostic medical device.** It focuses on safety, clarity, and accessibility, but its predictions are probabilistic. Users should always consult a licensed medical professional for formal diagnoses and treatment plans.

## 📄 License

This task is licensed under the MIT License.
