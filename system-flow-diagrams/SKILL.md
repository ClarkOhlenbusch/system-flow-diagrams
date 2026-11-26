---
name: system-flow-diagrams
description: Create or edit interactive system flow diagrams in a standalone HTML file. Use when asked to visualize software architecture, API request flows, service communication, or event-driven workflows with draggable components, labeled arrows, and step-by-step playback.
license: MIT
compatibility: Requires filesystem access to copy and edit the starter. Viewing diagrams requires a browser and internet access for CDN-hosted libraries and fonts.
---

# System-flow diagrams

Create a diagram the presenter can move and step through. Start from [assets/starter.html](assets/starter.html), which already implements the interactions. Deliver one HTML file.

## Copy, then edit

1. Copy the starter to the output path using a filesystem operation. Do not regenerate the whole file.
2. Read only the section between `// BEGIN DIAGRAM DATA` and `// END DIAGRAM DATA`. For edits to an existing diagram, read its corresponding definitions.
3. Patch the system-specific definitions, preserving the interaction/rendering code:
   - `INITIAL_NODES`: stable IDs, short titles/subtitles, icons, x/y positions, widths, and colored role badges.
   - `INITIAL_ENVELOPES`: boundary titles, colors, x/y positions, and fitted widths/heights.
   - `STORYBOARD_STEPS`: short dock labels, active messages, their endpoints/ports/colors, and highlighted node IDs.
4. Inspect the result. Read individual helpers only if the requested change needs them; do not load or rewrite the full runtime for ordinary content edits.

Use actual architecture facts. For a new system, replace all sample nodes, boundaries, messages, and steps. A message has `from`, `to`, `label`, `color`, `srcPort`, and `dstPort`; optional `reach` changes curve separation. Copy the existing field conventions rather than introducing a new schema.

For initial composition or a crowded phase, consult [references/layout.md](references/layout.md). A simple text change does not need that full guide.

## Preserve the visual and interaction contract

- A subtle 24px dotted mesh, compact white cards, semantic color badges, and softly tinted labeled boundaries.
- Independently movable cards; their wires, labels, dots, and arrowheads follow them at every zoom.
- On touchscreens, two fingers pinch to zoom around their midpoint and pan the canvas. One finger can pan empty canvas or move a card. Adding/removing a finger must not unexpectedly move a card or jump the view. Keep the dock horizontally swipeable with reachable touch targets and safe-area spacing.
- Boundaries move independently of cards. Their headers/borders drag; their lower-right corners resize.
- Curved directed wires with separate ports for request/response paths. Every message has a visible white label chip coordinated with its wire color.
- A deliberate initial layout: no overlapping cards or labels, wires through unrelated cards, crowded boundary headings, or clipped content. Dragging is for presentation, not initial repair.
- Only the current phase's wires are shown. Cards keep their positions as the flow advances. The overview normally shows the map without wires.
- A small bottom dock: Map, short phase buttons, previous/next, and Fit. Keep Space/arrow navigation, numeric step selection, R reset, F fit, and zoom. Do not add an application shell or other panels unless requested.

The shared runtime already provides multi-touch pinch/pan, pointer capture, scale-aware movement, live port-based curves, label sizing, reduced-motion support, and fit-to-content including routes. Preserve those improvements and the dynamic-height mobile viewport.

## Targeted implementation work

When a behavior change is required, locate its helper rather than reading the whole file: `handleTouchStart` / `handleTouchMove` / `handleTouchEnd`, `startDrag` / pointer handlers, `getNodeDimensions`, `getAnchorPoint`, `getLabelBoxWidth`, `getLinkGeometry`, `fitView`, or the bottom dock/keyboard handler. Use computed card sizes for ports and envelope fit. Label sizing must include the actual displayed arrow and message number. Keep reset definitions and numeric step limits consistent with the new data.

Do not minify authoring code. Do not introduce a package, CLI, build pipeline, or separate rendering framework for an ordinary diagram.

## Verify and deliver

Check IDs/endpoints, actual card dimensions, boundary padding, and every phase's labels/routes, especially the busiest phase. Test dragging after pan/zoom, independent boundary move/resize, step navigation with manual positions retained, and reset. Inspect at presentation size and a smaller laptop viewport when a browser is available.

Also test a narrow phone in portrait and landscape: pinch starting over a card, move the two fingers together, lift one and continue panning, and swipe/tap the dock. Touch zoom must work from the initial Fit scale, even below 0.3. Emulated touch testing does not establish behavior on a physical iPhone or Android device; distinguish those checks when reporting verification.

If browser inspection is unavailable, check source/geometry and report the visual/interaction verification limit. Do not call an unviewed diagram visually verified.

Open the HTML directly; no build/server is required. It uses CDN-hosted React, ReactDOM, Babel, Tailwind, and fonts, so an internet connection is needed. Offline delivery is a separate requested adaptation. Deliver a short file link and navigation instructions.
