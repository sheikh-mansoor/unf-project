import { gql, useMutation } from "@apollo/client";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { TRestaurant } from "..";
import CustomDrawer from "../../../components/custom-drawer/CustomDrawer";
import InputLayout from "../../../components/custom-drawer/InputLayout";
import { CustomInputField } from "../../../components/input-fields";
import { ExtendedSelect } from "../../../components/input-fields/ExtendedSelect";

type RestaurantDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  restaurant?: TRestaurant | null;
};

const CREATE_RESTAURANT = gql`
  mutation AddRestaurant(
    $name: String!
    $address: String!
    $emirate: String!
    $city: String!
    $contactNumber: String!
    $email: String!
    $description: String
    $tags: [String!]!
    $openingTime: String
    $closingTime: String
    $cuisineType: [String!]!
  ) {
    addRestaurant(
      name: $name
      address: $address
      emirate: $emirate
      city: $city
      contactNumber: $contactNumber
      email: $email
      description: $description
      tags: $tags
      openingTime: $openingTime
      closingTime: $closingTime
      cuisineTypes: $cuisineType
    ) {
      id
      name
    }
  }
`;

const RestaurantDrawer: React.FC<RestaurantDrawerProps> = ({
  isOpen,
  onClose,
  restaurant,
}) => {
  const [createRestaurant, { loading: createLoading, error: createError }] =
    useMutation(CREATE_RESTAURANT, {
      context: {
        useMockServer: true,
      },
    });

  const formik = useFormik({
    initialValues: {
      restaurantName: restaurant?.name || "",
      address: restaurant?.address || "",
      emirate: restaurant?.emirate || "",
      cityArea: restaurant?.city || "",
      contactNumber: restaurant?.contactNumber || "",
      email: restaurant?.email || "",
      description: restaurant?.description || "",
      tags: restaurant?.tags || [],
      openingTime: restaurant?.openingTime || "",
      closingTime: restaurant?.closingTime || "",
      cuisineType: restaurant?.cuisineTypes || [],
    },
    validationSchema: Yup.object({
      restaurantName: Yup.string().required("Restaurant name is required"),
      address: Yup.string().required("Address is required"),
      emirate: Yup.string().required("Emirate is required"),
      cityArea: Yup.string().required("City/Area is required"),
      contactNumber: Yup.string().required("Contact number is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      tags: Yup.array().min(1, "At least one tag is required"),
      cuisineType: Yup.array().min(1, "At least one cuisine type is required"),
    }),
    onSubmit: async (values) => {
      try {
        await createRestaurant({
          variables: {
            name: values.restaurantName,
            address: values.address,
            emirate: values.emirate,
            city: values.cityArea,
            contactNumber: values.contactNumber,
            email: values.email,
            description: values.description || "", // Default to empty string if not provided
            tags: values.tags || [], // Ensure tags is a non-null array
            openingTime: values.openingTime || "", // Default if not provided
            closingTime: values.closingTime || "", // Default if not provided
            cuisineType: values.cuisineType || [], // Ensure cuisineType is a non-null array
          },
        });
        onClose();
      } catch (e) {
        console.error("Error creating restaurant:", e);
      }
    },
    enableReinitialize: true,
  });

  const emirateOptions = [
    { value: "ABU_DHABI", label: "Abu Dhabi" },
    { value: "DUBAI", label: "Dubai" },
    { value: "SHARJAH", label: "Sharjah" },
  ];

  const tagsOptions = [
    { value: "FAMILY", label: "Family Friendly" },
    { value: "FINE_DINING", label: "Fine Dining" },
    { value: "FAST_FOOD", label: "Fast Food" },
  ];

  const cuisineOptions = [
    { value: "ITALIAN", label: "Italian" },
    { value: "INDIAN", label: "Indian" },
    { value: "CHINESE", label: "Chinese" },
  ];

  return (
    <CustomDrawer
      open={isOpen}
      onClose={onClose}
      title="Add New Restaurant"
      showCloseIcon
    >
      <form onSubmit={formik.handleSubmit}>
        <InputLayout>
          <CustomInputField
            label="Restaurant Name"
            name="restaurantName"
            placeholder="Restaurant Name"
            inputType="text"
            value={formik.values.restaurantName}
            onChange={formik.handleChange}
            error={
              formik.touched.restaurantName &&
              Boolean(formik.errors.restaurantName)
            }
            helperText={
              formik.touched.restaurantName && formik.errors.restaurantName
            }
          />
        </InputLayout>

        <InputLayout>
          <CustomInputField
            label="Address"
            name="address"
            placeholder="Address"
            inputType="text"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </InputLayout>

        <InputLayout>
          <ExtendedSelect
            label="Emirate"
            name="emirate"
            options={emirateOptions}
            value={formik.values.emirate}
            onChange={(e) => formik.setFieldValue("emirate", e.target.value)}
            error={formik.touched.emirate && Boolean(formik.errors.emirate)}
            helperText={
              formik.touched.emirate && formik.errors.emirate ?
                formik.errors.emirate
              : undefined
            }
          />
        </InputLayout>

        <InputLayout>
          <ExtendedSelect
            label="City/Area"
            name="cityArea"
            options={emirateOptions}
            value={formik.values.cityArea}
            onChange={(e) => formik.setFieldValue("cityArea", e.target.value)}
            error={formik.touched.cityArea && Boolean(formik.errors.cityArea)}
            helperText={
              formik.touched.cityArea && formik.errors.cityArea ?
                formik.errors.cityArea
              : undefined
            }
          />
        </InputLayout>

        <InputLayout>
          <CustomInputField
            label="Contact Number"
            name="contactNumber"
            placeholder="Contact Number"
            inputType="text"
            value={formik.values.contactNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.contactNumber &&
              Boolean(formik.errors.contactNumber)
            }
            helperText={
              formik.touched.contactNumber && formik.errors.contactNumber
            }
          />
        </InputLayout>

        <InputLayout>
          <CustomInputField
            label="Email"
            name="email"
            placeholder="Email"
            inputType="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </InputLayout>

        <InputLayout>
          <CustomInputField
            label="Description"
            name="description"
            placeholder="Description"
            inputType="text"
            multiline
            rows={2}
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </InputLayout>

        <InputLayout>
          <ExtendedSelect
            label="Tags"
            name="tags"
            options={tagsOptions}
            multiselect
            value={formik.values.tags}
            onChange={(e) => formik.setFieldValue("tags", e.target.value)}
            error={formik.touched.tags && Boolean(formik.errors.tags)}
            helperText={
              formik.touched.tags && formik.errors.tags ?
                formik.errors.tags.toString()
              : undefined
            }
          />
        </InputLayout>

        <InputLayout>
          <CustomInputField
            label="Opening Time"
            name="openingTime"
            placeholder="Opening Time"
            inputType="text"
            value={formik.values.openingTime}
            onChange={formik.handleChange}
          />
        </InputLayout>

        <InputLayout>
          <CustomInputField
            label="Closing Time"
            name="closingTime"
            placeholder="Closing Time"
            inputType="text"
            value={formik.values.closingTime}
            onChange={formik.handleChange}
          />
        </InputLayout>

        <InputLayout>
          <ExtendedSelect
            label="Cuisine Type"
            name="cuisineType"
            options={cuisineOptions}
            multiselect
            value={formik.values.cuisineType}
            onChange={(e) =>
              formik.setFieldValue("cuisineType", e.target.value)
            }
            error={
              formik.touched.cuisineType && Boolean(formik.errors.cuisineType)
            }
            helperText={
              formik.touched.cuisineType && formik.errors.cuisineType ?
                formik.errors.cuisineType?.toString()
              : ""
            }
          />
        </InputLayout>

        <Box display="flex" gap="1rem" mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={createLoading}
          >
            {createLoading ?
              <CircularProgress size={24} />
            : "Submit"}
          </Button>
          <Button variant="text" color="primary" onClick={onClose}>
            Cancel
          </Button>
        </Box>

        {createError && (
          <Typography color="error" sx={{ mt: 2 }}>
            Error: {createError.message}
          </Typography>
        )}
      </form>
    </CustomDrawer>
  );
};

export default RestaurantDrawer;
