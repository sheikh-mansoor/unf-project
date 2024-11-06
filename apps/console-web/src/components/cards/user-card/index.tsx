import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { ActiveUsersSvg } from "../../../assets/users-summary";
import { PercentageRise } from "./PercentageRise";

// Define an interface for the props
interface UserCardProps {
  width?: string | number;
  height?: string | number;
  title: string;
  value: string;
  percentage: number;
  text: string;
}

const StyledBox = styled(Box)<{
  width?: string | number;
  height?: string | number;
}>(({ theme, width, height }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0px 4px 30px 0px #1A1C210D",
  backgroundColor: theme.palette.background.paper,
  justifyContent: "space-between",
  width: width || "225px", // Use width prop if provided
  height: height || "126px", // Use height prop if provided
  minWidth: width || "225px", // Ensure it doesn't shrink
  minHeight: height || "126px", // Ensure it doesn't shrink
  overflow: "hidden", // Prevent content from overflowing
}));

const RowContainer = styled(Box)(() => ({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  justifyContent: "space-between", // Ensure spacing between items
}));

const ColumnContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  textAlign: "left",
}));

const IconContainer = styled(Box)(() => ({
  width: "40px",
  height: "40px",
  backgroundColor: "#F4F4F4",
  borderRadius: "50px",
  "& svg": {
    width: "100%",
    height: "100%",
  },
}));

const StyledVariation = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "500",
  color: theme.palette.text.secondary,
}));
const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "600",
  color: theme.palette.text.secondary,
}));
const StyledValue = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: "600",
  color: theme.palette.text.primary,
}));

export const UserCard: React.FC<UserCardProps> = ({
  width = "225px",
  height = "126px",
  title = "",
  value = "",
  percentage = 0,
  text = "",
}) => {
  return (
    <StyledBox width={width} height={height}>
      <RowContainer>
        <ColumnContainer>
          <StyledTitle>{title}</StyledTitle>
          <StyledValue>{value}</StyledValue>
        </ColumnContainer>
        <IconContainer>
          <ActiveUsersSvg />
        </IconContainer>
      </RowContainer>
      <Box className="footer">
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <PercentageRise percentage={percentage} />
          <StyledVariation>{text}</StyledVariation>
        </Box>
      </Box>
    </StyledBox>
  );
};
