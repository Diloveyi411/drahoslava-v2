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
