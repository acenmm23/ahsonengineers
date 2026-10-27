// All project content lives here. Add a project by adding an entry to `projects`.
import betterKeyImg from './assets/betterkey-key.webp'

export const featured = {
  no: 'AM-01',
  name: 'theBetterKey',
  line: 'A button on your key. A motor on your deadbolt.',
  summary:
    'A retrofit for the deadbolt you already own. Press a button on your key while you walk up, and the deadbolt turns. No app, no account, no Wi-Fi, no subscription. The physical key keeps working exactly as it did.',
  status: 'Prototyping',
  role: 'Founder. Product, electronics, CAD and web.',
  spec: [
    ['Problem', 'Smart locks put an app, an account and often a monthly plan between you and your own front door.'],
    ['Constraint', 'Keep the existing deadbolt and key. Nothing about normal entry can go away.'],
    ['Approach', 'A dedicated button on the key and a motor unit on the thumbturn. Access stays local.'],
    ['Built with', 'Electronics prototyping, CAD, 3D printing, React'],
  ],
  link: { href: 'https://thebetterkey.com', label: 'thebetterkey.com' },
  image: betterKeyImg,
  imageAlt: 'theBetterKey key with its built-in button',
}

export const projects = [
  {
    no: 'AM-02',
    name: 'Accessory Dwelling Unit',
    discipline: 'Architecture & structure',
    tools: 'Revit',
    summary:
      'Full architectural and structural design for a backyard dwelling unit, done under strict city regulations.',
    points: [
      'Started from the code: setbacks, height limits and structural requirements set the envelope before any layout.',
      'Iterated the plan each time two constraints conflicted, rather than designing first and fixing later.',
      'Produced the architectural and structural model in Revit.',
    ],
  },
  {
    no: 'AM-03',
    name: 'Bruin AI / SlugAI',
    discipline: 'Product & UX',
    tools: 'Product design, systems planning',
    summary:
      'Product design and system planning for AI tools built for students.',
    points: [
      'Shaped how the tools are structured and how students move through them.',
      'Weighed usability against what could actually be deployed and maintained.',
    ],
  },
]

export const capabilities = [
  ['Electrical', 'Electronics prototyping, microcontrollers, motor control, bench testing'],
  ['Mechanical', 'CAD in Onshape and Fusion 360, enclosure design, 3D printing'],
  ['Architecture', 'Revit, code-compliant residential design'],
  ['Software', 'React, Vite, HTML, CSS, JavaScript'],
  ['Product', 'System-level design, technical documentation, building in public'],
]

export const contact = {
  email: 'ahsonmomin@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/acenmm23' },
    { label: 'Instagram', href: 'https://instagram.com/ahsonmade' },
    { label: 'theBetterKey', href: 'https://thebetterkey.com' },
  ],
}
