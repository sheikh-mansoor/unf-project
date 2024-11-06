import { gql, useQuery } from "@apollo/client";
import { Box, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { withDashboardLayout } from "../../components/layouts/DashboardLayout";
import { AddNewTierCard } from "./components/AddNewTierCard";
import { CashbackTierModal } from "./components/CashbackTierModal";
import { TierCard } from "./components/TierCard";

// Define the TypeScript type for a single cashback tier
export type CashbackTier = {
  id: string;
  name: string;
  startValue: number;
  endValue: number;
  percentage: number;
  createdAt: string;
  updatedAt: string;
  description: string;
};

// Define the response type for the GraphQL query
export type CashbackTiersResponse = {
  allCashbackTiers: {
    cashbackTiers: CashbackTier[];
    message: string;
    status: string;
  };
};

// Define the GraphQL query for fetching cashback tiers
const GET_CASHBACK_TIERS = gql`
  query AllCashbackTiers {
    allCashbackTiers {
      cashbackTiers {
        id
        name
        startValue
        endValue
        percentage
        createdAt
        updatedAt
      }
      message
      status
    }
  }
`;

// Styled components for loading and error states
const LoadingContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(5),
}));

const ErrorContainer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(5),
  textAlign: "center",
}));

// Color palette for tiers
const TIER_COLORS = [
  "#FFEB3B", // Yellow
  "#4CAF50", // Green
  "#F44336", // Red
  "#2196F3", // Blue
  "#FF9800", // Orange
  "#9C27B0", // Purple
  "#00BCD4", // Cyan
  "#3F51B5", // Indigo
  "#8BC34A", // Light Green
  "#FFC107", // Amber
];

// Main component for loyalty tiers
const LoyaltyTiersComponent = () => {
  const [openNewTierModal, setOpenNewTierModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState<CashbackTier | null>(null); // State to store the selected tier for editing

  // UseEffect to open the modal only after selectedTier is updated
  useEffect(() => {
    if (selectedTier) {
      setOpenNewTierModal(true); // Open modal when selectedTier is set
    }
  }, [selectedTier]);

  const handleCloseNewTierModal = () => {
    setOpenNewTierModal(false);
    setSelectedTier(null); // Reset selected tier when modal is closed
  };

  const handleOpenNewTierModal = () => {
    setOpenNewTierModal(true);
  };

  // Function to handle opening the modal for editing a specific tier
  const handleEditTier = (tier: CashbackTier) => {
    setSelectedTier(tier); // Set the tier to be edited
  };

  // Use the types for the query response
  const { loading, error, data } =
    useQuery<CashbackTiersResponse>(GET_CASHBACK_TIERS);

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <Typography color="error">
          Error: {error.message || "An error occurred while fetching tiers"}
        </Typography>
      </ErrorContainer>
    );
  }

  // Extract cashbackTiers from the query response
  const tiersData: CashbackTier[] = data?.allCashbackTiers?.cashbackTiers || [];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <AddNewTierCard
        tiers={tiersData}
        open={openNewTierModal}
        handleOpen={handleOpenNewTierModal}
        handleClose={handleCloseNewTierModal}
      />
      <Box sx={{ display: "flex", gap: "1rem" }}>
        {tiersData.map((tier: CashbackTier, index: number) => (
          <TierCard
            key={tier.id}
            title={tier.name}
            lowerLimit={tier.startValue.toString()}
            upperLimit={tier.endValue.toString()}
            members={tier.percentage.toString()} // Assuming "members" is the percentage here
            color={TIER_COLORS[index % TIER_COLORS.length]} // Assign color based on index
            onEdit={() => handleEditTier(tier)} // Pass the tier to be edited to the handler
          />
        ))}
      </Box>
      {openNewTierModal && (
        <CashbackTierModal
          open={openNewTierModal}
          handleClose={handleCloseNewTierModal}
          tiers={tiersData}
          tier={selectedTier} // Pass the selected tier for editing if applicable
        />
      )}
    </Box>
  );
};

// Export the component wrapped with the dashboard layout
export const LoyaltyTiers = withDashboardLayout(LoyaltyTiersComponent);
