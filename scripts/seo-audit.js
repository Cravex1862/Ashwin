const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const PUBLIC = path.join(ROOT, 'public');

let passed = 0;
let failed = 0;
let warnings = 0;

function check(condition, label, detail = '') {
  if (condition) {
    console.log(`  \x1b[32m✓\x1b[0m ${label}`);
    passed++;
  } else {
    console.log(`  \x1b[31m✗\x1b[0m ${label} ${detail ? '\x1b[33m(' + detail + ')\x1b[0m' : ''}`);
    failed++;
  }
}

function warn(label, detail = '') {
  console.log(`  \x1b[33m⚠\x1b[0m ${label} ${detail ? '\x1b[33m(' + detail + ')\x1b[0m' : ''}`);
  warnings++;
}

function readSafe(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch { return null; }
}

function getFiles(dir, ext) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  fs.readdirSync(dir, { recursive: true }).forEach(f => {
    if (typeof f === 'string' && f.endsWith(ext)) files.push(path.join(dir, f));
  });
  return files;
}

function getFilesFlat(dir, exts) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  fs.readdirSync(dir, { recursive: true }).forEach(f => {
    if (typeof f === 'string' && exts.some(e => f.endsWith(e))) files.push(path.join(dir, f));
  });
  return files;
}

console.log('\n\x1b[1m═══ SEO AUDIT REPORT ═══\x1b[0m\n');
console.log(`Generated: ${new Date().toISOString()}\n`);

// 1. Meta tags (index.html)
console.log('\x1b[1m1. HTML Meta Tags\x1b[0m');
const html = readSafe(path.join(PUBLIC, 'index.html'));
if (html) {
  check(html.includes('<title>'), 'Title tag exists');
  check(html.includes('name="description"'), 'Meta description exists');
  check(html.includes('name="keywords"'), 'Meta keywords exists');
  check(html.includes('name="author"'), 'Meta author exists');
  check(html.includes('name="robots"'), 'Meta robots exists');
  check(html.includes('name="viewport"'), 'Viewport meta exists');
  check(html.includes('charset='), 'Charset declared');
  check(html.includes('lang='), 'Lang attribute on <html>');
  check(html.includes('rel="canonical"'), 'Canonical link exists');
  check(html.includes('rel="sitemap"'), 'Sitemap link');
}

// 2. Open Graph
console.log('\n\x1b[1m2. Open Graph Tags\x1b[0m');
if (html) {
  check(html.includes('og:title'), 'og:title');
  check(html.includes('og:description'), 'og:description');
  check(html.includes('og:image'), 'og:image');
  check(html.includes('og:url'), 'og:url');
  check(html.includes('og:type'), 'og:type');
  check(html.includes('og:site_name'), 'og:site_name');
  check(html.includes('og:locale'), 'og:locale');
}

// 3. Twitter Cards
console.log('\n\x1b[1m3. Twitter Card Tags\x1b[0m');
if (html) {
  check(html.includes('twitter:card'), 'twitter:card');
  check(html.includes('twitter:title'), 'twitter:title');
  check(html.includes('twitter:description'), 'twitter:description');
  check(html.includes('twitter:image'), 'twitter:image');
}

// 4. Structured Data (JSON-LD)
console.log('\n\x1b[1m4. JSON-LD Structured Data\x1b[0m');
const seoUtil = readSafe(path.join(SRC, 'utils', 'seo.js'));
const jsonldComp = readSafe(path.join(SRC, 'components', 'SEO', 'JSONLD.jsx'));
if (jsonldComp) {
  check(jsonldComp.includes('Person'), 'Person schema');
  check(jsonldComp.includes('WebSite'), 'WebSite schema');
  check(jsonldComp.includes('BreadcrumbList'), 'BreadcrumbList schema');
  check(jsonldComp.includes('CreativeWork'), 'CreativeWork/Project schema');
} else {
  check(false, 'JSON-LD component exists');
}

// 5. robots.txt
console.log('\n\x1b[1m5. robots.txt\x1b[0m');
const robots = readSafe(path.join(PUBLIC, 'robots.txt'));
check(!!robots, 'robots.txt exists');
if (robots) {
  check(robots.includes('Sitemap:'), 'Sitemap URL in robots.txt');
  check(robots.includes('User-agent:'), 'User-agent directive');
  check(robots.includes('Allow:'), 'Allow directive');
  check(robots.includes('Disallow:'), 'Disallow directive');
}

// 6. sitemap.xml
console.log('\n\x1b[1m6. sitemap.xml\x1b[0m');
const sitemap = readSafe(path.join(PUBLIC, 'sitemap.xml'));
check(!!sitemap, 'sitemap.xml exists');
if (sitemap) {
  check(sitemap.includes('<urlset'), 'Valid XML urlset');
  check(sitemap.includes('<loc>'), 'Location tags present');
  check(sitemap.includes('<priority>'), 'Priority tags present');
  check(sitemap.includes('<changefreq>'), 'Change frequency tags');
}

// 7. manifest.json
console.log('\n\x1b[1m7. Web App Manifest\x1b[0m');
const manifest = readSafe(path.join(PUBLIC, 'manifest.json'));
check(!!manifest, 'manifest.json exists');
if (manifest) {
  try {
    const m = JSON.parse(manifest);
    check(!!m.name, 'Manifest name');
    check(!!m.short_name, 'Manifest short_name');
    check(!!m.start_url, 'Manifest start_url');
    check(!!m.display, 'Manifest display');
    check(!!m.icons, 'Manifest icons');
    check(!!m.theme_color, 'Manifest theme_color');
    check(!!m.background_color, 'Manifest background_color');
  } catch {
    check(false, 'Valid JSON in manifest');
  }
}

// 8. Heading hierarchy in App.jsx
console.log('\n\x1b[1m8. Heading Hierarchy (Sections)\x1b[0m');
const appJsx = readSafe(path.join(SRC, 'App.jsx'));
const indexJs = readSafe(path.join(SRC, 'index.js'));
const components = getFiles(path.join(SRC, 'components'), '.jsx');
const allJsFiles = getFilesFlat(SRC, ['.js', '.jsx']);
allJSX = [appJsx, indexJs, ...allJsFiles.map(f => readSafe(f))].filter(Boolean).join('\n');
check(allJSX.includes('<h1'), 'H1 tags exist');
check(allJSX.includes('<h2'), 'H2 tags exist');
check(allJSX.includes('<h3'), 'H3 tags exist');

// 9. Image alt attributes
console.log('\n\x1b[1m9. Image Alt Attributes\x1b[0m');
const imgCount = (allJSX.match(/<img/g) || []).length;
const altCount = (allJSX.match(/alt=/g) || []).length;
check(imgCount === altCount, `All ${imgCount} images have alt attributes`, `Found ${altCount} alt attributes`);
if (imgCount !== altCount) {
  warn('Some images missing alt text');
}

// 10. Semantic HTML
console.log('\n\x1b[1m10. Semantic HTML Elements\x1b[0m');
const combinedSrc = allJSX;
check(combinedSrc.includes('<header'), '<header> element');
check(combinedSrc.includes('<nav'), '<nav> element');
check(combinedSrc.includes('<main'), '<main> element');
check(combinedSrc.includes('<section'), '<section> element');
check(combinedSrc.includes('<article'), '<article> element');
check(combinedSrc.includes('<footer'), '<footer> element');
check(combinedSrc.includes('<figure'), '<figure> element');

// 11. Security Headers Check (vercel.json)
console.log('\n\x1b[1m11. Security Server Config\x1b[0m');
const vercelJson = readSafe(path.join(ROOT, 'vercel.json'));
if (vercelJson) {
  const v = JSON.parse(vercelJson);
  const headers = JSON.stringify(v);
  check(headers.includes('X-Content-Type-Options'), 'X-Content-Type-Options');
  check(headers.includes('X-Frame-Options'), 'X-Frame-Options');
  check(headers.includes('Referrer-Policy'), 'Referrer-Policy');
  check(headers.includes('Content-Security-Policy'), 'Content-Security-Policy');
} else {
  check(false, 'vercel.json exists');
}

const serverJs = readSafe(path.join(ROOT, 'server.js'));
if (serverJs) {
  check(serverJs.includes('helmet') || serverJs.includes('X-Content-Type-Options') ||
        serverJs.includes('CSP') || serverJs.includes('Content-Security-Policy'),
        'Server-side security headers');
}

// 12. Lazy loading
console.log('\n\x1b[1m12. Performance Optimizations\x1b[0m');
check(combinedSrc.includes('loading='), 'Lazy loading attributes');
check(combinedSrc.includes('decoding='), 'Image decoding hints');
check(combinedSrc.includes('width=') || combinedSrc.includes('height='), 'Image dimension hints');
  check(combinedSrc.includes('lazy(') || combinedSrc.includes('React.lazy'), 'Code splitting patterns (lazy loading)');
  check(combinedSrc.includes('Suspense'), 'Suspense fallback for lazy components');

// 13. RSS Feed
console.log('\n\x1b[1m13. RSS Feed\x1b[0m');
const rss = readSafe(path.join(PUBLIC, 'rss.xml'));
check(!!rss, 'rss.xml exists');
if (rss) {
  check(rss.includes('<rss'), 'Valid RSS XML');
  check(rss.includes('<channel>'), 'RSS channel element');
  check(rss.includes('<item>'), 'RSS item element');
}

// 14. Accessibility
console.log('\n\x1b[1m14. Accessibility Checks\x1b[0m');
check(combinedSrc.includes('aria-label'), 'aria-label attributes');
check(combinedSrc.includes('role='), 'Role attributes');
const formCount = (combinedSrc.match(/<form/g) || []).length;
check(formCount > 0, 'Form elements present');
check(combinedSrc.includes('aria-live'), 'aria-live for dynamic content');
check(combinedSrc.includes('role="status"'), 'role="status" for status messages');

// 15. SEO React Component
console.log('\n\x1b[1m15. SEO Components\x1b[0m');
const seoHead = readSafe(path.join(SRC, 'components', 'SEO', 'SEOHead.jsx'));
check(!!seoHead, 'SEOHead component exists');
if (seoHead) {
  check(seoHead.includes('react-helmet-async'), 'Uses Helmet for dynamic head');
  check(seoHead.includes('og:title'), 'Dynamic Open Graph title');
  check(seoHead.includes('twitter:card'), 'Dynamic Twitter Card');
  check(seoHead.includes('canonical'), 'Dynamic canonical URL');
}

// 16. Project individual pages
console.log('\n\x1b[1m16. Project Pages\x1b[0m');
const projectPage = readSafe(path.join(SRC, 'components', 'SEO', 'ProjectPage.jsx'));
check(!!projectPage, 'Individual project page component exists');
if (projectPage) {
  check(projectPage.includes('<article'), 'Project page uses <article>');
  check(projectPage.includes('JSON-LD') || projectPage.includes('ld+json'), 'JSON-LD on project page');
  check(projectPage.includes('BreadcrumbList'), 'Breadcrumb on project page');
}

// Summary
console.log('\n\x1b[1m═══════════════════════\x1b[0m');
console.log(`\x1b[1mResults:\x1b[0m  \x1b[32m${passed} passed\x1b[0m, \x1b[31m${failed} failed\x1b[0m, \x1b[33m${warnings} warnings\x1b[0m`);
const total = passed + failed;
const pct = total > 0 ? Math.round((passed / total) * 100) : 0;
console.log(`Score: \x1b[${pct >= 95 ? 32 : pct >= 80 ? 33 : 31}m${pct}%\x1b[0m (target: 95+)`);
console.log();

if (failed > 0) {
  console.log('\x1b[33mFix the failed checks above to improve SEO score.\x1b[0m\n');
}
