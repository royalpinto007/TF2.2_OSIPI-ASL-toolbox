import { AppChrome } from "../../components/AppChrome";
import { runRows } from "../../components/data";
import { TableView } from "../../components/TableView";

export default function Page() {
  return (
    <AppChrome active="/runs">
      <TableView kicker="Runs" title="Recent execution history" headers={["Run ID", "Status", "Summary"]} rows={runRows} />
    </AppChrome>
  );
}
