import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GITHUB_USER = 'MaxiZk';
const API = 'https://api.github.com';

const styles = {
  main: {
    maxWidth: 896,
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
    maxWidth: '54ch',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: 18,
    marginTop: 'clamp(32px, 5vw, 48px)',
    flexWrap: 'wrap',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    border: '1px solid var(--border)',
  },
  handle: {
    fontFamily: 'var(--mono)',
    fontSize: 'clamp(15px, 2vw, 17px)',
    color: 'var(--accent)',
    textDecoration: 'none',
    margin: 0,
  },
  bio: {
    fontSize: 15,
    lineHeight: '150%',
    color: 'var(--text)',
    margin: '4px 0 0',
  },
  statGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: 12,
    marginTop: 'clamp(24px, 4vw, 32px)',
    listStyle: 'none',
    padding: 0,
  },
  stat: {
    border: '1px solid var(--border)',
    borderRadius: 10,
    padding: '18px 20px',
  },
  statValue: {
    fontFamily: 'var(--heading)',
    fontWeight: 500,
    fontSize: 'clamp(26px, 4vw, 34px)',
    lineHeight: 1,
    color: 'var(--text-h)',
    margin: 0,
  },
  statLabel: {
    fontFamily: 'var(--mono)',
    fontSize: 13,
    letterSpacing: '0.05em',
    color: 'var(--text)',
    margin: '8px 0 0',
  },
  h2: {
    fontFamily: 'var(--heading)',
    fontWeight: 500,
    fontSize: 'clamp(20px, 2.6vw, 26px)',
    color: 'var(--text-h)',
    margin: 'clamp(40px, 6vw, 56px) 0 0',
  },
  repoList: {
    listStyle: 'none',
    padding: 0,
    margin: '20px 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  repo: {
    display: 'block',
    padding: '16px 18px',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'var(--border)',
    borderRadius: 10,
    textDecoration: 'none',
    color: 'inherit',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  repoHover: {
    borderColor: 'var(--accent-border)',
    boxShadow: 'var(--shadow)',
  },
  repoName: {
    fontFamily: 'var(--mono)',
    fontSize: 'clamp(14px, 1.8vw, 16px)',
    color: 'var(--accent)',
    margin: 0,
    overflowWrap: 'anywhere',
  },
  repoDesc: {
    fontSize: 14,
    lineHeight: '150%',
    color: 'var(--text)',
    margin: '6px 0 0',
  },
  repoMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px 14px',
    fontFamily: 'var(--mono)',
    fontSize: 13,
    color: 'var(--text)',
    margin: '10px 0 0',
  },
  state: {
    marginTop: 'clamp(32px, 5vw, 48px)',
    padding: '20px 24px',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'var(--border)',
    fontSize: 15,
    lineHeight: '155%',
    color: 'var(--text)',
  },
  errorState: {
    borderColor: 'var(--accent-border)',
    background: 'var(--accent-bg)',
  },
  skeleton: {
    background: 'var(--code-bg)',
    borderRadius: 6,
    display: 'block',
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

function Stat({ value, label }) {
  return (
    <li style={styles.stat}>
      <p style={styles.statValue}>{value}</p>
      <p style={styles.statLabel}>{label}</p>
    </li>
  );
}

function Repo({ repo }) {
  const [hovered, setHovered] = useState(false);

  return (
    <li>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer noopener"
        style={hovered ? { ...styles.repo, ...styles.repoHover } : styles.repo}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <p style={styles.repoName}>{repo.name}</p>
        {repo.description && <p style={styles.repoDesc}>{repo.description}</p>}
        <p style={styles.repoMeta}>
          {repo.language && <span>{repo.language}</span>}
          <span>★ {repo.stargazers_count}</span>
          <span>
            actualizado{' '}
            {new Date(repo.pushed_at).toLocaleDateString('es-AR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </p>
      </a>
    </li>
  );
}

function Skeleton() {
  return (
    <ul style={styles.statGrid}>
      {[0, 1, 2, 3].map((i) => (
        <li key={i} style={styles.stat}>
          <span style={{ ...styles.skeleton, height: 30, width: '55%' }} />
          <span
            style={{ ...styles.skeleton, height: 13, width: '80%', marginTop: 12 }}
          />
        </li>
      ))}
    </ul>
  );
}

export default function Status({ username = GITHUB_USER, repoCount = 5 }) {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setStatus('loading');
      setError('');

      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`${API}/users/${username}`, { signal: controller.signal }),
          fetch(
            `${API}/users/${username}/repos?sort=pushed&per_page=${repoCount}`,
            { signal: controller.signal },
          ),
        ]);

        if (userRes.status === 404) {
          throw new Error(`El usuario ${username} no existe en GitHub.`);
        }
        if (userRes.status === 403) {
          throw new Error(
            'GitHub limitó las consultas desde esta IP (60 por hora sin autenticar). Probá de nuevo en un rato.',
          );
        }
        if (!userRes.ok) {
          throw new Error(`GitHub respondió ${userRes.status}.`);
        }

        const user = await userRes.json();
        // Los repos son secundarios: si fallan, igual mostramos el perfil.
        const repoList = reposRes.ok ? await reposRes.json() : [];

        setProfile(user);
        setRepos(Array.isArray(repoList) ? repoList : []);
        setStatus('ready');
      } catch (err) {
        // El abort de StrictMode / unmount no es un error real.
        if (err.name === 'AbortError') return;
        setError(err.message);
        setStatus('error');
      }
    }

    load();
    return () => controller.abort();
  }, [username, repoCount]);

  const memberSince = profile
    ? new Date(profile.created_at).getFullYear()
    : null;

  return (
    <main style={styles.main}>
      <h1 style={styles.h1}>Status</h1>
      <p style={styles.lede}>
        Datos en vivo desde la API pública de GitHub. Se piden en cada visita,
        así que lo que ves acá es el estado real de la cuenta ahora mismo.
      </p>

      {status === 'loading' && (
        <>
          <p style={{ ...styles.state, marginBottom: 0 }}>
            Consultando la API de GitHub…
          </p>
          <Skeleton />
        </>
      )}

      {status === 'error' && (
        <p style={{ ...styles.state, ...styles.errorState }}>
          No se pudieron cargar los datos. {error}{' '}
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer noopener"
            style={styles.link}
          >
            Ver el perfil directamente en GitHub
          </a>
          .
        </p>
      )}

      {status === 'ready' && profile && (
        <>
          <div style={styles.profile}>
            <img
              src={profile.avatar_url}
              alt=""
              width={64}
              height={64}
              style={styles.avatar}
            />
            <div>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noreferrer noopener"
                style={styles.handle}
              >
                @{profile.login}
              </a>
              {profile.bio && <p style={styles.bio}>{profile.bio}</p>}
              {profile.location && <p style={styles.bio}>{profile.location}</p>}
            </div>
          </div>

          <ul style={styles.statGrid}>
            <Stat value={profile.public_repos} label="repos públicos" />
            <Stat value={profile.followers} label="followers" />
            <Stat value={profile.following} label="following" />
            <Stat value={memberSince} label="en GitHub desde" />
          </ul>

          {repos.length > 0 && (
            <>
              <h2 style={styles.h2}>Actividad reciente</h2>
              <ul style={styles.repoList}>
                {repos.map((repo) => (
                  <Repo key={repo.id} repo={repo} />
                ))}
              </ul>
            </>
          )}
        </>
      )}

      <p style={styles.footer}>
        El contexto de estos repos está en{' '}
        <Link to="/work" style={styles.link}>
          Work
        </Link>
        , y si querés hablar de alguno,{' '}
        <Link to="/contact" style={styles.link}>
          escribime
        </Link>
        .
      </p>
    </main>
  );
}
