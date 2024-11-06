import DialogContent, { DialogContentProps } from "@mui/material/DialogContent";
import React from "react";

export const ExtendedDialogContent: React.FC<DialogContentProps> = ({
  children,
  ...rest
}) => (
  <DialogContent {...rest} sx={{ padding: "0px" }}>
    {children}
  </DialogContent>
);
