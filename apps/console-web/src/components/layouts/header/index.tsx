// Header.tsx
import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import { NotificationSvg } from "../../../assets";
import { Searchbar } from "./searchbar";
import { UserProfile } from "./userProfile";

const drawerWidth = 240;

export const Header: React.FC<{ onDrawerToggle: () => void }> = () => {
  const user = {
    name: "ABC",
    role: "Platform Manager",
    image:
      "https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?b=1&s=612x612&w=0&k=20&c=MsKXmwf7TDRdKRn_lHohhmD5rvVvnGs9ry0xl6CrMT4=",
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "background.default",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Searchbar />
        <NotificationSvg />
        <UserProfile user={user} />
      </Toolbar>
    </AppBar>
  );
};
