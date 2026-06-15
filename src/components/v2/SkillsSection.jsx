import React from 'react';

const mySkills = [
  { name: 'HTML5', img: '/icons/html5.png', desc: 'Semantic layout architecture' },
  { name: 'CSS3', img: '/icons/css3.png', desc: 'Fluid UI & animations' },
  { name: 'JavaScript', img: '/icons/javascript.png', desc: 'Core logic & rendering' },
  { name: 'React', img: '/icons/react.png', desc: 'Component lifecycle management' },
  { name: 'Node.js', img: '/icons/nodejs.png', desc: 'Scalable backend services' },
  { name: 'MongoDB', img: '/icons/mongodb.webp', desc: 'NoSQL architecture' },
  { name: 'Tailwind', img: '/icons/tailwind.webp', desc: 'Utility-first pipelines' },
  { name: 'Figma', img: '/icons/figma.png', desc: 'UI/UX Prototyping' },
  { name: 'Blender', img: '/icons/blender.png', desc: '3D Modeling & Rendering' },
  { name: 'Three.js', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg', desc: 'WebGL & Shaders' }
];

export default function SkillsSection({ phase }) {
  return (
    <div style={{ position: 'absolute', top: '10%', left: '10%', opacity: phase === 2 ? 1 : 0, transition: 'opacity 0.8s', width: '80%', pointerEvents: phase === 2 ? 'auto' : 'none' }}>
      <h2 style={{ fontFamily: "'Merriweather', serif", fontSize: '3.5rem', margin: '0 0 30px 0', textShadow: '0 4px 10px rgba(0,0,0,0.8)', color: '#ffffff' }}>
        Expertise
      </h2>
      <div className="flex flex-wrap gap-5">
        {mySkills.map(skill => (
          <div 
            key={skill.name} 
            className="relative group rounded-lg flex flex-col items-center justify-center p-5 transition-transform bg-[#0f0f0f]/50 shadow-2xl backdrop-blur-md"
            style={{ width: '220px' }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width/2;
              const y = e.clientY - rect.top - rect.height/2;
              e.currentTarget.style.transform = `perspective(500px) rotateX(${-y/10}deg) rotateY(${x/10}deg) translateY(-5px)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            }}
          >
            {/* SVG Animated Border */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition duration-500 z-0 rounded-lg">
              <defs>
                <linearGradient id={`skill-grad-${skill.name.replace(/\\s+/g, '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#76B2F0" />
                  <stop offset="25%" stopColor="#F61BA9" />
                  <stop offset="50%" stopColor="#76B2F0" />
                  <stop offset="75%" stopColor="#F61BA9" />
                  <stop offset="100%" stopColor="#76B2F0" />
                  <animateTransform attributeName="gradientTransform" type="rotate" from="0 0.5 0.5" to="360 0.5 0.5" dur="3s" repeatCount="indefinite" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" rx="8" fill="none" stroke={`url(#skill-grad-${skill.name.replace(/\\s+/g, '')})`} strokeWidth="4" />
            </svg>
            {/* Static Border */}
            <div className="absolute inset-0 rounded-lg border border-gray-700/50 group-hover:border-transparent transition z-0 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center pointer-events-none">
              <img src={skill.img} alt={skill.name} className="w-16 h-16 mb-4 object-contain" />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#ffffff', fontSize: '1.4rem', fontWeight: 'bold' }}>{skill.name}</span>
              <p style={{ fontFamily: "'Raleway', sans-serif", color: '#ffffff', fontSize: '1rem', textAlign: 'center', margin: '10px 0 0 0' }}>{skill.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
