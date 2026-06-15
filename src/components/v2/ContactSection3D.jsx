import React, { useState } from 'react';
import { GithubLogo, StackOverflowLogo, Envelope } from '@phosphor-icons/react';
import { playClickSound } from '../../utils/audio';

export default function ContactSection3D({ phase }) {
  const [isSendingContact, setIsSendingContact] = useState(false);
  const [contactMessage, setContactMessage] = useState('');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    playClickSound();
    setIsSendingContact(true);
    setContactMessage('Sending message...');
    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) setContactMessage('Message sent securely!');
      else setContactMessage('Transmission failed. Try again.');
      e.target.reset();
    } catch {
      setContactMessage('Transmission failed. Try again.');
    }
    setIsSendingContact(false);
    setTimeout(() => setContactMessage(''), 4000);
  };

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: phase === 5 ? 1 : 0, transition: 'opacity 0.8s', pointerEvents: phase === 5 ? 'auto' : 'none', width: '90%', maxWidth: '1200px' }}>
      <div className="flex flex-col lg:flex-row gap-12 items-center justify-center w-full">
        
        <div className="w-full flex-1 max-w-2xl bg-[#0f0f0f]/50 p-8 rounded-2xl border border-gray-700/50 shadow-2xl backdrop-blur-md relative overflow-hidden">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Let's Build<br />Something Together
          </h2>
          <p className="text-gray-400 mb-6">
            I'm open for freelance projects, collaborations, or just chat. Let's connect!
          </p>

          <form className="space-y-4 mb-6" onSubmit={handleContactSubmit} aria-label="Contact form">
            <div className="relative">
              <label htmlFor="contact-name" className="sr-only">Your Name</label>
              <input
                id="contact-name"
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
              <label htmlFor="contact-email" className="sr-only">Your Email</label>
              <input
                id="contact-email"
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
              <label htmlFor="contact-reason" className="sr-only">Reason for contacting</label>
              <textarea
                id="contact-reason"
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
            <button
              type="submit"
              disabled={isSendingContact}
              className="px-6 py-3 rounded inline-flex items-center gap-2 font-semibold relative group overflow-hidden transition-shadow group-hover:shadow-[0_0_20px_rgba(118,178,240,0.45),0_0_30px_rgba(246,27,169,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
              aria-label="Send message"
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
              <span className="relative z-10 flex items-center gap-2 text-white">
                <Envelope size={26} weight="duotone" style={{ background: 'linear-gradient(135deg, #76B2F0 0%, #F61BA9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} />
                <span>{isSendingContact ? 'Sending...' : 'Send Message'}</span>
              </span>
            </button>
            {contactMessage && (
              <p
                className="text-sm text-gray-300 contact-submit-message visible"
                role="status"
                aria-live="polite"
              >
                {contactMessage}
              </p>
            )}
          </form>

          <div className="flex gap-4">
            <a href="https://github.com/Cravex1862" target="_blank" rel="noopener noreferrer" className="w-12 h-12 hover:scale-110 transition flex items-center justify-center" aria-label="GitHub Profile">
              <GithubLogo size={32} weight="duotone" className="bg-gradient-to-r from-[#76B2F0] to-[#F61BA9]" style={{ background: 'linear-gradient(135deg, #76B2F0 0%, #F61BA9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} />
            </a>
            <a href="https://stackoverflow.com/users/32289677/cravex1862" target="_blank" rel="noopener noreferrer" className="w-12 h-12 hover:scale-110 transition flex items-center justify-center" aria-label="Stack Overflow Profile">
              <StackOverflowLogo size={32} weight="duotone" style={{ background: 'linear-gradient(135deg, #76B2F0 0%, #F61BA9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} />
            </a>
          </div>
        </div>

        <div className="flex-1 w-full hidden lg:flex items-center justify-center lg:max-w-xl" style={{ perspective: '1500px' }}>
          <div
            className="w-full transition-transform duration-300"
            style={{ transform: 'rotateY(-25deg) rotateX(8deg)', transformStyle: 'preserve-3d' }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width/2;
              const y = e.clientY - rect.top - rect.height/2;
              e.currentTarget.style.transform = `rotateY(${-25 + x/30}deg) rotateX(${8 - y/30}deg)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'rotateY(-25deg) rotateX(8deg)';
            }}
          >
            <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-2xl border border-gray-700">
              <div className="bg-[#323233] px-5 py-3 flex items-center justify-between border-b border-gray-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                </div>
                <div className="text-sm text-gray-400 flex items-center gap-2" style={{ fontFamily: "'Raleway', sans-serif" }}>
                  <span>coffeeCounter.js</span>
                </div>
                <div className="w-12"></div>
              </div>
              <div className="bg-[#1e1e1e] p-6 font-mono text-sm">
                <div className="space-y-1.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
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
                    <span className="text-gray-500">{'// Start coding session'}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-8 text-right mr-4">20</span>
                    <span className="text-[#dcdcaa]">drinkCoffee</span>
                    <span className="text-white">();</span>
                    <span className="text-gray-500">{' // ☕ First cup!'}</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#007acc] px-4 py-1 flex items-center justify-between text-xs text-white" style={{ fontFamily: "'Raleway', sans-serif" }}>
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
  );
}
