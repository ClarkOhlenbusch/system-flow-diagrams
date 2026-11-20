# Layout and routing

Use this guide when composing a new system map or fixing a crowded phase. Ordinary text edits can stay in the starter's data section.

## Compose the map

Place actors and service families in meaningful lanes: often callers on the left, identity/control services above or toward the middle, and execution/targets to the right. Follow the system rather than forcing a fixed column count. Keep component positions stable across phases.

Size cards from their actual content before choosing positions. The starter's `getNodeDimensions` accounts for title, subtitle, badge, and ID footer. Nominal `width` is a minimum; long badges can widen a card. Ports, envelopes, and route checks must use the computed width and height.

Widths around 240–280 units, horizontal gaps around 160–220 units, and vertical clearances around 80–140 units are starting points. Budget for the actual labels that must fit between cards, rather than choosing spacing solely from card rectangles. Align comparable services and leave clear corridors for the busiest phase.

The mesh is a spatial guide. Do not lock objects into cells or prevent manual repositioning.

## Color explains meaning

Use color consistently for roles or message types. The starter uses indigo for the caller, amber for identity, cyan for gateway requests, violet for payment, emerald for success, and rose for notifications. Adapt those meanings deliberately to the system.

Colored badges distinguish services without filling whole cards with saturated color. Label-chip borders and arrowheads follow their wire color. A successful response can be emerald while its request uses the relevant service color. Direction and text must remain understandable without color alone.

## Make every message legible

Each arrow is a specific communication. Use a short action label such as `Create order` or `Return token`. Put method/path information in the label only when necessary to identify the action.

The starter numbers messages within a phase. Its chip sizing includes that number and the direction glyph. Measure the actual displayed string; approximately 6.4px per mono character unit plus 24px padding is the starting estimate, with extra width for wide characters. Verify the rendered text when possible.

Use side/sub-side ports to separate paths:

- `left`, `leftTop`, `leftBottom`, `right`, `rightTop`, `rightBottom`
- `top`, `topLeft`, `topRight`, `bottom`, `bottomLeft`, `bottomRight`

The curve control points extend along the selected port normals. An optional link `reach` adjusts their distance. Parallel request/response links need distinct ports and enough room for their chips. Do not put two full-width chips into a corridor that only fits one.

Evaluate each phase's active links against all cards and boundary headings. Avoid wire crossings, routes through unrelated cards, labels over unrelated wires, and collisions between label boxes. The Bezier midpoint is a candidate for a chip, not an assurance of good placement.

Fix a crowded route by choosing better ports/reach, increasing the relevant gap, or rearranging its components. If moving a chip along the curve is necessary, adapt `getLinkGeometry` and label rendering together so it still follows the moving nodes. Do not invent unsupported data fields and expect them to work. Shorten/wrap a label when its meaning remains clear. Do not hide labels to make a layout pass.

## Fit boundaries after the contents

Use softly tinted dashed envelopes for real ownership, environment, or trust boundaries. Compute their bounds from the resolved card rectangles. Leave balanced padding and a dedicated heading area; around 35–50 units of side/bottom clearance and 60–80 above the first card often works.

For genuinely nested boundaries, include the child envelope in the parent's fit and reserve room for both headings. Border crossings are appropriate when communications cross a real boundary; keep those crossings away from heading text.

Boundaries stay behind wires and cards. Moving a boundary does not move its cards. Resizing does not start a pan/drag. Do not continuously auto-refit an envelope after the presenter has adjusted it.

## Fit the viewport

The starter's `fitView` includes computed card sizes, envelopes, route control points, and label extents across all phases. Preserve that calculation and its space for the bottom dock. Do not replace it with hard-coded zoom breakpoints. Small text should not be made unreadable to disguise an overcrowded map; simplify the phase or improve its composition.

Check presentation and laptop sizes. Inspect the overview and every phase, with special attention to the busiest phase. The first frame should already be presentable without dragging. Browser interaction checks remain necessary even when geometry checks pass.
