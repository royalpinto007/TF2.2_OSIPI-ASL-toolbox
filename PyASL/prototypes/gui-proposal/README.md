# PyASL Studio GUI Prototype

This folder contains a proposal-ready GUI prototype for the 2026 PyASL GSoC project.

## Purpose

The prototype is meant to communicate the intended user experience for:

- configuring PyASL workflows without hand-editing YAML
- exposing preclinical co-registration and normalization as first-class features
- running batch jobs across multiple datasets
- monitoring progress, logs, and output organization

It is intentionally lightweight and frontend-only so it can be shown early in the proposal and community bonding phase without forcing architectural decisions too soon.

## Files

- `index.html`: main prototype view
- `styles.css`: visual design and responsive layout
- `app.js`: lightweight interactions for switching pipeline views

## How to view it

Open `index.html` directly in a browser, or serve the folder locally with a static file server.

Example:

```bash
cd TF2.2_OSIPI-ASL-toolbox/PyASL/prototypes/gui-proposal
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## How this maps to the project

- `Workflow Builder` represents the current modular PyASL pipeline system
- `Batch Mode` represents the new 2026 batch-processing deliverable
- `PreclinicalCoregister` and `PreclinicalNormalize` represent the two major new preclinical features
- `Live run monitor` represents the logging and progress UX needed for both GUI and batch execution

## Proposal value

This prototype helps demonstrate:

- that the project has a concrete UX direction
- that the GUI can be layered on top of the existing backend
- that the new preclinical steps can be surfaced clearly for non-expert users
