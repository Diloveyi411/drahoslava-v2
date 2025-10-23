import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, User, Palette, Calendar } from 'lucide-react';

interface Service {
  icon: typeof Users;
  title: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    icon: Users,
    title: 'Painting Meditations',
    description: 'Group sessions combining mindfulness practices with guided creative expression',
    features: ['Weekly group sessions', 'All materials provided', 'Beginner-friendly', 'Community connection'],
  },
  {
    icon: User,
    title: '1-on-1 Sessions',
    description: 'Personalized psychology and art therapy sessions tailored to your unique journey',
    features: ['Individual attention', 'Psychology + art fusion', 'Flexible scheduling', 'Customized approach'],
  },
  {
    icon: Palette,
    title: 'Comics & Illustrations',
    description: 'Custom artistic creations and illustrated explorations of personal narratives',
    features: ['Personal storytelling', 'Visual narratives', 'Commission work', 'Therapeutic art'],
  },
  {
    icon: Calendar,
    title: 'Workshops & Events',
    description: 'Special events, retreats, and workshops exploring the intersection of art and healing',
    features: ['Weekend workshops', 'Seasonal retreats', 'Guest collaborations', 'Special themes'],
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
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4"
            data-testid="text-services-title"
          >
            Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-services-subtitle">
            Choose the experience that resonates with your path to healing and creative discovery
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-8 hover-elevate active-elevate-2 transition-all"
              data-testid={`card-service-${index}`}
            >
              <service.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-serif text-2xl font-normal text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-foreground/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                onClick={scrollToContact}
                className="w-full"
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
