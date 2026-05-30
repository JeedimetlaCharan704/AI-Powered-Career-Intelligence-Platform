# SkillPilot AI

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://skillpilot.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![HTML5](https://img.shields.io/badge/HTML-E34F26?logo=html5&logoColor=fff)
![CSS3](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=fff)
![JavaScript](https://img.shields.io/badge/JS-F7DF1E?logo=javascript&logoColor=000)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=fff)

**SkillPilot AI** is a career intelligence platform that analyzes resumes, predicts placement readiness, identifies skill gaps, generates learning roadmaps, evaluates GitHub activity, builds developer portfolios, and provides mentor analytics dashboards — all through explainable scoring algorithms and interactive visualizations.

> No AI smoke and mirrors. Every score traces to weighted factors with documented formulas.

---

## Architecture

```
skillpilot-ai/
├── index.html               # Dashboard — KPI cards, charts, insights
├── login.html               # Role-based login (Student / Mentor / Recruiter)
├── resume-analyzer.html     # 5-dimension resume scoring + keyword analysis
├── skill-gap-analyzer.html  # Career comparison, priority matrix, what-if mode
├── placement-predictor.html # 7-factor placement model + salary estimator
├── profile.html             # Profile Intelligence Hub — single source of truth
├── github-analytics.html    # 3-mode GitHub repo quality analysis
├── portfolio-builder.html   # 4-theme production-ready portfolio generator
├── mentor-dashboard.html    # Cohort analytics, risk detection, bulk actions
├── css/
│   ├── variables.css        # 97 CSS custom properties, light + dark themes
│   └── pages/               # Page-specific styles (9 pages)
├── js/
│   ├── store/store.js       # Reactive state with pub/sub + localStorage
│   ├── services/            # 13 deterministic scoring services
│   ├── pages/               # Page controllers (one per page)
│   ├── components/          # Toast, Skeleton, Error Boundary, Session
│   ├── data/                # Skills DB (102), career paths, companies, badges
│   └── utils/               # KPI factory, route guard
├── docs/
│   ├── ARCHITECTURE.md      # System design & data flow
│   ├── ALGORITHMS.md        # All scoring formulas documented
│   └── BACKEND-ROADMAP.md   # Express/MongoDB migration plan
└── vercel.json              # Deployment config
```

## Features

### 🔬 Resume Analyzer
5-dimension scoring (skills, experience, education, projects, certifications) with keyword matching against a 102-skill database, section-level breakdown, recruiter insights, career comparison, and PDF/JSON/Markdown exports.

### 📊 Skill Gap Analyzer
Compare your skills against 10 career paths. Interactive what-if mode instantly recalculates match scores when you add/remove skills. Priority matrix, learning time estimates, daily/weekly/monthly timelines, and ranked action plans.

### 🎯 Placement Predictor
7-factor weighted model (CGPA, skills, projects, internships, certifications, resume, GitHub) with 5-tier classification, salary estimation (entry/likely/stretch), company matching against 35 companies, scenario simulator, and recruiter view.

### 👤 Profile Intelligence Hub
Single source of truth for all user data. 8-factor strength scoring, 3 CRUD modals (projects, certifications, internships), learning history timeline, badge system with conditions, and multi-format exports.

### 💻 GitHub Analytics
3 data modes: Demo (instant rich data), Live API (real GitHub fetch), Fallback (graceful degradation). Per-repo quality scoring (6 factors), developer maturity model (5 factors), tech category analysis, and recruiter-ready summaries.

### 🎨 Portfolio Builder
Generate production-ready HTML portfolios in 4 themes (Modern SaaS, Developer Minimal, Data Scientist, Dark Professional). Real-time preview via sandboxed iframe, health scoring, quality issue detection, and improvement recommendations.

### 🧑‍🏫 Mentor Dashboard
Manage a cohort of students with risk detection (8 risk types), cohort analytics (4 distributions), top talent identification, mentor insights, and bulk actions (learning plans, certifications, projects). Export to JSON/MD/CSV/PDF.

## Quick Start

1. **Clone and serve**
   ```bash
   git clone https://github.com/<your-org>/skillpilot-ai.git
   cd skillpilot-ai
   npx serve .           # or any static file server
   ```

2. **Open in browser**
   ```
   http://localhost:3000/login.html
   ```

3. **Demo credentials**
   | Role      | Email                          | Password |
   |-----------|--------------------------------|----------|
   | Student   | student@skillpilot.ai          | demo123  |
   | Mentor    | mentor@skillpilot.ai           | demo123  |
   | Recruiter | recruiter@skillpilot.ai        | demo123  |

## Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel --prod
```

Or connect your GitHub repository to [vercel.com/import](https://vercel.com/import) for automatic deployments on every push.

### GitHub Pages

Push to `main` branch and enable GitHub Pages from the repo settings (root directory, no build step required).

## Scoring Methodology

All scores are **deterministic** and **explainable** — no black-box models. Each metric returns:

```js
{ value, confidence, trend, explanation, suggestions, factors }
```

- **value** — the calculated score (0–100)
- **confidence** — data quality indicator
- **trend** — direction of change (up/down/stable)
- **explanation** — human-readable summary
- **suggestions** — actionable improvements ranked by impact
- **factors** — raw inputs with individual contributions

See [`docs/ALGORITHMS.md`](docs/ALGORITHMS.md) for detailed formulas.

## Design System

- **97 CSS custom properties** organized into color, spacing, typography, and elevation categories
- **Full dark mode** with 3-state toggle (light / dark / system) and live `prefers-color-scheme` listener
- **Glassmorphism** UI with backdrop blur and subtle borders
- **Responsive** layout targeting 320px–1920px viewports
- **Skeleton loading** states for all async content

## License

MIT — see [LICENSE](LICENSE) for details.
