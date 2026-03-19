import { AppChrome } from "../../components/AppChrome";
import { templateRows } from "../../components/data";
import { TableView } from "../../components/TableView";

export default function Page() {
  return (
    <AppChrome active="/templates">
      <TableView kicker="Templates" title="Normalization resources" headers={["Name", "Type", "Path"]} rows={templateRows} />
    </AppChrome>
  );
}
