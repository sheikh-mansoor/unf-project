// components/CustomDrawer.tsx
import CloseIcon from "@mui/icons-material/Close";
import { Box, Drawer, IconButton } from "@mui/material";
import React from "react";
import DrawerBody from "./DrawerBody";
import DrawerHeader from "./DrawerHeader";

interface CustomDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  showCloseIcon?: boolean;
  children: React.ReactNode;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  open,
  onClose,
  title,
  showCloseIcon,
  children,
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          height: "100vh",
          width: "50%",
          boxShadow: 5,
          position: "fixed",
          top: 0,
          zIndex: 1300,
        },
      }}
      ModalProps={{
        sx: { zIndex: 1300 },
      }}
    >
      <Box sx={{ position: "relative", padding: 2 }}>
        {showCloseIcon && (
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "#FFEDED",
              borderRadius: "4px",
              height: "40px",
              width: "40px",
              color: "#FF4B4B",
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
        <DrawerHeader title={title} />
        <DrawerBody>{children}</DrawerBody>
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;
