# 🤖 Mr. Bob — AI Interview Platform

Mr. Bob is an AI-powered technical interview platform that conducts interviews based on a candidate's resume.

## Screenshot
![alt text](<Screenshot 2026-09-19 194846.png>)

## ✨ Features

- 📄 Resume-based interview questions
- 🤖 AI interviewer using Google Gemini
- 🧠 LangChain + LangGraph for interview flow
- 💬 Real-time interview conversation
- 🔊 Text-to-Speech for AI questions
- 🎤 Speech-to-Text for candidate answers
- 📝 Interview transcript
- 🍪 HTTP-only interview session
- 📱 Responsive React UI

## 🛠️ Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- LangChain
- LangGraph
- Google Gemini

## 🔄 How It Works

```text
Resume Upload
      ↓
Create Interview Session
      ↓
LangGraph
      ↓
AI generates question
      ↓
Text-to-Speech 🔊
      ↓
Candidate answers 🎤
      ↓
Speech-to-Text
      ↓
Send Answer
      ↓
LangGraph
      ↓
Next Question
```

## 📁 Project Structure

```text
Mr-Bob/
│
├── frontend/
│   ├── src/
│   └── ...
│
└── backend/
    ├── agents/
    ├── config/
    ├── controller/
    ├── graph/
    ├── model/
    ├── routes/
    ├── services/
    └── ...
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Mr-Bob
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```env
GOOGLE_API_KEY=your_google_api_key
MONGODB_URI=your_mongodb_uri
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/interview/start` | Start a new interview |
| GET | `/api/interview/current` | Get current interview |
| POST | `/api/interview/chat` | Submit candidate answer |
| POST | `/api/interview/end` | End interview and get transcript |

## 🎯 Future Improvements

- Interview performance analysis
- Adaptive interview difficulty
- Detailed candidate feedback
- Improved voice interaction
- More natural AI voices
- Interview scoring

---

**Built with ❤️ by Shreya using React, Node.js, LangGraph and Gemini**