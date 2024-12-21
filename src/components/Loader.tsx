import { Backdrop, Box, Paper, Typography } from "@mui/material";
import React from "react";
import { MoonLoader } from "react-spinners";

// Fixing the TypeScript syntax
interface LoaderProps {
  open?: boolean; // Declare the type for 'open' prop
}

// Correctly using the export default
const Loader: React.FC<LoaderProps> = ({ open = true }) => {
  return (
    <Backdrop
      open={open}
      sx={{
        backdropFilter: "blur(5px)", // Adjust the blur level here
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Add some transparency to the background
        zIndex: 4000,
      }}
    >
      <Paper
        sx={{
          borderRadius: 2,
          p: 3,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease-in-out",
          ":hover": {
            boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MoonLoader speedMultiplier={0.5} />
        <Typography sx={{ mt: 1 }}>Please wait</Typography>
      </Paper>
    </Backdrop>
  );
};

export default Loader;
