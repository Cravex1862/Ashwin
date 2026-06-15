import React from 'react';
import { playClickSound, playWhooshSound } from '../../utils/audio';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function HeroPortal({ phase }) {
  const scrollToProjects = () => {
    playClickSound();
    playWhooshSound(500);
    gsap.to(window, { scrollTo: { y: window.innerHeight * 2, autoKill: false }, duration: 1.0, ease: 'power2.out' });
  };

  const scrollToContact = () => {
    playClickSound();
    playWhooshSound(500);
    gsap.to(window, { scrollTo: { y: window.innerHeight * 3, autoKill: false }, duration: 1.2, ease: 'power2.out' });
  };

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: phase === 1 ? 1 : 0, transition: 'opacity 0.8s', textAlign: 'center', maxWidth: '800px', width: '90%', pointerEvents: phase === 1 ? 'auto' : 'none' }}>
      <h1 style={{ fontFamily: "'Merriweather', serif", fontSize: '5rem', textShadow: '0 0 20px rgba(118,178,240,0.8)', margin: '0 0 20px 0', letterSpacing: '2px', color: '#ffffff' }}>
        Ashwin Choudhury
      </h1>
      <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '1.5rem', color: '#dddddd', lineHeight: '1.6', textShadow: '0 2px 10px rgba(0,0,0,0.8)', margin: '0 0 40px 0' }}>
        Hi, I'm Ashwin – a Full-Stack Web Developer skilled in the MERN stack, creating fast, scalable, and user-friendly web apps.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={scrollToContact} 
          className="px-6 py-3 rounded font-semibold relative group overflow-hidden no-underline cursor-pointer border-none bg-transparent"
        >
          <span className="absolute inset-0 rounded opacity-100 group-hover:opacity-0 transition">
            <span className="absolute inset-0 rounded bg-gradient-to-r from-[#76B2F0] to-[#F61BA9] p-[2px]">
              <span className="absolute inset-[2px] rounded bg-[#1a1a1a]"></span>
            </span>
          </span>
          <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition">
            <span className="absolute inset-[-300%] bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
          </span>
          <span className="absolute inset-[2px] rounded bg-[#1a1a1a] z-[1]"></span>
          <span className="relative z-10" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#ffffff', fontSize: '1.1rem' }}>Hire Me</span>
        </button>
        <button 
          onClick={scrollToProjects} 
          className="px-6 py-3 rounded font-semibold relative group overflow-hidden no-underline cursor-pointer border-none bg-transparent"
        >
          <span className="absolute inset-0 rounded border-2 border-gray-600 group-hover:border-transparent transition"></span>
          <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition">
            <span className="absolute inset-[-300%] bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
          </span>
          <span className="absolute inset-[2px] rounded bg-[#1a1a1a] z-[1]"></span>
          <span className="relative z-10" style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#ffffff', fontSize: '1.1rem' }}>Projects</span>
        </button>
      </div>
    </div>
  );
}
