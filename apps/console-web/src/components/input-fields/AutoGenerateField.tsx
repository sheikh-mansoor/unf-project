import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import React, { useEffect, useState } from "react";
import { CustomInputField } from "./CustomInputField";

interface AutoGenerateFieldProps {
  onGenerate: (code: string) => void;
  initialValue?: string;
}

export const AutoGenerateField: React.FC<AutoGenerateFieldProps> = ({
  onGenerate,
  initialValue = "",
}) => {
  const [value, setValue] = useState<string>(initialValue);

  // Update `value` whenever `initialValue` changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const generateRandomString = (length: number): string => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  };

  // Handler for button click
  const handleGenerateClick = () => {
    const randomString = generateRandomString(10); // Change 10 to your desired length
    setValue(randomString);
    onGenerate(randomString); // Notify parent component with the generated code
  };

  return (
    <CustomInputField
      label="Promo Code"
      variant="outlined"
      placeholder="Promo Code"
      fullWidth
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value)
      }
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" sx={{ height: "100%" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateClick}
            >
              Generate
            </Button>
          </InputAdornment>
        ),
      }}
      inputType="text"
    />
  );
};
