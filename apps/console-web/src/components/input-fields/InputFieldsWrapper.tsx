import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
interface FieldWrapperProps {
  children: React.ReactNode;
  sx?: SxProps;
}

export const InputFieldsWrapper: React.FC<FieldWrapperProps> = ({
  children,
  sx,
}) => {
  const childArray = React.Children.toArray(children);

  return (
    <Box
      display="flex"
      flexDirection={childArray.length > 1 ? "row" : "column"}
      gap={2}
      height="100%"
      alignItems="center"
      sx={sx}
    >
      {childArray.map((child, index) => (
        <Box key={index} flex={1} height="100%">
          {child}
        </Box>
      ))}
    </Box>
  );
};
