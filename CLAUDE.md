# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal portfolio website for Sujal Dhungana, a Data Engineer specializing in DataOps and MLOps. The site showcases projects, ventures, skills, and provides hiring/contact information.

## Tech Stack (Latest Versions)

- **Framework**: React 18.3.1 + TypeScript 5.9.3
- **Build Tool**: Vite 7.3.1
- **Styling**: Tailwind CSS 4.2.0 (with @tailwindcss/postcss)
- **Component Library**: NextUI 2.6.11 ⚠️ *DEPRECATED* - migrate to @heroui in the future
- **Routing**: React Router 7.13.0
- **Animation**: Framer Motion 12.34.2
- **Icons**: Lucide React 0.575.0
- **SEO**: React Helmet Async 2.0.5
- **Carousel**: Swiper 12.1.2
- **Linting**: ESLint 10.0.0 with latest plugins
- **Linting Plugin**: eslint-plugin-react-hooks 7.1.0 (canary - needed for ESLint 10 support)

## Latest Package Update (Feb 2026 - Clean Slate)

### Strategy: All Latest Versions
Built from clean slate, adding packages one-by-one with `@latest` to minimize bloat and vulnerabilities.

### Production Dependencies (All Latest - 0 vulnerabilities):
- React 18.3.1 - Still stable choice (React 19 has compatibility issues)
- React Router 7.13.0 - Latest router with new APIs
- Framer Motion 12.34.2 - Latest animation library
- Lucide React 0.575.0 - Latest icons
- Swiper 12.1.2 - Latest carousel
- React Helmet Async 2.0.5 - SEO metadata
- NextUI 2.6.11 - ⚠️ Deprecated (use @heroui/react for new projects)

### Development Dependencies (All Latest):
- **ESLint 10.0.0** - Latest linter (canary react-hooks plugin for compatibility)
- **TypeScript 5.9.3** - Latest language
- **Vite 7.3.1** - Latest build tool
- **Tailwind CSS 4.2.0** - Requires @tailwindcss/postcss plugin
- **TypeScript-ESLint 8.56.0** - Latest TS linting

### Security Notes
**Total Vulnerabilities: 12 (dev-only, cannot be reduced)**
- 5 moderate: ajv ReDoS in ESLint's @eslint-community/eslint-utils
- 7 high: minimatch ReDoS in TypeScript-ESLint's typescript-estree
- These are known issues in the open-source ESLint ecosystem
- ESLint doesn't use the vulnerable code paths - safe for development
- Production builds contain 0 vulnerabilities (dev deps not shipped)

### Future Migrations
1. **@nextui-org → @heroui**: Deprecated warning on all NextUI packages
   - HeroUI 2.8.9 is available as replacement
   - Plan migration for next major version bump
2. **ESLint vulnerabilities**: Monitor upstream for fixes in ajv/minimatch

## Common Commands

```bash
# Start development server (runs on http://localhost:5173 by default)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint all files
npm run lint

# Update all packages to latest versions
npm update

# Audit security vulnerabilities
npm audit
```

## Architecture

### Directory Structure

```
src/
├── pages/           # Full page components (routes) - presentation only
│   ├── HomePage.tsx
│   ├── HireMePage.tsx
│   └── VenturesPage.tsx
├── components/      # Reusable, data-agnostic UI components
├── data/           # Single source of truth for all content/configuration
├── config/         # App-wide constants (colors, theme, etc.)
├── App.tsx         # Main app with routing setup
└── main.tsx        # React entry point
```

### Core Architectural Principles

**ALL implementations MUST strictly follow these principles:**

#### 1. MODULAR COMPONENT ARCHITECTURE WITH COMPLETE DATA SEPARATION
- **Pages**: Presentation-only containers that compose section components
- **Components**: Fully data-agnostic, accept data via props, NOT import data directly
- **Data**: Single source of truth in `src/data/` - components consume, never import directly
- **Exception**: Only Page components can import data files; Section/UI components must receive data as props

**Example - CORRECT:**
```tsx
// ✅ Component receives data via props
function ProjectCard({ project }: { project: Project }) {
  return <div>{project.title}</div>;
}

// ✅ Page imports data and passes to component
export function HomePage() {
  return <ProjectCard project={projects[0]} />;
}
```

**Example - INCORRECT:**
```tsx
// ❌ Component importing data directly
import { projects } from '../data/projects';
function ProjectCard() {
  return <div>{projects[0].title}</div>; // BAD - couples component to data
}
```

#### 2. MAXIMUM REUSABILITY - ZERO DUPLICATION
- Every UI pattern that appears more than once must be extracted to a reusable component
- Do NOT duplicate layout logic, styling patterns, or data display logic across components
- Analyze existing components before creating new ones
- If you find similar code in HomePage and HireMePage, refactor into a shared component

Current violations to address:
- Timeline visualization appears inline in HomePage AND as InteractiveTimeline component
- Color scheme hardcoding (`#3ec1d3`, `#2596be`, etc.) throughout files - must use `src/config/theme.ts`
- PassionSection has hardcoded content instead of using data files
- Achievement cards, role cards, timeline styling could be extracted into reusable components

#### 3. DARK MODE MANDATORY FOR ALL NEW COMPONENTS
- EVERY component MUST support light AND dark mode by default
- Use `dark:` Tailwind prefix for ALL color/background values
- Test all components in both themes before committing
- Use consistent dark mode color variants:
  - Primary brand color light mode: `#3ec1d3`
  - Primary brand color dark mode: `#2a8591`
  - Background light: `bg-white`
  - Background dark: `dark:bg-gray-800` (or gray-900 for sections)
  - Text light: `text-gray-900`
  - Text dark: `dark:text-gray-100`

**Example - CORRECT:**
```tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4">
  <h3 className="text-[#3ec1d3] dark:text-[#2a8591]">Title</h3>
</div>
```

**Example - INCORRECT:**
```tsx
<div className="bg-white p-4"> {/* Missing dark mode */}
  <h3 style={{color: '#3ec1d3'}}>Title</h3> {/* Hardcoded color */}
</div>
```

### Data Organization

Static content in `src/data/` files (single source of truth):
- `profileContent.ts` - Hero sections, page titles, descriptions
- `projects.ts` - Project cards and portfolio items
- `skills.ts` - Skills by category
- `ventures.ts` - Venture/business information
- `timelineEvents.ts`, `featuredContent.ts` - Career timeline
- `speakingEngagements.ts`, `blogPosts.ts` - Speaking and blog content
- `certifications.ts`, `keyAchievements.ts`, `currentRoles.ts` - Profile information

**RULE**: When updating portfolio content, ONLY modify data files. Never hardcode content in components.

### Theme & Configuration

Create `src/config/theme.ts` to centralize:
```tsx
export const THEME = {
  colors: {
    primary: { light: '#3ec1d3', dark: '#2a8591' },
    secondary: { light: '#2596be', dark: '#1a6b85' },
    // ... other colors
  },
  spacing: { /* ... */ },
  typography: { /* ... */ },
};
```

Import and use throughout components to eliminate hardcoded color duplication.

### Component Reusability Patterns

**Section Components** (e.g., ProjectsSection, SkillsSection):
- Accept data array as prop: `<ProjectsSection projects={projects} />`
- Handle only presentation logic
- Never import data files
- Compose smaller reusable components within them

**Card Components** (e.g., ProjectCard, SkillCard):
- Single item responsibility
- Fully customizable via props
- Independent dark mode support
- Example:
  ```tsx
  interface ProjectCardProps {
    project: Project;
    onClick?: () => void;
    className?: string;
  }
  ```

### SEO & Helmet

The site uses `react-helmet-async` for dynamic meta tags. Each page component should include SEOHelmet:
```tsx
<SEOHelmet
  title="Page Title"
  description="Page description"
  url="https://sujaldhungana.com/page"
/>
```

### Styling Rules

- **Use Tailwind CSS exclusively** for styling (no inline styles or CSS modules)
- **Dark mode prefix** (`dark:`) required on ALL color and background utilities
- **Never hardcode colors** - use theme constants from `src/config/theme.ts`
- **Responsive design** - use Tailwind's responsive prefixes (sm:, md:, lg:, xl:)
- **Custom CSS** only for animations or Swiper-specific styles in `src/index.css`
- NextUI components styled via className, never with style prop

## Development Workflow

### Adding New Content
1. Add data to appropriate file in `src/data/` with TypeScript interfaces
2. Verify data structure matches component expectations
3. Update component or use existing one

### Creating New Components
**BEFORE creating a component:**
1. Check if similar component exists
2. Consider extracting reusable sub-components
3. Plan props interface for maximum reusability
4. Include dark mode support from the start
5. Never import data files

**Component checklist:**
- [ ] Accepts all content via props
- [ ] Has TypeScript interfaces for props
- [ ] Includes `dark:` classes for all colors/backgrounds
- [ ] Responsive design implemented
- [ ] Animations smooth and performant
- [ ] No hardcoded strings (use props)
- [ ] Composable with other components

### Adding New Pages
1. Create page component in `src/pages/`
2. Import section components
3. Import and pass data from `src/data/`
4. Add route to `App.tsx`
5. Update Navbar navigation in `src/components/Navbar.tsx`
6. Add SEOHelmet to page

## Critical Rules (Non-Negotiable)

⚠️ **SECURITY**:
- NEVER commit hardcoded API keys, tokens, or credentials
- ContactSection currently contains exposed Mailchimp credentials (MUST FIX)
- Move all API endpoints and auth to environment variables
- Validate all form inputs before submission

⚠️ **DATA SEPARATION**:
- No component can directly import from `src/data/` except Pages
- Section components MUST receive data via props
- Enforce this pattern consistently

⚠️ **DARK MODE**:
- Every new component MUST include dark mode styles
- Test in both light and dark modes before committing
- Use `dark:` prefix consistently

⚠️ **DUPLICATION**:
- No duplicate code, logic, or styling patterns
- Extract common patterns to utilities or components
- Refactor before committing large changes

⚠️ **NO INLINE STYLING**:
- Use Tailwind classes ONLY
- No style prop, no CSS-in-JS
- Exceptions: Swiper, Framer Motion configuration

⚠️ **PACKAGE DEPENDENCIES**:
- ALWAYS use the latest stable version of any package in use
- Regularly run `npm update` and `npm audit fix` to stay current
- When upgrading packages, verify compatibility and test thoroughly
- Check for breaking changes and security vulnerabilities before deploying
- Never use outdated packages unless there's a documented, justified reason

## Key Files to Know

- `index.html` - Entry HTML with meta tags and structured data
- `App.tsx` - Main router configuration
- `src/config/theme.ts` - Centralized theme constants (CREATE THIS)
- `tailwind.config.js` - Tailwind configuration with NextUI
- `eslint.config.js` - ESLint rules configuration
- `vite.config.ts` - Vite bundler configuration
- `tsconfig.app.json` - App-specific TypeScript config

## Common Patterns

### Reusable Section Component
```tsx
interface SectionProps {
  items: DataItem[];
  title?: string;
  className?: string;
}

export function ItemSection({ items, title, className }: SectionProps) {
  return (
    <section className={`py-16 bg-white dark:bg-gray-800 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4">
        {title && <h2 className="text-3xl font-bold mb-8">{title}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(item => <ItemCard key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  );
}
```

### Dark Mode Safe Card
```tsx
<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
  <h3 className="text-gray-900 dark:text-gray-100 font-bold mb-2">{title}</h3>
  <p className="text-gray-600 dark:text-gray-400">{description}</p>
</div>
```

## Testing Before Commit

- [ ] Run `npm run lint` - must pass without errors
- [ ] Test all components in light mode
- [ ] Test all components in dark mode (use Navbar toggle)
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Verify no console errors or warnings
- [ ] Check that component data flows correctly from data files through pages
