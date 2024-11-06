import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { LogoutIconSvg, Avatar as ProfileImage } from "../../../assets"; // Custom avatar asset
import { SettingsSvg, UserSvg } from "../../../assets/sidebar";
import { ROUTES } from "../../../constants"; // Your app's routes
import { LogoutConfirmationDialog } from "./LogoutConfirmationDialog"; // Import the confirmation dialog

interface User {
  image: string;
  name: string;
  role: string;
}

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear all relevant items from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("profileCompleted");

    // Redirect to login page after logout
    navigate(`${ROUTES.LOGIN}?logged-out=true`);
  };

  const renderAvatar = () => (
    <Avatar src={user?.image || ""} sx={{ width: 50, height: 50 }}>
      {!user?.image && <ProfileImage />}{" "}
    </Avatar>
  );

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmLogout = () => {
    setDialogOpen(false);
    handleLogout(); // Call the actual logout handler
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        borderRadius: 1,
        minWidth: "7rem",
        justifyContent: "flex-end",
      }}
    >
      <IconButton
        onClick={handleClick}
        disableRipple
        disableFocusRipple
        sx={{ padding: 0 }}
      >
        {renderAvatar()}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            width: "15rem",
            borderRadius: "1.25rem",
            overflow: "hidden", // Ensure proper border radius effect
            marginTop: "0.5rem",
          },
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 2,
            borderBottom: "1px solid #e0e0e0", // Border at the bottom of the header
          }}
        >
          <Avatar
            src={user?.image || ""}
            sx={{ width: 40, height: 40, marginRight: 2 }}
          >
            {!user?.image && <ProfileImage />}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {user?.name || "User Name"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.role || "User Role"}
            </Typography>
          </Box>
        </Box>

        {/* Body Section */}
        <Box sx={{ paddingY: 1 }}>
          <MenuItem onClick={handleClose} sx={{ gap: 1 }}>
            <UserSvg />
            Profile
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ gap: 1 }}>
            <SettingsSvg />
            Settings
          </MenuItem>
          <Divider sx={{ marginY: 1 }} />
          <Box sx={{ backgroundColor: "yellow", margin: 2, gap: "1rem" }}>
            <Button
              onClick={handleOpenDialog} // Open confirmation dialog
              fullWidth
              variant="contained"
              color="error"
              sx={{
                borderRadius: 0,
                textTransform: "none",
              }}
            >
              Logout
              <LogoutIconSvg />
            </Button>
          </Box>
        </Box>
      </Menu>

      {/* Render the logout confirmation dialog */}
      <LogoutConfirmationDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmLogout}
      />
    </Box>
  );
};
