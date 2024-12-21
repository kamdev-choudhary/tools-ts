import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Slider,
  Typography,
} from "@mui/material";
import CodeSnippet from "../../../components/CodeSnippet";
import { motion } from "framer-motion";

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    let characters = "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) characters += "0123456789";
    if (includeSpecial) characters += "!@#$%^&*()_+[]{}|;:,.<>?";

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
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
        <Typography variant="h5" textAlign="center">
          Password Generator
        </Typography>

        <Box>
          <Typography gutterBottom>Password Length: {length}</Typography>
          <Slider
            value={length}
            onChange={(e, value) => setLength(value)}
            min={6}
            max={32}
            step={1}
            marks={[
              { value: 6, label: "6" },
              { value: 16, label: "16" },
              { value: 32, label: "32" },
            ]}
            valueLabelDisplay="auto"
          />
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
          }
          label="Include Uppercase Letters"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
          }
          label="Include Numbers"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={includeSpecial}
              onChange={(e) => setIncludeSpecial(e.target.checked)}
            />
          }
          label="Include Special Characters"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={generatePassword}
          fullWidth
        >
          Generate Password
        </Button>

        {password && (
          <CodeSnippet
            variant="h4"
            code={password}
            onClear={() => setPassword(null)}
          />
        )}
      </Paper>
    </motion.div>
  );
};

export default PasswordGenerator;
