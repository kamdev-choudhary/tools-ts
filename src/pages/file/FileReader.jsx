import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useDropzone } from "react-dropzone";
import FileViewer from "../../components/FileViewer";

const FileReader = () => {
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false, // Allow only one file at a time
    accept: {}, // Accept all types of files (no filter)
  });

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
        mb: 1,
      }}
    >
      <Typography variant="h4" component="h1">
        File Viewer
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
        Drag and drop a file or click to select a file. Supported formats
        include images, videos, PDFs, Excel, Word, and more.
      </Typography>
      <Box
        {...getRootProps()}
        sx={{
          border: "1px dashed #ccc",
          padding: 3,
          textAlign: "center",
          cursor: "pointer",
          mb: 2,
          borderRadius: 2,
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="body1" color="textPrimary">
          {file
            ? `Selected File: ${file.name}`
            : "Drag & drop a file here, or click to select"}
        </Typography>
      </Box>
      {file && <FileViewer file={file} />}
    </Paper>
  );
};

export default FileReader;
