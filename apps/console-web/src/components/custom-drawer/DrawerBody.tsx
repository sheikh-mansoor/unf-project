// components/DrawerBody.tsx
import { Box } from "@mui/material";
import React from "react";

interface DrawerBodyProps {
  children: React.ReactNode;
}

const DrawerBody: React.FC<DrawerBodyProps> = ({ children }) => {
  return (
    <Box
      sx={{ paddingTop: 3, display: "flex", flexDirection: "column", gap: 2 }}
    >
      {children}
    </Box>
  );
};

export default DrawerBody;
