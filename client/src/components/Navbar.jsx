import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const s = window.scrollY;
      setScrolled(s > 60);

      // Scroll progress calculation
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(s / totalHeight);
      }

      // Active section tracking
      const sections = ['about', 'projects', 'experience', 'contact'];
      let currentSection = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const offsetTop = el.offsetTop - 130;
          const offsetBottom = offsetTop + el.offsetHeight;
          if (s >= offsetTop && s < offsetBottom) {
            currentSection = id;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileNav = () => {
    const nextState = !mobileOpen;
    setMobileOpen(nextState);
    document.body.style.overflow = nextState ? 'hidden' : '';
  };

  const handleMobileLinkClick = () => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div id="sprog" style={{ transform: `scaleX(${scrollProgress})` }}></div>

      {/* Main Navbar */}
      <nav id="nav" className={scrolled ? 'sc' : ''}>
        <a href="#" className="logo">NUMAIR<span>.</span>BAIG</a>
        <ul className="nav-links">
          <li>
            <a 
              href="#about" 
              data-n="01" 
              className={activeSection === 'about' ? 'on' : ''}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              data-n="02" 
              className={activeSection === 'projects' ? 'on' : ''}
            >
              Projects
            </a>
          </li>
          <li>
            <a 
              href="#experience" 
              data-n="03" 
              className={activeSection === 'experience' ? 'on' : ''}
            >
              Experience
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              data-n="04" 
              className={activeSection === 'contact' ? 'on' : ''}
            >
              Contact
            </a>
          </li>
        </ul>
        <a href="#contact" className="nav-btn">HIRE ME</a>
        
        <button 
          className={`ham ${mobileOpen ? 'o' : ''}`} 
          id="ham" 
          aria-label="Menu"
          onClick={toggleMobileNav}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mob-nav ${mobileOpen ? 'o' : ''}`} id="mob">
        <a href="#about" className="mnl" onClick={handleMobileLinkClick}>
          <em>01</em>About
        </a>
        <a href="#projects" className="mnl" onClick={handleMobileLinkClick}>
          <em>02</em>Projects
        </a>
        <a href="#experience" className="mnl" onClick={handleMobileLinkClick}>
          <em>03</em>Experience
        </a>
        <a href="#contact" className="mnl" onClick={handleMobileLinkClick}>
          <em>04</em>Contact
        </a>
        <a href="#contact" className="mnl mcta" onClick={handleMobileLinkClick}>
          HIRE ME
        </a>
      </div>
    </>
  );
}
