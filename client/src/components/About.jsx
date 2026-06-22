import { useEffect, useRef } from 'react';

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('on');
          // Scale skill bars
          const fills = entry.target.querySelectorAll('.sk-fill');
          fills.forEach(fill => {
            const w = fill.getAttribute('data-w') || '1';
            fill.style.transform = `scaleX(${w})`;
          });
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
  }, []);

  const skills = [
    { name: 'Frontend', icon: '⚛️', level: 'Expert', val: 0.95 },
    { name: 'Backend', icon: '⚙️', level: 'Expert', val: 0.90 },
    { name: 'DevOps', icon: '☁️', level: 'Advanced', val: 0.78 },
    { name: 'Databases', icon: '🗄️', level: 'Expert', val: 0.88 },
    { name: 'Systems', icon: '🦀', level: 'Advanced', val: 0.74 },
    { name: 'Security', icon: '🔐', level: 'Proficient', val: 0.68 },
  ];

  return (
    <section id="about" ref={sectionRef}>
      <div className="abt-txt fu">
        <div className="stag">About</div>
        <h2>I write code<br />that <em>matters.</em></h2>
        <p>
          Senior full-stack developer with <strong>6+ years</strong> building products that scale. I specialise in the entire stack — from crafting <strong>pixel-precise interfaces</strong> to designing <strong>high-throughput distributed systems</strong>.
        </p>
        <p>
          Currently focused on <strong>real-time applications</strong>, edge computing, and developer tooling. Previously at Series B startups and FAANG-adjacent orgs.
        </p>
      </div>
      <div className="sk-grid fu" data-d="1">
        {skills.map((skill, idx) => (
          <div className="sk-cell" key={idx}>
            <div className="sk-ico">{skill.icon}</div>
            <div className="sk-nm">{skill.name}</div>
            <div className="sk-lv">
              {skill.level}
              <div className="sk-bar">
                <div 
                  className="sk-fill" 
                  data-w={skill.val}
                  style={{ transform: 'scaleX(0)' }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
