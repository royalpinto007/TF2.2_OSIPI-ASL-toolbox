import { AppChrome } from "../../components/AppChrome";
import { runRows } from "../../components/data";
import { TableView } from "../../components/TableView";

export default function Page() {
  return (
    <AppChrome active="/runs">
      <header className="topbar" style={{ marginBottom: '40px' }}>
        <div>
          <span className="eyebrow">Processing Monitor</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Batch Progress</h2>
        </div>
      </header>

      <section className="metric-card" style={{ marginBottom: '40px', padding: '32px' }}>
        <div style={{ maxWidth: '800px' }}>
          <h3 style={{ marginBottom: '16px' }}>Track progress for each dataset in the current batch</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            PyASL runs the same workflow on every selected dataset and shows progress for each one here.
          </p>
        </div>
        
        <div className="hero-metrics" style={{ marginTop: '32px' }}>
          <div className="metric-card" style={{ padding: '20px' }}>
            <span className="metric">Batch ID</span>
            <strong>batch-2026-03-19-001</strong>
          </div>
          <div className="metric-card" style={{ padding: '20px' }}>
            <span className="metric">Workflow</span>
            <strong>Preclinical pCASL</strong>
          </div>
          <div className="metric-card" style={{ padding: '20px' }}>
            <span className="metric">Status</span>
            <strong>1 complete, 1 running, 1 queued</strong>
          </div>
        </div>
      </section>

      <TableView
        kicker="Step 4"
        title="Run processing"
        headers={["Dataset", "Status", "Batch run"]}
        rows={runRows}
        description="Each dataset below is part of the same batch and moves through the workflow separately."
        actionLabel="Next: View Results"
        actionHref="/reports"
      />
    </AppChrome>
  );
}
