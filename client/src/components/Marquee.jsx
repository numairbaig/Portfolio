export default function Marquee() {
  const skills = [
    'React', 'TypeScript', 'Node.js', 'PostgreSQL',
    'Rust', 'Docker', 'AWS', 'GraphQL',
    'Redis', 'Kubernetes', 'Next.js', 'Three.js'
  ];

  return (
    <div className="mq-wrap">
      <div className="mq-track">
        {/* Render twice for seamless loop */}
        {skills.map((skill, idx) => (
          <span key={`s1-${idx}`} className="mi">
            <span className="dot">●</span>{skill}
          </span>
        ))}
        {skills.map((skill, idx) => (
          <span key={`s2-${idx}`} className="mi">
            <span className="dot">●</span>{skill}
          </span>
        ))}
      </div>
    </div>
  );
}
