# Ashwin's Immersive 3D Portfolio & CMS

My personal portfolio features an interactive 3D universe and a clean, minimalist interface, integrated with a content management system.

<img width="1414" height="735" alt="Screenshot 2026-06-15 212619" src="https://github.com/user-attachments/assets/8cebff99-6fe1-4eb4-94d7-e163506cbf59" />

### **[Click Here to Experience the Live Demo](https://ashwinchoudhury.me)**

[![Check It Out](https://img.shields.io/badge/-Check%20It%20Out-black?style=for-the-badge&logo=glow&logoColor=blue)](https://ashwinchoudhury.me)

---

## Features 

- A 3D environment to wow viewers as they go through the page.(Space Themed)
- Has 2 versions. v1 is a basic single-page site with all the sections, while v2 is a 3D version of the site with the camera moving through space as you scroll. Can be toggled with a button
- Both versions are connected to a single CMS and database; when you update a project, it applies to both versions. When you get a contact request from either version, it shows up in the CMS.
- Frosted glass look because everyone is doing that now.
- Sound effects to enhance "immersiveness".

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

---

## How It Works

For my portfolio, I used pure Three.js for the 3D graphics inside a React component and hooked it up to GSAP ScrollTrigger. Normally, trying to move a 3D scene as you scroll would get really glitchy, but GSAP lets me scrub the camera around perfectly smoothly as you scroll down the page. To make sure the site loads instantly and doesn’t lag, I didn’t use any heavy downloaded 3D models; I just used math and basic geometry to generate all the shapes, stars, and colors directly in the code. Finally, to keep the 2D text and 3D graphics in sync, I had the scroll animation update a simple ‘phase’ state that tells the normal React text exactly when to fade in and out as the 3D camera moves to different sections.

---

## Credits / Acknowledgements

- Used React, TailwindCSS for v1.
- Used ThreeJS and GSAP for v2.
- Phosphor Icons for icons.
