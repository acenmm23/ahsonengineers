import { links } from './content.js'

const NAV = [
  { href: '/#work', label: 'Work' },
  { href: '/#journey', label: 'Journey' },
  { href: '/#contact', label: 'Contact' },
]

// Little Ledger has no screenshots yet, so its visual is the product's own wordmark
// and colors (from littleledger.app) rather than an invented interface.
export function LittleLedgerPanel({ className = '' }) {
  return (
    <div className={`ll-panel ${className}`} role="img" aria-label="Little Ledger wordmark">
      <span className="ll-wordmark">little ledger</span>
      <span className="ll-tagline">Attendance · Billing · Records</span>
    </div>
  )
}

// Traced from the AM monogram PNG (media-originals/monogram.png). Small sizes need a
// heavier stroke to stay legible.
export function Monogram({ className, weight = 14 }) {
  return (
    <svg className={className} viewBox="485 228 725 422" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth={weight} strokeLinejoin="miter" strokeMiterlimit="10">
        <path d="M490 670 800 250l197 201 198-201v410" />
        <path d="M803 252v410" />
        <path d="M645 467h158" />
      </g>
    </svg>
  )
}

export function Photo({ image, alt, sizes, eager, className }) {
  return (
    <img
      className={className}
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}

export function Figure({ image, alt, sizes, label, caption, className = '', eager }) {
  return (
    <figure className={`figure ${className}`}>
      <Photo image={image} alt={alt} sizes={sizes} eager={eager} />
      <figcaption>
        {label && <span className="mono">{label}</span>}
        {caption}
      </figcaption>
    </figure>
  )
}

export function Video({ clip }) {
  return (
    <figure className="figure figure-video">
      <video
        controls
        playsInline
        preload="none"
        poster={clip.poster}
        width={clip.width}
        height={clip.height}
        aria-label={clip.caption}
      >
        <source src={clip.src} type="video/mp4" />
      </video>
      <figcaption>
        <span className="mono">{clip.label}</span>
        {clip.caption}
      </figcaption>
    </figure>
  )
}

export function Arrow({ dir = 'out' }) {
  const glyph = { out: '↗', right: '→', left: '←', down: '↓' }[dir]
  return <span className={`arrow arrow-${dir}`} aria-hidden="true">{glyph}</span>
}

export function Facts({ items }) {
  return (
    <dl className="facts">
      {items.map(([k, v]) => (
        <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
      ))}
    </dl>
  )
}

// Sections on the left, the monogram centred, profiles on the right.
export function Header() {
  return (
    <header className="header">
      <div className="shell header-inner">
        <nav className="header-nav" aria-label="Sections">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={n.label === 'Contact' ? 'wide-only' : undefined}>{n.label}</a>
          ))}
        </nav>
        <a href="/" className="brand" aria-label="Ahson Momin, home">
          <Monogram className="brand-mark" weight={30} />
        </a>
        {/* On phones the profile links give way to Contact, keeping the logo centred. */}
        <nav className="header-social" aria-label="Profiles">
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="wide-only">LinkedIn <Arrow /></a>
          <a href={links.instagram} target="_blank" rel="noreferrer" className="wide-only">Instagram <Arrow /></a>
          <a href="/#contact" className="narrow-only">Contact</a>
        </nav>
      </div>
    </header>
  )
}

export function Contact() {
  const elsewhere = [
    { label: 'GitHub', href: links.github },
    links.linkedin && { label: 'LinkedIn', href: links.linkedin },
    { label: 'Instagram', href: links.instagram },
    links.resume && { label: 'Résumé (PDF)', href: links.resume },
  ].filter(Boolean)

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="shell">
        <h2 id="contact-title" className="section-title">Contact</h2>
        <a className="contact-email" href={`mailto:${links.email}`}>{links.email}</a>
        <ul className="contact-links">
          {elsewhere.map((l) => (
            <li key={l.label}><a href={l.href} target="_blank" rel="noreferrer">{l.label} <Arrow /></a></li>
          ))}
        </ul>
        <footer className="footer">
          <span>&copy; {new Date().getFullYear()} Ahson Momin</span>
          <span>Santa Cruz, California</span>
        </footer>
      </div>
    </section>
  )
}
