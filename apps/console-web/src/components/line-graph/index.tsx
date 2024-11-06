import {
  MONTHLY_ENTRIES,
  WEEKLY_ENTRIES,
  YEARLY_ENTRIES,
} from "./components/data";
import { Graph } from "./components/graph";

export interface IGraph {
  dataSets: {};
}

export function LineGraph() {
  return (
    <Graph
      dataSets={[
        { label: "Monthly", labelKey: "month", data: MONTHLY_ENTRIES },
        { label: "Weekly", labelKey: "week", data: WEEKLY_ENTRIES },
        { label: "Yearly", labelKey: "year", data: YEARLY_ENTRIES },
      ]}
    />
  );
}
