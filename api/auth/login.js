export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // Check credentials against environment variables
  const validUsername = process.env.CMS_USERNAME;
  const validPassword = process.env.CMS_PASSWORD;

  if (!validUsername || !validPassword) {
    return res.status(500).json({ 
      success: false, 
      message: 'Server error: credentials not configured' 
    });
  }

  if (
    username === validUsername &&
    password === validPassword
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
