import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { CustomInputField } from "../../../../components/input-fields"; // Using correct import path
import { ExtendedSelect } from "../../../../components/input-fields/ExtendedSelect"; // Using correct import path

// Define the type for FilterItem (optional if already defined globally)
interface FilterItem {
  property: string;
  operation: string;
  value: string[];
}

interface ConditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  handleInputChange: (
    index: number,
    field: keyof FilterItem,
    value: string,
  ) => void;
  newConditions: FilterItem[];
  propertyOptions: { value: string; label: string }[];
  operationOptions: { value: string; label: string }[];
  handleAddNewCondition: () => void; // To add new rows dynamically
}

export const ConditionModal: React.FC<ConditionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  handleInputChange,
  newConditions,
  propertyOptions,
  operationOptions,
  handleAddNewCondition, // Function to add new rows
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          backgroundColor: "white",
          margin: "auto",
          width: "80%",
          mt: 5,
          borderRadius: "8px",
        }}
      >
        {/* Modal Header */}
        <Box sx={{ borderBottom: "1px solid #E0E0E0", pb: 2, mb: 3 }}>
          <Typography variant="h6" sx={{ fontSize: "18px", fontWeight: 600 }}>
            Add New Condition
          </Typography>
        </Box>

        {/* Modal Body: Render multiple rows dynamically */}
        {newConditions.map((condition, index) => (
          <Box sx={{ display: "flex", gap: 2, mt: 2 }} key={index}>
            {/* Property Dropdown */}
            <ExtendedSelect
              label="Property"
              name={`property-${index}`}
              options={propertyOptions}
              value={condition.property}
              onChange={(e) =>
                handleInputChange(index, "property", e.target.value.toString())
              }
              fullWidth
            />
            {/* Operation Dropdown */}
            <ExtendedSelect
              label="Operation"
              name={`operation-${index}`}
              options={operationOptions}
              value={condition.operation}
              onChange={(e) =>
                handleInputChange(index, "operation", e.target.value.toString())
              }
              fullWidth
            />
            {/* Custom Input Field for Value */}
            <CustomInputField
              label="Value"
              inputType="text"
              placeholder="Enter value"
              value={condition.value[0]}
              onChange={(e) =>
                handleInputChange(index, "value", e.target.value)
              }
              fullWidth
            />
          </Box>
        ))}

        {/* Add New Condition button */}
        <Typography
          variant="body2"
          color="primary"
          sx={{
            cursor: "pointer",
            textDecoration: "underline",
            mt: 2,
            display: "inline-block",
          }}
          onClick={handleAddNewCondition}
        >
          + Add New Condition
        </Typography>

        {/* Modal Footer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 4,
            pt: 3,
            borderTop: "1px solid #E0E0E0",
          }}
        >
          <Button variant="outlined" sx={{ mr: 2 }} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
