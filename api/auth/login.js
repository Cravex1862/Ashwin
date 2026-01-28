export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // Check credentials against environment variables
  if (
    username === process.env.CMS_USERNAME &&
    password === process.env.CMS_PASSWORD
  ) {
    // Generate a simple token (in production, use JWT)
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
    
    return res.status(200).json({ 
      success: true, 
      token,
      message: 'Login successful' 
    });
  }

  return res.status(401).json({ 
    success: false, 
    message: 'Invalid credentials' 
  });
}
