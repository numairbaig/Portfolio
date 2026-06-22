import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p className="fcopy">
        © {currentYear} NUMAIR BAIG. Designed & built with <span>♥</span>
      </p>
      <div className="flinks">
        <a href="https://github.com/numairbaig" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="#">Twitter</a>
        <a href="https://www.linkedin.com/in/numairbaig/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="#">Resume</a>
        <Link to="/admin" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>Admin</Link>
      </div>
    </footer>
  );
}
