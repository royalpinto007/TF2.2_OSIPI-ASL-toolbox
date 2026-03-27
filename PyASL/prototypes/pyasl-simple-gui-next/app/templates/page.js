import { AppChrome } from "../../components/AppChrome";
import { templateRows } from "../../components/data";
import { TableView } from "../../components/TableView";

export default function Page() {
  return (
    <AppChrome active="/templates">
      <header className="topbar" style={{ marginBottom: '40px' }}>
        <div>
          <span className="eyebrow">Configuration Review</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Templates & Settings</h2>
        </div>
      </header>

      <TableView
        kicker="Step 3"
        title="Review template and settings"
        headers={["Name", "Type", "Path"]}
        rows={templateRows}
        description="Review the shared settings that will be used for every dataset in the batch."
        actionLabel="Next: Run Processing"
        actionHref="/runs"
      />
    </AppChrome>
  );
}
