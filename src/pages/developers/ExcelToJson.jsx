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

function ExcelToJson() {
  const [jsonData, setJsonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = async (acceptedFiles) => {
    setIsLoading(true);
    const file = acceptedFiles[0];
    if (!file) return;

    const workbook = new ExcelJS.Workbook();
    const reader = new FileReader();

    reader.onload = async (e) => {
      const buffer = e.target.result;
      await workbook.xlsx.load(buffer);

      const worksheet = workbook.worksheets[0];
      const rows = [];

      worksheet.eachRow((row) => {
        const rowData = row.values.slice(1); // Skip the first element (it's null)
        rows.push(rowData);
      });

      // Convert rows into JSON (assuming the first row contains headers)
      const [headers, ...dataRows] = rows;
      const json = dataRows.map((row) =>
        headers.reduce((acc, header, index) => {
          acc[header] = row[index];
          return acc;
        }, {})
      );

      setJsonData(json);
      setIsLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: false,
  });

  const handleDownloadJson = () => {
    if (!jsonData) return;

    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    link.click();

    URL.revokeObjectURL(url);
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
          Excel to JSON Converter
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
            Drag & drop an Excel file here, or click to select a file
          </Typography>
        </Box>

        {isLoading && <CircularProgress sx={{ marginY: 2 }} />}

        {jsonData && (
          <>
            <Box
              sx={{ marginTop: 2, maxWidth: "100%", overflowX: "auto", p: 1 }}
            >
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
                    {jsonData.slice(0, 5).map((row, index) => (
                      <TableRow key={index}>
                        {Object.values(row).map((value, idx) => (
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
              onClick={handleDownloadJson}
            >
              Download JSON
            </Button>
          </>
        )}
      </Box>
    </Paper>
  );
}

export default ExcelToJson;
