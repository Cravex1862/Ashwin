import { Helmet } from 'react-helmet-async';
import SEOHead from './SEOHead';
import { projectTitle, projectDescription, projectUrl, SITE_URL } from '../../utils/seo';

export default function ProjectPage({ project, onClose }) {
  if (!project) return null;

  const url = projectUrl(project);
  const title = projectTitle(project.name);
  const desc = projectDescription(project.description || '');
  const image = project.image || '/profile.png';

  return (
    <article className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] text-white">
      <SEOHead
        title={title}
        description={desc}
        image={image}
        url={url}
        type="article"
        publishedTime={project.createdAt}
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/#projects` },
              { '@type': 'ListItem', position: 3, name: project.name, item: url },
            ],
          })}
        </script>
      </Helmet>

      <nav className="border-b border-gray-800 bg-[#1a1a1a]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-[#76B2F0] to-[#F61BA9] bg-clip-text text-transparent no-underline"
          >
            Ashwin
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-sm border border-gray-600 hover:border-gray-400 transition text-gray-300"
          >
            &larr; Back
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-8">
          <a
            href="/#projects"
            className="text-sm text-gray-400 hover:text-[#76B2F0] transition no-underline mb-4 inline-block"
          >
            &larr; All Projects
          </a>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.name}</h1>
          <p className="text-xl text-gray-300 leading-relaxed">{project.description}</p>
        </header>

        {project.image && (
          <figure className="mb-8 rounded-xl overflow-hidden border border-gray-700">
            <img
              src={project.image}
              alt={`Screenshot of ${project.name}`}
              className="w-full h-auto object-cover"
              loading="eager"
              decoding="async"
              width="1200"
              height="675"
            />
          </figure>
        )}

        <div className="flex flex-wrap gap-4 mb-8">
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded font-semibold bg-gradient-to-r from-[#76B2F0] to-[#F61BA9] text-white no-underline hover:opacity-90 transition"
            >
              View Demo
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded font-semibold border-2 border-gray-600 text-gray-200 no-underline hover:border-gray-400 transition"
            >
              View Source &rarr;
            </a>
          )}
        </div>

        {project.technologies && project.technologies.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded text-sm bg-gray-800 text-gray-300 border border-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-gray-800 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Ashwin Choudhury. All rights reserved.</p>
        </div>
      </footer>
    </article>
  );
}
