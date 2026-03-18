const stepsByPipeline = {
  pcasl: [
    ["BrukerLoader", "Existing preclinical input step"],
    ["SteadyStateTrim", "Existing cleanup step"],
    ["ControlLabelSplit", "Existing preclinical split"],
    ["MotionCheck", "Existing QC output"],
    ["DiffImage", "Existing perfusion difference map"],
    ["ComputeM0", "Existing quantification support"],
    ["PreclinicalCoregister", "Planned 2026 module"],
    ["SlicePLDAdjust", "Existing timing adjustment"],
    ["PreclinicalNormalize", "Planned 2026 module"],
    ["SaveOutputs", "Existing output stage"],
  ],
  mti: [
    ["NIfTILoader", "Existing MTI loader"],
    ["PreclinicalCoregister", "Planned 2026 module"],
    ["AbsCBF_T1Fit", "Existing MTI quantification"],
    ["PreclinicalNormalize", "Planned 2026 module"],
    ["SaveOutputs", "Existing output stage"],
  ],
  custom: [
    ["ResetOrientation", "Existing ASLtbx-style step"],
    ["MRICloudRescale", "Existing MRICloud step"],
    ["Realign", "Existing motion correction step"],
    ["PreclinicalCoregister", "Planned 2026 mixed-pipeline module"],
    ["PreclinicalNormalize", "Planned 2026 mixed-pipeline module"],
  ],
};

const logsByPipeline = {
  pcasl: [
    "[INFO] Loaded preclinical pCASL workflow preset",
    "[INFO] Added planned module: PreclinicalCoregister",
    "[INFO] Added planned module: PreclinicalNormalize",
    "[INFO] Batch mode configured for cohort processing",
  ],
  mti: [
    "[INFO] Loaded multi-TI PASL workflow preset",
    "[INFO] Configured NIfTI input mode",
    "[INFO] Prepared normalization template reference",
    "[INFO] Ready for batch submission",
  ],
  custom: [
    "[INFO] Loaded custom modular workflow preset",
    "[INFO] Mixed runner configuration enabled",
    "[INFO] Existing and planned modules can be previewed together",
    "[INFO] YAML preview available",
  ],
};

const pipelineEl = document.querySelector("#pipeline");
const stepListEl = document.querySelector("#step-list");
const logBoxEl = document.querySelector("#log-box");
const template = document.querySelector("#step-template");

function renderPipeline(kind) {
  const steps = stepsByPipeline[kind] || [];
  stepListEl.innerHTML = "";
  for (const [name, note] of steps) {
    const node = template.content.cloneNode(true);
    node.querySelector(".step-name").textContent = name;
    node.querySelector(".step-note").textContent = note;
    stepListEl.appendChild(node);
  }

  const logs = logsByPipeline[kind] || [];
  logBoxEl.innerHTML = logs.map((line) => `<p>${line}</p>`).join("");
}

pipelineEl.addEventListener("change", (event) => {
  renderPipeline(event.target.value);
});

renderPipeline("pcasl");
