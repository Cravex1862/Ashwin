const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://ashwinchoudhury.me';
const PUBLIC = path.resolve(__dirname, '..', 'public');

const date = new Date().toISOString().split('T')[0];

const staticPages = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/#intro', priority: '0.9', changefreq: 'monthly' },
  { loc: '/#projects', priority: '0.9', changefreq: 'weekly' },
  { loc: '/#skills', priority: '0.8', changefreq: 'monthly' },
  { loc: '/#contact', priority: '0.8', changefreq: 'monthly' },
];

function generateSitemap(projectUrls = []) {
  const allUrls = [
    ...staticPages,
    ...projectUrls.map(slug => ({
      loc: `/project/${slug}`,
      priority: '0.7',
      changefreq: 'monthly',
    })),
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const page of allUrls) {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}${page.loc}</loc>\n`;
    xml += `    <lastmod>${date}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>`;
  return xml;
}

(async () => {
  let projectSlugs = [];

  try {
    const dataPath = path.resolve(__dirname, '..', 'data', 'projects.json');
    if (fs.existsSync(dataPath)) {
      const projects = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      projectSlugs = projects.map(p =>
        p.name
          ? p.name.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '')
          : p._id
      );
    }
  } catch {}

  const xml = generateSitemap(projectSlugs);
  const outputPath = path.join(PUBLIC, 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`Sitemap generated: ${outputPath}`);
  console.log(`  ${staticPages.length + projectSlugs.length} URLs`);
})();
