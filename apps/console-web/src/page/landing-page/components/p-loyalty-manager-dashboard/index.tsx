import { Box } from "@mui/material";
import { LineGraph } from "../../../../components/line-graph";
import { CustomTable } from "../../../../components/tables/CustomTable";
import { BarGraphs } from "./BarGraphs";
import { UsersSummary } from "./UsersSummary";

export const PLoyaltyManagerDashboard = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <UsersSummary />
      <LineGraph />
      <BarGraphs />
      <CustomTable />
    </Box>
  );
};
