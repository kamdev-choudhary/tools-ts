import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import ExcelJS from "exceljs";

function JsonToExcel() {
  const [jsonData, setJsonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle the file upload and JSON conversion
  const onDrop = async (acceptedFiles) => {
    setIsLoading(true);
    const file = acceptedFiles[0];
    if (!file) return;

    // Read the JSON file
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const json = JSON.parse(e.target.result);
        setJsonData(json);
      } catch (error) {
        alert("Failed to parse JSON file");
      }
      setIsLoading(false);
    };
    reader.readAsText(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".json"], // Accept JSON files
    },
    multiple: false,
  });

  // Convert JSON data to Excel and allow download
  const handleDownloadExcel = async () => {
    if (!jsonData) return;

    setIsLoading(true);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Extract headers from the JSON data (assuming it's an array of objects)
    const headers = Object.keys(jsonData[0]);
    worksheet.addRow(headers);

    // Add data rows
    jsonData.forEach((item) => {
      worksheet.addRow(Object.values(item));
    });

    // Write the Excel file to a buffer and create a downloadable link
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "data.xlsx";
    link.click();

    URL.revokeObjectURL(url);
    setIsLoading(false);
  };

  return (
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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <Typography variant="h4" gutterBottom>
          JSON to Excel Converter
        </Typography>

        <Box
          {...getRootProps()}
          sx={{
            padding: 4,
            textAlign: "center",
            border: "2px dashed #1976d2",
            borderRadius: 2,
            width: "100%",
            cursor: "pointer",
          }}
        >
          <input {...getInputProps()} />
          <Typography variant="body1">
            Drag & drop a JSON file here, or click to select a file
          </Typography>
        </Box>

        {isLoading && <CircularProgress sx={{ marginY: 2 }} />}

        {jsonData && !isLoading && (
          <>
            <Box sx={{ marginY: 2, width: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Preview Data:
              </Typography>
              <TableContainer component={Paper} elevation={4}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {Object.keys(jsonData[0]).map((key) => (
                        <TableCell key={key}>{key}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {jsonData.slice(0, 5).map((item, index) => (
                      <TableRow key={index}>
                        {Object.values(item).map((value, idx) => (
                          <TableCell key={idx}>{value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={handleDownloadExcel}
            >
              Download Excel
            </Button>
          </>
        )}
      </Box>
    </Paper>
  );
}

export default JsonToExcel;
