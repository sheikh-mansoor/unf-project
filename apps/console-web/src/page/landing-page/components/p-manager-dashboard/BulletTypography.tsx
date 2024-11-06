import { SxProps, Typography } from "@mui/material";
import React from "react";

interface BulletTypographyProps {
  text: string; // The text to display
  bulletColor?: string; // Color of the bullet
  bulletSize?: number; // Size of the bullet
  variant?: "h6" | "body1" | "subtitle1" | "caption"; // MUI Typography variants
  gutterBottom?: boolean; // Optional gutterBottom prop for Typography
  sx?: SxProps; // Optional additional styles
}

export const BulletTypography: React.FC<BulletTypographyProps> = ({
  text,
  bulletColor = "primary.main", // Default color
  bulletSize = 8, // Default bullet size
  variant = "body1", // Default variant
  gutterBottom = false, // Default for Typography's gutterBottom
  sx = {}, // Optional additional styles
}) => {
  return (
    <Typography
      variant={variant}
      gutterBottom={gutterBottom}
      sx={{
        position: "relative",
        pl: 3, // Padding left to create space for the bullet
        display: "inline-block",
        fontSize: "18px",
        fontWeight: "600",
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: `${bulletSize}px`,
          height: `${bulletSize}px`,
          backgroundColor: bulletColor,
          borderRadius: "50%",
        },
        ...sx, // Allow custom sx to be merged
      }}
    >
      {text}
    </Typography>
  );
};
