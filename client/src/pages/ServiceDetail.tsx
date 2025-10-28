import { useEffect } from 'react';
import { useParams, Link, useLocation } from 'wouter';
import { ArrowLeft, Eye, Hand, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NotFound from '@/pages/not-found';
import servicesData from '@/data/services.json';
import innerWorkImage from '@assets/Dadi-art-94_1761189715147.jpg';
import whoThisIsForImage from '@assets/Dadi-art-192_1761579069938.jpg';
import creativePracticeImage from '@assets/Dadi-art-162_1761580803599.jpg';
import creativePracticeForYouImage from '@assets/Dadi-art-156 (1)_1761580882796.jpg';
import digitalSpaceImage from '@assets/Dadi-art-175_1761189720828.jpg';
import digitalSpaceForYouImage from '@assets/Gemini_Generated_Image_8hd08w8hd08w8hd0_1761628501248.png';

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

  const handleContactClick = () => {
    setLocation('/');
    setTimeout(() => {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleBackToServices = () => {
    setLocation('/');
    setTimeout(() => {
      const element = document.getElementById('services');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (!service) {
    return <NotFound />;
  }

  const IconComponent = iconMap[service.icon as keyof typeof iconMap];

  return (
    <>
      <Navigation />
      <div className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 animate-pulse" style={{ animationDuration: '8s' }} />
          </div>
          
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <Button
              variant="ghost"
              className="mb-8 hover-elevate"
              onClick={handleBackToServices}
              data-testid="button-back-to-services"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Button>

            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 mx-auto">
              <IconComponent className="h-8 w-8 text-primary" />
            </div>

            <h1
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6"
              data-testid="text-service-title"
            >
              {service.title}
            </h1>

            <p
              className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              data-testid="text-service-hero-description"
            >
              {service.heroDescription}
            </p>
          </div>
        </section>

        {/* Full Description Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            {(service.slug === 'inner-work' || service.slug === 'creative-practice' || service.slug === 'digital-space') ? (
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Image Column */}
                <div className="relative aspect-square rounded-md overflow-hidden order-2 md:order-1">
                  <img
                    src={
                      service.slug === 'inner-work' ? innerWorkImage :
                      service.slug === 'creative-practice' ? creativePracticeImage :
                      digitalSpaceImage
                    }
                    alt="Textured floral artwork"
                    className="w-full h-full object-cover"
                    data-testid={`img-${service.slug}-section`}
                  />
                  {/* Milky overlay - consistent with gallery images */}
                  <div className="absolute inset-0 bg-white/20 pointer-events-none" />
                </div>
                
                {/* Text Column */}
                <div className="prose prose-lg max-w-none order-1 md:order-2">
                  <p className="text-foreground leading-relaxed whitespace-pre-line font-light text-lg">
                    {service.fullDescription}
                  </p>
                </div>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed whitespace-pre-line font-light text-lg">
                  {service.fullDescription}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 md:py-24 bg-card">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-16">
            {service.content.map((section, index) => {
              // "For You, If You" section gets image split layout
              const isForYouSection = index === 2 && (service.slug === 'inner-work' || service.slug === 'creative-practice' || service.slug === 'digital-space');
              
              if (isForYouSection) {
                const sectionImage = 
                  service.slug === 'inner-work' ? whoThisIsForImage :
                  service.slug === 'creative-practice' ? creativePracticeForYouImage :
                  digitalSpaceForYouImage;
                
                return (
                  <Card
                    key={index}
                    className="p-8 md:p-12 glass-card overflow-hidden"
                    data-testid={`card-content-section-${index}`}
                  >
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                      {/* Text Column */}
                      <div className="order-1 md:order-1">
                        <h2 className="font-serif text-3xl font-light text-foreground mb-6">
                          {section.heading}
                        </h2>
                        <div className="prose prose-lg max-w-none">
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-line font-light">
                            {section.text}
                          </p>
                        </div>
                      </div>
                      
                      {/* Image Column */}
                      <div className="relative aspect-square rounded-md overflow-hidden order-2 md:order-2">
                        <img
                          src={sectionImage}
                          alt="Textured floral artwork"
                          className="w-full h-full object-cover"
                          data-testid={`img-for-you-section-${service.slug}`}
                        />
                        {/* Milky overlay - consistent with gallery images */}
                        <div className="absolute inset-0 bg-white/20 pointer-events-none" />
                      </div>
                    </div>
                  </Card>
                );
              }
              
              // All other sections remain as standard text-only
              return (
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
              );
            })}
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
            <Button
              size="lg"
              className="btn-lift"
              onClick={handleContactClick}
              data-testid="button-book-now"
            >
              Get in Touch
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
