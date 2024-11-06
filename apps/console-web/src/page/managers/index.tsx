import { gql, useQuery } from "@apollo/client";
import { CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { withDashboardLayout } from "../../components/layouts/DashboardLayout";
import { ROLES } from "../../constants/roles";
import ManagerTabs from "./components/ManagerTabs";
import { NoManagerFound } from "./components/NoManagerFound";

// Define the updated GraphQL query to fetch all managers
const GET_MANAGERS = gql`
  query AllManagers {
    allManagers {
      allManagers {
        manager {
          address
          chainId
          dateOfBirth
          dateOfJoin
          department
          division
          email
          firstName
          gender
          id
          isFirstTimeLogin
          jobTitle
          lastName
          phoneNo
          phoneNumber
          profileCompleted
          restaurantId
          role
          totalSpending
          workReferenceNumber
        }
      }
      message
      status
    }
  }
`;

// Update the Manager type based on the updated query structure
export type TManager = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  chainId: string | null;
  restaurantId: string | null;
  role: keyof typeof ROLES;
  dateOfBirth?: string | null;
  dateOfJoin?: string | null;
  workReferenceNumber?: string | null;
  department?: string | null;
  division?: string | null;
  gender?: string | null;
  isFirstTimeLogin?: boolean | null;
  jobTitle?: string | null;
  profileCompleted?: boolean | null;
  totalSpending?: number | null;
};

// Styled components
const LoadingContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(5),
}));

const ErrorContainer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(5),
  textAlign: "center",
}));

const ManagersPage = () => {
  // Execute the query and type the data response
  const { loading, error, data } = useQuery<{
    allManagers: { allManagers: { manager: TManager }[] };
  }>(GET_MANAGERS);

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <Typography color="error">
          Error: {error.message || "An error occurred while fetching managers"}
        </Typography>
      </ErrorContainer>
    );
  }

  // Extract managers from the allManagers array
  const managers =
    data?.allManagers?.allManagers?.map((item) => item.manager) || [];

  // Render the ManagerTabs component and pass the managers data
  return managers.length > 0 ?
      <ManagerTabs managers={managers} />
    : <NoManagerFound />;
};

// Export the ManagersPage wrapped with the dashboard layout
export const Managers = withDashboardLayout(ManagersPage);
