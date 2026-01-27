# Setting Environment Variables in Vercel

There are two ways to add environment variables to Vercel before deploying:

## Method 1: Using Vercel CLI (Before Deployment)

### Step 1: Login to Vercel
```bash
vercel login
```

### Step 2: Link Your Project (First Time Only)
```bash
# For backend (from project root)
vercel link

# For frontend (from frontend directory)
cd frontend
vercel link
```

### Step 3: Add Environment Variables

**For Backend (OpenAI API Key):**
```bash
# From project root
vercel env add OPENAI_API_KEY
```

When prompted:
- **What's the value of OPENAI_API_KEY?** Enter your OpenAI API key (e.g., `sk-proj-...`)
- **Add OPENAI_API_KEY to which Environments?** Select all (Production, Preview, Development)

**For Frontend (Backend API URL):**

First, you need to deploy the backend to get its URL, then:
```bash
cd frontend
vercel env add REACT_APP_API_URL
```

When prompted:
- **What's the value of REACT_APP_API_URL?** Enter your backend URL (e.g., `https://your-project.vercel.app`)
- **Add REACT_APP_API_URL to which Environments?** Select all (Production, Preview, Development)

### Step 4: Deploy
```bash
# Deploy backend
vercel --prod

# Deploy frontend
cd frontend
vercel --prod
```

## Method 2: Using Vercel Dashboard (Web Interface)

### Step 1: Deploy Without Environment Variables First

```bash
# Deploy backend to get the URL
vercel --prod

# Note the URL that's displayed (e.g., https://your-project-abc123.vercel.app)
```

### Step 2: Add Environment Variables via Dashboard

1. Go to https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **Environment Variables**

**Add Backend Variables:**
- **Key:** `OPENAI_API_KEY`
- **Value:** Your OpenAI API key (e.g., `sk-proj-...`)
- **Environments:** Check all (Production, Preview, Development)
- Click **Save**

**Add Frontend Variables:**
- **Key:** `REACT_APP_API_URL`
- **Value:** Your backend URL (e.g., `https://your-backend.vercel.app`)
- **Environments:** Check all (Production, Preview, Development)
- Click **Save**

### Step 3: Redeploy to Apply Variables

After adding environment variables, you need to redeploy:

```bash
# Redeploy backend
vercel --prod

# Redeploy frontend
cd frontend
vercel --prod
```

## Method 3: Using .env Files (Local Development Only)

**⚠️ WARNING:** Never commit `.env` files with real API keys to git!

Create these files locally (they're already in `.gitignore`):

**Backend `.env` (project root):**
```bash
# Create .env file
cat > .env << 'EOF'
OPENAI_API_KEY=sk-proj-your-actual-key-here
EOF
```

**Frontend `.env.production` (frontend directory):**
```bash
# Create .env.production file
cd frontend
cat > .env.production << 'EOF'
REACT_APP_API_URL=https://your-backend.vercel.app
EOF
```

**Note:** These `.env` files are for local testing only. Vercel won't use them - you still need to set environment variables in Vercel dashboard or CLI.

## Recommended Workflow

### First Deployment:

1. **Deploy Backend First:**
   ```bash
   # Add OpenAI API key
   vercel env add OPENAI_API_KEY
   # Enter your key when prompted
   
   # Deploy backend
   vercel --prod
   # Note the URL (e.g., https://your-backend-abc123.vercel.app)
   ```

2. **Deploy Frontend:**
   ```bash
   cd frontend
   
   # Add backend URL
   vercel env add REACT_APP_API_URL
   # Enter backend URL when prompted
   
   # Deploy frontend
   vercel --prod
   ```

### Subsequent Deployments:

Environment variables are saved, so you can just deploy:
```bash
# Backend
vercel --prod

# Frontend
cd frontend
vercel --prod
```

## Verifying Environment Variables

### Check via CLI:
```bash
# List all environment variables for your project
vercel env ls
```

### Check via Dashboard:
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. You should see your variables listed

## Troubleshooting

### "Environment variable not found"

**Solution:** Make sure you added the variable to the correct environment (Production, Preview, Development).

### "Changes not taking effect"

**Solution:** Redeploy after adding/changing environment variables:
```bash
vercel --prod
```

### "How do I update an environment variable?"

**Via CLI:**
```bash
# Remove old variable
vercel env rm OPENAI_API_KEY production

# Add new variable
vercel env add OPENAI_API_KEY
```

**Via Dashboard:**
1. Go to Settings → Environment Variables
2. Click the three dots next to the variable
3. Click "Edit"
4. Update the value
5. Save and redeploy

### "Can I see my environment variable values?"

**Security:** Vercel hides sensitive values by default. You can only see them when you first create them or if you edit them.

## Security Best Practices

✅ **DO:**
- Use Vercel's environment variables for all secrets
- Use different API keys for development and production
- Regularly rotate API keys
- Use `.gitignore` to exclude `.env` files

❌ **DON'T:**
- Commit API keys to git
- Share API keys in public channels
- Use production keys in development
- Hardcode secrets in your code

## Quick Reference

| Environment | Variable | Example Value |
|-------------|----------|---------------|
| Backend | `OPENAI_API_KEY` | `sk-proj-abc123...` |
| Frontend | `REACT_APP_API_URL` | `https://your-backend.vercel.app` |

## Next Steps

After setting environment variables:
1. Deploy your application
2. Test the deployment
3. Monitor usage in Vercel dashboard
4. Check OpenAI API usage at https://platform.openai.com/usage
