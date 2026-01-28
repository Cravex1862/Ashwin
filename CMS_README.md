# CMS Setup Instructions

## Vercel Environment Variables

After deploying to Vercel, add these environment variables in your Vercel project settings:

1. Go to your Vercel project dashboard
2. Click on "Settings" → "Environment Variables"
3. Add the following variables:

```
CMS_USERNAME=Cravex1
CMS_PASSWORD=uppercase@2790
```

## Accessing the CMS

Once deployed, visit: `https://your-domain.com/#/cms`

Or click the "Admin" link in the footer of your portfolio.

**Login credentials:**
- Username: `Cravex1`
- Password: `uppercase@2790`

## CMS Features

### Projects Management
- Create new projects with:
  - Name
  - Description
  - Category (Games, Apps, Websites, Electronics)
  - Image URL
  - Demo link / Video (for hardware projects)
- View all projects
- Delete projects
- Projects automatically appear on the main portfolio

### Contact Requests
- View all contact form submissions
- See name, email, reason, and timestamp
- Contact requesters directly via email link

## Security Notes

- Credentials are stored in Vercel environment variables (not in code)
- Never commit `.env.local` file to git
- The `/data` directory is gitignored (contains CMS data)
- Authentication token is stored in browser localStorage
- API routes validate the token for protected endpoints

## Local Development

1. Create a `.env.local` file (already exists)
2. It should contain:
   ```
   CMS_USERNAME=Cravex1
   CMS_PASSWORD=uppercase@2790
   ```
3. Run `npm run dev` (this starts both the API server and React app)
4. Access portfolio at `http://localhost:3000`
5. Access CMS at `http://localhost:3000/#/cms`

**Note:** For local development, the app uses a Node.js Express server to simulate Vercel's serverless functions. On production, it uses actual Vercel serverless functions.
