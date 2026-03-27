import { AppChrome } from "../../components/AppChrome";
import { reportRows } from "../../components/data";
import { TableView } from "../../components/TableView";

export default function Page() {
  return (
    <AppChrome active="/reports">
      <header className="topbar" style={{ marginBottom: '40px' }}>
        <div>
          <span className="eyebrow">Results Explorer</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Reports & Artifacts</h2>
        </div>
      </header>

      <TableView
        kicker="Step 5"
        title="View results"
        headers={["Artifact", "Format", "Purpose"]}
        rows={reportRows}
        description="Open saved outputs, summaries, and exported configuration files after the run completes."
      />
    </AppChrome>
  );
}
