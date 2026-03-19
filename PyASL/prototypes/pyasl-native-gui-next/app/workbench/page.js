import { AppChrome } from "../../components/AppChrome";
import { WorkbenchPage } from "../../components/WorkbenchPage";

export default function Page() {
  return (
    <AppChrome active="/workbench">
      <WorkbenchPage />
    </AppChrome>
  );
}
