import { Card } from '@/components/ui/card';
import { Palette, Brain, Sparkles } from 'lucide-react';
import profileImage from '@assets/Dadi-art-11_1761189784462.jpg';

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
          <div className="order-1 md:order-1 relative">
            <img
              src={profileImage}
              alt="Drahoslava Forgacova"
              className="w-full rounded-lg shadow-xl aspect-[3/4] object-cover"
              data-testid="img-about-profile"
            />
            <div className="absolute inset-0 bg-white/10 rounded-lg pointer-events-none" />
          </div>
          <div className="order-2 md:order-2">
            <h2
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6"
              data-testid="text-about-title"
            >
              Psychologist, artist, and creator of experiences
            </h2>
            <div className="space-y-4 text-base md:text-lg text-foreground/80 leading-relaxed">
              <p data-testid="text-about-paragraph-1">
                My work explores how psychology, art, and technology can serve as mirrors for self-awareness.
              </p>
              <p data-testid="text-about-paragraph-2">
                I'm interested in what happens when understanding becomes not only intellectual but sensory — when reflection takes form, color, and motion.
              </p>
              <p data-testid="text-about-paragraph-3">
                Every project I create, whether digital or physical, is an experiment in how consciousness expresses itself through creation.
              </p>
              <p data-testid="text-about-paragraph-4">
                My goal is not to teach people who they are, but to build spaces where they can see themselves more clearly — through beauty, structure, and attention.
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
