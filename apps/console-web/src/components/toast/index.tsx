import { Alert, AlertColor, Snackbar } from "@mui/material";
import React from "react";

interface ToastNotificationProps {
  open: boolean;
  message: string;
  variant: AlertColor;
  onClose: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  open,
  message,
  variant,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={variant}
        sx={{
          width: "100%",
          backgroundColor:
            variant === "success" ? "#4caf50"
            : variant === "error" ? "#f44336"
            : variant === "warning" ? "#ff9800"
            : "#2196f3", // Customize background color for each variant
          color: "#ffffff", // Text color
          fontWeight: "bold", // Optional: Makes the text bold
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
