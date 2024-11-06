import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "343px", // Adjust width as needed
  height: "36px", // Adjust height as needed
  "& .MuiOutlinedInput-root": {
    borderRadius: "99px", // Custom border radius
    "& fieldset": {
      borderColor: theme.palette.border?.primary || "#ccc", // Custom border color from theme or default
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main, // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main, // Border color when focused
    },
  },
  "& .MuiInputBase-input": {
    height: "40px", // Ensures the input height matches the component
    padding: "8px 12px", // Custom padding inside the input
  },
  "& .css-qg80d6-MuiInputBase-root-MuiOutlinedInput-root": {
    height: "inherit",
  },
}));

const SearchTextField: React.FC<{
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, onChange }) => {
  return (
    <StyledTextField
      variant="outlined"
      value={value}
      onChange={onChange}
      placeholder="Search"
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchTextField;
