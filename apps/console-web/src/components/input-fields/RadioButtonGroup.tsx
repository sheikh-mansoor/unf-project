import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface RadioButtonGroupProps {
  labels: string[];
  defaultValue?: string;
  onChange: (value: string) => void;
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  labels,
  defaultValue = "Checkout Time", // Optional default value, default to an empty string if not provided
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue.toLowerCase());
    }
  }, [defaultValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <FormControl sx={{ mt: 5 }}>
      <FormLabel id="radio-buttons-group-label">Options</FormLabel>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        value={selectedValue}
        name="radio-buttons-group"
        onChange={handleChange}
      >
        {labels.map((label, index) => (
          <FormControlLabel
            key={index}
            value={label.toLowerCase()}
            control={<Radio />}
            label={label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
