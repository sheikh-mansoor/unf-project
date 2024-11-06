import { Box, CssBaseline } from "@mui/material";
import React, { ComponentType } from "react";
import { ROLES } from "../../constants/roles";
import { Header } from "./header"; // Adjust the path to where your Header component is located
import { ChainManagerSidebar } from "./sidebar/chain-manager";
import { PlatformLoyaltyManagerSidebar } from "./sidebar/p-loyalty-manager";
import { PlatformManagerSidebar } from "./sidebar/p-manager";

const drawerWidth = 240;

interface WithDashboardLayoutProps {
  // Define any additional props here if necessary
}

// Function to render the correct sidebar based on role
const renderSidebarForRole = (
  role: string | null,
  open: boolean,
  handleDrawerToggle: () => void,
) => {
  switch (role) {
    case ROLES.PLATFORM_LOYALTY_MANAGER.value:
      return (
        <PlatformLoyaltyManagerSidebar
          open={open}
          onClose={handleDrawerToggle}
        />
      );
    case ROLES.PLATFORM_MANAGER.value:
      return (
        <PlatformManagerSidebar open={open} onClose={handleDrawerToggle} />
      );
    case ROLES.CHAIN_MANAGER.value:
      return <ChainManagerSidebar open={open} onClose={handleDrawerToggle} />;
    default:
      return null; // No sidebar or a default one if role doesn't match
  }
};

export const withDashboardLayout = <P extends object>(
  Component: ComponentType<P>,
) => {
  return (props: P & WithDashboardLayoutProps) => {
    const [open, setOpen] = React.useState(false);

    const handleDrawerToggle = () => {
      setOpen(!open);
    };

    // Get the role from localStorage
    const role = localStorage.getItem("role");

    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header onDrawerToggle={handleDrawerToggle} />

        {/* Render the correct sidebar based on the user's role */}
        {role && renderSidebarForRole(role, open, handleDrawerToggle)}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            mt: 8, // Adjust to avoid overlap with the header
          }}
        >
          <Component {...props} />
        </Box>
      </Box>
    );
  };
};
