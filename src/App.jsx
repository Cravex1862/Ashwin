import React, { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import V1Portfolio from './components/v1/V1Portfolio';
import V2Portfolio from './components/v2/V2Portfolio';
import ToggleButton from './components/v2/ToggleButton';
import { useWebGL } from './hooks/useWebGL';

function App() {
  const [projects, setProjects] = useState([]);
  const [showV2, setShowV2] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const webglSupported = useWebGL();

  useEffect(() => {
    if (webglSupported === null) return;
    const saved = localStorage.getItem('portfolio_version');
    if (saved === 'v1' || !webglSupported) {
      setShowV2(false);
    } else {
      setShowV2(true);
    }
  }, [webglSupported]);

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
      setProjects([]);
    }
  };

  const handleCMSLogin = (token) => {
    setIsLoggedIn(true);
  };

  const handleCMSLogout = () => {
    localStorage.removeItem('cms_token');
    setIsLoggedIn(false);
    window.location.hash = '';
  };

  const handleProjectClick = (project) => {
    const slug = (project.name || project._id).toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '');
    window.location.hash = `/project/${slug}`;
  };

  const handleVersionToggle = () => {
    const next = !showV2;
    setShowV2(next);
    localStorage.setItem('portfolio_version', next ? 'v2' : 'v1');
  };

  const sharedProps = {
    projects,
    fetchProjects,
    isLoggedIn,
    setIsLoggedIn,
    handleCMSLogin,
    handleCMSLogout,
    onProjectClick: handleProjectClick,
    handleProjectClick,
  };

  if (showV2 === null) {
    return (
      <HelmetProvider>
        <div style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a1a1a',
          color: '#fff',
          fontFamily: 'sans-serif',
          fontSize: '1.25rem',
        }}>
          Loading...
        </div>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Ashwin | Interactive 3D Portfolio</title>
        <meta name="description" content="Explore the immersive 3D portfolio of Ashwin. A showcase of modern web development, creative coding, and full-stack projects." />
        <meta name="keywords" content="Ashwin, Portfolio, Web Developer, React, Three.js, WebGL, Full Stack, Creative Developer" />
        <meta property="og:title" content="Ashwin | Interactive 3D Portfolio" />
        <meta property="og:description" content="Explore the immersive 3D portfolio of Ashwin. A showcase of modern web development, creative coding, and full-stack projects." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ashwin | Interactive 3D Portfolio" />
        <meta name="twitter:description" content="Explore the immersive 3D portfolio of Ashwin. A showcase of modern web development, creative coding, and full-stack projects." />
        <html lang="en" />
      </Helmet>
      {showV2 ? <V2Portfolio {...sharedProps} /> : <V1Portfolio {...sharedProps} />}
      <ToggleButton showV2={showV2} onToggle={handleVersionToggle} />
    </HelmetProvider>
  );
}

export default App;
