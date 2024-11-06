import { Box, styled } from "@mui/material";
import React, { ReactNode } from "react";

interface RowFlexContainerProps {
  children: ReactNode;
}

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
});

export const RowFlexContainer: React.FC<RowFlexContainerProps> = ({
  children,
}) => {
  return <StyledBox>{children}</StyledBox>;
};
