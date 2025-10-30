import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogPortal, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { cn } from '@/lib/utils';
import { useLocation } from 'wouter';
import gallery1 from '@assets/13b_1761189596670.webp';
import gallery2 from '@assets/Obraz 2_1761189596670.webp';
import gallery3 from '@assets/Screenshot 2025-10-23 at 00.04.50_1761189596671.webp';
import gallery4 from '@assets/Screenshot 2025-10-08 at 20.18.59_1761189596671.webp';

interface Artwork {
  id: number;
  image: string;
  title: string;
  medium: string;
  year: string;
}

const artworks: Artwork[] = [
  { id: 1, image: gallery1, title: 'Silent Garden', medium: 'Textured Mixed Media', year: '2024' },
  { id: 2, image: gallery2, title: 'Field of Presence', medium: 'Textured Mixed Media', year: '2024' },
  { id: 3, image: gallery3, title: 'Between Worlds', medium: 'Textured Mixed Media', year: '2025' },
  { id: 4, image: gallery4, title: 'Soft Return', medium: 'Textured Mixed Media', year: '2025' },
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [, setLocation] = useLocation();

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + artworks.length) % artworks.length);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % artworks.length);
    }
  };

  const handleExploreMore = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setLocation('/artwork');
  };

  return (
    <section id="gallery" className="py-20 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-base text-muted-foreground mb-6" data-testid="text-gallery-intro">
            Each piece in this collection was created as a personal reflection for kindred spirits around the world.
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground"
            data-testid="text-gallery-title"
          >
            Floral meditations
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 lg:gap-8">
          {artworks.map((artwork, index) => (
            <Card
              key={artwork.id}
              className="overflow-visible hover-elevate active-elevate-2 transition-all shadow-md cursor-pointer glass-card"
              onClick={() => openLightbox(index)}
              data-testid={`button-artwork-${index}`}
            >
              <div className="p-4 sm:p-6">
                <div className="group relative overflow-hidden">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-white/20 pointer-events-none" />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-serif text-lg text-foreground">{artwork.title}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="btn-lift group text-base"
            onClick={handleExploreMore}
            data-testid="button-explore-more"
          >
            Enter the gallery
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            className="text-base"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            data-testid="button-art-inquiries"
          >
            Get in touch for commission request
          </Button>
        </div>
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={closeLightbox}>
        <DialogPortal>
          <DialogOverlay className="bg-background/50 backdrop-blur-md" />
          <DialogPrimitive.Content
            className={cn(
              "fixed left-[50%] top-[50%] z-50 grid w-full max-w-5xl translate-x-[-50%] translate-y-[-50%] border-none outline-none bg-transparent p-0 shadow-none duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 focus:outline-none focus-visible:outline-none [&>button[type=button]]:hidden"
            )}
          >
            {selectedIndex !== null && (
              <>
                <VisuallyHidden>
                  <DialogTitle>{artworks[selectedIndex].title}</DialogTitle>
                </VisuallyHidden>
                
                <Button
                  size="icon"
                  onClick={closeLightbox}
                  className="fixed top-6 right-6 z-[100] bg-primary text-primary-foreground shadow-xl rounded-full w-12 h-12 !flex items-center justify-center btn-lift"
                  data-testid="button-close-lightbox"
                >
                  <X className="h-6 w-6" />
                </Button>

                <div className="p-4 sm:p-8">
                  <div className="relative flex items-center justify-center gap-4">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={goToPrevious}
                      className="flex-shrink-0 btn-lift"
                      data-testid="button-previous"
                    >
                      <ChevronLeft className="h-8 w-8" />
                    </Button>

                    <Card className="flex-1 max-w-3xl shadow-lg bg-background border-none glass-card">
                      <div className="p-6 sm:p-8">
                        <div className="relative">
                          <img
                            src={artworks[selectedIndex].image}
                            alt={artworks[selectedIndex].title}
                            className="w-full max-h-[60vh] object-contain mx-auto"
                            data-testid="img-lightbox-artwork"
                          />
                          <div className="absolute inset-0 bg-white/20 pointer-events-none" />
                        </div>
                        <div className="text-center mt-6">
                          <h3 className="font-serif text-2xl text-foreground mb-2" data-testid="text-lightbox-title">
                            {artworks[selectedIndex].title}
                          </h3>
                          <p className="text-muted-foreground">
                            {artworks[selectedIndex].medium} • 100x100cm • {artworks[selectedIndex].year}
                          </p>
                        </div>
                      </div>
                    </Card>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={goToNext}
                      className="flex-shrink-0 btn-lift"
                      data-testid="button-next"
                    >
                      <ChevronRight className="h-8 w-8" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </section>
  );
}
