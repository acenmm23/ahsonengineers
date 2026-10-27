import { useEffect, useRef, useState } from 'react'
import { links, media, portrait, projects } from './content.js'
import { Header, Contact, Photo, Arrow, LittleLedgerPanel } from './components.jsx'

// The name is set twice: the real <h1>, and an aria-hidden light copy masked to the
// portrait's silhouette so "Momin" turns light exactly where it crosses it.
function NameLines() {
  return (
    <>
      <span className="l1">Ahson</span>{' '}
      <span className="l2">Momin</span>
    </>
  )
}

function Hero() {
  // The light copy of "Momin" only makes sense once the portrait is on screen;
  // before that it would be light text on a light page.
  const [ready, setReady] = useState(false)
  const imgRef = useRef(null)
  useEffect(() => {
    if (imgRef.current?.complete) setReady(true)
  }, [])

  return (
    <section className="hero shell" id="top">
      {/* Hardens the cutout's soft edge and draws a crisp orange outline around it. */}
      <svg className="sr-only" aria-hidden="true" focusable="false">
        <filter id="portrait-outline" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feComponentTransfer in="SourceGraphic" result="hard">
            <feFuncA type="linear" slope="4" intercept="-1.5" />
          </feComponentTransfer>
          <feMorphology in="hard" operator="dilate" radius="2" result="grown" />
          <feFlood floodColor="#e0461c" />
          <feComposite in2="grown" operator="in" result="outline" />
          <feMerge>
            <feMergeNode in="outline" />
            <feMergeNode in="hard" />
          </feMerge>
        </filter>
      </svg>

      <div className="hero-grid">
        <div className="hero-intro" id="about">
          <p className="hero-hello">hey!</p>
          <p>
            I'm an electrical engineering student at UC Santa Cruz, and I like turning ideas into
            things that actually work. A lot of that means building an imperfect first version,
            figuring out what went wrong, and working through the next one.
          </p>
          <p>
            Right now I'm developing BetterKey, building Little Ledger for small daycare providers,
            and documenting what I learn along the way.
          </p>
          <dl className="hero-facts">
            <div><dt>Studying</dt><dd>B.S. Electrical Engineering, UC Santa Cruz, expected 2027</dd></div>
            <div><dt>Into</dt><dd>Electronics, embedded systems, hardware, product design</dd></div>
          </dl>
          <ul className="hero-links text-links">
            <li><a href="#work">Explore my work <Arrow dir="down" /></a></li>
            <li><a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></li>
            <li><a href={links.instagram} target="_blank" rel="noreferrer">Instagram <Arrow /></a></li>
          </ul>
        </div>

        <div className="hero-frame">
          <div
            className={`hero-stage ${ready ? 'is-ready' : ''}`}
            style={{ '--portrait-src': `url(${portrait.src})`, '--portrait-cleanup': `url(${portrait.cleanup})` }}
          >
            <h1 className="hero-name"><NameLines /></h1>
            <div className="hero-portrait">
              <img
                ref={imgRef}
                onLoad={() => setReady(true)}
                src={portrait.src}
                width={portrait.width}
                height={portrait.height}
                alt="Ahson Momin, mid-explanation, in a dark hoodie"
                fetchpriority="high"
                decoding="async"
              />
            </div>
            <div className="hero-name hero-name-light" aria-hidden="true"><NameLines /></div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Hovering (or focusing) an entry slides through its images; on touch screens the
// strip can be swiped. It always returns to the first image when the pointer leaves.
const SLIDE_MS = 2200

function Slides({ slides, active }) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const count = slides.length

  useEffect(() => {
    const track = trackRef.current
    if (!track || count < 2) return undefined
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const go = (i) => track.scrollTo({ left: i * track.clientWidth, behavior: still ? 'auto' : 'smooth' })
    if (!active) { go(0); return undefined }
    if (still) return undefined
    let i = Math.round(track.scrollLeft / track.clientWidth)
    const first = setTimeout(() => { i = (i + 1) % count; go(i) }, 500)
    const timer = setInterval(() => { i = (i + 1) % count; go(i) }, SLIDE_MS)
    return () => { clearTimeout(first); clearInterval(timer) }
  }, [active, count])

  const onScroll = (e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))

  return (
    <>
      <div className="slides" ref={trackRef} onScroll={onScroll}>
        {slides.map((s) => (
          <Photo key={s.image.src} image={s.image} alt="" sizes="(max-width: 900px) 100vw, 760px" className={s.contain ? 'is-contain' : undefined} />
        ))}
      </div>
      {count > 1 && (
        <span className="slide-dots" aria-hidden="true">
          {slides.map((s, i) => <i key={s.image.src} className={i === index ? 'is-on' : undefined} />)}
        </span>
      )}
    </>
  )
}

function Entry({ project, index }) {
  const p = project
  const [active, setActive] = useState(false)
  const on = () => setActive(true)
  const off = (e) => { if (!e.currentTarget.contains(e.relatedTarget)) setActive(false) }
  return (
    <li className="entry" onMouseEnter={on} onMouseLeave={() => setActive(false)} onFocus={on} onBlur={off}>
      <p className="entry-meta">
        <span className="mono entry-no">{String(index + 1).padStart(2, '0')}</span>
        <span className="entry-category">{p.category}</span>
      </p>
      <h3 className="entry-title"><a href={p.href}>{p.title}</a></h3>
      <a className="entry-media" href={p.href} tabIndex={-1} aria-hidden="true">
        {p.slides ? <Slides slides={p.slides} active={active} /> : <LittleLedgerPanel />}
      </a>
      <div className="entry-body">
        <p className="entry-disciplines">{p.disciplines.join(' · ')}</p>
        <p className="entry-summary">{p.summary}</p>
        <p className="entry-status"><span>Status</span>{p.status}</p>
        <a className="explore" href={p.href} aria-label={`Explore project: ${p.title}`}>
          Explore project <Arrow dir="right" />
        </a>
      </div>
    </li>
  )
}

function Work() {
  return (
    <section className="work shell" id="work" aria-labelledby="work-title">
      <h2 id="work-title" className="section-title">Selected work</h2>
      <ol className="entries">
        {projects.map((p, i) => <Entry key={p.slug} project={p} index={i} />)}
      </ol>
    </section>
  )
}

function Journey() {
  return (
    <section className="journey" id="journey" aria-labelledby="journey-title">
      <div className="shell journey-grid">
        <div className="journey-portrait">
          <Photo
            image={media.labOverhead}
            sizes="(max-width: 900px) 100vw, 50vw"
            alt="Ahson sitting at a workbench in the Flux lab, talking to the camera, surrounded by soldering equipment, an oscilloscope, resin printers and two laptops"
          />
        </div>
        <div className="journey-copy">
          <h2 id="journey-title">My Creator Journey</h2>
          <p className="journey-lede">
            I started filming what I was building because the process seemed like the most
            interesting part.
          </p>
          <p>
            A finished product rarely shows the failed prints, the redesigns or the problem nobody
            saw coming. That is most of the work, so that is what I share as @ahsonmade, as it
            happens. Explaining a build to other people means I have to understand it, and that has
            become part of how I learn.
          </p>
          <p>
            I also have an ongoing collaboration with <a href={links.flux} target="_blank" rel="noreferrer">Flux</a>,
            a PCB design platform that has supported my electronics and PCB design work and content.
            This photo was taken in their lab.
          </p>
          <a className="cta" href={links.instagram} target="_blank" rel="noreferrer">
            Follow the build on Instagram <Arrow />
          </a>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#work">Skip to work</a>
      <Header />
      <main>
        <Hero />
        <Work />
        <Journey />
        <Contact />
      </main>
    </>
  )
}
