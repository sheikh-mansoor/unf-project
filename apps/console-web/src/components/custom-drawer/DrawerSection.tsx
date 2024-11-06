// components/DrawerSection.tsx
import { Box, Typography } from "@mui/material";
import React from "react";

interface DrawerSectionProps {
  title: string;
  children: React.ReactNode;
}

const DrawerSection: React.FC<DrawerSectionProps> = ({ title, children }) => {
  return (
    <Box sx={{ marginBottom: 3 }}>
      <Typography
        variant="subtitle1"
        sx={{ marginBottom: 1, fontWeight: "bold" }}
      >
        {title}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {children}
      </Box>
    </Box>
  );
};

export default DrawerSection;
