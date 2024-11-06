import { Box, FormHelperText, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { CustomInputField } from "../../../components/input-fields";
import { RangeSliderComponent } from "./RangeSliderComponent";

interface RangeComponentProps {
  start: string | number;
  end: string | number;
  onStartChange?: (value: string) => void;
  onEndChange?: (value: string) => void;
  isFirstTier?: boolean;
  previousTierEndValue?: number;
  nextTierStartValue?: number;
  onValidationChange?: (isValid: boolean) => void; // New prop to notify parent about validation status
}

export const RangeComponent: React.FC<RangeComponentProps> = ({
  start,
  end,
  onStartChange,
  onEndChange,
  isFirstTier = false,
  previousTierEndValue,
  nextTierStartValue,
  onValidationChange, // Added prop for validation feedback
}) => {
  const [localStart, setLocalStart] = useState<string>(start.toString());
  const [localEnd, setLocalEnd] = useState<string>(end.toString());

  const [startError, setStartError] = useState<string | null>(null);
  const [endError, setEndError] = useState<string | null>(null);

  // Sync local state with props when they change
  useEffect(() => {
    setLocalStart(start.toString());
  }, [start]);

  useEffect(() => {
    setLocalEnd(end.toString());
  }, [end]);

  // Validate start value
  const validateStart = useCallback(
    (value: number) => {
      if (isFirstTier) {
        if (value < 1) {
          setStartError("Start value must be at least 1.");
          return false;
        }
      } else if (previousTierEndValue && value < previousTierEndValue + 1) {
        setStartError(
          `Start value must be at least ${previousTierEndValue + 1}.`,
        );
        return false;
      } else if (value > Number(localEnd)) {
        setStartError(`Start value must be less than end value `);
        return false;
      }
      setStartError(null); // Clear error if validation passes
      return true;
    },
    [isFirstTier, previousTierEndValue, localEnd],
  );

  // Validate end value
  const validateEnd = useCallback(
    (value: number) => {
      if (value <= Number(localStart)) {
        setEndError("End value must be greater than the start value.");
        return false;
      }
      if (nextTierStartValue && value >= nextTierStartValue) {
        setEndError(`End value must be less than ${nextTierStartValue}.`);
        return false;
      }
      setEndError(null); // Clear error if validation passes
      return true;
    },
    [localStart, nextTierStartValue],
  );

  // Validate when both localStart and localEnd are updated
  useEffect(() => {
    if (localStart !== "" && localEnd !== "") {
      const isValid =
        validateStart(Number(localStart)) && validateEnd(Number(localEnd));
      if (onValidationChange) {
        onValidationChange(isValid); // Notify parent about the validation status
      }
    }
  }, [localStart, localEnd, validateStart, validateEnd, onValidationChange]);

  // Handle start input changes
  const handleStartChange = (value: string) => {
    setLocalStart(value === "" ? "" : value);
    if (value !== "" && onStartChange) {
      onStartChange(value); // Pass the value to the parent component
    }
  };

  // Handle end input changes
  const handleEndChange = (value: string) => {
    setLocalEnd(value === "" ? "" : value);
    if (value !== "" && onEndChange) {
      onEndChange(value); // Pass the value to the parent component
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flex: 1 }}>
          <CustomInputField
            inputType="number"
            startAdornmentText="AED"
            variant="outlined"
            label="Start"
            value={localStart}
            onChange={(e) => handleStartChange(e.target.value)}
            fullWidth
            inputProps={{
              min:
                isFirstTier ? 1
                : previousTierEndValue ? previousTierEndValue + 1
                : 0,
            }}
            error={Boolean(startError)}
          />
          <Box height={startError ? "1.5rem" : "1.5rem"}>
            {startError && <FormHelperText error>{startError}</FormHelperText>}
          </Box>
        </Box>
        <Typography sx={{ mx: 2, alignSelf: "center" }}>-</Typography>
        <Box sx={{ flex: 1 }}>
          <CustomInputField
            inputType="number"
            startAdornmentText="AED"
            variant="outlined"
            label="End"
            value={localEnd}
            onChange={(e) => handleEndChange(e.target.value)}
            fullWidth
            inputProps={{ min: Number(localStart) || 0 }}
            error={Boolean(endError)}
          />
          <Box height={endError ? "1.5rem" : "1.5rem"}>
            {endError && <FormHelperText error>{endError}</FormHelperText>}
          </Box>
        </Box>
      </Box>

      {/* Range Slider that syncs with start and end values */}
      <RangeSliderComponent
        rangeValues={[Number(localStart) || 0, Number(localEnd) || 0]}
        onRangeChange={(newValues: number[]) => {
          handleStartChange(newValues[0].toString());
          handleEndChange(newValues[1].toString());
        }}
      />
    </Box>
  );
};
