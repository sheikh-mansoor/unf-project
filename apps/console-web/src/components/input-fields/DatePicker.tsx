import { Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";

interface CustomDatePickerProps {
  label: string;
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  shouldDisableDate?: (date: Dayjs) => boolean;
  error?: boolean; // Add error prop
  helperText?: string | undefined; // Ensure helperText is either string or undefined
}

export function CustomDatePicker({
  label,
  value,
  onChange,
  shouldDisableDate,
  error = false, // Default to false
  helperText = undefined, // Default to undefined
}: CustomDatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {label && (
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontSize: "14px", fontWeight: 400, marginBottom: "0px" }}
        >
          {label}
        </Typography>
      )}
      <DesktopDatePicker
        value={value}
        onChange={onChange}
        shouldDisableDate={shouldDisableDate}
        sx={{ width: "100%" }}
        slotProps={{
          textField: {
            error: error, // Pass error prop to TextField
            helperText: helperText || " ", // Display helperText or an empty space to maintain layout
            InputProps: {
              sx: {
                height: "40px", // Set the height for the input
                width: "100%",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E0E0E0 !important",
                },
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
