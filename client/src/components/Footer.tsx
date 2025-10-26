import { Mail, MapPin } from 'lucide-react';
import { SiInstagram, SiFacebook } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-serif text-2xl font-light text-foreground mb-4" data-testid="text-footer-brand">
              Drahoslava Forgáčová
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Psychologist, artist and creator.
              <br />
              Exploring the self through awareness, art, and technology.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['about', 'gallery', 'services', 'contact'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(link)}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm capitalize"
                    data-testid={`link-footer-${link}`}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span data-testid="text-footer-email">info@drahoslava.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span data-testid="text-footer-location">Bratislava, Slovakia</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <SiInstagram className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a 
                  href="https://instagram.com/drahoslavacom" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                  data-testid="link-footer-instagram"
                >
                  @drahoslavacom
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <SiFacebook className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a 
                  href="https://www.facebook.com/Drahoslavaa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                  data-testid="link-footer-facebook"
                >
                  facebook.com/Drahoslavaa
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground" data-testid="text-footer-copyright">
            © {currentYear} Drahoslava Forgáčová. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
