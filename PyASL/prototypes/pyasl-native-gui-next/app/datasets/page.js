import { AppChrome } from "../../components/AppChrome";
import { datasetRows } from "../../components/data";
import { TableView } from "../../components/TableView";

export default function Page() {
  return (
    <AppChrome active="/datasets">
      <TableView kicker="Datasets" title="Study browser" headers={["Dataset", "Status", "Pipeline"]} rows={datasetRows} />
    </AppChrome>
  );
}
