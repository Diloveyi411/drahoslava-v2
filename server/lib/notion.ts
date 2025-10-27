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
    const response = await notion.dataSources.query({
      data_source_id: databaseId,
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
    });

    console.log(`Found ${response.results.length} published articles`);
    
    const articles = response.results.map((page: any) => {
      const properties = page.properties;
      const article = {
        id: page.id,
        title: extractPlainText(properties.Title?.title || []),
        category: properties.Category?.select?.name || '',
        description: extractPlainText(properties.Description?.rich_text || []),
        content: extractPlainText(properties.Content?.rich_text || []),
        featuredImage: extractImageUrl(properties['Featured Image']?.files || []),
        published: properties.Published?.checkbox || false,
        date: properties.Date?.date?.start || '',
        slug: extractPlainText(properties.Slug?.rich_text || []),
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
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<NotionArticle | null> {
  try {
    const response = await notion.dataSources.query({
      data_source_id: databaseId,
      filter: {
        and: [
          {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          },
          {
            property: 'Slug',
            rich_text: {
              equals: slug,
            },
          },
        ],
      },
    });

    if (response.results.length === 0) return null;

    const page: any = response.results[0];
    const properties = page.properties;

    return {
      id: page.id,
      title: extractPlainText(properties.Title?.title || []),
      category: properties.Category?.select?.name || '',
      description: extractPlainText(properties.Description?.rich_text || []),
      content: extractPlainText(properties.Content?.rich_text || []),
      featuredImage: extractImageUrl(properties['Featured Image']?.files || []),
      published: properties.Published?.checkbox || false,
      date: properties.Date?.date?.start || '',
      slug: extractPlainText(properties.Slug?.rich_text || []),
    };
  } catch (error) {
    console.error('Error fetching article by slug from Notion:', error);
    return null;
  }
}

export async function getArticlesByCategory(category: string): Promise<NotionArticle[]> {
  try {
    const response = await notion.dataSources.query({
      data_source_id: databaseId,
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
    });

    return response.results.map((page: any) => {
      const properties = page.properties;
      return {
        id: page.id,
        title: extractPlainText(properties.Title?.title || []),
        category: properties.Category?.select?.name || '',
        description: extractPlainText(properties.Description?.rich_text || []),
        content: extractPlainText(properties.Content?.rich_text || []),
        featuredImage: extractImageUrl(properties['Featured Image']?.files || []),
        published: properties.Published?.checkbox || false,
        date: properties.Date?.date?.start || '',
        slug: extractPlainText(properties.Slug?.rich_text || []),
      };
    });
  } catch (error) {
    console.error('Error fetching articles by category from Notion:', error);
    return [];
  }
}
