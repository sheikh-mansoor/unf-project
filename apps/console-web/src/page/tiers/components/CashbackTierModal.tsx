import { gql, useMutation } from "@apollo/client";
import {
  Box,
  DialogProps,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CashbackTier } from "..";
import { DialogBox } from "../../../components/dialog-box";
import { ExtendedDialogActions } from "../../../components/dialog-box/components/ExtendedDialogActions";
import { ExtendedDialogContent } from "../../../components/dialog-box/components/ExtendedDialogContent";
import { ExtendedDialogTitle } from "../../../components/dialog-box/components/ExtendedDialogTitle";
import { CustomInputField } from "../../../components/input-fields";
import { RangeComponent } from "./RangeComponent";

// GraphQL mutation for creating a new tier
const CREATE_CASHBACK_TIER_MUTATION = gql`
  mutation CreateCashbackTier(
    $endValue: Float!
    $name: String!
    $percentage: Float!
    $startValue: Float!
    $rewards: String
    $description: String
  ) {
    createCashbackTier(
      endValue: $endValue
      name: $name
      percentage: $percentage
      startValue: $startValue
      rewards: $rewards
      description: $description
    ) {
      cashbackTiers {
        createdAt
        description
        endValue
        id
        name
        percentage
        rewards
        startValue
        updatedAt
      }
      message
      status
    }
  }
`;

// GraphQL mutation for updating an existing tier
const UPDATE_CASHBACK_TIER_MUTATION = gql`
  mutation UpdateCashbackTier(
    $updateCashbackTierId: ID!
    $description: String
    $endValue: Float
    $name: String
    $percentage: Float
    $rewards: String
    $startValue: Float
  ) {
    updateCashbackTier(
      id: $updateCashbackTierId
      description: $description
      endValue: $endValue
      name: $name
      percentage: $percentage
      rewards: $rewards
      startValue: $startValue
    ) {
      cashbackTiers {
        createdAt
        description
        endValue
        id
        name
        percentage
        rewards
        startValue
        updatedAt
      }
      message
      status
    }
  }
`;

interface CashbackTierModalProps extends DialogProps {
  open: boolean;
  handleClose: () => void;
  tiers: CashbackTier[]; // List of existing tiers for validation
  tier?: {
    id: string;
    name: string;
    startValue: number;
    endValue: number;
    percentage: number;
    createdAt: string;
    updatedAt: string;
  } | null; // Optional tier prop for editing
}

interface UncoveredRange {
  label: string;
  start: number;
  end: number;
}

export const CashbackTierModal: React.FC<CashbackTierModalProps> = ({
  open,
  handleClose,
  tiers,
  tier, // CashbackTier passed from backend
}) => {
  const [formValues, setFormValues] = useState({
    firstName: tier?.name || "",
    cashbackPercentage: tier?.percentage?.toString() || "",
    description: "", // Could add description if available
    selectedRange: "", // Will hold the selected range's label
  });

  const [selectedRangeValues, setSelectedRangeValues] = useState<{
    start: number;
    end: number;
  }>({
    start: tier?.startValue || 0, // Pre-populate startValue in edit mode
    end: tier?.endValue || 0, // Pre-populate endValue in edit mode
  });

  const [uncoveredRanges, setUncoveredRanges] = useState<UncoveredRange[]>([]);
  const [selectedUncoveredRange, setSelectedUncoveredRange] =
    useState<UncoveredRange | null>(null);

  const [isRangeValid, setIsRangeValid] = useState<boolean>(false); // Track range validation status

  const [createCashbackTier] = useMutation(CREATE_CASHBACK_TIER_MUTATION);
  const [updateCashbackTier] = useMutation(UPDATE_CASHBACK_TIER_MUTATION); // Use mutation for updating a tier

  useEffect(() => {
    const calculateUncoveredRanges = (tiers: any[]) => {
      const uncovered: UncoveredRange[] = [];
      const sortedTiers = [...tiers].sort(
        (a, b) => a.startValue - b.startValue,
      );

      for (let i = 0; i < sortedTiers.length - 1; i++) {
        const currentTier = sortedTiers[i];
        const nextTier = sortedTiers[i + 1];

        if (currentTier.endValue + 1 < nextTier.startValue) {
          uncovered.push({
            label: `${currentTier.name} - ${nextTier.name}`,
            start: currentTier.endValue + 1,
            end: nextTier.startValue - 1,
          });
        }
      }

      if (sortedTiers.length > 0) {
        const lastTier = sortedTiers[sortedTiers.length - 1];
        uncovered.push({
          label: `${lastTier.name}+`,
          start: lastTier.endValue + 1,
          end: Infinity,
        });
      }

      return uncovered;
    };

    if (tiers && tiers.length > 0) {
      const ranges = calculateUncoveredRanges(tiers);
      setUncoveredRanges(ranges);

      if (!tier) {
        // Automatically select the range with Infinity as end (create mode)
        const infinityRange = ranges.find((range) => range.end === Infinity);
        if (infinityRange) {
          setFormValues((prevValues) => ({
            ...prevValues,
            selectedRange: infinityRange.label, // Default selection
          }));

          setSelectedRangeValues({
            start: infinityRange.start,
            end: infinityRange.end,
          });

          setSelectedUncoveredRange(infinityRange);
        }
      }
    } else {
      setUncoveredRanges([]);
    }
  }, [tiers, tier]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleRangeSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedRangeLabel = event.target.value;
    const selectedRange = uncoveredRanges.find(
      (range) => range.label === selectedRangeLabel,
    );

    setFormValues({ ...formValues, selectedRange: selectedRangeLabel });

    if (selectedRange) {
      setSelectedRangeValues({
        start: selectedRange.start,
        end: selectedRange.end,
      });
      setSelectedUncoveredRange(selectedRange);
    }
  };

  const handleSubmit = async () => {
    if (
      !formValues.firstName ||
      !formValues.cashbackPercentage ||
      !selectedRangeValues ||
      selectedRangeValues.start < 0 ||
      selectedRangeValues.end <= 0 ||
      !isRangeValid // Block submission if range is invalid
    ) {
      alert("Please fill all required fields correctly.");
      return;
    }

    const formData = {
      name: formValues.firstName,
      cashbackPercentage: parseFloat(formValues.cashbackPercentage),
      description: formValues.description || "ABC",
      startValue: selectedRangeValues.start,
      endValue: selectedRangeValues.end,
      rewards: "ABC",
    };

    if (tier) {
      // Update existing tier logic
      try {
        await updateCashbackTier({
          variables: {
            updateCashbackTierId: tier.id,
            name: formData.name,
            percentage: formData.cashbackPercentage,
            description: formData.description,
            startValue: formData.startValue,
            endValue: formData.endValue,
            rewards: formData.rewards,
          },
        });
        alert("Tier updated successfully!");
        handleClose();
      } catch (error) {
        console.error("Error updating tier:", error);
        alert("Failed to update tier.");
      }
    } else {
      // Create new tier logic
      try {
        await createCashbackTier({
          variables: {
            name: formData.name,
            percentage: formData.cashbackPercentage,
            description: formData.description,
            startValue: formData.startValue,
            endValue: formData.endValue,
            rewards: formData.rewards,
          },
        });
        alert("Tier created successfully!");
        handleClose();
      } catch (error) {
        console.error("Error creating tier:", error);
        alert("Failed to create tier.");
      }
    }
  };

  const { previousTierEndValue, nextTierStartValue } = (() => {
    if (!selectedUncoveredRange || !tiers || tiers.length === 0) {
      return { previousTierEndValue: undefined, nextTierStartValue: undefined };
    }

    const sortedTiers = [...tiers].sort((a, b) => a.startValue - b.startValue);

    const previousTier = sortedTiers.find(
      (tier) => tier.endValue + 1 === selectedUncoveredRange.start,
    );
    const nextTier = sortedTiers.find(
      (tier) => tier.startValue - 1 === selectedUncoveredRange.end,
    );

    return {
      previousTierEndValue: previousTier ? previousTier.endValue : undefined,
      nextTierStartValue: nextTier ? nextTier.startValue : undefined,
    };
  })();

  return (
    <DialogBox
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "580px",
          borderRadius: "12px",
          padding: "20px",
        },
      }}
    >
      <ExtendedDialogTitle
        title={tier ? "Edit Cashback Tier" : "New Cashback Tier"}
        handleClose={handleClose}
      />
      <ExtendedDialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <CustomInputField
            inputType="text"
            label="Name"
            name="firstName"
            value={formValues.firstName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <RadioGroup
            name="selectedRange"
            value={formValues.selectedRange} // Ensure default selection is used
            onChange={handleRangeSelection}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            {uncoveredRanges.map((range, index) => (
              <FormControlLabel
                key={index}
                value={range.label}
                control={<Radio />}
                label={`${range.label}`}
              />
            ))}
          </RadioGroup>

          <CustomInputField
            inputType="number"
            label="Cashback Percentage"
            name="cashbackPercentage"
            value={formValues.cashbackPercentage}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography>%</Typography>
                </InputAdornment>
              ),
            }}
          />
          <CustomInputField
            inputType="text"
            label="Description"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            minRows={3}
          />
          <RangeComponent
            start={selectedRangeValues?.start || ""}
            end={selectedRangeValues?.end || ""}
            onStartChange={(newStartValue) => {
              const parsedStartValue = parseFloat(newStartValue);
              setSelectedRangeValues((prev) => {
                return {
                  ...prev,
                  start: isNaN(parsedStartValue) ? 0 : parsedStartValue,
                  end: prev?.end ?? 0,
                };
              });
            }}
            onEndChange={(newEndValue) => {
              const parsedEndValue = parseFloat(newEndValue);
              setSelectedRangeValues((prev) => {
                return {
                  ...prev,
                  end: isNaN(parsedEndValue) ? 0 : parsedEndValue,
                  start: prev?.start ?? 0,
                };
              });
            }}
            isFirstTier={tiers.length === 0}
            previousTierEndValue={previousTierEndValue}
            nextTierStartValue={nextTierStartValue}
            onValidationChange={(isValid) => setIsRangeValid(isValid)} // Listen for validation changes
          />
        </Box>
      </ExtendedDialogContent>
      <ExtendedDialogActions
        handleClose={handleClose}
        showCancelButton={true}
        successLabel={tier ? "Update" : "Submit"}
        onSuccess={handleSubmit}
      />
    </DialogBox>
  );
};
