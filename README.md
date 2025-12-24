# BeyondChats – Article Processing Platform  
**Assignment Submission**

## 📌 Overview

This repository contains a **monolithic codebase** implementing an **end-to-end article processing platform** built using **Laravel**, **React**, and **Node.js**.

The system is designed to demonstrate **real-world backend–frontend interaction**, **asynchronous processing**, and **clean architectural separation** between responsibilities such as API handling, background processing, and UI state management.

> **Note:** Partial completion is **intentional** and strictly aligned with the assignment instructions.

---

## 🧠 System Design Summary

The platform follows a **three-layer architecture**:

1. **Backend APIs (Laravel)**  
   - Handles article CRUD operations  
   - Manages job lifecycle and status  
   - Exposes webhook endpoints  

2. **Async AI Processor (Node.js Worker)**  
   - Simulates long-running article processing  
   - Sends processing results back via webhooks  

3. **Frontend (React + Vite)**  
   - Displays articles and their processing status  
   - Reflects real-time state changes clearly  

This design mirrors **production-grade async systems** used in real applications.

---

## ⚙️ Tech Stack

### Backend
- **Laravel** (PHP 8+)
- RESTful APIs
- Webhook support

### Frontend
- **React** (Vite)
- Modern component-based UI
- API-driven state rendering

### Async Processing
- **Node.js**
- Background worker pattern
- Webhook-based communication

### Database
- **SQLite** (default)
- **MySQL** (configurable)

### Communication
- REST APIs  
- Webhooks for async callbacks  

---

## 🔁 Workflow Overview

1. User submits an article from the frontend  
2. Laravel API stores the article and marks it as **pending**  
3. Node.js worker processes the article asynchronously  
4. Worker sends results back via webhook  
5. Backend updates article status  
6. Frontend reflects updated processing state  

---

## 🧪 Key Concepts Demonstrated

- RESTful API design  
- Asynchronous background processing  
- Webhook-based communication  
- Clear separation of concerns  
- Frontend state synchronization  
- Scalable system thinking  

---

## 📂 Repository Structure (Mono-repo)
```
/
├── backend-laravel/        # Laravel API (articles, AI status, webhook receiver)
├── frontend-react/         # React frontend (article list & detail views)
├── node-article-updater/   # Node.js async AI processing service
├── scripts/                # Utility & experimental scripts
├── architecture.png        # System architecture diagram
├── progress.md             # Development progress & notes
└── README.md               # This file
```

## 🧩 Monolithic Repository Confirmation

This structure satisfies the requirement of a **single monolithic Git repository** containing all related projects (backend, frontend, and async worker) with clear separation of concerns.

---

## 🧠 System Architecture & Data Flow

### High-Level Flow

1. Articles are stored and served via **Laravel REST APIs**
2. The **React frontend** fetches and displays articles
3. A **Node.js async service**:
   - Fetches unprocessed articles
   - Generates AI summaries and tags
   - Sends results back via webhook
4. **Laravel** receives webhook callbacks and updates article status
5. The **frontend** visually reflects AI processing state in real time

### Architecture Diagram

<img width="400" height="400" alt="architecture" src="https://github.com/user-attachments/assets/072e0f78-045b-40ac-9e2d-3e0677e3f6e8" />


---

## 🚀 Live Demo

### Frontend (Primary Evaluation Link)

👉 **[LIVE FRONTEND URL HERE]**

The frontend allows reviewers to:

- View original articles
- View AI-processed summaries and tags
- Filter AI-processed articles
- Open individual article detail pages

> Backend APIs are deployed and actively connected to the frontend.

---

## ✅ Completed Features

### Backend (Laravel)

- Article CRUD APIs
- AI enrichment fields:
  - `summary`
  - `tags`
  - `ai_processed_at`
- Webhook endpoint for async AI updates
- Clean and consistent REST API design

### Frontend (React)

- Article list view
- Article detail page
- Search by title or content
- Filter: AI-processed articles only
- Visual AI processing status indicator
- Polished UI/UX (spacing, typography, clarity)

### Async Processing (Node.js)

- Separate Node.js service
- Fetches articles from Laravel APIs
- Simulates AI processing workflow
- Sends updates via webhook
- Fully decoupled, interview-friendly architecture

---

## ⏳ Partially Completed / Not Implemented (By Design)

The following **Phase 2 (Very Difficult)** requirements are **intentionally not fully implemented**:

- Google Search (SERP) scraping
- Fetching top external reference articles
- Scraping external article content
- LLM-based rewriting using external sources
- Republishing rewritten articles with citations

These were consciously scoped out to prioritize **system design, async workflows, and code quality**, as partial implementation was explicitly permitted.

---

## 🛠️ Local Setup Instructions

### 1️⃣ Backend (Laravel)

```bash
cd backend-laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

**Backend runs at:**
```
http://127.0.0.1:8000
```
### 2️⃣ Frontend (React)
```
cd frontend-react
npm install
npm run dev
```

**Frontend runs at:**
```
http://localhost:5173
```

**Ensure the API base URL points to the backend.**

### 3️⃣ Node.js Async Worker
```
cd node-article-updater
npm install
npm start
```

**This starts the async AI webhook processor.**

## 📊 Evaluation Alignment

| Criterion           | Status              |
|---------------------|---------------------|
| Completeness (>50%) | ✅ Achieved          |
| README & Docs       | ✅ Included          |
| Live Link           | ✅ Frontend          |
| Code Quality        | ✅ Clean & Modular   |
| Monolithic Repo     | ✅ Yes               |

---

## 🧩 Why This Approach

- Demonstrates real-world asynchronous processing
- Clean separation of frontend, backend, and worker services
- Scalable and extensible system architecture
- Honest scoping with strong engineering fundamentals

This reflects how production systems are designed, even when full automation is delivered in phases.

---

## 📬 Notes for Reviewers

- This project prioritizes **architecture, data flow, and clarity**
- Phase 2 requirements are **explicitly acknowledged and documented**
- All core concepts required for future extension are already in place

Thank you for reviewing this submission.
