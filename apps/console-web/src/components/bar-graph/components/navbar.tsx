import { Box, Typography } from "@mui/material";
import React from "react";

interface INavbar {
  labels: string[];
}

export const Navbar: React.FC<INavbar> = ({ labels }) => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      {labels.map((label, index) => (
        <Typography key={index}>{label}</Typography>
      ))}
    </Box>
  );
};
