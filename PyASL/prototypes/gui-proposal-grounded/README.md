# PyASL Workbench Prototype

This is a second GUI prototype built to feel visually grounded in the existing PyASL and OSIPI project materials.

## What it follows

The styling direction in this folder is based on:

- the PyASL documentation structure and tone
- the OSIPI toolbox documentation theme configuration
- the local OSIPI logo assets already present in the repository

## Style choices pulled from the project

- documentation-oriented layout instead of a marketing dashboard
- indigo primary color inspired by the Material for MkDocs configuration
- Roboto-style typography to match the docs setup
- OSIPI logo usage from the existing repository assets
- restrained white cards, borders, and content hierarchy similar to the current docs

## Files

- `index.html`
- `styles.css`
- `app.js`

## How to preview

```bash
cd TF2.2_OSIPI-ASL-toolbox/PyASL/prototypes/gui-proposal-grounded
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Why keep this separately

The first prototype in `gui-proposal/` explores a more product-style concept.

This version is intentionally closer to the existing PyASL and OSIPI visual language, so you can decide which direction is better for your proposal:

- `gui-proposal/` = more conceptual and polished
- `gui-proposal-grounded/` = more consistent with current project materials
