import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { TRestaurant } from "../..";
import { MoreVertSvg } from "../../../../assets";
import { ChainCircuitSvg, ChainMaroosh } from "../../../../assets/chains";
import StatusPill from "./StatusPill";

const StyledCard = styled(Card)(() => ({
  width: 355,
  height: 316,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "0.75rem",
  position: "relative",
}));

const StyledCardContent = styled(CardContent)(() => ({
  height: "70%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: "6px",
  marginBottom: theme.spacing(2),
}));

const StyledLowerBox = styled(Box)(() => ({
  height: "30%",
  display: "flex",
  borderTop: "1px solid #ccc",
}));

const StyledCTABox = styled(Box)(() => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRight: "1px solid #ccc",
  padding: "1rem",
  "&:last-child": {
    borderRight: "none",
  },
}));

const StyledButton = styled(Button)(() => ({
  width: "100%",
  height: "100%",
  borderRadius: 0,
}));

const StyledName = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "600",
  color: theme.palette.text.primary,
}));

const StyledAddress = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "400",
  color: theme.palette.text.primary,
}));

const StyledCode = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "500",
  color: theme.palette.primary.main,
}));

const MoreVertContainer = styled(Box)(() => ({
  position: "absolute",
  top: "8px",
  right: "8px",
  cursor: "pointer",
}));

type ChainCardProps = {
  chain: TRestaurant;
  onEdit: (chain: TRestaurant) => void;
};

const RestaurantCard: React.FC<ChainCardProps> = ({ chain, onEdit }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <StyledCard>
      <MoreVertContainer>
        <IconButton onClick={handleMenuOpen}>
          <MoreVertSvg />
        </IconButton>
      </MoreVertContainer>

      {/* Menu for edit action */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            onEdit(chain);
            handleMenuClose();
          }}
        >
          Edit Chain Details
        </MenuItem>
      </Menu>

      {/* Upper portion (70%) */}
      <StyledCardContent>
        <StyledAvatar alt={chain.name} src={ChainMaroosh} />
        <StyledName variant="h6">{chain.name}</StyledName>
        <StyledAddress variant="h6">{`Address: ${chain.address}`}</StyledAddress>
        <StyledCode variant="body2">{`Code: ${chain.emirate}`}</StyledCode>
      </StyledCardContent>

      {/* Lower portion (30%) */}
      <StyledLowerBox>
        <StyledCTABox>
          <StatusPill status={"open"} />
        </StyledCTABox>

        <StyledCTABox>
          <StyledButton
            variant="text"
            color="primary"
            onClick={() => alert(`Message ${chain.name}`)}
            sx={{ textTransform: "none" }}
          >
            <ChainCircuitSvg />
            {"Restaurants"}
          </StyledButton>
        </StyledCTABox>
      </StyledLowerBox>
    </StyledCard>
  );
};

export default RestaurantCard;
