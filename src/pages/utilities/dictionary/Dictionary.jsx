import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const Dictionary = () => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDefinition = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDefinition(null);

    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      setDefinition(response.data[0]);
    } catch (err) {
      setError("Word not found");
    } finally {
      setLoading(false);
    }
  };

  const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Dictionary
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease-in-out",
          ":hover": {
            boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
          },
        }}
        component="form"
        onSubmit={fetchDefinition}
      >
        <TextField
          label="Enter a word"
          variant="outlined"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          onClick={fetchDefinition}
          disabled={!word || loading}
        >
          Search
        </Button>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {definition && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom>
              {definition.word}
            </Typography>

            {definition.phonetics.map((phonetic, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mt: 1,
                }}
              >
                <Typography variant="body1">
                  {phonetic.text || "No phonetic text available"}
                </Typography>
                {phonetic.audio && (
                  <IconButton
                    color="primary"
                    onClick={() => playAudio(phonetic.audio)}
                  >
                    <VolumeUpIcon />
                  </IconButton>
                )}
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <List>
              {definition.meanings.map((meaning, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="h6">
                    Part of Speech: {meaning.partOfSpeech}
                  </Typography>
                  <List>
                    {meaning.definitions.map((def, idx) => (
                      <ListItem key={idx} divider>
                        <ListItemText
                          primary={def.definition}
                          secondary={
                            def.example ? `Example: ${def.example}` : ""
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Dictionary;
