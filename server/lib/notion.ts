import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID || '';

export interface NotionArticle {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  featuredImage: string | null;
  published: boolean;
  date: string;
  slug: string;
}

function extractPlainText(richText: any[]): string {
  if (!richText || richText.length === 0) return '';
  return richText.map((text: any) => text.plain_text).join('');
}

function generateSlugFromTitle(title: string, pageId?: string): string {
  if (!title || title.trim().length === 0) {
    // If title is empty, use page ID as fallback
    return pageId ? `article-${pageId.replace(/-/g, '')}`.substring(0, 50) : 'untitled';
  }
  
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Remove duplicate hyphens
  
  // Append a short hash of page ID to ensure uniqueness if provided
  if (pageId) {
    const shortId = pageId.replace(/-/g, '').substring(0, 8);
    return `${baseSlug}-${shortId}`.substring(0, 80);
  }
  
  return baseSlug.substring(0, 80);
}

function extractImageUrl(files: any[]): string | null {
  if (!files || files.length === 0) return null;
  const file = files[0];
  if (file.type === 'external') {
    return file.external.url;
  } else if (file.type === 'file') {
    return file.file.url;
  }
  return null;
}

export async function getArticles(): Promise<NotionArticle[]> {
  try {
    console.log('Fetching articles from Notion database:', databaseId);
    
    // Use native fetch to call Notion API directly
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
        sorts: [
          {
            property: 'Date',
            direction: 'descending',
          },
        ],
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(`Notion API error (${response.status}): ${errorData.message || 'Failed to fetch articles'}`);
    }
    
    const data: any = await response.json();

    console.log(`Found ${data.results?.length || 0} published articles`);
    
    const articles = data.results.map((page: any) => {
      const properties = page.properties;
      
      const title = extractPlainText(properties.Title?.title || []);
      const slugFromNotion = extractPlainText(properties.Slug?.rich_text || []);
      
      const article = {
        id: page.id,
        title,
        category: properties.Category?.select?.name || '',
        description: extractPlainText(properties.Description?.rich_text || []),
        content: extractPlainText(properties.Content?.rich_text || []),
        featuredImage: extractImageUrl(properties['Featured Image']?.files || []),
        published: properties.Published?.checkbox || false,
        date: properties.Date?.date?.start || '',
        slug: slugFromNotion || generateSlugFromTitle(title, page.id), // Fallback to generated slug with page ID for uniqueness
      };
      console.log('Article:', article.title, '| Slug:', article.slug, '| Category:', article.category);
      return article;
    });
    
    return articles;
  } catch (error) {
    console.error('Error fetching articles from Notion:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    throw error; // Re-throw so the route can return proper error status
  }
}

export async function getArticleBySlug(slug: string): Promise<NotionArticle | null> {
  // Since slugs can be auto-generated from titles, we need to fetch all articles
  // and filter by the generated slug in our code
  // Note: This will throw on API failures, allowing the route to return 502
  const allArticles = await getArticles();
  const article = allArticles.find(a => a.slug === slug);
  
  return article || null;
}

export async function getArticlesByCategory(category: string): Promise<NotionArticle[]> {
  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          and: [
            {
              property: 'Published',
              checkbox: {
                equals: true,
              },
            },
            {
              property: 'Category',
              select: {
                equals: category,
              },
            },
          ],
        },
        sorts: [
          {
            property: 'Date',
            direction: 'descending',
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(`Notion API error (${response.status}): ${errorData.message || 'Failed to fetch articles'}`);
    }

    const data: any = await response.json();

    return data.results.map((page: any) => {
      const properties = page.properties;
      const title = extractPlainText(properties.Title?.title || []);
      const slugFromNotion = extractPlainText(properties.Slug?.rich_text || []);
      
      return {
        id: page.id,
        title,
        category: properties.Category?.select?.name || '',
        description: extractPlainText(properties.Description?.rich_text || []),
        content: extractPlainText(properties.Content?.rich_text || []),
        featuredImage: extractImageUrl(properties['Featured Image']?.files || []),
        published: properties.Published?.checkbox || false,
        date: properties.Date?.date?.start || '',
        slug: slugFromNotion || generateSlugFromTitle(title, page.id),
      };
    });
  } catch (error) {
    console.error('Error fetching articles by category from Notion:', error);
    throw error; // Re-throw so the route can return proper error status
  }
}
