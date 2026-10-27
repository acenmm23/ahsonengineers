import { useEffect, useState } from 'react'
import { featured, projects, capabilities, contact } from './projects.js'

const SHEETS = [
  { id: 'top', label: 'Index' },
  { id: 'work', label: 'Work' },
  { id: 'approach', label: 'Approach' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

const pad = (n) => String(n).padStart(2, '0')

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-in'))
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      }),
      { rootMargin: '0px 0px -8% 0px' }
    )
    items.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in')
      else io.observe(el)
    })
    return () => io.disconnect()
  }, [])
}

function useActiveSheet() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setActive(SHEETS.findIndex((s) => s.id === e.target.id))
      }),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    SHEETS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
    })
    // The last section is short, so it never reaches the middle band on tall screens.
    const atBottom = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) setActive(SHEETS.length - 1)
    }
    window.addEventListener('scroll', atBottom, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', atBottom)
    }
  }, [])
  return active
}

function Mark({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 120" aria-hidden="true">
      <g fill="currentColor">
        <path d="M0 63 50 0l50 63H73L50 31 27 63Z" />
        <rect y="67" width="100" height="12" />
        <rect y="83" width="15" height="36" />
        <rect x="42.5" y="83" width="15" height="26" />
        <rect x="85" y="83" width="15" height="36" />
      </g>
    </svg>
  )
}

function Header({ active }) {
  const sheet = SHEETS[active] ?? SHEETS[0]
  return (
    <header className="header">
      <div className="shell header-inner">
        <a href="#top" className="header-brand" aria-label="Ahson Momin, back to top">
          <Mark className="header-mark" />
          <span>Ahson Momin</span>
        </a>
        <nav className="header-nav" aria-label="Sections">
          {SHEETS.slice(1).map((s, i) => (
            <a key={s.id} href={`#${s.id}`} className={active === i + 1 ? 'is-active' : undefined}>{s.label}</a>
          ))}
        </nav>
        <div className="header-sheet mono" aria-hidden="true">
          <span>Sheet</span>
          <strong>{pad(active + 1)}</strong>
          <span>/ {pad(SHEETS.length)}</span>
          <em>{sheet.label}</em>
        </div>
      </div>
    </header>
  )
}

function MonogramDrawing() {
  return (
    <svg className="drawing" viewBox="0 0 200 214" role="img" aria-label="Line drawing of the AM monogram with dimensions">
      <defs>
        <pattern id="hatch" width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="3.2" className="hatch-line" />
        </pattern>
      </defs>

      <line className="d-center" x1="100" y1="26" x2="100" y2="170" />

      <g transform="translate(50 40)">
        <path className="d-solid" d="M0 63 50 0l50 63H73L50 31 27 63Z" />
        <path className="d-hatch" d="M0 67h100v12H0ZM0 83h15v36H0ZM42.5 83h15v26h-15ZM85 83h15v36H85Z" />
        <path className="d-stroke s1" pathLength="1" d="M0 63 50 0l50 63H73L50 31 27 63Z" />
        <path className="d-stroke s2" pathLength="1" d="M0 67h100v12H0Z" />
        <path className="d-stroke s3" pathLength="1" d="M0 83h15v36H0Z" />
        <path className="d-stroke s4" pathLength="1" d="M42.5 83h15v26h-15Z" />
        <path className="d-stroke s5" pathLength="1" d="M85 83h15v36H85Z" />
      </g>

      <g className="d-dims">
        <path d="M50 164v18M150 164v18M50 178h100" />
        <path d="M50 178l5-2v4ZM150 178l-5-2v4Z" className="d-arrow" />
        <text x="100" y="175" textAnchor="middle">100.0</text>

        <path d="M44 40H22M44 159H22M28 40v119" />
        <path d="M28 40l-2 5h4ZM28 159l-2-5h4Z" className="d-arrow" />
        <text x="24" y="100" textAnchor="middle" transform="rotate(-90 24 100)">119.0</text>

        <path d="M89 54a14 14 0 0 0 22 0" />
        <path d="M111 54 156 18h30" />
        <text x="158" y="15">76.9°</text>
      </g>

      <g className="d-title">
        <path d="M118 194h82M118 194v20M164 194v20" />
        <text x="121" y="202">AM-00</text>
        <text x="121" y="210">MONOGRAM</text>
        <text x="167" y="202">SCALE 1:1</text>
        <text x="167" y="210">REV C</text>
      </g>
    </svg>
  )
}

function Hero() {
  return (
    <section className="hero shell" id="top">
      <div className="hero-meta mono" data-reveal>
        <span>Electrical engineering / Hardware / Product</span>
        <span>Santa Cruz, California</span>
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <h1 className="hero-name" data-reveal>Ahson<br />Momin</h1>
          <p className="hero-statement" data-reveal>
            I design and build hardware products end to end. Circuits, enclosures, CAD, and the
            decisions that hold them together.
          </p>
        </div>
        <div className="hero-figure" data-reveal>
          <MonogramDrawing />
        </div>
      </div>

      <dl className="hero-spec" data-reveal>
        <div><dt className="mono">Currently</dt><dd>Building <a href="#work">theBetterKey</a></dd></div>
        <div><dt className="mono">Discipline</dt><dd>Electrical engineering</dd></div>
        <div><dt className="mono">Works in</dt><dd>Electronics, CAD, product</dd></div>
        <div><dt className="mono">Contact</dt><dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd></div>
      </dl>

      <div className="ruler" aria-hidden="true" />
    </section>
  )
}

function SectionHead({ index, label, title, children }) {
  return (
    <div className="section-head" data-reveal>
      <span className="mono section-index">{pad(index)} &mdash; {label}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  )
}

function Featured() {
  const f = featured
  return (
    <article className="featured" data-reveal>
      <div className="featured-plate">
        <span className="corner tl" /><span className="corner tr" /><span className="corner bl" /><span className="corner br" />
        <span className="mono plate-label">{f.no} / The key</span>
        <img src={f.image} alt={f.imageAlt} />
      </div>

      <div className="featured-body">
        <div className="featured-tags mono">
          <span>{f.no}</span>
          <span className="status"><i />{f.status}</span>
        </div>
        <h3>{f.name}</h3>
        <p className="featured-line">{f.line}</p>
        <p className="featured-summary">{f.summary}</p>

        <dl className="spec">
          {f.spec.map(([k, v]) => (
            <div key={k}><dt className="mono">{k}</dt><dd>{v}</dd></div>
          ))}
          <div><dt className="mono">Role</dt><dd>{f.role}</dd></div>
        </dl>

        <a className="text-link" href={f.link.href} target="_blank" rel="noreferrer">
          {f.link.label} <span aria-hidden="true">&#8599;</span>
        </a>
      </div>
    </article>
  )
}

function ProjectRow({ p, open, onToggle }) {
  const panelId = `panel-${p.no}`
  return (
    <li className={`row ${open ? 'is-open' : ''}`}>
      <button className="row-head" onClick={onToggle} aria-expanded={open} aria-controls={panelId}>
        <span className="mono row-no">{p.no}</span>
        <span className="row-name">{p.name}</span>
        <span className="row-discipline">{p.discipline}</span>
        <span className="mono row-tools">{p.tools}</span>
        <span className="row-toggle" aria-hidden="true" />
      </button>
      <div className="row-panel" id={panelId} role="region" aria-label={p.name}>
        <div className="row-panel-inner">
          <p className="row-summary">{p.summary}</p>
          <ol className="row-points">
            {p.points.map((pt) => <li key={pt}>{pt}</li>)}
          </ol>
        </div>
      </div>
    </li>
  )
}

function Work() {
  const [open, setOpen] = useState(null)
  return (
    <section className="section shell" id="work">
      <SectionHead index={1} label="Work" title="Selected work">
        One product I am building now, and the projects that taught me how to build it.
      </SectionHead>

      <Featured />

      <div className="register" data-reveal>
        <div className="register-head mono" aria-hidden="true">
          <span>No.</span><span>Project</span><span>Discipline</span><span>Tools</span><span />
        </div>
        <ul>
          {projects.map((p) => (
            <ProjectRow key={p.no} p={p} open={open === p.no} onToggle={() => setOpen(open === p.no ? null : p.no)} />
          ))}
          <li className="row row-pending">
            <div className="row-head">
              <span className="mono row-no">AM-{pad(projects.length + 2)}</span>
              <span className="row-name">More being documented</span>
              <span className="row-discipline">Write-ups in progress</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}

const principles = [
  {
    title: 'Start from the constraint.',
    body: 'The ADU had to pass city code. The lock had to keep the key people already trust. I like problems where the rules are real, and I design inside them instead of around them.',
  },
  {
    title: 'Build it before polishing it.',
    body: 'A printed, wired, slightly broken prototype teaches more than a perfect render. I would rather show the messy version that works than the clean one that does not exist yet.',
  },
  {
    title: 'Cut what does not earn its place.',
    body: 'No app if a button works. No cloud if local works. Every extra part is another thing to fail, so the simplest version that does the job usually wins.',
  },
]

function Approach() {
  return (
    <section className="approach" id="approach">
      <div className="shell">
        <SectionHead index={2} label="Approach" title="How I work" />
        <ol className="principles">
          {principles.map((p, i) => (
            <li key={p.title} data-reveal style={{ '--d': `${i * 80}ms` }}>
              <span className="mono">{pad(i + 1)}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section shell" id="about">
      <SectionHead index={3} label="About" title="About" />
      <div className="about-grid">
        <div className="about-copy" data-reveal>
          <p>
            I am an electrical engineering student in Santa Cruz. Most of my time goes into building
            things: wiring a circuit on the bench, modeling the part that holds it, printing it,
            breaking it, and doing it again.
          </p>
          <p>
            I care about products that work the first time someone touches them, and designs that
            respect the constraints they were given.
          </p>
        </div>
        <dl className="capabilities" data-reveal>
          {capabilities.map(([k, v]) => (
            <div key={k}><dt className="mono">{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(contact.email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    }).catch(() => {})
  }
  return (
    <section className="contact" id="contact">
      <div className="shell">
        <span className="mono section-index">04 &mdash; Contact</span>
        <div className="contact-main" data-reveal>
          <a className="contact-email" href={`mailto:${contact.email}`}>{contact.email}</a>
          <button className="mono copy" onClick={copy}>{copied ? 'Copied' : 'Copy address'}</button>
        </div>
        <ul className="contact-links">
          {contact.links.map((l) => (
            <li key={l.href}><a href={l.href} target="_blank" rel="noreferrer">{l.label} <span aria-hidden="true">&#8599;</span></a></li>
          ))}
        </ul>
        <footer className="footer mono">
          <span>&copy; {new Date().getFullYear()} Ahson Momin</span>
          <span>Designed and built in Santa Cruz, CA</span>
          <span>Rev 2026.10</span>
        </footer>
      </div>
    </section>
  )
}

export default function App() {
  useReveal()
  const active = useActiveSheet()
  return (
    <>
      <Header active={active} />
      <main>
        <Hero />
        <Work />
        <Approach />
        <About />
        <Contact />
      </main>
    </>
  )
}
