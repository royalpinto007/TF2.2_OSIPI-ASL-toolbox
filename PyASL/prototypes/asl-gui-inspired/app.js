const steps = ["input", "structural", "calibration", "distortion", "analysis", "output"];

const pipelineSteps = {
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

const logLines = {
  pcasl: [
    "[INFO] Loaded preclinical pCASL profile",
    "[INFO] Structural reference attached",
    "[INFO] Calibration configured from metadata",
    "[INFO] Template normalization enabled",
    "[INFO] Ready for batch execution",
  ],
  mti: [
    "[INFO] Loaded multi-TI PASL profile",
    "[INFO] Structural step configured",
    "[INFO] Absolute CBF fitting enabled",
    "[INFO] Output summary will be written",
  ],
  custom: [
    "[INFO] Loaded custom modular profile",
    "[INFO] User-selected step composition active",
    "[INFO] Mixed-pipeline command preview updated",
  ],
};

let currentStepIndex = 0;

const tabEls = Array.from(document.querySelectorAll(".step-tab"));
const panelEls = Array.from(document.querySelectorAll(".panel"));
const datasetTypeEl = document.querySelector("#dataset-type");
const resolvedStepsEl = document.querySelector("#resolved-steps");
const commandPreviewEl = document.querySelector("#command-preview");
const logBoxEl = document.querySelector("#log-box");
const prevButton = document.querySelector("#prev-step");
const nextButton = document.querySelector("#next-step");

function showStep(stepName) {
  tabEls.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.step === stepName);
  });

  panelEls.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === stepName);
  });
}

function renderPipeline(kind) {
  const resolved = pipelineSteps[kind] || [];
  resolvedStepsEl.innerHTML = resolved.map((step) => `<li>${step}</li>`).join("");

  commandPreviewEl.textContent = [
    "python -m pyasl.pipelines.run_pipeline \\",
    '  --input "/study/rawdata/cohort-a" \\',
    `  --config "configs/${kind}_gui_generated.yaml"`,
    "",
    "# resolved steps",
    ...resolved.map((step, index) => `${index + 1}. ${step}`),
  ].join("\n");

  const logs = logLines[kind] || [];
  logBoxEl.innerHTML = logs.map((line) => `<p>${line}</p>`).join("");
}

function syncStepFromIndex() {
  showStep(steps[currentStepIndex]);
}

tabEls.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    currentStepIndex = index;
    syncStepFromIndex();
  });
});

prevButton.addEventListener("click", () => {
  currentStepIndex = Math.max(0, currentStepIndex - 1);
  syncStepFromIndex();
});

nextButton.addEventListener("click", () => {
  currentStepIndex = Math.min(steps.length - 1, currentStepIndex + 1);
  syncStepFromIndex();
});

datasetTypeEl.addEventListener("change", (event) => {
  renderPipeline(event.target.value);
});

renderPipeline("pcasl");
syncStepFromIndex();
