import { Box, Button, Checkbox, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomDropdown from "./CustomDropdown";
import FilterComponent from "./FilterComponent";

interface ExtendedSidebarProps {
  isExtended: boolean;
  drawerWidth: number;
}

interface FilterState {
  emirate: string;
  city: string;
  status: string;
}

const branchData = [
  { name: "Maroosh", branchCode: "1234590" },
  { name: "Maroosh", branchCode: "1234591" },
  { name: "Maroosh", branchCode: "1234592" },
  { name: "House of Canapes", branchCode: "2234590" },
  { name: "House of Canapes", branchCode: "2234591" },
  { name: "Tikkas", branchCode: "3234590" },
  { name: "Tikkas", branchCode: "3234591" },
  { name: "Tikkas", branchCode: "3234592" },
];

export const ExtendedSidebar: React.FC<ExtendedSidebarProps> = ({
  isExtended,
  drawerWidth,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    emirate: "",
    city: "",
    status: "",
  });

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleFilterApply = (filters: FilterState) => {
    setAppliedFilters(filters);
  };

  const handleResetFilters = () => {
    setAppliedFilters({ emirate: "", city: "", status: "" });
  };

  useEffect(() => {
    // just to remove unused status of these dependency variables
  }, [searchQuery, appliedFilters]);

  return (
    <>
      {isExtended && (
        <>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: drawerWidth,
              width: `calc(100vw - ${drawerWidth}px)`,
              height: "100vh",
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 9999,
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: drawerWidth,
              width: "30rem",
              backgroundColor: "#FFF",
              height: "100vh",
              zIndex: 10000,
              borderBottomRightRadius: "1.25rem",
              borderTopRightRadius: "1.25rem",
              transition: "opacity 0.3s ease-in-out",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{ borderBottom: "0.5px solid black", padding: 2 }}
              className="header"
            >
              <CustomDropdown />
              <FilterComponent
                onSearchChange={handleSearchChange}
                onFilterApply={handleFilterApply}
                onResetFilters={handleResetFilters}
              />
            </Box>

            <Box
              sx={{
                padding: 2,
                flexGrow: 1,
                overflowY: "auto",
              }}
              className="body"
            >
              {branchData.map((branch) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent: "space-between",
                    marginRight: "2rem",
                  }}
                  key={branch.branchCode}
                >
                  <Box>
                    <Checkbox />
                    {branch.name}
                  </Box>
                  <Typography>{branch.branchCode}</Typography>
                </Box>
              ))}
            </Box>

            <Box
              className="footer"
              sx={{ padding: 2, borderTop: "0.5px solid black" }}
            >
              <Button fullWidth variant="contained">
                Apply
              </Button>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
