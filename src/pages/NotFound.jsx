import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { styled } from "@mui/system";

const StyledContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(5),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StyledContainer>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h2" color="error" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" color="textSecondary" gutterBottom>
          Oops! The page you are looking for does not exist.
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          It seems you’ve stumbled upon a page that isn’t available. But don’t
          worry, you can always go back to safety.
        </Typography>
        <Box mt={3}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate("/")}
            sx={{ px: 4, py: 1.5 }}
          >
            Go to Home
          </Button>
        </Box>
        <Box mt={4}>
          <Typography variant="body2" color="textSecondary">
            If you think this is a mistake, please contact support.
          </Typography>
        </Box>
      </StyledContainer>
    </Container>
  );
};

export default NotFoundPage;
