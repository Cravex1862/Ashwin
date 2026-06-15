const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors({
  origin: ['http://localhost:3000', 'https://ashwinchoudhury.me'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10mb' }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' https://www.googletagmanager.com https://fonts.googleapis.com 'unsafe-inline' 'unsafe-eval'; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https:; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'"
  );
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');
  next();
});

const dataDir = path.join(__dirname, 'data');
const projectsFile = path.join(dataDir, 'projects.json');
const contactsFile = path.join(dataDir, 'contacts.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(projectsFile)) {
  fs.writeFileSync(projectsFile, JSON.stringify([]));
}
if (!fs.existsSync(contactsFile)) {
  fs.writeFileSync(contactsFile, JSON.stringify([]));
}

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const validUsername = process.env.CMS_USERNAME;
  const validPassword = process.env.CMS_PASSWORD;

  if (!validUsername || !validPassword) {
    return res.status(500).json({ success: false, message: 'Server error: CMS credentials not configured' });
  }

  if (username === validUsername && password === validPassword) {
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
    return res.json({ success: true, token, message: 'Login successful' });
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.get('/api/projects', async (req, res) => {
  try {
    const data = await fs.promises.readFile(projectsFile, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

app.post('/api/projects', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const projects = JSON.parse(await fs.promises.readFile(projectsFile, 'utf8'));
    const newProject = {
      _id: Date.now().toString(),
      ...req.body,
      createdAt: new Date()
    };
    projects.push(newProject);
    await fs.promises.writeFile(projectsFile, JSON.stringify(projects, null, 2));
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.put('/api/projects', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { id } = req.query;
    const projects = JSON.parse(await fs.promises.readFile(projectsFile, 'utf8'));
    const index = projects.findIndex(p => p._id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }

    projects[index] = {
      ...projects[index],
      ...req.body,
      _id: id,
      updatedAt: new Date()
    };

    await fs.promises.writeFile(projectsFile, JSON.stringify(projects, null, 2));
    res.json(projects[index]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { id } = req.query;
    const projects = JSON.parse(await fs.promises.readFile(projectsFile, 'utf8'));
    const filtered = projects.filter(p => p._id !== id);
    await fs.promises.writeFile(projectsFile, JSON.stringify(filtered, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

app.post('/api/contacts', async (req, res) => {
  try {
    const contacts = JSON.parse(await fs.promises.readFile(contactsFile, 'utf8'));
    const newContact = {
      _id: Date.now().toString(),
      ...req.body,
      createdAt: new Date()
    };
    contacts.push(newContact);
    await fs.promises.writeFile(contactsFile, JSON.stringify(contacts, null, 2));
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit contact' });
  }
});

app.get('/api/contacts', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const contacts = JSON.parse(await fs.promises.readFile(contactsFile, 'utf8'));
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load contacts' });
  }
});

app.delete('/api/contacts', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { id } = req.query;
    const contacts = JSON.parse(await fs.promises.readFile(contactsFile, 'utf8'));
    const filtered = contacts.filter(c => c._id !== id);
    await fs.promises.writeFile(contactsFile, JSON.stringify(filtered, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

// Sitemap endpoint
app.get('/sitemap.xml', (req, res) => {
  res.setHeader('Content-Type', 'application/xml');

  const date = new Date().toISOString().split('T')[0];
  const pages = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/#intro', priority: '0.9', changefreq: 'monthly' },
    { loc: '/#projects', priority: '0.9', changefreq: 'weekly' },
    { loc: '/#skills', priority: '0.8', changefreq: 'monthly' },
    { loc: '/#contact', priority: '0.8', changefreq: 'monthly' },
  ];

  try {
    const projects = JSON.parse(await fs.promises.readFile(projectsFile, 'utf8'));
    projects.forEach(p => {
      const slug = (p.name || p._id).toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '');
      pages.push({ loc: `/#/project/${slug}`, priority: '0.7', changefreq: 'monthly' });
    });
  } catch {}

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const page of pages) {
    xml += `  <url>\n    <loc>https://ashwinchoudhury.me${page.loc}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>\n`;
  }
  xml += '</urlset>';
  res.send(xml);
});

// Robots.txt endpoint
app.get('/robots.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(`User-agent: *
Allow: /
Allow: /#/projects
Allow: /#/skills
Allow: /#/contact
Disallow: /#/cms
Disallow: /api/

Sitemap: https://ashwinchoudhury.me/sitemap.xml
`);
});

app.listen(PORT, () => {
  console.log(`✅ Local API server running on http://localhost:${PORT}`);
  console.log(`📡 Frontend should proxy API requests to this server`);
});
