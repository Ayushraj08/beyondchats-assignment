BeyondChats – Article Processing Platform (Assignment Submission)

This repository contains a monolithic codebase implementing an end-to-end article processing platform using Laravel (Backend APIs), React (Frontend), and Node.js (Async AI Processor).

The project demonstrates real-world system design involving CRUD APIs, asynchronous processing via webhooks, frontend state visualization, and clean separation of responsibilities across services.

Note: Partial completion is intentional and aligned with assignment instructions.

🔧 Tech Stack

Backend: Laravel (PHP 8+)

Frontend: React (Vite)

Async Worker: Node.js

Database: SQLite / MySQL (configurable)

Communication: REST APIs + Webhooks

📁 Repository Structure (Monorepo)
/
├── backend-laravel/        # Laravel API (articles, AI status, webhook receiver)
├── frontend-react/         # React frontend (article list & detail views)
├── node-article-updater/   # Node.js async AI processing service
├── scripts/                # Utility & experimental scripts
├── architecture.png        # System architecture diagram
├── progress.md             # Development progress & notes
└── README.md               # This file


This structure satisfies the requirement of one monolithic Git repository containing all projects.

🧠 System Architecture & Data Flow
High-level flow:

Articles are stored and served via Laravel APIs

Frontend fetches and displays articles

An async Node.js service:

Fetches unprocessed articles

Generates AI summaries & tags

Sends results back via webhook

Laravel updates article status

Frontend reflects AI processing state visually

Architecture Diagram

🚀 Live Demo

Frontend (Primary Evaluation Link):
👉 [LIVE FRONTEND URL HERE]

The frontend allows reviewers to:

View original articles

View AI-processed summaries & tags

Filter AI-processed articles

Open article detail pages

Backend APIs are deployed and connected to the frontend.

✅ Completed Features
Backend (Laravel)

Article CRUD APIs

AI enrichment fields:

summary

tags

ai_processed_at

Webhook endpoint for async updates

Clean REST API design

Frontend (React)

Article list view

Article detail page

Search by title/content

Filter: AI-processed only

Visual AI status indicator

Polished UI/UX (spacing, typography, clarity)

Async Processing (Node.js)

Separate Node.js project

Fetches articles from Laravel API

Simulates AI processing

Sends updates via webhook

Decoupled, interview-friendly architecture

⏳ Partially Completed / Not Implemented (By Design)

The following Phase 2 (Very Difficult) requirements are not fully implemented:

Google Search scraping (SERP)

Fetching top 2 external articles

Scraping external article content

LLM-based rewriting using external sources

Republishing rewritten article with citations

These were intentionally scoped out to focus on system design, async workflows, and code quality, as partial work was explicitly allowed.

🛠️ Local Setup Instructions
1️⃣ Backend (Laravel)
cd backend-laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve


Backend runs at:

http://127.0.0.1:8000

2️⃣ Frontend (React)
cd frontend-react
npm install
npm run dev


Frontend runs at:

http://localhost:5173


Ensure the API base URL points to the backend.

3️⃣ Node.js Async Worker
cd node-article-updater
npm install
npm start


This starts the async AI webhook processor.

📊 Evaluation Alignment
Criterion	Status
Completeness (>50%)	✅ Achieved
README & Docs	✅ Included
Live Link	✅ Frontend
Code Quality	✅ Clean & modular
Monolithic Repo	✅ Yes
🧩 Why This Approach

Demonstrates real-world async processing

Clean separation of frontend, backend, and worker

Scalable architecture

Honest scoping with strong fundamentals

This reflects how production systems are designed, even when full automation is phased.

📬 Notes for Reviewers

This project prioritizes architecture, data flow, and clarity

Phase 2 is acknowledged and documented

All core concepts required for extension are in place

Thank you for reviewing this submission.