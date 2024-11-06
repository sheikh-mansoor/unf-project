import { Box, styled } from "@mui/material";
import React, { useState } from "react";
import { CustomTabs } from "../../components/custom-tabs";
import { withDashboardLayout } from "../../components/layouts/DashboardLayout";
import { PersonalDetails } from "./components/personal-details";
import { ActivityHistory } from "./components/tabs/ActivityHistory";
import { Statistics } from "./components/tabs/Statistics";

const LeftSection = styled(Box)(({ theme }) => ({
  flex: 1,
  height: "auto",
  borderRight: `1px solid ${theme.palette.divider}`,
  overflow: "hidden",
}));

const RightSection = styled(Box)(() => ({
  width: 300,
  height: "100%",
}));

const UserDetailsComp: React.FC = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs = [
    { label: "Activity History", content: <ActivityHistory /> },
    { label: "Statistics", content: <Statistics /> },
  ];

  return (
    <Box display="flex" height="100vh">
      <LeftSection>
        <CustomTabs
          tabs={tabs}
          value={value}
          onChange={handleChange}
          tabStyles={{
            "&.Mui-selected": { outline: "none" },
            "&:focus": { outline: "none" },
          }}
        />
      </LeftSection>
      <RightSection>
        <PersonalDetails />
      </RightSection>
    </Box>
  );
};

export const UserDetails = withDashboardLayout(UserDetailsComp);
