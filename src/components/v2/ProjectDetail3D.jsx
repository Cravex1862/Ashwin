import React, { useState, useEffect } from 'react';
import { markdownToHtml } from '../../utils/markdown';
import { playClickSound } from '../../utils/audio';

function parseGitHubInfo(url) {
  if (!url) return null;
  const match = url.match(/github\.com\/([^/]+)\/([^/\s#?]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
}

export default function ProjectDetail3D({ project, onBack }) {
  const [readme, setReadme] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);

  // Entrance animation delay
  useEffect(() => {
    if (project) {
      const timer = setTimeout(() => setVisible(true), 150);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [project]);

  // Fetch README from GitHub
  useEffect(() => {
    if (!project) {
      setReadme('');
      setLoading(false);
      return;
    }

    const fetchReadme = async () => {
      setLoading(true);
      setError(null);
      setReadme('');

      const ghInfo = parseGitHubInfo(project.githubLink);
      if (!ghInfo) {
        setLoading(false);
        setError('No GitHub repository linked to this project.');
        return;
      }

      try {
        for (const branch of ['main', 'master', 'dev']) {
          try {
            const res = await fetch(
              `https://raw.githubusercontent.com/${ghInfo.owner}/${ghInfo.repo}/${branch}/README.md`
            );
            if (res.ok) {
              const text = await res.text();
              setReadme(text);
              setLoading(false);
              return;
            }
          } catch {}
        }
        setError('README not found in repository.');
      } catch {
        setError('Failed to fetch project README.');
      }
      setLoading(false);
    };

    fetchReadme();
  }, [project]);

  if (!project) return null;

  const renderedHtml = readme ? markdownToHtml(readme) : '';

  const handleBack = () => {
    playClickSound();
    onBack();
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 20,
        pointerEvents: 'auto',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      {/* ── Markdown Content Styles ── */}
      <style>{`
        @keyframes pd3d-spin {
          to { transform: rotate(360deg); }
        }

        .md-content {
          font-family: 'Raleway', sans-serif;
          color: #d4d4d4;
          line-height: 1.85;
          font-size: 1rem;
        }

        .md-content .md-h1 {
          font-family: 'Merriweather', serif;
          font-size: 2rem;
          color: #fff;
          margin: 2.2rem 0 1rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid rgba(118, 178, 240, 0.2);
        }
        .md-content .md-h2 {
          font-family: 'Merriweather', serif;
          font-size: 1.55rem;
          color: #fff;
          margin: 2rem 0 0.8rem;
          padding-bottom: 0.45rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .md-content .md-h3 {
          font-family: 'Merriweather', serif;
          font-size: 1.25rem;
          color: #eee;
          margin: 1.6rem 0 0.6rem;
        }
        .md-content .md-h4,
        .md-content .md-h5,
        .md-content .md-h6 {
          font-family: 'Merriweather', serif;
          font-size: 1.05rem;
          color: #ddd;
          margin: 1.2rem 0 0.5rem;
        }

        .md-content .md-p {
          margin: 0.8rem 0;
          color: #ccc;
        }

        .md-content strong { color: #fff; }
        .md-content em { color: #d4d4d4; font-style: italic; }
        .md-content del { color: #888; text-decoration: line-through; }

        .md-content .md-link {
          color: #76B2F0;
          text-decoration: none;
          border-bottom: 1px solid rgba(118, 178, 240, 0.3);
          transition: color 0.2s, border-color 0.2s;
        }
        .md-content .md-link:hover {
          color: #F61BA9;
          border-bottom-color: #F61BA9;
        }

        .md-content .md-inline-code {
          background: rgba(118, 178, 240, 0.1);
          border: 1px solid rgba(118, 178, 240, 0.15);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.88em;
          color: #76B2F0;
        }

        .md-content .md-pre {
          background: rgba(10, 10, 10, 0.85);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 20px;
          overflow-x: auto;
          margin: 1.2rem 0;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.88rem;
          color: #d4d4d4;
          line-height: 1.6;
        }

        .md-content .md-blockquote {
          border-left: 3px solid #76B2F0;
          padding: 8px 16px;
          margin: 1rem 0;
          background: rgba(118, 178, 240, 0.05);
          border-radius: 0 8px 8px 0;
          color: #bbb;
          font-style: italic;
        }

        .md-content .md-ul,
        .md-content .md-ol {
          padding-left: 24px;
          margin: 0.8rem 0;
        }
        .md-content .md-ul li,
        .md-content .md-ol li {
          margin: 0.4rem 0;
          color: #ccc;
        }
        .md-content .md-ul { list-style-type: disc; }
        .md-content .md-ol { list-style-type: decimal; }

        .md-content .md-hr {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(118, 178, 240, 0.3), rgba(246, 27, 169, 0.3), transparent);
          margin: 2rem 0;
        }

        .md-content .md-figure {
          margin: 1.5rem 0;
          text-align: center;
        }
        .md-content .md-img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .md-content .md-table-wrap {
          overflow-x: auto;
          margin: 1rem 0;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .md-content .md-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.92rem;
        }
        .md-content .md-table th {
          background: rgba(118, 178, 240, 0.1);
          color: #fff;
          padding: 10px 14px;
          text-align: left;
          font-weight: 600;
          border-bottom: 1px solid rgba(255,255,255,0.15);
        }
        .md-content .md-table td {
          padding: 8px 14px;
          color: #ccc;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .md-content .md-table tr:last-child td {
          border-bottom: none;
        }
      `}</style>

      {/* ── Top Bar ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '18px 28px',
          background: 'rgba(10, 10, 10, 0.78)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(118, 178, 240, 0.12)',
          flexShrink: 0,
        }}
      >
        {/* Back button with < symbol */}
        <button
          onClick={handleBack}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#fff',
            fontSize: '1.5rem',
            fontWeight: '300',
            cursor: 'pointer',
            padding: '6px 14px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
            transition: 'all 0.25s ease',
            fontFamily: "'Raleway', sans-serif",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(118, 178, 240, 0.12)';
            e.currentTarget.style.borderColor = '#76B2F0';
            e.currentTarget.style.color = '#76B2F0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.color = '#fff';
          }}
          aria-label="Go back to projects"
          title="Back to projects"
        >
          {'<'}
        </button>

        {/* Project title */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1
            style={{
              fontFamily: "'Merriweather', serif",
              fontSize: 'clamp(1.1rem, 3vw, 2rem)',
              margin: 0,
              color: '#fff',
              textShadow: '0 2px 12px rgba(0,0,0,0.6)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {project.name}
          </h1>
        </div>

        {/* GitHub button */}
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded font-semibold relative group overflow-hidden no-underline cursor-pointer hidden sm:block"
            style={{ flexShrink: 0 }}
          >
            <span className="absolute inset-0 rounded border-2 border-gray-600 group-hover:border-transparent transition"></span>
            <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition">
              <span className="absolute inset-[-300%] bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
            </span>
            <span className="absolute inset-[2px] rounded bg-[#0a0a0a]/80 z-[1]"></span>
            <span className="relative z-10 text-white text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              GitHub →
            </span>
          </a>
        )}

        {/* Demo button */}
        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded font-semibold relative group overflow-hidden no-underline cursor-pointer hidden sm:block"
            style={{ flexShrink: 0 }}
          >
            <span className="absolute inset-0 rounded opacity-100 group-hover:opacity-0 transition">
              <span className="absolute inset-0 rounded bg-gradient-to-r from-[#76B2F0] to-[#F61BA9] p-[2px]">
                <span className="absolute inset-[2px] rounded bg-[#0a0a0a]/80"></span>
              </span>
            </span>
            <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition">
              <span className="absolute inset-[-300%] bg-[conic-gradient(from_0deg,#76B2F0,#F61BA9,#76B2F0,#F61BA9,#76B2F0)] gradient-border-animate"></span>
            </span>
            <span className="absolute inset-[2px] rounded bg-[#0a0a0a]/80 z-[1]"></span>
            <span className="relative z-10 text-white text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              Live Demo
            </span>
          </a>
        )}
      </div>

      {/* ── Content Area ── */}
      <div
        className="hide-scrollbar"
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          background: 'rgba(5, 5, 5, 0.72)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '36px 28px 80px',
        }}>
          {/* Quick overview from database description */}
          {project.description && (
            <div style={{
              padding: '18px 22px',
              marginBottom: '28px',
              borderRadius: '12px',
              background: 'rgba(118, 178, 240, 0.05)',
              border: '1px solid rgba(118, 178, 240, 0.12)',
            }}>
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                color: '#bbb',
                fontSize: '1.02rem',
                lineHeight: 1.75,
                margin: 0,
              }}>
                {project.description}
              </p>
            </div>
          )}

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div style={{ marginBottom: '28px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: '#76B2F0',
                    background: 'rgba(118, 178, 240, 0.08)',
                    border: '1px solid rgba(118, 178, 240, 0.18)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Mobile action buttons (shown below sm breakpoint) */}
          <div className="flex sm:hidden gap-3 mb-6">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded font-semibold relative group overflow-hidden no-underline cursor-pointer flex-1 text-center"
              >
                <span className="absolute inset-0 rounded border-2 border-gray-600 group-hover:border-transparent transition"></span>
                <span className="absolute inset-[2px] rounded bg-[#0a0a0a]/80 z-[1]"></span>
                <span className="relative z-10 text-white text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  GitHub →
                </span>
              </a>
            )}
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded font-semibold relative group overflow-hidden no-underline cursor-pointer flex-1 text-center"
              >
                <span className="absolute inset-0 rounded opacity-100">
                  <span className="absolute inset-0 rounded bg-gradient-to-r from-[#76B2F0] to-[#F61BA9] p-[2px]">
                    <span className="absolute inset-[2px] rounded bg-[#0a0a0a]/80"></span>
                  </span>
                </span>
                <span className="absolute inset-[2px] rounded bg-[#0a0a0a]/80 z-[1]"></span>
                <span className="relative z-10 text-white text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  Live Demo
                </span>
              </a>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{
                width: '36px',
                height: '36px',
                border: '3px solid rgba(118, 178, 240, 0.15)',
                borderTop: '3px solid #76B2F0',
                borderRadius: '50%',
                animation: 'pd3d-spin 0.8s linear infinite',
                margin: '0 auto 18px',
              }} />
              <p style={{ color: '#777', fontFamily: "'Raleway', sans-serif", fontSize: '0.95rem' }}>
                Loading README from GitHub...
              </p>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div style={{
              padding: '22px',
              borderRadius: '12px',
              background: 'rgba(246, 27, 169, 0.06)',
              border: '1px solid rgba(246, 27, 169, 0.18)',
              textAlign: 'center',
            }}>
              <p style={{
                color: '#F61BA9',
                fontFamily: "'Raleway', sans-serif",
                fontSize: '1rem',
                margin: 0,
              }}>
                {error}
              </p>
            </div>
          )}

          {/* README */}
          {renderedHtml && !loading && (
            <div
              className="md-content"
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
