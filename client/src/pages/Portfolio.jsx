import Cursor from '../components/Cursor';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import About from '../components/About';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Portfolio() {
  return (
    <>
      <Cursor />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
