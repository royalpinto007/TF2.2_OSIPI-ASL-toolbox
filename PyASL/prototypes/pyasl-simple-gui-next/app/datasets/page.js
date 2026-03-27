import { AppChrome } from "../../components/AppChrome";
import { datasetRows } from "../../components/data";
import { TableView } from "../../components/TableView";

export default function Page() {
  return (
    <AppChrome active="/datasets">
      <header className="topbar" style={{ marginBottom: '40px' }}>
        <div>
          <span className="eyebrow">Batch Setup</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Dataset Selection</h2>
        </div>
      </header>

      <section className="metric-card" style={{ marginBottom: '40px', padding: '32px' }}>
        <div style={{ maxWidth: '800px' }}>
          <h3 style={{ marginBottom: '16px' }}>Select all datasets you want to include in this run</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            The selected workflow will be applied to every dataset shown below as one batch run.
          </p>
        </div>
        
        <div className="hero-metrics" style={{ marginTop: '32px' }}>
          <div className="metric-card" style={{ padding: '20px' }}>
            <span className="metric">Workflow</span>
            <strong>Preclinical pCASL</strong>
          </div>
          <div className="metric-card" style={{ padding: '20px' }}>
            <span className="metric">Count</span>
            <strong>3 datasets</strong>
          </div>
          <div className="metric-card" style={{ padding: '20px' }}>
            <span className="metric">Mode</span>
            <strong>Batch Processing</strong>
          </div>
        </div>
      </section>

      <TableView
        kicker="Step 2"
        title="Select study data"
        headers={["Select", "Dataset", "Ready for run"]}
        rows={datasetRows}
        description="Choose all datasets that should be processed together in the same batch."
        actionLabel="Next: Review Settings"
        actionHref="/templates"
      />
    </AppChrome>
  );
}
