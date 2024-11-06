import { styled } from "@mui/material/styles";
import React from "react";
import { TChain } from "..";
import ChainCard from "./chain-card/ChainCard";

const ChainsGridContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(3),
  justifyContent: "center",
}));

type ChainsGridProps = {
  chains: TChain[];
  onEdit: (chain: TChain) => void; // Add onEdit prop for editing a chain
};

const ChainsGrid: React.FC<ChainsGridProps> = ({ chains, onEdit }) => {
  return (
    <ChainsGridContainer>
      {chains.map((chain: TChain) => (
        <ChainCard
          key={chain.id}
          chain={chain}
          onEdit={() => onEdit(chain)} // Trigger edit with the chain
        />
      ))}
    </ChainsGridContainer>
  );
};

export default ChainsGrid;
