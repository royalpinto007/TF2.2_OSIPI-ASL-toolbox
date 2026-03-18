# ASL GUI Inspired Prototype

This prototype is a reference-style mock based on the workflow structure described in the BASIL / Oxford-ASL `asl_gui` documentation.

## Why this exists

Before designing a more original PyASL GUI, this version helps us understand the interaction model already used in a real ASL GUI:

- step-by-step tabbed workflow
- separate panels for data, structural inputs, calibration, correction, analysis, and output
- form-driven configuration over a command-line backend

## PyASL adaptation

This prototype keeps the `asl_gui`-like structure, but maps it to PyASL concepts:

- backend runner: `pyasl.pipelines.run_pipeline`
- pipeline families: preclinical pCASL, preclinical multi-TI PASL, custom
- planned 2026 modules: `PreclinicalCoregister`, `PreclinicalNormalize`

## Preview

```bash
cd TF2.2_OSIPI-ASL-toolbox/PyASL/prototypes/asl-gui-inspired
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
