import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Services from '@/components/Services';
import BlogPreview from '@/components/BlogPreview';
import ContactForm from '@/components/ContactForm';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';

export default function Home() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Drahoslava Forgacova - Psychologist & Artist"
        description="Exploring the intersection of art, psychology, and awareness through textured floral paintings, painting meditations, and mindful creative practices."
        url="/"
      />
      <StructuredData type="person" />
      <StructuredData type="website" />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Services />
        <BlogPreview />
        <ContactForm />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
