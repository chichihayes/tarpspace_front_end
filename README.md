# TarpSpace Frontend

React + Vite frontend for the TarpSpace matching engine.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
VITE_SUPABASE_URL=https://iflqhoiftevqfunvdjbo.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmbHFob2lmdGV2cWZ1bnZkamJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0MjY1NjQsImV4cCI6MjA5MDAwMjU2NH0.IUW7V7UIboq_h7oVUo2lEBewsvL2cSnxljCIbEIF9K4
VITE_API_URL=http://localhost:8000
```

3. Run locally:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Deploying to Vercel

1. Push this folder to GitHub
2. Go to vercel.com → New Project → Import repo
3. Add the environment variables from `.env`
4. Change `VITE_API_URL` to your deployed backend URL
5. Deploy

## Screens

- `/login` — Sign in or create account
- `/search` — Search the marketplace and see match results
- `/history` — View past searches
- `/agents` — Browse all agents in inventory
