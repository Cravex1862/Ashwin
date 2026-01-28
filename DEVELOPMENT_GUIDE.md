# Local Development Guide

## ✅ Fixed: Network Error Issue

The network error was happening because Create React App doesn't support Vercel serverless functions locally.

## Solution Implemented

Created a local Express server (`server.js`) that simulates the Vercel API routes during development.

## How to Run Locally

**Option 1: Run everything at once (Recommended)**
```bash
npm run dev
```
This starts:
- API server on `http://localhost:3001`
- React app on `http://localhost:3000`

**Option 2: Run separately**

Terminal 1:
```bash
npm run api
```

Terminal 2:
```bash
npm start
```

## Access Points

- **Portfolio:** http://localhost:3000
- **CMS Login:** http://localhost:3000/#/cms
- **API Server:** http://localhost:3001 (background)

## Testing the CMS

1. Go to http://localhost:3000/#/cms
2. Login with:
   - Username: `Cravex1`
   - Password: `uppercase@2790`
3. Create a test project
4. View it on the main portfolio page
5. Test the contact form

## What Happens in Production

On Vercel:
- The `/api` folder routes become serverless functions automatically
- No Express server needed
- Environment variables are set in Vercel dashboard
- Everything just works!

## Files Added for Local Development

- `server.js` - Local API server (Express)
- Added to `package.json`:
  - `proxy: "http://localhost:3001"` - Routes API calls to local server
  - `npm run api` - Starts API server
  - `npm run dev` - Starts both servers
- Dependencies: `express`, `cors`, `concurrently`

## Important Notes

- The `server.js` file is ONLY for local development
- On Vercel, it uses the real serverless functions in `/api` folder
- Credentials are in `.env.local` (gitignored)
- Contact form submissions and projects are saved in `/data` folder (gitignored)
