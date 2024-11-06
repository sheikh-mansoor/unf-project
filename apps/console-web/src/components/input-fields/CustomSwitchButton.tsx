import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import React from "react";

type Props = {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string | JSX.Element;
};

export function CustomSwitchButton({ checked, onChange, label }: Props) {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={checked} onChange={onChange} />}
        label={label}
      />
    </FormGroup>
  );
}
