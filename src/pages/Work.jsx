import { useState } from 'react';
import { Link } from 'react-router-dom';

// Datos tomados de docs/arquitectura, docs/validacion y GraphSAST_Proyecto.md (Tesis).
// TODO(QA): sumar las técnicas concretas del curso (p. ej. BVA / partición de equivalencias) si las querés listar.
const CASE_STUDIES = [
  {
    id: 'graphsast',
    title: 'GraphSAST',
    role: 'Proyecto Final de Ingeniería · USAL',
    period: '2026 — en curso',
    summary:
      'Analizador estático que compila una aplicación TS/JS en un grafo de flujo de datos y detecta vulnerabilidades buscando caminos source → sink que no pasen por un sanitizer.',
    stack: [
      'TypeScript',
      'tree-sitter',
      'Neo4j / Cypher',
      'Cytoscape.js',
      'Vitest',
    ],
    problem:
      'Muchas fallas de seguridad no están en una línea suelta sino en cómo circula la información: un dato entra por un formulario, atraviesa varias funciones y módulos, y termina en una consulta a la base de datos sin haber sido validado. Las herramientas que buscan patrones de texto no ven ese recorrido y, cuando alertan, no muestran el camino completo. La necesidad se validó con un caso real: un desarrollador describió una aplicación con el conexionado interno tan enredado que el equipo nunca sabía hacia dónde iba el flujo de datos.',
    approach:
      'Está armado como un pipeline de compilador que, en vez de emitir código, produce un grafo de propiedades consultable: tree-sitter genera el AST, una IR propia lo normaliza, y sobre ella se construyen el call graph y el grafo de flujo de datos. Ese grafo se persiste en Neo4j y el motor lo consulta con una plantilla Cypher acotada a profundidad 15, que descarta todo camino donde algún nodo tenga una arista SANITIZED_BY. Detectar una vulnerabilidad se reduce así a un problema de alcanzabilidad en un grafo dirigido. Los sources, sinks y sanitizers viven en un catálogo JSON externo: sumar un patrón nuevo es agregar datos, no tocar código.',
    outcome:
      'Cubre la tríada canónica de taint: CWE-89 (SQL Injection), CWE-78 (OS Command Injection) y CWE-79 (XSS). Sobre un banco de 14 casos etiquetados —10 vulnerables, 4 seguros— clasifica los 14 correctamente: 10 TP, 4 TN, 0 falsos positivos y 0 falsos negativos, en unos 43 ms totales (~0,68 ms por línea). Es un corpus sintético de un solo archivo, diseñado para el alcance actual del motor: valida el analizador contra ground-truth conocido y corre como test de regresión, pero no mide todavía la seguridad de aplicaciones reales en producción. La validación sobre proyectos open source con vulnerabilidades documentadas queda como siguiente etapa.',
  },
  {
    id: 'qa-testing',
    title: 'QA Testing — a1qa',
    role: 'Curso de testing · a1qa',
    period: '2026 · 1 mes',
    summary:
      'Curso intensivo de un mes en testing de sitios web y aplicaciones: el complemento dinámico del análisis estático que construyo en GraphSAST.',
    stack: ['Testing web', 'Testing de aplicaciones', 'Diseño de casos', 'Reporte de bugs'],
    problem:
      'Trabajar en una herramienta de seguridad me dejó una pregunta incómoda: puedo demostrar que un camino de datos es peligroso en el grafo, pero eso no dice nada sobre cómo se comporta el sistema cuando efectivamente corre. El análisis estático mira la estructura del código antes de ejecutarlo; hay una clase entera de errores que solo aparece del otro lado.',
    approach:
      'Hice el curso de a1qa en paralelo a la tesis, en vez de aprender testing por ósmosis mientras escribía el analizador. Un mes probando sitios web y aplicaciones desde afuera, que es exactamente el ángulo que el análisis estático no tiene. Las dos miradas persiguen lo mismo —software más confiable— en momentos distintos del ciclo: el testing dinámico prueba el software mientras se ejecuta y busca errores de comportamiento; el análisis estático revisa el código antes y detecta riesgos en su estructura.',
    outcome:
      'El aporte más concreto volvió al proyecto: el banco de pruebas de GraphSAST está armado con criterio de QA, no de desarrollo. Cada caso del corpus tiene su etiqueta ground-truth explícita y su criterio de acierto definido de antemano, incluidos los casos negativos que un desarrollador tiende a no escribir: el sink que recibe un literal, el dato que sí pasa por un sanitizer, el parámetro que parece un source y no lo es.',
  },
];

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
    maxWidth: '58ch',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(24px, 4vw, 40px)',
    marginTop: 'clamp(40px, 6vw, 64px)',
  },
  article: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'var(--border)',
    borderRadius: 12,
    padding: 'clamp(20px, 4vw, 36px)',
    transition: 'box-shadow 0.3s, border-color 0.3s',
  },
  articleHover: {
    boxShadow: 'var(--shadow)',
    borderColor: 'var(--accent-border)',
  },
  meta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px 12px',
    fontFamily: 'var(--mono)',
    fontSize: 14,
    color: 'var(--text)',
    margin: 0,
  },
  h2: {
    fontFamily: 'var(--heading)',
    fontWeight: 500,
    fontSize: 'clamp(22px, 3vw, 30px)',
    lineHeight: '118%',
    letterSpacing: '-0.5px',
    color: 'var(--text-h)',
    margin: '10px 0 0',
  },
  summary: {
    fontSize: 'clamp(15px, 1.8vw, 18px)',
    lineHeight: '155%',
    color: 'var(--text)',
    margin: '12px 0 0',
  },
  tags: {
    listStyle: 'none',
    padding: 0,
    margin: '20px 0 0',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    fontFamily: 'var(--mono)',
    fontSize: 13,
    lineHeight: 1,
    padding: '6px 10px',
    borderRadius: 4,
    background: 'var(--code-bg)',
    color: 'var(--text-h)',
  },
  toggle: {
    fontFamily: 'var(--mono)',
    fontSize: 14,
    marginTop: 20,
    padding: 0,
    border: 'none',
    background: 'none',
    color: 'var(--accent)',
    cursor: 'pointer',
  },
  details: {
    marginTop: 24,
    paddingTop: 24,
    borderTop: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  blockLabel: {
    fontFamily: 'var(--mono)',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--accent)',
    margin: 0,
  },
  blockBody: {
    fontSize: 'clamp(15px, 1.8vw, 17px)',
    lineHeight: '160%',
    color: 'var(--text)',
    margin: '6px 0 0',
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

function Block({ label, children }) {
  return (
    <div>
      <p style={styles.blockLabel}>{label}</p>
      <p style={styles.blockBody}>{children}</p>
    </div>
  );
}

function CaseStudy({ study, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const [hovered, setHovered] = useState(false);
  const panelId = `${study.id}-details`;

  return (
    <article
      style={hovered ? { ...styles.article, ...styles.articleHover } : styles.article}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p style={styles.meta}>
        <span>{study.role}</span>
        <span aria-hidden="true">·</span>
        <span>{study.period}</span>
      </p>

      <h2 style={styles.h2}>{study.title}</h2>
      <p style={styles.summary}>{study.summary}</p>

      <ul style={styles.tags}>
        {study.stack.map((item) => (
          <li key={item} style={styles.tag}>
            {item}
          </li>
        ))}
      </ul>

      <button
        type="button"
        style={styles.toggle}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        {open ? '− Ocultar detalle' : '+ Leer el caso completo'}
      </button>

      {open && (
        <div id={panelId} style={styles.details}>
          <Block label="Problema">{study.problem}</Block>
          <Block label="Enfoque">{study.approach}</Block>
          <Block label="Resultado">{study.outcome}</Block>
        </div>
      )}
    </article>
  );
}

export default function Work({ studies = CASE_STUDIES }) {
  return (
    <main style={styles.main}>
      <h1 style={styles.h1}>Work</h1>
      <p style={styles.lede}>
        Una herramienta que analiza código para encontrar vulnerabilidades, y
        el curso de testing que me enseñó a validarla. Dos formas de hacer la
        misma pregunta: ¿cómo se rompe esto?
      </p>

      <div style={styles.list}>
        {studies.map((study, i) => (
          <CaseStudy key={study.id} study={study} defaultOpen={i === 0} />
        ))}
      </div>

      <p style={styles.footer}>
        ¿Querés el detalle técnico de alguno?{' '}
        <Link to="/contact" style={styles.link}>
          Escribime
        </Link>{' '}
        o mirá el código en{' '}
        <Link to="/status" style={styles.link}>
          mi actividad de GitHub
        </Link>
        .
      </p>
    </main>
  );
}
