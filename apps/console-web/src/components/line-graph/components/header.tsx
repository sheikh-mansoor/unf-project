import { Box, Typography, styled } from "@mui/material";
import { FC, ReactNode } from "react";
import { MoreVertSvg } from "../../../assets";

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <BargraphTitle>{title}</BargraphTitle>
      {children}
      <MoreVertSvg />
    </Box>
  );
};
