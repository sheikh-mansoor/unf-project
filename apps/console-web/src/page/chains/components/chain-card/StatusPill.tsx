import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Define the pill styles
const Pill = styled(Typography)<{ status: "open" | "close" }>(({ status }) => ({
  display: "inline-block",
  padding: "0.25rem 0.75rem",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: "500",
  color: status === "open" ? "#4ADE80" : "#FF4B4B", // Text colors for open and close
  backgroundColor: status === "open" ? "#E6FBF0" : "#FDEDED", // Background colors
}));

// StatusPill Component
type StatusPillProps = {
  status: "open" | "close";
};

const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
  return <Pill status={status}>{status === "open" ? "Open" : "Closed"}</Pill>;
};

export default StatusPill;
