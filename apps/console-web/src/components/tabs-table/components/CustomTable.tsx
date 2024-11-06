import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { Header } from "./header";

// Type for each data point in the graph
interface GraphDataPoint {
  chainName: string;
  orders: string;
  sales: string;
}

// Type for each dataset
interface DataSet {
  label: string;
  labelKey: string;
  data: GraphDataPoint[]; // data is now an array of GraphDataPoint
}

// Props for the CustomTable component
interface GraphProps {
  dataSets: DataSet[];
}

// Styling for the graph container
const GraphContainer = styled(Box)(({ theme }) => ({
  boxShadow: "0px 4px 30px 0px #1A1C210D",
  borderRadius: "12px",
  padding: "1rem 1rem 3rem 1rem",
  border: `1px solid ${theme.palette.border.primary}`,
  backgroundColor: "#FFF",
}));

interface CustomTableCellProps {
  customPadding?: string; // Optional custom padding prop
}

// Styled component that accepts customPadding as a prop
const CustomTableCell = styled(TableCell)<CustomTableCellProps>(
  ({ customPadding = "16px" }) => ({
    padding: customPadding, // Use the customPadding prop, default to "8px"
    borderBottom: "none", // Customize other styles as needed
  }),
);

// CustomTable component
export const CustomTable = ({ dataSets }: GraphProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [graphData, setGraphData] = useState<GraphDataPoint[]>(
    dataSets.length ? dataSets[0].data : [],
  );
  const [selectedOption, setSelectedOption] = useState("option1"); // State for dropdown

  // Calculate totals for orders and sales
  const totalOrders = graphData.reduce(
    (sum, dataPoint) => sum + parseInt(dataPoint.orders),
    0,
  );
  const totalSales = graphData.reduce(
    (sum, dataPoint) => sum + parseInt(dataPoint.sales),
    0,
  );

  // Corrected handleTabChange function with event and newValue parameters
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setGraphData(dataSets[newValue].data);
  };

  const handleDropdownChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value);
  };

  return (
    <GraphContainer>
      <Header title="Revenue by Campaigns" />
      {dataSets.length > 1 && (
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="Graph Data Tabs"
        >
          {dataSets.map((set, index) => (
            <Tab
              key={index}
              label={set.label}
              sx={{
                "&:focus": {
                  outline: "none",
                },
                textTransform: "none",
              }}
            />
          ))}
        </Tabs>
      )}

      {/* Table with totals above headers */}
      <Box mt={2}>
        <Table sx={{ borderCollapse: "collapse" }}>
          {/* Row for totals */}
          <TableHead>
            <TableRow sx={{ borderBottom: "none" }}>
              {/* Empty cell for the dropdown (no total for this column) */}
              <CustomTableCell></CustomTableCell>
              {/* Total Orders (number above label) */}
              <CustomTableCell align="right" customPadding="0">
                <Box display="flex" flexDirection="column" alignItems="right">
                  <Typography
                    variant="h6"
                    sx={{
                      color: "primary.main",
                      fontSize: "1.5rem",
                      fontWeight: "700",
                    }}
                  >
                    {totalOrders}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.primary",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Total Orders
                  </Typography>
                </Box>
              </CustomTableCell>
              {/* Total Sales (number above label) */}
              <CustomTableCell align="right" customPadding="0">
                <Box display="flex" flexDirection="column" alignItems="right">
                  <Typography
                    variant="h6"
                    sx={{
                      color: "primary.main",
                      fontSize: "1.5rem",
                      fontWeight: "700",
                    }}
                  >
                    {`AED ${totalSales}`}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.primary",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Total Sales
                  </Typography>
                </Box>
              </CustomTableCell>
            </TableRow>
          </TableHead>

          {/* Row for headers (with dropdown in place of "Chain Name") */}
          <TableHead>
            <TableRow sx={{ borderBottom: "1px solid #EEEEEE" }}>
              {/* Dropdown in place of Chain Name */}
              <CustomTableCell customPadding="0">
                <Select
                  value={selectedOption}
                  onChange={handleDropdownChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Select Option" }}
                  sx={{
                    width: "auto", // Automatically adjust width based on content
                    border: "none",
                    padding: 0, // Ensure the Select component itself has no padding
                    color: "primary.main", // Set the text color to primary
                    "& .MuiSelect-select": {
                      color: "primary.main", // Set the dropdown text color to primary
                      paddingRight: "24px", // Space for the dropdown icon
                      border: "none",
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: 0, // Remove padding from the internal input field
                      border: "none",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none", // Remove the border for outlined input
                    },
                    "& .MuiSelect-icon": {
                      color: "primary.main", // Set the dropdown icon color to primary
                    },
                  }}
                >
                  <MenuItem value="option1">Dine In</MenuItem>
                  <MenuItem value="option2">Take Away</MenuItem>
                  <MenuItem value="option3">Carhub</MenuItem>
                </Select>
              </CustomTableCell>

              {/* Orders column heading */}
              <CustomTableCell align="right" customPadding="0">
                <Typography
                  variant="caption"
                  align="right"
                  sx={{
                    color: "text.tertiary",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Orders
                </Typography>
              </CustomTableCell>
              {/* Sales column heading */}
              <CustomTableCell align="right" customPadding="0">
                <Typography
                  variant="caption"
                  align="right"
                  sx={{
                    color: "text.tertiary",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Sales
                </Typography>
              </CustomTableCell>
            </TableRow>
          </TableHead>

          {/* Table body with data */}
          <TableBody>
            {graphData.map((dataPoint, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 }, // Remove the border for the last row
                }}
              >
                <CustomTableCell
                  customPadding="0"
                  sx={{
                    color: "text.primary",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  {dataPoint.chainName}
                </CustomTableCell>
                <CustomTableCell align="right" sx={{ color: "text.primary" }}>
                  {dataPoint.orders}
                </CustomTableCell>
                <CustomTableCell
                  align="right"
                  customPadding="0"
                  sx={{
                    color: "text.primary",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  {`AED ${dataPoint.sales}`}
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </GraphContainer>
  );
};
