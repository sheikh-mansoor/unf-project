import { Box, SelectChangeEvent, Typography } from "@mui/material";
import { useState } from "react";
import { ExtendedSelect } from "../../components/input-fields/ExtendedSelect";
import { InputFieldsWrapper } from "../../components/input-fields/InputFieldsWrapper";
import { ExtendedInputField } from "./ExtendedInputField";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

export const OperationalDetails = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Adjust handleSelectChange to handle both string and string[]
  const handleSelectChange = (
    e: SelectChangeEvent<string | string[]>,
  ): void => {
    const value = e.target.value;

    // Check if value is an array or a single string
    if (Array.isArray(value)) {
      setSelectedOptions(value as string[]);
    } else {
      setSelectedOptions([value]); // For single-select mode
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "60%",
        gap: "10px",
      }}
    >
      <Typography variant="h6">Operational Details</Typography>
      <InputFieldsWrapper>
        <ExtendedInputField
          label="Opening Hours"
          placeholder="Opening Hours"
          variant="standard"
        />
        <ExtendedInputField
          label="Cuisine Type"
          placeholder="Cuisine Type"
          variant="standard"
        />
      </InputFieldsWrapper>
      <InputFieldsWrapper>
        <ExtendedSelect
          label="Select Option"
          options={options}
          value={selectedOptions}
          multiselect
          onChange={handleSelectChange}
          fullWidth
          sx={{ mb: 2, width: "100%" }}
        />
        <ExtendedInputField
          label="Emirate"
          placeholder="Emirate"
          variant="standard"
        />
      </InputFieldsWrapper>
    </Box>
  );
};
