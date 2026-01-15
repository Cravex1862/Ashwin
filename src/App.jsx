import React, { useState } from 'react';

function App() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filters = ['All', 'Games', 'Apps', 'E-commerce'];

  const skills = [
    { name: 'HTML5', icon: '/icons/html5.png' },
    { name: 'CSS3', icon: '/icons/css3.png' },
    { name: 'JavaScript', icon: '/icons/javascript.png' },
    { name: 'Figma', icon: '/icons/figma.png' },
    { name: 'MongoDB', icon: '/icons/mongodb.png' },
    { name: 'Express.js', icon: '/icons/expressjs.png' },
    { name: 'React', icon: '/icons/react.png' },
    { name: 'Node.js', icon: '/icons/nodejs.png' },
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
            Portfolio
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
        <section id="intro" className="border-b border-gray-800" style={{ paddingTop: '80px' }}>
          <div className="max-w-7xl mx-auto px-6 py-8">

          <div className="flex items-center gap-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#76B2F0] to-[#F61BA9] p-1">
                <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden">
                  <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Hero Text */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">
                Ashwin<br />Choudhury
              </h1>
              <p className="text-gray-400 mb-4 max-w-md">
                Hi, I'm Ashwin – a Full-Stack Web Developer passionate about the MERN stack. Creating fast, scalable, and user-friendly web apps.
              </p>
              <div className="flex gap-3">
                <button className="px-5 py-2 rounded font-semibold relative group overflow-hidden">
                  <span className="absolute inset-0 rounded opacity-100 group-hover:opacity-0 transition">
                    <span className="absolute inset-0 rounded bg-gradient-to-r from-[#76B2F0] to-[#F61BA9] p-[2px]">
                      <span className="absolute inset-[2px] rounded bg-[#1a1a1a]"></span>
                    </span>
                  </span>
                  <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition">
                    <span className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
                  </span>
                  <span className="absolute inset-[2px] rounded bg-[#1a1a1a] z-[1]"></span>
                  <span className="relative z-10">Hire Me</span>
                </button>
                <button className="px-5 py-2 rounded relative group overflow-hidden">
                  <span className="absolute inset-0 rounded border-2 border-gray-600 group-hover:border-transparent transition"></span>
                  <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition">
                    <span className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
                  </span>
                  <span className="absolute inset-[2px] rounded bg-[#1a1a1a] z-[1]"></span>
                  <span className="relative z-10">Projects</span>
                </button>
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
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="aspect-video bg-gray-700/30 border border-gray-700 rounded-lg hover:border-gray-600 transition cursor-pointer"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6">My Skills</h3>
            
            {/* Skills Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="aspect-square bg-white rounded-lg flex items-center justify-center hover:scale-105 transition cursor-pointer border-2 border-gray-700 p-4"
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            {/* Left Side */}
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-4">
                Let's Build<br />Something Together
              </h3>
              <p className="text-gray-400 mb-6">
                I'm open for freelance projects, collaborations, or just chat. Let's connect!
              </p>
              <button className="px-6 py-3 rounded flex items-center gap-2 font-semibold relative group overflow-hidden">
                <span className="absolute inset-0 rounded opacity-100 group-hover:opacity-0 transition">
                  <span className="absolute inset-0 rounded bg-gradient-to-r from-[#76B2F0] to-[#F61BA9] p-[2px]">
                    <span className="absolute inset-[2px] rounded bg-[#1a1a1a]"></span>
                  </span>
                </span>
                <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition">
                  <span className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
                </span>
                <span className="absolute inset-[2px] rounded bg-[#1a1a1a] z-[1]"></span>
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-2xl">&lt;/&gt;</span>
                  <span>Contact</span>
                </span>
              </button>
              <div className="flex gap-4 mt-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 hover:scale-110 transition">
                  <img src="/icons/github.png" alt="GitHub" className="w-full h-full object-contain" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 hover:scale-110 transition">
                  <img src="/icons/linkedin.png" alt="LinkedIn" className="w-full h-full object-contain" />
                </a>
              </div>
            </div>

            {/* Right Side - Code Snippet */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-2 border-cyan-500/50 rounded-lg p-6">
                <pre className="text-xs text-cyan-400 font-mono overflow-x-auto">
                  <code>{`// Hi, my "Hi" idea is the "Metaverse". -->
// And here's how I see it:

const Idea = {
  Name: "The Metaverse",
  About: "The digital universe",
  Description: "People can interact, share... [truncated]
  From: "Facebook Inc. Rebranded",
  To: "Meta Inc.",
  Status: "In Progress..."
};
// _getStarted_`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default App;
