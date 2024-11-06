import { Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TManager } from "..";
import AddManagerDrawer from "./AddManagerDrawer";
import CreateNewManagerButton from "./CreateNewManagerButton";
import ManagerCard from "./ManagerCard";
import ManagersHeader from "./ManagersHeader";
import { NoManagerFound } from "./NoManagerFound";

const PageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(5),
  marginTop: theme.spacing(4),
}));

const ManagersGrid = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(3),
  justifyContent: "center",
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontSize: "16px",
  fontWeight: "bold",
  "&.Mui-selected": {
    color: theme.palette.status.warning,
    borderBottom: `2px solid ${theme.palette.status.warning} !important`,
  },
  "&:focus": {
    outline: "none",
  },
}));

type ManagerTabsProps = {
  managers: TManager[];
};

const ManagerTabs: React.FC<ManagerTabsProps> = ({ managers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isGridView, setIsGridView] = useState<boolean>(true);
  const [selectedManager, setSelectedManager] = useState<TManager | null>(null); // Edit state
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const managerType = searchParams.get("type");

  const activeTab =
    managerType === "loyalty-managers" ? 2
    : managerType === "chain-managers" ? 1
    : 0;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
    if (!open) setSelectedManager(null); // Reset selectedManager when drawer closes
  };

  const toggleView = (view: "grid" | "table") => {
    setIsGridView(view === "grid");
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      navigate("/managers");
    } else if (newValue === 1) {
      navigate("/managers?type=chain-managers");
    } else if (newValue === 2) {
      navigate("/managers?type=loyalty-managers");
    }
  };

  const filteredManagers = managers.filter(
    (manager) =>
      manager.firstName.toLowerCase().includes(searchTerm) ||
      manager.email.toLowerCase().includes(searchTerm),
  );

  const chainManagers = filteredManagers.filter(
    (manager) => manager.role === "CHAIN_MANAGER",
  );
  const loyaltyManagers = filteredManagers.filter(
    (manager) => manager.role === "PLATFORM_LOYALTY_MANAGER",
  );

  const handleEditManager = (manager: TManager) => {
    setSelectedManager(manager); // Set selected manager for editing
    setIsDrawerOpen(true); // Open drawer in edit mode
  };

  const renderManagers = (managers: TManager[]) => {
    return (
      <ManagersGrid>
        {managers.map((manager: TManager) => (
          <ManagerCard
            key={manager.id}
            manager={manager}
            onEdit={handleEditManager} // Pass edit function to ManagerCard
          />
        ))}
      </ManagersGrid>
    );
  };

  return (
    <PageContainer>
      <ManagersHeader
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        isGridView={isGridView}
        onToggleView={toggleView}
        leftComponent={<CreateNewManagerButton onClick={toggleDrawer(true)} />}
      />

      <AddManagerDrawer
        isOpen={isDrawerOpen}
        onClose={toggleDrawer(false)}
        selectedManager={selectedManager} // Pass selected manager to drawer
      />

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{ borderBottom: "1px solid #E0E2E7" }}
        TabIndicatorProps={{ style: { display: "none" } }}
      >
        <StyledTab label="All" />
        <StyledTab label="Chain Managers" />
        <StyledTab label="Loyalty Managers" />
      </Tabs>

      {activeTab === 0 &&
        (filteredManagers.length > 0 ?
          renderManagers(filteredManagers)
        : <NoManagerFound />)}

      {activeTab === 1 &&
        (chainManagers.length > 0 ?
          renderManagers(chainManagers)
        : <NoManagerFound />)}

      {activeTab === 2 &&
        (loyaltyManagers.length > 0 ?
          renderManagers(loyaltyManagers)
        : <NoManagerFound />)}
    </PageContainer>
  );
};

export default ManagerTabs;
