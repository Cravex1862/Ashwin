# 🚀 Deploying Your Portfolio with CMS to Vercel

## Prerequisites
- A Vercel account (sign up at vercel.com)
- Your GitHub repository connected to Vercel

## Step 1: Deploy to Vercel

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Add CMS functionality"
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Create React App settings

## Step 2: Configure Environment Variables

**IMPORTANT:** You must add these environment variables in Vercel for the CMS to work!

1. In your Vercel project dashboard, go to **Settings** → **Environment Variables**

2. Add these two variables:

   **Variable 1:**
   - Name: `CMS_USERNAME`
   - Value: `Cravex1`
   - Environment: Production, Preview, Development (select all)

   **Variable 2:**
   - Name: `CMS_PASSWORD`
   - Value: `uppercase@2790`
   - Environment: Production, Preview, Development (select all)

3. Click "Save" for each variable

## Step 3: Redeploy

After adding environment variables, you need to redeploy:

1. Go to the "Deployments" tab
2. Click the three dots menu on the latest deployment
3. Click "Redeploy"
4. Check "Use existing Build Cache" and click "Redeploy"

## Step 4: Access Your CMS

Once deployed:

1. Visit your portfolio: `https://your-domain.vercel.app`
2. Click "Admin" link in the footer, or go directly to: `https://your-domain.vercel.app/#/cms`
3. Login with:
   - Username: `Cravex1`
   - Password: `uppercase@2790`

## CMS Features

### 📝 Create Projects
- Name
- Description
- Category (Games, Apps, Websites, Electronics)
- Image URL (use image hosting like imgur, cloudinary, or GitHub)
- Demo Link / Video URL (for hardware projects, use YouTube links)

### 📧 View Contact Requests
- See all messages from your contact form
- Name, email, reason, and timestamp
- Click email addresses to respond

### 🎨 Projects Display
- Projects automatically appear on your portfolio
- Filter by category
- Hover to see details and demo links

## 🔒 Security Notes

✅ **Your credentials are secure:**
- Stored in Vercel environment variables (not in code)
- Never visible in frontend/inspect element
- API routes validate authentication
- `.env.local` is gitignored

⚠️ **Remember:**
- Never commit `.env.local` to GitHub
- The `/data` directory is gitignored (contains CMS data)
- Change the default password after first deployment

## 🐛 Troubleshooting

### "Unauthorized" error when creating projects:
- Check that environment variables are set in Vercel
- Redeploy after adding variables
- Clear browser cache and localStorage

### Projects not showing:
- Check that you're logged in to CMS
- Try creating a test project
- Check browser console for errors

### Can't access CMS:
- Make sure you're using the hash route: `/#/cms`
- Check that the "Admin" link in footer is visible
- Try logging in again

## 📸 Image Hosting Recommendations

For project images, use:
- **imgur.com** - Free, fast, no signup needed
- **Cloudinary** - Free tier, image optimization
- **GitHub** - Use raw.githubusercontent.com URLs
- **imgbb.com** - Simple free hosting

## 🎥 Video Hosting for Hardware Projects

- **YouTube** - Best for demo videos
- **Vimeo** - Professional alternative
- Use the share/embed link in CMS

## Need Help?

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console (F12)
3. Verify environment variables are set
4. Make sure you redeployed after adding variables

---

**Your portfolio is ready! 🎉**

Start by visiting `/#/cms` and adding your first project!
