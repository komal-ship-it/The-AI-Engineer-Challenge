# Deploy Frontend + Backend Together (Single Vercel Project)

This guide shows you how to deploy both the frontend and backend in a **single Vercel project**.

## ✅ What's Been Configured

I've updated the project to support deploying both frontend and backend together:

1. [`vercel.json`](vercel.json) - Configured to build and serve both
2. [`frontend/.env.production`](frontend/.env.production) - Set to use same-origin API calls
3. [`frontend/vercel.json`](frontend/vercel.json) - Frontend-specific config

## How It Works

When deployed together:
- **Frontend** is served at: `https://your-app.vercel.app/`
- **Backend API** is served at: `https://your-app.vercel.app/api/`
- Both run from the same domain (no CORS issues!)

## Deployment Steps

### Step 1: Set Environment Variable

You only need to set the OpenAI API key:

```bash
vercel env add OPENAI_API_KEY
```

When prompted:
- **Value:** Enter your OpenAI API key (e.g., `sk-proj-...`)
- **Environments:** Select all (Production, Preview, Development)

### Step 2: Deploy

From the project root:

```bash
vercel --prod
```

That's it! Both frontend and backend will be deployed together.

## Verification

After deployment, test your app:

1. **Visit your app:** `https://your-app.vercel.app`
   - Should see the chat interface

2. **Test the API:** `https://your-app.vercel.app/api/chat`
   - Backend is accessible at `/api/` path

3. **Send a message:**
   - Type a message in the chat
   - Should get AI response

## Project Structure on Vercel

```
https://your-app.vercel.app/
├── /                    → Frontend (React app)
├── /api/chat           → Backend API endpoint
└── /api/               → All backend routes
```

## Environment Variables Needed

Only one environment variable is required:

| Variable | Value | Where to Set |
|----------|-------|--------------|
| `OPENAI_API_KEY` | `sk-proj-...` | Vercel dashboard or CLI |

The frontend automatically uses the same domain for API calls (no `REACT_APP_API_URL` needed).

## Updating Your Deployment

### If You Already Deployed Backend Separately

If you previously deployed the backend as a separate project, you can:

**Option 1: Keep separate deployments** (see [`DEPLOY_FRONTEND_BACKEND.md`](DEPLOY_FRONTEND_BACKEND.md))

**Option 2: Switch to single deployment** (this guide)
1. Delete the old backend project from Vercel dashboard
2. Follow the steps above to deploy together

### Making Changes

After making code changes:

```bash
git add .
git commit -m "Your changes"
git push

# Redeploy
vercel --prod
```

Or if connected to GitHub, Vercel will auto-deploy on push.

## Advantages of Single Deployment

✅ **Simpler:** Only one project to manage  
✅ **No CORS issues:** Frontend and backend on same domain  
✅ **Fewer environment variables:** No need to configure API URL  
✅ **Easier to deploy:** Single command deploys everything  

## Disadvantages

❌ **Slower builds:** Both frontend and backend rebuild together  
❌ **Less flexible:** Can't scale frontend and backend independently  

## Troubleshooting

### "Build failed"

**Check Vercel build logs:**
1. Go to Vercel dashboard
2. Click on your deployment
3. Check the "Building" tab for errors

**Common issues:**
- Missing dependencies in `package.json` or `pyproject.toml`
- Build errors in React code
- Python syntax errors

### "Frontend shows but API doesn't work"

**Check:**
1. Browser console (F12) for errors
2. Network tab to see API requests
3. Vercel function logs for backend errors

**Solution:**
```bash
# Verify OPENAI_API_KEY is set
vercel env ls

# If missing, add it
vercel env add OPENAI_API_KEY

# Redeploy
vercel --prod
```

### "404 on API routes"

**Check [`vercel.json`](vercel.json) routes:**
```json
{
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "api/index.py"
    }
  ]
}
```

### "Module not found: python-dotenv"

**Fixed!** The `python-dotenv` package is in [`pyproject.toml`](pyproject.toml).

If still seeing this error:
```bash
# Verify it's in pyproject.toml
cat pyproject.toml | grep python-dotenv

# Should show: "python-dotenv>=1.0.0"
```

## Configuration Files

### Root `vercel.json`
Configures both frontend and backend builds:
- Frontend: Built from `frontend/` directory
- Backend: Python serverless functions from `api/`

### Frontend `.env.production`
Sets API URL to empty string (same-origin):
```
REACT_APP_API_URL=
```

### Frontend `.env.development`
For local development:
```
REACT_APP_API_URL=http://localhost:8000
```

## Local Development vs Production

### Local Development (Two Servers)

**Terminal 1 - Backend:**
```bash
export OPENAI_API_KEY=sk-your-key
uv run uvicorn api.index:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`

### Production (Single Deployment)

```bash
vercel --prod
```

- Everything: `https://your-app.vercel.app`

## Monitoring

### Vercel Dashboard

Monitor your deployment:
- **Deployments:** See all deployments and their status
- **Functions:** View backend API logs
- **Analytics:** Track usage and performance

### OpenAI Usage

Monitor API usage:
- Go to https://platform.openai.com/usage
- Check token usage and costs

## Next Steps

After successful deployment:

1. ✅ Test the chat functionality thoroughly
2. ✅ Share your app URL on LinkedIn
3. ✅ Monitor usage and costs
4. ✅ Gather user feedback
5. ✅ Iterate and improve

## Quick Commands

```bash
# Deploy to production
vercel --prod

# Check environment variables
vercel env ls

# Add environment variable
vercel env add OPENAI_API_KEY

# View logs
vercel logs

# List deployments
vercel ls
```

## Support

- Vercel Documentation: https://vercel.com/docs
- OpenAI API Documentation: https://platform.openai.com/docs
- Project Issues: Check your GitHub repository

---

**Ready to deploy?** Just run `vercel --prod` from the project root!
