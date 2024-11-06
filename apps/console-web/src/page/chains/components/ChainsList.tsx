import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { TChain } from "..";
import ChainDrawer from "./ChainDrawer";
import ChainsGrid from "./ChainsGrid";
import ChainsHeader from "./ChainsHeader";
import ChainsTable from "./ChainsTable";
import { NoChainFound } from "./NoChainFound";

const PageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(5),
  marginTop: theme.spacing(4),
}));

type ChainsListProps = {
  chains: TChain[];
};

const ChainsList: React.FC<ChainsListProps> = ({ chains }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedChain, setSelectedChain] = useState<TChain | null>(null); // Track selected chain for editing
  const [isGridView, setIsGridView] = useState<boolean>(true);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const toggleDrawer = (open: boolean, chain?: TChain) => () => {
    setSelectedChain(chain || null); // Set selected chain or reset for new chain
    setIsDrawerOpen(open);
  };

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  // Filter chains by search term
  const filteredChains = chains.filter((chain) =>
    chain.name.toLowerCase().includes(searchTerm),
  );

  return (
    <PageContainer>
      <ChainsHeader
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        isGridView={isGridView}
        onToggleView={toggleView}
        onOpenDrawer={toggleDrawer(true)} // Opens drawer for adding a new chain
      />

      <ChainDrawer
        isOpen={isDrawerOpen}
        onClose={toggleDrawer(false)}
        chain={selectedChain} // Pass selected chain for edit or null for a new chain
      />

      {
        filteredChains.length > 0 ?
          isGridView ?
            <ChainsGrid
              chains={filteredChains}
              onEdit={(chain) => toggleDrawer(true, chain)()}
            /> // Pass onEdit with selected chain
          : <ChainsTable
              chains={filteredChains}
              onEdit={(chain) => toggleDrawer(true, chain)()}
            />

          // Pass onEdit with selected chain
        : <NoChainFound />
      }
    </PageContainer>
  );
};

export default ChainsList;
