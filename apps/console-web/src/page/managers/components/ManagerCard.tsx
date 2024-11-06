import { Email as EmailIcon, Person as PersonIcon } from "@mui/icons-material";
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
import { MoreVertSvg } from "../../../assets";
import { ROLES } from "../../../constants/roles";
import { TManager } from "../index";

const profilePlaceholder = "https://via.placeholder.com/150";

type ManagerCardProps = {
  manager: TManager;
  onEdit: (manager: TManager) => void;
};

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

const MoreVertContainer = styled(Box)(() => ({
  position: "absolute",
  top: "8px",
  right: "8px",
  cursor: "pointer",
}));

const ManagerCard: React.FC<ManagerCardProps> = ({ manager, onEdit }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const roleLabel = ROLES[manager.role]?.label || "Unknown Role";

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

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            onEdit(manager);
            handleMenuClose();
          }}
        >
          Edit Manager
        </MenuItem>
      </Menu>

      <StyledCardContent>
        <StyledAvatar alt={manager.firstName} src={profilePlaceholder} />
        <Typography variant="h6">{manager.firstName}</Typography>
        <Typography variant="h6">{roleLabel}</Typography>
        <Typography variant="body2">{manager.email}</Typography>
      </StyledCardContent>

      <StyledLowerBox>
        <StyledCTABox>
          <StyledButton
            variant="text"
            color="primary"
            onClick={() => alert(`Message ${manager.role}`)}
            startIcon={<EmailIcon />}
          >
            Message
          </StyledButton>
        </StyledCTABox>

        <StyledCTABox>
          <StyledButton
            variant="text"
            color="secondary"
            onClick={() => alert(`Navigate to ${manager.lastName}'s profile`)}
            startIcon={<PersonIcon />}
          >
            Profile
          </StyledButton>
        </StyledCTABox>
      </StyledLowerBox>
    </StyledCard>
  );
};

export default ManagerCard;
