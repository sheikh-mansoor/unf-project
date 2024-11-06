import {
  FormControl,
  InputAdornment,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import React from "react";

interface GenericInputProps extends Omit<TextFieldProps, "type"> {
  inputType: "text" | "email" | "password" | "number";
  startAdornmentText?: string;
  endAdornmentText?: string;
  height?: string | number;
  minRows?: number; // Add minRows for multiline support
}

export const CustomInputField: React.FC<GenericInputProps> = ({
  inputType,
  startAdornmentText,
  endAdornmentText,
  InputProps,
  height = "44px", // Default height for single-line input
  label,
  placeholder,
  multiline = false, // Add default multiline to false
  minRows = 1, // Set minimum rows for multiline
  sx,
  value, // Pass Formik value prop
  onChange, // Pass Formik onChange prop
  name, // Pass Formik name prop
  error, // Pass Formik error prop
  helperText, // Pass Formik helperText prop
  ...rest
}) => {
  return (
    <FormControl fullWidth>
      {label && (
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            marginBottom: "0px",
            textAlign: "left",
          }}
        >
          {label}
        </Typography>
      )}
      <TextField
        {...rest}
        type={inputType}
        placeholder={placeholder}
        multiline={multiline} // Allow multiline input
        minRows={multiline ? minRows : undefined} // Set minRows only for multiline
        value={value} // Bind Formik value
        onChange={onChange} // Bind Formik onChange
        name={name} // Bind Formik name
        error={error} // Show error if any
        helperText={helperText} // Show helper text or error
        InputProps={{
          ...InputProps,
          startAdornment:
            startAdornmentText ?
              <InputAdornment
                position="start"
                sx={{
                  borderRight: "1px solid #E0E0E0",
                  height: "100%", // Span the full height of the input
                  display: "flex",
                  alignItems: "center",
                  paddingRight: "3px", // Remove padding to make the line span full height
                  marginRight: "8px", // Optional: Add space between border and input
                }}
              >
                {startAdornmentText}
              </InputAdornment>
            : InputProps?.startAdornment,
          endAdornment:
            endAdornmentText ?
              <InputAdornment
                position="end"
                sx={{
                  borderLeft: "1px solid #E0E0E0",
                  height: "calc(100% - 2px)", // Span the full height of the input
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 0, // Remove padding to make the line span full height
                  marginLeft: "8px", // Optional: Add space between border and input
                }}
              >
                {endAdornmentText}
              </InputAdornment>
            : InputProps?.endAdornment,
          style: {
            ...InputProps?.style,
          },
        }}
        fullWidth
        sx={{
          height: multiline ? "auto" : height, // Adjust height for multiline
          borderRadius: "8px",
          padding: "0px",
          marginTop: "0px",
          "& .MuiInputBase-input": {
            fontSize: "16px",
            fontWeight: 400,
          },
          "& .MuiInputBase-root": {
            height: multiline ? "auto" : "100%", // Full height for the input field
            boxSizing: "border-box",
            alignItems: multiline ? "flex-start" : "center", // Align text at the top for multiline
            borderRadius: "8px",
          },

          fieldset: {
            borderColor: "#E0E0E0",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E0E0E0 !important",
          },
          "&::placeholder": {
            fontSize: "16px",
            fontWeight: 400,
          },
          ...sx,
        }}
      />
    </FormControl>
  );
};
