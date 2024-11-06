import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  CircularProgress,
  styled,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TChain } from "..";
import CustomDrawer from "../../../components/custom-drawer/CustomDrawer";
import CustomDropdown from "../../../components/custom-drawer/CustomDropdown";
import InputLayout from "../../../components/custom-drawer/InputLayout";
import { CustomInputField } from "../../../components/input-fields";

// GraphQL mutation for creating a chain
const CREATE_CHAIN = gql`
  mutation CreateChain(
    $name: String!
    $chainManagerId: ID
    $city: String
    $contactNumber: String
    $description: String
    $email: String
    $emirate: String
  ) {
    createChain(
      name: $name
      chainManagerId: $chainManagerId
      city: $city
      contactNumber: $contactNumber
      description: $description
      email: $email
      emirate: $emirate
    ) {
      chain {
        id
        name
      }
      message
      status
    }
  }
`;

// GraphQL mutation for editing a chain
const EDIT_CHAIN = gql`
  mutation EditChain(
    $editChainId: ID!
    $city: String
    $contactNumber: String
    $description: String
    $email: String
    $emirate: String
    $name: String
    $imageUrl: String
  ) {
    editChain(
      id: $editChainId
      city: $city
      contactNumber: $contactNumber
      description: $description
      email: $email
      emirate: $emirate
      name: $name
      imageUrl: $imageUrl
    ) {
      chain {
        city
        contactNumber
        description
        email
        emirate
        id
        imageUrl
        name
      }
      message
      status
    }
  }
`;

// Query to fetch managers
const GET_MANAGERS = gql`
  query AllManagers {
    allManagers {
      manager {
        id
        firstName
        lastName
        role
      }
      message
      status
    }
  }
`;

const ButtonGroup = styled(Box)({
  display: "flex",
  alignItems: "baseline",
  gap: "1rem",
  "& > *": {
    width: "99px",
    height: "44px",
    marginTop: "8px",
  },
});

type AddChainDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  chain?: TChain | null; // Optional chain prop for editing
};

const ChainDrawer: React.FC<AddChainDrawerProps> = ({
  isOpen,
  onClose,
  chain,
}) => {
  // Fetch managers list
  const { loading, error, data } = useQuery<{
    allManagers: {
      manager: {
        id: string;
        firstName: string;
        lastName: string;
        role: string;
      };
    }[];
  }>(GET_MANAGERS);

  // Define mutations
  const [createChain, { loading: createLoading, error: createError }] =
    useMutation(CREATE_CHAIN);
  const [editChain, { loading: editLoading, error: editError }] =
    useMutation(EDIT_CHAIN);

  // Initial form values based on the presence of `chain`
  const initialValues = {
    chainName: chain?.name || "",
    emirate: chain?.emirate || "",
    cityArea: chain?.city || "",
    contactNumber: chain?.contactNumber || "",
    email: chain?.email || "",
    description: chain?.description || "",
    managerId: chain?.managerId || "", // Only pre-populate if `managerId` exists in `chain`
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      chainName: Yup.string().required("Chain name is required"),
      emirate: Yup.string().required("Emirate is required"),
      cityArea: Yup.string().required("City/Area is required"),
      contactNumber: Yup.string().required("Contact number is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      managerId: Yup.string(), // Optional validation rule for managerId
    }),
    onSubmit: async (values) => {
      try {
        if (chain) {
          // Use the `editChain` mutation for editing an existing chain
          await editChain({
            variables: {
              editChainId: chain.id,
              name: values.chainName,
              city: values.cityArea,
              contactNumber: values.contactNumber,
              description: values.description,
              email: values.email,
              emirate: values.emirate,
              imageUrl: chain.imageUrl || "", // Assuming imageUrl comes from the chain object
            },
          });
        } else {
          await createChain({
            variables: {
              name: values.chainName,
              chainManagerId: values.managerId || null,
              city: values.cityArea,
              contactNumber: values.contactNumber,
              description: values.description,
              email: values.email,
              emirate: values.emirate,
            },
          });
        }
        onClose();
      } catch (e) {
        console.error("Error saving chain:", e);
      }
    },
    enableReinitialize: true,
  });

  const chainManagers =
    data?.allManagers
      ?.filter((item) => item.manager.role === "CHAIN_MANAGER")
      .map((item) => ({
        value: item.manager.id,
        label: `${item.manager.firstName} ${item.manager.lastName}`,
      })) || [];

  const cityAreaOptions = [
    { value: "DOWNTOWN", label: "Downtown" },
    { value: "BUSINESS_BAY", label: "Business Bay" },
    { value: "JUMEIRAH", label: "Jumeirah" },
  ];

  return (
    <CustomDrawer
      open={isOpen}
      onClose={onClose}
      title={chain ? "Edit Chain" : "Add New Chain"}
      showCloseIcon
    >
      <form onSubmit={formik.handleSubmit}>
        <InputLayout>
          <CustomInputField
            label="Chain Name"
            name="chainName"
            placeholder="Chain Name"
            inputType="text"
            value={formik.values.chainName}
            onChange={formik.handleChange}
            error={formik.touched.chainName && Boolean(formik.errors.chainName)}
            helperText={formik.touched.chainName && formik.errors.chainName}
          />
        </InputLayout>

        <InputLayout>
          <CustomDropdown
            label="Emirate"
            name="emirate"
            options={[
              { value: "ABU_DHABI", label: "Abu Dhabi" },
              { value: "DUBAI", label: "Dubai" },
              { value: "SHARJAH", label: "Sharjah" },
            ]}
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
          <CustomDropdown
            label="City/Area"
            name="cityArea"
            options={cityAreaOptions}
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
          {loading ?
            <CircularProgress />
          : error ?
            <Typography color="error">Error loading managers</Typography>
          : <CustomDropdown
              label="Assign Manager"
              name="managerId"
              options={chainManagers}
              value={formik.values.managerId}
              onChange={(e) =>
                formik.setFieldValue("managerId", e.target.value)
              }
              error={
                formik.touched.managerId && Boolean(formik.errors.managerId)
              }
              helperText={
                formik.touched.managerId && formik.errors.managerId ?
                  formik.errors.managerId
                : undefined
              }
            />
          }
        </InputLayout>

        <ButtonGroup>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={createLoading || editLoading}
          >
            {createLoading || editLoading ? "Saving..." : "Submit"}
          </Button>
          <Button variant="text" color="primary" onClick={onClose}>
            Cancel
          </Button>
        </ButtonGroup>

        {(createError || editError) && (
          <Typography color="error" sx={{ mt: 2 }}>
            Error: {createError?.message || editError?.message}
          </Typography>
        )}
      </form>
    </CustomDrawer>
  );
};

export default ChainDrawer;
