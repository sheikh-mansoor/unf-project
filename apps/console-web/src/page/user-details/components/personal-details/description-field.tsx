import { Box, Typography, styled } from "@mui/material";
import React from "react";

const StyledLabel = styled(Typography)(() => ({
  fontSize: "12px",
}));

const StyledValue = styled(Typography)(() => ({
  fontSize: "15px",
}));

interface DescriptionFieldProps {
  label: string;
  value: string | number;
}

export const DescriptionField: React.FC<DescriptionFieldProps> = ({
  label,
  value,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <StyledLabel>{label}</StyledLabel>
      <StyledValue>{value}</StyledValue>
    </Box>
  );
};
