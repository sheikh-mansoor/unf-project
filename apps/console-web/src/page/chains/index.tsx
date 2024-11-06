import { gql, useQuery } from "@apollo/client";
import { CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { withDashboardLayout } from "../../components/layouts/DashboardLayout";
import ChainsList from "./components/ChainsList";
import { NoChainFound } from "./components/NoChainFound";

// Define the updated GraphQL query to fetch chains
const GET_CHAINS = gql`
  query AllChainsWithRestaurants {
    allChainsWithRestaurants {
      chains {
        id
        name
        emirate
        email
        description
        contactNumber
        city
        restaurants {
          chainId
          id
          latitude
          longitude
          name
        }
      }
      message
      status
    }
  }
`;

// Define the Chain type based on the new query structure
export type TChain = {
  id: string;
  name: string;
  emirate: string;
  imageUrl: string;
  email: string;
  description: string;
  contactNumber: string;
  city: string;
  managerId: string;
  restaurants: {
    chainId: string;
    id: string;
    latitude: number;
    longitude: number;
    name: string;
  }[];
};

// Styled components for loading and error containers
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

const ChainsPage = () => {
  // Execute the query and type the data response
  const { loading, error, data } = useQuery<{
    allChainsWithRestaurants: {
      chains: TChain[];
      message: string;
      status: string;
    };
  }>(GET_CHAINS);

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
          Error: {error.message || "An error occurred while fetching chains"}
        </Typography>
      </ErrorContainer>
    );
  }

  // Extract chains from the response
  const chains = data?.allChainsWithRestaurants.chains || [];

  // Render the ChainsList component and pass the chains data
  return chains.length ? <ChainsList chains={chains} /> : <NoChainFound />;
};

export const Chains = withDashboardLayout(ChainsPage);
