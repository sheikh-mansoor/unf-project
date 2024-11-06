import MovingIcon from "@mui/icons-material/Moving"; // Importing the MovingIcon from Material-UI
import { Box, Typography } from "@mui/material";

interface PercentageRiseProps {
  percentage: number;
  pillSize?: string; // Control the size of the pill (box)
  iconSize?: string; // Control the size of the icon
  fontSize?: string; // Control the size of the percentage text
}

export const PercentageRise: React.FC<PercentageRiseProps> = ({
  percentage,
  pillSize = "4.25rem", // Default size for the pill
  iconSize = "1rem", // Default size for the icon
  fontSize = "0.875rem", // Default font size for percentage text
}) => {
  // Determine if the percentage is positive or negative
  const isPositive = percentage > 0;

  // Format the percentage with a plus or minus sign
  const formattedPercentage =
    isPositive ?
      `+${percentage}%` // Add plus sign for positive values
    : `${percentage}%`; // Negative values already have a minus sign

  return (
    <Box
      sx={{
        display: "flex",
        width: pillSize, // Set the pill size
        alignItems: "center",
        borderRadius: "20px", // Set 20px border radius
        padding: "2px 6px", // Add some padding for better spacing
        border: `1px solid #E0E2E7`, // Border color
        color: isPositive ? "green" : "red", // Text and icon color based on the percentage
      }}
    >
      {/* Render the MovingIcon with correct rotation and size based on the percentage value */}
      <MovingIcon
        sx={{
          transform: isPositive ? "rotate(0deg)" : "rotate(180deg)", // Rotate the icon for negative percentages
          color: isPositive ? "green" : "red", // Set color based on percentage
          fontSize: iconSize, // Control the icon size
          marginRight: "4px",
        }}
      />
      <Typography sx={{ fontSize }}>{formattedPercentage}</Typography>
    </Box>
  );
};
