import { links } from './content.js'

const NAV = [
  { href: '/#work', label: 'Work' },
  { href: '/#journey', label: 'Journey' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

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
  const glyph = { out: '↗', right: '→', left: '←' }[dir]
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

export function Header() {
  return (
    <header className="header">
      <div className="shell header-inner">
        <a href="/" className="brand" aria-label="Ahson Momin, home">
          <Monogram className="brand-mark" weight={34} />
          <span>Ahson Momin</span>
        </a>
        <nav aria-label="Sections">
          {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
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
