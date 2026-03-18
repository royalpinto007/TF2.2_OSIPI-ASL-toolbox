# PyASL Native GUI Prototype

This prototype is the "better PyASL GUI" version after reviewing older ASL interfaces such as `asl_gui`.

## Design goal

Unlike the reference-style prototype, this one is intentionally PyASL-native:

- modern scientific workbench layout
- modular pipeline composition at the center of the interface
- explicit batch execution support
- QC, logs, and generated YAML visible without changing screens
- first-class support for planned 2026 preclinical additions

## Why this is better for PyASL

PyASL is not a single fixed command wrapper. It is a modular library with:

- multiple pipeline families
- custom YAML-driven workflows
- preclinical and human support
- plug-in style extensibility

So the GUI should feel like a workflow builder and execution workbench, not just a sequence of old-style form tabs.

## Preview

```bash
cd TF2.2_OSIPI-ASL-toolbox/PyASL/prototypes/pyasl-native-gui
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
