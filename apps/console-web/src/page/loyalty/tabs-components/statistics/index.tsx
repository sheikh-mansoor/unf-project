import { gql, useQuery } from "@apollo/client"; // Import Apollo Client's useQuery and gql
import { Box } from "@mui/material";
import React, { useState } from "react";
import { CustomTabs } from "../../../../components/custom-tabs";
import { PromoCodeStats } from "./PromoCodeStats";
import { ReferralRewardStats } from "./ReferralRewardStats";

// GraphQL query to fetch all promo codes using the new structure
const GET_ALL_PROMO_CODES = gql`
  query AllPromoCodes {
    allPromoCodes {
      message
      promoCodes {
        discountType
        discountValue
        endTime
        id
        label
        maxDiscountAmount
        minSpend
        promoCode
        promoType
        recurrence
        startTime
        total
        validFor {
          id
          operation
          property
          value
        }
      }
      status
    }
  }
`;

// GraphQL query to fetch all referral rewards
const ALL_REFERRAL_REWARDS = gql`
  query AllReferralRewards {
    allReferralRewards {
      message
      referralRewards {
        discountType
        discountValue
        id
        maxDiscountAmount
        minSpend
        points
        rewardType
      }
      status
    }
  }
`;

export const Statistics = () => {
  const [value, setValue] = useState<number>(0);

  // Fetch promo codes using the new query
  const { data: promoCodesData } = useQuery(GET_ALL_PROMO_CODES);

  // Fetch referral rewards using the useQuery hook
  const { data: referralData } = useQuery(ALL_REFERRAL_REWARDS);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs = [
    {
      label: "Referral Rewards",
      content: (
        <ReferralRewardStats
          referralRewards={
            referralData?.allReferralRewards?.referralRewards || []
          } // Pass fetched referral rewards
        />
      ),
    },
    {
      label: "Promo Codes",
      content: (
        <PromoCodeStats
          promoCodes={promoCodesData?.allPromoCodes?.promoCodes || []} // Pass the fetched promo codes to PromoCodeStats
        />
      ),
    },
  ];

  return (
    <Box display="flex" height="100vh" sx={{ justifyContent: "center" }}>
      <CustomTabs
        tabs={tabs}
        value={value}
        onChange={handleChange}
        tabStyles={{
          "&.Mui-selected": { outline: "none" },
          "&:focus": { outline: "none" },
        }}
      />
    </Box>
  );
};
