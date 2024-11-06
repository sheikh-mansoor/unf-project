import AddIcon from "@mui/icons-material/Add"; // Import the plus icon
import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

// Style for the button
const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main, // Primary color for the label text
  textTransform: "none", // Disable text uppercase transformation
  padding: theme.spacing(1, 2),
  "&:hover": {
    backgroundColor: "transparent", // No background color on hover for the button
  },
  "&:focus": {
    outline: "none", // Remove the outline (focus ring) when the button is clicked
    boxShadow: "none", // Remove the box shadow (click/focus effect)
  },
}));

// Style for the plus icon with a circular background
const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, // Primary color for the background
  color: "#fff", // White color for the plus icon
  borderRadius: "50%", // Make the background circular
  padding: theme.spacing(1), // Padding to make it look like a circle
  marginRight: theme.spacing(1), // Space between icon and label
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

type CreateNewChainButtonProps = {
  onClick: () => void; // Function to open the drawer or perform other actions
};

const CreateNewChainButton: React.FC<CreateNewChainButtonProps> = ({
  onClick,
}) => {
  return (
    <StyledButton variant="text" onClick={onClick}>
      {/* Icon wrapped in a circular background */}
      <IconWrapper>
        <AddIcon />
      </IconWrapper>
      Create New Chain
    </StyledButton>
  );
};

export default CreateNewChainButton;
