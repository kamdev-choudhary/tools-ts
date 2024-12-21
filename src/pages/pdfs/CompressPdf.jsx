import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import {
  Box,
  Button,
  Typography,
  TextField,
  LinearProgress,
  Card,
  CardContent,
} from "@mui/material";

const PDFCompressor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalFileSize, setOriginalFileSize] = useState(null);
  const [compressedFileSize, setCompressedFileSize] = useState(null);
  const [compressionRatio, setCompressionRatio] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setOriginalFileSize(file.size);
      setCompressedFileSize(null); // Reset previous compression info
      setCompressionRatio(null);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const compressPDF = async () => {
    if (!selectedFile) {
      alert("Please select a PDF file.");
      return;
    }
    setIsCompressing(true);
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const arrayBuffer = fileReader.result;
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      pages.forEach((page) => {
        const { width, height } = page.getSize();
        page.setSize(width * 0.8, height * 0.8); // Shrink content by 20%
      });

      const compressedPdfBytes = await pdfDoc.save();
      const compressedBlob = new Blob([compressedPdfBytes], {
        type: "application/pdf",
      });

      const compressedSize = compressedBlob.size;
      setCompressedFileSize(compressedSize);

      // Calculate compression ratio
      const ratio =
        ((originalFileSize - compressedSize) / originalFileSize) * 100;
      setCompressionRatio(ratio.toFixed(2));

      // Auto-download compressed file
      saveAs(compressedBlob, "compressed.pdf");

      setIsCompressing(false);
    };

    fileReader.readAsArrayBuffer(selectedFile);
  };

  return (
    <Box sx={{ p: 1, maxWidth: 600, mx: "auto", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        PDF Compressor Tool
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            fullWidth
            // label="Upload PDF"
          />
        </CardContent>
      </Card>

      <Button
        variant="contained"
        color="primary"
        onClick={compressPDF}
        disabled={!selectedFile || isCompressing}
        sx={{ mb: 3 }}
      >
        {isCompressing ? "Compressing..." : "Compress PDF"}
      </Button>

      {isCompressing && <LinearProgress sx={{ mb: 2 }} />}

      {originalFileSize && compressedFileSize && (
        <Box>
          <Typography variant="h6">
            <strong>Original Size:</strong>{" "}
            {(originalFileSize / 1024).toFixed(2)} KB
          </Typography>
          <Typography variant="h6">
            <strong>Compressed Size:</strong>{" "}
            {(compressedFileSize / 1024).toFixed(2)} KB
          </Typography>
          <Typography variant="h6" color="success.main">
            <strong>Reduction:</strong> {compressionRatio}% smaller
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PDFCompressor;
