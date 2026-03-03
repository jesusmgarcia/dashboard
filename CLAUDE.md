# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16.1.6 dashboard application using the App Router, React 19, TypeScript, and Tailwind CSS v4.

## Development Commands

```bash
npm run dev    # Start development server (http://localhost:3000)
npm run build  # Create production build
npm start      # Start production server
npm run lint   # Run ESLint
```

## Architecture

### Framework & Routing

- **Next.js App Router**: File-based routing via the `app/` directory
- `layout.tsx` files define layouts; `page.tsx` files define routes
- Components are Server Components by default — add `"use client"` only when interactivity requires it

### Styling

- **Tailwind CSS v4**: No `tailwind.config.js` — configuration lives in `app/globals.css` inside `@theme inline` blocks
- PostCSS plugin is `@tailwindcss/postcss`; CSS entry point is `@import "tailwindcss";`
- **Dark mode** is class-based (`@custom-variant dark (&:is(.dark *))`) — toggled by adding the `.dark` class to the HTML element, not via `prefers-color-scheme`
- Design tokens use the **oklch color space** and are defined as CSS custom properties (e.g., `--primary`, `--background`, `--sidebar-*`, `--chart-*`)
- Animations provided by `tw-animate-css`

### shadcn/ui

- Add components with `npx shadcn add [component]` — they are copied into `components/ui/`
- Utility stack: `clsx` + `tailwind-merge` (via `cn()` helper), `class-variance-authority` for variant styling, `lucide-react` for icons, `radix-ui` for headless primitives

### TypeScript Configuration

- Strict mode enabled
- Path alias: `@/*` maps to the project root
- Target: ES2017
- Module resolution: bundler

### Fonts

- Geist Sans and Geist Mono loaded via `next/font/google`
- Font variables: `--font-geist-sans` and `--font-geist-mono`

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
