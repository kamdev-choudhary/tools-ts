import {
  Button,
  Paper,
  Box,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid2 as Grid,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomDropDown from "../../components/CustomDropDown";
import { motion } from "framer-motion";

const jokeCategories = [
  { name: "Any", value: "Any" },
  { name: "Programming", value: "Programming" },
  { name: "Miscellaneous", value: "Miscellaneous" },
  { name: "Dark", value: "Dark" },
  { name: "Pun", value: "Pun" },
  { name: "Spooky", value: "Spooky" },
  { name: "Christmas", value: "Christmas" },
];

function Jokes() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Customization states
  const [category, setCategory] = useState("Any");
  const [flags, setFlags] = useState([]);
  const [jokeType, setJokeType] = useState("Any");
  const [number, setNumber] = useState(1);
  const [showPunchlines, setShowPunchlines] = useState([]);

  const fetchJokes = async () => {
    setLoading(true);
    setError(null);
    setShowPunchlines([]); // Reset punchline visibility
    try {
      const flagString = flags.join(",");
      const response = await axios.get(
        `https://v2.jokeapi.dev/joke/${category}`,
        {
          params: {
            type: jokeType !== "Any" ? jokeType : undefined,
            amount: number > 1 ? number : undefined,
            blacklistFlags: flagString || undefined,
          },
        }
      );

      if (response?.status === 200) {
        const jokesArray = Array.isArray(response.data.jokes)
          ? response.data.jokes
          : [response.data];
        setJokes(jokesArray);
        setShowPunchlines(new Array(jokesArray.length).fill(false));
      } else {
        throw new Error("Failed to fetch jokes.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching jokes.");
      setJokes([]);
    } finally {
      setLoading(false);
    }
  };

  const togglePunchline = (index) => {
    setShowPunchlines((prev) =>
      prev.map((show, i) => (i === index ? !show : show))
    );
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
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
        {/* Customization Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
                <CustomDropDown
                  data={jokeCategories}
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  dropdownValue="value"
                  name="name"
                  label="Joke Category"
                  showClearButton={false}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
                <CustomDropDown
                  data={[
                    { name: "Any", value: "Any" },
                    { name: "Single", value: "single" },
                    { name: "Two Part", value: "twopart" },
                  ]}
                  value={jokeType}
                  onChange={(e) => setJokeType(e.target.value)}
                  name="name"
                  dropdownValue="value"
                  showClearButton={false}
                  label="Joke Type"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
                <FormControl size="small" fullWidth sx={{ minWidth: 120 }}>
                  <InputLabel>Flags</InputLabel>
                  <Select
                    multiple
                    value={flags}
                    label="Flags"
                    onChange={(e) => setFlags(e.target.value)}
                  >
                    <MenuItem value="nsfw">NSFW</MenuItem>
                    <MenuItem value="religious">Religious</MenuItem>
                    <MenuItem value="political">Political</MenuItem>
                    <MenuItem value="racist">Racist</MenuItem>
                    <MenuItem value="sexist">Sexist</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
                <TextField
                  label="Number of Jokes"
                  type="number"
                  fullWidth
                  size="small"
                  value={number}
                  onChange={(e) =>
                    setNumber(Math.max(1, Math.min(10, +e.target.value)))
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </motion.div>

        {/* Fetch Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Box sx={{ textAlign: "center", mb: 3, mt: 2 }}>
            <Button variant="contained" onClick={fetchJokes} disabled={loading}>
              {loading ? "Loading..." : "Get Jokes"}
            </Button>
          </Box>
        </motion.div>

        {/* Loading Indicator */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Error Message */}
        {error && (
          <Typography color="error" variant="subtitle1" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {/* Jokes Display */}
        {!loading && !error && jokes.length > 0 && (
          <Box>
            {jokes.map((joke, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Box
                  sx={{
                    mb: 3,
                    border: "1px solid rgba(0,0,0,0.2)",
                    p: 2,
                    borderRadius: 1,
                  }}
                >
                  {joke.type === "twopart" ? (
                    <>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {joke.setup}
                      </Typography>
                      {showPunchlines[index] ? (
                        <Typography variant="subtitle1" color="text.secondary">
                          {joke.delivery}
                        </Typography>
                      ) : (
                        <Button
                          variant="outlined"
                          onClick={() => togglePunchline(index)}
                        >
                          Show Punchline
                        </Button>
                      )}
                    </>
                  ) : (
                    <Typography variant="h6">{joke.joke}</Typography>
                  )}
                </Box>
              </motion.div>
            ))}
          </Box>
        )}
      </Paper>
    </motion.div>
  );
}

export default Jokes;
