import { Box } from "@mui/material";
import React from "react";

const TitleSeparator = ({
  color,
  width = "3rem",
  height = "2px",
}: TitleSeparatorPropsInterface) => {
  return (
    <Box
      sx={{
        height: height,
        width: width,
        backgroundColor: color,
      }}
    ></Box>
  );
};

export default TitleSeparator;

interface TitleSeparatorPropsInterface {
  color: string;
  height?: string;
  width?: string;
}
