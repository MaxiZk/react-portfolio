# AI Prompts Used — React Portfolio (FE-05)

## Overview
This portfolio was built with Claude as an AI assistant for code generation. All pages were manually implemented and verified against source material (CV, GraphSAST docs, a1qa course completion).

## Prompts Used

### 1. Initial Setup (Vite + React Router)
**Prompt:** "Create a React 18 + Vite project with React Router for a professional portfolio. Routes: /, /work, /about, /contact, /status. Use CSS variables from index.css, no Tailwind."
**Response:** Vite scaffolding, Router structure, stub pages.

### 2. Home.jsx
**Prompt:** "Create Home.jsx with engineering claim, short bio, 'Get in touch' CTA button linking to /contact. Use clamp() for responsive typography, CSS variables (--accent, --text-h, --bg). Inline styles only."
**Response:** Component with claim, bio, Link to /contact, hover state.
**Manual fix:** Claim was initially in Spanish; corrected to English.

### 3. Work.jsx
**Prompt:** "Create Work.jsx with 2 case studies: (1) System Graph SAST — TypeScript/Neo4j, detects SQL Injection/Command Injection/XSS. (2) QA Testing — a1qa 1-month course testing web apps. Each case expands via aria-expanded. First opens by default. Use CaseStudy component with props."
**Response:** Collapsible case studies with proper a11y attributes.

### 4. About.jsx
**Prompt:** "Create About.jsx with narrative arc: thesis on static analysis → security tooling → QA testing in parallel. Include 3-milestone timeline (2020 USAL, 2023–2024 Data Science/Full Stack, 2026 GraphSAST/QA/FlyRank). Use Milestone component."
**Response:** Prose + timeline component.

### 5. Contact.jsx
**Prompt:** "Create Contact.jsx with email (maxizuidwijk@gmail.com, copy-to-clipboard with fallback to mailto), LinkedIn, GitHub. All as rows with icons. Handle clipboard API failure gracefully."
**Response:** Channel list with copy button and error fallback.

### 6. Status.jsx
**Prompt:** "Create Status.jsx. useEffect fetches https://api.github.com/users/MaxiZk and repos. Display public_repos, followers, following. Handle loading (skeleton), ready, and 403 error states. Use AbortController to avoid StrictMode warnings."
**Response:** Data-fetching component with proper state management.

## Manual Work
- All components written directly (no copy-paste)
- Verified component structure against React Router conventions
- Tested build (oxlint: 0, vite build: OK)
- Fixed border-shorthand React warning in all 5 pages
- Fact-checked all claims against source docs
