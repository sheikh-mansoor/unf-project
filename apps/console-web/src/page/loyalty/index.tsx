import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomTabs } from "../../components/custom-tabs";
import { withDashboardLayout } from "../../components/layouts/DashboardLayout";
import { ReferralReward } from "./tabs-components/ReferralReward";
import { PromoCode } from "./tabs-components/promocode";
import { Statistics } from "./tabs-components/statistics";

const LoyaltyComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define the available tabs and their corresponding URL query parameters
  const tabs = [
    {
      label: "Referral Rewards",
      value: 0,
      query: "referral-rewards",
      content: "ABC",
    },
    { label: "Promo Codes", value: 1, query: "promo-codes", content: "XYZ" },
    { label: "Statistics", value: 2, query: "statistics", content: "TUV" },
  ];

  // Read the initial tab from the URL query
  const currentTabQuery = new URLSearchParams(location.search).get("type");

  const currentTab =
    tabs.find((tab) => tab.query === currentTabQuery)?.value || 0;

  // Update the signature of handleChange to make the event parameter optional
  const handleChange = (_?: React.SyntheticEvent, newValue?: number) => {
    if (newValue !== undefined) {
      // Navigate to the new tab, update the URL query parameter
      const selectedTab = tabs[newValue];
      navigate(`?type=${selectedTab.query}`, { replace: true });
    }
  };

  useEffect(() => {
    // Synchronize tab selection with the URL when the component is mounted or URL changes
    const tabQuery = new URLSearchParams(location.search).get("type");
    const tabIndex = tabs.find((tab) => tab.query === tabQuery)?.value || 0;

    if (tabIndex !== currentTab) {
      handleChange(undefined, tabIndex); // Pass undefined for the event parameter
    }
  }, [location.search]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      height="100vh"
    >
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "100%" }}>
          <CustomTabs
            tabs={tabs.map((tab) => ({
              label: tab.label,
              content:
                tab.query === "referral-rewards" ? <ReferralReward />
                : tab.query === "promo-codes" ? <PromoCode />
                : <Statistics />,
            }))}
            value={currentTab}
            onChange={handleChange}
            tabStyles={{
              "&.Mui-selected": { outline: "none" },
              "&:focus": { outline: "none" },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export const Loyalty = withDashboardLayout(LoyaltyComponent);
