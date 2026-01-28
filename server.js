const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, 'data');
const projectsFile = path.join(dataDir, 'projects.json');
const contactsFile = path.join(dataDir, 'contacts.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(projectsFile)) {
  fs.writeFileSync(projectsFile, JSON.stringify([]));
}
if (!fs.existsSync(contactsFile)) {
  fs.writeFileSync(contactsFile, JSON.stringify([]));
}

// Auth login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  const validUsername = process.env.CMS_USERNAME;
  const validPassword = process.env.CMS_PASSWORD;
  
  if (!validUsername || !validPassword) {
    return res.status(500).json({ 
      success: false, 
      message: 'Server error: CMS credentials not configured' 
    });
  }
  
  if (username === validUsername && password === validPassword) {
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
    return res.json({ success: true, token, message: 'Login successful' });
  }
  
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Projects
app.get('/api/projects', (req, res) => {
  const projects = JSON.parse(fs.readFileSync(projectsFile, 'utf8'));
  res.json(projects);
});

app.post('/api/projects', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const projects = JSON.parse(fs.readFileSync(projectsFile, 'utf8'));
  const newProject = {
    _id: Date.now().toString(),
    ...req.body,
    createdAt: new Date()
  };
  projects.push(newProject);
  fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2));
  res.status(201).json(newProject);
});

app.delete('/api/projects', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const { id } = req.query;
  const projects = JSON.parse(fs.readFileSync(projectsFile, 'utf8'));
  const filtered = projects.filter(p => p._id !== id);
  fs.writeFileSync(projectsFile, JSON.stringify(filtered, null, 2));
  res.json({ success: true });
});

// Contacts
app.post('/api/contacts', (req, res) => {
  const contacts = JSON.parse(fs.readFileSync(contactsFile, 'utf8'));
  const newContact = {
    _id: Date.now().toString(),
    ...req.body,
    createdAt: new Date()
  };
  contacts.push(newContact);
  fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));
  res.status(201).json({ success: true });
});

app.get('/api/contacts', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const contacts = JSON.parse(fs.readFileSync(contactsFile, 'utf8'));
  res.json(contacts);
});

app.listen(PORT, () => {
  console.log(`✅ Local API server running on http://localhost:${PORT}`);
  console.log(`📡 Frontend should proxy API requests to this server`);
});
