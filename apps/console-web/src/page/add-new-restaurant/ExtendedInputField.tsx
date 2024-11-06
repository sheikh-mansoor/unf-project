import { Box, TextField, TextFieldProps, Typography } from "@mui/material";
import React from "react";

interface ExtendedInputFieldProps extends Omit<TextFieldProps, "label"> {
  label: string;
}

export const ExtendedInputField: React.FC<ExtendedInputFieldProps> = ({
  label,
  placeholder,
  variant = "standard",
  ...props
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
      <Typography variant="caption" sx={{ mb: 0.5 }}>
        {label}
      </Typography>
      <TextField
        placeholder={placeholder}
        variant={variant}
        fullWidth
        {...props}
      />
    </Box>
  );
};
