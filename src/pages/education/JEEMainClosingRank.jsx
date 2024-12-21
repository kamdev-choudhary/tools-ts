import React, { useEffect, useMemo, useState } from "react";
import CustomDropDown from "../../components/CustomDropDown";
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
} from "@mui/material";
import { CustomToolbar } from "../../components/CustomToolbar";
import { states } from "../../constants/basic";
import { categories } from "../../constants/basic";
import _ from "lodash";
import { DataGrid } from "@mui/x-data-grid";

const quotas = [
  { name: "Home State", value: "HS" },
  { name: "Other State", value: "OS" },
  { name: "Jammu And Kashmir", value: "JK" },
  { name: "Ladakh", value: "LA" },
  { name: "Goa", value: "GO" },
];

function JEEMainClosingRank() {
  const [nit2024, setNit2024] = useState([]);
  const [state, setState] = useState("");
  const [quota, setQuota] = useState("");
  const [gender, setGender] = useState("");
  const [seatType, setSeatType] = useState("");
  const [program, setProgram] = useState("");

  const fetchData = async () => {
    try {
      fetch("/data/nit/nit2024.json")
        .then((response) => response.json())
        .then((data) => setNit2024(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Generate unique programs dynamically based on selected filters
  const programs = useMemo(() => {
    const filteredPrograms = nit2024.filter((d) => {
      return (
        (!state || d.State === state) &&
        (!quota || d.Quota === quota) &&
        (!seatType || d["Seat Type"] === seatType) &&
        (!gender || d.Gender === gender)
      );
    });

    const uniquePrograms = _.uniqBy(
      filteredPrograms.map((d) => ({
        name: d["Academic Program Name"],
        value: d["Academic Program Name"],
      })),
      "value"
    );

    return _.sortBy(uniquePrograms, "name");
  }, [state, quota, gender, seatType]);

  // Filtered Data Logic
  const filteredData = useMemo(() => {
    return nit2024.filter((d) => {
      return (
        (!state || d.State === state) &&
        (!quota || d.Quota === quota) &&
        (!seatType || d["Seat Type"] === seatType) &&
        (!gender || d.Gender === gender) &&
        (!program || d["Academic Program Name"] === program)
      );
    });
  }, [state, quota, gender, seatType, program]);

  // Columns for DataGrid
  const columns = [
    { field: "Institute", headerName: "Institute", minWidth: 250 },
    {
      field: "State",
      headerName: "State",
      minWidth: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Academic Program Name",
      headerName: "Program Name",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "Quota",
      headerName: "Quota",
      minWidth: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Seat Type",
      headerName: "Seat Type",
      minWidth: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Gender",
      headerName: "Gender",
      minWidth: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Opening Rank",
      headerName: "Opening Rank",
      minWidth: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Closing Rank",
      headerName: "Closing Rank",
      minWidth: 100,
      headerAlign: "center",
      align: "center",
    },
  ];

  // Rows for DataGrid
  const rows = useMemo(() => {
    return filteredData?.map((d, index) => ({ ...d, id: index + 1 }));
  }, [filteredData]);

  return (
    <Box>
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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h6">State Closing Rank</Typography>
        </Box>
        <Divider />
        <Box sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, lg: 6 }}>
              <CustomDropDown
                value={state}
                data={_.sortBy(states, "name")}
                onChange={(e) => setState(e.target.value)}
                name="name"
                label="State"
                dropdownValue="name"
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <CustomDropDown
                value={quota}
                data={quotas}
                onChange={(e) => setQuota(e.target.value)}
                name="name"
                dropdownValue="value"
                label="Quota"
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Box>
                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup
                    row
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <FormControlLabel
                      value=""
                      control={<Radio />}
                      label="All"
                    />
                    <FormControlLabel
                      value="Gender-Neutral"
                      control={<Radio />}
                      label="Gender-Neutral"
                    />
                    <FormControlLabel
                      value="Female-only (including Supernumerary)"
                      control={<Radio />}
                      label="Female-only (including Supernumerary)"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <CustomDropDown
                value={seatType}
                data={categories}
                onChange={(e) => setSeatType(e.target.value)}
                name="name"
                dropdownValue="value"
                label="Seat Type"
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <CustomDropDown
                value={program}
                data={programs}
                onChange={(e) => setProgram(e.target.value)}
                name="name"
                dropdownValue="value"
                label="Program"
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Box
        sx={{
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease-in-out",
          ":hover": {
            boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
          },
          mt: 2,
          bgcolor: "background.paper",
        }}
      >
        <DataGrid
          columns={columns}
          rows={rows}
          disableSelectionOnClick
          slots={{ toolbar: () => <CustomToolbar showAddButton={false} /> }}
        />
      </Box>
    </Box>
  );
}

export default JEEMainClosingRank;
