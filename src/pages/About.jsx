import { Link } from 'react-router-dom';

// Fechas tomadas del CV (Maximo_Zuidwijk_CV_EN.pdf) y de docs/ de la tesis.
const TIMELINE = [
  {
    period: '2020',
    title: 'Ingeniería en Informática — USAL',
    body: 'Entré a la facultad desde un secundario orientado a Administración de Empresas. Los primeros años fueron construir desde cero la base técnica que mis compañeros ya traían.',
  },
  {
    period: '2023 — 2024',
    title: 'Ancho antes que profundidad',
    body: 'Introducción a Data Science en la Municipalidad de Escobar y Full Stack Web Development en la UTN. Dos cursos que no elegí por un plan de carrera sino por curiosidad, y que terminaron dándome el repertorio con el que después pude construir cosas propias.',
  },
  {
    period: '2026',
    title: 'GraphSAST — Proyecto Final',
    body: 'La tesis me empujó al análisis estático y a la seguridad. Diseñar la arquitectura, cerrar las decisiones de fondo en ADRs y llevar el motor de taint hasta un benchmark reproducible fue el primer proyecto donde tuve que defender cada decisión técnica, no solo hacerla funcionar.',
  },
  {
    period: '2026',
    title: 'QA y tooling en paralelo',
    body: 'Un mes de curso de testing en a1qa, probando sitios web y aplicaciones, y ocho semanas como AI Intern en FlyRank integrando asistentes en flujos de trabajo reales. Análisis estático, testing dinámico y tooling terminaron siendo la misma pregunta hecha desde tres lugares distintos.',
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
    fontSize: 'clamp(17px, 2.2vw, 21px)',
    lineHeight: '155%',
    color: 'var(--text-h)',
    margin: '20px 0 0',
  },
  p: {
    fontSize: 'clamp(15px, 1.8vw, 18px)',
    lineHeight: '165%',
    color: 'var(--text)',
    margin: '20px 0 0',
  },
  h2: {
    fontFamily: 'var(--heading)',
    fontWeight: 500,
    fontSize: 'clamp(20px, 2.6vw, 26px)',
    lineHeight: '118%',
    letterSpacing: '-0.3px',
    color: 'var(--text-h)',
    margin: 'clamp(40px, 6vw, 56px) 0 0',
  },
  timeline: {
    listStyle: 'none',
    padding: 0,
    margin: '28px 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  item: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr)',
    gap: 6,
    padding: '20px 0 20px 22px',
    borderLeft: '2px solid var(--border)',
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    left: -5,
    top: 26,
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: 'var(--accent)',
  },
  period: {
    fontFamily: 'var(--mono)',
    fontSize: 13,
    letterSpacing: '0.06em',
    color: 'var(--accent)',
    margin: 0,
  },
  itemTitle: {
    fontFamily: 'var(--heading)',
    fontWeight: 500,
    fontSize: 'clamp(17px, 2vw, 20px)',
    color: 'var(--text-h)',
    margin: 0,
  },
  itemBody: {
    fontSize: 'clamp(15px, 1.7vw, 17px)',
    lineHeight: '160%',
    color: 'var(--text)',
    margin: 0,
  },
  pull: {
    margin: 'clamp(32px, 5vw, 48px) 0 0',
    padding: '20px 24px',
    borderRadius: 10,
    background: 'var(--accent-bg)',
    borderLeft: '3px solid var(--accent)',
    fontSize: 'clamp(16px, 2vw, 19px)',
    lineHeight: '150%',
    color: 'var(--text-h)',
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

function Milestone({ period, title, body }) {
  return (
    <li style={styles.item}>
      <span style={styles.dot} aria-hidden="true" />
      <p style={styles.period}>{period}</p>
      <h3 style={styles.itemTitle}>{title}</h3>
      <p style={styles.itemBody}>{body}</p>
    </li>
  );
}

export default function About({ timeline = TIMELINE }) {
  return (
    <main style={styles.main}>
      <h1 style={styles.h1}>About</h1>

      <p style={styles.lede}>
        Estudio Ingeniería en Informática y me interesa el software que mira
        otro software: análisis estático, herramientas de desarrollo,
        automatización de seguridad.
      </p>

      <p style={styles.p}>
        Empecé la carrera viniendo de un secundario de Administración de
        Empresas, sin nada de base técnica. Esa desventaja inicial me dejó una
        costumbre que hoy es lo más útil que tengo: no doy por entendido nada
        que no pueda explicar. Cuando algo funciona pero no sé por qué, para mí
        todavía no está terminado.
      </p>

      <p style={styles.p}>
        Esa costumbre es la que me llevó al análisis estático. Mi proyecto final
        —GraphSAST— convierte el código en un grafo de flujo de datos para
        seguir el recorrido de una entrada no confiable hasta los puntos donde
        puede hacer daño. No inventé la técnica: existe en CodeQL, Semgrep y
        Joern. Lo que construí es la implementación propia y, sobre todo, la
        validación medible de que funciona.
      </p>

      <p style={styles.p}>
        En paralelo hice un curso de testing en a1qa: un mes probando webs y
        aplicaciones desde afuera. Las dos cosas se responden entre
        sí: el testing dinámico prueba el software mientras corre y busca
        errores de comportamiento; el análisis estático revisa la estructura del
        código antes de ejecutarlo. Persiguen lo mismo en momentos distintos del
        ciclo, y la disciplina de QA para escribir casos negativos —los que
        deberían dar seguro y a veces no dan— es lo que hace que el banco de
        pruebas de mi tesis valga algo.
      </p>

      <blockquote style={styles.pull}>
        Que una herramienta no encuentre nada puede significar dos cosas muy
        distintas. Saber cuál de las dos es, es todo el trabajo.
      </blockquote>

      <h2 style={styles.h2}>El recorrido</h2>
      <ol style={styles.timeline}>
        {timeline.map((item) => (
          <Milestone key={item.period + item.title} {...item} />
        ))}
      </ol>

      <p style={styles.footer}>
        Los proyectos donde se ve todo esto están en{' '}
        <Link to="/work" style={styles.link}>
          Work
        </Link>
        . Si querés charlar,{' '}
        <Link to="/contact" style={styles.link}>
          por acá
        </Link>
        .
      </p>
    </main>
  );
}
