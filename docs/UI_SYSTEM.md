# IUGM UI System

## Reference design
The public site follows the design system of the University of Mahajanga's EDEN portal (https://eden.mahajanga-univ.mg/, source: `GasyCoder/eden-app`), so that both sites read as one family: Inter, white surfaces alternating with light grey sections, a dark announcement bar above a light sticky navbar, a two-column hero, thin-bordered cards (radius 14 px), and a bottom tab bar on mobile.

Only the structure and style are shared. Colors come from the IUGM logo (blue primary, green accent), and EDEN features that would be misleading here stay out: newsletter forms, online application, language switch without translations.

## Components
Build the interface from shadcn-vue components (`frontend/app/components/ui`) with their standard look and proportions. Forms use `Card`, `Field`, `Input` and `Select`, not native selects or custom panels. Adapt tokens and colors only.

After adding a component with the CLI, restart `npm run dev`, and check `main.css` and `package.json`: the CLI may add an external font import or bump dependencies.

## Direction
The visual language should communicate:
- institutional credibility;
- business/management professionalism;
- youth and dynamism;
- employability and entrepreneurship;
- Mahajanga/Madagascar identity without clichés.

## Brand colors
Final values must be extracted from the official IUGM logo.

Until then:
- blue = primary;
- green = secondary accent;
- neutral/light surfaces = dominant;
- do not freeze arbitrary final HEX values.

## Suggested semantic tokens
```text
background
foreground
surface
surface-muted
border
primary
primary-foreground
secondary
secondary-foreground
accent
accent-foreground
muted
muted-foreground
success
warning
danger
```

## Visual balance
Approximate:
- 60–70% neutral/light surfaces;
- 20–25% blue;
- 5–10% green accent.

## Style
Use generous whitespace, clear typography, authentic IUGM photography, simple card grids, restrained motion, and clear CTAs.

Avoid generic university templates, excessive gradients/shadows, SaaS-dashboard styling on public pages, fake statistics, and AI-generated student portraits as final institutional content.

## Accessibility
- semantic landmarks;
- keyboard navigation;
- visible focus;
- sufficient contrast;
- reduced-motion support;
- accessible forms and error states.

## Institutional content
Never invent official facts.

Public pages carry no `À CONFIRMER` labels (project owner's decision, November 2026). Instead:
- facts from IUGM brochures display normally, with one source line in the footer;
- missing facts are simply left out, or point the reader to the Institute;
- mock content (testimonials, prototype news, partner logos, unsourced contacts) stays hidden until validated. The verification `status` remains in the data, and `verify:static` rejects any provisional mention in the generated HTML.
