## Why

Task cards currently communicate priority through background color tints, which is a subtle visual that can be missed and conflicts with dark mode. Replacing the background color with an explicit colored priority badge that shows the priority label makes priority information immediately scannable and removes ambiguity.

## What Changes

- Remove the colored background tint from task cards (all cards use the default card background)
- Add a priority badge (colored pill with text label: "High", "Medium", "Low") to the task card, right-aligned
- Cards with no priority set show no badge and no background change

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `task-detail-drawer`: The `Task card background reflects priority` requirement changes — background tints are removed and replaced by an inline priority badge on the card

## Impact

- `app/(dashboard)/projects/[id]/KanbanBoard.tsx` — `TaskCard` component: remove `PRIORITY_BG` map and colored className, add right-aligned priority badge element
