import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { ChangeEvent, FocusEvent, useState } from "react";
import { SearchSvg } from "../../../assets";

export const Searchbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleBlur = (_: FocusEvent<HTMLInputElement>) => {
    if (!inputValue) setIsExpanded(false); // Collapse if input is empty
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
      {!isExpanded ?
        <IconButton
          onClick={handleExpand}
          disableRipple
          sx={{
            cursor: "pointer",
            background: "none",
            padding: 0,
            gap: "0.5rem",
            border: "none", // Explicitly set no border
            boxShadow: "none", // Remove any potential shadow effect
            fontSize: "1rem",
            "&:hover": { backgroundColor: "transparent" },
            "&:active": { backgroundColor: "transparent", border: "none" },
            "&:focus": { outline: "none", border: "none" }, // Remove focus border
          }}
        >
          <SearchSvg />
          Search
        </IconButton>
      : <TextField
          autoFocus
          fullWidth
          placeholder="Search"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{ flex: 1, marginRight: "2rem" }}
        />
      }
    </div>
  );
};
