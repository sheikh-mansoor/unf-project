import { Box, styled } from "@mui/material";

export const RowFlexContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  gap: "1rem",
  overflow: "scroll",
}));
