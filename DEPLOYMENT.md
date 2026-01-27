# Deployment Guide - Vercel

This guide will help you deploy your Mental Coach application to Vercel.

## Prerequisites

- Vercel account (sign up at https://vercel.com)
- Vercel CLI installed (`npm install -g vercel@34.2.0`)
- OpenAI API key
- GitHub repository (recommended)

## Deployment Options

### Option 1: Deploy via Vercel CLI (Recommended)

#### Step 1: Prepare Your Application

Make sure all changes are committed:
```bash
git add .
git commit -m "Ready for deployment"
git push
```

#### Step 2: Deploy Frontend

```bash
cd frontend
npm run build
vercel
```

Follow the prompts:
- **Set up and deploy?** Yes
- **Which scope?** Select your account
- **Link to existing project?** No (first time) or Yes (redeployment)
- **What's your project's name?** mental-coach-app (or your choice)
- **In which directory is your code located?** ./
- **Want to override the settings?** No

#### Step 3: Set Environment Variables for Frontend

After deployment, set the backend URL:
```bash
vercel env add REACT_APP_API_URL
```
Enter your backend URL when prompted (you'll get this after deploying the backend).

#### Step 4: Deploy Backend

From the project root:
```bash
vercel
```

Follow the prompts similar to frontend deployment.

#### Step 5: Set Environment Variables for Backend

```bash
vercel env add OPENAI_API_KEY
```
Enter your OpenAI API key when prompted.

#### Step 6: Update Frontend with Backend URL

1. Get your backend URL from Vercel dashboard
2. Update frontend environment variable:
   ```bash
   cd frontend
   vercel env add REACT_APP_API_URL production
   ```
   Enter: `https://your-backend-url.vercel.app`

3. Redeploy frontend:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard (GitHub Integration)

#### Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### Step 2: Import Project to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure the project:

**For Frontend:**
- **Framework Preset:** Create React App
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Install Command:** `npm install`

**Environment Variables:**
- `REACT_APP_API_URL` = `https://your-backend-url.vercel.app`

**For Backend:**
- **Framework Preset:** Other
- **Root Directory:** `.` (project root)
- **Build Command:** `pip install -r requirements.txt`
- **Output Directory:** (leave empty)
- **Install Command:** (leave empty)

**Environment Variables:**
- `OPENAI_API_KEY` = `sk-your-actual-key`

#### Step 3: Deploy

Click "Deploy" and wait for the build to complete.

## Important Configuration Files

### vercel.json (Root Directory)

The project already has a [`vercel.json`](../vercel.json) file. Verify it contains:

```json
{
  "builds": [
    {
      "src": "api/index.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "api/index.py"
    }
  ]
}
```

### Frontend Environment Variables

Create [`frontend/.env.production`](../frontend/.env.production):
```
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

## Post-Deployment Checklist

- [ ] Backend is deployed and accessible
- [ ] Frontend is deployed and accessible
- [ ] `OPENAI_API_KEY` is set in backend environment variables
- [ ] `REACT_APP_API_URL` is set in frontend environment variables
- [ ] Frontend can communicate with backend (test the chat)
- [ ] CORS is properly configured (already done in code)

## Testing Your Deployment

1. Visit your frontend URL: `https://your-frontend.vercel.app`
2. Open browser console (F12)
3. Send a test message
4. Check for any errors in console
5. Verify AI responds correctly

## Troubleshooting

### "ModuleNotFoundError: No module named 'dotenv'"

**Fixed!** The `python-dotenv` package has been added to [`pyproject.toml`](../pyproject.toml). Redeploy to apply the fix.

### "Unable to connect to the server"

**Cause:** Frontend can't reach backend.

**Solution:**
1. Verify backend is deployed and running
2. Check `REACT_APP_API_URL` environment variable in frontend
3. Ensure URL includes `https://` and no trailing slash
4. Redeploy frontend after updating environment variables

### "OPENAI_API_KEY not configured"

**Cause:** API key not set in backend environment.

**Solution:**
1. Go to Vercel dashboard → Your backend project → Settings → Environment Variables
2. Add `OPENAI_API_KEY` with your actual key
3. Redeploy the backend

### CORS Errors

**Cause:** Backend not allowing frontend origin.

**Solution:** The backend is already configured to allow all origins (`*`). If you want to restrict to your frontend domain:

Edit [`api/index.py`](../api/index.py):
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"]
)
```

### Build Fails

**Frontend Build Fails:**
- Check that all dependencies are in [`frontend/package.json`](../frontend/package.json)
- Verify Node.js version compatibility
- Check build logs in Vercel dashboard

**Backend Build Fails:**
- Verify all dependencies are in [`pyproject.toml`](../pyproject.toml)
- Check Python version (should be 3.12)
- Review build logs for specific errors

## Environment Variables Reference

### Frontend
| Variable | Value | Description |
|----------|-------|-------------|
| `REACT_APP_API_URL` | `https://your-backend.vercel.app` | Backend API URL |

### Backend
| Variable | Value | Description |
|----------|-------|-------------|
| `OPENAI_API_KEY` | `sk-...` | Your OpenAI API key |

## Updating Your Deployment

### Update Frontend
```bash
cd frontend
git pull
npm install
vercel --prod
```

### Update Backend
```bash
git pull
vercel --prod
```

## Custom Domain (Optional)

1. Go to Vercel dashboard → Your project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `REACT_APP_API_URL` if using custom domain for backend

## Monitoring

- **Vercel Dashboard:** Monitor deployments, logs, and analytics
- **Function Logs:** View backend API logs in Vercel dashboard
- **Browser Console:** Check frontend errors and network requests

## Cost Considerations

- **Vercel Free Tier:** Includes generous limits for hobby projects
- **OpenAI API:** Pay per token usage
- **Monitoring:** Keep an eye on OpenAI API usage to avoid unexpected costs

## Security Best Practices

1. ✅ Never commit API keys to git
2. ✅ Use environment variables for all secrets
3. ✅ Keep dependencies updated
4. ⚠️ Consider restricting CORS to your frontend domain in production
5. ⚠️ Implement rate limiting for production use
6. ⚠️ Add authentication if needed

## Next Steps

After successful deployment:
1. Share your app URL on LinkedIn (see main README for template)
2. Monitor usage and costs
3. Gather user feedback
4. Iterate and improve

## Support

- Vercel Documentation: https://vercel.com/docs
- OpenAI API Documentation: https://platform.openai.com/docs
- Project Issues: Check your GitHub repository issues
