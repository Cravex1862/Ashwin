import React, { useState, useEffect } from 'react';
import { Envelope, GithubLogo, StackOverflowLogo } from "@phosphor-icons/react";
import CMSLogin from './components/CMS/Login';
import CMSDashboard from './components/CMS/Dashboard';


function App() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCMS, setShowCMS] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = ['All', 'Games', 'Apps', 'Websites' , 'Electronics'];

  // Check for CMS route
  useEffect(() => {
    const checkRoute = () => {
      if (window.location.hash === '#/cms') {
        setShowCMS(true);
        const token = localStorage.getItem('cms_token');
        if (token) setIsLoggedIn(true);
      } else {
        setShowCMS(false);
      }
    };
    
    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    return () => window.removeEventListener('hashchange', checkRoute);
  }, []);

  // Fetch projects from API
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      console.log('Fetched projects:', data);
      setProjects(data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setProjects([]); // Set empty array on error
    }
  };

  const handleCMSLogin = (token) => {
    setIsLoggedIn(true);
  };

  const handleCMSLogout = () => {
    localStorage.removeItem('cms_token');
    setIsLoggedIn(false);
    setShowCMS(false);
    window.location.hash = '';
  };

  // Show CMS if route is /cms
  if (showCMS) {
    if (isLoggedIn) {
      return <CMSDashboard onLogout={handleCMSLogout} />;
    } else {
      return <CMSLogin onLogin={handleCMSLogin} />;
    }
  }

  const skills = [
    { name: 'HTML5', icon: '/icons/html5.png' },
    { name: 'CSS3', icon: '/icons/css3.png' },
    { name: 'JavaScript', icon: '/icons/javascript.png' },
    { name: 'React', icon: '/icons/react.png' },
    { name: 'Node.js', icon: '/icons/nodejs.png' },
    { name: 'MongoDB', icon: '/icons/mongodb.webp' },
    { name: 'Figma', icon: '/icons/figma.png' },
    { name: 'Tailwind', icon: '/icons/tailwind.webp' },
    { name: 'Blender', icon: '/icons/blender.png' },
    { name: 'Fusion 360', icon: '/icons/fusion360.png' },
    { name: 'Arduino', icon: '/icons/arduino.png' },
    { name: 'Raspberry Pi', icon: '/icons/raspberrypi.png' },
  ];

  return (
    <>
      {/* Navigation - Absolutely at top */}
      <nav 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 1000,
          backgroundColor: 'rgba(26, 26, 26, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgb(31, 41, 55)',
          margin: 0,
          padding: 0
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#76B2F0] to-[#F61BA9] bg-clip-text text-transparent">
            Ashwin
          </h1>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-2">
            <a href="#intro" className="px-4 py-1 rounded text-sm relative group overflow-hidden no-underline">
              <span className="absolute inset-0 rounded border-2 border-gray-600 group-hover:border-transparent transition"></span>
              <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition">
                <span className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
              </span>
              <span className="absolute inset-[2px] rounded bg-[#1a1a1a] z-[1]"></span>
              <span className="relative z-10">Intro</span>
            </a>
            <a href="#projects" className="px-4 py-1 rounded text-sm relative group overflow-hidden no-underline">
              <span className="absolute inset-0 rounded border-2 border-gray-600 group-hover:border-transparent transition"></span>
              <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition">
                <span className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
              </span>
              <span className="absolute inset-[2px] rounded bg-[#1a1a1a] z-[1]"></span>
              <span className="relative z-10">Projects</span>
            </a>
            <a href="#skills" className="px-4 py-1 rounded text-sm relative group overflow-hidden no-underline">
              <span className="absolute inset-0 rounded border-2 border-gray-600 group-hover:border-transparent transition"></span>
              <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition">
                <span className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
              </span>
              <span className="absolute inset-[2px] rounded bg-[#1a1a1a] z-[1]"></span>
              <span className="relative z-10">Skills</span>
            </a>
            <a href="#contact" className="px-4 py-1 rounded text-sm relative group overflow-hidden no-underline">
              <span className="absolute inset-0 rounded border-2 border-gray-600 group-hover:border-transparent transition"></span>
              <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition">
                <span className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
              </span>
              <span className="absolute inset-[2px] rounded bg-[#1a1a1a] z-[1]"></span>
              <span className="relative z-10">Contact</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md md:hidden z-40"
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh'
            }}
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}

        {/* Mobile Slide-out Menu */}
        <div 
          className={`fixed top-0 right-0 h-screen w-64 bg-[#1a1a1a]/95 backdrop-blur-xl border-l border-gray-800 transition-transform duration-300 ease-in-out md:hidden z-50 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ position: 'fixed' }}
        >
          <div className="flex flex-col gap-4 p-8 mt-20">
            <a 
              href="#intro" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded text-sm relative group overflow-hidden no-underline text-center"
            >
              <span className="absolute inset-0 rounded border-2 border-gray-600 group-hover:border-transparent transition"></span>
              <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition">
                <span className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
              </span>
              <span className="absolute inset-[2px] rounded bg-[#1a1a1a] z-[1]"></span>
              <span className="relative z-10">Intro</span>
            </a>
            <a 
              href="#projects" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded text-sm relative group overflow-hidden no-underline text-center"
            >
              <span className="absolute inset-0 rounded border-2 border-gray-600 group-hover:border-transparent transition"></span>
              <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition">
                <span className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
              </span>
              <span className="absolute inset-[2px] rounded bg-[#1a1a1a] z-[1]"></span>
              <span className="relative z-10">Projects</span>
            </a>
            <a 
              href="#skills" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded text-sm relative group overflow-hidden no-underline text-center"
            >
              <span className="absolute inset-0 rounded border-2 border-gray-600 group-hover:border-transparent transition"></span>
              <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition">
                <span className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
              </span>
              <span className="absolute inset-[2px] rounded bg-[#1a1a1a] z-[1]"></span>
              <span className="relative z-10">Skills</span>
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded text-sm relative group overflow-hidden no-underline text-center"
            >
              <span className="absolute inset-0 rounded border-2 border-gray-600 group-hover:border-transparent transition"></span>
              <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition">
                <span className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
              </span>
              <span className="absolute inset-[2px] rounded bg-[#1a1a1a] z-[1]"></span>
              <span className="relative z-10">Contact</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 999
          }}
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] text-white" style={{ marginTop: 0, paddingTop: 0 }}>
        {/* Hero - Add padding top to account for fixed navbar */}
        <section id="intro" className="border-b border-gray-800 flex items-center justify-center" style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
          <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            {/* Profile Image */}
            <div className="relative flex-shrink-0">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[#76B2F0] to-[#F61BA9] p-1">
                <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden">
                  <img
                    src="/profile.png"
                    alt="Profile"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Hero Text */}
            <div className="max-w-xl text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Ashwin Choudhury
              </h1>
              <p className="text-gray-400 mb-6">
                Hi, I'm Ashwin – a Full-Stack Web Developer skilled in the MERN stack, creating fast, scalable, and user-friendly web apps.
              </p>
              <div className="flex gap-3 justify-center md:justify-start">
                <a href="#contact" className="px-5 py-2 rounded font-semibold relative group overflow-hidden no-underline">
                  <span className="absolute inset-0 rounded opacity-100 group-hover:opacity-0 transition">
                    <span className="absolute inset-0 rounded bg-gradient-to-r from-[#76B2F0] to-[#F61BA9] p-[2px]">
                      <span className="absolute inset-[2px] rounded bg-[#1a1a1a]"></span>
                    </span>
                  </span>
                  <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition">
                    <span className="absolute inset-[-300%] bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
                  </span>
                  <span className="absolute inset-[2px] rounded bg-[#1a1a1a] z-[1]"></span>
                  <span className="relative z-10">Hire Me</span>
                </a>
                <a href="#projects" className="px-5 py-2 rounded relative group overflow-hidden no-underline">
                  <span className="absolute inset-0 rounded border-2 border-gray-600 group-hover:border-transparent transition"></span>
                  <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition">
                    <span className="absolute inset-[-300%] bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
                  </span>
                  <span className="absolute inset-[2px] rounded bg-[#1a1a1a] z-[1]"></span>
                  <span className="relative z-10">Projects</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6">My Projects</h3>
            
            {/* Filter Tags */}
            <div className="flex gap-3 mb-8 flex-wrap">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className="px-4 py-1.5 rounded text-sm relative group"
                >
                  <span className={`absolute inset-0 rounded p-[2px] transition ${
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-[#76B2F0] to-[#F61BA9]'
                      : 'bg-gray-600 group-hover:bg-gradient-to-r group-hover:from-[#76B2F0] group-hover:to-[#F61BA9]'
                  }`}>
                    <span className="absolute inset-[2px] rounded bg-[#1a1a1a]"></span>
                  </span>
                  <span className="relative z-10">{filter}</span>
                </button>
              ))}
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects && Array.isArray(projects) && projects
                .filter(project => activeFilter === 'All' || project.category === activeFilter)
                .map((project) => (
                  <div
                    key={project._id}
                    onClick={() => setSelectedProject(project)}
                    className="aspect-video bg-gray-700/30 border border-gray-700 rounded-lg hover:border-gray-600 transition cursor-pointer overflow-hidden group relative"
                  >
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                        <span className="text-gray-500 text-sm">{project.name}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition p-4 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold mb-2">{project.name}</h4>
                        <p className="text-xs text-gray-300 line-clamp-3">{project.description}</p>
                      </div>
                      <div className="flex gap-2">
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs px-3 py-1.5 rounded font-semibold relative group/btn overflow-hidden flex-1 text-center"
                          >
                            <span className="absolute inset-0 rounded border-2 border-gray-600 group-hover/btn:border-transparent transition"></span>
                            <span className="absolute inset-0 rounded opacity-0 group-hover/btn:opacity-100 transition">
                              <span className="absolute inset-[-300%] rounded bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
                            </span>
                            <span className="absolute inset-[2px] rounded bg-[#0f0f0f] z-[1]"></span>
                            <span className="relative z-10">GitHub</span>
                          </a>
                        )}
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs px-3 py-1.5 rounded font-semibold relative group/btn overflow-hidden flex-1 text-center"
                          >
                            <span className="absolute inset-0 rounded opacity-100 group-hover/btn:opacity-0 transition">
                              <span className="absolute inset-0 rounded bg-gradient-to-r from-[#76B2F0] to-[#F61BA9] p-[2px]">
                                <span className="absolute inset-[2px] rounded bg-[#0f0f0f]"></span>
                              </span>
                            </span>
                            <span className="absolute inset-0 rounded opacity-0 group-hover/btn:opacity-100 transition">
                              <span className="absolute inset-[-300%] rounded bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
                            </span>
                            <span className="absolute inset-[2px] rounded bg-[#0f0f0f] z-[1]"></span>
                            <span className="relative z-10">View Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              {(!projects || !Array.isArray(projects) || projects.filter(project => activeFilter === 'All' || project.category === activeFilter).length === 0) && (
                <div className="col-span-full text-center text-gray-400 py-12">
                  No projects yet. Check back soon!
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-6 py-10"
          onClick={() => setSelectedProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-[#0f0f0f] border border-gray-700 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 rounded-2xl pointer-events-none">
              <div className="absolute inset-0 opacity-40 bg-[conic-gradient(from_180deg,#76B2F0,#F61BA9,#76B2F0)]"></div>
            </div>
            <div className="relative z-10 bg-[#0f0f0f]">
              {selectedProject.image && (
                <div className="relative h-56 md:h-64">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/30 to-transparent"></div>
                </div>
              )}
              <div className="p-8">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                aria-label="Close project"
              >
                ✕
              </button>

                <h3 className="text-4xl md:text-5xl font-mono tracking-tight mb-4">
                  {selectedProject.name}
                </h3>

                <p className="text-gray-300 leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                <div className="border-t border-dashed border-gray-700 my-6"></div>

                <div className="flex flex-wrap gap-3">
                  {selectedProject.demoLink && (
                    <a
                      href={selectedProject.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 rounded font-semibold relative group overflow-hidden"
                    >
                      <span className="absolute inset-0 rounded opacity-100 group-hover:opacity-0 transition">
                        <span className="absolute inset-0 rounded bg-gradient-to-r from-[#76B2F0] to-[#F61BA9] p-[2px]">
                          <span className="absolute inset-[2px] rounded bg-[#0f0f0f]"></span>
                        </span>
                      </span>
                      <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition">
                        <span className="absolute inset-[-300%] rounded bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
                      </span>
                      <span className="absolute inset-[2px] rounded bg-[#0f0f0f] z-[1]"></span>
                      <span className="relative z-10">View Demo</span>
                    </a>
                  )}
                  {selectedProject.githubLink && (
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 rounded font-semibold relative group overflow-hidden"
                    >
                      <span className="absolute inset-0 rounded opacity-100 group-hover:opacity-0 transition">
                        <span className="absolute inset-0 rounded border-2 border-gray-600"></span>
                      </span>
                      <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition">
                        <span className="absolute inset-[-300%] rounded bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
                      </span>
                      <span className="absolute inset-[2px] rounded bg-[#0f0f0f] z-[1]"></span>
                      <span className="relative z-10">GitHub Repo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skills */}
      <section id="skills" className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6">My Skills</h3>
            
            {/* Skills Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 skills-grid">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  title={skill.name}
                  className="aspect-square rounded-lg flex items-center justify-center hover:scale-105 transition cursor-pointer p-4 relative group overflow-hidden"
                >
                  {/* Static border on default state */}
                  <span className="absolute inset-0 rounded border-2 border-gray-700 group-hover:border-transparent transition"></span>
                  
                  {/* Animated gradient border on hover */}
                  <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition">
                    <span className="absolute inset-[-300%] bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
                  </span>
                  
                  {/* Background */}
                  <span className="absolute inset-[2px] rounded bg-[#0f0f0f] z-[1]"></span>
                  
                  {/* Image */}
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    title={skill.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain relative z-10"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-center">
            {/* Left Side */}
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-4">
                Let's Build<br />Something Together
              </h3>
              <p className="text-gray-400 mb-6">
                I'm open for freelance projects, collaborations, or just chat. Let's connect!
              </p>
              
              {/* Contact Form */}
              <form className="space-y-4 mb-6" onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = {
                  name: formData.get('name'),
                  email: formData.get('email'),
                  reason: formData.get('reason')
                };
                try {
                  const response = await fetch('/api/contacts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                  });
                  if (response.ok) {
                    alert('Message sent successfully!');
                    e.target.reset();
                  }
                } catch (err) {
                  alert('Failed to send message. Please try again.');
                }
              }}>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 rounded bg-[#0f0f0f] border-2 border-gray-700 focus:border-transparent focus:outline-none text-white placeholder-gray-500 relative z-10"
                    style={{
                      background: 'linear-gradient(#0f0f0f, #0f0f0f) padding-box, linear-gradient(135deg, #76B2F0, #F61BA9) border-box',
                      borderColor: 'transparent'
                    }}
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 rounded bg-[#0f0f0f] border-2 border-gray-700 focus:border-transparent focus:outline-none text-white placeholder-gray-500 relative z-10"
                    style={{
                      background: 'linear-gradient(#0f0f0f, #0f0f0f) padding-box, linear-gradient(135deg, #76B2F0, #F61BA9) border-box',
                      borderColor: 'transparent'
                    }}
                  />
                </div>
                <div className="relative">
                  <textarea
                    name="reason"
                    placeholder="Reason for contacting"
                    rows="4"
                    required
                    className="w-full px-4 py-3 rounded bg-[#0f0f0f] border-2 border-gray-700 focus:border-transparent focus:outline-none text-white placeholder-gray-500 resize-none relative z-10"
                    style={{
                      background: 'linear-gradient(#0f0f0f, #0f0f0f) padding-box, linear-gradient(135deg, #76B2F0, #F61BA9) border-box',
                      borderColor: 'transparent'
                    }}
                  ></textarea>
                </div>
                <button type="submit" className="px-6 py-3 rounded inline-flex items-center gap-2 font-semibold relative group overflow-hidden transition-shadow group-hover:shadow-[0_0_20px_rgba(118,178,240,0.45),0_0_30px_rgba(246,27,169,0.35)]">
                  <span className="absolute inset-0 rounded opacity-100 group-hover:opacity-0 transition">
                    <span className="absolute inset-0 rounded bg-gradient-to-r from-[#76B2F0] to-[#F61BA9] p-[2px]">
                      <span className="absolute inset-[2px] rounded bg-[#0f0f0f]"></span>
                    </span>
                  </span>
                  <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition">
                    <span className="absolute inset-[-300%] rounded bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
                  </span>
                  <span className="absolute inset-[2px] rounded bg-[#0f0f0f] z-[1]"></span>
                  <span className="relative z-10 flex items-center gap-2">
                    <Envelope size={26} weight="duotone" style={{ background: 'linear-gradient(135deg, #76B2F0 0%, #F61BA9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} />
                    <span>Send Message</span>
                  </span>
                </button>
              </form>
              
              <div className="flex gap-4">
                <a href="https://github.com/Cravex1862" target="_blank" rel="noopener noreferrer" className="w-12 h-12 hover:scale-110 transition flex items-center justify-center">
                  <GithubLogo size={32} weight="duotone" className="bg-gradient-to-r from-[#76B2F0] to-[#F61BA9]" style={{ background: 'linear-gradient(135deg, #76B2F0 0%, #F61BA9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} />
                </a>
                <a href="https://stackoverflow.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 hover:scale-110 transition flex items-center justify-center">
                  <StackOverflowLogo size={32} weight="duotone" style={{ background: 'linear-gradient(135deg, #76B2F0 0%, #F61BA9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} />
                </a>
              </div>
            </div>

            {/* Right Side - VS Code Desktop Mockup */}
            <div className="flex-1 w-full lg:max-w-2xl flex items-center justify-center" style={{ perspective: '1500px' }}>
              <div 
                className="w-full transition-transform duration-500"
                style={{ transform: 'rotateY(-25deg) rotateX(8deg)', transformStyle: 'preserve-3d' }}
              >
                {/* Desktop Window */}
                <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-2xl border border-gray-700">
                  {/* Window Title Bar */}
                  <div className="bg-[#323233] px-5 py-3 flex items-center justify-between border-b border-gray-800">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                    </div>
                    <div className="text-sm text-gray-400 flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M14.773 3.485l-.78-.184-2.108 2.096-1.194-1.216 2.056-2.157-.18-.792a4.42 4.42 0 0 0-1.347-.228 3.64 3.64 0 0 0-1.457.28 3.824 3.824 0 0 0-1.186.84 3.736 3.736 0 0 0-.875 1.265 3.938 3.938 0 0 0 0 2.966 3.736 3.736 0 0 0 .875 1.265l.066.066-.267.271a.5.5 0 0 0-.133.34v.001l-.066 1.38a.5.5 0 0 0 .5.5h1.38a.5.5 0 0 0 .34-.133l.271-.267.066.066a3.824 3.824 0 0 0 1.265.875 3.938 3.938 0 0 0 2.966 0 3.824 3.824 0 0 0 1.265-.875 3.736 3.736 0 0 0 .84-1.186 3.64 3.64 0 0 0 .28-1.457 4.42 4.42 0 0 0-.228-1.347z"/>
                      </svg>
                      <span>coffeeCounter.js</span>
                    </div>
                    <div className="w-12"></div>
                  </div>
                  
                  <div className="bg-[#1e1e1e] p-6 font-mono text-sm">
                    {/* Code Editor Content */}
                    <div className="space-y-1.5">
                      <div className="flex">
                        <span className="text-gray-600 w-8 text-right mr-4">1</span>
                        <span className="text-gray-500">{'// Easter Egg: Developer\'s Coffee Tracker ☕'}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-8 text-right mr-4">2</span>
                        <span></span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-8 text-right mr-4">3</span>
                        <span className="text-[#569cd6]">let </span>
                        <span className="text-[#9cdcfe]">cupsOfCoffee </span>
                        <span className="text-white">= </span>
                        <span className="text-[#b5cea8]">0</span>
                        <span className="text-white">;</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-8 text-right mr-4">4</span>
                        <span className="text-[#569cd6]">let </span>
                        <span className="text-[#9cdcfe]">productivity </span>
                        <span className="text-white">= </span>
                        <span className="text-[#b5cea8]">50</span>
                        <span className="text-white">;</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-8 text-right mr-4">5</span>
                        <span></span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-8 text-right mr-4">6</span>
                        <span className="text-[#569cd6]">function </span>
                        <span className="text-[#dcdcaa]">drinkCoffee</span>
                        <span className="text-white">() {'{'}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-8 text-right mr-4">7</span>
                        <span className="ml-4 text-[#9cdcfe]">cupsOfCoffee</span>
                        <span className="text-white">++;</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-8 text-right mr-4">8</span>
                        <span className="ml-4 text-[#9cdcfe]">productivity </span>
                        <span className="text-white">+= </span>
                        <span className="text-[#b5cea8]">20</span>
                        <span className="text-white">;</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-8 text-right mr-4">9</span>
                        <span></span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-8 text-right mr-4">10</span>
                        <span className="ml-4 text-[#569cd6]">if </span>
                        <span className="text-white">(</span>
                        <span className="text-[#9cdcfe]">cupsOfCoffee </span>
                        <span className="text-white">&gt; </span>
                        <span className="text-[#b5cea8]">5</span>
                        <span className="text-white">) {'{'}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-8 text-right mr-4">11</span>
                        <span className="ml-8 text-[#9cdcfe]">productivity </span>
                        <span className="text-white">= </span>
                        <span className="text-[#b5cea8]">0</span>
                        <span className="text-white">;</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-8 text-right mr-4">12</span>
                        <span className="ml-8 text-[#dcdcaa]">console</span>
                        <span className="text-white">.</span>
                        <span className="text-[#dcdcaa]">log</span>
                        <span className="text-white">(</span>
                        <span className="text-[#ce9178]">"Too much caffeine! 😵"</span>
                        <span className="text-white">);</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-8 text-right mr-4">13</span>
                        <span className="ml-8 text-[#569cd6]">return </span>
                        <span className="text-[#ce9178]">"Time to sleep! 😴"</span>
                        <span className="text-white">;</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-8 text-right mr-4">14</span>
                        <span className="ml-4 text-white">{'}'}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-8 text-right mr-4">15</span>
                        <span></span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-8 text-right mr-4">16</span>
                        <span className="ml-4 text-[#dcdcaa]">console</span>
                        <span className="text-white">.</span>
                        <span className="text-[#dcdcaa]">log</span>
                        <span className="text-white">(</span>
                        <span className="text-[#ce9178]">`Productivity: ${'{'}</span>
                        <span className="text-[#9cdcfe]">productivity</span>
                        <span className="text-[#ce9178]">{'}'}`</span>
                        <span className="text-white">);</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-8 text-right mr-4">17</span>
                        <span className="ml-4 text-[#569cd6]">return </span>
                        <span className="text-[#ce9178]">"Keep coding! 💪☕"</span>
                        <span className="text-white">;</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-8 text-right mr-4">18</span>
                        <span className="text-white">{'}'}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-8 text-right mr-4">19</span>
                        <span></span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-8 text-right mr-4">20</span>
                        <span className="text-gray-500">{'// Start coding session'}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 w-8 text-right mr-4">21</span>
                        <span className="text-[#dcdcaa]">drinkCoffee</span>
                        <span className="text-white">();</span>
                        <span className="text-gray-500">{' // ☕ First cup!'}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Bar */}
                  <div className="bg-[#007acc] px-4 py-1 flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-3">
                      <span>⚡ JavaScript</span>
                      <span>UTF-8</span>
                    </div>
                    <div>Ln 4, Col 7</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-gray-800 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Ashwin Choudhury. All rights reserved.</p>
          <a 
            href="#/cms" 
            className="text-gray-600 hover:text-gray-400 transition text-xs mt-2 inline-block"
          >
            Admin
          </a>
        </div>
      </footer>
      </div>
    </>
  );
}

export default App;
