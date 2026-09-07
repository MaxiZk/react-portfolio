import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '896px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/" style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-h)', textDecoration: 'none' }}>
          Máximo
        </Link>
        <div style={{ display: 'flex', gap: '32px' }}>
          <Link to="/work" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Work</Link>
          <Link to="/about" style={{ color: 'var(--accent)', textDecoration: 'none' }}>About</Link>
          <Link to="/contact" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Contact</Link>
          <Link to="/status" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Status</Link>
        </div>
      </div>
    </nav>
  );
}
