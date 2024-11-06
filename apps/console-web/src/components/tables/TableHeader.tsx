import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import { CustomInputField } from "../input-fields";

type HeaderComponentProps = {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilter: () => void;
};

export const TableHeader: React.FC<HeaderComponentProps> = ({
  onSearch,
  onFilter,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 2,
        height: "2rem",
        padding: "0 1rem",
      }}
    >
      <CustomInputField
        inputType="text"
        label="Search"
        variant="outlined"
        onChange={onSearch}
        sx={{ width: "10rem", height: "100%", marginRight: 2 }}
      />
      <Button
        variant="contained"
        onClick={onFilter}
        sx={{
          height: "100%",
        }}
      >
        Filter
      </Button>
    </Box>
  );
};
