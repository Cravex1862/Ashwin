import React, { useState } from 'react';
import { Envelope, GithubLogo, StackOverflowLogo } from "@phosphor-icons/react";


function App() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filters = ['All', 'Games', 'Apps', 'E-commerce'];

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
                  <img src="/profile.png" alt="Profile" className="w-full h-full object-cover" />
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
                    <span className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
                  </span>
                  
                  {/* Background */}
                  <span className="absolute inset-[2px] rounded bg-[#0f0f0f] z-[1]"></span>
                  
                  {/* Image */}
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    title={skill.name}
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
              <a href="mailto:ashwinchoudhury1310@gmail.com" className="px-6 py-3 rounded inline-flex items-center gap-2 font-semibold relative group overflow-hidden no-underline">
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
                  <Envelope size={26} weight="duotone" style={{ background: 'linear-gradient(135deg, #76B2F0 0%, #F61BA9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} />
                  <span>Contact</span>
                </span>
              </a>
              <div className="flex gap-4 mt-4">
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
      </div>
    </>
  );
}

export default App;
