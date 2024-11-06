import { Dialog, DialogProps, styled } from "@mui/material";
import React from "react";

// Define the types for the components
interface DialogBoxProps extends DialogProps {
  open: boolean;
  children: React.ReactNode;
}

const StyledDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    padding: "1rem",
  },
}));

export const DialogBox: React.FC<DialogBoxProps> = ({
  children,
  ...dialogProps
}) => {
  return <StyledDialog {...dialogProps}>{children}</StyledDialog>;
};
