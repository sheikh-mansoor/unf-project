import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SxProps,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { MoreVertSvg, SearchSvg } from "../../../../assets";
import {
  ChainHouseOfCanapes,
  ChainLeBaulanger,
  ChainMaroosh,
  ChainPremiumGrills,
  ChainUnf,
} from "../../../../assets/chains";
import { BulletTypography } from "./BulletTypography";

// Define the container styling (like GraphContainer)
const BrandsContainer = styled(Box)(() => ({
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  borderRadius: "0.75rem",
  // padding: "1rem",
  display: "flex",
  gap: "1rem",
  backgroundColor: "#fff",
}));

// Updated data with cuisineType and numberOfBranches
const CHAINS_DATA = [
  {
    name: "Maroosh",
    icon: ChainMaroosh,
    value: "Maroosh",
    cuisineType: "Middle Eastern",
    numberOfBranches: 12,
    businessSummary: {
      today: "2000 AED",
      yesterday: "1800 AED",
      week: "9000 AED",
    },
    orderSummary: {
      inProgress: 20,
      completed: 60,
      delayed: 3,
      cancelled: 34,
      offlineOutlet: 90,
    },
  },
  {
    name: "House of Canapes",
    icon: ChainHouseOfCanapes,
    value: "HouseOfCanapes",
    cuisineType: "French",
    numberOfBranches: 8,
    businessSummary: {
      today: "1500 AED",
      yesterday: "1700 AED",
      week: "8500 AED",
    },
    orderSummary: {
      inProgress: 15,
      completed: 50,
      delayed: 2,
      cancelled: 20,
      offlineOutlet: 80,
    },
  },
  {
    name: "UNF Catering",
    icon: ChainUnf,
    value: "UnfCatering",
    cuisineType: "Indian",
    numberOfBranches: 10,
    businessSummary: {
      today: "3000 AED",
      yesterday: "2500 AED",
      week: "12000 AED",
    },
    orderSummary: {
      inProgress: 25,
      completed: 70,
      delayed: 4,
      cancelled: 25,
      offlineOutlet: 100,
    },
  },
  {
    name: "Premium Grillz",
    icon: ChainPremiumGrills,
    value: "Premium Grillz",
    cuisineType: "American",
    numberOfBranches: 15,
    businessSummary: {
      today: "4000 AED",
      yesterday: "3800 AED",
      week: "15000 AED",
    },
    orderSummary: {
      inProgress: 30,
      completed: 80,
      delayed: 5,
      cancelled: 40,
      offlineOutlet: 110,
    },
  },
  {
    name: "Le Baulanger",
    icon: ChainLeBaulanger,
    value: "LeBaulanger",
    cuisineType: "Bakery",
    numberOfBranches: 7,
    businessSummary: {
      today: "1000 AED",
      yesterday: "1200 AED",
      week: "6000 AED",
    },
    orderSummary: {
      inProgress: 10,
      completed: 40,
      delayed: 1,
      cancelled: 10,
      offlineOutlet: 50,
    },
  },
];

// Type definition for a chain
interface Chain {
  name: string;
  icon: string;
  value: string;
  cuisineType: string;
  numberOfBranches: number;
  businessSummary: {
    today: string;
    yesterday: string;
    week: string;
  };
  orderSummary: {
    inProgress: number;
    completed: number;
    delayed: number;
    cancelled: number;
    offlineOutlet: number;
  };
}

interface SummaryItemProps {
  label: string;
  value: string;
  labelStyle?: SxProps; // Optional styles for the label
  valueStyle?: SxProps; // Optional styles for the value
}

const SummaryItem = ({
  label,
  value,
  labelStyle,
  valueStyle,
}: SummaryItemProps) => {
  return (
    <Box
      className="styled-input"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          fontSize: "14px",
          fontWeight: "500",
          ...labelStyle,
        }} // Apply default style and merge with labelStyle
      >
        {`${label}:`}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "text.primary",
          fontSize: "16px",
          fontWeight: "500",
          ...valueStyle,
        }} // Apply default style and merge with valueStyle
      >
        {value}
      </Typography>
    </Box>
  );
};

// BrandsSummary Component
export const BrandsSummary = () => {
  // Set the first chain as default selected
  const [selectedChain, setSelectedChain] = useState<Chain | null>(
    CHAINS_DATA[0],
  );

  const handleChainClick = (chain: Chain) => {
    setSelectedChain(chain);
  };

  return (
    <BrandsContainer>
      {/* Left side - List of chains with icons */}
      <Box
        sx={{
          flex: 1,
          borderRight: "1px solid #E0E2E7",
          pr: 2,
          padding: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            {`Total ${CHAINS_DATA.length} brands`}
          </Typography>
          <SearchSvg />
        </Box>
        <List>
          {CHAINS_DATA.map((chain) => (
            <ListItem
              button
              key={chain.value}
              onClick={() => handleChainClick(chain)}
              selected={selectedChain?.value === chain.value}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "transparent", // Remove background color for selected item
                  color: "primary.main", // Set text and icon to primary color
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "transparent", // Remove hover background color for selected item
                },
                borderRadius: "0.5rem",
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.5rem 0",
              }}
            >
              {/* Render the chain icon */}
              <ListItemIcon>
                <img src={chain.icon} alt={chain.name} />
              </ListItemIcon>
              {/* Render the chain name */}
              <ListItemText primary={chain.name} />

              {/* Chevron Icon only for selected item */}
              {selectedChain?.value === chain.value && (
                <ChevronRightIcon sx={{ color: "primary.main" }} />
              )}
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Right side - Details of selected chain */}
      <Box
        sx={{
          flex: 2,
          pl: 2,
          padding: "1rem",
        }}
      >
        {selectedChain ?
          <>
            {/* Display selected chain icon */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                mb: 2,
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box
                  component="img"
                  src={selectedChain.icon}
                  alt={selectedChain.name}
                  sx={{ width: 150, height: 150, mr: 2 }} // Adjust size as needed
                />
                <Box>
                  {/* Display selected chain name */}
                  <Typography
                    variant="h5"
                    sx={{
                      marginBottom: "1rem",
                      fontSize: "24px",
                      fontWeight: "700",
                    }}
                  >
                    {selectedChain.name}
                  </Typography>
                  <SummaryItem
                    label="Cuisine"
                    value={selectedChain.cuisineType}
                    valueStyle={{ color: "status.success" }}
                  />
                  <SummaryItem
                    label="Branches"
                    value={selectedChain.numberOfBranches.toString()}
                    valueStyle={{ color: "text.primary" }}
                  />
                </Box>
              </Box>
              {/* <MoreVertIcon
                fontSize="small"
                sx={{
                  backgroundColor: "#F5F5F5",
                  height: "44px",
                  width: "44px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              /> */}
              <MoreVertSvg />
            </Box>

            {/* Display business summary */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "2rem",
              }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
              >
                <BulletTypography
                  text="Business Summary"
                  bulletColor="status.warning"
                  bulletSize={10}
                  variant="h6"
                />
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <SummaryItem
                    label="Today"
                    value={selectedChain.businessSummary.today}
                  />
                  <SummaryItem
                    label="Yesterday"
                    value={selectedChain.businessSummary.yesterday}
                  />
                  <SummaryItem
                    label="This week"
                    value={selectedChain.businessSummary.week}
                  />
                </Box>
              </Box>

              {/* Display order summary */}
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
              >
                <BulletTypography
                  text="Order Summary"
                  bulletColor="status.warning"
                  bulletSize={10}
                  variant="h6"
                />
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <SummaryItem
                    label="In Progress"
                    value={selectedChain.orderSummary.inProgress.toString()}
                  />
                  <SummaryItem
                    label="Completed"
                    value={selectedChain.orderSummary.completed.toString()}
                  />
                  <SummaryItem
                    label="Delayed"
                    value={selectedChain.orderSummary.delayed.toString()}
                  />
                  <SummaryItem
                    label="Cancelled"
                    value={selectedChain.orderSummary.cancelled.toString()}
                  />
                  <SummaryItem
                    label="Offline Outlet"
                    value={selectedChain.orderSummary.offlineOutlet.toString()}
                  />
                </Box>
                <Button
                  sx={{
                    marginTop: "4rem",
                    color: "#FFF",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                  variant="contained"
                >
                  View Restaurant
                </Button>
              </Box>
            </Box>
          </>
        : <Typography variant="body1">
            Select a chain to view details
          </Typography>
        }
      </Box>
    </BrandsContainer>
  );
};
