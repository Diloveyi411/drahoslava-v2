import { useQuery } from '@tanstack/react-query';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import type { NotionArticle } from '@/lib/notionTypes';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function BlogPreview() {
  const { data: articles = [], isLoading } = useQuery<NotionArticle[]>({
    queryKey: ['/api/newsletter/articles'],
  });

  // Show only the 3 most recent articles
  const recentArticles = articles.slice(0, 3);

  return (
    <section id="blog-preview" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4"
            data-testid="text-blog-preview-title"
          >
            Recent Thoughts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-blog-preview-subtitle">
            Reflections on art, psychology, and the spaces where they meet.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="glass-card animate-pulse">
                <div className="aspect-video bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-6 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              </Card>
            ))}
          </div>
        ) : recentArticles.length === 0 ? (
          <div className="text-center py-12 mb-12">
            <p className="text-muted-foreground" data-testid="text-no-articles">
              No articles available yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {recentArticles.map((article) => (
              <Link
                key={article.id}
                href={`/newsletter/${article.slug}`}
                data-testid={`card-blog-preview-${article.slug}`}
              >
                <Card className="glass-card overflow-hidden hover-elevate cursor-pointer h-full transition-all group">
                  {article.featuredImage && (
                    <div className="aspect-video overflow-hidden relative">
                      <div className="absolute inset-0 bg-white/20 z-10" />
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        data-testid={`img-blog-preview-${article.slug}`}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-xs font-medium text-primary mb-2 uppercase tracking-wider">
                      {article.category}
                    </div>
                    <h3 className="text-xl font-medium text-foreground mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {article.description}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link href="/newsletter">
            <Button
              size="lg"
              variant="outline"
              className="btn-lift group"
              data-testid="button-view-all-articles"
            >
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
