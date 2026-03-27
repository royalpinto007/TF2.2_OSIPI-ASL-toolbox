import { AppChrome } from "../../components/AppChrome";
import { profiles } from "../../components/data";
import Link from "next/link";

export default function Page() {
  const workflowEntries = Object.values(profiles);

  return (
    <AppChrome active="/workbench">
      <header className="topbar" style={{ marginBottom: '40px' }}>
        <div>
          <span className="eyebrow">Learning Center</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Workflow Guide</h2>
        </div>
        <Link href="/workbench" className="button-link primary">Back to Selection</Link>
      </header>

      <section className="metric-card" style={{ marginBottom: '40px', padding: '32px' }}>
        <div style={{ maxWidth: '800px' }}>
          <h3 style={{ marginBottom: '16px' }}>Which workflow should I choose?</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Compare the workflows below, pick the one that matches your data, and then return to the workflow selection page.
          </p>
        </div>
      </section>


      <section className="panel full-panel">
        <div className="workflow-guide-grid">
          {workflowEntries.map((workflow) => (
            <article className="workflow-guide-card" key={workflow.label}>
              <div className="workflow-guide-header">
                <strong>{workflow.label}</strong>
                <span className="workflow-guide-tag">Available</span>
              </div>
              <p>{workflow.summary}</p>

              <div className="workflow-guide-details">
                <div className="workflow-guide-detail">
                  <span>Choose this if</span>
                  <p>{workflow.useWhen}</p>
                </div>
                <div className="workflow-guide-detail">
                  <span>Input</span>
                  <p>{workflow.expectedInput}</p>
                </div>
                <div className="workflow-guide-detail">
                  <span>You will get</span>
                  <p>{workflow.outputFocus}</p>
                </div>
              </div>

              <div className="workflow-guide-section">
                <span className="panel-kicker">Typical processing steps</span>
              </div>
              <div className="workflow-guide-list">
                {workflow.previewSteps.map((step) => (
                  <div key={step.title} className="workflow-guide-step">
                    <div className="workflow-guide-step-head">
                      <span>{step.title}</span>
                      <small>{step.module}</small>
                    </div>
                    <p>{step.description}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppChrome>
  );
}
