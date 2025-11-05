# Workout Tracker Web App

A full-stack workout tracker designed to make building, tracking, and analyzing workouts intuitive and data-driven.  
Built with **React (TypeScript)**, **TailwindCSS**, **FastAPI**, **Supabase**, and **MongoDB**.  
This project focuses on a web-first experience with long-term goals to support both web and mobile from a shared codebase.

---

## Tech Stack

**Frontend:** React + TypeScript + TailwindCSS  
**Backend:** Python + FastAPI  
**Databases:** Supabase (PostgreSQL) for operational data, MongoDB for historical and analytical logs  
**Frontend Deployment:** Vercel  
**Backend Deployment:** Render  
**Auth:** Supabase Auth with Google OAuth  
**Async Task Queue (planned):** Celery + Redis

---

## Product Overview

The Workout Tracker is designed for fitness enthusiasts who want to:
- Create and follow structured workout plans  
- Track detailed progress over time  
- Receive performance insights and improvement suggestions  
- Maintain data across web and mobile seamlessly  

---

## Product Backlog

### MVP

- [ ] Login with Google Authentication  
- [ ] Persist user session when reopening the app  
- [ ] Delete account and associated data  
- [ ] Log out functionality  
- [ ] Build workouts from saved exercises  
- [ ] Build weekly or bi-weekly workout plans  
- [ ] Visual aid to show muscles targeted by each exercise  
- [ ] Evaluate workout plans for inefficiencies or missing muscle groups  
- [ ] Suggest improvements based on evaluations  
- [ ] Track pre-made workouts  
- [ ] Track single exercises  
- [ ] Remove exercises from tracked workouts  
- [ ] Save and edit reps and weights per exercise  
- [ ] Display reference images for exercises  
- [ ] Limit custom workout plans (10), workouts (20), and exercises (30)  
- [ ] Prevent application spin-down (keep backend active)  
- [ ] Include base set of exercises, workouts, and plans  
- [ ] Prepare web app for future shared codebase with mobile

---

### Version 2 (First Release Version)

- [ ] Manage user profile data (name, body weight, height)  
- [ ] Compare two workouts or plans (muscles hit, estimated time, etc.)  
- [ ] Create custom exercises  
- [ ] Save and view one-rep max PRs  
- [ ] Duplicate workouts and plans for faster building  
- [ ] View history of logged workouts (e.g., heat map)  
- [ ] Sort saved exercises by muscle group  
- [ ] Suggest workout modifications dynamically during logging  

---

### Version 3

- [ ] Switch between multiple color schemes  
- [ ] Export or share workouts/plans (PDF or shareable link)  
- [ ] Enable workout reminders and progress notifications  
- [ ] Release iOS and Android apps  
- [ ] Sync data seamlessly between web and mobile  
- [ ] Generate automatic yearly summaries ("Year in Review")  
- [ ] View past yearly summaries  

---

## Development Setup

### Prerequisites
- Node.js 20+
- Python 3.11+
- Supabase account
- MongoDB Atlas or local instance

### Running Locally
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
python3 -m venv .venv

# Activate venv (macOS/Linux)
source .venv/bin/activate
# Activate venv (Windows PowerShell)
.venv\Scripts\Activate

pip install --upgrade pip
pip install -r requirements.txt

uvicorn main:app --reload --port 4000
