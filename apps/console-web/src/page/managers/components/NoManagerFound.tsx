import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { NoManagersIllustration } from "../../../assets/managers";
import AddManagerDrawer from "./AddManagerDrawer";

export const NoManagerFound: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <NoManagersIllustration />
      <Typography>There's no manager yet!</Typography>
      <Button variant="contained" onClick={toggleDrawer(true)}>
        Add new manager
      </Button>
      <AddManagerDrawer isOpen={isDrawerOpen} onClose={toggleDrawer(false)} />
    </Box>
  );
};

export default NoManagerFound;
