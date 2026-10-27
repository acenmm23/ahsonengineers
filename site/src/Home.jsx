import { links, media, portrait, projects } from './content.js'
import { Header, Contact, Photo, Arrow, Facts } from './components.jsx'

// The name is set twice: the real <h1>, and an aria-hidden light copy masked to the
// hoodie so "Momin" turns light exactly where it crosses dark clothing.
function NameLines() {
  return (
    <>
      <span className="l1">Ahson</span>{' '}
      <span className="l2">Momin</span>
    </>
  )
}

function Hero() {
  return (
    <section className="hero shell" id="top">
      <div className="hero-frame">
        <div
          className="hero-stage"
          style={{ '--portrait-src': `url(${portrait.src})`, '--portrait-cleanup': `url(${portrait.cleanup})` }}
        >
          <h1 className="hero-name"><NameLines /></h1>
          <img
            className="hero-portrait"
            src={portrait.src}
            width={portrait.width}
            height={portrait.height}
            alt="Ahson Momin, mid-explanation, in a dark hoodie"
            fetchpriority="high"
            decoding="async"
          />
          <div className="hero-name hero-name-light" aria-hidden="true"><NameLines /></div>
        </div>
        <div className="hero-aside">
          <p className="hero-kicker">Electrical Engineering<br />UC Santa Cruz</p>
          <div>
            <p className="hero-intro">
              I build hardware and document how it gets made: the prototypes, the failures and the
              fixes.
            </p>
            <div className="hero-links">
              <a href="#work">See the work</a>
              <a href={links.instagram} target="_blank" rel="noreferrer">Follow the build <Arrow /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Preview({ index, href, title, kind, image, status, children }) {
  return (
    <li className="preview">
      <a className="preview-media" href={href} tabIndex={-1} aria-hidden="true">
        <Photo image={image} alt="" sizes="(max-width: 960px) 100vw, 760px" />
      </a>
      <div className="preview-text">
        <span className="mono preview-index">{index}</span>
        <h3><a href={href}>{title}</a></h3>
        <p className="preview-kind">{kind}</p>
        <p className="preview-desc">{children}</p>
        <p className="preview-status"><span>Status</span>{status}</p>
        <a className="explore" href={href} aria-label={`Explore project: ${title}`}>
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
      <ol className="previews">
        <Preview
          index="01"
          href={projects.betterkey.href}
          title={projects.betterkey.title}
          kind="Mechanical design and hardware development"
          image={media.betterkeyPrints}
          status="In development. The compact enclosure is still being printed and tested."
        >
          A retrofit that operates the deadbolt you already have with a dedicated button, the way
          you unlock a car. The idea is simple; fitting a motor, batteries and electronics onto a
          door has taken a long run of prototypes, from a large first version to a compact
          enclosure.
        </Preview>
        <Preview
          index="02"
          href={projects.ece118.href}
          title={projects.ece118.title}
          kind="ECE 118, UC Santa Cruz · Analog electronics"
          image={media.perfboard}
          status="Built. Technical write-up in progress."
        >
          An analog circuit for detecting the signal on a track wire, taken off the breadboard and
          soldered onto perfboard by hand.
        </Preview>
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
            sizes="(max-width: 960px) 100vw, 50vw"
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
            saw coming. That is most of the work, so that is what I share, as it happens. Explaining
            a build to other people means I have to understand it, and that has become part of how I
            learn.
          </p>
          <p>
            I also have an ongoing collaboration with <a href={links.flux} target="_blank" rel="noreferrer">Flux</a>,
            a PCB design platform that has supported my electronics and PCB design work and content.
            This photo was taken in their lab.
          </p>
          <a className="cta" href={links.instagram} target="_blank" rel="noreferrer">
            Follow the build <span className="cta-handle">@ahsonmade</span> <Arrow />
          </a>
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

export default function Home() {
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
