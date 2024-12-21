import React, { useState } from "react";
import {
  Box,
  Divider,
  Paper,
  Typography,
  Grid2 as Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
} from "@mui/material";
import CustomDropDown from "../../components/CustomDropDown";

function JEEMainRankCalculator() {
  const [selection, setSelection] = useState("score");
  const [session, setSession] = useState("");
  const [gender, setGender] = useState("");
  const [score, setScore] = useState("");

  return (
    <>
      <Paper
        elevation={4}
        sx={{
          borderRadius: 2,
          p: 3,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease-in-out",
          ":hover": {
            boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Typography variant="h6" component="h1">
            JEE Main Rank Predictor
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box>
              <FormControl>
                <FormLabel>Select Score or Percentile</FormLabel>
                <RadioGroup
                  row
                  value={selection} // Controlled by state
                  onChange={(e) => setSelection(e.target.value)} // Handle change
                >
                  <FormControlLabel
                    value="score"
                    control={<Radio />}
                    label="Score"
                  />
                  <FormControlLabel
                    value="percentile"
                    control={<Radio />}
                    label="Percentile"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <CustomDropDown
              label="Session"
              value={session}
              data={[
                { name: "Session 01", value: "1" },
                { name: "Session 02", value: "2" },
                { name: "Session 03", value: "3" },
                { name: "Session 04", value: "4" },
              ]}
              onChange={(e) => setSession(e.target.value)}
              showClearButton={false}
              name="name"
              dropdownValue="value"
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  row
                  value={gender} // Controlled by state
                  onChange={(e) => setGender(e.target.value)}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              size="small"
              fullWidth
              value={score}
              onChange={(e) => setScore(e.target.value)}
              label="Enter Rank out of 300"
              type="number"
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant="contained">Predict Rank</Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default JEEMainRankCalculator;
