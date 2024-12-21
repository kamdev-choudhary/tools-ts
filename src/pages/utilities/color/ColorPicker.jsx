import React, { useState } from "react";
import { Box, Paper, Typography, Grid2 as Grid } from "@mui/material";
import { SketchPicker } from "react-color";
import CodeSnippet from "../../../components/CodeSnippet";

const ColorPicker = () => {
  const [color, setColor] = useState("#ff0000"); // Default color (Red)

  const handleColorChange = (color) => {
    setColor(color.hex); // Update the selected color
  };

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  // Convert hex to rgb
  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  // Convert hex to hsl
  function hexToHsl(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          break;
      }
      h /= 6;
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
      l * 100
    )}%)`;
  }

  return (
    <Paper
      sx={{
        mx: "auto",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease-in-out",
        ":hover": {
          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Typography variant="h5" textAlign="center">
        Color Picker
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
              <SketchPicker
                styles={{ width: "100%" }}
                color={color}
                onChangeComplete={handleColorChange} // Handle color change
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: color,
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  mb: 1,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              flex: 1,
              justifyContent: "space-around",
            }}
          >
            <CodeSnippet code={color} showCloseButton={false} />
            <CodeSnippet code={rgb} showCloseButton={false} />
            <CodeSnippet code={hsl} showCloseButton={false} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ColorPicker;
