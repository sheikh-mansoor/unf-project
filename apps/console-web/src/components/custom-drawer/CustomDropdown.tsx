import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectProps,
  Typography,
} from "@mui/material";
import React from "react";

// Define the props for CustomDropdown
type CustomDropdownProps = SelectProps & {
  label: string;
  options: { value: string | number; label: string }[];
  value: string | number; // Ensure value is either string or number
  onChange: (e: React.ChangeEvent<{ value: unknown }>) => void; // Fix onChange typing
  error?: boolean; // Add error prop for validation
  helperText?: string; // Add helperText prop for displaying error or additional info
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  error = false, // Default error to false
  helperText = "", // Default helperText to empty string
  ...props
}) => {
  return (
    <Box>
      {/* Static label positioned above the dropdown */}
      {label && (
        <Typography
          variant="body1"
          component="label"
          sx={{ marginBottom: "0.5rem" }}
        >
          {label}
        </Typography>
      )}

      {/* Dropdown field with custom styling */}
      <FormControl fullWidth error={error}>
        <Select
          {...props}
          value={value} // Use the value prop passed in from parent
          onChange={onChange} // Handle the change event correctly
          sx={{
            borderRadius: "8px", // Same border radius as CustomInput
            color: "text.secondary",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E0E0E0", // Set the border color
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#BDBDBD", // Change border color on hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#4FADE6", // Change border color when focused
            },
            height: "44px", // Ensure the dropdown has the same height as CustomInput
            display: "flex",
            alignItems: "center",
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {/* Display helper text or error message */}
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default CustomDropdown;
