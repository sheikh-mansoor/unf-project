import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { EditIcon } from "../../../assets";
import Line from "../../../components/line-component";

interface TierCardProps {
  width?: string | number;
  height?: string | number;
  title: string;
  children?: React.ReactNode;
  members?: string;
  lowerLimit?: string;
  upperLimit?: string;
  color?: string; // Add color prop
  onEdit: () => void; // Add onEdit prop for edit button click
}

// Use the color prop to dynamically assign background color
const StyledBox = styled(Box)<{ bgcolor: string }>(({ theme, bgcolor }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "12px",
  boxShadow: theme.shadows[1],
  justifyContent: "space-between",
  flexGrow: 1,
  background: `linear-gradient(${bgcolor}, #ffffff)`, // Create gradient from color to white
}));

const RowContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const ColumnContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  textAlign: "left",
  height: "100%",
}));

const IconContainer = styled(Box)(() => ({
  width: "20px",
  height: "20px",
  borderRadius: "50px",
  "& svg": {
    width: "100%",
    height: "100%",
  },
}));

const StyledTitle = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "600",
}));

const StyledMembersCount = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: "500",
  color: theme.palette.text.secondary,
}));

const StyledRange = styled(Typography)(() => ({
  fontSize: "24px",
  fontWeight: "700",
}));

export const TierCard: React.FC<TierCardProps> = ({
  height = 150,
  title = "",
  members = "",
  lowerLimit = "",
  upperLimit = "",
  children,
  color = "#FFFFFF", // Default to white if no color is provided
  onEdit, // Use the onEdit prop for edit action
}) => {
  return (
    <StyledBox sx={{ height }} bgcolor={color}>
      <ColumnContainer>
        <Box>
          <RowContainer>
            <StyledTitle>{title}</StyledTitle>
            <IconContainer onClick={onEdit}>
              {" "}
              {/* Trigger onEdit when clicked */}
              <EditIcon />
            </IconContainer>
          </RowContainer>
          <StyledMembersCount>{`Members ${members}`}</StyledMembersCount>
          <StyledRange>{`Range ${lowerLimit} - ${upperLimit}`}</StyledRange>
        </Box>
        <Line height={8} width={300} ratio={0.75} />
      </ColumnContainer>
      <Box className="footer">{children}</Box>
    </StyledBox>
  );
};
