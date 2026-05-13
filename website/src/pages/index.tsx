import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const TRUST_PILLS = [
  'Local-first',
  'Ethical prep only',
  'Mock mode — no API key',
  'OpenAI · Anthropic · Gemini',
  '9 tracks · 13 modes',
  'Rubric feedback',
  'Study plans',
  'MIT licensed',
];

const PIPELINE = [
  { num: '01', name: 'Choose Track' },
  { num: '02', name: 'Choose Mode' },
  { num: '03', name: 'Simulate' },
  { num: '04', name: 'Write Answer' },
  { num: '05', name: 'Get Feedback' },
  { num: '06', name: 'Improve Answer' },
  { num: '07', name: 'Study Plan' },
];

const PRACTICE_TYPES = [
  { title: 'Recruiter Screen', desc: 'Role fit, motivation, communication clarity' },
  { title: 'Behavioral', desc: 'STAR answers, leadership, ownership, failure/learning' },
  { title: 'Coding', desc: 'Problem-solving, complexity, edge cases, testing' },
  { title: 'System Design', desc: 'Architecture tradeoffs, scalability, reliability' },
  { title: 'Frontend Architecture', desc: 'Component design, state, performance, accessibility' },
  { title: 'Angular / React', desc: 'Framework-specific depth and patterns' },
  { title: 'AI Engineering', desc: 'Agents, RAG, tools, evaluations, safety' },
  { title: 'Project Deep-Dive', desc: 'Explaining your real work clearly and with impact' },
  { title: 'Debugging', desc: 'Root-cause analysis and structured thinking' },
  { title: 'Code Review', desc: 'Reviewing tradeoffs, risks, and maintainability' },
];

const TRACKS = [
  { icon: '🤖', name: 'AI Agentic Engineer', desc: 'Agents, RAG, tools, evals, orchestration' },
  { icon: '⚡', name: 'AI Frontend Engineer', desc: 'Frontend + AI product engineering' },
  { icon: '🅰️', name: 'Angular Developer', desc: 'Signals, RxJS, change detection, DI' },
  { icon: '⚛️', name: 'React Developer', desc: 'Hooks, state, performance, RSC' },
  { icon: '🏗️', name: 'Senior Frontend', desc: 'Architecture, leadership, platform' },
  { icon: '🌱', name: 'Junior Frontend', desc: 'Fundamentals and growth mindset' },
  { icon: '🔧', name: 'Fullstack Developer', desc: 'Frontend + backend + deployment' },
  { icon: '📢', name: 'DevRel Engineer', desc: 'Communication, demos, community' },
  { icon: '👔', name: 'Engineering Manager', desc: 'Leadership, process, people' },
];

const MODES = [
  { icon: '💬', name: 'Behavioral', desc: 'STAR answers' },
  { icon: '💻', name: 'Coding', desc: 'Problem solving' },
  { icon: '🏛️', name: 'System Design', desc: 'Architecture' },
  { icon: '🖥️', name: 'Frontend Arch', desc: 'Component design' },
  { icon: '🅰️', name: 'Angular', desc: 'Framework depth' },
  { icon: '⚛️', name: 'React', desc: 'Framework depth' },
  { icon: '📋', name: 'Project Deep-Dive', desc: 'Past work' },
  { icon: '🔍', name: 'Debugging', desc: 'Root cause' },
  { icon: '📝', name: 'Code Review', desc: 'Tradeoffs' },
  { icon: '🤖', name: 'AI Engineering', desc: 'Agents & tools' },
  { icon: '📦', name: 'Take-Home', desc: 'Review prep' },
  { icon: '❓', name: 'Candidate Qs', desc: 'Ask the interviewer' },
];

const PROVIDERS = [
  {
    name: 'Mock',
    env: 'INTERVIEWOPS_PROVIDER=mock',
    desc: 'No API key required. Perfect for local practice, demos, and CI.',
  },
  {
    name: 'OpenAI',
    env: 'INTERVIEWOPS_PROVIDER=openai',
    desc: 'Flexible interview simulation and detailed feedback.',
  },
  {
    name: 'Anthropic',
    env: 'INTERVIEWOPS_PROVIDER=anthropic',
    desc: 'Strong structured feedback and answer improvement.',
  },
  {
    name: 'Gemini',
    env: 'INTERVIEWOPS_PROVIDER=gemini',
    desc: 'Fast, cost-effective interview practice.',
  },
];

const BUILT_FOR = [
  'Frontend developers',
  'AI engineers',
  'Angular developers',
  'React developers',
  'Senior engineers',
  'Junior developers',
  'Job seekers',
  'Career switchers',
  'DevRel candidates',
  'Engineering managers',
  'Fullstack engineers',
  'Open-source contributors',
];

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>

      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.heroBadge}>
          v0.1.0 · Local-first · MIT · Ethical interview practice
        </div>
        <h1 className={styles.heroTitle}>InterviewOps</h1>
        <p className={styles.heroTagline}>{siteConfig.tagline}</p>
        <p className={styles.heroSub}>
          A local-first AI interview practice CLI for developers. Simulate interviews, answer
          questions, get rubric-based feedback, generate improved answers, and build focused
          study plans — all from your terminal.
        </p>
        <div className={styles.heroCta}>
          <Link className={styles.ctaPrimary} to="/docs/quick-start">
            Run it now →
          </Link>
          <Link className={styles.ctaSecondary} to="/docs/introduction">
            Read the docs
          </Link>
          <Link
            className={styles.ctaSecondary}
            href="https://github.com/AnkitParekh007/interview-ops"
          >
            ⭐ GitHub
          </Link>
        </div>
        <p className={styles.heroTrustLine}>
          No live-interview cheating. No hidden overlays. No account required.
          Mock mode works without API keys.
        </p>
      </header>

      {/* Trust Strip */}
      <div className={styles.trustStrip}>
        <div className={styles.trustPills}>
          {TRUST_PILLS.map((pill) => (
            <span key={pill} className={styles.trustPill}>{pill}</span>
          ))}
        </div>
      </div>

      {/* Terminal Quick-Start */}
      <section className={styles.section} style={{ textAlign: 'center' }}>
        <p className={styles.sectionLabel}>Quick Start</p>
        <h2 className={styles.sectionTitle}>Up and running in 30 seconds</h2>
        <p className={styles.sectionDesc} style={{ margin: '0 auto 2rem' }}>
          No account. No server. Mock mode works with zero API keys.
        </p>
        <div className={styles.terminalWrap}>
          <div className={styles.terminalBar}>
            <span className={`${styles.dot} ${styles.dotRed}`} />
            <span className={`${styles.dot} ${styles.dotYellow}`} />
            <span className={`${styles.dot} ${styles.dotGreen}`} />
            <span className={styles.terminalTitle}>~ interview-ops</span>
          </div>
          <div className={styles.terminalBody}>
            {[
              'git clone https://github.com/AnkitParekh007/interview-ops.git',
              'cd interview-ops',
              'npm install',
              'cp .env.example .env',
              'npm run demo',
            ].map((cmd) => (
              <div key={cmd} className={styles.terminalLine}>
                <span className={styles.prompt}>$</span>
                <span className={styles.cmd}>{cmd}</span>
              </div>
            ))}
            <div className={styles.terminalOutput}>
              <div className={styles.terminalLine}>
                <span className={styles.outputOk}>  OK </span>
                <span className={styles.cmd}>provider: mock</span>
              </div>
              <div className={styles.terminalLine}>
                <span className={styles.outputOk}>  OK </span>
                <span className={styles.cmd}>track: senior-frontend</span>
              </div>
              <div className={styles.terminalLine}>
                <span className={styles.outputOk}>  OK </span>
                <span className={styles.cmd}>mode: behavioral</span>
              </div>
              <div className={styles.terminalLine}>
                <span className={styles.outputCheck}>  ✓  </span>
                <span className={styles.cmd}>Mock interview generated</span>
              </div>
              <div className={styles.terminalLine}>
                <span className={styles.outputCheck}>  ✓  </span>
                <span className={styles.cmd}>Feedback report created</span>
              </div>
              <div className={styles.terminalLine}>
                <span className={styles.outputCheck}>  ✓  </span>
                <span className={styles.cmd}>Study plan created</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <div className={styles.sectionAlt}>
        <section className={styles.section} style={{ textAlign: 'center' }}>
          <p className={styles.sectionLabel}>How it works</p>
          <h2 className={styles.sectionTitle}>The interview practice pipeline</h2>
          <p className={styles.sectionDesc} style={{ margin: '0 auto 2.5rem' }}>
            From track selection to a complete study plan — in one command.
          </p>
          <div className={styles.pipeline}>
            {PIPELINE.map((step, i) => (
              <React.Fragment key={step.num}>
                <div className={styles.pipelineStep}>
                  <div className={styles.pipelineBox}>
                    <div className={styles.pipelineNum}>{step.num}</div>
                    <div className={styles.pipelineName}>{step.name}</div>
                  </div>
                </div>
                {i < PIPELINE.length - 1 && (
                  <span className={styles.pipelineArrow}>→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>
      </div>

      {/* What you can practice */}
      <section className={styles.section}>
        <p className={styles.sectionLabel}>Practice</p>
        <h2 className={styles.sectionTitle}>What you can practice</h2>
        <div className={styles.practiceGrid}>
          {PRACTICE_TYPES.map((p) => (
            <div key={p.title} className={styles.practiceCard}>
              <div className={styles.practiceCardTitle}>{p.title}</div>
              <div className={styles.practiceCardDesc}>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tracks */}
      <div className={styles.sectionAlt}>
        <section className={styles.section}>
          <p className={styles.sectionLabel}>Tracks</p>
          <h2 className={styles.sectionTitle}>Role-based interview tracks</h2>
          <p className={styles.sectionDesc}>
            9 tracks calibrated to real roles and seniority levels.
          </p>
          <div className={styles.cardGrid}>
            {TRACKS.map((t) => (
              <div key={t.name} className={styles.card}>
                <div className={styles.cardIcon}>{t.icon}</div>
                <div className={styles.cardName}>{t.name}</div>
                <div className={styles.cardDesc}>{t.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <Link className={styles.ctaSecondary} to="/docs/tracks">
              View all tracks →
            </Link>
          </div>
        </section>
      </div>

      {/* Modes */}
      <section className={styles.section}>
        <p className={styles.sectionLabel}>Modes</p>
        <h2 className={styles.sectionTitle}>Every interview type covered</h2>
        <p className={styles.sectionDesc}>
          13 interview modes from recruiter screens to AI engineering deep-dives.
        </p>
        <div className={styles.cardGrid}>
          {MODES.map((m) => (
            <div key={m.name} className={styles.card}>
              <div className={styles.cardIcon}>{m.icon}</div>
              <div className={styles.cardName}>{m.name}</div>
              <div className={styles.cardDesc}>{m.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <Link className={styles.ctaSecondary} to="/docs/modes">
            View all modes →
          </Link>
        </div>
      </section>

      {/* Rubric feedback */}
      <div className={styles.sectionAlt}>
        <section className={styles.section}>
          <p className={styles.sectionLabel}>Rubrics</p>
          <h2 className={styles.sectionTitle}>Feedback based on real interview rubrics</h2>
          <p className={styles.sectionDesc}>
            InterviewOps does not only generate questions. It reviews answers using structured
            rubrics for clarity, correctness, depth, communication, seniority signals,
            tradeoffs, and role fit.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1.5rem' }}>
            {[
              'Clarity',
              'Correctness',
              'Depth',
              'Tradeoffs',
              'Communication',
              'Seniority signal',
              'Role fit',
              'Specificity',
              'Improvement plan',
            ].map((dim) => (
              <span key={dim} className={styles.trustPill}>{dim}</span>
            ))}
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <Link className={styles.ctaSecondary} to="/docs/rubrics">
              View rubric details →
            </Link>
          </div>
        </section>
      </div>

      {/* Ethics */}
      <section className={styles.section}>
        <p className={styles.sectionLabel}>Ethics</p>
        <h2 className={styles.sectionTitle}>Built for ethical interview preparation</h2>
        <p className={styles.sectionDesc}>
          InterviewOps is for practice before interviews — not secret help during live interviews.
        </p>
        <div className={styles.ethicsBox}>
          <div className={`${styles.ethicsCard} ${styles.ethicsCardAllowed}`}>
            <div className={styles.ethicsCardTitle}>Allowed</div>
            <ul className={styles.ethicsList}>
              {[
                'Mock interview practice',
                'Improving prepared answers',
                'Study plans and rubric review',
                'Role-specific feedback',
                'Practicing communication clarity',
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={`${styles.ethicsCard} ${styles.ethicsCardBlocked}`}>
            <div className={styles.ethicsCardTitle}>Not allowed</div>
            <ul className={styles.ethicsList}>
              {[
                'Hidden live interview assistance',
                'Real-time answer injection',
                'Screen-share evasion',
                'Impersonation of skills',
                'Violating interview policies',
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <Link className={styles.ctaSecondary} to="/docs/ethics">
            Read the ethics policy →
          </Link>
        </div>
      </section>

      {/* Providers */}
      <div className={styles.sectionAlt}>
        <section className={styles.section}>
          <p className={styles.sectionLabel}>Providers</p>
          <h2 className={styles.sectionTitle}>Bring your own model</h2>
          <p className={styles.sectionDesc}>
            Start with mock. Switch to your preferred AI provider when you're ready.
          </p>
          <div className={styles.providerGrid}>
            {PROVIDERS.map((p) => (
              <div key={p.name} className={styles.providerCard}>
                <div className={styles.providerName}>{p.name}</div>
                <code className={styles.providerEnv}>{p.env}</code>
                <div className={styles.providerDesc}>{p.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <Link className={styles.ctaSecondary} to="/docs/providers">
              View provider setup →
            </Link>
          </div>
        </section>
      </div>

      {/* Output preview */}
      <section className={styles.section}>
        <p className={styles.sectionLabel}>Outputs</p>
        <h2 className={styles.sectionTitle}>Complete session packet, every run</h2>
        <p className={styles.sectionDesc}>
          Every simulation writes a full session directory with questions, scorecard,
          feedback, improved answers, study plan, and an ethics notice.
        </p>
        <div className={styles.outputPreview}>
          <div className={styles.fileTree}>
            <div className={styles.fileTreeDir}>output/sessions/</div>
            <div className={styles.fileTreeDir}>  2026-05-13-senior-frontend-behavioral/</div>
            <div className={styles.fileTreeFile}>    ├── session.md</div>
            <div className={styles.fileTreeFile}>    ├── questions.md</div>
            <div className={styles.fileTreeFile}>    ├── scorecard.md</div>
            <div className={styles.fileTreeFile}>    ├── feedback.md</div>
            <div className={styles.fileTreeFile}>    ├── improved-answers.md</div>
            <div className={styles.fileTreeFile}>    ├── study-plan.md</div>
            <div className={styles.fileTreeFile}>    ├── ethics-notice.md</div>
            <div className={styles.fileTreeFile}>    └── metadata.json</div>
          </div>
          <div className={styles.previewCard}>
            <div className={styles.previewHeading}># Behavioral Interview Practice</div>
            <div className={styles.previewHeading}>## Question</div>
            <div>Tell me about a time you improved frontend performance.</div>
            <div className={styles.previewHeading}>## Feedback</div>
            <div className={styles.previewItem}>· Strong situation context</div>
            <div className={styles.previewItem}>· Add clearer business impact</div>
            <div className={styles.previewItem}>· Quantify before/after results</div>
            <div className={styles.previewItem}>· Explain technical tradeoffs</div>
            <div className={styles.previewHeading}>## Improved Answer</div>
            <div>Use STAR format. Include measurable before/after impact.</div>
          </div>
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <Link className={styles.ctaSecondary} to="/docs/output-structure">
            View output structure →
          </Link>
        </div>
      </section>

      {/* Built for */}
      <div className={styles.sectionAlt}>
        <section className={styles.section}>
          <p className={styles.sectionLabel}>Audience</p>
          <h2 className={styles.sectionTitle}>Built for developers at every stage</h2>
          <div className={styles.builtForGrid}>
            {BUILT_FOR.map((role) => (
              <span key={role} className={styles.builtForPill}>{role}</span>
            ))}
          </div>
        </section>
      </div>

      {/* Contributor CTA */}
      <div className={styles.contributorCta}>
        <h2>Fork it. Improve it. Make it yours.</h2>
        <p>
          Add a track. Add a mode. Add a provider. Improve the rubrics.
          InterviewOps is open-source and contributor-friendly.
        </p>
        <div className={styles.btnGroup}>
          <Link
            className={styles.ctaSecondary}
            href="https://github.com/AnkitParekh007/interview-ops/labels/good%20first%20issue"
          >
            Good first issues
          </Link>
          <Link className={styles.ctaSecondary} to="/docs/contributing">
            Contributing guide
          </Link>
          <Link
            className={styles.ctaSecondary}
            href="https://github.com/AnkitParekh007/interview-ops"
          >
            GitHub repo
          </Link>
        </div>
      </div>

      {/* Star CTA */}
      <div className={styles.starCta}>
        <h2 className={styles.starCtaTitle}>
          ⭐ If InterviewOps helps you practice better
        </h2>
        <p className={styles.starCtaDesc}>
          Star the repo so more developers can discover it.
        </p>
        <Link
          className={styles.ctaPrimary}
          href="https://github.com/AnkitParekh007/interview-ops"
        >
          Star on GitHub →
        </Link>
      </div>

    </Layout>
  );
}
