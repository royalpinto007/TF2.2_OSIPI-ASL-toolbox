import { datasetRows, profiles } from "./data";
import Link from "next/link";

export function WorkbenchPage() {
  const profile = profiles.pcasl;
  const visibleSteps = profile.previewSteps || [];

  return (
    <>
      <header className="topbar" style={{ marginBottom: "28px" }}>
        <div>
          <span className="eyebrow">Workflow Setup</span>
          <h2 style={{ fontSize: "2.25rem", fontWeight: 800 }}>Workflow Selection</h2>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <div className="metric-card" style={{ padding: "12px 20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span className="metric" style={{ margin: 0 }}>Active:</span>
            <strong>pCASL</strong>
          </div>
        </div>
      </header>

      <section className="overview-card" style={{ padding: "40px" }}>
        <div className="panel-head" style={{ textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
          <div>
            <p className="panel-kicker">Step 1</p>
            <h3>Choose a workflow</h3>
            <p className="workflow-inline-help">
              Pick the workflow that best matches your study, then continue to data selection.
            </p>
          </div>
          <div className="workflow-select-wrap">
            <select className="header-select" defaultValue="pcasl" style={{
              background: "var(--surface)",
              color: "var(--text-primary)",
              border: "1px solid var(--border)",
              padding: "12px 16px",
              borderRadius: "var(--radius-md)"
            }}>
              <option value="pcasl">Preclinical pCASL</option>
              <option value="mti">Preclinical multi-TI PASL</option>
              <option value="custom">Custom mixed pipeline</option>
            </select>
          </div>
        </div>

        <div className="preview-flow" style={{ gap: "12px" }}>
          {visibleSteps.map((step, index) => (
            <article className="preview-step" key={step.title} style={{ padding: "20px" }}>
              <span className="preview-step-index" style={{ width: "36px", height: "36px", fontSize: "0.9rem" }}>{index + 1}</span>
              <div>
                <strong style={{ display: "block", fontSize: "1rem" }}>{step.title}</strong>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{step.module}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="metric-card" style={{ marginTop: "40px", background: "rgba(99, 102, 241, 0.05)", borderColor: "rgba(99, 102, 241, 0.2)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p className="panel-kicker">Batch processing</p>
              <h4 style={{ fontSize: "1.25rem" }}>Run across {datasetRows.length} datasets</h4>
            </div>
            <div style={{ display: "flex", gap: "16px" }}>
              <Link href="/datasets" className="button-link primary">Next: Select Data</Link>
              <Link href="/runs" className="button-link secondary">View batch runs</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
