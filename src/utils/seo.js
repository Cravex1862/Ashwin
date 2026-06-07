const SITE_URL = 'https://ashwinchoudhury.me';
const SITE_NAME = 'Ashwin Choudhury';
const DEFAULT_TITLE = 'Ashwin Choudhury | Full-Stack Web Developer & Portfolio';
const DEFAULT_DESC = 'Full-stack web developer skilled in the MERN stack. Browse projects in games, apps, websites, and electronics. Available for freelance and collaboration.';
const DEFAULT_IMAGE = '/profile.png';
const TWITTER_HANDLE = '@cravex1862';

const KEYWORDS = [
  'Ashwin Choudhury', 'full-stack developer', 'web developer',
  'MERN stack', 'React developer', 'portfolio', 'freelance web developer',
  'JavaScript', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS',
  'game developer', 'app developer', 'electronics engineer'
];

function slugify(text) {
  return text.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '');
}

function projectSlug(project) {
  return slugify(project.name || project._id);
}

function projectUrl(project) {
  return `${SITE_URL}/#/project/${projectSlug(project)}`;
}

function projectTitle(name) {
  return `${name} | Ashwin Choudhury`;
}

function projectDescription(desc) {
  const cleaned = desc.replace(/<[^>]*>/g, '');
  return cleaned.length > 155 ? cleaned.slice(0, 152) + '...' : cleaned;
}

function pageTitle(section) {
  return `${section} | Ashwin Choudhury`;
}

function buildCanonical(path) {
  const p = path.startsWith('/') ? path : '/' + path;
  return `${SITE_URL}${p}`;
}

const defaultMeta = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESC,
  image: DEFAULT_IMAGE,
  url: SITE_URL,
  type: 'website',
};

export {
  SITE_URL, SITE_NAME, DEFAULT_TITLE, DEFAULT_DESC,
  DEFAULT_IMAGE, TWITTER_HANDLE, KEYWORDS,
  slugify, projectSlug, projectUrl,
  projectTitle, projectDescription, pageTitle,
  buildCanonical, defaultMeta,
};
