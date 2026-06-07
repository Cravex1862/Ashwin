import { Helmet } from 'react-helmet-async';
import { SITE_URL, SITE_NAME, projectUrl, projectDescription } from '../../utils/seo';

function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ashwin Choudhury',
    url: SITE_URL,
    image: `${SITE_URL}/profile.png`,
    jobTitle: 'Full-Stack Web Developer',
    sameAs: [
      'https://github.com/Cravex1862',
      'https://stackoverflow.com/users/32289677/cravex1862',
    ],
    knowsAbout: [
      'React', 'Node.js', 'MongoDB', 'Express', 'JavaScript',
      'Tailwind CSS', 'MERN Stack', 'Full-Stack Development',
    ],
  };
}

function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Full-stack web developer portfolio showcasing projects in web, games, apps, and electronics.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/#/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function projectSchemas(projects) {
  if (!projects || !projects.length) return [];
  return projects.map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: p.name,
    description: projectDescription(p.description || ''),
    url: projectUrl(p),
    image: p.image || `${SITE_URL}/profile.png`,
    dateCreated: p.createdAt,
    author: {
      '@type': 'Person',
      name: 'Ashwin Choudhury',
    },
    ...(p.demoLink ? { url: p.demoLink } : {}),
    ...(p.githubLink ? {
      sameAs: p.githubLink,
      codeRepository: p.githubLink,
    } : {}),
  }));
}

export function PersonSchema() {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personSchema())}
      </script>
    </Helmet>
  );
}

export function WebSiteSchema() {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema())}
      </script>
    </Helmet>
  );
}

export function BreadcrumbSchema({ items }) {
  if (!items || !items.length) return null;
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema(items))}
      </script>
    </Helmet>
  );
}

export function ProjectSchemas({ projects }) {
  const schemas = projectSchemas(projects);
  if (!schemas.length) return null;
  return (
    <Helmet>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
