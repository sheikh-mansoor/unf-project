import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { withDashboardLayout } from "../../components/layouts/DashboardLayout";
import { CustomTable } from "../../components/tables/CustomTable";
import { TableHeader } from "../../components/tables/TableHeader";

// Define new columns
const newColumns: GridColDef[] = [
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

// Define new rows
const newRows = [
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
  {
    id: 10,
    userId: "10",
    fullName: "Tyrion Lannister",
    date: "2024-06-11",
    time: "18:00",
    location: "King's Landing",
    activity: "Advising",
    walletSpend: "$60",
    rewards: "12 points",
    link: "https://example.com",
  },
  {
    id: 11,
    userId: "11",
    fullName: "Sansa Stark",
    date: "2024-06-10",
    time: "19:00",
    location: "Winterfell",
    activity: "Ruling",
    walletSpend: "$110",
    rewards: "22 points",
    link: "https://example.com",
  },
  {
    id: 12,
    userId: "12",
    fullName: "Bran Stark",
    date: "2024-06-09",
    time: "20:00",
    location: "Beyond the Wall",
    activity: "Warging",
    walletSpend: "$90",
    rewards: "18 points",
    link: "https://example.com",
  },
  {
    id: 13,
    userId: "13",
    fullName: "Sandor Clegane",
    date: "2024-06-08",
    time: "21:00",
    location: "Riverlands",
    activity: "Fighting",
    walletSpend: "$70",
    rewards: "14 points",
    link: "https://example.com",
  },
  {
    id: 14,
    userId: "14",
    fullName: "Brienne of Tarth",
    date: "2024-06-07",
    time: "22:00",
    location: "Tarth",
    activity: "Guarding",
    walletSpend: "$85",
    rewards: "17 points",
    link: "https://example.com",
  },
  {
    id: 15,
    userId: "15",
    fullName: "Jorah Mormont",
    date: "2024-06-06",
    time: "23:00",
    location: "Bear Island",
    activity: "Advising",
    walletSpend: "$95",
    rewards: "19 points",
    link: "https://example.com",
  },
  {
    id: 16,
    userId: "16",
    fullName: "Samwell Tarly",
    date: "2024-06-05",
    time: "09:00",
    location: "The Wall",
    activity: "Reading",
    walletSpend: "$20",
    rewards: "4 points",
    link: "https://example.com",
  },
  {
    id: 17,
    userId: "17",
    fullName: "Gendry Baratheon",
    date: "2024-06-04",
    time: "10:30",
    location: "Storm's End",
    activity: "Smithing",
    walletSpend: "$40",
    rewards: "8 points",
    link: "https://example.com",
  },
  {
    id: 18,
    userId: "18",
    fullName: "Bran Stark",
    date: "2024-06-03",
    time: "11:00",
    location: "Winterfell",
    activity: "Ruling",
    walletSpend: "$90",
    rewards: "18 points",
    link: "https://example.com",
  },
  {
    id: 19,
    userId: "19",
    fullName: "Bronn",
    date: "2024-06-02",
    time: "12:00",
    location: "King's Landing",
    activity: "Fighting",
    walletSpend: "$55",
    rewards: "11 points",
    link: "https://example.com",
  },
  {
    id: 20,
    userId: "20",
    fullName: "Yara Greyjoy",
    date: "2024-06-01",
    time: "13:00",
    location: "Pyke",
    activity: "Sailing",
    walletSpend: "$150",
    rewards: "30 points",
    link: "https://example.com",
  },
  {
    id: 21,
    userId: "21",
    fullName: "Theon Greyjoy",
    date: "2024-05-31",
    time: "14:30",
    location: "Winterfell",
    activity: "Fighting",
    walletSpend: "$70",
    rewards: "14 points",
    link: "https://example.com",
  },
  {
    id: 22,
    userId: "22",
    fullName: "Jaqen H'ghar",
    date: "2024-05-30",
    time: "15:00",
    location: "Braavos",
    activity: "Training",
    walletSpend: "$40",
    rewards: "8 points",
    link: "https://example.com",
  },
  {
    id: 23,
    userId: "23",
    fullName: "Podrick Payne",
    date: "2024-05-29",
    time: "15:30",
    location: "King's Landing",
    activity: "Guarding",
    walletSpend: "$30",
    rewards: "6 points",
    link: "https://example.com",
  },
  {
    id: 24,
    userId: "24",
    fullName: "Tormund Giantsbane",
    date: "2024-05-28",
    time: "16:00",
    location: "Beyond the Wall",
    activity: "Fighting",
    walletSpend: "$80",
    rewards: "16 points",
    link: "https://example.com",
  },
  {
    id: 25,
    userId: "25",
    fullName: "Grey Worm",
    date: "2024-05-27",
    time: "16:30",
    location: "Meereen",
    activity: "Guarding",
    walletSpend: "$100",
    rewards: "20 points",
    link: "https://example.com",
  },
  {
    id: 26,
    userId: "26",
    fullName: "Missandei",
    date: "2024-05-26",
    time: "17:00",
    location: "Dragonstone",
    activity: "Advising",
    walletSpend: "$75",
    rewards: "15 points",
    link: "https://example.com",
  },
  {
    id: 27,
    userId: "27",
    fullName: "Daario Naharis",
    date: "2024-05-25",
    time: "17:30",
    location: "Meereen",
    activity: "Fighting",
    walletSpend: "$85",
    rewards: "17 points",
    link: "https://example.com",
  },
  {
    id: 28,
    userId: "28",
    fullName: "Jorah Mormont",
    date: "2024-05-24",
    time: "18:00",
    location: "Meereen",
    activity: "Advising",
    walletSpend: "$95",
    rewards: "19 points",
    link: "https://example.com",
  },
  {
    id: 29,
    userId: "29",
    fullName: "Ramsay Bolton",
    date: "2024-05-23",
    time: "18:30",
    location: "Winterfell",
    activity: "Torturing",
    walletSpend: "$60",
    rewards: "12 points",
    link: "https://example.com",
  },
  {
    id: 30,
    userId: "30",
    fullName: "Stannis Baratheon",
    date: "2024-05-22",
    time: "19:00",
    location: "Dragonstone",
    activity: "Ruling",
    walletSpend: "$110",
    rewards: "22 points",
    link: "https://example.com",
  },
];

const UsersComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRows = newRows.filter((row) =>
    row.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilter = () => {
    // Implement your filter logic here
  };
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        mb={2}
        p={2}
        borderRadius="8px"
        gap={2}
      >
        <Typography variant="h6">Users</Typography>
        {/* <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: "20px" }}
          onClick={handleOpen}
        >
          Add New Member
        </Button> */}
        {/* <AddUserDialog open={open} handleClose={handleClose} /> */}
      </Box>
      <Box>
        <TableHeader onSearch={handleSearch} onFilter={handleFilter} />
        <CustomTable rows={filteredRows} columns={newColumns} pageSize={12} />
      </Box>
    </Box>
  );
};

export const Users = withDashboardLayout(UsersComponent);
