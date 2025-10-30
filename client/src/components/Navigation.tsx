import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (id: string) => {
    if (id === 'blog') {
      setLocation('/blog');
      setIsMobileMenuOpen(false);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      } else {
        setLocation('/');
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        setIsMobileMenuOpen(false);
      }
    }
  };

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Services', id: 'services' },
    { label: 'Contact', id: 'contact' },
    { label: 'Blog', id: 'blog' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button
            onClick={() => handleNavigation('hero')}
            className={`flex items-center font-serif text-xl lg:text-2xl font-light hover-elevate active-elevate-2 px-3 py-2 rounded-lg transition-colors ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}
            data-testid="link-logo"
          >
            <img
              src="/favicon.png"
              alt="Rose logo"
              className={`transition-all duration-300 ${
                isScrolled 
                  ? 'h-8 w-8 lg:h-10 lg:w-10 opacity-100 mr-3' 
                  : 'h-0 w-0 opacity-0 mr-0'
              }`}
            />
            <span>Drahoslava Forgáčová</span>
          </button>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Button
                key={link.id}
                variant="ghost"
                onClick={() => handleNavigation(link.id)}
                className={isScrolled ? '' : 'text-white hover:text-white'}
                data-testid={`link-${link.id}`}
              >
                {link.label}
              </Button>
            ))}
            <Button
              onClick={() => handleNavigation('contact')}
              className={isScrolled ? '' : 'text-white hover:text-white'}
              data-testid="button-contact-cta"
            >
              Get in touch
            </Button>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className={`md:hidden ${isScrolled ? '' : 'text-white hover:text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border" data-testid="mobile-menu">
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <Button
                key={link.id}
                variant="ghost"
                onClick={() => handleNavigation(link.id)}
                className="w-full justify-start"
                data-testid={`mobile-link-${link.id}`}
              >
                {link.label}
              </Button>
            ))}
            <Button
              onClick={() => handleNavigation('contact')}
              className="w-full"
              data-testid="mobile-button-contact"
            >
              Get in touch
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
