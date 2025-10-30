import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Mail } from 'lucide-react';
import type { NotionArticle } from '@/lib/notionTypes';
import emailjs from '@emailjs/browser';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const CATEGORIES = [
  'All',
  'INNER BLOOM',
  'CREATIVE CONSCIOUSNESS',
  'TECH & SPIRIT',
  'WORKSHOPS & EXPERIENCES',
  "THE SOUL'S NOTE",
] as const;

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { toast } = useToast();

  const { data: articles = [], isLoading } = useQuery<NotionArticle[]>({
    queryKey: ['/api/newsletter/articles'],
  });

  const filteredArticles =
    selectedCategory === 'All'
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
      
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_SIGNUP,
        {
          to_email: email,
          user_email: email,
        }
      );

      toast({
        title: 'Welcome!',
        description: 'Check your email for confirmation.',
        className: 'glass-card',
      });

      setEmail('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen pt-16 lg:pt-20">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="btn-lift text-base"
                  data-testid={`button-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="glass-card animate-pulse">
                  <div className="aspect-video bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded" />
                    <div className="h-6 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-12 mb-20">
              <p className="text-muted-foreground" data-testid="text-no-articles">
                No articles found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  data-testid={`card-article-${article.slug}`}
                >
                  <Card className="glass-card overflow-hidden hover-elevate cursor-pointer h-full transition-all">
                    {article.featuredImage && (
                      <div className="aspect-video overflow-hidden relative">
                        <div className="absolute inset-0 bg-white/20 z-10" />
                        <img
                          src={article.featuredImage}
                          alt={article.title}
                          className="w-full h-full object-cover"
                          data-testid={`img-article-${article.slug}`}
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
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {article.description}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="btn-lift text-base"
                        data-testid={`button-read-more-${article.slug}`}
                      >
                        Read More
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-foreground mb-2">
              Stay in Touch
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              A thoughtful newsletter on art, psychology, and digital creation.
            </p>
          </div>

          <Card className="glass-card max-w-xl mx-auto p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full"
                  data-testid="input-newsletter-email"
                />
              </div>
              <Button
                type="submit"
                className="w-full btn-lift text-base"
                disabled={isSubmitting}
                data-testid="button-newsletter-subscribe"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </Card>
        </div>
      </section>
      </div>
      <Footer />
    </>
  );
}
