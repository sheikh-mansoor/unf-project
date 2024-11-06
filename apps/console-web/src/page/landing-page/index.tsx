import { useEffect, useState } from "react";
import { withDashboardLayout } from "../../components/layouts/DashboardLayout";
import { ToastNotification } from "../../components/toast";
import { PManagerDashboard } from "./components/p-manager-dashboard";

const LandingPageComponent = () => {
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    // Check for "logged-in=true" in the URL search params
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("logged-in") === "true") {
      setToastOpen(true); // Open toast

      // Remove "logged-in" from the URL without reloading the page
      urlParams.delete("logged-in");
      const newUrl = `${window.location.pathname}${urlParams.toString() ? "?" + urlParams.toString() : ""}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, []);

  return (
    <>
      <PManagerDashboard />
      {/* Toast Notification */}
      <ToastNotification
        open={toastOpen}
        message="Successfully logged in!"
        variant="success"
        onClose={() => setToastOpen(false)}
      />
    </>
  );
};

export const LandingPage = withDashboardLayout(LandingPageComponent);
