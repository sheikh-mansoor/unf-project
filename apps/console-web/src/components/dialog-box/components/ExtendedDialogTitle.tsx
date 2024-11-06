import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import * as React from "react";

interface DialogTitleProps {
  title: string;
  summary?: string;
  handleClose: () => void;
}

export const ExtendedDialogTitle: React.FC<DialogTitleProps> = ({
  title,
  summary,
  handleClose,
}) => (
  <div>
    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
      {title}
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <Typography variant="subtitle1" sx={{ px: 2 }}>
      {summary}
    </Typography>
  </div>
);
