import { useEffect } from 'react';
import { useParams, Link, useLocation } from 'wouter';
import { ArrowLeft, Eye, Hand, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NotFound from '@/pages/not-found';
import servicesData from '@/data/services.json';
import heroImage from '@assets/Dadi-art-94_1761560442212.jpg';

const iconMap = {
  Eye,
  Hand,
  Monitor,
};

export default function ServiceDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const slug = params.slug;

  const service = servicesData.services.find((s) => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return <NotFound />;
  }

  const IconComponent = iconMap[service.icon as keyof typeof iconMap];

  return (
    <>
      <Navigation />
      <div className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Hero Image */}
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            {/* 20% Milky White Overlay */}
            <div className="absolute inset-0 bg-white/20 pointer-events-none" />
            {/* Dark gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          </div>
          
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <Link href="/#services">
              <Button
                variant="outline"
                className="mb-8 hover-elevate bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                data-testid="button-back-to-services"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Services
              </Button>
            </Link>

            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6 mx-auto">
              <IconComponent className="h-8 w-8 text-white" />
            </div>

            <h1
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6"
              data-testid="text-service-title"
            >
              {service.title}
            </h1>

            <p
              className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
              data-testid="text-service-hero-description"
            >
              {service.heroDescription}
            </p>
          </div>
        </section>

        {/* Full Description Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-line font-light text-lg">
                {service.fullDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 md:py-24 bg-card">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-16">
            {service.content.map((section, index) => (
              <Card
                key={index}
                className="p-8 md:p-12 glass-card"
                data-testid={`card-content-section-${index}`}
              >
                <h2 className="font-serif text-3xl font-light text-foreground mb-6">
                  {section.heading}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line font-light">
                    {section.text}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Action Section */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4">
              Ready to Begin?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Let's explore this journey together. Reach out to book a session or ask any questions.
            </p>
            <Link href="/#contact">
              <Button
                size="lg"
                className="btn-lift"
                data-testid="button-book-now"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
