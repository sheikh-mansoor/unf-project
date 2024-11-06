import { Box, Slider, TextField, Typography } from "@mui/material";
import React from "react";

interface RangeSliderComponentProps {
  rangeValues?: number[]; // Allow rangeValues to be undefined
  onRangeChange: (newValues: number[]) => void;
}

export const RangeSliderComponent: React.FC<RangeSliderComponentProps> = ({
  rangeValues = [0, 100], // Default rangeValues to [0, 100]
  onRangeChange,
}) => {
  // Guard clause: Ensure rangeValues is an array with two numbers
  const validRangeValues =
    Array.isArray(rangeValues) && rangeValues.length === 2 ?
      rangeValues
    : [0, 100]; // Default to [0, 100] if rangeValues is invalid

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    onRangeChange(newValue as number[]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValues = [...validRangeValues];
    if (name === "startRange") {
      newValues[0] = Math.min(Number(value), newValues[1] - 1); // Prevent start from exceeding end
    } else if (name === "endRange") {
      newValues[1] = Math.max(Number(value), newValues[0] + 1); // Prevent end from being less than start
    }
    onRangeChange(newValues);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {/* Start Box */}
      <Box
        sx={{
          flex: "0 0 120px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          backgroundColor: "#E0E2E7",
          borderRadius: "6px",
          padding: "8px",
          boxSizing: "border-box",
        }}
      >
        <Typography>Start</Typography>
        <TextField
          name="startRange"
          value={validRangeValues[0]} // Ensure this is always defined
          onChange={handleInputChange}
          sx={{ width: "80%" }}
          inputProps={{
            style: {
              padding: "5px 8px",
              height: "20px",
            },
          }}
        />
      </Box>

      {/* Slider */}
      <Box sx={{ flex: 1, px: 2, display: "flex", alignItems: "center" }}>
        <Slider
          value={validRangeValues}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          min={0}
          max={10000}
          sx={{ marginTop: 0, marginBottom: 0 }}
        />
      </Box>

      {/* End Box */}
      <Box
        sx={{
          flex: "0 0 120px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          backgroundColor: "#E0E2E7",
          borderRadius: "6px",
          padding: "8px",
          boxSizing: "border-box",
        }}
      >
        <Typography>End</Typography>
        <TextField
          name="endRange"
          value={validRangeValues[1]} // Ensure this is always defined
          onChange={handleInputChange}
          sx={{ width: "80%" }}
          inputProps={{
            style: {
              padding: "5px 8px",
              height: "20px",
            },
          }}
        />
      </Box>
    </Box>
  );
};
