import { Box, TextField, Typography } from "@mui/material";
import React from "react";

// Define additional props for CustomInput to include label, value, and onChange
interface CustomInputProps {
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  value?: string; // Add the value prop
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add the onChange prop
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  multiline,
  rows,
  value, // Include the value prop
  onChange, // Include the onChange prop
  ...props
}) => {
  return (
    <Box>
      {/* Static label positioned above the input field */}
      {label && (
        <Typography
          variant="body1"
          component="label"
          sx={{ marginBottom: "0.5rem" }}
        >
          {label}
        </Typography>
      )}

      {/* Input field with conditional styles for multiline or single-line inputs */}
      <TextField
        {...props}
        placeholder={placeholder}
        multiline={multiline} // Ensure multiline prop is passed correctly
        rows={rows} // Set the number of rows for multiline input
        value={value} // Bind the value prop
        onChange={onChange} // Bind the onChange handler
        fullWidth
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px", // Custom border radius
            "& fieldset": {
              borderColor: "#E0E0E0", // Set the border color
            },
            "&:hover fieldset": {
              borderColor: "#BDBDBD", // Change border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4FADE6", // Change border color when focused
            },
            // Conditionally apply height only if not multiline
            height: multiline ? "auto" : "44px",
          },
          "& .MuiInputBase-input": {
            height: multiline ? "auto" : "100%", // Dynamically adjust height for multiline
            padding: multiline ? "10px 14px" : "10px 14px", // Adjust padding for both cases
          },
        }}
      />
    </Box>
  );
};

export default CustomInput;
