import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';

const App = lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Suspense fallback={
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          background: '#1a1a1a',
          color: '#fff',
          fontFamily: 'sans-serif',
          fontSize: '1.25rem'
        }}>
          Loading...
        </div>
      }>
        <App />
      </Suspense>
    </HelmetProvider>
  </React.StrictMode>
);
