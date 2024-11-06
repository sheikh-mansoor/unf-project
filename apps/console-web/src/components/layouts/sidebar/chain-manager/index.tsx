import { ExpandLess, ExpandMore } from "@mui/icons-material";
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
import { DashboardSvg, HouseSvg, LoyaltySvg } from "../../../../assets/sidebar";
import { ROUTES } from "../../../../constants";

const drawerWidth = 240;

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
  {
    text: "Chain",
    icon: LoyaltySvg,
    subItems: [
      { text: "Restaurant", route: ROUTES.RESTAURANTS },
      { text: "Employess", route: `${ROUTES.USERS}` },
      { text: "Schedule", route: `${ROUTES.TIERS}` },
    ],
  },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

// Helper function to compare routes, ignoring query parameters if needed
const isRouteMatching = (route1: string, route2: string) => {
  // Remove any query parameters for route comparison if necessary
  const cleanRoute1 = route1.split("?")[0];
  const cleanRoute2 = route2.split("?")[0];
  return cleanRoute1 === cleanRoute2;
};

export const ChainManagerSidebar: React.FC<SidebarProps> = () => {
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

  const handleClick = (index: number, hasSubItems: boolean) => {
    // Only toggle the category if it has subitems
    if (hasSubItems) {
      setOpenCategory((prevState) => ({
        ...prevState,
        [index]: !prevState[index],
      }));
    }
  };

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  // Check if an item is selected by comparing the path and query params
  const isItemSelected = (route: string) => {
    const isExactMatch =
      isRouteMatching(location.pathname, route) && location.search === "";
    const isSubMatch = location.pathname + location.search === route;
    return isExactMatch || isSubMatch;
  };

  // Ensure that dropdown remains open if any subitem is selected
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
              Loaf
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
                    onClick={() => handleClick(index, !!item.subItems)}
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
                          return (
                            <ListItemButton
                              key={subItem.text}
                              onClick={() =>
                                handleNavigation(subItem.route ?? "")
                              }
                              sx={{
                                pl: 4,
                                alignItems: "center",
                                backgroundColor: "transparent",
                                "&:hover": {
                                  backgroundColor: "transparent",
                                },
                              }}
                            >
                              {/* Dash with conditional highlighting */}
                              <Typography
                                variant="body2"
                                sx={{
                                  width: "1rem",
                                  mr: 1,
                                  display: "inline-block",
                                  textAlign: "center",
                                  color:
                                    isItemSelected(subItem.route ?? "") ?
                                      theme.palette.primary.main
                                    : "inherit",
                                }}
                              >
                                —
                              </Typography>
                              <ListItemText
                                primary={subItem.text}
                                sx={{
                                  color:
                                    isItemSelected(subItem.route ?? "") ?
                                      theme.palette.primary.main
                                    : "inherit",
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
    </Box>
  );
};
