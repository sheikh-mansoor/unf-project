import {
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemText as MuiListItemText,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChainSvg,
  DashboardSvg,
  HouseSvg,
  LoyaltySvg,
  SettingsSvg,
  UserSvg,
} from "../../../../assets/sidebar";
import { ROUTES } from "../../../../constants";
import { ExtendedSidebar } from "./extended-sidebar";

const drawerWidth = 240;
const extendedSidebarWidth = 300;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
    backgroundColor: "#FFFFFF",
    color: theme.palette.text.secondary,
    padding: "0.5rem",
    position: "fixed",
    left: 0,
    top: 0,
    height: "100vh",
    zIndex: 1200,
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  padding: theme.spacing(2),
  textAlign: "left",
  borderBottom: "1px solid #F5F5F5",
  gap: "2rem",
}));

const StyledChain = styled(Typography)(({ theme }) => ({
  fontSize: "40",
  display: "flex",
  color: theme.palette.primary.main,
  alignItems: "center",
  gap: "0.5rem",
  cursor: "pointer",
}));

const ListItemButtonStyled = styled(ListItemButton)<{ selected: boolean }>(
  ({ theme, selected }) => ({
    color: selected ? theme.palette.common.white : theme.palette.text.secondary,
    borderRadius: "0.5rem",
    backgroundColor: selected ? theme.palette.primary.main : "inherit",
    "&:hover": {
      backgroundColor:
        selected ? theme.palette.primary.main : theme.palette.action.hover,
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  }),
);

const ListItemText = styled(MuiListItemText)(() => ({
  color: "inherit",
}));

interface MenuItem {
  text: string;
  route?: string;
  icon?: React.ElementType;
  subItems?: { text: string; route: string }[];
}

const menuItems: MenuItem[] = [
  { text: "Dashboard", route: ROUTES.DASHBOARD, icon: DashboardSvg },
  { text: "Chains", route: ROUTES.CHAINS, icon: ChainSvg },
  {
    text: "Managers",
    icon: UserSvg,
    subItems: [
      { text: "All", route: ROUTES.MANAGERS },
      {
        text: "Chain Managers",
        route: `${ROUTES.MANAGERS}?type=chain-managers`,
      },
      {
        text: "Loyalty Managers",
        route: `${ROUTES.MANAGERS}?type=loyalty-managers`,
      },
    ],
  },
  { text: "Loyalty", route: ROUTES.PLATFORM_MANAGER_LOYALTY, icon: LoyaltySvg },
  { text: "Settings", route: ROUTES.SETTINGS, icon: SettingsSvg },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const PlatformManagerSidebar: React.FC<SidebarProps> = () => {
  const [openCategory, setOpenCategory] = useState<{ [key: number]: boolean }>(
    {},
  );
  const [extendedSidebarOpen, setExtendedSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const sidebarContainerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarContainerRef.current &&
      !sidebarContainerRef.current.contains(event.target as Node)
    ) {
      setExtendedSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (index: number) => {
    setOpenCategory((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  const isItemSelected = (route: string) => {
    const isExactMatch = location.pathname === route && location.search === "";
    const isSubMatch = location.pathname + location.search === route;
    return isExactMatch || isSubMatch;
  };

  const keepDropdownOpen = () => {
    menuItems.forEach((item, index) => {
      if (
        item.subItems &&
        item.subItems.some((subItem) => isItemSelected(subItem.route))
      ) {
        setOpenCategory((prevState) => ({
          ...prevState,
          [index]: true,
        }));
      }
    });
  };

  useEffect(() => {
    keepDropdownOpen();
  }, [location.pathname, location.search]);

  const toggleExtendedSidebar = () => {
    setExtendedSidebarOpen(!extendedSidebarOpen);
  };

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        padding: "1rem",
      }}
      aria-label="mailbox folders"
      ref={sidebarContainerRef}
    >
      <StyledDrawer variant="permanent" open>
        <div>
          <LogoContainer>
            <Typography variant="h6" color="inherit">
              Brand Logo
            </Typography>
            <StyledChain onClick={toggleExtendedSidebar}>
              <HouseSvg strokeColor={theme.palette.primary.main} />
              Chain name
              {extendedSidebarOpen ?
                <ChevronLeft />
              : <ChevronRight />}
            </StyledChain>
          </LogoContainer>

          <List>
            {menuItems.map((item, index) => {
              const isAnySubItemSelected = (
                subItems?: { text: string; route: string }[],
              ) =>
                subItems?.some((subItem) =>
                  isItemSelected(subItem.route ?? ""),
                ) || false;

              const isMainItemSelected =
                isItemSelected(item.route ?? "") ||
                isAnySubItemSelected(item.subItems);

              return (
                <React.Fragment key={item.text}>
                  {/* Main item rendering */}
                  <ListItemButtonStyled
                    onClick={() =>
                      item.subItems ?
                        handleClick(index)
                      : handleNavigation(item.route ?? "")
                    }
                    selected={!!isMainItemSelected}
                  >
                    {item.icon && (
                      <Box
                        sx={{
                          mr: 1,
                          width: 24,
                          height: 24,
                          display: "flex",
                        }}
                      >
                        {React.createElement(item.icon, {
                          strokeColor:
                            !!isMainItemSelected ?
                              theme.palette.common.white
                            : theme.palette.text.secondary,
                        })}
                      </Box>
                    )}
                    <ListItemText primary={item.text} />
                    {item.subItems &&
                      (openCategory[index] ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButtonStyled>

                  {/* Subitem rendering */}
                  {item.subItems && (
                    <Collapse
                      in={Boolean(openCategory[index])}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {item.subItems.map((subItem) => {
                          const isSubItemSelected = isItemSelected(
                            subItem.route ?? "",
                          );

                          return (
                            <ListItemButton
                              key={subItem.text}
                              onClick={() =>
                                handleNavigation(subItem.route ?? "")
                              }
                              sx={{
                                pl: 4,
                                alignItems: "center",
                                backgroundColor: "transparent", // No background
                                "&:hover": {
                                  backgroundColor: "transparent", // Disable hover background
                                },
                              }}
                            >
                              {/* Dash with conditional highlighting */}
                              <Typography
                                variant="body2"
                                sx={{
                                  width: "1rem", // Adjust dash length
                                  mr: 1,
                                  display: "inline-block",
                                  textAlign: "center",
                                  color:
                                    isSubItemSelected ?
                                      theme.palette.primary.main
                                    : "inherit", // Highlight dash if selected
                                }}
                              >
                                —
                              </Typography>
                              <ListItemText
                                primary={subItem.text}
                                sx={{
                                  color:
                                    isSubItemSelected ?
                                      theme.palette.primary.main
                                    : "inherit", // Highlight text if selected
                                }}
                              />
                            </ListItemButton>
                          );
                        })}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              );
            })}
          </List>
        </div>
      </StyledDrawer>

      {extendedSidebarOpen && (
        <Box
          sx={{
            position: "fixed",
            left: drawerWidth,
            width: extendedSidebarWidth,
            height: "100vh",
            zIndex: 1201,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ExtendedSidebar drawerWidth={drawerWidth} isExtended={true} />
        </Box>
      )}
    </Box>
  );
};
