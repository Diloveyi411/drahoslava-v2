import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, User, Palette } from 'lucide-react';

interface Service {
  icon: typeof Users;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Users,
    title: 'Soul — Inner Work',
    description: 'True change begins with awareness. Through guided 1-on-1 sessions, you\'ll learn to observe your inner world with gentleness — to recognize emotional patterns, release inner resistance, and return to your authentic rhythm. This space is for those who want to see clearly and live truthfully.',
  },
  {
    icon: User,
    title: 'Body — Creative Practice',
    description: 'Personal sessions combining psychology and art for deep self-understanding and self-actualization. Tailored to your unique journey.',
  },
  {
    icon: Palette,
    title: 'Mind — Digital Space',
    description: 'Explore stories and emotions through my comic work. Each piece tells a tale of human experience, growth, and connection.',
  },
];

export default function Services() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4"
            data-testid="text-services-title"
          >
            Three Expressions of the Self
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-services-subtitle">
            Soul, body, and mind — unfolding through creation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-8 flex flex-col hover-elevate active-elevate-2 transition-all"
              data-testid={`card-service-${index}`}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-6">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed flex-1">
                {service.description}
              </p>
              <Button
                variant="outline"
                onClick={scrollToContact}
                className="w-full mt-auto"
                data-testid={`button-learn-more-${index}`}
              >
                Learn More
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
