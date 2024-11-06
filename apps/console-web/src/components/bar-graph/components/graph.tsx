import { Box, Tab, Tabs, styled, useTheme } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
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
  width: 500,
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  borderRadius: "0.75rem",
  padding: "1rem",
  backgroundColor: "white",
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
      },
    ],
    height: 300,
    sx: {
      rect: {
        clipPath: "inset(0% round 10px)", // Applying clip-path to create rounded corners
      },
      ".MuiChartsAxis-line": {
        display: "none",
      },
      ".MuiChartsAxis-tick": {
        display: "none",
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
          sx={{
            backgroundColor: "#F8F8F8",
            borderRadius: "8px",
          }}
        >
          {dataSets.map((set, index) => (
            <Tab
              key={index}
              label={set.label}
              sx={{
                "&:focus": {
                  outline: "none",
                },
                // Remove the default bottom border for the selected tab
                "& .Mui-selected": {
                  borderBottom: "none", // Removes the bottom border on selection
                },
              }}
            />
          ))}
        </Tabs>
      )}
      <BarChart
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
