import { Button, DialogActions } from "@mui/material";
import React from "react";

interface ExtendedDialogActionsProps {
  handleClose: () => void;
  onSuccess: () => void; // Callback for the success button (submit)
  showCancelButton?: boolean; // Control cancel button visibility
  cancelLabel?: string; // Custom label for the cancel button
  successLabel?: string; // Custom label for the success button
}

export const ExtendedDialogActions: React.FC<ExtendedDialogActionsProps> = ({
  handleClose,
  onSuccess, // Added for handling submit
  showCancelButton = true, // Default to true, so the cancel button shows by default
  cancelLabel = "Cancel", // Default cancel label
  successLabel = "Save changes", // Default success label
}) => (
  <DialogActions
    sx={{
      display: "flex",
      flexDirection: showCancelButton ? "row" : "column", // Align the buttons depending on cancel button visibility
      width: "100%", // Ensure it spans full width
    }}
  >
    {showCancelButton && (
      <Button variant="outlined" onClick={handleClose} sx={{ flex: 1 }}>
        {cancelLabel}
      </Button>
    )}
    <Button
      variant="contained"
      onClick={onSuccess} // Trigger onSuccess for submission
      fullWidth={!showCancelButton} // Span full width if no cancel button is present
      sx={{
        marginLeft: showCancelButton ? "8px" : 0, // Add margin if both buttons are present
        flex: showCancelButton ? 1 : undefined, // Equal width if both buttons, full width otherwise
        color: "#FFF",
      }}
    >
      {successLabel}
    </Button>
  </DialogActions>
);
