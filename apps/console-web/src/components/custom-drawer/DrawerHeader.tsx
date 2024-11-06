// components/DrawerHeader.tsx
import { Typography } from "@mui/material";
import React from "react";

interface DrawerHeaderProps {
  title: string;
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({ title }) => {
  return (
    <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
      {title}
    </Typography>
  );
};

export default DrawerHeader;
