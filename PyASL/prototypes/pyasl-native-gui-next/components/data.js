export const sidebarItems = [
  { href: "/workbench", label: "Workbench" },
  { href: "/datasets", label: "Datasets" },
  { href: "/templates", label: "Templates" },
  { href: "/runs", label: "Runs" },
  { href: "/reports", label: "Reports" },
];

export const profiles = {
  pcasl: {
    label: "Preclinical pCASL",
    modules: [
      "BrukerLoader",
      "SteadyStateTrim",
      "ControlLabelSplit",
      "MotionCheck",
      "ComputeM0",
      "PreclinicalCoregister",
      "SlicePLDAdjust",
      "PreclinicalNormalize",
      "SaveOutputs",
    ],
    yaml: `type: pcasl

steps:
  - module: BrukerLoader
  - module: SteadyStateTrim
  - module: ControlLabelSplit
  - module: MotionCheck
  - module: ComputeM0
  - module: PreclinicalCoregister
  - module: SlicePLDAdjust
  - module: PreclinicalNormalize
  - module: SaveOutputs`,
  },
  mti: {
    label: "Preclinical multi-TI PASL",
    modules: [
      "NIfTILoader",
      "PreclinicalCoregister",
      "AbsCBF_T1Fit",
      "PreclinicalNormalize",
      "SaveOutputs",
    ],
    yaml: `type: mti

steps:
  - module: NIfTILoader
  - module: PreclinicalCoregister
  - module: AbsCBF_T1Fit
  - module: PreclinicalNormalize
  - module: SaveOutputs`,
  },
  custom: {
    label: "Custom mixed pipeline",
    modules: [
      "ResetOrientation",
      "MRICloudRescale",
      "Realign",
      "PreclinicalCoregister",
      "PreclinicalNormalize",
    ],
    yaml: `type: custom

steps:
  - name: ResetOrientation
  - name: MRICloudRescale
  - name: Realign
  - name: PreclinicalCoregister
  - name: PreclinicalNormalize`,
  },
};

export const datasetRows = [
  ["cohort-a / sub-01 / ses-01", "Queued", "Preclinical pCASL"],
  ["cohort-a / sub-02 / ses-01", "Running", "Preclinical pCASL"],
  ["cohort-b / sub-03 / ses-01", "Done", "Preclinical multi-TI PASL"],
];

export const templateRows = [
  ["mouse_template", "Standard brain template", "/templates/mouse_template.nii.gz"],
  ["study_atlas_v1", "Study-specific atlas", "/templates/study_atlas_v1.nii.gz"],
];

export const runRows = [
  ["run-2026-03-19-001", "Running", "8/12 datasets completed"],
  ["run-2026-03-18-004", "Done", "All outputs saved with QC previews"],
];

export const reportRows = [
  ["batch-summary", "JSON", "Machine-readable run summary"],
  ["masked-cbf-preview", "PNG", "Quick QC review output"],
  ["pipeline-config-export", "YAML", "Reusable workflow preset"],
];
