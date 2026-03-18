const profiles = {
  pcasl: {
    label: "pCASL",
    modules: [
      {
        name: "BrukerLoader",
        kind: "Input",
        note: "Load raw preclinical pCASL data and initialize study metadata.",
        inspector: {
          labels: ["Input root", "Format", "Experiment number", "Output folder"],
          values: ["/study/rawdata/cohort-a", "Bruker 2dseq", "18", "/study/results/cohort-a"],
        },
      },
      {
        name: "SteadyStateTrim",
        kind: "Cleanup",
        note: "Remove unstable opening volumes before quantification.",
        inspector: {
          labels: ["Trim volumes", "Strategy", "Apply to", "Notes"],
          values: ["2", "leading volumes", "control + label", "Removes early unstable dynamics"],
        },
      },
      {
        name: "ControlLabelSplit",
        kind: "Prepare",
        note: "Separate control and label dynamics for downstream processing.",
        inspector: {
          labels: ["Control first", "Output", "Pairing rule", "Notes"],
          values: ["true", "ImageCtr / ImageLbl", "alternating pairs", "Creates analysis-ready tensors"],
        },
      },
      {
        name: "MotionCheck",
        kind: "QC",
        note: "Generate quick motion and slice-quality previews before analysis.",
        inspector: {
          labels: ["QC figure", "Slices", "Preview type", "Save path"],
          values: ["MotionCheck.png", "all slices", "mosaic", "/study/results/cohort-a/qc"],
        },
      },
      {
        name: "ComputeM0",
        kind: "Quant",
        note: "Estimate M0 using metadata-aware preclinical calibration logic.",
        inspector: {
          labels: ["TR source", "T1 tissue", "M0 mode", "Output"],
          values: ["from_meta", "1900", "estimated", "Mat0"],
        },
      },
      {
        name: "PreclinicalCoregister",
        kind: "2026",
        note: "Align ASL outputs to M0 or anatomical reference for stable geometry.",
        inspector: {
          labels: ["Reference target", "Method", "Apply to", "Output transform"],
          values: ["M0 / anatomical reference", "Rigid + affine", "perfusion maps", "coreg_transform.mat"],
        },
      },
      {
        name: "SlicePLDAdjust",
        kind: "Timing",
        note: "Apply slice timing compensation for perfusion quantification.",
        inspector: {
          labels: ["Slice gap", "T1 blood", "Adjustment mode", "Output"],
          values: ["31", "2800", "slice-wise PLD correction", "adjusted relCBF"],
        },
      },
      {
        name: "PreclinicalNormalize",
        kind: "2026",
        note: "Map outputs into standard template space for cohort-level comparison.",
        inspector: {
          labels: ["Template", "Interpolation", "Apply to", "Output space"],
          values: ["/templates/mouse_template.nii.gz", "trilinear", "relCBF + QC outputs", "mouse template space"],
        },
      },
      {
        name: "SaveOutputs",
        kind: "Output",
        note: "Write arrays, figures, QC outputs, and batch reports to disk.",
        inspector: {
          labels: ["Save directory", "Artifacts", "Summary file", "QC export"],
          values: ["/study/results/cohort-a", "npy + png + yaml", "batch-summary.json", "enabled"],
        },
      },
    ],
    logs: [
      "[INFO] Loaded preclinical pCASL workbench profile",
      "[INFO] Batch queue initialized for cohort-a",
      "[INFO] Using M0 / anatomical reference for co-registration",
      "[INFO] Template normalization staged for mouse_template.nii.gz",
      "[INFO] Saving QC previews and JSON run summary",
    ],
    yaml: `type: pcasl

steps:
  - module: BrukerLoader
    params: { expno: 18, procno: 1 }
  - module: SteadyStateTrim
    params: { trim: 2 }
  - module: ControlLabelSplit
    params: { control_first: true }
  - module: MotionCheck
  - module: ComputeM0
    params: { TR: from_meta, T1t: 1900 }
  - module: PreclinicalCoregister
    params: { reference: "M0", method: "rigid_affine" }
  - module: SlicePLDAdjust
    params: { SGap: 31, T1blood: 2800 }
  - module: PreclinicalNormalize
    params: { template: "mouse_template.nii.gz" }
  - module: SaveOutputs`,
  },
  mti: {
    label: "multi-TI",
    modules: [
      {
        name: "NIfTILoader",
        kind: "Input",
        note: "Load multi-TI PASL images and metadata into the workbench context.",
        inspector: {
          labels: ["Input file", "Target", "Squeeze last", "Output folder"],
          values: ["study/sub-01.nii.gz", "AbsData", "true", "/study/results/mti"],
        },
      },
      {
        name: "PreclinicalCoregister",
        kind: "2026",
        note: "Register perfusion data to anatomical context before fitting.",
        inspector: {
          labels: ["Reference", "Method", "Apply to", "Transform file"],
          values: ["anat", "affine", "AbsData", "mti_coreg.mat"],
        },
      },
      {
        name: "AbsCBF_T1Fit",
        kind: "Quant",
        note: "Estimate absolute CBF using T1 fitting across inversion times.",
        inspector: {
          labels: ["Fit model", "Input tensor", "Output map", "Units"],
          values: ["T1 fit", "AbsData", "absCBF", "ml/100g/min"],
        },
      },
      {
        name: "PreclinicalNormalize",
        kind: "2026",
        note: "Normalize outputs to template or study atlas space.",
        inspector: {
          labels: ["Template", "Interpolation", "Apply to", "Output space"],
          values: ["/templates/mouse_template.nii.gz", "trilinear", "absCBF", "template"],
        },
      },
      {
        name: "SaveOutputs",
        kind: "Output",
        note: "Persist result maps, figures, and summary artifacts.",
        inspector: {
          labels: ["Save directory", "Artifacts", "Summary file", "QC export"],
          values: ["/study/results/mti", "npy + yaml", "batch-summary.json", "enabled"],
        },
      },
    ],
    logs: [
      "[INFO] Loaded multi-TI PASL profile",
      "[INFO] NIfTI input mode enabled",
      "[INFO] Absolute CBF fitting staged",
      "[INFO] Normalization target prepared",
    ],
    yaml: `type: mti

steps:
  - module: NIfTILoader
    params: { path: "study/sub-01.nii.gz", target: "AbsData" }
  - module: PreclinicalCoregister
    params: { reference: "anat", method: "affine" }
  - module: AbsCBF_T1Fit
  - module: PreclinicalNormalize
    params: { template: "mouse_template.nii.gz" }
  - module: SaveOutputs`,
  },
  custom: {
    label: "Custom",
    modules: [
      {
        name: "ResetOrientation",
        kind: "ASLtbx",
        note: "Normalize orientation before mixing modules from multiple tool families.",
        inspector: {
          labels: ["Orientation source", "Mode", "Apply to", "Output"],
          values: ["header metadata", "reset", "ASL images", "reoriented volumes"],
        },
      },
      {
        name: "MRICloudRescale",
        kind: "MRICloud",
        note: "Apply MRICloud rescaling inside the same workbench flow.",
        inspector: {
          labels: ["Rescale mode", "Input", "Output", "Notes"],
          values: ["default", "ASL image", "rescaled image", "used before hybrid pipeline steps"],
        },
      },
      {
        name: "Realign",
        kind: "ASLtbx",
        note: "Run motion correction before custom downstream processing.",
        inspector: {
          labels: ["Register to mean", "Interpolation", "Output", "Motion params"],
          values: ["false", "4", "realigned image", "saved"],
        },
      },
      {
        name: "PreclinicalCoregister",
        kind: "2026",
        note: "Use the new preclinical registration block inside mixed pipelines.",
        inspector: {
          labels: ["Reference", "Method", "Apply to", "Transform file"],
          values: ["anat", "rigid + affine", "mixed outputs", "custom_coreg.mat"],
        },
      },
      {
        name: "PreclinicalNormalize",
        kind: "2026",
        note: "Use the new normalization block inside mixed pipelines.",
        inspector: {
          labels: ["Template", "Interpolation", "Apply to", "Output space"],
          values: ["/templates/mouse_template.nii.gz", "trilinear", "selected outputs", "template"],
        },
      },
    ],
    logs: [
      "[INFO] Loaded custom mixed-pipeline profile",
      "[INFO] Cross-family module composition enabled",
      "[INFO] YAML export updated for custom pipeline",
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

const pipelineSelect = document.querySelector("#pipeline-select");
const appFrame = document.querySelector("#app-frame");
const moduleStack = document.querySelector("#module-stack");
const moduleTemplate = document.querySelector("#module-template");
const logConsole = document.querySelector("#log-console");
const yamlPreview = document.querySelector("#yaml-preview");
const activeProfileLabel = document.querySelector("#active-profile-label");
const inspectorTag = document.querySelector("#inspector-tag");
const inspectorLabel1 = document.querySelector("#inspector-label-1");
const inspectorLabel2 = document.querySelector("#inspector-label-2");
const inspectorLabel3 = document.querySelector("#inspector-label-3");
const inspectorLabel4 = document.querySelector("#inspector-label-4");
const inspectorParam1 = document.querySelector("#inspector-param-1");
const inspectorParam2 = document.querySelector("#inspector-param-2");
const inspectorParam3 = document.querySelector("#inspector-param-3");
const inspectorParam4 = document.querySelector("#inspector-param-4");
const inspectorNote = document.querySelector("#inspector-note");
const railItems = Array.from(document.querySelectorAll(".rail-item"));
const viewPanels = Array.from(document.querySelectorAll(".view-panel"));
const workbenchShell = document.querySelector("#workbench-shell");
const modalShell = document.querySelector("#modal-shell");
const modalBackdrop = document.querySelector("#modal-backdrop");
const modalClose = document.querySelector("#modal-close");
const modalKicker = document.querySelector("#modal-kicker");
const modalTitle = document.querySelector("#modal-title");
const modalBody = document.querySelector("#modal-body");
const runBatchButton = document.querySelector("#run-batch-button");
const exportYamlButton = document.querySelector("#export-yaml-button");
const loadPresetButton = document.querySelector("#load-preset-button");
const addModuleButton = document.querySelector("#add-module-button");
const useTemplateButton = document.querySelector("#use-template-button");
const validateButton = document.querySelector("#validate-button");
const toggleYamlButton = document.querySelector("#toggle-yaml-button");
const hideYamlButton = document.querySelector("#hide-yaml-button");
const enterWorkbenchButton = document.querySelector("#enter-workbench-button");
const overviewEnterButton = document.querySelector("#overview-enter-button");
const overviewRunBatch = document.querySelector("#overview-run-batch");
const overviewLoadPreset = document.querySelector("#overview-load-preset");
const batchPanel = document.querySelector("#batch-panel");
const qcPanel = document.querySelector("#qc-panel");
const yamlPanel = document.querySelector("#yaml-panel");
const workArea = document.querySelector("#work-area");
let currentProfileKey = "pcasl";
let selectedModuleIndex = 0;

function showPanel(panel) {
  panel?.classList.remove("hidden-panel");
}

function hidePanel(panel) {
  panel?.classList.add("hidden-panel");
}

function setYamlFocusMode(enabled) {
  workArea?.classList.toggle("yaml-focus", enabled);
}

function updateInspector(module) {
  if (!module) {
    return;
  }

  const fallback = ["Parameter A", "Parameter B", "Parameter C", "Parameter D"];
  const labels = module.inspector?.labels || fallback;
  const values = module.inspector?.values || ["", "", "", ""];

  inspectorTag.textContent = module.name;
  inspectorLabel1.textContent = labels[0] || fallback[0];
  inspectorLabel2.textContent = labels[1] || fallback[1];
  inspectorLabel3.textContent = labels[2] || fallback[2];
  inspectorLabel4.textContent = labels[3] || fallback[3];
  inspectorParam1.value = values[0] || "";
  inspectorParam2.innerHTML = `<option selected>${values[1] || ""}</option>`;
  inspectorParam3.innerHTML = `<option selected>${values[2] || ""}</option>`;
  inspectorParam4.value = values[3] || "";
  inspectorNote.textContent = module.note;
}

function openModal({ kicker, title, body }) {
  modalKicker.textContent = kicker;
  modalTitle.textContent = title;
  modalBody.innerHTML = body;
  modalShell.classList.remove("hidden");
}

function closeModal() {
  modalShell.classList.add("hidden");
}

function setView(view) {
  appFrame?.classList.toggle("overview-active", view === "overview");
  if (appFrame) {
    appFrame.style.gridTemplateColumns = view === "overview" ? "1fr" : "280px 1fr";
  }
  workbenchShell?.classList.toggle("active", view !== "overview");

  railItems.forEach((item) => {
    item.classList.toggle("active", view !== "overview" && item.dataset.view === view);
  });

  viewPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.viewPanel === view);
  });
}

function enterWorkbench(targetView = "workbench") {
  setView(targetView);
}

function renderProfile(key) {
  const profile = profiles[key];
  if (!profile) {
    return;
  }

  currentProfileKey = key;
  selectedModuleIndex = 0;

  moduleStack.innerHTML = "";
  profile.modules.forEach((module, index) => {
    const node = moduleTemplate.content.cloneNode(true);
    const card = node.querySelector(".module-card");
    card.dataset.index = String(index);
    if (index === 0) {
      card.classList.add("selected");
    }
    node.querySelector(".module-index").textContent = String(index + 1).padStart(2, "0");
    node.querySelector(".module-name").textContent = module.name;
    node.querySelector(".module-note").textContent = module.note;
    node.querySelector(".module-kind").textContent = module.kind;
    moduleStack.appendChild(node);
  });

  Array.from(moduleStack.querySelectorAll(".module-card")).forEach((card) => {
    card.addEventListener("click", () => {
      selectedModuleIndex = Number(card.dataset.index || 0);
      Array.from(moduleStack.querySelectorAll(".module-card")).forEach((item) => {
        item.classList.toggle("selected", item === card);
      });
      updateInspector(profile.modules[selectedModuleIndex]);
    });
  });

  logConsole.innerHTML = profile.logs.map((line) => `<p>${line}</p>`).join("");
  yamlPreview.textContent = profile.yaml;
  activeProfileLabel.textContent = profile.label;
  updateInspector(profile.modules[0]);
}

pipelineSelect.addEventListener("change", (event) => {
  renderProfile(event.target.value);
});

railItems.forEach((item) => {
  item.addEventListener("click", () => {
    setView(item.dataset.view);
  });
});

modalBackdrop.addEventListener("click", closeModal);
modalClose.addEventListener("click", closeModal);

runBatchButton.addEventListener("click", () => {
  const active = pipelineSelect.value;
  openModal({
    kicker: "Run Batch",
    title: "Batch execution plan",
    body: `
      <div class="modal-grid">
        <section class="modal-section">
          <h4>What the real app would show</h4>
          <ul class="modal-list">
            <li>resolved pipeline profile: <strong>${active}</strong></li>
            <li>list of datasets that will be processed</li>
            <li>output root and summary artifact locations</li>
            <li>execution policy: continue on failure, resume, QC export</li>
          </ul>
        </section>
        <section class="modal-section">
          <h4>Immediate feedback</h4>
          <ul class="modal-list">
            <li>estimated run count: 12 datasets</li>
            <li>generated config file preview</li>
            <li>validation status before launch</li>
            <li>start button to queue the run</li>
          </ul>
        </section>
      </div>
      <section class="modal-section">
        <h4>Launch preview</h4>
        <pre>python -m pyasl.pipelines.run_pipeline \\
  --input "/study/rawdata/cohort-a" \\
  --config "configs/${active}_gui_generated.yaml"</pre>
      </section>
      <div class="modal-actions">
        <button type="button" class="primary" id="modal-confirm-run">Queue Batch Run</button>
      </div>
    `,
  });

  const confirmRun = document.querySelector("#modal-confirm-run");
  confirmRun?.addEventListener("click", () => {
    closeModal();
    showPanel(batchPanel);
    showPanel(qcPanel);
    setView("runs");
  });
});

exportYamlButton.addEventListener("click", () => {
  setView("workbench");
  showPanel(yamlPanel);
  setYamlFocusMode(true);
  openModal({
    kicker: "Export YAML",
    title: "Reusable workflow configuration",
    body: `
      <section class="modal-section">
        <h4>What happens here</h4>
        <ul class="modal-list">
          <li>the current GUI state is serialized into YAML</li>
          <li>the file can be reused from CLI, notebooks, or batch jobs</li>
          <li>this keeps the GUI aligned with PyASL's real config-driven backend</li>
        </ul>
      </section>
      <section class="modal-section">
        <h4>Current export</h4>
        <pre>${yamlPreview.textContent}</pre>
      </section>
      <div class="modal-actions">
        <button type="button" class="primary">Save as pcasl_gui_generated.yaml</button>
      </div>
    `,
  });
});

loadPresetButton.addEventListener("click", () => {
  openModal({
    kicker: "Load Preset",
    title: "Choose a starting workflow",
    body: `
      <div class="modal-grid">
        <section class="modal-section">
          <h4>Preclinical pCASL</h4>
          <p>Starter preset for Bruker-style pCASL processing with planned co-registration and normalization.</p>
        </section>
        <section class="modal-section">
          <h4>Preclinical multi-TI PASL</h4>
          <p>Preset for NIfTI-based absolute CBF fitting and batch processing.</p>
        </section>
      </div>
      <div class="modal-actions">
        <button type="button" id="preset-pcasl">Load pCASL preset</button>
        <button type="button" id="preset-mti">Load multi-TI preset</button>
      </div>
    `,
  });
  document.querySelector("#preset-pcasl")?.addEventListener("click", () => {
    pipelineSelect.value = "pcasl";
    renderProfile("pcasl");
    closeModal();
  });
  document.querySelector("#preset-mti")?.addEventListener("click", () => {
    pipelineSelect.value = "mti";
    renderProfile("mti");
    closeModal();
  });
});

overviewLoadPreset?.addEventListener("click", () => {
  loadPresetButton.click();
});

enterWorkbenchButton?.addEventListener("click", () => {
  enterWorkbench("workbench");
});

overviewEnterButton?.addEventListener("click", () => {
  enterWorkbench("workbench");
});

overviewRunBatch?.addEventListener("click", () => {
  enterWorkbench("workbench");
  showPanel(batchPanel);
  runBatchButton.click();
});

addModuleButton.addEventListener("click", () => {
  openModal({
    kicker: "Add Module",
    title: "Extend the current workflow",
    body: `
      <div class="modal-grid">
        <section class="modal-section">
          <h4>Available now</h4>
          <ul class="modal-list">
            <li>MotionCheck</li>
            <li>SaveOutputs</li>
            <li>SlicePLDAdjust</li>
          </ul>
        </section>
        <section class="modal-section">
          <h4>Planned 2026 modules</h4>
          <ul class="modal-list">
            <li>PreclinicalCoregister</li>
            <li>PreclinicalNormalize</li>
          </ul>
        </section>
      </div>
      <div class="modal-actions">
        <button type="button" id="module-close">Close</button>
      </div>
    `,
  });
  document.querySelector("#module-close")?.addEventListener("click", closeModal);
});

useTemplateButton.addEventListener("click", () => {
  setView("templates");
});

validateButton.addEventListener("click", () => {
  setView("workbench");
  showPanel(qcPanel);
  openModal({
    kicker: "Validate",
    title: "Pipeline validation results",
    body: `
      <section class="modal-section">
        <h4>Checks performed</h4>
        <ul class="modal-list">
          <li>input directory present</li>
          <li>pipeline type selected</li>
          <li>template path supplied for normalization</li>
          <li>batch queue contains runnable datasets</li>
        </ul>
      </section>
      <section class="modal-section">
        <h4>Status</h4>
        <p>Validation passed with one warning: <strong>cohort-c / sub-07</strong> still needs a template assignment before batch launch.</p>
      </section>
      <div class="modal-actions">
        <button type="button" class="primary" id="validate-ok">Looks Good</button>
      </div>
    `,
  });
  document.querySelector("#validate-ok")?.addEventListener("click", closeModal);
});

toggleYamlButton?.addEventListener("click", () => {
  setView("workbench");
  showPanel(yamlPanel);
  setYamlFocusMode(true);
});

hideYamlButton?.addEventListener("click", () => {
  hidePanel(yamlPanel);
  setYamlFocusMode(false);
});

renderProfile("pcasl");
setView("overview");
