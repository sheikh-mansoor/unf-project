import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { TRestaurant } from "..";
import ChainsHeader from "./ChainsHeader";
import NoRestaurantFound from "./NoRestaurantFound";
import ChainDrawer from "./RestaurantDrawer";
import RestaurantsGrid from "./RestaurantsGrid";
import RestaurantsTable from "./RestaurantsTable";

const PageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(5),
  marginTop: theme.spacing(4),
}));

type ChainsListProps = {
  restaurants: TRestaurant[];
};

const RestaurantsList: React.FC<ChainsListProps> = ({ restaurants }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<TRestaurant | null>(null); // Track selected chain for editing
  const [isGridView, setIsGridView] = useState<boolean>(true);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const toggleDrawer = (open: boolean, chain?: TRestaurant) => () => {
    setSelectedRestaurant(chain || null); // Set selected chain or reset for new chain
    setIsDrawerOpen(open);
  };

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  // Filter restaurants by search term
  const filteredChains = restaurants.filter((chain) =>
    chain.name.toLowerCase().includes(searchTerm),
  );

  return (
    <PageContainer>
      <ChainsHeader
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        isGridView={isGridView}
        onToggleView={toggleView}
        onOpenDrawer={toggleDrawer(true)} // Opens drawer for adding a new chain
      />

      <ChainDrawer
        isOpen={isDrawerOpen}
        onClose={toggleDrawer(false)}
        restaurant={selectedRestaurant} // Pass selected chain for edit or null for a new chain
      />

      {
        filteredChains.length > 0 ?
          isGridView ?
            <RestaurantsGrid
              restaurants={filteredChains}
              onEdit={(chain) => toggleDrawer(true, chain)()}
            /> // Pass onEdit with selected chain
          : <RestaurantsTable
              restaurants={filteredChains}
              onEdit={(chain) => toggleDrawer(true, chain)()}
            />

          // Pass onEdit with selected chain
        : <NoRestaurantFound />
      }
    </PageContainer>
  );
};

export default RestaurantsList;
