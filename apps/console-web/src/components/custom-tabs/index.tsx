import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
    style={{ height: "100%", overflow: "auto" }}
  >
    {value === index && (
      <Box p={3} width="100%">
        <Typography component="div">{children}</Typography>
      </Box>
    )}
  </div>
);

interface CustomTabsProps {
  tabs: { label: string; content: React.ReactNode }[];
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  tabStyles?: object;
}

export const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs,
  value,
  onChange,
  tabStyles,
}) => (
  <Box>
    <Box display="flex" justifyContent="center">
      <Tabs
        value={value}
        onChange={onChange}
        variant="scrollable"
        sx={{ width: "fit-content" }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            sx={{
              "&.Mui-selected": { outline: "none" },
              "&:focus": { outline: "none" },
              ...tabStyles,
            }}
          />
        ))}
      </Tabs>
    </Box>
    {tabs.map((tab, index) => (
      <TabPanel key={index} value={value} index={index}>
        {tab.content}
      </TabPanel>
    ))}
  </Box>
);
