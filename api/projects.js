import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  if (!uri) {
    return res.status(500).json({ error: 'Database not configured' });
  }

  try {
    const client = await connectToDatabase();
    const db = client.db('portfolio');
    const projects = db.collection('projects');

    // GET - Fetch all projects (public)
    if (req.method === 'GET') {
      const allProjects = await projects.find({}).sort({ createdAt: -1 }).toArray();
      return res.status(200).json(allProjects);
    }

    // Check auth for write operations
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // POST - Create project
    if (req.method === 'POST') {
      const newProject = {
        ...req.body,
        createdAt: new Date()
      };
      const result = await projects.insertOne(newProject);
      return res.status(201).json({ ...newProject, _id: result.insertedId });
    }

    // DELETE - Delete project
    if (req.method === 'DELETE') {
      const { id } = req.query;
      const { ObjectId } = await import('mongodb');
      await projects.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database operation failed', message: error.message });
  }
}
