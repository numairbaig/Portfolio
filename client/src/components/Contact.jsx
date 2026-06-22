import { useState, useEffect, useRef } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, sending, sent, error
  const sectionRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitStatus('sending');

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to send message');
        return res.json();
      })
      .then(() => {
        setSubmitStatus('sent');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Reset button state after 3.5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 3500);
      })
      .catch(err => {
        console.error('Error submitting contact form:', err);
        setSubmitStatus('error');
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 3500);
      });
  };

  return (
    <section id="contact" ref={sectionRef}>
      {/* Left Social Connections */}
      <div className="cl fu">
        <div className="stag">Contact</div>
        <h2>Let's build <em>together.</em></h2>
        <p>Open to senior engineering roles, co-founder opportunities, and interesting freelance projects. I respond within 24 hours.</p>
        <div className="clinks">
          <a href="mailto:numairbaig.official@gmail.com" className="clink">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 7 10 7 10-7" />
            </svg>
            numairbaig.official@gmail.com
          </a>
          <a href="https://github.com/numairbaig" target="_blank" rel="noopener noreferrer" className="clink">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            github.com/numairbaig
          </a>
          <a href="https://www.linkedin.com/in/numairbaig/" target="_blank" rel="noopener noreferrer" className="clink">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            linkedin.com/in/numairbaig
          </a>
        </div>
      </div>

      {/* Right Form Input */}
      <form onSubmit={handleSubmit} className="cform fu" data-d="1">
        <div className="frow">
          <div className="fg">
            <label htmlFor="name-input">Name</label>
            <input 
              id="name-input"
              type="text" 
              name="name"
              placeholder="Your name" 
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>
          <div className="fg">
            <label htmlFor="email-input">Email</label>
            <input 
              id="email-input"
              type="email" 
              name="email"
              placeholder="your@email.com" 
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
        </div>
        <div className="fg">
          <label htmlFor="subject-input">Subject</label>
          <input 
            id="subject-input"
            type="text" 
            name="subject"
            placeholder="What's this about?" 
            value={formData.subject}
            onChange={handleChange}
          />
        </div>
        <div className="fg">
          <label htmlFor="message-input">Message</label>
          <textarea 
            id="message-input"
            name="message"
            placeholder="Tell me about your project..." 
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          className="fsub" 
          id="fsub"
          disabled={submitStatus === 'sending' || submitStatus === 'sent'}
          style={
            submitStatus === 'sent' ? { backgroundColor: '#28c840', color: '#000' } : 
            submitStatus === 'error' ? { backgroundColor: '#ff6b6b', color: '#000' } : {}
          }
        >
          {submitStatus === 'sending' ? 'Sending...' : 
           submitStatus === 'sent' ? 'Message Sent ✓' : 
           submitStatus === 'error' ? 'Failed ✗' : 'Send Message'}
        </button>
      </form>
    </section>
  );
}
