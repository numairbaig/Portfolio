import { useState, useEffect, useRef } from 'react';

const DEFAULT_EXPERIENCES = [
  {
    companyId: 'tintash',
    period: '2023 — Present',
    company: 'Tintash',
    role: 'Senior Software Engineer',
    teamInfo: 'Team: 6 · Web Apps Team',
    location: 'Lahore, PK',
    description: 'Developing responsive, high-performance web applications and multiplayer game backend panels for international startup clients.',
    achievements: [
      'Optimized game dashboard telemetry processing, cutting database read times by 30%',
      'Architected serverless AWS Lambdas handling 50k+ daily API queries',
      'Mentored 3 junior developers and established agile scrum guidelines',
      'Implemented end-to-end unit test suites improving test coverage to 85%'
    ],
    order: 1
  },
  {
    companyId: 'rolustech',
    period: '2021 — 2023',
    company: 'Rolustech',
    role: 'Software Engineer',
    teamInfo: 'Team: 8 · CRM Customizations Team',
    location: 'Lahore, PK',
    description: 'Customized SugarCRM and Salesforce systems, building custom API sync pipelines for global B2B clients.',
    achievements: [
      'Developed SugarCRM API sync script moving 100k+ customer contacts daily',
      'Built customizable reporting charts using React and ChartJS for business analytics',
      'Configured OAuth2 SSO integrations across multiple client portals',
      'Reduced CRM data sync latency by 20% using bulk-upsert techniques'
    ],
    order: 2
  },
  {
    companyId: 'redbuffer',
    period: '2019 — 2021',
    company: 'RedBuffer',
    role: 'Full-Stack Developer',
    teamInfo: 'Team: 5 · Web Products',
    location: 'Lahore, PK',
    description: 'Created user dashboards, backend nodes, and API wrappers for AI-driven analytics applications.',
    achievements: [
      'Built and launched web-app dashboard for predictive maintenance product',
      'Connected Node.js gateways to Python microservices via clean REST endpoints',
      'Integrated Stripe checkout and billing models for subscription management',
      'Created responsive admin layouts using modern flexbox/grid alignments'
    ],
    order: 3
  },
  {
    companyId: 'codegator',
    period: '2017 — 2019',
    company: 'Codegator',
    role: 'Associate Developer',
    teamInfo: 'Team: 4 · PHP/Node Team',
    location: 'Lahore, PK',
    description: 'Assisted in designing backend scripts, database seeding tools, and styling frontend dashboards.',
    achievements: [
      'Developed and optimized MySQL tables, indexing key query paths for client search',
      'Authored responsive CSS modules matching client Figma layouts precisely',
      'Created automation scripts parsing Excel spreadsheet items to JSON collections',
      'Tested and debugged legacy codebases, resolving 50+ bug tickets'
    ],
    order: 4
  }
];

export default function Experience() {
  const [experiences, setExperiences] = useState(DEFAULT_EXPERIENCES);
  const [activeCompanyId, setActiveCompanyId] = useState('tintash');
  const sectionRef = useRef(null);

  useEffect(() => {
    fetch('/api/experiences')
      .then(res => {
        if (!res.ok) throw new Error('API response error');
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          setExperiences(data);
          setActiveCompanyId(data[0].companyId);
        }
      })
      .catch(err => {
        console.warn('Could not load experiences from API, using defaults. Error:', err.message);
      });
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (experiences.length === 0) return;

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
  }, [experiences]);

  const activeExp = experiences.find(e => e.companyId === activeCompanyId) || experiences[0] || DEFAULT_EXPERIENCES[0];

  const getTerminalPath = (id) => {
    if (id === 'yc') return '~/career/yc-startup';
    return `~/career/${id}`;
  };

  return (
    <section id="experience" ref={sectionRef}>
      <div className="stag fu">Experience</div>
      <h2 className="fu" data-d="1">Where I've <em>worked.</em></h2>
      
      <div className="eg">
        {experiences.length > 0 && (
          <>
            {/* Left Timeline Selector */}
            <div className="fu" data-d="2">
              {experiences.map((exp, idx) => (
                <div 
                  key={exp._id || idx} 
                  className={`ei ${activeCompanyId === exp.companyId ? 'act' : ''}`}
                  onClick={() => setActiveCompanyId(exp.companyId)}
                >
                  <div className="epr">{exp.period}</div>
                  <div className="eco">{exp.company}</div>
                  <div className="erl">{exp.role}</div>
                </div>
              ))}
            </div>

            {/* Right Terminal Detail Pane */}
            <div className="edet fu" data-d="3">
              <div className="tw">
                <div className="tb">
                  <i className="tb1"></i>
                  <i className="tb2"></i>
                  <i className="tb3"></i>
                  <span className="tp" id="tp">{getTerminalPath(activeExp.companyId)}</span>
                </div>
                <div className="tbody">
                  <div>
                    <span className="tp1">▸ </span>
                    <span className="tc">cat role.txt</span>
                  </div>
                  <div className="to" id="tl1">{activeExp.role}</div>
                  <div className="to" id="tl2">{activeExp.teamInfo || `Location: ${activeExp.location}`}</div>
                  <div>
                    <span className="tp1">▸ </span>
                    <span className="bl">_</span>
                  </div>
                </div>
              </div>
              <div className="etitle" id="et">{activeExp.role} @ {activeExp.company}</div>
              <div className="esub" id="es">{activeExp.period} · {activeExp.location}</div>
              <div className="edesc" id="ed">{activeExp.description}</div>
              <ul className="each" id="ea">
                {activeExp.achievements && activeExp.achievements.map((ach, idx) => (
                  <li key={idx}>{ach}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
