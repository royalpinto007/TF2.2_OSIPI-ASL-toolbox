const stepProfiles = {
  pcasl: [
    {
      title: "BrukerLoader",
      tag: "Input",
      description: "Import preclinical pCASL data, initialize metadata, and create the output workspace.",
    },
    {
      title: "SteadyStateTrim",
      tag: "Cleanup",
      description: "Discard unstable opening volumes before downstream quantification begins.",
    },
    {
      title: "ControlLabelSplit",
      tag: "Prepare",
      description: "Separate control and label dynamics into analysis-ready tensors.",
    },
    {
      title: "MotionCheck",
      tag: "QC",
      description: "Generate a fast visual quality-control snapshot for review before quantification.",
    },
    {
      title: "DiffImage",
      tag: "Quant",
      description: "Compute perfusion-weighted difference images from control and label pairs.",
    },
    {
      title: "ComputeM0",
      tag: "Quant",
      description: "Estimate M0 for downstream relative and absolute CBF analysis.",
    },
    {
      title: "PreclinicalCoregister",
      tag: "New 2026",
      description: "Align ASL-derived images to a reference image so preclinical datasets share a stable geometry.",
    },
    {
      title: "SlicePLDAdjust",
      tag: "Timing",
      description: "Correct slice-dependent timing offsets in multi-slice acquisitions.",
    },
    {
      title: "PreclinicalNormalize",
      tag: "New 2026",
      description: "Map subject data into a standard template space for comparison across animals and cohorts.",
    },
    {
      title: "SaveOutputs",
      tag: "Output",
      description: "Write processed arrays, figures, and a machine-readable batch summary to disk.",
    },
  ],
  mti: [
    {
      title: "NIfTILoader",
      tag: "Input",
      description: "Load multi-TI PASL volumes and hydrate the pipeline context.",
    },
    {
      title: "PreclinicalCoregister",
      tag: "New 2026",
      description: "Align perfusion data to anatomical context before model fitting.",
    },
    {
      title: "AbsCBF_T1Fit",
      tag: "Quant",
      description: "Estimate absolute CBF from T1 fitting over the multi-TI acquisition.",
    },
    {
      title: "PreclinicalNormalize",
      tag: "New 2026",
      description: "Warp multi-TI outputs to study or atlas space for comparison.",
    },
    {
      title: "SaveOutputs",
      tag: "Output",
      description: "Store arrays, derived maps, and run metadata.",
    },
  ],
  custom: [
    {
      title: "ResetOrientation",
      tag: "ASLtbx",
      description: "Normalize image orientation metadata at the start of a custom hybrid workflow.",
    },
    {
      title: "MRICloudRescale",
      tag: "MRICloud",
      description: "Apply intensity rescaling before mixing steps from other pipelines.",
    },
    {
      title: "Realign",
      tag: "ASLtbx",
      description: "Perform motion correction and volume realignment.",
    },
    {
      title: "PreclinicalCoregister",
      tag: "New 2026",
      description: "Prototype how new preclinical modules can be inserted into mixed pipelines.",
    },
    {
      title: "PreclinicalNormalize",
      tag: "New 2026",
      description: "Prototype spatial normalization inside the unified custom runner.",
    },
  ],
};

const logProfiles = {
  pcasl: [
    "[INFO] Parsed config: type=pcasl",
    "[INFO] Loaded BrukerLoader and metadata extraction",
    "[INFO] MotionCheck figure saved to results/sub-02",
    "[INFO] PreclinicalCoregister aligned ASL to anatomical reference",
    "[INFO] PreclinicalNormalize prepared template warp",
  ],
  mti: [
    "[INFO] Parsed config: type=mti",
    "[INFO] Loaded NIfTILoader for multi-TI PASL data",
    "[INFO] PreclinicalCoregister matched source to reference volume",
    "[INFO] AbsCBF_T1Fit estimation in progress",
    "[INFO] Saving derivatives and summary manifest",
  ],
  custom: [
    "[INFO] Parsed config: type=custom",
    "[INFO] ResetOrientation completed",
    "[INFO] MRICloudRescale completed",
    "[INFO] Realign completed",
    "[INFO] Awaiting module-specific parameters for new 2026 steps",
  ],
};

const pipelineSelect = document.querySelector("#pipeline-family");
const datasetSelect = document.querySelector("#dataset-type");
const stepList = document.querySelector("#step-list");
const stepTemplate = document.querySelector("#step-template");
const logConsole = document.querySelector("#log-console");

function renderSteps(kind) {
  stepList.innerHTML = "";
  const steps = stepProfiles[kind] || [];
  steps.forEach((step, index) => {
    const node = stepTemplate.content.cloneNode(true);
    node.querySelector(".step-index").textContent = String(index + 1).padStart(2, "0");
    node.querySelector(".step-title").textContent = step.title;
    node.querySelector(".step-tag").textContent = step.tag;
    node.querySelector(".step-description").textContent = step.description;
    stepList.appendChild(node);
  });
}

function renderLogs(kind) {
  const logs = logProfiles[kind] || [];
  logConsole.innerHTML = logs.map((line) => `<p>${line}</p>`).join("");
}

function syncDatasetType() {
  const value = pipelineSelect.value;
  if (value === "pcasl" || value === "mti") {
    datasetSelect.value = "preclinical";
  } else {
    datasetSelect.value = "hybrid";
  }
}

pipelineSelect.addEventListener("change", () => {
  syncDatasetType();
  renderSteps(pipelineSelect.value);
  renderLogs(pipelineSelect.value);
});

datasetSelect.addEventListener("change", () => {
  if (datasetSelect.value === "human") {
    pipelineSelect.value = "custom";
  } else if (datasetSelect.value === "preclinical" && pipelineSelect.value === "custom") {
    pipelineSelect.value = "pcasl";
  }

  renderSteps(pipelineSelect.value);
  renderLogs(pipelineSelect.value);
});

renderSteps("pcasl");
renderLogs("pcasl");
