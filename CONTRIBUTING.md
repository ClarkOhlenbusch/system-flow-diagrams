# Contributing

Thanks for helping improve System Flow Diagrams. You can report bugs, improve the skill or starter, clarify the docs, or share an example that demonstrates a new kind of workflow.

## Report a bug or suggest an improvement

[Open an issue](https://github.com/ClarkOhlenbusch/system-flow-diagrams/issues/new). For a bug, include the example or a minimal HTML file that reproduces it, the phase where it happens, and what you expected to see. Include your browser for rendering or interaction problems, or your coding agent for install and generation problems. For an improvement, describe the workflow it would help with.

## Make a change

Fork the repo, create a branch, and open a pull request against `main`.

| To change | Start here |
| --- | --- |
| Skill instructions | [SKILL.md](system-flow-diagrams/SKILL.md) |
| Layout and routing guidance | [Layout guide](system-flow-diagrams/references/layout.md) |
| Shared interactions and rendering | [HTML starter](system-flow-diagrams/assets/starter.html) |
| Examples and walkthrough | [Examples](examples) and [How it works](how-it-works.html) |

For a new example, copy the starter into `examples/` and edit the section between `BEGIN DIAGRAM DATA` and `END DIAGRAM DATA`. It defines the cards, boundaries, and phases. Use generic architecture details that can be shared publicly. Follow the [layout guide](system-flow-diagrams/references/layout.md) to keep routes and labels legible.

## Check your change

Open the HTML in a browser with internet access. Files can be opened directly, without a build step or local server.

- For layout changes or new examples, check every phase at presentation and laptop sizes. Look for overlaps, clipped content, and arrows that cross unrelated cards or boundary headings.
- For interaction changes, test card dragging after panning and zooming, boundary movement and resizing, dock and keyboard navigation, Fit, and Reset.

In your pull request, describe what changed and how you checked it. Include a screenshot for a visual change and note any browser checks you couldn't run.

To publish a live demo from a fork, use **Settings → Pages → Deploy from a branch** and select `main` and `/(root)`. The included `index.html` opens the walkthrough, and `.nojekyll` keeps the files static.

## Package a marketplace release

Bump the version in [the Claude plugin manifest](.claude-plugin/plugin.json) when releasing plugin changes. Claude's directory takes the repository URL and discovers the manifest at the root. OpenAI's directory takes a ZIP through its **Skills only** submission flow. Build that archive from the repository root:

```sh
python3 scripts/package_plugin.py system-flow-diagrams.zip
```

The ZIP includes the tracked skill files, license, manifest, and listing icon.
