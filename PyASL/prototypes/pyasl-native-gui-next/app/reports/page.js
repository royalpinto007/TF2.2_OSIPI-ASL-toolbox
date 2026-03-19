import { AppChrome } from "../../components/AppChrome";
import { reportRows } from "../../components/data";
import { TableView } from "../../components/TableView";

export default function Page() {
  return (
    <AppChrome active="/reports">
      <TableView kicker="Reports" title="Generated artifacts" headers={["Artifact", "Format", "Purpose"]} rows={reportRows} />
    </AppChrome>
  );
}
