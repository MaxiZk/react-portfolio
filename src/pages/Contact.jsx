import { useState } from 'react';
import { Link } from 'react-router-dom';

// Email y GitHub tomados del CV. TODO: completar la URL real de LinkedIn.
const CHANNELS = [
  {
    id: 'email',
    label: 'Email',
    handle: 'maxizuidwijk@gmail.com',
    href: 'mailto:maxizuidwijk@gmail.com',
    note: 'La vía más directa. Respondo dentro de las 24 h.',
    icon: '✉',
    copyable: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'in/maximo-zuidwijk-9311271b2',
    href: 'https://www.linkedin.com/in/maximo-zuidwijk-9311271b2/',
    note: 'Experiencia laboral y recomendaciones.',
    icon: 'in',
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: '@MaxiZk',
    href: 'https://github.com/MaxiZk',
    note: 'Código, proyectos y commits del día a día.',
    icon: '{ }',
    external: true,
  },
];

const styles = {
  main: {
    maxWidth: 720,
    margin: '0 auto',
    padding: 'clamp(48px, 8vw, 88px) 24px',
    textAlign: 'left',
    boxSizing: 'border-box',
    width: '100%',
  },
  h1: {
    fontFamily: 'var(--heading)',
    fontWeight: 500,
    fontSize: 'clamp(32px, 5vw, 52px)',
    lineHeight: '110%',
    letterSpacing: '-1.5px',
    color: 'var(--text-h)',
    margin: 0,
  },
  lede: {
    fontSize: 'clamp(16px, 2vw, 19px)',
    lineHeight: '155%',
    color: 'var(--text)',
    margin: '16px 0 0',
    maxWidth: '52ch',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 'clamp(32px, 5vw, 48px) 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: 'clamp(16px, 3vw, 22px)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'var(--border)',
    borderRadius: 10,
    textDecoration: 'none',
    color: 'inherit',
    transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.2s',
  },
  rowHover: {
    borderColor: 'var(--accent-border)',
    boxShadow: 'var(--shadow)',
    transform: 'translateY(-2px)',
  },
  icon: {
    flex: '0 0 auto',
    width: 42,
    height: 42,
    display: 'grid',
    placeItems: 'center',
    borderRadius: 8,
    background: 'var(--accent-bg)',
    color: 'var(--accent)',
    fontFamily: 'var(--mono)',
    fontSize: 15,
  },
  rowText: {
    minWidth: 0,
    flex: '1 1 auto',
  },
  label: {
    fontFamily: 'var(--heading)',
    fontWeight: 500,
    fontSize: 'clamp(16px, 2vw, 18px)',
    color: 'var(--text-h)',
    margin: 0,
  },
  handle: {
    fontFamily: 'var(--mono)',
    fontSize: 14,
    color: 'var(--accent)',
    margin: '2px 0 0',
    overflowWrap: 'anywhere',
  },
  note: {
    fontSize: 14,
    lineHeight: '145%',
    color: 'var(--text)',
    margin: '6px 0 0',
  },
  chevron: {
    flex: '0 0 auto',
    fontSize: 18,
    color: 'var(--accent)',
  },
  copyBtn: {
    flex: '0 0 auto',
    fontFamily: 'var(--mono)',
    fontSize: 13,
    padding: '8px 12px',
    borderRadius: 6,
    border: '1px solid var(--border)',
    background: 'transparent',
    color: 'var(--text)',
    cursor: 'pointer',
  },
  footer: {
    marginTop: 'clamp(40px, 6vw, 64px)',
    paddingTop: 32,
    borderTop: '1px solid var(--border)',
    fontSize: 'clamp(15px, 1.8vw, 17px)',
    lineHeight: '155%',
    color: 'var(--text)',
  },
  link: {
    color: 'var(--accent)',
    textDecoration: 'none',
    borderBottom: '1px solid var(--accent-border)',
  },
};

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(event) {
    // El botón vive dentro del <a>, así que frenamos la navegación.
    event.preventDefault();
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard puede fallar sin HTTPS o sin permiso: dejamos el mailto.
      window.location.href = `mailto:${value}`;
    }
  }

  return (
    <button type="button" style={styles.copyBtn} onClick={handleCopy}>
      {copied ? '¡copiado!' : 'copiar'}
    </button>
  );
}

function Channel({ channel }) {
  const [hovered, setHovered] = useState(false);
  const external = channel.external
    ? { target: '_blank', rel: 'noreferrer noopener' }
    : {};

  return (
    <li>
      <a
        href={channel.href}
        style={hovered ? { ...styles.row, ...styles.rowHover } : styles.row}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        {...external}
      >
        <span style={styles.icon} aria-hidden="true">
          {channel.icon}
        </span>

        <span style={styles.rowText}>
          <span style={{ ...styles.label, display: 'block' }}>
            {channel.label}
          </span>
          <span style={{ ...styles.handle, display: 'block' }}>
            {channel.handle}
          </span>
          <span style={{ ...styles.note, display: 'block' }}>
            {channel.note}
          </span>
        </span>

        {channel.copyable ? (
          <CopyButton value={channel.handle} />
        ) : (
          <span style={styles.chevron} aria-hidden="true">
            ↗
          </span>
        )}
      </a>
    </li>
  );
}

export default function Contact({ channels = CHANNELS }) {
  return (
    <main style={styles.main}>
      <h1 style={styles.h1}>Get in touch</h1>
      <p style={styles.lede}>
        Estoy abierto a proyectos de automation, security tooling y desarrollo
        frontend. Si algo de lo que viste te resuena, escribime por donde te
        quede más cómodo.
      </p>

      <ul style={styles.list}>
        {channels.map((channel) => (
          <Channel key={channel.id} channel={channel} />
        ))}
      </ul>

      <p style={styles.footer}>
        Antes de escribir quizás quieras ver los{' '}
        <Link to="/work" style={styles.link}>
          case studies
        </Link>{' '}
        o el{' '}
        <Link to="/status" style={styles.link}>
          estado de mi GitHub
        </Link>
        .
      </p>
    </main>
  );
}
