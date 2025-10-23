import { Card } from '@/components/ui/card';
import { Palette, Brain, Sparkles } from 'lucide-react';
import profileImage from '@assets/generated_images/Professional_portrait_about_section_c7abb55b.png';

export default function About() {
  const highlights = [
    {
      icon: Brain,
      title: 'Psychology Expertise',
      description: 'Licensed psychologist specializing in creative therapeutic approaches',
    },
    {
      icon: Palette,
      title: 'Artistic Practice',
      description: 'Professional artist creating healing-centered textured floral works',
    },
    {
      icon: Sparkles,
      title: 'Vibe Coding',
      description: 'Unique methodology combining mindfulness, art, and psychological insight',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <div className="order-1 md:order-1">
            <img
              src={profileImage}
              alt="Drahoslava Forgacova"
              className="w-full rounded-lg shadow-xl aspect-[3/4] object-cover"
              data-testid="img-about-profile"
            />
          </div>
          <div className="order-2 md:order-2">
            <h2
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6"
              data-testid="text-about-title"
            >
              Artist, Psychologist & Vibe-Coder
            </h2>
            <div className="space-y-4 text-base md:text-lg text-foreground/80 leading-relaxed">
              <p data-testid="text-about-paragraph-1">
                I create textured floral paintings that invite you into a world of soft colors and gentle emotions. Each piece is a meditation in itself, built layer by layer with intention and care.
              </p>
              <p data-testid="text-about-paragraph-2">
                As a psychologist, I believe in the healing power of creativity. Through painting meditations and 1-on-1 sessions, I guide people on journeys of self-understanding and self-actualization, where art becomes a bridge to inner wisdom.
              </p>
              <p data-testid="text-about-paragraph-3">
                My work spans from textured canvases to comics, each medium offering a unique way to explore emotions, stories, and the beautiful complexity of being human.
              </p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <Card
              key={index}
              className="p-6 hover-elevate active-elevate-2 transition-all"
              data-testid={`card-highlight-${index}`}
            >
              <highlight.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-serif text-xl font-normal text-foreground mb-2">
                {highlight.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {highlight.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
