import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomTable } from "../../../../components/tables/CustomTable";

// Define the type for promo codes
interface PromoCode {
  id: string;
  discountType: string;
  discountValue: number;
  endTime: string;
  label: string;
  maxDiscountAmount: number;
  minSpend: number;
  promoCode: string;
  promoType: string;
  recurrence: string;
  startTime: string;
  total: number;
  validFor: {
    id: string;
    operation: string;
    property: string;
    relationWithNextFilter: string;
    value: string;
  }[];
}

interface PromoCodeStatsProps {
  promoCodes: PromoCode[];
}

export const PromoCodeStats: React.FC<PromoCodeStatsProps> = ({
  promoCodes,
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<PromoCode | null>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    promoCode: PromoCode,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(promoCode);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEditRow = () => {
    if (selectedRow) {
      navigate(`/loyalty?type=promo-codes&id=${selectedRow.id}`, {
        state: { promoCodeData: selectedRow },
      });
    }
    handleClose();
  };

  // Define the columns for promo codes, adding an "Actions" column
  const promoCodeColumns = [
    { field: "label", headerName: "Label", width: 150 },
    { field: "promoCode", headerName: "Promo Code", width: 150 },
    { field: "discountType", headerName: "Discount Type", width: 150 },
    { field: "minSpend", headerName: "Min Spend", width: 130 },
    {
      field: "maxDiscountAmount",
      headerName: "Max Discount Amount",
      width: 180,
    },
    { field: "startTime", headerName: "Start Time", width: 180 },
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

  // Format the promo codes data into rows
  const promoCodeRows = promoCodes.map((promoCode) => ({
    id: promoCode.id,
    label: promoCode.label,
    promoCode: promoCode.promoCode,
    discountType: promoCode.discountType,
    discountValue: promoCode.discountValue,
    promoType: promoCode.promoType,
    minSpend: promoCode.minSpend,
    maxDiscountAmount: promoCode.maxDiscountAmount,
    startTime: promoCode.startTime,
    endTime: promoCode.endTime,
    total: promoCode.total,
    recurrence: promoCode.recurrence,
    validFor: promoCode.validFor,
  }));

  return (
    <>
      <CustomTable rows={promoCodeRows} columns={promoCodeColumns} />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleEditRow}>Edit this row</MenuItem>
      </Menu>
    </>
  );
};
