import React, { useState } from 'react';

const buttonStyle = {
  position: 'fixed',
  bottom: '24px',
  right: '24px',
  zIndex: 9999,
  width: '44px',
  height: '44px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: '14px',
  fontWeight: 600,
  color: '#fff',
  border: 'none',
  background: 'rgba(15, 15, 15, 0.8)',
  backdropFilter: 'blur(8px)',
  transition: 'all 0.2s ease',
  overflow: 'hidden',
};

export default function ToggleButton({ showV2, onToggle }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...buttonStyle,
        boxShadow: hovered
          ? '0 0 15px rgba(118, 178, 240, 0.4), 0 0 25px rgba(246, 27, 169, 0.3)'
          : '0 2px 10px rgba(0, 0, 0, 0.3)',
      }}
      aria-label={showV2 ? 'Switch to classic view' : 'Switch to 3D view'}
      title={showV2 ? 'Switch to classic view' : 'Switch to 3D view'}
    >
      {/* Gradient border effect */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '12px',
          padding: '2px',
          background: 'conic-gradient(from 0deg, #76B2F0, #F61BA9, #76B2F0, #F61BA9, #76B2F0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: hovered ? 1 : 0.5,
          transition: 'opacity 0.2s',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>
        {showV2 ? 'v1' : 'v2'}
      </span>
    </button>
  );
}
