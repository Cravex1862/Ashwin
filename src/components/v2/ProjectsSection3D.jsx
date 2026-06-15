import React from 'react';
import { playClickSound } from '../../utils/audio';

export default function ProjectsSection3D({ phase, projects, onProjectClick }) {
  const displayProjects = projects && projects.length > 0 ? projects : [
    { name: 'Placeholder E-Commerce App', _id: '1' },
    { name: 'Social Media Dashboard', _id: '2' },
    { name: 'Interactive 3D Data Visualizer', _id: '3' },
    { name: 'AI Image Generator', _id: '4' },
    { name: 'Web3 Crypto Wallet', _id: '5' }
  ];

  // We want an infinite marquee, so we duplicate the projects once.
  const marqueeProjects = [...displayProjects, ...displayProjects];

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: phase === 3 ? 1 : 0, transition: 'opacity 0.8s', pointerEvents: phase === 3 ? 'auto' : 'none', width: '100%', maxWidth: '100vw', overflow: 'hidden' }}>
      
      {/* 
        Changes made: 
        1. Larger Title (fontSize: 3.5rem up from 1.5rem)
        2. CSS infinite marquee animation instead of interval script
      */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* Scrolls half the duplicated width */
        }
        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <h2 style={{ fontFamily: "'Merriweather', serif", fontSize: '3.5rem', margin: '0 0 50px 0', textShadow: '0 4px 20px rgba(0,0,0,0.9)', color: '#ffffff', textAlign: 'center' }}>
        Featured Projects
      </h2>
      
      <div className="marquee-container w-full overflow-hidden relative py-4">
        <div 
          className="marquee-track flex gap-8 w-max"
          style={{ 
            animation: 'marquee 30s linear infinite',
            paddingLeft: '2rem'
          }}
        >
          {marqueeProjects.map((p, i) => (
            <div 
              key={i} 
              onClick={() => { playClickSound(); onProjectClick && onProjectClick(p); }} 
              className="cursor-pointer flex-shrink-0 relative group shadow-2xl transition-transform duration-300 hover:scale-[1.02] w-[450px] bg-[#0f0f0f]/50 backdrop-blur-md rounded-2xl"
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  playClickSound();
                  if (onProjectClick) onProjectClick(p);
                }
              }}
            >
              {/* SVG Animated Border */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition duration-500 z-0 rounded-2xl">
                <defs>
                  <linearGradient id={`proj-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#76B2F0" />
                    <stop offset="25%" stopColor="#F61BA9" />
                    <stop offset="50%" stopColor="#76B2F0" />
                    <stop offset="75%" stopColor="#F61BA9" />
                    <stop offset="100%" stopColor="#76B2F0" />
                    <animateTransform attributeName="gradientTransform" type="rotate" from="0 0.5 0.5" to="360 0.5 0.5" dur="3s" repeatCount="indefinite" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" rx="16" fill="none" stroke={`url(#proj-grad-${i})`} strokeWidth="4" />
              </svg>
              {/* Static Border */}
              <div className="absolute inset-0 rounded-2xl border border-gray-700/50 group-hover:border-transparent transition z-0 pointer-events-none"></div>
              
              <div className="relative z-10 w-full flex flex-col gap-4 p-5 h-full">
                <div className="w-full h-48 flex-shrink-0 rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
                  {p.image ? (
                     <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                     <div className="w-full h-full flex items-center justify-center text-gray-600 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] font-mono text-sm">No Image</div>
                  )}
                </div>
                <div className="flex flex-col flex-1 justify-start">
                  <h3 style={{ fontFamily: "'Raleway', sans-serif", color: '#ffffff', margin: '0 0 10px 0', fontSize: '1.8rem', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{p.name}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3" style={{ fontFamily: "'Raleway', sans-serif" }}>
                    {p.description || "An immersive web experience."}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
