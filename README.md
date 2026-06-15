# Ashwin

# 🚀 Ashwin's Immersive 3D Portfolio & CMS

Welcome to my portfolio! This project is a custom-built, dual-architecture portfolio that features a clean responsive interface (V1) and an incredible immersive **3D WebGL cinematic experience** (V2), all powered by a unified headless CMS.

## 🌟 Technical Highlights

- **Immersive 3D Environment (V2):** Built entirely with **Three.js** and **WebGL**, featuring a 15,000-star particle universe, floating neon geometric primitives, and parallax star dust.
- **Cinematic Scroll Navigation:** Uses **GSAP ScrollTrigger** to map user scrolling directly to a complex 3D camera flight path, traveling through 5 distinct spatial phases.
- **Reactive Audio System:** Integrated **Web Audio API** synthesizers that generate perfectly-timed, pitch-shifted click and whoosh sound effects tied to 3D navigation and UI interactions.
- **Advanced Glassmorphism & SVG Geometry:** Features ultra-premium frosted glass backgrounds alongside mathematical SVG `linearGradient` rotating neon borders that wrap perfectly around the UI.
- **Dual Architecture Integration:** Click the version toggle in the bottom corner to seamlessly hot-swap between the 2D DOM version (V1) and the 3D WebGL version (V2). Both immediately sync with the unified database.
- **Integrated Custom CMS:** A secure, built-in Content Management System to upload, edit, and manage 3D project cards without touching a single line of code.

---

## 🚀 Quick Start (Local Development)

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd portfolio-cms
npm install
```

### 2. Setup Environment Variables
Create a `.env.local` file in the root directory:
```
CMS_USERNAME=your_username
CMS_PASSWORD=your_password
```
> Use any credentials you want for local testing. This file is gitignored and never committed.

### 3. Run Locally
```bash
npm run dev
```
This starts:
- **API server:** http://localhost:3001
- **React app:** http://localhost:3000

### 4. Test the CMS
- Go to http://localhost:3000/#/cms
- Login with your credentials from `.env.local`
- Create test projects and test the contact form

---

## 🌐 Deploy to Vercel (Free)

### Step 1: Push to GitHub
Make sure your code is on GitHub (public or private):
```bash
git add .
git commit -m "Deploy portfolio"
git push origin main
```

### Step 2: Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New Project"
4. Select your repository
5. Click "Import"

### Step 3: Configure Environment Variables
In Vercel, go to **Project Settings** → **Environment Variables** and add:

| Name | Value | Environments |
|------|-------|--------------|
| `CMS_USERNAME` | Your chosen username | All |
| `CMS_PASSWORD` | Your chosen password | All |

> ⚠️ **Security Tip:** Use a STRONG password (at least 12 characters with mixed case, numbers, symbols)

### Step 4: Deploy
Vercel will automatically detect the build settings and deploy. Your site will be live at:
```
https://your-project-name.vercel.app
```

---

## 📝 First Steps After Deployment

1. **Visit your site:** https://your-project-name.vercel.app
2. **Access CMS:** https://your-project-name.vercel.app/#/cms
3. **Login** with your credentials
4. **Add your projects** using the "Create Project" feature
5. **Update portfolio content** as needed

---

## 🔧 Customization

### Modify the Portfolio
- **Projects data:** Edit `/src/App.jsx` to change portfolio layout
- **Styles:** `/src/index.css` contains Tailwind CSS styles
- **Skills/Tech:** Update the skills section in `/src/App.jsx`

### Customize the CMS
- CMS components are in `/src/components/CMS/`
- Modify UI, add new fields, or expand functionality

### Deploy a New Version
After making changes locally:
```bash
git add .
git commit -m "Update portfolio"
git push origin main
```
Vercel will automatically redeploy your changes!

---

## 🔐 Security Best Practices

✅ **Environment variables only:** Credentials stored in Vercel, never in code  
✅ **Strong passwords:** Use unique, complex passwords (12+ characters)  
✅ **Keep `.env.local` local:** Never commit to git  
✅ **Use `.env.example`:** Reference file for what variables are needed  

---

## 📁 Project Structure

```
.
├── public/              # Static assets
├── src/
│   ├── App.jsx         # Main portfolio component
│   ├── index.css       # Tailwind styles
│   └── components/
│       └── CMS/        # CMS components
├── api/                # Vercel serverless functions
│   └── auth/
│       └── login.js    # Authentication endpoint
├── server.js           # Local development API server
├── package.json        # Dependencies
└── .env.example        # Environment variables template
```

---

## ❓ Troubleshooting

### CMS login not working
- Check that `.env.local` is created with `CMS_USERNAME` and `CMS_PASSWORD`
- Ensure `npm run dev` is running the API server

### Projects not saving
- Make sure you're logged in to the CMS
- Check browser console for error messages
- Verify the API server is running on port 3001

### Deployment fails on Vercel
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Try redeploying: Dashboard → Deployments → Click ... → Redeploy

---

## 📚 Learn More

- **React:** [react.dev](https://react.dev)
- **Tailwind CSS:** [tailwindcss.com](https://tailwindcss.com)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Express.js:** [expressjs.com](https://expressjs.com)

---

## 💬 Support

If you run into issues:
1. Check the troubleshooting section above
2. Review the browser console (F12) for errors
3. Check Vercel deployment logs
4. Ensure all environment variables are correctly set

---

Happy coding! 🚀
