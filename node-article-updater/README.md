# 🤖 Node Article Updater (AI Processing Service)

This service is a **Node.js-based asynchronous article processing system** used in the BeyondChats assignment.  
It fetches articles from the Laravel backend, generates AI-based summaries & tags, and updates the backend using APIs.

The service is designed to be **decoupled, non-blocking, and webhook-driven**, making it scalable and interview-friendly.

---

## 📌 Responsibilities

- Fetch articles from Laravel API
- Process article content using an AI (mocked LLM)
- Generate:
  - Summary
  - Tags
- Send enriched data back to Laravel
- Run asynchronously using webhook triggers

---

## 🏗 Architecture Overview

Laravel Backend
|
| POST /api/articles/{id}/trigger-ai
|
Node Webhook Server
|
| Fetch articles
| AI summarization
| Update article
|
Laravel Backend (updated)

yaml
Copy code

> The backend remains non-blocking while AI processing runs independently.

---

## 📁 Folder Structure

node-article-updater/
│
├── src/
│ ├── index.js # Entry point
│ ├── server.js # Webhook server
│ ├── fetchArticles.js # Fetch articles from Laravel
│ ├── processArticles.js # Core processing logic
│ └── llm.js # Mock AI summarizer
│
├── scripts/ # Optional helper scripts
├── .env.example # Environment variable template
├── package.json
├── README.md
└── progress.md

yaml
Copy code

---

## ⚙️ Setup Instructions (Local)

### 1️⃣ Install dependencies
```bash
cd node-article-updater
npm install
2️⃣ Create environment file
bash
Copy code
cp .env.example .env
3️⃣ Configure .env
env
Copy code
LARAVEL_API_BASE=http://127.0.0.1:8000/api
WEBHOOK_PORT=3001
4️⃣ Start the service
bash
Copy code
npm start
You should see:

arduino
Copy code
🚀 AI Webhook Server running on port 3001
🔁 How Processing Works
Laravel triggers AI processing via API

Node webhook server receives the request

Node service:

Fetches article content

Generates summary & tags

Sends results back to Laravel

Laravel updates article with AI fields

🧠 AI Processing Logic
AI is mocked intentionally for assignment clarity

No external API dependency

Logic located in src/llm.js

Example output:

js
Copy code
{
  summary: "Short AI-generated summary...",
  tags: ["chatbot", "ai", "customer-support"]
}
This keeps the system deterministic, testable, and review-friendly.

⚠️ Known Limitations (Intentional)
No real Google Search scraping

No external LLM API integration

No queue system (Redis / SQS)

These were intentionally skipped as partial completion is acceptable, and the focus was on architecture and async flow.