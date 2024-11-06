import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomTable } from "../../../../components/tables/CustomTable";

// Define the type for referral rewards
interface ReferralReward {
  id: string;
  discountType: string;
  discountValue: number;
  rewardType: string;
  maxDiscountAmount: number;
  minSpend: number;
  points: number;
}

interface ReferralRewardStatsProps {
  referralRewards: ReferralReward[];
}

export const ReferralRewardStats: React.FC<ReferralRewardStatsProps> = ({
  referralRewards,
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<ReferralReward | null>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    reward: ReferralReward,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(reward);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEditRow = () => {
    if (selectedRow) {
      navigate(`/loyalty?type=referral-rewards&id=${selectedRow.id}`, {
        state: { rewardData: selectedRow },
      });
    }
    handleClose();
  };

  // Define the columns for referral rewards, adding an "Actions" column
  const referralRewardColumns = [
    { field: "id", headerName: "Reward ID", width: 90 },
    { field: "discountType", headerName: "Discount Type", width: 150 },
    { field: "discountValue", headerName: "Discount Value", width: 150 },
    { field: "rewardType", headerName: "Reward Type", width: 150 },
    {
      field: "maxDiscountAmount",
      headerName: "Max Discount Amount",
      width: 180,
    },
    { field: "minSpend", headerName: "Min Spend", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton onClick={(event) => handleClick(event, params.row)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  // Format the referral rewards data into rows
  const referralRewardRows = referralRewards.map((reward) => ({
    id: reward.id,
    discountType: reward.discountType,
    discountValue: reward.discountValue,
    rewardType: reward.rewardType,
    maxDiscountAmount: reward.maxDiscountAmount,
    minSpend: reward.minSpend,
  }));

  return (
    <>
      <CustomTable rows={referralRewardRows} columns={referralRewardColumns} />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleEditRow}>Edit this row</MenuItem>
      </Menu>
    </>
  );
};
