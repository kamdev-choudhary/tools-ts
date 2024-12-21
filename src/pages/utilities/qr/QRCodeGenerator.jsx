import React, { useState } from "react";
import QRCode from "react-qr-code";
import { toPng, toJpeg, toSvg } from "html-to-image";
import { saveAs } from "file-saver";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";

function QRCodeGenerator() {
  const [text, setText] = useState(""); // State for the input text

  // Handle text input change
  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  // Save the QR code in different formats
  const saveQRCode = async (format) => {
    const qrElement = document.getElementById("qr-code-container");
    try {
      let dataUrl;
      if (format === "png") {
        dataUrl = await toPng(qrElement);
      } else if (format === "jpeg") {
        dataUrl = await toJpeg(qrElement, { quality: 0.95 });
      } else if (format === "svg") {
        dataUrl = await toSvg(qrElement);
      }
      saveAs(dataUrl, `qr-code.${format}`);
    } catch (error) {
      console.error("Error saving QR code:", error);
    }
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        QR Code Generator
      </Typography>

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
        {/* Text input field */}
        <TextField
          label="Enter text to generate QR code"
          variant="outlined"
          value={text}
          onChange={handleInputChange}
          sx={{ width: "100%", maxWidth: 400, marginBottom: 2 }}
        />

        {/* QR Code display */}
        {text && (
          <div
            style={{
              width: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              id="qr-code-container"
              style={{ padding: 4, backgroundColor: "#fff" }}
            >
              <QRCode value={text} size={256} level="H" includeMargin={true} />
            </div>
          </div>
        )}

        {/* Buttons to save QR code in different formats */}
        {text && (
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => saveQRCode("png")}
              sx={{ margin: "0 10px" }}
            >
              Save as PNG
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => saveQRCode("jpeg")}
              sx={{ margin: "0 10px" }}
            >
              Save as JPEG
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => saveQRCode("svg")}
              sx={{ margin: "0 10px" }}
            >
              Save as SVG
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default QRCodeGenerator;
