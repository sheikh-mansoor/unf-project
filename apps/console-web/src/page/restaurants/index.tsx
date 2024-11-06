import { gql, useQuery } from "@apollo/client";
import { CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { withDashboardLayout } from "../../components/layouts/DashboardLayout";
import { NoRestaurantFound } from "./components/NoRestaurantFound"; // Component to show if no restaurants are found
import RestaurantsList from "./components/RestaurantsList"; // Assuming RestaurantsList component exists

// Define the GraphQL query to fetch all restaurants
const GET_RESTAURANTS = gql`
  query AllRestaurants {
    allRestaurants {
      restaurants {
        id
        name
        address
        emirate
        city
        contactNumber
        email
        description
        openingTime
        closingTime
        cuisineTypes
        tags
      }
      message
      status
    }
  }
`;

// Define the Restaurant type based on the query structure
export type TRestaurant = {
  id: string;
  name: string;
  address: string;
  emirate: string;
  city: string;
  contactNumber: string;
  email: string;
  description: string;
  openingTime: string;
  closingTime: string;
  cuisineTypes: string[];
  tags: string[];
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

const RestaurantsPage = () => {
  // Execute the query and specify `context` to choose server
  const { loading, error, data } = useQuery<{
    allRestaurants: {
      restaurants: TRestaurant[];
      message: string;
      status: string;
    };
  }>(GET_RESTAURANTS, {
    context: {
      useMockServer: true, // Set to `true` to use the mock server, or `false` for the live server
    },
  });

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
          Error:{" "}
          {error.message || "An error occurred while fetching restaurants"}
        </Typography>
      </ErrorContainer>
    );
  }

  // Extract restaurants from the response
  const restaurants = data?.allRestaurants.restaurants || [];

  // Render the RestaurantsList component and pass the restaurants data
  return restaurants.length ?
      <RestaurantsList restaurants={restaurants} />
    : <NoRestaurantFound />;
};

export const Restaurants = withDashboardLayout(RestaurantsPage);
