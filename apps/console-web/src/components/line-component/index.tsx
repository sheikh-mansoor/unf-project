import { Box, styled } from "@mui/material";
import React from "react";

interface LineProps {
  height?: number;
  width?: number;
  ratio: number;
}

const Container = styled(Box)<{ width: number; height: number }>(
  ({ width, height }) => ({
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: "#e0e0e0", // Background color for the empty part of the line
    position: "relative",
    overflow: "hidden",
    borderRadius: "4px",
  }),
);

const Filled = styled(Box)<{ width: number; height: number }>(
  ({ width, height = "100%" }) => ({
    width: `${width}%`,
    height: height,
    backgroundColor: "#3f51b5",
    top: 0,
    left: 0,
    borderRadius: "inherit",
  }),
);

const Line: React.FC<LineProps> = ({ height = 20, width = 200, ratio }) => {
  const filledWidth = (ratio * 100).toFixed(2);

  return (
    <Container width={width} height={height}>
      <Filled width={parseFloat(filledWidth)} height={height} />
    </Container>
  );
};

export default Line;
