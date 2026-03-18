# PyASL Docs-Matched Prototype

This is a third prototype built to follow the current PyASL documentation structure much more literally than the previous two.

## Design goal

Instead of looking like a separate app product, this version is meant to feel like:

- a real page inside the current PyASL documentation
- a Sphinx / Read the Docs style layout
- a proposal page that introduces the planned 2026 GUI and batch mode

## What it mirrors

- left documentation sidebar structure
- page hierarchy from the current docs source
- breadcrumb and content-page layout
- note/admonition style
- code block and table presentation

## What it is for

Use this if you want your proposal prototype to look tightly connected to the current project rather than stylistically reimagined.

## Preview

```bash
cd TF2.2_OSIPI-ASL-toolbox/PyASL/prototypes/gui-proposal-docs-matched
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
