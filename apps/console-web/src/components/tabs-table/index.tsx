import { CustomTable } from "./components/CustomTable";
import {
  MONTHLY_ENTRIES,
  TODAY_ENTRIES,
  WEEKLY_ENTRIES,
  YEARLY_ENTRIES,
  YESTERDAY_ENTRIES,
} from "./components/data";

export function TableTabs() {
  return (
    <CustomTable
      dataSets={[
        { label: "Today", labelKey: "day", data: TODAY_ENTRIES[0].data }, // Access the data array inside
        {
          label: "Yesterday",
          labelKey: "day",
          data: YESTERDAY_ENTRIES[0].data,
        },
        {
          label: "Last 7 Days",
          labelKey: "week",
          data: WEEKLY_ENTRIES[0].data,
        },
        {
          label: "Last 30 Days",
          labelKey: "month",
          data: MONTHLY_ENTRIES[0].data,
        },
        {
          label: "Last 365 Days",
          labelKey: "year",
          data: YEARLY_ENTRIES[0].data,
        },
      ]}
    />
  );
}
