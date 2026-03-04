## Context

`TaskCard` in `KanbanBoard.tsx` currently uses a `PRIORITY_BG` map to apply a colored background tint (`bg-red-50`, `bg-yellow-50`, `bg-green-50`) to the card based on priority. This is the only visual indicator of priority on the card. The card body contains only the task title.

## Goals / Non-Goals

**Goals:**
- Remove the `PRIORITY_BG` map and its usage from `TaskCard`
- Add a small right-aligned colored pill badge showing the priority label inside the card body
- Cards with no priority set render with no badge and default background

**Non-Goals:**
- Changing the priority selector in the task detail drawer
- Adding priority sorting or filtering
- Changing badge colors used in the drawer (those are separate)

## Decisions

**Badge color palette mirrors drawer priority colors** — The drawer already defines `bg-red-100 text-red-700`, `bg-yellow-100 text-yellow-700`, `bg-green-100 text-green-700` (with dark variants). The card badge uses the same tokens for visual consistency, just smaller.

**Right-aligned via flex row with `justify-between`** — The card body becomes a flex row: title on the left, badge on the right. When no priority is set, the title simply fills the row.

**Inline constant, no abstraction** — The badge config is small enough to define inline in `TaskCard` without extracting a shared module.

## Risks / Trade-offs

- [Long titles may crowd badge] → Title truncates with `truncate` class; badge has a fixed small size
