import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { ArrowLeft, Calendar } from 'lucide-react';
import type { NotionArticle } from '@/lib/notionTypes';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function ArticleDetail() {
  const [, params] = useRoute('/newsletter/:slug');
  const slug = params?.slug || '';

  const { data: article, isLoading } = useQuery<NotionArticle | null>({
    queryKey: ['/api/newsletter/articles', slug],
    enabled: !!slug,
  });

  const { data: relatedArticles = [] } = useQuery<NotionArticle[]>({
    queryKey: ['/api/newsletter/articles/category', article?.category],
    enabled: !!article?.category,
  });

  const filteredRelated = relatedArticles.filter((a) => a.slug !== slug).slice(0, 3);

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen pt-16 lg:pt-20 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-32" />
            <div className="aspect-video bg-muted rounded" />
            <div className="h-12 bg-muted rounded" />
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          </div>
        </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!article) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen pt-16 lg:pt-20 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-light text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/newsletter">
            <Button className="btn-lift" data-testid="button-back-to-newsletter">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen pt-16 lg:pt-20 py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        <Link href="/newsletter">
          <Button variant="ghost" className="mb-8 btn-lift" data-testid="button-back">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        {article.featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <Card className="glass-card p-4 sm:p-6">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 z-10 rounded-md" />
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full aspect-video object-cover rounded-md"
                  data-testid="img-article-featured"
                />
              </div>
            </Card>
          </div>
        )}

        <div className="mb-6">
          <div className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">
            {article.category}
          </div>
          <h1 className="text-4xl sm:text-5xl font-light text-foreground mb-4" data-testid="text-article-title">
            {article.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <time data-testid="text-article-date">
              {article.date ? format(new Date(article.date), 'MMMM d, yyyy') : 'No date'}
            </time>
          </div>
        </div>

        <Card className="glass-card p-8 mb-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-6 italic">
              {article.description}
            </p>
            <div className="text-foreground whitespace-pre-wrap leading-relaxed" data-testid="text-article-content">
              {article.content}
            </div>
          </div>
        </Card>

        {filteredRelated.length > 0 && (
          <div>
            <h2 className="text-2xl font-light text-foreground mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredRelated.map((related) => (
                <Link
                  key={related.id}
                  href={`/newsletter/${related.slug}`}
                  data-testid={`card-related-${related.slug}`}
                >
                  <Card className="glass-card overflow-hidden hover-elevate cursor-pointer h-full transition-all">
                    {related.featuredImage && (
                      <div className="aspect-video overflow-hidden relative">
                        <div className="absolute inset-0 bg-white/20 z-10" />
                        <img
                          src={related.featuredImage}
                          alt={related.title}
                          className="w-full h-full object-cover"
                          data-testid={`img-related-${related.slug}`}
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="text-xs font-medium text-primary mb-1 uppercase tracking-wider">
                        {related.category}
                      </div>
                      <h3 className="text-base font-medium text-foreground line-clamp-2">
                        {related.title}
                      </h3>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
      </div>
      <Footer />
    </>
  );
}
