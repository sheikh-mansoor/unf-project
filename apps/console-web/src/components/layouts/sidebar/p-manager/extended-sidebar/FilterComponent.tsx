import { Search as SearchIcon, Tune } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface FilterComponentProps {
  onSearchChange: (value: string) => void;
  onFilterApply: (filters: {
    emirate: string;
    city: string;
    status: string;
  }) => void;
  onResetFilters: () => void; // New reset handler prop
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  onSearchChange,
  onFilterApply,
  onResetFilters,
}) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [filters, setFilters] = useState({
    emirate: "",
    city: "",
    status: "",
  });

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name as string]: value,
    }));
  };

  const handleApplyFilters = () => {
    onFilterApply(filters);
    setIsCardOpen(false);
  };

  const handleResetFilters = () => {
    setFilters({ emirate: "", city: "", status: "" });
    onResetFilters();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        height: "2.5rem",
        justifyContent: "space-between",
        marginTop: "1rem",
        position: "relative",
      }}
    >
      <TextField
        sx={{
          height: "100%",
          width: "74%",
          "& .MuiInputBase-root": { height: "100%" },
          "& input": { height: "100%", padding: "0 8px" },
        }}
        placeholder="Search..."
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        startIcon={<Tune />}
        sx={{
          height: "100%",
          width: "23%",
          borderRadius: "0.5rem",
          color: "#fff",
          padding: "1rem",
        }}
        onClick={() => setIsCardOpen(!isCardOpen)}
      >
        Filters
      </Button>

      {isCardOpen && (
        <Card
          sx={{
            position: "absolute",
            top: "120%",
            right: 0,
            width: "100%",
            boxShadow: "0px 4px 27px 9px #1A1C210D",
            borderRadius: "0.5rem",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Apply Filters
            </Typography>

            <FormControl fullWidth>
              <InputLabel>Emirate</InputLabel>
              <Select
                value={filters.emirate}
                onChange={handleFilterChange}
                name="emirate"
              >
                <MenuItem value="Dubai">Dubai</MenuItem>
                <MenuItem value="Abu Dhabi">Abu Dhabi</MenuItem>
                <MenuItem value="Sharjah">Sharjah</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>City</InputLabel>
              <Select
                value={filters.city}
                onChange={handleFilterChange}
                name="city"
              >
                <MenuItem value="City 1">City 1</MenuItem>
                <MenuItem value="City 2">City 2</MenuItem>
                <MenuItem value="City 3">City 3</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                onChange={handleFilterChange}
                name="status"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* Footer Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "1rem",
              height: "4rem", // Fixed height for the footer
              borderTop: "1px solid black",
              padding: "1rem",
            }}
          >
            <Button
              variant="outlined"
              sx={{ width: "fit-content" }}
              onClick={handleResetFilters}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              sx={{ width: "fit-content" }}
              onClick={handleApplyFilters}
            >
              Apply
            </Button>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default FilterComponent;
