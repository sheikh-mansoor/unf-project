import { Box, Chip, Typography } from "@mui/material";
import React, { useState } from "react";
import { ConditionModal } from "./ConditionModal"; // Import the new ConditionModal component

// Define the type for FilterItem
export interface FilterItem {
  property: string;
  operation: string;
  value: string[];
}

interface ValidForProps {
  validFor: FilterItem[];
  setValidFor: (validForData: FilterItem[]) => void;
}

export const ValidFor: React.FC<ValidForProps> = ({
  validFor,
  setValidFor,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [newConditions, setNewConditions] = useState<FilterItem[]>([
    { property: "", operation: "", value: [""] },
  ]); // Track multiple conditions

  // Sample options for 'property' and 'operation' dropdowns
  const propertyOptions = [
    { value: "Email", label: "Email" },
    { value: "Phone", label: "Phone" },
    { value: "tag", label: "Tag" },
    { value: "Name", label: "Name" },
  ];

  const operationOptions = [
    { value: "has", label: "Has" },
    { value: "does_not_have", label: "Does Not Have" },
    { value: "equals", label: "Equals" },
    { value: "not_equals", label: "Not Equals" },
  ];

  // Handle input change for each condition row
  const handleInputChange = (
    index: number,
    field: keyof FilterItem,
    value: string,
  ) => {
    const updatedConditions = [...newConditions];

    // Ensure the 'value' field is always assigned as an array of strings
    if (field === "value") {
      updatedConditions[index][field] = [value]; // Wrap value in an array
    } else {
      updatedConditions[index][field] = value as any;
    }

    setNewConditions(updatedConditions);
  };

  // Handle adding a new condition row
  const handleAddNewCondition = () => {
    setNewConditions([
      ...newConditions,
      { property: "", operation: "", value: [""] },
    ]);
  };

  // Handle adding conditions and closing the modal
  const handleAddCondition = () => {
    setValidFor([...validFor, ...newConditions]); // Add all new conditions
    setIsModalOpen(false);
    setNewConditions([{ property: "", operation: "", value: [""] }]); // Reset form after adding
  };

  const handleDeleteCondition = () => {
    setValidFor([]); // Clear the validFor state (you can adjust logic for multiple conditions)
  };

  return (
    <Box sx={{ mb: 2, alignItems: "center" }}>
      {/* Render pill box with only the value of the first condition */}
      <Typography
        variant="body1"
        gutterBottom
        sx={{ fontSize: "14px", fontWeight: 400, marginBottom: "0.5rem" }}
      >
        Valid For
      </Typography>
      <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
        {validFor.length > 0 && (
          <Chip
            label={validFor[0].value[0]} // Only render the value of the first condition
            color="primary"
            variant="outlined"
            onDelete={handleDeleteCondition} // Show delete icon and attach handler
            sx={{ marginRight: 2 }}
          />
        )}

        {/* Add New Condition as text, aligned with pill box */}
        <Typography
          variant="body2"
          color="primary"
          sx={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => setIsModalOpen(true)}
        >
          Add New Condition
        </Typography>
      </Box>
      {/* Use the extracted ConditionModal component */}
      <ConditionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddCondition}
        handleInputChange={handleInputChange}
        newConditions={newConditions}
        propertyOptions={propertyOptions}
        operationOptions={operationOptions}
        handleAddNewCondition={handleAddNewCondition} // Pass handler to add new rows
      />
    </Box>
  );
};
