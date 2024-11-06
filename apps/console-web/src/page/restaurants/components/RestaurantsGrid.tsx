import { styled } from "@mui/material/styles";
import React from "react";
import { TRestaurant } from "..";
import RestaurantCard from "./restaurant-card/RestaurantCard";

const ChainsGridContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(3),
  justifyContent: "center",
}));

type ChainsGridProps = {
  restaurants: TRestaurant[];
  onEdit: (chain: TRestaurant) => void; // Add onEdit prop for editing a chain
};

const RestaurantsTable: React.FC<ChainsGridProps> = ({
  restaurants,
  onEdit,
}) => {
  return (
    <ChainsGridContainer>
      {restaurants.map((chain: TRestaurant) => (
        <RestaurantCard
          key={chain.id}
          chain={chain}
          onEdit={() => onEdit(chain)} // Trigger edit with the chain
        />
      ))}
    </ChainsGridContainer>
  );
};

export default RestaurantsTable;
