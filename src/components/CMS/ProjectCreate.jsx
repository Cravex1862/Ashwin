import React, { useState } from 'react';

export default function ProjectCreate({ onProjectCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    demoLink: '',
    githubLink: '',
    category: 'All'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('cms_token');
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({
          name: '',
          description: '',
          image: '',
          demoLink: '',
          githubLink: '',
          category: 'All'
        });
        onProjectCreated();
        alert('Project created successfully!');
      }
    } catch (err) {
      alert('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0f0f0f] border border-gray-700 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Project Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded bg-[#1a1a1a] border-2 border-gray-700 focus:border-[#76B2F0] focus:outline-none text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 rounded bg-[#1a1a1a] border-2 border-gray-700 focus:border-[#76B2F0] focus:outline-none text-white resize-none"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded bg-[#1a1a1a] border-2 border-gray-700 focus:border-[#76B2F0] focus:outline-none text-white"
          >
            <option value="All">All</option>
            <option value="Games">Games</option>
            <option value="Apps">Apps</option>
            <option value="Websites">Websites</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-3 rounded bg-[#1a1a1a] border-2 border-gray-700 focus:border-[#76B2F0] focus:outline-none text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Demo Link / Video (for hardware)</label>
          <input
            type="url"
            name="demoLink"
            value={formData.demoLink}
            onChange={handleChange}
            placeholder="https://example.com/demo or https://youtube.com/watch?v=..."
            className="w-full px-4 py-3 rounded bg-[#1a1a1a] border-2 border-gray-700 focus:border-[#76B2F0] focus:outline-none text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">GitHub Repository Link</label>
          <input
            type="url"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
            placeholder="https://github.com/username/repo"
            className="w-full px-4 py-3 rounded bg-[#1a1a1a] border-2 border-gray-700 focus:border-[#76B2F0] focus:outline-none text-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 rounded font-semibold relative group overflow-hidden"
        >
          <span className="absolute inset-0 rounded bg-gradient-to-r from-[#76B2F0] to-[#F61BA9] p-[2px]">
            <span className="absolute inset-[2px] rounded bg-[#1a1a1a]"></span>
          </span>
          <span className="relative z-10">
            {loading ? 'Creating...' : 'Create Project'}
          </span>
        </button>
      </form>
    </div>
  );
}
