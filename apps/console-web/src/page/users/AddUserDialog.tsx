import { DialogProps, SelectChangeEvent } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { DialogBox } from "../../components/dialog-box";
import { ExtendedDialogActions } from "../../components/dialog-box/components/ExtendedDialogActions";
import { ExtendedDialogContent } from "../../components/dialog-box/components/ExtendedDialogContent";
import { ExtendedDialogTitle } from "../../components/dialog-box/components/ExtendedDialogTitle";
import { CustomInputField } from "../../components/input-fields";
import { CustomSwitchButton } from "../../components/input-fields/CustomSwitchButton";
import { ExtendedSelect } from "../../components/input-fields/ExtendedSelect";
import { InputFieldsWrapper } from "../../components/input-fields/InputFieldsWrapper";

interface AddUserDialogProps extends DialogProps {
  open: boolean;
  handleClose: () => void;
}

export const AddUserDialog: React.FC<AddUserDialogProps> = ({
  open,
  handleClose,
}) => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    emirate: "",
    phoneNumber: "",
    tags: [] as string[], // Initialize as an empty array
    radioOption: "", // Initialize radio button value
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSelectChange = (event: SelectChangeEvent<string | string[]>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: Array.isArray(value) ? value : value,
    });
  };

  return (
    <DialogBox open={open} onClose={handleClose}>
      <ExtendedDialogTitle
        title="Modal title"
        summary="This is a summary of the dialog."
        handleClose={handleClose}
      />
      <ExtendedDialogContent>
        <InputFieldsWrapper>
          <CustomInputField
            inputType="text"
            label="First Name"
            name="firstName"
            value={formValues.firstName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            height={56}
          />
          <CustomInputField
            inputType="text"
            label="Last Name"
            name="lastName"
            value={formValues.lastName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            height={56}
          />
        </InputFieldsWrapper>
        <InputFieldsWrapper>
          <CustomInputField
            inputType="email"
            label="Email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            height={56}
          />
        </InputFieldsWrapper>
        <InputFieldsWrapper>
          <ExtendedSelect
            label="Emirate"
            name="emirate"
            value={formValues.emirate}
            onChange={handleSelectChange}
            options={[
              { value: "abu_dhabi", label: "Abu Dhabi" },
              { value: "dubai", label: "Dubai" },
              { value: "sharjah", label: "Sharjah" },
              // Add more emirates as needed
            ]}
            fullWidth
          />
        </InputFieldsWrapper>
        <InputFieldsWrapper>
          <CustomInputField
            inputType="text"
            label="Phone Number"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </InputFieldsWrapper>
        <InputFieldsWrapper>
          <ExtendedSelect
            label="Tags"
            name="tags"
            value={formValues.tags}
            onChange={handleSelectChange}
            multiselect
            options={[
              { value: "abc", label: "ABC" },
              { value: "xyz", label: "XYZ" },
              // Add more tags as needed
            ]}
            fullWidth
          />
        </InputFieldsWrapper>
        <InputFieldsWrapper>
          <CustomSwitchButton
            checked={true}
            onChange={() => {}}
            label={"Label1"}
          />
        </InputFieldsWrapper>
        <InputFieldsWrapper>
          <CustomSwitchButton
            checked={true}
            onChange={() => {}}
            label={"Label1"}
          />
        </InputFieldsWrapper>
      </ExtendedDialogContent>
      <ExtendedDialogActions handleClose={handleClose} onSuccess={() => {}} />
    </DialogBox>
  );
};
