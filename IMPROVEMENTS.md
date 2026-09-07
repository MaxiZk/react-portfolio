# Manual Corrections & Verification

## Factual Issues Corrected

### 1. a1qa Role Definition
**Issue:** Initial prompt assumed "QA Engineer at a1qa" was an employment role.
**Source:** GraphSAST_Proyecto.md §13: "QA es un curso que se está cursando, no un empleo."
**Fix:** Rewritten as "Curso de testing · a1qa · 2026 · 1 mes". All copy in past tense (course completed, not ongoing).

### 2. GraphSAST CWE Coverage
**Issue:** Initial prompt included "Path Traversal" as a detected vulnerability.
**Source:** ADR-4 in docs/arquitectura: "Path Traversal/SSRF (menos casos listos)" — descartado, no implementado.
**Fix:** Work.jsx now lists only the 3 real CWEs: SQL Injection (CWE-89), Command Injection (CWE-78), XSS (CWE-79).

### 3. GraphSAST Stack Mismatch
**Issue:** CV listed "Java / Python / Maven / MySQL"; code uses TypeScript/Neo4j/tree-sitter.
**Fix:** Updated CV before portfolio deployment. Portfolio now correctly reflects: "TypeScript, Neo4j, tree-sitter, Cytoscape.js".

### 4. Narrative Arc
**Issue:** About.jsx initially framed as "manual testing → automation" but evidence shows "thesis → security → QA in parallel".
**Fix:** Reframed About.jsx and Work.jsx case studies to match real chronology and causality.

## Technical Bugs Fixed

### 5. React Border Warning (All Pages)
**Issue:** Mixing shorthand `border` with `borderColor` in hover styles triggered React warnings + visual flicker.
**Files affected:** Home.jsx, Work.jsx, About.jsx, Contact.jsx, Status.jsx
**Fix:** Split to explicit `borderWidth`, `borderStyle`, `borderColor` in all 5 locations.

### 6. Email Typo (Contact.jsx)
**Issue:** Placeholder had wrong domain.
**Fix:** Corrected to maxizuidwijk@gmail.com (verified against CV).

## Verification Checklist
- ✅ All claims cross-checked against CV, GraphSAST docs, ADRs
- ✅ a1qa identified as 1-month completed course (not employment)
- ✅ GraphSAST CWE coverage matches catalog/ (3 real, Path Traversal excluded)
- ✅ Stack matches Sep 1 code, not August CV
- ✅ Metrics caveat included: "synthetic corpus, 14 cases, not production validation"
- ✅ Timeline dates verified against CV
- ✅ oxlint: 0, vite build: OK, no console errors
- ✅ All external links use rel="noreferrer noopener"
- ✅ GitHub API error handling (403 rate limit)
- ✅ AbortController prevents StrictMode warnings

## AI Assistance Summary
Claude generated initial component scaffolding for all 5 pages. All copy was fact-checked and rewritten where it conflicted with source material. No claims appear without evidence in GraphSAST docs, CV, or course completion records.
