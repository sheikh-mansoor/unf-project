import { Box } from "@mui/material";
import { BarGraph } from "../../../../components/bar-graph";
import { LineGraph } from "../../../../components/line-graph";

export const Statistics = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <BarGraph />
      <LineGraph />
    </Box>
  );
};
