interface StructuredDataProps {
  type: 'person' | 'article' | 'website';
  data?: {
    name?: string;
    jobTitle?: string;
    url?: string;
    image?: string;
    sameAs?: string[];
    headline?: string;
    datePublished?: string;
    author?: string;
    description?: string;
  };
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseUrl = window.location.origin;
    
    // Helper to make absolute URL
    const makeAbsoluteUrl = (url: string) => {
      return url.startsWith('http') ? url : `${baseUrl}${url}`;
    };
    
    if (type === 'person') {
      return {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Drahoslava Forgacova",
        "jobTitle": "Psychologist & Artist",
        "url": baseUrl,
        "image": `${baseUrl}/og-image.png`,
        "sameAs": [
          "https://www.instagram.com/drahoslavacom",
          "https://www.facebook.com/Drahoslavaa",
          "https://www.tiktok.com/@baidee.art",
          "https://www.youtube.com/@drahoslava.forgacova"
        ],
        "description": "Psychologist and artist exploring the intersection of art, psychology, and awareness through textured floral paintings and mindful creative practices."
      };
    }

    if (type === 'article' && data) {
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": data.headline,
        "author": {
          "@type": "Person",
          "name": data.author || "Drahoslava Forgacova"
        },
        "datePublished": data.datePublished,
        "description": data.description,
        "image": data.image ? makeAbsoluteUrl(data.image) : `${baseUrl}/og-image.png`
      };
    }

    if (type === 'website') {
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Drahoslava Forgacova",
        "url": baseUrl,
        "description": "Personal website of Drahoslava Forgacova - exploring art, psychology, and awareness",
        "author": {
          "@type": "Person",
          "name": "Drahoslava Forgacova"
        }
      };
    }

    return null;
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
