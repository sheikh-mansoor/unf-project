import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { CashbackTier } from "..";
import { AddItemIcon } from "../../../assets";

interface UserCardProps {
  width?: string | number;
  height?: string | number;
  children?: React.ReactNode;
  tiers?: CashbackTier[];
  handleClose?: () => void;
  handleOpen?: () => void;
  open?: boolean;
}

const StyledBox = styled(Box)(({ theme }) => ({
  width: "335px",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  border: `1px dashed ${theme.palette.primary.main}`,
  borderRadius: "12px",
  justifyContent: "space-between",
  flexGrow: 1,
}));

const ColumnContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "left",
  height: "100%",
  gap: "1rem",
  "&:hover": {
    cursor: "pointer",
  },
}));

const StyledText = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "400",
  color: "#424242",
}));

export const AddNewTierCard: React.FC<UserCardProps> = ({
  height = 150,
  handleOpen = () => {},
}) => {
  // const [isOpen, setIsOpen] = useState(open); // Use internal state with default from props

  // // Fallback functions in case handleOpen and handleClose are not provided
  // const handleModalClose = () => {
  //   if (handleClose) {
  //     handleClose();
  //   } else {
  //     setIsOpen(false);
  //   }
  // };

  // const handleModalOpen = () => {
  //   if (handleOpen) {
  //     handleOpen();
  //   } else {
  //     setIsOpen(true);
  //   }
  // };

  return (
    <Box>
      <StyledBox sx={{ height }}>
        <ColumnContainer onClick={handleOpen}>
          <AddItemIcon />
          <StyledText> Create New Tier</StyledText>
        </ColumnContainer>
      </StyledBox>
    </Box>
  );
};
