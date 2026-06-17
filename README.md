# Ashwin's Immersive 3D Portfolio & CMS

A personal portfolio featuring an interactive 3D universe and a clean, minimalist interface, integrated with a content management system.

<img width="1414" height="735" alt="Screenshot 2026-06-15 212619" src="https://github.com/user-attachments/assets/8cebff99-6fe1-4eb4-94d7-e163506cbf59" />

### **[Click Here to Experience the Live Demo](https://ashwinchoudhury.me)**

[![Check It Out](https://img.shields.io/badge/-Check%20It%20Out-black?style=for-the-badge&logo=glow&logoColor=blue)](https://ashwinchoudhury.me)

---

## Features 

- **Immersive 3D Environment (V2):** A 15,000-star particle universe featuring floating neon geometric primitives and parallax star dust built with Three.js.
- **Cinematic Scroll Navigation:** User scrolling is mapped directly to a complex 3D camera flight path via GSAP ScrollTrigger.
- **Reactive Audio System:** Web Audio API synthesizers that generate pitch-shifted sound effects dynamically tied to UI interactions.
- **Advanced Glassmorphism & SVG Geometry:** Frosted glass interfaces bounded by mathematical SVG `linearGradient` rotating neon borders.
- **Dual Architecture Integration:** A bottom-corner version toggle that hot-swaps between the 2D DOM layout and the 3D WebGL engine while staying synced to the database.
- **Integrated Custom CMS:** A secure built-in portal to upload, edit, and manage 3D project cards dynamically without code changes.

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

For my portfolio, I coded the 3D graphics using pure Three.js inside a React component and connected it to GSAP ScrollTrigger. Normally, making a 3D scene move when you scroll gets really glitchy, but GSAP lets me easily scrub the camera around perfectly smoothly as you scroll down the page. To make sure the site loads instantly and doesn't lag, I didn't use any heavy downloaded 3D models; instead, I generated all the shapes, stars, and colors using math and basic geometry directly in the code. Finally, to keep the 2D text and 3D graphics connected, I made the scroll animation update a simple 'phase' state, which tells the regular React text exactly when to fade in and out as the 3D camera moves to new areas.

---

## Credits / Acknowledgements

- **Tech Stack**: Built with React and TailwindCSS for the 2D interface. The 3D environment is powered entirely by native Three.js, with GSAP (GreenSock) driving all the complex, scroll-linked camera animations and UI fade-ins.

- **Assets & Design**: To keep load times completely instant, no heavy 3D asset packs were used; every 3D shape, crystal, and star particle is generated procedurally via code. Iconography is provided by Phosphor Icons, and simple UI sound effects were added to enhance the spatial scroll experience.
