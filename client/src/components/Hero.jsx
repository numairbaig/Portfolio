export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-l">
        <div className="avail">
          <div className="avail-dot"></div>
          Available for freelance
        </div>
        <div className="htag">Full-Stack Developer</div>
        <h1>
          Building<br />
          <em>digital</em><br />
          systems.
        </h1>
        <p className="hdesc">
          I architect scalable web applications — from pixel-perfect interfaces to distributed backend systems that handle millions of users.
        </p>
        <div className="hbtns">
          <a href="#projects" className="btn-a">View Work</a>
          <a href="#contact" className="btn-b">
            Let's talk
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path 
                d="M3 8h10M9 4l4 4-4 4" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
        <div className="hstats">
          <div>
            <div className="snum">6<span>+</span></div>
            <div className="slbl">Years XP</div>
          </div>
          <div>
            <div className="snum">48<span>+</span></div>
            <div className="slbl">Projects</div>
          </div>
          <div>
            <div className="snum">12<span>+</span></div>
            <div className="slbl">Clients</div>
          </div>
        </div>
      </div>
      <div className="hero-r">
        <div className="hero-vis">
          <div className="orb o1"></div>
          <div className="orb o2"></div>
          <div className="orb o3"></div>
          
          <div className="cc cc1">
            <div className="cdots">
              <i className="r"></i>
              <i className="y"></i>
              <i className="g"></i>
            </div>
            <span style={{ display: 'block' }}>
              <span className="kw">const</span> <span className="fn">build</span> = <span className="kw">async</span> () =&gt; &#123;
            </span>
            <span style={{ display: 'block' }}>
              &nbsp;&nbsp;<span className="kw">const</span> idea = <span className="kw">await</span>
            </span>
            <span style={{ display: 'block' }}>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="fn">imagine</span>(<span className="str">'something great'</span>)
            </span>
            <span style={{ display: 'block' }}>
              &nbsp;&nbsp;<span className="kw">return</span> <span className="fn">ship</span>(idea)
            </span>
            <span style={{ display: 'block' }}>&#125;</span>
          </div>

          <div className="cc cc2">
            <div className="cdots">
              <i className="r"></i>
              <i className="y"></i>
              <i className="g"></i>
            </div>
            <span style={{ display: 'block' }}><span className="cm">// uptime</span></span>
            <span style={{ display: 'block' }}><span className="ac">99.9<span className="nm">%</span></span></span>
            <span style={{ display: 'block' }}><span className="cm">// p95 latency</span></span>
            <span style={{ display: 'block' }}><span className="str">&lt; 120ms</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}
