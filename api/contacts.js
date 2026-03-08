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
    const contacts = db.collection('contacts');

    // POST - Public endpoint to submit contact form
    if (req.method === 'POST') {
      const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
      const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
      const reason = typeof req.body?.reason === 'string' ? req.body.reason.trim() : '';

      if (!name || !email || !reason) {
        return res.status(400).json({ error: 'Name, email, and reason are required' });
      }

      // Block rapid duplicate submissions from accidental repeated clicks.
      const duplicateWindowStart = new Date(Date.now() - 60 * 1000);
      const existingRecent = await contacts.findOne({
        name,
        email,
        reason,
        createdAt: { $gte: duplicateWindowStart }
      });

      if (existingRecent) {
        return res.status(409).json({
          success: false,
          duplicate: true,
          message: 'This message was already received recently.'
        });
      }

      const newContact = {
        name,
        email,
        reason,
        createdAt: new Date()
      };
      const result = await contacts.insertOne(newContact);
      return res.status(201).json({ success: true, _id: result.insertedId });
    }

    // GET - Protected endpoint to view contacts
    if (req.method === 'GET') {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const allContacts = await contacts.find({}).sort({ createdAt: -1 }).toArray();
      return res.status(200).json(allContacts);
    }

    // DELETE - Protected endpoint to delete a contact
    if (req.method === 'DELETE') {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { id } = req.query;
      const { ObjectId } = await import('mongodb');
      const result = await contacts.deleteOne({ _id: new ObjectId(id) });
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Contact not found' });
      }
      
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database operation failed', message: error.message });
  }
}
