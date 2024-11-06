import { Box, Typography } from "@mui/material";
import { InputFieldsWrapper } from "../../components/input-fields/InputFieldsWrapper";
import { ExtendedInputField } from "./ExtendedInputField";

export const RestaurantInformation = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "60%",
        gap: "10px",
      }}
    >
      <Typography variant="h6">Restaurant Information</Typography>
      <InputFieldsWrapper>
        <ExtendedInputField
          label="Restaurant Name"
          placeholder="Name"
          variant="standard"
        />
        <ExtendedInputField
          label="Address"
          placeholder="Address"
          variant="standard"
        />
      </InputFieldsWrapper>
      <InputFieldsWrapper>
        <ExtendedInputField
          label="Emirate"
          placeholder="Emirate"
          variant="standard"
        />
        <ExtendedInputField
          label="City/Area"
          placeholder="City/Area"
          variant="standard"
        />
      </InputFieldsWrapper>
      <InputFieldsWrapper>
        <ExtendedInputField
          label="Contact Number"
          placeholder="Contact Number"
          variant="standard"
        />
        <ExtendedInputField
          label="Email"
          placeholder="Email"
          variant="standard"
        />
      </InputFieldsWrapper>
    </Box>
  );
};
