import { ExpandMore as ChevronIcon } from "@mui/icons-material";
import {
  Box,
  ClickAwayListener,
  FormControl,
  MenuItem,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import {
  ChainHouseOfCanapes,
  ChainMaroosh,
  ChainTikkas,
} from "../../../../../assets/chains";

const CHAINS_DATA = [
  { name: "Maroosh", icon: ChainMaroosh, value: "Maroosh" },
  {
    name: "House of Canapes",
    icon: ChainHouseOfCanapes,
    value: "HouseOfCanapes",
  },
  { name: "Tikkas", icon: ChainTikkas, value: "Tikkas" },
];

const StyledMenuItem = styled(MenuItem)(() => ({
  fontSize: "18px",
  fontWeight: "700",
}));

const CustomDropdown: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState(CHAINS_DATA[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChange = (item: (typeof CHAINS_DATA)[0]) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "3rem",
        }}
      >
        <FormControl fullWidth>
          {!isOpen ?
            <Box
              onClick={() => setIsOpen(true)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                height: "100%",
                padding: "8px",
              }}
            >
              <img src={selectedItem.icon} alt={selectedItem.name} />
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                {selectedItem.name}
              </Typography>
              <ChevronIcon
                sx={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", // Rotate based on state
                  transition: "transform 0.3s", // Smooth transition
                }}
              />
            </Box>
          : <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "20px",
                backgroundColor: "white",
                boxShadow: "0px 4px 8.5px 4px #00000026",
                gap: "4px",
                zIndex: 10,
                paddingTop: "1rem",
                paddingBottom: "1rem",
              }}
            >
              <StyledMenuItem
                key={selectedItem.value}
                onClick={() => handleChange(selectedItem)}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    color: "primary.main",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                    }}
                  >
                    <img src={selectedItem.icon} alt={selectedItem.name} />
                    {selectedItem.name}
                  </Box>
                  <ChevronIcon
                    sx={{
                      transform: "rotate(180deg)", // Always upward in open state
                      transition: "transform 0.3s",
                    }}
                  />
                </Box>
              </StyledMenuItem>
              {CHAINS_DATA.filter(
                (chain) => chain.value !== selectedItem.value,
              ).map((chain) => (
                <StyledMenuItem
                  key={chain.value}
                  onClick={() => handleChange(chain)}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <img src={chain.icon} alt={chain.name} />
                    {chain.name}
                  </Box>
                </StyledMenuItem>
              ))}
            </Box>
          }
        </FormControl>
      </Box>
    </ClickAwayListener>
  );
};

export default CustomDropdown;
