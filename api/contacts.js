import fs from 'fs';
import path from 'path';

const contactsFile = path.join(process.cwd(), 'data', 'contacts.json');

function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(contactsFile)) {
    fs.writeFileSync(contactsFile, JSON.stringify([]));
  }
}

function getContacts() {
  ensureDataDir();
  const data = fs.readFileSync(contactsFile, 'utf8');
  return JSON.parse(data);
}

function saveContacts(contacts) {
  ensureDataDir();
  fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));
}

export default function handler(req, res) {
  const authHeader = req.headers.authorization;

  if (req.method === 'POST') {
    // Public endpoint - anyone can submit contact form
    const newContact = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    const contacts = getContacts();
    contacts.push(newContact);
    saveContacts(contacts);
    return res.status(201).json({ success: true });
  }

  // Protected - only authenticated users can view
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const contacts = getContacts();
    return res.status(200).json(contacts);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
