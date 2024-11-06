import GridViewIcon from "@mui/icons-material/GridView";
import MenuIcon from "@mui/icons-material/Menu"; // Import the hamburger icon
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import SearchTextField from "./SearchTextField";

const HeaderContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(3),
}));

const HeaderGroup = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem", // Add spacing between elements
});

type HeaderProps = {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isGridView: boolean;
  onToggleView: (view: "grid" | "table") => void;
  leftComponent: React.ReactNode;
};

const ManagersHeader: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  isGridView,
  onToggleView,
  leftComponent,
}) => {
  return (
    <HeaderContainer>
      {/* Left-aligned section: Passed as a prop */}
      <HeaderGroup>{leftComponent}</HeaderGroup>

      {/* Right-aligned section: Search bar and view toggle icons */}
      <HeaderGroup>
        {/* Search bar with consistent styles */}
        <SearchTextField value={searchTerm} onChange={onSearchChange} />

        {/* Table View (Hamburger Menu) Button */}
        <IconButton
          onClick={() => onToggleView("table")}
          color={!isGridView ? "primary" : "default"} // Highlight when active
          sx={{
            "&:focus": {
              outline: "none",
            },
            "&:focus-visible": {
              outline: "none",
            },
          }}
        >
          <MenuIcon /> {/* Hamburger icon */}
        </IconButton>

        {/* Grid View Button */}
        <IconButton
          onClick={() => onToggleView("grid")}
          color={isGridView ? "primary" : "default"} // Highlight when active
          sx={{
            "&:focus": {
              outline: "none",
            },
            "&:focus-visible": {
              outline: "none",
            },
          }}
        >
          <GridViewIcon />
        </IconButton>
      </HeaderGroup>
    </HeaderContainer>
  );
};

export default ManagersHeader;
