import React, { useState, useEffect } from 'react';
import ProjectCreate from './ProjectCreate';
import ContactRequests from './ContactRequests';

export default function CMSDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    }
  };

  const handleProjectCreated = () => {
    fetchProjects();
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    
    try {
      const token = localStorage.getItem('cms_token');
      await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchProjects();
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] text-white">
      {/* Header */}
      <nav className="border-b border-gray-800 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#76B2F0] to-[#F61BA9] bg-clip-text text-transparent">
            CMS Dashboard
          </h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded bg-red-500/20 border border-red-500 text-red-400 hover:bg-red-500/30 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Tabs */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-3 font-medium transition relative ${
                activeTab === 'projects'
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Projects
              {activeTab === 'projects' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#76B2F0] to-[#F61BA9]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-6 py-3 font-medium transition relative ${
                activeTab === 'contacts'
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Contact Requests
              {activeTab === 'contacts' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#76B2F0] to-[#F61BA9]"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'projects' && (
          <div className="space-y-8">
            <ProjectCreate onProjectCreated={handleProjectCreated} />
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Existing Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-[#0f0f0f] border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition"
                  >
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-40 object-cover rounded mb-3"
                      />
                    )}
                    <h3 className="font-bold mb-2">{project.name}</h3>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex gap-2">
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-3 py-1 rounded bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                        >
                          View Demo
                        </a>
                      )}
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-xs px-3 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && <ContactRequests />}
      </div>
    </div>
  );
}
