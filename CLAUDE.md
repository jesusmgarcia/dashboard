# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16.1.6 dashboard application using the App Router, React 19, TypeScript, and Tailwind CSS v4.

## Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Create production build
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture

### Framework & Routing
- **Next.js App Router**: Uses the `app/` directory structure for file-based routing
- Routes are defined by folder structure within `app/`
- `layout.tsx` defines the root layout with Geist font configuration
- `page.tsx` files define route pages

### Styling
- **Tailwind CSS v4**: Uses the new PostCSS-based architecture
- No `tailwind.config.js` file - configuration is done inline in CSS using `@theme inline`
- Global styles and CSS variables are defined in `app/globals.css`
- Theme colors use CSS custom properties: `--background` and `--foreground`
- Supports dark mode via `prefers-color-scheme`

### TypeScript Configuration
- Strict mode enabled
- Path alias: `@/*` maps to the project root
- Target: ES2017
- Module resolution: bundler

### Fonts
- Geist Sans and Geist Mono loaded via `next/font/google`
- Font variables: `--font-geist-sans` and `--font-geist-mono`

## Project Structure

```
app/
  layout.tsx     - Root layout with font and metadata configuration
  page.tsx       - Home page
  globals.css    - Global styles and Tailwind CSS imports
eslint.config.mjs - ESLint configuration using next/core-web-vitals and next/typescript
next.config.ts   - Next.js configuration
postcss.config.mjs - PostCSS configuration for Tailwind CSS v4
tsconfig.json    - TypeScript compiler options
```

## Key Conventions

### Imports
- Use `@/` path alias for imports from the root directory
- Example: `import Component from "@/app/components/Component"`

### Component Structure
- Server Components by default (React Server Components)
- Add `"use client"` directive only when client-side interactivity is required
- Prefer colocation of related components near their usage

### Styling Patterns
- Use Tailwind utility classes directly in JSX
- Dark mode classes use `dark:` prefix
- Custom colors reference CSS variables: `bg-background`, `text-foreground`

## Tailwind CSS v4 Notes

This project uses Tailwind CSS v4, which has significant differences from v3:
- Configuration is done inline in CSS using `@theme inline` blocks
- No separate `tailwind.config.js` file
- PostCSS plugin is `@tailwindcss/postcss`
- CSS import is `@import "tailwindcss";` (not separate base/components/utilities)
