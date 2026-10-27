import { links, media, betterkeyVideos, projects } from './content.js'
import { Header, Contact, Figure, Video, Arrow, Facts } from './components.jsx'

function ProjectHead({ index, kicker, title, lede, children }) {
  return (
    <header className="project-head">
      <div className="project-id">
        <span className="mono">{index}</span>
        <span>{kicker}</span>
      </div>
      <div className="project-title">
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {children}
      </div>
    </header>
  )
}

function Chapter({ stage, title, children, media: mediaNode, wide }) {
  return (
    <section className={`chapter ${wide ? 'chapter-wide' : ''}`}>
      <div className="chapter-stage mono">{stage}</div>
      <div className="chapter-body">
        <h2>{title}</h2>
        <div className="chapter-text">{children}</div>
      </div>
      {mediaNode && <div className="chapter-media">{mediaNode}</div>}
    </section>
  )
}

function ProjectLayout({ next, children }) {
  return (
    <>
      <a className="skip" href="#project">Skip to content</a>
      <Header />
      <main className="project-page shell" id="project">
        <a className="back-link" href="/#work"><Arrow dir="left" /> Selected work</a>
        {children}
        <nav className="next-project" aria-label="Next project">
          <span className="mono">Next project</span>
          <a href={next.href}>{next.title} <Arrow dir="right" /></a>
        </nav>
      </main>
      <Contact />
    </>
  )
}

export function BetterKeyPage() {
  const nowClips = betterkeyVideos.filter((v) => v.chapter === 'now')
  const v1Clips = betterkeyVideos.filter((v) => v.chapter === 'v1')

  return (
    <ProjectLayout next={projects.ece118}>
      <article className="project">
        <ProjectHead
          index="01"
          kicker="Mechanical design and hardware development"
          title="BetterKey"
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
                eager
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
    </ProjectLayout>
  )
}

export function Ece118Page() {
  return (
    <ProjectLayout next={projects.betterkey}>
      <article className="project">
        <ProjectHead
          index="02"
          kicker="ECE 118, UC Santa Cruz · Analog electronics"
          title="From Breadboard to Perfboard"
          lede="A hand-soldered analog circuit for detecting the signal on a track wire."
        />

        <Figure
          className="figure-board"
          image={media.perfboard}
          sizes="(max-width: 960px) 100vw, 1258px"
          alt="Hand-soldered perfboard with four DIP integrated circuits, resistors, ceramic capacitors, a blue screw terminal and a green LED"
          label="Hand-soldered perfboard"
          caption="Four DIP ICs and their supporting parts, with power coming in through the screw terminal at top right and an LED indicator at left."
          eager
        />

        <div className="board-notes">
          <section>
            <h2>Purpose</h2>
            <p>
              Part of the ECE 118 project is detecting an electrical signal carried on a track wire.
              This board is my circuit for that job. It is designed to pick up the signal with a
              sensor, condition it, decide whether it is present and show the result on an indicator.
            </p>
          </section>
          <section>
            <h2>What I built</h2>
            <p>
              I took the circuit off the breadboard and soldered it onto perfboard by hand. That
              meant planning where each stage sits, how power reaches it and how to keep the wiring
              readable enough to debug once everything is fixed in place.
            </p>
          </section>
          <section>
            <h2>Intended signal path</h2>
            <ol className="signal-path">
              <li>Sensor</li>
              <li>Signal conditioning</li>
              <li>Detection</li>
              <li>Output indication</li>
            </ol>
          </section>
          <section>
            <h2>Concepts I am working through</h2>
            <p>Resonant sensing, operational amplifier stages, peak detection and comparator hysteresis.</p>
          </section>
        </div>

        <p className="in-progress">
          <span className="mono">In progress</span>
          I am still reviewing the theory behind each stage. The schematic, a signal-path diagram,
          calculations and test measurements will be added here once I have verified them.
        </p>
      </article>
    </ProjectLayout>
  )
}
