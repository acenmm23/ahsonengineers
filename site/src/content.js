// Links and media used across the site. Photos live in site/public/media at two widths;
// originals are kept in media-originals/.

export const links = {
  email: 'ahsonmomin@gmail.com',
  github: 'https://github.com/acenmm23',
  instagram: 'https://www.instagram.com/ahsonmade/',
  betterkey: 'https://thebetterkey.com',
  flux: 'https://www.flux.ai',
  // Add when available. Anything left null is not rendered.
  linkedin: null,
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

// Hero cutout, used as supplied. `mask` marks only the dark hoodie pixels so the
// lettering can switch to light where it crosses the clothing. `cleanup` hides a few
// leftover background pixels from the cutout without editing the photo itself.
export const portrait = {
  src: '/media/portrait-cutout.webp',
  mask: '/media/portrait-hoodie-mask.png',
  cleanup: '/media/portrait-cleanup-mask.png',
  width: 1117,
  height: 1425,
}

export const projects = {
  betterkey: { href: '/projects/betterkey/', title: 'BetterKey' },
  ece118: { href: '/projects/ece118/', title: 'From Breadboard to Perfboard' },
}

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
