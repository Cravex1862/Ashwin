# MongoDB Setup for Vercel

## Quick Setup (5 minutes)

### 1. Create Free MongoDB Atlas Account
- Go to: https://www.mongodb.com/cloud/atlas
- Sign up (free)
- Create a FREE cluster (M0)
- Create a database user with username & password
- Whitelist all IPs (0.0.0.0/0) for easier setup

### 2. Get Your Connection String
1. In MongoDB Atlas, click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string (looks like):
   ```
   mongodb+srv://username:password@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
   ```

### 3. Add to Vercel Environment Variables
1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name:** `MONGODB_URI`
   - **Value:** [Paste your connection string from step 2]
   - **Environments:** Select "Production"
4. Click "Save"

### 4. Redeploy
1. Go back to your Vercel project
2. Click **Deployments**
3. Click the menu (⋯) on the latest deployment
4. Click **Redeploy**
5. Wait for build to complete

### 5. Test
- Visit your site
- Go to `/#/cms` and login
- Create a test project
- Submit the contact form
- Check CMS to see the data!

---

## Why MongoDB Atlas Free Tier?

✅ **Free** - 512MB storage (enough for thousands of records)  
✅ **No credit card for free tier** - Just email signup  
✅ **Easy to use** - No complex setup  
✅ **Scalable** - Upgrade anytime  
✅ **Secure** - Encrypted connections  

---

## Connection String Format

Your connection string should look like:
```
mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

Make sure to:
- Replace `your_username` and `your_password` with your DB user credentials
- Keep the string exactly as MongoDB provides it
- Don't commit this to GitHub (it's in Vercel env vars, not code)

---

## Troubleshooting

**"Connection refused"**
- Make sure IP whitelist includes 0.0.0.0/0 in MongoDB Atlas

**"Authentication failed"**
- Check username and password in connection string
- Make sure user exists in the database

**Still getting errors after redeploy**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Check Vercel build logs for errors
