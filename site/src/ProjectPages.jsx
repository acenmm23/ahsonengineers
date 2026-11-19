import { links, media, betterkeyVideos, projects, projectBySlug } from './content.js'
import { Header, Contact, Figure, Video, Arrow, Facts, LittleLedgerPanel } from './components.jsx'

function ProjectHead({ project, lede, children }) {
  const index = projects.indexOf(project) + 1
  return (
    <header className="project-head">
      <div className="project-id">
        <span className="mono">{String(index).padStart(2, '0')}</span>
        <span className="entry-category">{project.category}</span>
        <span className="project-disciplines">{project.disciplines.join(' · ')}</span>
      </div>
      <div className="project-title">
        <h1>{project.title}</h1>
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

function ProjectLayout({ project, children }) {
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  return (
    <>
      <a className="skip" href="#project">Skip to content</a>
      <Header />
      <main className="project-page shell" id="project">
        <a className="back-link" href="/#work"><Arrow dir="left" /> Selected work</a>
        <article className="project">{children}</article>
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
  const project = projectBySlug.betterkey
  const nowClips = betterkeyVideos.filter((v) => v.chapter === 'now')
  const v1Clips = betterkeyVideos.filter((v) => v.chapter === 'v1')

  return (
    <ProjectLayout project={project}>
      <ProjectHead
        project={project}
        lede="Building the simplest possible solution is often a complicated engineering process."
      >
        <p className="body">
          theBetterKey is a retrofit for the deadbolt you already have. A dedicated RF key fob operates
          it, the way you unlock a car, while the existing lock and key keep working by hand. The
          idea is simple. Getting a motor, batteries and electronics to fit neatly on the back of a
          door is where most of the engineering has gone.
        </p>
        <Facts items={[
          ['Problem', 'Most smart locks replace the lock and put an app, an account and often a subscription between you and your own door.'],
          ['Approach', 'Keep the existing deadbolt and manual operation. Add a dedicated RF fob and a motor unit that turns the thumbturn.'],
          ['Status', 'Prototypes built and tested on a rig. The compact V4A3 enclosure is in CAD and still being printed, tested and revised.'],
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
              sizes="(max-width: 900px) 100vw, 880px"
              alt="CAD model of the V4A3 theBetterKey enclosure in Fusion 360, with two cylindrical batteries side by side under a sliding lid"
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
            image={media.betterkeyV1V4}
            sizes="(max-width: 900px) 100vw, 1320px"
            alt="A small white theBetterKey enclosure labeled V4 next to the much larger green V1 enclosure, side by side on a notebook"
            label="Printed prototypes · V4 and V1"
            caption="V4 (white) beside V1 (green), both printed. The difference in size is the story of every version in between."
          />
        }
      >
        <p>
          V1 was large on purpose. It only had to prove that pressing a button could turn a real
          deadbolt, so I gave the motor, batteries and wiring as much room as they needed and built
          it quickly. Once that worked, the problem changed. Every version since has been about
          fitting the same parts, and the interface to the thumbturn, into less space.
        </p>
      </Chapter>

      <Chapter
        stage="In between"
        title="What the prints showed that CAD did not"
        media={
          <Figure
            image={media.betterkeyPrints}
            sizes="(max-width: 900px) 100vw, 880px"
            alt="Several 3D-printed theBetterKey enclosures in navy, orange, green and white on a desk with a gearmotor, battery pack and digital calipers"
            label="Printed prototypes"
            caption="Enclosures from several iterations, with a gearmotor, a battery pack and calipers on the desk."
          />
        }
      >
        <p>
          A design can look right on screen and still fail in your hand. Printing each version
          exposed problems I could not see in CAD, in how parts fit, how they go together and how
          everything packs around the lock. The pattern has been the same each time: build it, find
          what fails, fix it, print the next one.
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

      <Chapter stage="Next" title="What I'm working on">
        <p>
          Printing and testing the V4A3 enclosure, then testing the complete unit on a real door
          rather than the rig. Newer footage of the current version will go at the top of this page
          when it is ready.
        </p>
      </Chapter>
    </ProjectLayout>
  )
}

export function RfPcbPage() {
  const project = projectBySlug['rf-pcb']
  return (
    <ProjectLayout project={project}>
      <ProjectHead
        project={project}
        lede="The board that turns theBetterKey from a bench of modules into one thing that fits behind a door."
      >
        <p className="body">
          This is the lock-side receiver for theBetterKey V2. It listens for the fob over a 2.4 GHz
          radio, runs off the two-cell battery pack, and drives the worm-gear motor that turns the
          deadbolt. The whole circuit had to fit on a 64 × 21 mm strip so it can live inside the
          enclosure next to the batteries and motor.
        </p>
        <Facts items={[
          ['Board', '64 × 21 mm, 4 layers, 42 parts'],
          ['Radio', 'Raytac AN54LV-15 module (Nordic nRF54L15) with an integrated antenna'],
          ['Power', '2S CR123A pack, fuse, reverse-polarity diode and TVS, TI TPS629203 buck to 3.0 V'],
          ['Motor', 'TI DRV8214 driver for the 6 V worm-gear motor'],
          ['Status', 'Schematic and layout done in KiCad 9 with zero DRC and ERC errors. Not fabricated or tested yet.'],
          ['Part of', <a href={projectBySlug.betterkey.href}>theBetterKey <Arrow /></a>],
        ]} />
      </ProjectHead>

      <Figure
        className="figure-lead"
        image={media.pcbGlow}
        sizes="(max-width: 900px) 100vw, 1320px"
        alt="All copper on the board: top-layer traces and pads bright, inner and bottom layers dimmer behind them, on a dark background"
        label="All copper layers · routed"
        caption="Top-layer copper in front, the inner signal layer and bottom layer dimmer behind it. The gap at the top centre is where the radio module's antenna sits."
        eager
      />

      <p className="story-note mono">How it went, in order</p>

      <Chapter
        stage="01 · Schematic"
        title="Start from what the board has to do"
        wide
        media={
          <Figure
            image={media.pcbSchematic}
            zoomable
            sizes="(max-width: 900px) 100vw, 1320px"
            alt="Schematic sheet for the radio module, SWD programming pads and battery-voltage divider"
            label="Schematic · sheet 2 of 3"
            caption="The radio module with its programming pads, decoupling and battery-voltage measurement. The other two sheets cover power protection and the motor driver."
          />
        }
      >
        <p>
          The circuit is split into three sheets: power and protection, the radio module with its
          programming pads and battery measurement, and the motor driver. Every part in the BOM has an
          exact orderable part number and a reason it was chosen. KiCad's electrical rules check
          finishes with zero errors and zero warnings.
        </p>
      </Chapter>

      <Chapter
        stage="02 · Placement"
        title="Fit it to the enclosure before routing anything"
        wide
        media={
          <Figure
            image={media.pcbPlacement}
            sizes="(max-width: 900px) 100vw, 1320px"
            alt="Component outlines and pads placed on the 64 by 21 millimetre board with no traces yet"
            label="Placement study · 64 × 21 mm"
            caption="Parts placed, no traces. Battery input and protection on the left, power conversion next, the radio module at the top edge, the motor driver and its output on the right."
          />
        }
      >
        <p>
          I tried placements at 60 × 20 mm and 64 × 21 mm before routing a single trace. The order
          follows the current: battery in and protection on the left, the buck converter next, the
          radio in the middle against the top edge so its antenna has open space, and the motor
          driver beside the motor connector on the right. The six SWD pads sit in the middle so a
          pogo-pin fixture can reach them.
        </p>
      </Chapter>

      <Chapter stage="03 · Routing" title="Route the sensitive parts by hand">
        <p>
          The buck converter's switch node is the noisiest net on the board, so I rotated the
          regulator and moved the inductor until that connection was a single 2.56 mm top-layer
          trace with no via. The motor driver's supply capacitor moved right next to its pin, and the
          battery and motor nets use a wider 0.40 mm class.
        </p>
        <p>
          With those set, I used Freerouting for the remaining signal traces and checked the result
          in KiCad: 0.15 mm clearance, 0.18 mm signal width, 0.6 / 0.3 mm vias.
        </p>
      </Chapter>

      <Chapter
        stage="04 · RF"
        title="Keep copper away from the antenna"
        wide
        media={
          <Figure
            image={media.pcbGround}
            sizes="(max-width: 900px) 100vw, 1320px"
            alt="The first inner layer as one continuous ground fill, with a rectangular cut-out at the top centre under the antenna"
            label="Inner layer 1 · ground plane"
            caption="One continuous ground plane under everything, with the antenna keep-out cut out at the top. Every via passes through it."
          />
        }
      >
        <p>
          The first inner layer is a solid ground plane, which gives every signal a short return path.
          Under the module's antenna, a keep-out area blocks traces, vias and copper pours on all four
          layers. What still has to be checked is the antenna's clearance from the batteries,
          enclosure and the metal of the lock once everything is assembled.
        </p>
      </Chapter>

      <Chapter
        stage="05 · Checks"
        title="Zero errors before anything is ordered"
        wide
        media={
          <Figure
            image={media.pcbRender}
            sizes="(max-width: 900px) 100vw, 1320px"
            alt="KiCad 3D render of the populated board at an angle"
            label="KiCad 3D render"
            caption="The radio module and inductor have no 3D models yet, so they show as bare pads."
          />
        }
      >
        <p>
          KiCad reports zero design-rule violations, zero unconnected pads and zero footprint errors,
          and the schematic and board match. That proves the files are consistent. It does not prove
          the board works, which is what the first prototype is for.
        </p>
      </Chapter>

      <Chapter stage="Next" title="Order it, then test it">
        <p>
          Mounting holes go in once the enclosure coordinates are fixed, then the fabricator's rules
          get checked and the first boards get ordered. On the first prototype I'll check motor
          start-up and stall current, supply transients and radio range through the enclosure.
        </p>
      </Chapter>
    </ProjectLayout>
  )
}

const beaconStages = [
  ['Power and reference', <>6–12 V in through a reverse-polarity diode and a 3.3 V low-dropout regulator. Two 12 kΩ resistors and a buffer make a <strong>1.65 V mid-rail (VREF)</strong>, so every stage can swing both ways on a single supply.</>],
  ['Pickup', <>An IR phototransistor feeds a <strong>transimpedance amplifier</strong> with 1 kΩ feedback. The gain is kept low on purpose so ambient light cannot saturate the first stage.</>],
  ['Filtering and amplification', <><strong>Eight cascaded multiple-feedback band-pass stages</strong> tuned near 2 kHz, Q of about 5. Stages 1–4 give about 2.5× each, 5–6 about 1.5×, 7–8 about 1×. In series they reject the 1.5 kHz and 2.5 kHz beacons and the DC and 120 Hz parts of room light.</>],
  ['Peak detection', <>A <strong>precision peak detector</strong>: op-amp, diode, 0.1 µF hold capacitor and 47 kΩ discharge, about a 5 ms time constant. Taking feedback after the diode cancels its forward drop.</>],
  ['Threshold', <>A <strong>comparator with hysteresis</strong> (12 kΩ / 24 kΩ divider, 82 kΩ positive feedback) switches when the peak rises above about 2.3 V and releases below about 2.0 V. The 0.3 V band stops it chattering at the edge of range.</>],
  ['Output', <>A buffer isolates the comparator so the LED (220 Ω) cannot shift the threshold. The same signal drives an active-low digital output.</>],
]

const beaconFixes = [
  {
    title: 'Op-amp inputs swapped',
    problem: 'Our hand-drawn schematic had + and − reversed on the transimpedance amp and all eight filter stages. The breadboard was right; we soldered from the drawing, which put every feedback resistor on the + input.',
    fix: 'Moved each feedback node to the − pin and tied each + pin to VREF.',
  },
  {
    title: 'Stages attenuating instead of amplifying',
    problem: 'With the polarity fixed, every output sat correctly at 1.65 V DC, but injecting a 2 kHz sine and probing in order showed stages 1, 3 and 4 at about 0.7× and stage 7 at about 0.3×.',
    fix: 'Continuity checks found those stages’ shunt resistors were never connected to VREF. Connecting them brought stage 1 to 2.6×, the first two stages together to about 6–7×, and with a 200 mV input the later stages swung rail to rail.',
  },
  {
    title: 'Reference buffer with no power',
    problem: 'The VREF buffer’s 0.1 µF decoupling capacitor had been placed in series between the 3.3 V rail and pin 4.',
    fix: 'Wired pin 4 straight to the rail and moved the capacitor across pins 4 and 11 on every chip, re-routing the rails so each sits next to its pin.',
  },
  {
    title: 'Comparator that could not switch',
    problem: 'The values from our Lab 1 drawing could not place both thresholds between the no-beacon and beacon peak levels.',
    fix: 'Redesigned it with the 12 kΩ / 24 kΩ / 82 kΩ network and removed the pull-up, since the MCP6004 output is push-pull.',
  },
]

export function Ece118Page() {
  const project = projectBySlug.ece118
  return (
    <ProjectLayout project={project}>
      <ProjectHead
        project={project}
        lede="A single-supply analog circuit that picks a 2 kHz infrared beacon out of room light and turns it into a clean digital output."
      >
        <p className="body">
          Built for ECE 118 at UC Santa Cruz with lab partners. We assembled the detector on a
          breadboard in Lab 1, then rebuilt it on perfboard in Lab 2 and brought it up one stage at a
          time. Most of what I learned came from the parts that did not work the first time.
        </p>
        <Facts items={[
          ['Core parts', 'Four MCP6004 quad op-amps, IR phototransistor, 3.3 V LDO regulator'],
          ['Board', '39 × 27 hole perfboard, hand-soldered'],
          ['Status', 'Built on perfboard; stage gains measured after debugging. One intermittent reference dropout is still to be traced.'],
        ]} />
      </ProjectHead>

      <Figure
        className="figure-lead"
        image={media.perfboard}
        sizes="(max-width: 900px) 100vw, 1258px"
        alt="Hand-soldered perfboard with four quad op-amp chips in a row, filter resistors and capacitors, a blue screw terminal and a green LED"
        label="Component side"
        caption="Power input, regulator and its capacitors along the top edge. The four op-amp chips sit in a row with each stage’s parts beside it; the green LED is at the left edge."
        eager
      />

      <Chapter
        stage="Signal path"
        title="Six stages from light to logic"
        wide
        media={
          <Figure
            image={media.schematic}
            zoomable
            sizes="(max-width: 900px) 100vw, 1320px"
            alt="Full schematic of the beacon detector: power and 1.65 V reference, phototransistor and transimpedance amplifier, eight band-pass stages, precision peak detector, comparator with hysteresis and LED output buffer"
            label="Full schematic, as built"
            caption="Redrawn after the perfboard bring-up so it matches the board, including the corrected op-amp inputs and the redesigned comparator."
          />
        }
      >
        <ol className="steps">
          {beaconStages.map(([name, text], i) => (
            <li key={name}>
              <span className="mono step-no">{String(i + 1).padStart(2, '0')}</span>
              <span className="step-name">{name}</span>
              <span className="step-text">{text}</span>
            </li>
          ))}
        </ol>
      </Chapter>

      <Chapter stage="Design choice" title="Eight gentle filters instead of a few sharp ones">
        <p>
          The MCP6004 cannot support high-Q stages, so a narrow 2 kHz passband had to come from
          cascading many low-Q stages rather than from one or two sharp ones. The trade-off is board
          space and part count, which is also why the design outgrew the original 7 × 9 cm board.
        </p>
      </Chapter>

      <Chapter stage="Breadboard" title="Built, but never reliable">
        <p>
          In Lab 1 we assembled the complete eight-stage detector on a breadboard. It never produced
          a stable, correct output: during testing, one filter op-amp sat near the 3.3 V rail instead
          of its 1.65 V bias, and we did not confirm a fix before the deadline. The checkoff moved to
          the soldered version.
        </p>
      </Chapter>

      <Chapter
        stage="Perfboard"
        title="Debugging the soldered board"
        media={
          <Figure
            image={media.solderSide}
            sizes="(max-width: 900px) 100vw, 880px"
            alt="Solder side of the perfboard, with bare-wire power and reference rails running across the board and insulated jumpers between stages"
            label="Solder side"
            caption="Bare-wire buses carry +3.3 V, ground and VREF; insulated jumpers carry signals between stages and power to each chip."
          />
        }
      >
        <p>
          Almost every fault traced back to the schematic we soldered from, not to the soldering
          itself. Testing stage by stage with a scope, DC bias first and then AC gain, found each one.
        </p>
        <ul className="fixes">
          {beaconFixes.map((f) => (
            <li key={f.title}>
              <h3>{f.title}</h3>
              <dl>
                <dt>Found</dt><dd>{f.problem}</dd>
                <dt>Fix</dt><dd>{f.fix}</dd>
              </dl>
            </li>
          ))}
        </ul>
      </Chapter>

      <Chapter stage="Same lab" title="Track-wire sensing">
        <p>
          The same lab used this signal chain to sense a 24–26 kHz track wire. A 10 mH pickup coil
          with a 3.3 nF capacitor forms an LC tank with an ideal resonance of about 27.7 kHz. With the
          wire on, the tank showed a 25.55 kHz waveform at 35.0 mVpp; with it off, about 1.2 mVpp and
          no stable signal.
        </p>
        <p>
          That breadboard detector never reached a reliable logic output. The peak detector produced
          roughly 70–90 mV with the wire close, far below the 1.8 V comparator threshold it was
          designed against. It taught me the same lesson as the beacon board: a correct signal at the
          sensor does not guarantee a usable output, and each stage has to hand the next one a signal
          that is large enough and correctly biased.
        </p>
      </Chapter>

      <Chapter stage="Next" title="What is left">
        <p>
          VREF dropped out once during testing and recovered on its own, which points to a marginal
          solder joint we still need to find. Scope captures will be added here.
        </p>
      </Chapter>
    </ProjectLayout>
  )
}

export function LittleLedgerPage() {
  const project = projectBySlug['little-ledger']
  return (
    <ProjectLayout project={project}>
      <ProjectHead project={project} lede="Built for a problem close to home.">
        <p className="body">
          Little Ledger is an iOS and web app that simplifies attendance, billing and records for
          small home daycare providers. It is shaped by watching my mom run her in-home daycare and
          by conversations with other providers about how their days actually work.
        </p>
        <Facts items={[
          ['For', 'Family home daycares: usually one provider, not a center with staff and a front desk'],
          ['Built with', 'Next.js, Supabase with row-level security, Stripe; SwiftUI for iOS'],
          ['Status', 'In active development.'],
          ['More', <a href={links.littleledger} target="_blank" rel="noreferrer">littleledger.app <Arrow /></a>],
        ]} />
      </ProjectHead>

      <figure className="figure figure-lead">
        <LittleLedgerPanel />
        <figcaption>Product screenshots will be added here.</figcaption>
      </figure>

      <Chapter stage="The problem" title="A daycare is also a small business">
        <p>
          My mom runs a small in-home daycare. I saw how much of her time went to the work
          around the kids: attendance records, billing each family under its own arrangement,
          tracking payments and expenses, and keeping paperwork an accountant can use.
        </p>
        <p>
          Most childcare software is built for centers with staff and a front desk. A home provider
          is usually one person who needs the same records without the overhead, which is the gap I
          decided to build for.
        </p>
      </Chapter>

      <Chapter stage="Discovery" title="Talking to providers">
        <p>
          Beyond my mom’s daycare, I have been calling and talking with other home daycare providers
          to understand how they handle attendance, billing and records today, where the time goes,
          and which problems are worth solving first. Those conversations feed directly into what
          gets built and what gets left out.
        </p>
        <p className="in-progress">
          <span className="mono">To come</span>
          Specific examples from these conversations, and the decisions they changed, will be added
          here.
        </p>
      </Chapter>

      <Chapter stage="Decisions" title="What it is, and what it deliberately is not">
        <ul className="bullets">
          <li><strong>One provider, not a center.</strong> No staff scheduling, payroll, parent app or social feed.</li>
          <li><strong>A smart notebook, not a dashboard.</strong> Plain English, no accounting jargon, and it has to work without live support.</li>
          <li><strong>Every number shows its work.</strong> Invoice totals and report figures show how they were calculated, and the provider reviews and can adjust them before anything is exported.</li>
          <li><strong>Billing is deterministic code.</strong> No AI-generated billing decisions; manual adjustment lines wherever a total is computed.</li>
          <li><strong>Records for an accountant, not tax advice.</strong> It organizes income, expenses and reports; it never files taxes.</li>
          <li><strong>Minimum sensitive data.</strong> No medical details, photos or video, and each provider’s data is isolated at the database level.</li>
        </ul>
      </Chapter>

      <Chapter stage="Building" title="What I’ve built so far">
        <ul className="bullets">
          <li><strong>Attendance:</strong> check-in and check-out, with missing checkout times easy to spot and fix.</li>
          <li><strong>Families and billing:</strong> child and family records with family-specific billing agreements.</li>
          <li><strong>Bills and payments:</strong> a step-by-step bill builder with PDF invoices and sharing; payments linked to invoices with statuses and an audit trail.</li>
          <li><strong>Records and reports:</strong> expense tracking, monthly summaries and tax-ready reports for an accountant to review.</li>
          <li><strong>Onboarding:</strong> a guided, hands-on walkthrough that uses the real screens instead of a slideshow.</li>
        </ul>
        <p>
          A lot of the work has been deciding what to leave out. Each feature has to make sense to a
          provider who may not be comfortable with software, on a phone, at the end of a long day.
        </p>
      </Chapter>
    </ProjectLayout>
  )
}
