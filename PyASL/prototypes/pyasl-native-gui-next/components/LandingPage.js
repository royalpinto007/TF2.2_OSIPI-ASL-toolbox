import Link from "next/link";

export function LandingPage() {
  return (
    <main className="landing-shell">
      <div className="landing-brandbar">
        <div className="landing-brand">
          <img className="landing-logo" src="/assets/OSIPI_logo_only_square.png" alt="OSIPI logo" />
          <div>
            <p className="eyebrow">OSIPI PyASL</p>
            <h1>PyASL Workbench</h1>
          </div>
        </div>
        <div className="landing-meta">
          <span>Visual workflows for ASL MRI analysis</span>
        </div>
      </div>

      <header className="topbar overview-topbar">
        <div>
          <p className="eyebrow">PyASL Interface</p>
          <h2>Visual pipeline design for reproducible ASL MRI analysis</h2>
        </div>
        <div className="topbar-actions">
          <Link href="/workbench" className="button-link secondary">Load Example</Link>
          <Link href="/workbench" className="button-link primary">Create Workflow</Link>
        </div>
      </header>

      <section className="overview-hero">
        <div className="overview-copy">
          <p className="eyebrow">Overview</p>
          <h3>Build, validate, and run ASL preprocessing workflows with transparency and control.</h3>
          <p>
            This interface is designed to make PyASL easier to use for researchers who want configurable
            pipelines, batch execution, and clearer access to QC outputs and generated configs without
            manual configuration of each processing step.
          </p>
          <div className="overview-actions">
            <Link href="/workbench" className="button-link primary">Create Workflow</Link>
            <Link href="/runs" className="button-link secondary">Open Batch Setup</Link>
          </div>
        </div>

        <div className="overview-summary">
          <div className="summary-card">
            <span className="metric">Pipeline Library</span>
            <strong>7 validated preprocessing workflows</strong>
          </div>
          <div className="summary-card">
            <span className="metric">Primary use</span>
            <strong>Preclinical ASL and batch cohort analysis</strong>
          </div>
          <div className="summary-card">
            <span className="metric">Upcoming modules</span>
            <strong>Co-registration and normalization</strong>
          </div>
        </div>
      </section>

      <section className="overview-grid">
        <article className="panel overview-card">
          <p className="panel-kicker">Pipeline Builder</p>
          <h3>Compose ASL preprocessing steps visually</h3>
          <p>Configure motion correction, calibration, filtering, and downstream modules in one workflow.</p>
        </article>

        <article className="panel overview-card">
          <p className="panel-kicker">Batch Processing</p>
          <h3>Run cohort analyses with consistent preprocessing</h3>
          <p>Apply the same validated workflow across datasets with queueing, validation, and failure handling.</p>
        </article>

        <article className="panel overview-card">
          <p className="panel-kicker">QC and Outputs</p>
          <h3>Inspect signal quality and generated outputs</h3>
          <p>Review motion checks, run logs, and saved artifacts directly from the interface.</p>
        </article>
      </section>

      <section className="workflow-strip panel">
        <div className="panel-head">
          <div>
            <p className="panel-kicker">Workflow Preview</p>
            <h3>Standardized processing path</h3>
          </div>
        </div>
        <div className="workflow-chain">
          <div className="workflow-node">Input</div>
          <div className="workflow-arrow">→</div>
          <div className="workflow-node">Motion correction</div>
          <div className="workflow-arrow">→</div>
          <div className="workflow-node">Registration</div>
          <div className="workflow-arrow">→</div>
          <div className="workflow-node">Quantification</div>
          <div className="workflow-arrow">→</div>
          <div className="workflow-node">Outputs</div>
        </div>
      </section>

      <section className="why-strip panel">
        <div className="panel-head">
          <div>
            <p className="panel-kicker">Why This Matters</p>
            <h3>Common workflow issues this interface is meant to reduce</h3>
          </div>
        </div>
        <div className="why-grid">
          <div className="why-card negative">
            <strong>Manual pipeline specification is time-consuming</strong>
            <span>Writing and comparing configs by hand is error-prone.</span>
          </div>
          <div className="why-card negative">
            <strong>Method comparison lacks standardization</strong>
            <span>Switching preprocessing strategies is difficult to track consistently.</span>
          </div>
          <div className="why-card negative">
            <strong>Scaling analyses across cohorts introduces inconsistency</strong>
            <span>Running the same workflow across many datasets requires tighter control.</span>
          </div>
          <div className="why-card positive">
            <strong>PyASL centralizes configuration and execution</strong>
            <span>Visual workflows, reusable YAML, and batch execution support reproducible analysis.</span>
          </div>
        </div>
      </section>

      <section className="repro-strip panel">
        <div className="panel-head">
          <div>
            <p className="panel-kicker">Reproducibility</p>
            <h3>Reproducible by design</h3>
          </div>
        </div>
        <div className="repro-grid">
          <div className="repro-card">
            <strong>Export workflows as YAML</strong>
            <span>Reuse the same configuration across CLI runs, notebooks, and future studies.</span>
          </div>
          <div className="repro-card">
            <strong>Keep preprocessing consistent</strong>
            <span>Apply the same parameterized workflow across entire cohorts.</span>
          </div>
          <div className="repro-card">
            <strong>Track outputs and settings</strong>
            <span>Generate logs, QC outputs, and batch summaries for auditability.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
