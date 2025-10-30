import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Hand, Monitor } from 'lucide-react';
import { Link } from 'wouter';

interface Service {
  icon: typeof Eye;
  title: string;
  description: string;
  slug: string;
}

const services: Service[] = [
  {
    icon: Eye,
    title: 'Soul - Inner work',
    description: 'True change begins with awareness. Through guided 1-on-1 sessions, you\'ll learn to observe your inner world with gentleness - to recognize emotional patterns, release inner resistance, and return to your authentic rhythm. This space is for those who want to see clearly and live truthfully.',
    slug: 'inner-work',
  },
  {
    icon: Hand,
    title: 'Body - Creative practice',
    description: 'Art becomes a mirror when creation is guided by awareness. In my workshops, you\'ll explore meditative painting, floral sculpting, and other tactile forms that connect thought with touch. It\'s not about artistic skill; it\'s about letting your body speak what words cannot.',
    slug: 'creative-practice',
  },
  {
    icon: Monitor,
    title: 'Mind - Digital space',
    description: `Our inner life now extends into the digital realm.
Through experimental projects - an AI-based self-awareness app, interactive digital galleries, visual essays and creations - I explore how technology can help us understand ourselves more deeply.
These are not tools of distraction, but instruments of reflection - art that thinks with you.`,
    slug: 'digital-space',
  },
];

export default function Services() {

  return (
    <section id="services" className="py-20 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4"
            data-testid="text-services-title"
          >
            Three expressions of the self
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-services-subtitle">
            Soul, body, and mind - unfolding through creation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-8 flex flex-col hover-elevate active-elevate-2 transition-all glass-card"
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
              <Link href={`/services/${service.slug}`}>
                <Button
                  variant="outline"
                  className="w-full mt-auto btn-lift text-base"
                  data-testid={`button-learn-more-${index}`}
                >
                  Learn more
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
