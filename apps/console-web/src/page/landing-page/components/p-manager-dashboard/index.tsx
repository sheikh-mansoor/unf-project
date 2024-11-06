import { Box } from "@mui/material";
import { BrandsSummary } from "./BrandsSummary";
import { BusinessSummary } from "./BusinessSummary";
import { ChainsSummary } from "./ChainsSummary";

export const PManagerDashboard = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <ChainsSummary />
      <BusinessSummary />
      <BrandsSummary />
    </Box>
  );
};
