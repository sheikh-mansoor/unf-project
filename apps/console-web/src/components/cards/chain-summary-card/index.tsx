import { Box, Typography, styled } from "@mui/material";
import { PercentageRise } from "./PercentageRise"; // Import PercentageRise

// Define an interface for RestaurantCardProps
interface RestaurantCardProps {
  title: string;
  value: string;
  logo: string;
  percentage: number;
  sx?: any;
}

// Styled components for consistent layout
const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette?.border.primary}`, // Access the primary border color
  borderRadius: "12px",
  boxShadow: "0px 4px 30px 0px #1A1C210D",
  backgroundColor: theme.palette.background.paper,
  justifyContent: "space-between",
  height: "150px", // Set fixed height
  width: "225px", // Set fixed width
}));

// ChainSummaryCard component
export const ChainSummaryCard: React.FC<RestaurantCardProps> = ({
  title,
  value,
  logo,
  percentage,
  sx,
}) => {
  return (
    <StyledBox sx={sx}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt={`${title} logo`}
          style={{ width: 40, height: 40 }}
        />
        <Typography
          sx={{
            fontSize: "16px",
            lineHeight: "16px",
            fontWeight: "600",
            marginLeft: "8px",
            color: "#667085",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: "24px", fontWeight: "600" }}>
        {value}
      </Typography>
      <PercentageRise percentage={percentage} />
    </StyledBox>
  );
};
