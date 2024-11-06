import { gql, useMutation } from "@apollo/client";
import { Box, Button, styled } from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import CustomDrawer from "../../../components/custom-drawer/CustomDrawer";
import DrawerSection from "../../../components/custom-drawer/DrawerSection";
import InputLayout from "../../../components/custom-drawer/InputLayout";
import { CustomInputField } from "../../../components/input-fields/CustomInputField";
import { CustomDatePicker } from "../../../components/input-fields/DatePicker";
import { ExtendedSelect } from "../../../components/input-fields/ExtendedSelect";
import { ToastNotification } from "../../../components/toast";
import { TManager } from "../index";

const ButtonGroup = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  "& > *": {
    width: "99px",
    height: "44px",
    marginTop: "8px",
  },
});

const CREATE_CHAIN_MANAGER = gql`
  mutation CreateChainManager(
    $chainId: String!
    $email: String!
    $firstName: String!
    $lastName: String!
  ) {
    createChainManager(
      chainId: $chainId
      email: $email
      firstName: $firstName
      lastName: $lastName
    ) {
      message
      status
      user {
        id
        email
        firstName
        lastName
        role
      }
    }
  }
`;

const CREATE_PLATFORM_LOYALTY_MANAGER = gql`
  mutation CreatePlatformLoyaltyManager(
    $email: String!
    $firstName: String!
    $lastName: String!
    $address: String
    $dateOfBirth: String
    $dateOfJoin: String
    $department: String
    $division: String
    $jobTitle: String
    $phoneNumber: String
    $workReferenceNumber: String
  ) {
    createPlatformLoyaltyManager(
      email: $email
      firstName: $firstName
      lastName: $lastName
      address: $address
      dateOfBirth: $dateOfBirth
      dateOfJoin: $dateOfJoin
      department: $department
      division: $division
      jobTitle: $jobTitle
      phoneNumber: $phoneNumber
      workReferenceNumber: $workReferenceNumber
    ) {
      message
      status
      user {
        id
        email
        firstName
        lastName
        role
      }
    }
  }
`;

const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile(
    $updateUserProfileId: ID!
    $address: String
    $chainId: String
    $confirmPassword: String
    $dateOfJoin: String
    $department: String
    $division: String
    $email: String
    $firstName: String
    $gender: String
    $jobTitle: String
    $lastName: String
    $password: String
    $phoneNo: String
    $phoneNumber: String
    $workReferenceNumber: String
    $dateOfBirth: String
  ) {
    updateUserProfile(
      id: $updateUserProfileId
      address: $address
      chainId: $chainId
      confirmPassword: $confirmPassword
      dateOfJoin: $dateOfJoin
      department: $department
      division: $division
      email: $email
      firstName: $firstName
      gender: $gender
      jobTitle: $jobTitle
      lastName: $lastName
      password: $password
      phoneNo: $phoneNo
      phoneNumber: $phoneNumber
      workReferenceNumber: $workReferenceNumber
      dateOfBirth: $dateOfBirth
    ) {
      message
      status
      user {
        id
        createdAt
        firstName
        lastName
        email
        phoneNo
        phoneNumber
        address
        dateOfJoin
        gender
        dateOfBirth
        chainId
        jobTitle
        workReferenceNumber
        department
        division
        restaurantId
        role
      }
    }
  }
`;

type AddManagerDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedManager?: TManager | null;
};

const AddManagerDrawer: React.FC<AddManagerDrawerProps> = ({
  isOpen,
  onClose,
  selectedManager,
}) => {
  const [createChainManager] = useMutation(CREATE_CHAIN_MANAGER);
  const [createPlatformLoyaltyManager] = useMutation(
    CREATE_PLATFORM_LOYALTY_MANAGER,
  );
  const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"success" | "error">(
    "success",
  );

  const managerOptions = [
    { value: "CHAIN_MANAGER", label: "Chain Manager" },
    { value: "PLATFORM_LOYALTY_MANAGER", label: "Platform Loyalty Manager" },
  ];

  const isEditing = Boolean(selectedManager);

  const formik = useFormik({
    initialValues: {
      managerType: selectedManager?.role || "CHAIN_MANAGER",
      firstName: selectedManager?.firstName || "",
      lastName: selectedManager?.lastName || "",
      dob:
        selectedManager?.dateOfBirth ?
          dayjs(selectedManager.dateOfBirth)
        : null,
      email: selectedManager?.email || "",
      phoneNumber: selectedManager?.phoneNo || "",
      address: selectedManager?.address || "",
      dateOfJoin:
        selectedManager?.dateOfJoin ? dayjs(selectedManager.dateOfJoin) : null,
      workReferenceNumber: selectedManager?.workReferenceNumber || "",
      department: selectedManager?.department || "",
      division: selectedManager?.division || "",
    },
    validationSchema: Yup.object({
      managerType: Yup.string().required("Manager type is required"),
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      mobile: Yup.string().required("Mobile number is required"),
      dob: Yup.date().nullable().required("Date of Birth is required"),
      dateOfJoin: Yup.date().nullable().required("Date of Joining is required"),
      address: Yup.string().required("Address is required"),
      department: Yup.string().required("Department is required"),
      division: Yup.string().required("Division is required"),
      workReferenceNumber: Yup.string().required(
        "Work reference number is required",
      ),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (isEditing) {
          await updateUserProfile({
            variables: {
              updateUserProfileId: selectedManager?.id,
              address: values.address,
              chainId: "some-chain-id",
              confirmPassword: "some-password",
              dateOfJoin:
                values.dateOfJoin ? values.dateOfJoin.format("YYYY-MM-DD") : "",
              department: values.department,
              division: values.division,
              email: values.email,
              firstName: values.firstName,
              gender: "some-gender",
              jobTitle: "Manager",
              lastName: values.lastName,
              password: "some-password",
              phoneNo: values.phoneNumber,
              phoneNumber: values.phoneNumber,
              workReferenceNumber: values.workReferenceNumber,
              dateOfBirth: values.dob ? values.dob.format("YYYY-MM-DD") : "",
            },
          });
          setToastMessage("Manager profile updated successfully!");
          setToastVariant("success");
        } else {
          if (values.managerType === "CHAIN_MANAGER") {
            await createChainManager({
              variables: {
                chainId: "some-chain-id",
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
              },
            });
            setToastMessage("Chain Manager created successfully!");
            setToastMessage("Chain Manager created successfully!");
            setToastVariant("success");
            setToastMessage("Chain Manager created successfully!");
            setToastVariant("success");
          } else {
            await createPlatformLoyaltyManager({
              variables: {
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                address: values.address,
                dateOfBirth: values.dob ? values.dob.format("YYYY-MM-DD") : "",
                dateOfJoin:
                  values.dateOfJoin ?
                    values.dateOfJoin.format("YYYY-MM-DD")
                  : "",
                department: values.department,
                division: values.division,
                jobTitle: "Manager",
                phoneNumber: values.phoneNumber,
                workReferenceNumber: values.workReferenceNumber,
              },
            });
            setToastMessage("Loyalty Manager created successfully!");
          }
          setToastVariant("success");
        }
        onClose();
      } catch (error) {
        setToastMessage("Failed to process manager update");
        setToastVariant("error");
        setToastOpen(true);
      }
    },
  });

  return (
    <>
      <CustomDrawer
        open={isOpen}
        onClose={onClose}
        title={isEditing ? "Edit Manager" : "Add New Manager"}
        showCloseIcon
      >
        <form onSubmit={formik.handleSubmit}>
          <DrawerSection title="General Information">
            <InputLayout>
              <ExtendedSelect
                label="Select Manager"
                options={managerOptions}
                value={formik.values.managerType}
                onChange={(e) =>
                  formik.setFieldValue("managerType", e.target.value)
                }
                error={
                  formik.touched.managerType &&
                  Boolean(formik.errors.managerType)
                }
                helperText={
                  formik.touched.managerType && formik.errors.managerType ?
                    formik.errors.managerType
                  : undefined
                }
              />
              <CustomInputField
                label="First Name"
                inputType="text"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                name="firstName"
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <CustomInputField
                label="Last Name"
                inputType="text"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                name="lastName"
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </InputLayout>
            <InputLayout>
              <CustomDatePicker
                label="DOB"
                value={formik.values.dob}
                onChange={(newValue) => formik.setFieldValue("dob", newValue)}
                error={formik.touched.dob && Boolean(formik.errors.dob)}
                helperText={
                  formik.touched.dob && formik.errors.dob ?
                    formik.errors.dob
                  : undefined
                }
              />
              <CustomInputField
                label="Email"
                inputType="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                name="email"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <CustomInputField
                label="Mobile"
                inputType="text"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                name="mobile"
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </InputLayout>
          </DrawerSection>

          <DrawerSection title="Contact Information">
            <InputLayout>
              <CustomInputField
                label="Address Information"
                inputType="text"
                value={formik.values.address}
                onChange={formik.handleChange}
                name="address"
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </InputLayout>
          </DrawerSection>

          <DrawerSection title="Employment Information">
            <InputLayout>
              <CustomDatePicker
                label="Date of Joining"
                value={formik.values.dateOfJoin}
                onChange={(newValue) =>
                  formik.setFieldValue("dateOfJoin", newValue)
                }
                error={
                  formik.touched.dateOfJoin && Boolean(formik.errors.dateOfJoin)
                }
                helperText={
                  formik.touched.dateOfJoin && formik.errors.dateOfJoin ?
                    formik.errors.dateOfJoin
                  : undefined
                }
              />
              <CustomInputField
                label="Work Reference Number"
                inputType="text"
                value={formik.values.workReferenceNumber}
                onChange={formik.handleChange}
                name="workReferenceNumber"
                error={
                  formik.touched.workReferenceNumber &&
                  Boolean(formik.errors.workReferenceNumber)
                }
                helperText={
                  formik.touched.workReferenceNumber &&
                  formik.errors.workReferenceNumber
                }
              />
            </InputLayout>
            <InputLayout>
              <CustomInputField
                label="Department"
                inputType="text"
                value={formik.values.department}
                onChange={formik.handleChange}
                name="department"
                error={
                  formik.touched.department && Boolean(formik.errors.department)
                }
                helperText={
                  formik.touched.department && formik.errors.department
                }
              />
              <CustomInputField
                label="Division"
                inputType="text"
                value={formik.values.division}
                onChange={formik.handleChange}
                name="division"
                error={
                  formik.touched.division && Boolean(formik.errors.division)
                }
                helperText={formik.touched.division && formik.errors.division}
              />
            </InputLayout>
          </DrawerSection>

          <ButtonGroup>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginTop: 3, color: "white" }}
            >
              Submit
            </Button>
            <Button
              variant="text"
              color="primary"
              onClick={onClose}
              sx={{ marginTop: 1 }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </CustomDrawer>

      {/* Toast Notification */}
      <ToastNotification
        open={toastOpen}
        message={toastMessage}
        variant={toastVariant}
        onClose={() => setToastOpen(false)}
      />
    </>
  );
};

export default AddManagerDrawer;
