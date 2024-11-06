import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const defaultColumns: GridColDef[] = [
  { field: "userId", headerName: "User ID", width: 90 },
  { field: "fullName", headerName: "Full Name", width: 150, editable: true },
  { field: "date", headerName: "Date", width: 110, editable: true },
  { field: "time", headerName: "Time", width: 110, editable: true },
  { field: "location", headerName: "Location", width: 150, editable: true },
  { field: "activity", headerName: "Activity", width: 150, editable: true },
  {
    field: "walletSpend",
    headerName: "Wallet Spend",
    width: 130,
    editable: true,
  },
  { field: "rewards", headerName: "Rewards", width: 110, editable: true },
  {
    field: "link",
    headerName: "Link",
    width: 100,
    renderCell: (params) => (
      <IconButton href={params.value} target="_blank">
        <ArrowUpwardIcon />
      </IconButton>
    ),
  },
];

const defaultRows = [
  {
    id: 1,
    userId: "1",
    fullName: "Jon Snow",
    date: "2024-06-20",
    time: "10:00",
    location: "Winterfell",
    activity: "Fighting",
    walletSpend: "$50",
    rewards: "10 points",
    link: "https://example.com",
  },
  {
    id: 2,
    userId: "2",
    fullName: "Cersei Lannister",
    date: "2024-06-19",
    time: "11:00",
    location: "King's Landing",
    activity: "Scheming",
    walletSpend: "$100",
    rewards: "20 points",
    link: "https://example.com",
  },
  {
    id: 3,
    userId: "3",
    fullName: "Jaime Lannister",
    date: "2024-06-18",
    time: "09:00",
    location: "King's Landing",
    activity: "Guarding",
    walletSpend: "$75",
    rewards: "15 points",
    link: "https://example.com",
  },
  {
    id: 4,
    userId: "4",
    fullName: "Arya Stark",
    date: "2024-06-17",
    time: "08:00",
    location: "Winterfell",
    activity: "Training",
    walletSpend: "$30",
    rewards: "5 points",
    link: "https://example.com",
  },
  {
    id: 5,
    userId: "5",
    fullName: "Daenerys Targaryen",
    date: "2024-06-16",
    time: "12:00",
    location: "Dragonstone",
    activity: "Flying",
    walletSpend: "$200",
    rewards: "50 points",
    link: "https://example.com",
  },
  {
    id: 6,
    userId: "6",
    fullName: "Melisandre",
    date: "2024-06-15",
    time: "14:00",
    location: "Asshai",
    activity: "Magic",
    walletSpend: "$150",
    rewards: "30 points",
    link: "https://example.com",
  },
  {
    id: 7,
    userId: "7",
    fullName: "Ferrara Clifford",
    date: "2024-06-14",
    time: "15:00",
    location: "Braavos",
    activity: "Banking",
    walletSpend: "$50",
    rewards: "10 points",
    link: "https://example.com",
  },
  {
    id: 8,
    userId: "8",
    fullName: "Rossini Frances",
    date: "2024-06-13",
    time: "16:00",
    location: "Volantis",
    activity: "Trading",
    walletSpend: "$80",
    rewards: "20 points",
    link: "https://example.com",
  },
  {
    id: 9,
    userId: "9",
    fullName: "Harvey Roxie",
    date: "2024-06-12",
    time: "17:00",
    location: "Meereen",
    activity: "Ruling",
    walletSpend: "$120",
    rewards: "25 points",
    link: "https://example.com",
  },
];

interface MembersTableProps {
  rows?: Array<{ [key: string]: any }>; // Allow for flexible rows data structure
  columns?: GridColDef[];
  pageSize?: number;
}

export const CustomTable: React.FC<MembersTableProps> = ({
  rows = defaultRows,
  columns = defaultColumns,
  pageSize = 5,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};
