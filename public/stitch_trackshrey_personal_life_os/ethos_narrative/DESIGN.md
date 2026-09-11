---
name: Ethos Narrative
colors:
  surface: '#fafaf3'
  surface-dim: '#dadad4'
  surface-bright: '#fafaf3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4ed'
  surface-container: '#eeeee7'
  surface-container-high: '#e8e9e2'
  surface-container-highest: '#e3e3dc'
  on-surface: '#1a1c18'
  on-surface-variant: '#43483e'
  inverse-surface: '#2f312d'
  inverse-on-surface: '#f1f1ea'
  outline: '#74796d'
  outline-variant: '#c3c8bb'
  surface-tint: '#486638'
  primary: '#061f00'
  on-primary: '#ffffff'
  primary-container: '#19350c'
  on-primary-container: '#7ea06b'
  inverse-primary: '#add198'
  secondary: '#3e6566'
  on-secondary: '#ffffff'
  secondary-container: '#bee7e8'
  on-secondary-container: '#42696a'
  tertiary: '#001d25'
  on-tertiary: '#ffffff'
  tertiary-container: '#00343f'
  on-tertiary-container: '#659fb1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c9edb2'
  primary-fixed-dim: '#add198'
  on-primary-fixed: '#062100'
  on-primary-fixed-variant: '#314e22'
  secondary-fixed: '#c1eaeb'
  secondary-fixed-dim: '#a5cecf'
  on-secondary-fixed: '#002021'
  on-secondary-fixed-variant: '#254d4e'
  tertiary-fixed: '#b1ecff'
  tertiary-fixed-dim: '#95cfe2'
  on-tertiary-fixed: '#001f27'
  on-tertiary-fixed-variant: '#014e5e'
  background: '#fafaf3'
  on-background: '#1a1c18'
  surface-variant: '#e3e3dc'
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Libre Caslon Text
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-data:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  container-margin: 20px
  card-gap: 16px
---

## Brand & Style

The design system is built for the "Sophisticated Quantified-Self"—a philosophy that treats personal data as a medium for self-actualization. It moves away from the aggressive, high-energy aesthetic of typical fitness trackers toward a "Life Operating System" that feels like a private digital study or a high-end personal planner.

The style is a hybrid of **Modern Corporate** precision and **Minimalist Editorial** flair. It leverages high-quality typography and structured data visualization to evoke a sense of calm, focused control. The emotional goal is to make the user feel like an architect of their own life: organized, professional, and quietly ambitious.

- **Visual Tone:** Grounded, intellectual, and rhythmic.
- **Style Pillars:** Heavy use of "Light Gray" for whitespace, deep oceanic greens for structural authority, and precise data markers for a gamified but mature feedback loop.

## Colors

This design system utilizes a nature-inspired, "dark academic" palette that signals privacy and depth.

- **Primary (Phthalo Green):** Used for headers, navigation backgrounds, and high-level brand elements. It provides the "weight" and foundation of the UI.
- **Secondary (Deep Space Sparkle):** The workhorse color for primary actions, buttons, and active states. It bridges the gap between the organic greens and the technical blues.
- **Tertiary/Highlight (Moonstone Blue):** Reserved for interactive highlights, data callouts, and secondary indicators. It provides a technical, "screen-like" pop against the matte background.
- **Success (Mustard Green):** Used exclusively for positive trends, completion states, and progress milestones, keeping the gamification grounded and sophisticated.
- **Background (Light Gray):** The primary canvas color. It is warm and tactile, reducing eye strain and making the app feel more like a physical journal than a glowing screen.

## Typography

The typographic strategy balances **authority** and **efficiency**.

1.  **Headlines (Libre Caslon Text):** Used for screen titles and major module headers. Its high-contrast serifs provide a literary, sophisticated feel.
2.  **Body & UI (Hanken Grotesk):** A sharp, contemporary sans-serif used for all functional text. It ensures high legibility in data-dense layouts.
3.  **Data & Metrics (JetBrains Mono):** Monospaced fonts are used for time-stamps, numerical metrics, and "quantified" data points to emphasize the analytical nature of the app.

Mobile considerations: For small screens, `display-lg` should scale down to `32px` to prevent excessive wrapping while maintaining its editorial impact.

## Layout & Spacing

The layout follows a **Fluid Grid** model optimized for handheld devices, emphasizing vertical rhythm and modularity.

- **Grid Model:** 4-column layout for mobile with a 16px gutter.
- **Spacing Rhythm:** Based on a 4px baseline unit. 16px (sm) is the standard padding for cards and containers, while 24px (md) is used to separate distinct logical sections.
- **Data Density:** Content should be grouped into "Contextual Clusters." Instead of long scrolling lists, use horizontally scrolling chips or summary cards to maximize the data visible above the fold.
- **Margins:** Consistent 20px side margins ensure that content doesn't feel cramped against the edges of physical device bezels.

## Elevation & Depth

This design system uses **Tonal Layering** combined with **Ambient Shadows** to create a subtle sense of physical stack.

1.  **Background:** The base layer is the Light Gray (#D5D3CC).
2.  **Containers:** Cards use a pure white (#FFFFFF) or a slightly lighter tint of the background to pop forward.
3.  **Shadows:** Shadows are highly diffused and low-opacity (e.g., `box-shadow: 0 4px 20px rgba(25, 53, 12, 0.08)`). By tinting the shadow with Phthalo Green instead of black, the depth feels organic and integrated into the color palette.
4.  **Interactive States:** Pressed states for buttons should remove the shadow and slightly scale down (0.98), providing a "tactile" click feel.

## Shapes

The shape language is **Rounded**, reflecting a modern, approachable take on professional tools.

- **Standard Radius (8px):** Used for input fields, small buttons, and selection chips.
- **Large Radius (16px):** Used for primary content cards and modal sheets.
- **Pill (100px):** Specifically reserved for progress bars and "Status" indicators to differentiate them from interactive buttons.
- **Iconography:** Icons should use a consistent 2px stroke weight with slightly rounded terminals to match the font geometry.

## Components

### Buttons
- **Primary:** Deep Space Sparkle background, white text, 8px radius.
- **Secondary:** Transparent background with a 1px Phthalo Green border.
- **Tertiary:** Text-only in Moonstone Blue for low-priority actions.

### Cards & Progress
- **The Metric Card:** Uses the 16px radius. Displays a headline in Libre Caslon Text and the metric in JetBrains Mono.
- **Progress Bars:** Use a dual-tone approach. The track is a 10% opacity version of the progress color. Mustard Green is used for "on-track" or "completed" metrics.

### Input Fields
- **Style:** Underlined or "Soft Box." Soft Box uses a Light Gray background slightly darker than the page background with an 8px radius. Focus state is indicated by a Moonstone Blue border.

### Selection & Control
- **Chips:** Small, rounded-pill shapes used for filtering. Active state uses Phthalo Green with white text; inactive uses Light Gray with Deep Space Sparkle text.
- **Toggle Switches:** Use a tactile, physical slider metaphor, utilizing the secondary color for the "On" state.

### Navigation
- **Bottom Bar:** Phthalo Green background with Moonstone Blue active-state icons. Labels should be small and use `label-caps` typography.