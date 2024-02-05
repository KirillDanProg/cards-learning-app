import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import {Table} from "@mui/material";

export const TableSkeleton = () => {
  return (
    <Table>
      <Box sx={boxStyle}>
        <Skeleton width="100%" height={55} style={{marginBottom: "-20px"}} />
        <Skeleton width="100%" height={65} style={style} />
        <Skeleton width="100%" height={65} style={style} />
        <Skeleton width="100%" height={65} style={style} />
        <Skeleton width="100%" height={65} style={style} />
      </Box>
    </Table>
  );
};

const style = {
  marginBottom: -15
};
const boxStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
};
