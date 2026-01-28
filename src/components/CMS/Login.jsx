import React, { useState } from 'react';

export default function CMSLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('cms_token', data.token);
        onLogin(data.token);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-[#76B2F0] to-[#F61BA9] bg-clip-text text-transparent">
          CMS Login
        </h1>
        <p className="text-gray-400 text-center mb-8">Access your content management system</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded bg-[#0f0f0f] border-2 border-gray-700 focus:border-[#76B2F0] focus:outline-none text-white placeholder-gray-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded bg-[#0f0f0f] border-2 border-gray-700 focus:border-[#76B2F0] focus:outline-none text-white placeholder-gray-500"
              required
            />
          </div>
          
          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 rounded font-semibold relative group overflow-hidden"
          >
            <span className="absolute inset-0 rounded bg-gradient-to-r from-[#76B2F0] to-[#F61BA9] p-[2px]">
              <span className="absolute inset-[2px] rounded bg-[#1a1a1a]"></span>
            </span>
            <span className="relative z-10">
              {loading ? 'Logging in...' : 'Login'}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
