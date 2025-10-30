import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Services from '@/components/Services';
import BlogPreview from '@/components/BlogPreview';
import ContactForm from '@/components/ContactForm';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
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
