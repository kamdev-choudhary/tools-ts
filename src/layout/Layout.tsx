import React, { Suspense } from "react";
import Navbar from "./Navbar";
import { Box, Container } from "@mui/material";
import RoutesComponent from "../routes";
import Loader from "../components/Loader";

const DefaultLayout: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1200 }}
      >
        <Navbar />
      </Box>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          mt: 8,
        }}
      >
        <Container maxWidth="lg" sx={{ p: { xs: 1, md: 1, lg: 2 } }}>
          <Suspense fallback={<Loader />}>
            <RoutesComponent />
          </Suspense>
        </Container>
      </Box>
    </Box>
  );
};

export default DefaultLayout;
