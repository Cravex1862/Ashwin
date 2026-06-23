# Ashwin's Immersive 3D Portfolio & CMS

A personal portfolio featuring an interactive 3D universe and a clean, minimalist interface, integrated with a content management system.

<img width="1414" height="735" alt="Screenshot 2026-06-15 212619" src="https://github.com/user-attachments/assets/8cebff99-6fe1-4eb4-94d7-e163506cbf59" />

### **[Click Here to Experience the Live Demo](https://ashwinchoudhury.me)**

[![Check It Out](https://img.shields.io/badge/-Check%20It%20Out-black?style=for-the-badge&logo=glow&logoColor=blue)](https://ashwinchoudhury.me)

---

## Features 

- **Immersive 3D Environment:** An immersive particle universe built with Three.js
- **Cinematic Scroll Navigation:** The user scrolls through the page as if they are in a spaceship navigating the universe.
- **Reactive Audio System:** Sound Effects to make it more immersive. 
- **Frosted glass and reactive border:** Frosted glass interfaces with rotating neon borders(when hovered).
- **Dual Architecture Integration:** Has 2 versions, the 1st one is a simple webpage while the 2nd one is a cinematic 3D experience. Can switch b/w them via a toggle.
- **Integrated Custom CMS:** A secure content management system via which you can upload, edit, and delete projects and view contact requests.

---

## How to Run It Locally

### Prerequisites
* **Language Version:** Node JS 24.12.0 or above
* **System Dependencies:** npm, git

### 1. Clone and Install
```bash
git clone [https://github.com/Cravex1862/Ashwin.git](https://github.com/Cravex1862/Ashwin.git)
npm install
```

### 2. Set up Environment Variables
Create a `.env.local` file in the root directory:

```env
CMS_USERNAME=your_username
CMS_PASSWORD=your_password
```
> Note: These credentials are used for local testing. This file is gitignored and will never be committed.

### 3. Run Locally
```bash
npm run dev
```
Open **http://localhost:3000** to view the app, and **http://localhost:3000/#/cms** to test the CMS.

### 4. Project Architecture
The repository is split into frontend client files and serverless API handlers:

```
.
├── public/              # Static assets
├── src/
│   ├── App.jsx          # Main portfolio component
│   ├── index.css        # Tailwind styles
│   └── components/
│       └── CMS/         # CMS components
├── api/                 # Vercel serverless functions
│   └── auth/
│       └── login.js     # Authentication endpoint
├── server.js            # Local development API server
├── package.json         # Dependencies
└── .env.example         # Environment variables template
```

---

## How It Works

For my portfolio, I used pure Three.js for the 3D graphics inside a React component and hooked it up to GSAP ScrollTrigger. Normally, trying to move a 3D scene as you scroll would get really glitchy, but GSAP lets me scrub the camera around perfectly smoothly as you scroll down the page. To make sure the site loads instantly and doesn’t lag, I didn’t use any heavy downloaded 3D models; I just used math and basic geometry to generate all the shapes, stars, and colors directly in the code. Finally, to keep the 2D text and 3D graphics in sync, I had the scroll animation update a simple ‘phase’ state that tells the normal React text exactly when to fade in and out as the 3D camera moves to
---

## Credits / Acknowledgements

- **Tech Stack**: Built with React and TailwindCSS for the 2D interface. The 3D environment is powered entirely by native Three.js, with GSAP (GreenSock) driving all the complex, scroll-linked camera animations and UI fade-ins.

- **Assets & Design**: To keep load times completely instant, no heavy 3D asset packs were used; every 3D shape, crystal, and star particle is generated procedurally via code. Iconography is provided by Phosphor Icons, and simple UI sound effects were added to enhance the spatial scroll experience.
