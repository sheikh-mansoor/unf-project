import { Box, Typography, styled } from "@mui/material";

const StyledBasicInfoTabs = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  "& .tab": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: theme.spacing(2),
    borderBottom: `2px solid ${theme.palette.text.primary}`,
    paddingBottom: theme.spacing(1),
    "&:last-child": {
      marginRight: 0,
    },
  },
}));

const Slab = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  textAlign: "center",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  cursor: "pointer",
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
}));

const tabsData = [
  {
    value: "3k",
    label: "Spent",
  },
  {
    value: "12",
    label: "Tiers",
  },
  {
    value: "5",
    label: "Points",
  },
];

export const BasicInfoTabs = ({ tabs = tabsData }) => {
  return (
    <Box>
      <StyledBasicInfoTabs>
        {tabs.map((tab, index) => (
          <Box key={index} className="tab">
            <Typography className="value">{tab.value}</Typography>
            <Typography>{tab.label}</Typography>
          </Box>
        ))}
      </StyledBasicInfoTabs>
      <Slab>
        <Typography>Basic Info</Typography>
      </Slab>
    </Box>
  );
};
