# System Flow Diagrams

An agent skill for making interactive system-flow diagrams: a movable mesh canvas, colored service cards, labeled curved arrows, fitted boundaries, and a small bottom flow dock.

Describe a system to your existing coding agent. It copies the starter, edits the diagram content, and gives you an HTML file to open in a browser.

## Use it

Download this repository, or clone it once it has been published:

```sh
git clone https://github.com/ClarkOhlenbusch/system-flow-diagrams.git
```

Open the folder with your coding agent and ask:

> Read system-flow-diagrams/SKILL.md. Create checkout.html explaining our customer, API gateway, order service, payment provider, and notification worker. Show checkout as a sequence of interactions. Use the starter's existing controls and styling, with clear initial spacing.

Then open the resulting HTML file in a browser. No package installation, build process, or running server is required. The HTML loads its libraries and fonts from CDNs, so it needs an internet connection.

For another project, copy the entire `system-flow-diagrams` folder and give your agent the path to its `SKILL.md`. The instructions are ordinary Markdown and can also be supplied directly to an agent; native skill installation is optional and depends on the agent you use.

## Try the examples

- [How this skill works](how-it-works.html): the skill, reference, coding agent, HTML artifact, and presenter.
- [Generic checkout starter](system-flow-diagrams/assets/starter.html): a small service communication example you can adapt.

Download and open these HTML files; GitHub's file browser displays source. A GitHub Pages demo can expose them directly in the browser; see below.

Use the bottom phase buttons, Space, or Left/Right to advance. Drag cards; their connections follow. Drag boundary headers/borders to move them, and corners to resize them. Pan empty canvas. Ctrl/Cmd/Alt + scroll or +/- zooms. F fits, R resets, and numeric keys select phases. Boundary movement is independent of the cards inside it. Adjustments last for the current page session; edit the source to preserve a layout.

## Keep agent token use small

The starter already contains the working interaction and rendering code. Copy it through a filesystem operation, then patch only the section between `BEGIN DIAGRAM DATA` and `END DIAGRAM DATA`:

- `INITIAL_NODES` defines components and placement.
- `INITIAL_ENVELOPES` defines labeled boundaries.
- `STORYBOARD_STEPS` defines messages and highlights for each phase.

For ordinary edits, agents do not need to read or regenerate the runtime. The short `SKILL.md` contains the common workflow; the longer layout guide is loaded when composition needs it. Changes to interaction behavior can still inspect and edit the relevant helpers. Keep the source readable rather than minifying it.

## Share a live demo with GitHub Pages

After pushing the repository, open **Settings → Pages**. Choose **Deploy from a branch**, **main**, and **/(root)**, then save. The included `index.html` opens the how-it-works diagram; `.nojekyll` keeps the files static. Your repo's Pages settings will show the actual published URL after deployment.

The demo's HTML is the same artifact people download; there is no separate website application.

## Contribute

Preserve the working canvas and minimal controls. For changes to the starter, inspect every phase and test dragging after pan/zoom, independent boundary movement/resizing, navigation, and reset. Check labels and paths at both presentation and laptop sizes. Report any browser-verification limit. Use generic examples without private architecture details.

Licensed under [MIT](LICENSE). CDN-provided dependencies retain their own licenses.
