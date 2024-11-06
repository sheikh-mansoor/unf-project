import { Box, Typography, styled } from "@mui/material";
import { FC, ReactNode } from "react";

interface HeaderProps {
  title: string;
  children?: ReactNode;
}

const BargraphTitle = styled(Typography)(() => ({
  textAlign: "left",
  fontSize: "1rem",
  fontWeight: 600,
}));
export const Header: FC<HeaderProps> = ({ title, children }) => {
  return (
    <Box sx={{ marginBottom: "1rem" }}>
      <BargraphTitle>{title}</BargraphTitle>
      {children}
    </Box>
  );
};
