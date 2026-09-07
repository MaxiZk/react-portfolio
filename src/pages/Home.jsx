import { useState } from 'react';
import { Link } from 'react-router-dom';

const styles = {
  section: {
    display: 'flex',
    flexDirection: 'column',
    placeContent: 'center',
    placeItems: 'center',
    flexGrow: 1,
    gap: 24,
    padding: '80px 20px',
    boxSizing: 'border-box',
  },
  title: {
    fontFamily: 'var(--heading)',
    fontWeight: 500,
    fontSize: 'clamp(36px, 6vw, 64px)',
    lineHeight: '108%',
    letterSpacing: '-1.9px',
    color: 'var(--text-h)',
    margin: 0,
    maxWidth: '14ch',
  },
  accent: {
    color: 'var(--accent)',
  },
  subtitle: {
    fontSize: 'clamp(16px, 2vw, 20px)',
    lineHeight: '150%',
    color: 'var(--text)',
    margin: 0,
    maxWidth: '52ch',
  },
  button: {
    fontFamily: 'inherit',
    fontSize: 16,
    lineHeight: 1,
    padding: '14px 28px',
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'transparent',
    background: 'var(--accent-bg)',
    color: 'var(--accent)',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer',
    transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.2s',
  },
  buttonHover: {
    borderColor: 'var(--accent-border)',
    boxShadow: 'var(--shadow)',
    transform: 'translateY(-2px)',
  },
  arrow: {
    fontSize: 18,
  },
};

export default function Home() {
  const [hovered, setHovered] = useState(false);

  return (
    <section style={styles.section}>
      <h1 style={styles.title}>
        Construyo interfaces web <span style={styles.accent}>rápidas</span> y
        cuidadas hasta el último píxel
      </h1>

      <p style={styles.subtitle}>
        Soy Máximo, desarrollador frontend. Diseño y programo productos con
        React, poniendo el foco en el rendimiento, la accesibilidad y los
        detalles que hacen que una interfaz se sienta bien.
      </p>

      <Link
        to="/contact"
        style={hovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        Get in touch
        <span style={styles.arrow} aria-hidden="true">
          →
        </span>
      </Link>
    </section>
  );
}
