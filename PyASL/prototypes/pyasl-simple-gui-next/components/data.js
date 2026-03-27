export const sidebarItems = [
  { href: "/workbench", label: "1. Choose Workflow" },
  { href: "/datasets", label: "2. Select Data" },
  { href: "/templates", label: "3. Review Settings" },
  { href: "/runs", label: "4. Run Processing" },
  { href: "/reports", label: "5. View Results" },
];

export const profiles = {
  pcasl: {
    label: "Preclinical pCASL",
    summary: "For preclinical pCASL datasets with a standard loading, motion check, and quantification flow.",
    useWhen: "Use this when your dataset is a standard preclinical pCASL acquisition and you want the default PyASL flow.",
    expectedInput: "Raw preclinical pCASL data, typically Bruker-based acquisitions.",
    outputFocus: "Perfusion outputs, motion review, and saved processed results.",
    previewSteps: [
      {
        title: "Load scan data",
        module: "BrukerLoader",
        description: "Import the raw ASL scan and study information.",
      },
      {
        title: "Trim unstable images",
        module: "SteadyStateTrim",
        description: "Remove the first images before the signal becomes stable.",
      },
      {
        title: "Split control and label images",
        module: "ControlLabelSplit",
        description: "Separate the ASL image pairs for later processing.",
      },
      {
        title: "Check motion",
        module: "MotionCheck",
        description: "Review movement before continuing with analysis.",
      },
    ],
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
    summary: "For preclinical multi-TI PASL data where timing-aware quantification is needed.",
    useWhen: "Use this when your data was acquired with multiple inversion times and needs timing-aware modeling.",
    expectedInput: "Preclinical multi-TI PASL image series and accompanying metadata.",
    outputFocus: "Timing-based perfusion estimates and normalized outputs.",
    previewSteps: [
      {
        title: "Load image data",
        module: "NIfTILoader",
        description: "Import the multi-TI PASL images and metadata.",
      },
      {
        title: "Align to anatomy",
        module: "PreclinicalCoregister",
        description: "Register the ASL data to the reference anatomical scan.",
      },
      {
        title: "Estimate CBF",
        module: "AbsCBF_T1Fit",
        description: "Fit the timing model to produce perfusion estimates.",
      },
      {
        title: "Normalize outputs",
        module: "PreclinicalNormalize",
        description: "Map the processed outputs to the selected template space.",
      },
    ],
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
    summary: "For advanced users who want to combine steps from different PyASL workflows.",
    useWhen: "Use this when you already know you need a mixed or non-standard workflow.",
    expectedInput: "Data that requires a custom combination of preprocessing steps.",
    outputFocus: "Flexible processing with manually chosen steps and exports.",
    previewSteps: [
      {
        title: "Reset orientation",
        module: "ResetOrientation",
        description: "Correct image orientation before further processing.",
      },
      {
        title: "Rescale intensity",
        module: "MRICloudRescale",
        description: "Adjust image intensity for downstream compatibility.",
      },
      {
        title: "Realign data",
        module: "Realign",
        description: "Reduce motion-related misalignment between images.",
      },
      {
        title: "Apply registration steps",
        module: "PreclinicalCoregister / PreclinicalNormalize",
        description: "Prepare the workflow for co-registration and normalization.",
      },
    ],
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
  ["Selected", "cohort-a / sub-01 / ses-01", "Ready"],
  ["Selected", "cohort-a / sub-02 / ses-01", "Ready"],
  ["Selected", "cohort-b / sub-03 / ses-01", "Ready"],
];

export const templateRows = [
  ["mouse_template", "Standard brain template", "/templates/mouse_template.nii.gz"],
  ["study_atlas_v1", "Study-specific atlas", "/templates/study_atlas_v1.nii.gz"],
];

export const runRows = [
  ["cohort-a / sub-01 / ses-01", "Complete", "batch-2026-03-19-001"],
  ["cohort-a / sub-02 / ses-01", "Running", "batch-2026-03-19-001"],
  ["cohort-b / sub-03 / ses-01", "Queued", "batch-2026-03-19-001"],
];

export const reportRows = [
  ["batch-summary", "JSON", "Run summary for the selected study"],
  ["cbf-preview", "PNG", "Quick output preview"],
  ["pipeline-config-export", "YAML", "Saved workflow configuration"],
];
