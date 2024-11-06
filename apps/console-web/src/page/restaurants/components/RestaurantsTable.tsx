import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { TRestaurant } from "..";
import { MoreVertSvg } from "../../../assets";
import { ChainMaroosh } from "../../../assets/chains";
import { BulletTypography } from "../../landing-page/components/p-manager-dashboard/BulletTypography";

const ChainsTableContainer = styled("table")(({ theme }) => ({
  width: "100%",
  borderCollapse: "collapse",
  "& th, & td": {
    padding: theme.spacing(1),
    borderBottom: "1px solid #ddd",
  },
  "& th:first-of-type, & td:first-of-type": {
    textAlign: "left",
  },
  "& th:not(:first-of-type), & td:not(:first-of-type)": {
    textAlign: "right",
    whiteSpace: "nowrap",
    width: "1%",
    minWidth: "120px",
  },
}));

type ChainsTableProps = {
  restaurants: TRestaurant[];
  onEdit: (chain: TRestaurant) => void; // Add onEdit prop for editing a chain
};

const ChainsTable: React.FC<ChainsTableProps> = ({ restaurants, onEdit }) => {
  return (
    <ChainsTableContainer>
      <thead>
        <tr>
          <th>Name</th>
          <th>Total Restaurants</th>
          <th>
            <BulletTypography
              text="Open"
              bulletColor="status.success"
              bulletSize={10}
            />
          </th>
          <th>
            <BulletTypography
              text="Closed"
              bulletColor="status.error"
              bulletSize={10}
            />
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {restaurants.map((chain: TRestaurant) => (
          <tr key={chain.id}>
            <td>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <img src={ChainMaroosh} alt={`${chain.name} logo`} />
                {chain.name}
              </Box>
            </td>
            <td>{chain.name}</td> {/* Replace with actual data */}
            <td>{chain.name}</td> {/* Replace with actual data */}
            <td>{chain.name}</td> {/* Replace with actual data */}
            <td>
              <IconButton onClick={() => onEdit(chain)}>
                <MoreVertSvg />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </ChainsTableContainer>
  );
};

export default ChainsTable;
