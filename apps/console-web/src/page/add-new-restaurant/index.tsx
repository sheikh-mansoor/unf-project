import { Box } from "@mui/material";
import { withDashboardLayout } from "../../components/layouts/DashboardLayout";
import { OperationalDetails } from "./OperationalDetails";
import { RestaurantInformation } from "./RestaurantInformation";

export const AddNewRestaurantPage = () => {
  return (
    <Box>
      <RestaurantInformation />
      <OperationalDetails />
    </Box>
  );
};

export const AddNewRestaurant = withDashboardLayout(AddNewRestaurantPage);
