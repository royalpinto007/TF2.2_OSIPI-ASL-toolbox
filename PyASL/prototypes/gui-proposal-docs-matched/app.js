const stepsByPipeline = {
  pcasl: [
    "BrukerLoader",
    "SteadyStateTrim",
    "ControlLabelSplit",
    "MotionCheck",
    "DiffImage",
    "ComputeM0",
    "PreclinicalCoregister",
    "SlicePLDAdjust",
    "PreclinicalNormalize",
    "SaveOutputs",
  ],
  mti: [
    "NIfTILoader",
    "PreclinicalCoregister",
    "AbsCBF_T1Fit",
    "PreclinicalNormalize",
    "SaveOutputs",
  ],
  custom: [
    "ResetOrientation",
    "MRICloudRescale",
    "Realign",
    "PreclinicalCoregister",
    "PreclinicalNormalize",
  ],
};

const logsByPipeline = {
  pcasl: [
    "[INFO] Parsed YAML config: type=pcasl",
    "[INFO] Loaded BrukerLoader for cohort-a",
    "[INFO] Added planned module PreclinicalCoregister",
    "[INFO] Added planned module PreclinicalNormalize",
    "[INFO] Batch queue active for 3 datasets",
  ],
  mti: [
    "[INFO] Parsed YAML config: type=mti",
    "[INFO] Loaded NIfTILoader input",
    "[INFO] Prepared template path for normalization",
    "[INFO] Ready to dispatch batch jobs",
  ],
  custom: [
    "[INFO] Parsed YAML config: type=custom",
    "[INFO] Building mixed pipeline from selected modules",
    "[INFO] New 2026 modules shown in docs-aligned preview",
  ],
};

const pipelineType = document.querySelector("#pipeline-type");
const resolvedSteps = document.querySelector("#resolved-steps");
const logBox = document.querySelector("#log-box");

function render(kind) {
  const steps = stepsByPipeline[kind] || [];
  resolvedSteps.innerHTML = steps.map((step) => `<li>${step}</li>`).join("");

  const logs = logsByPipeline[kind] || [];
  logBox.innerHTML = logs.map((line) => `<p>${line}</p>`).join("");
}

pipelineType.addEventListener("change", (event) => {
  render(event.target.value);
});

render("pcasl");
