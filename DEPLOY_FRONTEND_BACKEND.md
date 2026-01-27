# Deploying Frontend and Backend Separately on Vercel

Your project has both frontend and backend, which need to be deployed as **two separate Vercel projects**.

## Current Situation

✅ Backend is deployed and running  
❌ Frontend needs to be deployed separately

## Solution: Deploy Frontend as a Separate Project

### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 2: Deploy Frontend

```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** Yes
- **Which scope?** Select your account
- **Link to existing project?** No (create new project)
- **What's your project's name?** `mental-coach-frontend` (or your choice)
- **In which directory is your code located?** `./` (current directory)
- **Want to override the settings?** No

### Step 3: Add Environment Variable

After deployment, add the backend URL:

```bash
vercel env add REACT_APP_API_URL
```

When prompted:
- **Value:** Enter your backend URL (e.g., `https://your-backend-project.vercel.app`)
- **Environments:** Select all (Production, Preview, Development)

### Step 4: Deploy to Production

```bash
vercel --prod
```

## Complete Deployment Steps

### Backend (Already Done ✅)

Your backend is already deployed. If you need to redeploy:

```bash
# From project root
vercel --prod
```

Backend URL example: `https://your-backend-project.vercel.app`

### Frontend (Do This Now)

```bash
# Navigate to frontend
cd frontend

# First deployment
vercel

# Add backend URL
vercel env add REACT_APP_API_URL
# Enter: https://your-backend-project.vercel.app

# Deploy to production
vercel --prod
```

Frontend URL example: `https://your-frontend-project.vercel.app`

## Verification Checklist

After deploying both:

- [ ] Backend URL works: Visit `https://your-backend.vercel.app/` (should show `{"status":"ok"}`)
- [ ] Frontend URL works: Visit `https://your-frontend.vercel.app/` (should show chat interface)
- [ ] Chat functionality works: Send a message and get AI response
- [ ] No CORS errors in browser console (F12)

## Project Structure on Vercel

You should have **TWO separate projects** in your Vercel dashboard:

1. **Backend Project** (e.g., `mental-coach-backend`)
   - Root directory: `/` (project root)
   - Environment variables: `OPENAI_API_KEY`
   - URL: `https://your-backend.vercel.app`

2. **Frontend Project** (e.g., `mental-coach-frontend`)
   - Root directory: `/frontend`
   - Environment variables: `REACT_APP_API_URL`
   - URL: `https://your-frontend.vercel.app`

## Alternative: Deploy via Vercel Dashboard

If you prefer using the web interface:

### Deploy Frontend via Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository (if connected)
4. **Important:** Set the **Root Directory** to `frontend`
5. Framework Preset: Create React App (auto-detected)
6. Add environment variable:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-backend.vercel.app`
7. Click "Deploy"

## Troubleshooting

### "Frontend shows blank page"

**Check:**
1. Browser console for errors (F12)
2. Vercel build logs for errors
3. Environment variable `REACT_APP_API_URL` is set correctly

**Solution:**
```bash
cd frontend
vercel env add REACT_APP_API_URL
# Enter your backend URL
vercel --prod
```

### "Cannot connect to backend"

**Check:**
1. Backend URL is correct in `REACT_APP_API_URL`
2. Backend is deployed and running
3. No typos in the URL (no trailing slash)

**Test backend:**
```bash
curl https://your-backend.vercel.app/
# Should return: {"status":"ok"}
```

### "Environment variable not found"

**Solution:**
```bash
cd frontend
vercel env ls  # List all variables
vercel env add REACT_APP_API_URL  # Add if missing
vercel --prod  # Redeploy
```

## Quick Commands Reference

### Deploy Backend
```bash
# From project root
vercel --prod
```

### Deploy Frontend
```bash
# From project root
cd frontend
vercel --prod
```

### Update Environment Variables
```bash
# Backend
vercel env add OPENAI_API_KEY

# Frontend
cd frontend
vercel env add REACT_APP_API_URL
```

### Check Deployments
```bash
vercel ls  # List all deployments
```

## What's Next?

After both are deployed:

1. ✅ Test the chat functionality
2. ✅ Share your frontend URL (this is what users will visit)
3. ✅ Monitor usage in Vercel dashboard
4. ✅ Post on LinkedIn about your achievement!

## Important Notes

- **Frontend URL** is what you share with users
- **Backend URL** is only used by the frontend (set in environment variable)
- Both projects can have the same GitHub repository but different root directories
- Environment variables must be set separately for each project
- After changing environment variables, always redeploy

## Example URLs

After deployment, you'll have:
- **Frontend:** `https://mental-coach-frontend.vercel.app` ← Share this!
- **Backend:** `https://mental-coach-backend.vercel.app` ← Used internally

Users only need the frontend URL to use your app!
