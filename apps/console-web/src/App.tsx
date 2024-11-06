import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./constants";
import { AddNewRestaurant } from "./page/add-new-restaurant";
import { ForgotPassword } from "./page/auth/forgot-password";
import { Login } from "./page/auth/login";
import { ResetPassword } from "./page/auth/reset-password";
import { Chains } from "./page/chains";
import { LandingPage } from "./page/landing-page";
import { Loyalty } from "./page/loyalty";
import { PManagerLoyaltyDashboard } from "./page/loyalty-dashboard/platform-manager";
import { Managers } from "./page/managers";
import { Restaurants } from "./page/restaurants";
import { Settings } from "./page/settings";
import { LoyaltyTiers } from "./page/tiers";
import { UserDetails } from "./page/user-details";
import { Users } from "./page/users";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />

        {/* Private Routes */}
        <Route
          path={ROUTES.HOME_PAGE}
          element={
            <PrivateRoute>
              <LandingPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.USERS}
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.USER_DETAILS}
          element={
            <PrivateRoute>
              <UserDetails />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.TIERS}
          element={
            <PrivateRoute>
              <LoyaltyTiers />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.LOYALTY}
          element={
            <PrivateRoute>
              <Loyalty />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.RESTAURANTS}
          element={
            <PrivateRoute>
              <Restaurants />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.CHAINS}
          element={
            <PrivateRoute>
              <Chains />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.MANAGERS}
          element={
            <PrivateRoute>
              <Managers />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.SETTINGS}
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.PLATFORM_MANAGER_LOYALTY}
          element={
            <PrivateRoute>
              <PManagerLoyaltyDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.ADD_NEW_RESTAURANT}
          element={
            <PrivateRoute>
              <AddNewRestaurant />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
