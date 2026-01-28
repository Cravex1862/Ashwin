import fs from 'fs';
import path from 'path';

const projectsFile = path.join(process.cwd(), 'data', 'projects.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(projectsFile)) {
    fs.writeFileSync(projectsFile, JSON.stringify([]));
  }
}

function getProjects() {
  ensureDataDir();
  const data = fs.readFileSync(projectsFile, 'utf8');
  return JSON.parse(data);
}

function saveProjects(projects) {
  ensureDataDir();
  fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2));
}

export default function handler(req, res) {
  // Simple auth check
  const authHeader = req.headers.authorization;
  
  if (req.method === 'GET') {
    // Public endpoint - anyone can view projects
    const projects = getProjects();
    return res.status(200).json(projects);
  }

  // Protected endpoints require auth
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const projects = getProjects();

  if (req.method === 'POST') {
    const newProject = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    projects.push(newProject);
    saveProjects(projects);
    return res.status(201).json(newProject);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    const filtered = projects.filter(p => p.id !== id);
    saveProjects(filtered);
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
