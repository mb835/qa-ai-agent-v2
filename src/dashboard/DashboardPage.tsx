import PipelineWidget from "./widgets/PipelineWidget";
import CloudWidget from "./widgets/CloudWidget";
import TestSummaryWidget from "./widgets/TestSummaryWidget";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <PipelineWidget />
      <CloudWidget />
      <TestSummaryWidget />
    </div>
  );
}
