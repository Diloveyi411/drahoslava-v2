import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import heroImage from '@assets/13a_1761199778530.jpg';

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
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2)' }}
          data-testid="text-hero-title"
        >
          Art, Psychology & Vibes
        </h1>
        <p
          className="text-lg md:text-xl lg:text-2xl text-white/90 mb-12 font-light max-w-3xl mx-auto leading-relaxed"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2)' }}
          data-testid="text-hero-subtitle"
        >
          Creating textured floral art and guiding journeys of self-understanding through painting meditations
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={() => scrollToSection('gallery')}
            className="bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm min-w-[200px]"
            data-testid="button-view-gallery"
          >
            View Gallery
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection('services')}
            className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm min-w-[200px]"
            data-testid="button-explore-services"
          >
            Explore Services
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
