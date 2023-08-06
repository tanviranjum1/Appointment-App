import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Loader() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress>
        <span className="sr-only">Loading...</span>
      </CircularProgress>
    </Box>
  );
}

export default Loader;
