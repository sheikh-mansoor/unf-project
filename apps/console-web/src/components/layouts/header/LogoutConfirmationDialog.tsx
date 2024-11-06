import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import React from "react";
import { LogoutIconSvg } from "../../../assets/header";

interface LogoutConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutConfirmationDialog: React.FC<
  LogoutConfirmationDialogProps
> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="logout-dialog-title"
      aria-describedby="logout-dialog-description"
      PaperProps={{
        sx: {
          width: "416px", // Set the width
          padding: 3, // Adjust padding
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center", // Center text horizontally
        },
      }}
    >
      {/* Centering the Logout Icon */}
      <Box sx={{ textAlign: "center", marginBottom: 2 }}>
        <LogoutIconSvg />
      </Box>

      {/* Logout Title */}
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ fontSize: "24px", fontWeight: "700" }}
      >
        Logout
      </Typography>

      {/* Confirmation Text */}
      <DialogContent>
        <DialogContentText id="logout-dialog-description">
          Hi, m.shiekh@155solutions.com
        </DialogContentText>
        <DialogContentText id="logout-dialog-description">
          Are you sure you want to log out?
        </DialogContentText>
      </DialogContent>

      {/* Buttons: Yes and No should span the full width equally */}
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: 0,
        }}
      >
        <Button
          onClick={onClose}
          color="primary"
          variant="outlined"
          sx={{
            width: "168px",
            height: "50px",
            flex: 1,
            margin: 1,
            textTransform: "none",
            borderColor: (theme) => theme.palette.primary.main, // Correct way to apply primary color
            color: "primary.main", // Ensure the text color matches the border
          }}
        >
          No
        </Button>
        <Button
          onClick={onConfirm}
          color="primary"
          variant="contained"
          sx={{
            flex: 1,
            margin: 1,
            color: "#FFF",
            textTransform: "none",
            width: "168px",
            height: "50px",
          }} // Span the width equally
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
