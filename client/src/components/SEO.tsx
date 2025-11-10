import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  article?: {
    publishedTime?: string;
    author?: string;
    tag?: string;
  };
}

export default function SEO({
  title,
  description,
  image = '/og-image.png',
  url,
  type = 'website',
  article
}: SEOProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper to set or update meta tag
    const setMetaTag = (attribute: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Get absolute URL for image and page
    const baseUrl = window.location.origin;
    const absoluteImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
    const absolutePageUrl = url ? `${baseUrl}${url}` : window.location.href;

    // Basic meta tags
    setMetaTag('name', 'description', description);
    
    // Open Graph tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', absoluteImageUrl);
    setMetaTag('property', 'og:url', absolutePageUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', 'Drahoslava Forgacova');
    setMetaTag('property', 'og:locale', 'en_US');
    
    // OG Image dimensions (og-image.png is 1200x675)
    setMetaTag('property', 'og:image:width', '1200');
    setMetaTag('property', 'og:image:height', '675');
    setMetaTag('property', 'og:image:alt', 'Drahoslava Forgacova - Art, Psychology, Awareness');
    
    // Twitter Card tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', absoluteImageUrl);
    
    // Article-specific tags (remove if not article)
    const articleTags = ['article:published_time', 'article:author', 'article:tag'];
    
    if (type === 'article' && article) {
      if (article.publishedTime) {
        setMetaTag('property', 'article:published_time', article.publishedTime);
      }
      if (article.author) {
        setMetaTag('property', 'article:author', article.author);
      }
      if (article.tag) {
        setMetaTag('property', 'article:tag', article.tag);
      }
    } else {
      // Remove article tags when not on article page
      articleTags.forEach(tag => {
        const element = document.querySelector(`meta[property="${tag}"]`);
        if (element) {
          element.remove();
        }
      });
    }

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = absolutePageUrl;

  }, [title, description, image, url, type, article]);

  return null;
}
