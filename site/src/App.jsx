import { links, media, betterkeyVideos } from './content.js'

const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'journey', label: 'Journey' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

// Traced from the AM monogram PNG (media-originals/monogram.png). Small sizes need a
// heavier stroke to stay legible.
function Monogram({ className, weight = 14 }) {
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

function Photo({ image, alt, sizes, eager, className }) {
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

function Figure({ image, alt, sizes, label, caption, className = '', eager }) {
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

function Video({ clip }) {
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

function Arrow() {
  return <span className="arrow" aria-hidden="true">&#8599;</span>
}

function Header() {
  return (
    <header className="header">
      <div className="shell header-inner">
        <a href="#top" className="brand" aria-label="Ahson Momin, back to top">
          <Monogram className="brand-mark" weight={34} />
          <span>Ahson Momin</span>
        </a>
        <nav aria-label="Sections">
          {NAV.map((n) => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero shell" id="top">
      <p className="hero-kicker">Electrical Engineering, UC Santa Cruz</p>
      <div className="hero-main">
        <h1>Ahson<br />Momin</h1>
        <Monogram className="hero-mark" />
      </div>
      <div className="hero-foot">
        <p className="hero-intro">
          I build hardware and document how it gets made: the prototypes, the failures and the
          fixes. Right now that means BetterKey, a retrofit that operates the deadbolt you already
          have with a dedicated button.
        </p>
        <div className="hero-links">
          <a href="#work">See the work</a>
          <a href={links.instagram} target="_blank" rel="noreferrer">Follow the build <Arrow /></a>
        </div>
      </div>
    </section>
  )
}

function ProjectHead({ index, kicker, title, lede, children }) {
  return (
    <header className="project-head">
      <div className="project-id">
        <span className="mono">{index}</span>
        <span>{kicker}</span>
      </div>
      <div className="project-title">
        <h3>{title}</h3>
        {lede && <p className="lede">{lede}</p>}
        {children}
      </div>
    </header>
  )
}

function Facts({ items }) {
  return (
    <dl className="facts">
      {items.map(([k, v]) => (
        <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
      ))}
    </dl>
  )
}

function Chapter({ stage, title, children, media: mediaNode, wide }) {
  return (
    <section className={`chapter ${wide ? 'chapter-wide' : ''}`}>
      <div className="chapter-stage mono">{stage}</div>
      <div className="chapter-body">
        <h4>{title}</h4>
        <div className="chapter-text">{children}</div>
      </div>
      {mediaNode && <div className="chapter-media">{mediaNode}</div>}
    </section>
  )
}

function BetterKey() {
  const nowClips = betterkeyVideos.filter((v) => v.chapter === 'now')
  const v1Clips = betterkeyVideos.filter((v) => v.chapter === 'v1')

  return (
    <article className="project" id="betterkey" aria-labelledby="betterkey-title">
      <ProjectHead
        index="01"
        kicker="Mechanical design and product development"
        title={<span id="betterkey-title">BetterKey</span>}
        lede="Building the simplest possible solution is often a complicated engineering process."
      >
        <p className="body">
          BetterKey is a retrofit for the deadbolt you already have. Press a dedicated button, the
          way you would unlock a car, and a motor turns the lock. The idea is simple. Getting a
          motor, batteries and electronics to fit neatly on the back of a door has taken
          electronics work, CAD, 3D printing and a lot of prototypes that did not work the first
          time.
        </p>
        <Facts items={[
          ['Work', 'Electronics, CAD, 3D printing, motors, prototyping'],
          ['Status', 'In development. Not a finished product.'],
          ['More', <a href={links.betterkey} target="_blank" rel="noreferrer">thebetterkey.com <Arrow /></a>],
        ]} />
      </ProjectHead>

      <p className="story-note mono">Newest first, working back to the first prototype</p>

      <Chapter
        stage="Now"
        title="Packing everything into one enclosure"
        media={
          <>
            {nowClips.map((c) => <Video key={c.src} clip={c} />)}
            <Figure
              image={media.betterkeyCad}
              sizes="(max-width: 960px) 100vw, 880px"
              alt="CAD model of the V4A3 BetterKey enclosure in Fusion 360, with two cylindrical batteries side by side under a sliding lid"
              label="CAD model · V4A3"
              caption="The current design in Fusion 360, with the sliding battery lid partly open."
            />
          </>
        }
      >
        <p>
          The latest version is designed around packaging: two CR123A cells under a sliding lid, a
          removable housing for the motor and a cover for the internal electronics. What you see
          here is a CAD model. It is still being printed, tested and revised, so it is a design in
          progress rather than a proven result.
        </p>
      </Chapter>

      <Chapter
        stage="V1 → V4"
        title="Same job, much smaller"
        wide
        media={
          <Figure
            className="figure-feature"
            image={media.betterkeyV1V4}
            sizes="(max-width: 960px) 100vw, 1320px"
            alt="A small white BetterKey enclosure labeled V4 next to the much larger green V1 enclosure, side by side on a notebook"
            label="Printed prototypes · V4 and V1"
            caption="V4 (white) beside V1 (green), both printed. The difference in size is the story of every version in between."
          />
        }
      >
        <p>
          V1 was large on purpose. It only had to prove that a button press could turn a real
          deadbolt, so I gave the motor, batteries and wiring as much room as they needed and
          built it quickly. Once that worked, the problem changed. Every version after it has been
          about fitting the same parts, and the interface to the thumbturn, into less space.
        </p>
      </Chapter>

      <Chapter
        stage="In between"
        title="What the prints showed that CAD did not"
        media={
          <Figure
            image={media.betterkeyPrints}
            sizes="(max-width: 960px) 100vw, 880px"
            alt="Several 3D-printed BetterKey enclosures in navy, orange, green and white on a desk with a gearmotor, battery pack and digital calipers"
            label="Printed prototypes"
            caption="Enclosures from several iterations, with a gearmotor, a battery pack and calipers on the desk."
          />
        }
      >
        <p>
          A design can look right on screen and still fail in your hand. Printing each version
          exposed problems I could not see in CAD, in how parts fit, how they go together and how
          everything packs around the lock. The pattern has been the same each time: build it,
          find what fails, fix it, print the next one.
        </p>
      </Chapter>

      <Chapter
        stage="V1"
        title="Proving the idea first"
        media={v1Clips.length > 0 && v1Clips.map((c) => <Video key={c.src} clip={c} />)}
      >
        <p>
          The first prototype was about speed, not size. It was mounted on a wooden test rig with
          the electronics still on the bench, which was enough to start learning what the real
          design would need.
        </p>
      </Chapter>
    </article>
  )
}

function Ece118() {
  return (
    <article className="project" id="ece118" aria-labelledby="ece118-title">
      <ProjectHead
        index="02"
        kicker="ECE 118, UC Santa Cruz · Analog signal detection"
        title={<span id="ece118-title">From Breadboard to Perfboard</span>}
        lede="A hand-soldered analog circuit for detecting the signal on a track wire."
      />

      <Figure
        className="figure-board"
        image={media.perfboard}
        sizes="(max-width: 960px) 100vw, 1258px"
        alt="Hand-soldered perfboard with four DIP integrated circuits, resistors, ceramic capacitors, a blue screw terminal and a green LED"
        label="Hand-soldered perfboard"
        caption="Four DIP ICs and their supporting parts, with power coming in through the screw terminal at top right and an LED indicator at left."
      />

      <div className="board-notes">
        <section>
          <h4>Purpose</h4>
          <p>
            Part of the ECE 118 project is detecting an electrical signal carried on a track wire.
            This board is my circuit for that job. It is designed to pick up the signal with a
            sensor, condition it, decide whether it is present and show the result on an indicator.
          </p>
        </section>
        <section>
          <h4>What I built</h4>
          <p>
            I took the circuit off the breadboard and soldered it onto perfboard by hand. That
            meant planning where each stage sits, how power reaches it and how to keep the wiring
            readable enough to debug once everything is fixed in place.
          </p>
        </section>
        <section>
          <h4>Intended signal path</h4>
          <ol className="signal-path">
            <li>Sensor</li>
            <li>Signal conditioning</li>
            <li>Detection</li>
            <li>Output indication</li>
          </ol>
        </section>
        <section>
          <h4>Concepts I am working through</h4>
          <p>Resonant sensing, operational amplifier stages, peak detection and comparator hysteresis.</p>
        </section>
      </div>

      <p className="in-progress">
        <span className="mono">In progress</span>
        I am still reviewing the theory behind each stage. The schematic, a signal-path diagram,
        calculations and test measurements will be added here once I have verified them.
      </p>
    </article>
  )
}

function Work() {
  return (
    <section className="work shell" id="work" aria-labelledby="work-title">
      <h2 id="work-title" className="section-title">Selected work</h2>
      <BetterKey />
      <Ece118 />
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
            sizes="(max-width: 960px) 100vw, 50vw"
            alt="Ahson sitting at a workbench in the Flux lab, surrounded by soldering equipment, an oscilloscope, resin printers and two laptops"
          />
        </div>
        <div className="journey-copy">
          <h2 id="journey-title" className="section-title">My Creator Journey</h2>
          <p className="journey-lede">
            I started filming what I was building because the process seemed like the most
            interesting part.
          </p>
          <p>
            A finished product rarely shows the failed prints, the design changes, the late nights
            or the problem nobody saw coming. That is most of the work, so that is what I share.
          </p>
          <p>
            On Instagram I post prototypes, experiments, failures and progress as they happen.
            Explaining a build to other people means I have to actually understand it, and sharing
            the process has become part of how I build and learn.
          </p>
          <p>
            I also have an ongoing collaboration with <a href={links.flux} target="_blank" rel="noreferrer">Flux</a>,
            a PCB design platform that has supported my electronics and PCB design work and
            content. The photos in this section were taken in their lab.
          </p>
          <a className="cta" href={links.instagram} target="_blank" rel="noreferrer">
            Follow the build <span className="cta-handle">@ahsonmade</span> <Arrow />
          </a>
          <figure className="journey-still">
            <Photo
              image={media.labStanding}
              sizes="(max-width: 600px) 60vw, 260px"
              alt="Ahson explaining a build to the camera in the Flux lab, holding a small component"
            />
            <figcaption>Filming a build update in the lab.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about shell" id="about" aria-labelledby="about-title">
      <h2 id="about-title" className="section-title">About</h2>
      <div className="about-body">
        <p>
          I am an electrical engineering student at UC Santa Cruz. I am most interested in
          electronics, embedded systems, hardware development, mechanical integration and product
          design, especially where a circuit has to become a physical thing someone can use.
        </p>
        <Facts items={[
          ['Degree', 'B.S. Electrical Engineering'],
          ['University', 'University of California, Santa Cruz'],
          ['Graduation', 'Expected 2027'],
        ]} />
      </div>
    </section>
  )
}

function Contact() {
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

export default function App() {
  return (
    <>
      <a className="skip" href="#work">Skip to work</a>
      <Header />
      <main>
        <Hero />
        <Work />
        <Journey />
        <About />
        <Contact />
      </main>
    </>
  )
}
