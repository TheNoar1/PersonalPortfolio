# Implementation Plan: Editorial/Magazine Transformation (Elena Voss Style)

Transform the current portfolio into an art-directed, asymmetrical magazine layout while maintaining the Vintage Paper theme and existing typography.

## 1. HTML Changes
- **Hero Section**: 
    - Wrap `.hero-content` in a `.hero-layout-wrapper` to allow for absolute positioning of children.
    - Add a `.status-label` (micro-copy) above the main heading (e.g., "EST. 2024 / BASED IN [CITY]").
- **About Section**: 
    - Add wrapper divs around `.about-text` and `.about-visual` to allow for offsets and bleeding.
    - Add a `.section-label` (e.g., "01 // BIOGRAPHY").
- **Projects Section**: 
    - Add `.project-meta` (category, year) to each `.project-card`.
    - Wrap the `.projects-grid` in a `.projects-editorial-container`.

## 2. CSS Changes

### Global Typography
- Create a new utility class `.text-tiny` for micro-labels (0.6rem - 0.75rem, uppercase, wide letter-spacing).
- Create a new utility class `.text-massive` for editorial headlines (extreme scale).

### Hero Layout (`css/sections.css`)
- Change `.hero` from `justify-content: center` to a relative container.
- Update `.hero-content` to use asymmetrical positioning.
- Implement overlapping text effects where the headline and sub-headline partially intersect or are offset by specific percentages.

### About Layout (`css/sections.css`)
- Replace the 2-column grid with a **12-column CSS Grid** layout.
- Position `.about-text` in columns 2-6 and `.about-visual` in columns 7-12.
- Implement "bleeding" for the image: allow it to overflow the container or shift slightly off-axis.
- Use columnar text for the paragraphs (`column-count: 2` for larger screens).

### Projects Layout (`css/sections.css`)
- Remove `grid-auto-rows: 250px` from `.projects-grid`.
- Transition to a **variable rhythm layout**:
    - Use `grid-auto-flow: dense`.
    - Assign variable `grid-column` and `grid-row` spans to cards (e.g., some span 2 columns, some span 3 rows).
    - Implement absolute positioning for `.project-meta` to overlap the card edges.

## 3. Design Verification
- **The "Broken" vs "Editorial" Check**:
    - Ensure a strong vertical axis exists (consistent left/right margins for labels).
    - Maintain a clear visual hierarchy (massive headlines $\rightarrow$ medium sub-headlines $\rightarrow$ tiny labels).
    - Use whitespace (negative space) intentionally to guide the eye.
    - Ensure responsiveness: the asymmetrical layout should collapse into a structured single column on mobile without losing the typographic contrast.

## 4. Implementation Sequence
1. **Step 1**: Define typographic utilities in `css/main.css`.
2. **Step 2**: Modify `index.html` structure.
3. **Step 3**: Update `.hero` styles in `css/sections.css`.
4. **Step 4**: Update `.about` to 12-column grid in `css/sections.css`.
5. **Step 5**: Update `.projects-grid` to variable rhythm in `css/sections.css`.
6. **Step 6**: Final polish on offsets and absolute positioning.
