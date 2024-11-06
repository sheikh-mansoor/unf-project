import { Box, Tab, Tabs, styled, useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useState } from "react";
import { Header } from "./header";

type SeriesValueFormatter<T> = (value: T) => string;

const valueFormatter: SeriesValueFormatter<number | null> = (
  value: number | null,
) => {
  if (value === null) return "N/A";
  return `${value}mm`;
};

const GraphContainer = styled(Box)(() => ({
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  borderRadius: "0.75rem",
  padding: "1rem",
}));

interface GraphDataPoint {
  [key: string]: number | string;
}

interface DataSet {
  label: string;
  labelKey: string;
  data: GraphDataPoint[];
}

interface GraphProps {
  dataSets: DataSet[];
}

export const Graph = ({ dataSets }: GraphProps) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [graphData, setGraphData] = useState(
    dataSets.length ? dataSets[0].data : [],
  );
  const [activeLabelKey, setActiveLabelKey] = useState(
    dataSets.length ? dataSets[0].labelKey : "month",
  );

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setGraphData(dataSets[newValue].data);
    setActiveLabelKey(dataSets[newValue].labelKey);
  };

  const chartSetting = {
    series: [
      {
        dataKey: "seoul",
        valueFormatter,
        color: theme.palette.primary.main,
        area: true,
        fill: "url('#myGradient')", // Gradient fill for the area under the curve
      },
    ],
    height: 300,
    grid: {
      horizontal: true, // Enable horizontal grid lines
    },
    sx: {
      // Hide x and y axis lines and ticks
      ".MuiChartsAxis-line": {
        display: "none",
      },
      ".MuiChartsAxis-tick": {
        display: "none",
      },
      // Styling the horizontal grid lines to be dotted
      ".MuiChartsGrid-horizontalLine": {
        strokeDasharray: "4 4", // Dotted line style for horizontal grid lines
        stroke: theme.palette.grey[300], // Light grey color for grid lines
      },
      // Thinner line for the chart
      "& .MuiLineElement-root": {
        strokeWidth: 2, // Reduced stroke width for a thinner line
      },
      "& .MuiAreaElement-root": {
        fill: "url('#myGradient')", // Gradient fill for the area
      },
    },
  };

  return (
    <GraphContainer>
      <Header title="Revenue by Campaigns" />
      {dataSets.length > 1 && (
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="Graph Data Tabs"
          sx={{ borderBottom: "1px solid #E0E2E7" }}
        >
          {dataSets.map((set, index) => (
            <Tab
              key={index}
              label={set.label}
              sx={{
                "&:focus": {
                  outline: "none",
                },
              }}
            />
          ))}
        </Tabs>
      )}

      {/* Define the gradient */}
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id="myGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(79, 173, 230, 0.5)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
        </defs>
      </svg>

      <LineChart
        dataset={graphData}
        xAxis={[
          {
            scaleType: "band",
            dataKey: activeLabelKey,
          },
        ]}
        {...chartSetting}
      />
    </GraphContainer>
  );
};
