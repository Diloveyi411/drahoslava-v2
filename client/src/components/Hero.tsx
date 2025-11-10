import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <picture className="absolute inset-0">
        <source
          media="(max-width: 767px)"
          srcSet="/optimized/hero-mobile.webp"
          width={800}
          height={533}
        />
        <source
          media="(max-width: 1199px)"
          srcSet="/optimized/hero-tablet.webp"
          width={1200}
          height={800}
        />
        <img
          src="/optimized/hero-desktop.webp"
          srcSet="/optimized/hero-desktop.webp"
          alt="Background artwork"
          className="absolute inset-0 w-full h-full object-cover scale-105 opacity-60"
          width={1920}
          height={1280}
          fetchPriority="high"
          loading="eager"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/20" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight leading-tight"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2)' }}
          data-testid="text-hero-title"
        >
          Connecting psychology, art and technology<br />to help you rediscover your true essence
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={() => scrollToSection('gallery')}
            className="bg-primary/90 text-primary-foreground backdrop-blur-sm min-w-[200px] btn-lift text-base"
            data-testid="button-view-gallery"
          >
            View gallery
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection('services')}
            className="bg-white/10 text-white border-white/30 backdrop-blur-sm min-w-[200px] btn-lift text-base"
            data-testid="button-explore-services"
          >
            Explore services
          </Button>
        </div>
      </div>

      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors animate-bounce"
        data-testid="button-scroll-down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
