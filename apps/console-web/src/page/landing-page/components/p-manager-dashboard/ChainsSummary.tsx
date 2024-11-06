import { Box } from "@mui/material";
import {
  ChainHouseOfCanapes,
  ChainLeBaulanger,
  ChainMaroosh,
  ChainPremiumGrills,
  ChainTikkas,
  ChainUnf,
} from "../../../../assets/chains";
import { ChainSummaryCard } from "../../../../components/cards/chain-summary-card";

// Define the type for restaurant data
interface RestaurantData {
  title: string;
  value: string;
  percentage: number;
  change: string;
  logo: string;
}

// Data array containing restaurant details
const restaurantData: RestaurantData[] = [
  {
    title: "Maroosh",
    value: "AED 6,650",
    percentage: -10,
    change: "+20 today",
    logo: ChainMaroosh,
  },
  {
    title: "PremiumGrilzz",
    value: "AED 6,650",
    percentage: 1,
    change: "-20 today",
    logo: ChainPremiumGrills,
  },
  {
    title: "Tikkas",
    value: "AED 6,650",
    percentage: 1,
    change: "-2 today",
    logo: ChainTikkas,
  },
  {
    title: "UNF Catering",
    value: "AED 6,650",
    percentage: -11,
    change: "+20 today",
    logo: ChainUnf,
  },
  {
    title: "House of Canapes",
    value: "AED 6,650",
    percentage: -13,
    change: "+20 today",
    logo: ChainHouseOfCanapes,
  },
  {
    title: "Le Boulanger",
    value: "AED 6,650",
    percentage: -91,
    change: "+20 today",
    logo: ChainLeBaulanger,
  },
  {
    title: "UNF Catering",
    value: "AED 6,650",
    percentage: 21,
    change: "+20 today",
    logo: ChainUnf,
  },
  {
    title: "UNF Catering",
    value: "AED 6,650",
    percentage: -221,
    change: "+20 today",
    logo: ChainUnf,
  },
  {
    title: "Maroosh",
    value: "AED 6,650",
    percentage: -91,
    change: "+20 today",
    logo: ChainMaroosh,
  },
];

// Main component to render all restaurant summaries
export const ChainsSummary: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto", // Enable horizontal scrolling
        gap: "1rem",
        // padding: "1rem",
        whiteSpace: "nowrap", // Prevent line breaks
        backgroundColor: "background.default",
      }}
    >
      {restaurantData.map((restaurant) => (
        <ChainSummaryCard
          key={restaurant.title}
          title={restaurant.title}
          value={restaurant.value}
          logo={restaurant.logo}
          percentage={restaurant.percentage}
          sx={{
            width: "225px", // Set fixed width
            height: "150px", // Set fixed height
            flex: "0 0 auto", // Prevent shrinking
          }}
        />
      ))}
    </Box>
  );
};
