import CallMadeIcon from "@mui/icons-material/CallMade";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import { Typography } from "@mui/material";

// Define props interface for PercentageRise
interface PercentageRiseProps {
  percentage: number;
}

export const PercentageRise: React.FC<PercentageRiseProps> = ({
  percentage,
}) => {
  const isPositive = percentage > 0;

  return (
    <Typography
      sx={{
        display: "flex",
        alignItems: "center",
        color: isPositive ? "status.success" : "status.error",
        fontWeight: "600",
        fontSize: "14px",
      }}
    >
      {
        isPositive ?
          <CallMadeIcon sx={{ fontSize: 14 }} /> // Adjust the size using the sx prop
        : <SouthEastIcon sx={{ fontSize: 14 }} /> // Adjust the size using the sx prop
      }
      {Math.abs(percentage)}%
    </Typography>
  );
};
