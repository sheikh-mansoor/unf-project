import GridViewIcon from "@mui/icons-material/GridView";
import MenuIcon from "@mui/icons-material/Menu"; // Import the hamburger icon
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import CreateNewChainButton from "./CreateNewChainButton";
import SearchTextField from "./SearchTextField"; // Import the new search component

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

type ChainsHeaderProps = {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isGridView: boolean;
  onToggleView: (view: "grid" | "table") => void;
  onOpenDrawer: () => void;
};

const ChainsHeader: React.FC<ChainsHeaderProps> = ({
  searchTerm,
  onSearchChange,
  isGridView,
  onToggleView,
  onOpenDrawer,
}) => {
  return (
    <HeaderContainer>
      {/* Left-aligned group with the "Create New Chain" button */}
      <HeaderGroup>
        <CreateNewChainButton onClick={onOpenDrawer} />
      </HeaderGroup>

      {/* Right-aligned group with the search bar and grid/table view toggle icon */}
      <HeaderGroup>
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
          <MenuIcon /> {/* Hamburger icon instead of TableViewIcon */}
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

export default ChainsHeader;
