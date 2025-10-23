import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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
  { id: 1, image: gallery1, title: 'Night Garden', medium: 'Textured Mixed Media', year: '2024' },
  { id: 2, image: gallery2, title: 'Golden Meadow', medium: 'Textured Acrylic', year: '2024' },
  { id: 3, image: gallery3, title: 'Sky & Field', medium: 'Mixed Media on Canvas', year: '2025' },
  { id: 4, image: gallery4, title: 'Pastel Dreams', medium: 'Textured Painting', year: '2025' },
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
            Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-gallery-subtitle">
            Explore my collection of textured floral artwork, each piece a meditation on healing and transformation
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artworks.map((artwork, index) => (
            <button
              key={artwork.id}
              onClick={() => openLightbox(index)}
              className="group relative overflow-hidden rounded-2xl hover-elevate active-elevate-2 transition-all"
              data-testid={`button-artwork-${index}`}
            >
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full aspect-[3/4] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-serif text-lg mb-1">{artwork.title}</h3>
                  <p className="text-sm text-white/80">{artwork.medium}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-6xl p-0 bg-black/95 border-0">
          {selectedIndex !== null && (
            <div className="relative">
              <Button
                size="icon"
                variant="ghost"
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
                data-testid="button-close-lightbox"
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="relative flex items-center justify-center min-h-[400px] md:min-h-[600px]">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={goToPrevious}
                  className="absolute left-4 z-10 text-white hover:bg-white/10"
                  data-testid="button-previous"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <div className="px-16 py-8">
                  <img
                    src={artworks[selectedIndex].image}
                    alt={artworks[selectedIndex].title}
                    className="max-h-[70vh] w-auto mx-auto rounded-lg"
                    data-testid="img-lightbox-artwork"
                  />
                  <div className="text-center mt-6 text-white">
                    <h3 className="font-serif text-2xl mb-2" data-testid="text-lightbox-title">
                      {artworks[selectedIndex].title}
                    </h3>
                    <p className="text-white/70">
                      {artworks[selectedIndex].medium} • {artworks[selectedIndex].year}
                    </p>
                  </div>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={goToNext}
                  className="absolute right-4 z-10 text-white hover:bg-white/10"
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
