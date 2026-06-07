import { Helmet } from 'react-helmet-async';
import {
  SITE_URL, SITE_NAME, DEFAULT_TITLE, DEFAULT_DESC,
  DEFAULT_IMAGE, TWITTER_HANDLE, KEYWORDS,
} from '../../utils/seo';

export default function SEOHead({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  image = DEFAULT_IMAGE,
  url = SITE_URL,
  type = 'website',
  canonical,
  keywords = KEYWORDS,
  publishedTime,
  author = SITE_NAME,
}) {
  const fullTitle = title || DEFAULT_TITLE;
  const fullDesc = description || DEFAULT_DESC;
  const fullImage = image?.startsWith('http') ? image : `${SITE_URL}${image}`;
  const canonicalUrl = canonical || url;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDesc} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDesc} />
      <meta name="twitter:image" content={fullImage} />

      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
    </Helmet>
  );
}
