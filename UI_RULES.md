# Make My Vid — UI & Redesign Rules

These guidelines MUST be strictly followed across all sections during the redesign:

## 1. Brand Color System
- **Section Background**: `#EAE3DB` (Signature Warm Beige) or `#F3EBDD` (Elevated Warm Beige).
- **Cinematic Media Stages**: Full-width `#0A0A0C` (Plain Dark Charcoal/Black) for media showcases (BTS sliders/showreels) with zero side-padding cutoffs.
- **Primary Typography & Contrast Surfaces**: `#141416` (Deep Indigo / Charcoal).
- **Body & Subtitle Copy**: `#33303E` / `#4A4658` (Refined Plum / Charcoal).
- **Hero Brand Accent**: `#7567EE` (Signature Make My Vid Lavender).
- **Secondary Punch Accent**: `#D5FF3F` (Electric Lime).
- **Contrasting Containers**: Use deep rich `#141416` for key visual frames/portraits against `#EAE3DB` background to provide cinematic depth and focus.

## 2. Typography & Layout Standards
- **Hero Stage Standard (Dumearts Pattern)**:
  - Outer rounded stage container (`rounded-[36px] sm:rounded-[48px] border border-[#141416]/12 bg-white/50 backdrop-blur-md`).
  - Viewfinder reticle brackets `[ ]` in Signature Lavender (`#7567EE`) enclosing massive condensed `ABOUT` text in `font-humane`.
  - Brand intro subtitle with accent dot.
  - Side-by-side metric stat cards with corner brackets (`10+ Years of Experience`, `250+ Clients & Brands Served`).
- **Story Section (Story Of Make My Vid)**:
  - Title: `STORY OF <span className="text-[#7567EE]">MAKE MY VID.</span>` placed **outside and above** the card box in a single left-aligned line on the canvas.
  - Image stage: Full container horizontal width (`w-full max-w-7xl mx-auto rounded-[32px] sm:rounded-[44px] overflow-hidden`) with spacious vertical height (`min-h-[540px] sm:min-h-[620px] lg:min-h-[700px]`).
  - Image background with strictly **20% dark overlay** (`bg-black/20`).
  - Scroll Reveal & Interaction: Ported directly from `<Expertise>` using `CustomEase.create("smoothSlideUp", ...)` and ScrollTrigger for a progressive slide-up reveal, plus interactive 3D mouse perspective tilt on hover.
  - No redundant eyebrow pills or bottom footer strips.
  - Narrative text: Positioned in the **lower marked zone** (`justify-end pb-8 sm:pb-12 pt-20 sm:pt-28`) with enhanced font size (`text-base sm:text-lg md:text-xl lg:text-[1.45rem]`) so it never collides with or blocks the background photo's `JOURNEY SO FAR` typography.
- **Section Headings**:
  - Always use genuine section titles from our web (e.g., `JOURNEY SO FAR.`, `DREAM TO ACHIEVE.`, `MAGIC BEHIND CAMERA.`, `OUR MEMBERS.`).
  - **Write headings in a single line** with strict **left alignment**.
  - Font: `font-heading font-black tracking-tight uppercase`.
  - Accent coloring on the final words (e.g., `OUR <span className="text-[#7567EE]">MEMBERS.</span>`).
- **Subheadings & Narrative Copy**:
  - Always use genuine real data from Rohan Joshi / Make My Vid.
  - Keep left-aligned and expanded across the column (avoid artificial narrow constraints like `max-w-xl` when there is space).
  - Position directly below the section heading.
- **Card Typography & Flow**:
  - Sizing: **Centered Mid-Slim with Natural Compact Height** (`max-w-4xl mx-auto` centered grid width, each card width ~420px with compact natural height `p-7 sm:p-9`, `rounded-[30px]`) — no artificial empty space voids.
  - Action button: Circular dark play button (`w-9 h-9 rounded-full bg-[#141416] text-white flex items-center justify-center`) placed at bottom-left.

## 3. Kinetic Typography Tickers & Member Showcases
- **Open Free Space**: Names tickers must sit freely in open space on the canvas with NO card border/box around them.
- **Font & Dark Contrast**: Use ultra-tall condensed **`Humane`** font (`font-humane uppercase leading-[0.8] text-7xl to text-9xl`). Must always be rendered in deep dark `#141416` (Deep Charcoal/Black) with high contrast against the warm beige background.
- **1:1 Image-Text Synchronization**:
  - Viewfinder reticle brackets `[ ]` and rolling column share the exact same container coordinate space (`translateY = (1 - activeIndex) * rowHeight`) ensuring 100% dead-center alignment on all screen sizes.
  - Member photos pre-rendered in a zero-latency opacity cross-fade stack so the left image and right name advance simultaneously at the exact millisecond.
- **Member Presentation**:
  - Left: Photo card + member's **Post / Designation only (NO BIO)**.
  - No counter pill badges (e.g. `08 / 14`) on photos.
  - No manual helper text (e.g. `Click any name to select`).
  - Automatic 3-second cycle.

## 4. Elements to NEVER Repeat (Forbidden Patterns)
- ❌ **DO NOT** add floating inline-flex pill tags (e.g. `FOUNDER • ROHAN JOSHI...`, `Guiding Tenets`, Webflow badges, `08 / 14` badges) above headings or on images unless explicitly requested.
- ❌ **DO NOT** add redundant scroll pill buttons (e.g. `(SCROLL)`).
- ❌ **DO NOT** create detached bottom container strips, separate indicator bars, or duplicate card frames.
- ❌ **DO NOT** use placeholder or dummy text from reference sites.
- ❌ **DO NOT** leave large empty voids inside cards with artificial `min-h` stretching.
- ❌ **DO NOT** split cohesive card descriptions into separate quote boxes.
- ❌ **DO NOT** add clutter text like "Click to expand" or "Auto-cycling" helpers.
- ❌ **DO NOT** add marquees (`<AboutMarquee>`) on the `/about` page — removed per user direction.
- ❌ **DO NOT** use faint or washed-out text for tickers — all names must be clearly legible dark `#141416`.
