import { useState, useEffect, useRef } from 'react';

const DEFAULT_PROJECTS = [
  {
    title: 'PDF Prism — PDF Viewer App in Kotlin',
    tags: ['Kotlin', 'Android SDK', 'PDFium', 'Material Design 3'],
    category: 'FEATURED',
    description: 'A lightweight, secure, and blazing-fast Android PDF viewer app built using Kotlin. Features hardware-accelerated rendering, dark mode page styling, custom bookmarks, and offline processing with zero trackers.',
    link: '#',
    order: 1
  },
  {
    title: 'UI Vault — Premium UI Elements & Templates',
    tags: ['React', 'CSS Modules', 'Vite', 'A11y'],
    category: 'NORMAL',
    description: 'A curated repository of premium, highly interactive, and accessible UI components built using HSL color systems, glassmorphism, and responsive CSS. Features smooth micro-animations.',
    link: 'https://ui-vault-hub.vercel.app/',
    order: 2
  },
  {
    title: 'Guest House Management — PMS Solution',
    tags: ['Node.js', 'Express', 'MongoDB', 'Mongoose'],
    category: 'NORMAL',
    description: 'A complete Property Management System (PMS) for guest houses. Features real-time room booking grids, billing automation, dashboard reporting, and role-based access control.',
    link: '#',
    order: 3
  },
  {
    title: 'UI Live Sandbox — Real-time Component Editor',
    tags: ['React', 'Monaco Editor', 'Iframe Sandbox', 'Vite'],
    category: 'NORMAL',
    description: 'An interactive, web-based playground for writing and previewing React and CSS components in real time. Features live hot-reloading in an isolated iframe sandbox.',
    link: 'https://ui-live-sandbox.vercel.app/',
    order: 4
  },
  {
    title: 'Aura Thread — Clothing E-Commerce Website',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    category: 'NORMAL',
    description: 'A modern clothing e-commerce store with full cart functionality, Stripe checkout integrations, inventory management systems, and a custom dashboard reporting analytics.',
    link: '#',
    order: 5
  }
];

export default function Projects() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Fetch projects from database
    fetch('/api/projects')
      .then(res => {
        if (!res.ok) throw new Error('API response error');
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(err => {
        console.warn('Could not load projects from API, using defaults. Error:', err.message);
      });
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (projects.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('on');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      const fadeElements = sectionRef.current.querySelectorAll('.fu');
      fadeElements.forEach(el => observer.observe(el));
    }

    return () => {
      observer.disconnect();
    };
  }, [projects]);

  // Split projects into the two grid formats
  const pg1Projects = projects.slice(0, 2);
  const pg2Projects = projects.slice(2);

  return (
    <section id="projects" ref={sectionRef}>
      <div className="ph fu">
        <div>
          <div className="stag">Projects</div>
          <h2>Selected <em>work.</em></h2>
        </div>
        <a href="#" className="ph-link">All projects →</a>
      </div>

      {pg1Projects.length > 0 && (
        <div className="pg1 fu" data-d="1">
          {pg1Projects.map((project, idx) => {
            const isFeatured = idx === 0 && project.category === 'FEATURED';
            return (
              <div key={project._id || idx} className={`pc ${isFeatured ? 'ft' : ''}`}>
                <div className="pn">
                  {isFeatured ? '01 / FEATURED' : `0${idx + 1}`}
                </div>
                <div className="ptags">
                  {project.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className={`tag ${tIdx === 0 ? 'hi' : ''}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="pt">{project.title}</div>
                <div className="pd">{project.description}</div>
                <a href={project.link} className="pl">
                  {isFeatured ? 'View Case Study →' : (project.link && project.link.includes('vercel.app') ? 'Live Preview →' : 'GitHub →')}
                </a>
                <div className="pg"></div>
              </div>
            );
          })}
        </div>
      )}

      {pg2Projects.length > 0 && (
        <div className="pg2 fu" data-d="2">
          {pg2Projects.map((project, idx) => (
            <div key={project._id || idx} className="pc">
              <div className="pn">0{idx + 3}</div>
              <div className="ptags">
                {project.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className={`tag ${tIdx === 0 ? 'hi' : ''}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="pt">{project.title}</div>
              <div className="pd">{project.description}</div>
              <a href={project.link} className="pl">
                {project.link && project.link.includes('vercel.app') ? 'Live Preview →' :
                 project.title.toLowerCase().includes('cli') ? 'npm →' : 
                 project.title.toLowerCase().includes('cms') ? 'Live Demo →' : 'Docs →'}
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
