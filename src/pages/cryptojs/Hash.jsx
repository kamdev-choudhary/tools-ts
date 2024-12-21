import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import CryptoJS from "crypto-js";
import CodeSnippet from "../../components/CodeSnippet";

// Supported hash algorithms
const hashAlgorithms = [
  "MD5",
  "SHA-1",
  "SHA-256",
  "SHA-512",
  "SHA-3",
  "RIPEMD-160",
];

const HashGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(hashAlgorithms[0]);
  const [hashResult, setHashResult] = useState("");

  const generateHash = async () => {
    if (!inputText) return;

    let hash;
    switch (selectedAlgorithm) {
      case "MD5":
        hash = CryptoJS.MD5(inputText);
        break;
      case "SHA-1":
        hash = CryptoJS.SHA1(inputText);
        break;
      case "SHA-256":
        hash = CryptoJS.SHA256(inputText);
        break;
      case "SHA-512":
        hash = CryptoJS.SHA512(inputText);
        break;
      case "SHA-3":
        hash = CryptoJS.SHA3(inputText);
        break;
      case "RIPEMD-160":
        hash = CryptoJS.RIPEMD160(inputText);
        break;
      default:
        alert("Unsupported algorithm selected!");
        return;
    }

    setHashResult(hash.toString(CryptoJS.enc.Hex));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "background.default",
      }}
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
          mb: 1,
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center">
          Hash Generator
        </Typography>
        <TextField
          size="small"
          fullWidth
          label="Input Text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <TextField
          size="small"
          select
          fullWidth
          label="Hash Algorithm"
          value={selectedAlgorithm}
          onChange={(e) => setSelectedAlgorithm(e.target.value)}
          variant="outlined"
          margin="normal"
        >
          {hashAlgorithms.map((algo) => (
            <MenuItem key={algo} value={algo}>
              {algo}
            </MenuItem>
          ))}
        </TextField>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={generateHash}
          sx={{ mt: 2 }}
        >
          Generate Hash
        </Button>
        {hashResult && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Hash Result:</Typography>
            <CodeSnippet
              code={hashResult}
              onClear={() => setHashResult(null)}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default HashGenerator;
