// Links, media and the project list used across the site. Photos live in
// site/public/media at two widths; originals are kept in media-originals/.

export const links = {
  email: 'ahsonmomin@gmail.com',
  github: 'https://github.com/acenmm23',
  instagram: 'https://www.instagram.com/ahsonmade/',
  linkedin: 'https://www.linkedin.com/in/ahsonmomin',
  betterkey: 'https://thebetterkey.com',
  littleledger: 'https://littleledger.app',
  flux: 'https://www.flux.ai',
  // Add when available. Anything left null is not rendered.
  resume: null,
}

const photo = (name, widths, width, height) => ({
  src: `/media/${name}-${widths[widths.length - 1]}.jpg`,
  srcSet: widths.map((w) => `/media/${name}-${w}.jpg ${w}w`).join(', '),
  width,
  height,
})

export const media = {
  betterkeyCad: photo('betterkey-cad', [1440, 800], 1440, 720),
  betterkeyV1V4: photo('betterkey-v1-v4', [1500, 800], 1500, 1000),
  betterkeyPrints: photo('betterkey-prints', [1320, 800], 1320, 700),
  perfboard: photo('ece118-perfboard', [1258, 800], 1258, 877),
  labOverhead: photo('lab-overhead', [1206, 700], 1206, 1706),
}

// Hero cutout, used as supplied. `cleanup` hides a few leftover background pixels and
// softens two flat edges of the cutout without editing the photo itself.
export const portrait = {
  src: '/media/portrait-cutout.webp',
  cleanup: '/media/portrait-cleanup-mask.png',
  width: 1117,
  height: 1425,
}

// Selected Work, in display order. Adding a project = adding an entry here plus its
// page in ProjectPages.jsx and an HTML entry under site/projects/.
export const projects = [
  {
    slug: 'betterkey',
    href: '/projects/betterkey/',
    title: 'BetterKey',
    category: 'Hardware Product Development',
    disciplines: ['Mechanical Design', 'Embedded Systems', 'Rapid Prototyping'],
    summary:
      'A retrofit for the deadbolt you already have, operated by a dedicated RF key fob while the existing lock and key keep working by hand. The hard part is physical: packing a motor, batteries and electronics onto the back of a door, which has meant moving from rough, oversized prototypes toward a compact enclosure.',
    status: 'Prototypes built and tested on a rig; compact enclosure in development.',
    image: media.betterkeyPrints,
    alt: 'Printed BetterKey enclosures from several iterations on a desk, with a gearmotor, battery pack and calipers',
  },
  {
    slug: 'ece118',
    href: '/projects/ece118/',
    title: 'Analog Beacon Detector',
    category: 'Analog Circuit Design & Signal Conditioning',
    disciplines: ['From Breadboard to Perfboard', 'ECE 118'],
    summary:
      'A single-supply circuit that picks a 2 kHz infrared beacon out of room light: transimpedance front end, eight band-pass stages, a precision peak detector and a comparator with hysteresis. Debugged on a breadboard, then rebuilt by hand on perfboard and brought up stage by stage.',
    status: 'Built on perfboard; stage gains measured after debugging.',
    image: media.perfboard,
    alt: 'Hand-soldered perfboard with four quad op-amp chips in a row, filter components, a screw-terminal power input and a green LED',
  },
  {
    slug: 'little-ledger',
    href: '/projects/little-ledger/',
    title: 'Little Ledger',
    category: 'iOS App Development & Product Strategy',
    disciplines: ['SwiftUI', 'Web Development', 'Customer Discovery'],
    summary:
      'Built for a problem close to home. Little Ledger simplifies attendance, billing and records for small home daycare providers, shaped by watching my mom run hers and by conversations with other providers.',
    status: 'In active development.',
    visual: 'little-ledger',
  },
]

export const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]))

// Door-test footage. `chapter` places each clip in the BetterKey story: 'now' for the
// current mechanical version (shown first), 'v1' for the original prototype.
export const betterkeyVideos = [
  {
    chapter: 'v1',
    src: '/media/betterkey-v1-door.mp4',
    poster: '/media/betterkey-v1-door-poster.jpg',
    width: 2160,
    height: 3840,
    label: 'Video · V1',
    caption: 'V1 on a wooden test rig, with the electronics still spread across the bench.',
  },
]
