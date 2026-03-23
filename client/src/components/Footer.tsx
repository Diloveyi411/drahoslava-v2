import { Mail } from 'lucide-react';
import { SiInstagram, SiFacebook, SiTiktok, SiYoutube } from 'react-icons/si';
import { useToast } from '@/hooks/use-toast';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();

  const handleEmailClick = async () => {
    const email = 'info@drahoslava.com';
    
    try {
      await navigator.clipboard.writeText(email);
      toast({
        title: 'Email copied!',
        description: email,
        className: 'glass-card',
      });
    } catch (err) {
      toast({
        title: 'Email address',
        description: email,
        className: 'glass-card',
      });
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="mb-8">
          <div className="text-center">
            <h3 className="font-serif text-2xl font-light text-foreground mb-4" data-testid="text-footer-brand">
              Drahoslava Forgáčová
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Psychology graduate, artist and creator. Exploring the self through awareness, art, and technology.
            </p>
          </div>
        </div>

        {/* Social Media Icons + Email - Centered */}
        <div className="flex justify-center items-center gap-6 mb-8">
          <button
            onClick={handleEmailClick}
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            aria-label="Email"
            data-testid="button-footer-email"
          >
            <Mail className="h-6 w-6" />
          </button>
          <a
            href="https://instagram.com/drahoslavacom"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Instagram"
            data-testid="link-footer-instagram"
          >
            <SiInstagram className="h-6 w-6" />
          </a>
          <a
            href="https://www.facebook.com/Drahoslavaa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Facebook"
            data-testid="link-footer-facebook"
          >
            <SiFacebook className="h-6 w-6" />
          </a>
          <a
            href="https://www.tiktok.com/@baidee.art"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="TikTok"
            data-testid="link-footer-tiktok"
          >
            <SiTiktok className="h-6 w-6" />
          </a>
          <a
            href="https://www.youtube.com/@drahoslava.forgacova"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="YouTube"
            data-testid="link-footer-youtube"
          >
            <SiYoutube className="h-6 w-6" />
          </a>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground" data-testid="text-footer-copyright">
            © {currentYear} Drahoslava Forgáčová. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
