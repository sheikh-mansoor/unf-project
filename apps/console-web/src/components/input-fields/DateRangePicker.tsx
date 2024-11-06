import { Box } from "@mui/material";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { CustomDatePicker } from "./DatePicker";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (newDate: Date | null) => void;
  onEndDateChange: (newDate: Date | null) => void;
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangePickerProps) {
  const startDayjs = startDate ? dayjs(startDate) : null;
  const endDayjs = endDate ? dayjs(endDate) : null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between", // Ensure space between without extra gap
        mb: 2,
        width: "100%",
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <CustomDatePicker
          label="Start Date"
          value={startDayjs}
          onChange={(newValue) => {
            onStartDateChange(newValue ? newValue.toDate() : null);
          }}
          shouldDisableDate={(date) =>
            endDayjs !== null && date.isAfter(endDayjs)
          }
        />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0, ml: 2 }}>
        {" "}
        {/* Keep a small margin between them */}
        <CustomDatePicker
          label="End Date"
          value={endDayjs}
          onChange={(newValue) => {
            onEndDateChange(newValue ? newValue.toDate() : null);
          }}
          shouldDisableDate={(date) =>
            startDayjs !== null && date.isBefore(startDayjs)
          }
        />
      </Box>
    </Box>
  );
}
