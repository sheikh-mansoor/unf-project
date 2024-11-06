// components/InputLayout.tsx
import { Grid } from "@mui/material";
import React from "react";

interface InputLayoutProps {
  children: React.ReactNode;
  spacingBottom?: number; // Optional prop for custom bottom spacing
}

const InputLayout: React.FC<InputLayoutProps> = ({
  children,
  spacingBottom = 3,
}) => {
  const childCount = React.Children.count(children);
  const width = childCount > 0 ? Math.floor(12 / childCount) : 12;

  return (
    <Grid container spacing={2}>
      {React.Children.map(children, (child) => (
        <Grid item xs={width} sx={{ marginBottom: spacingBottom }}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
};

export default InputLayout;
