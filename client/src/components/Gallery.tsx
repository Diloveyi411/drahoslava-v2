import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import gallery1 from '@assets/13b_1761189596670.jpg';
import gallery2 from '@assets/Obraz 2_1761189596670.jpg';
import gallery3 from '@assets/Screenshot 2025-10-23 at 00.04.50_1761189596671.png';
import gallery4 from '@assets/Screenshot 2025-10-08 at 20.18.59_1761189596671.png';

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

  return (
    <section id="gallery" className="py-20 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4"
            data-testid="text-gallery-title"
          >
            Floral Meditations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-gallery-subtitle">
            Where beauty becomes awareness, and every bloom carries a quiet truth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 lg:gap-8">
          {artworks.map((artwork, index) => (
            <Card
              key={artwork.id}
              className="overflow-visible hover-elevate active-elevate-2 transition-all shadow-md cursor-pointer"
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
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-serif text-lg text-foreground">{artwork.title}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-5xl bg-background/98 backdrop-blur-sm border-0">
          {selectedIndex !== null && (
            <div className="relative p-4 sm:p-8">
              <VisuallyHidden>
                <DialogTitle>{artworks[selectedIndex].title}</DialogTitle>
              </VisuallyHidden>
              <Button
                size="icon"
                variant="ghost"
                onClick={closeLightbox}
                className="absolute top-2 right-2 z-20"
                data-testid="button-close-lightbox"
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="relative flex items-center justify-center gap-4">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={goToPrevious}
                  className="flex-shrink-0"
                  data-testid="button-previous"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <Card className="flex-1 max-w-3xl shadow-lg">
                  <div className="p-6 sm:p-8">
                    <img
                      src={artworks[selectedIndex].image}
                      alt={artworks[selectedIndex].title}
                      className="w-full max-h-[60vh] object-contain mx-auto"
                      data-testid="img-lightbox-artwork"
                    />
                    <div className="text-center mt-6">
                      <h3 className="font-serif text-2xl text-foreground mb-2" data-testid="text-lightbox-title">
                        {artworks[selectedIndex].title}
                      </h3>
                      <p className="text-muted-foreground">
                        {artworks[selectedIndex].medium} • {artworks[selectedIndex].year}
                      </p>
                    </div>
                  </div>
                </Card>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={goToNext}
                  className="flex-shrink-0"
                  data-testid="button-next"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
