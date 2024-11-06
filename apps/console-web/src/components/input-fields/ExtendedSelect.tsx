import {
  Checkbox,
  FormControl,
  FormHelperText,
  ListItemText,
  MenuItem,
  Select,
  SelectProps,
  Typography,
} from "@mui/material";
import React, { ReactNode } from "react";

interface ExtendedSelectProps
  extends Omit<SelectProps<string | string[]>, "multiple"> {
  options: Array<{ value: string; label: string }>;
  multiselect?: boolean;
  label?: string;
  height?: string | number;
  sx?: object;
  error?: boolean; // Add error prop to handle error state
  helperText?: string; // Add helperText prop to display errors or messages
}

export const ExtendedSelect: React.FC<ExtendedSelectProps> = ({
  options,
  multiselect = false,
  label,
  height = "44px", // Default height to match CustomInputField
  sx,
  error, // Destructure error prop
  helperText, // Destructure helperText prop
  ...rest
}) => {
  const renderValue = (selected: unknown): ReactNode => {
    const selectedValues = selected as string | string[];
    if (Array.isArray(selectedValues)) {
      return selectedValues
        .map(
          (value) =>
            options.find((option) => option.value === value)?.label || value,
        )
        .join(", ");
    }
    return (
      options.find((option) => option.value === selectedValues)?.label ||
      selectedValues
    );
  };

  const labelId = `${rest.name}-label`;

  return (
    <FormControl fullWidth error={error}>
      {" "}
      {/* Add error prop to FormControl */}
      {label && (
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontSize: "14px", fontWeight: 400, marginBottom: "0px" }}
        >
          {label}
        </Typography>
      )}
      <Select
        {...rest}
        labelId={labelId}
        multiple={multiselect}
        renderValue={renderValue}
        sx={{
          height, // Use the same height as CustomInputField
          borderRadius: "8px",
          border: "1px solid #E0E0E0", // Matching border
          padding: "0px",
          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center", // Align text vertically center
            height: "100%", // Ensure the select spans the full height
            boxSizing: "border-box",
            fontSize: "16px",
            fontWeight: 400,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none", // Disable default Select border
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none", // Remove border when focused
          },
          ...sx, // Allow additional sx styling
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {multiselect && (
              <Checkbox
                checked={(rest.value as string[]).includes(option.value)}
              />
            )}
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
