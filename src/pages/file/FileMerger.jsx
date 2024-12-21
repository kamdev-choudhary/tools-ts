import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Grid,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import FileUploadIcon from "@mui/icons-material/CloudUpload";

const FileMerger = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle file selection through react-dropzone
  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  // Handle file merging logic
  const handleMergeFiles = async () => {
    setLoading(true);

    // Simulate file merging process
    setTimeout(() => {
      setLoading(false);
      alert("Files merged successfully!");
    }, 2000);
  };

  // Handle file removal
  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".pdf, .txt, .jpg, .png",
    multiple: true,
  });

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        File Merger
      </Typography>

      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed #1976d2",
          padding: 2,
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <IconButton component="span" color="primary">
          <FileUploadIcon />
        </IconButton>
        <Typography variant="body1" color="textSecondary">
          Drag & Drop or Click to Upload Files
        </Typography>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        {files.length > 0 && (
          <Box>
            <Typography variant="subtitle1">Selected Files:</Typography>
            <Grid container spacing={2} sx={{ marginTop: 1 }}>
              {files.map((file, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 1,
                      border: "1px solid #ccc",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2">{file.name}</Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveFile(index)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>

      <Box sx={{ marginTop: 3, textAlign: "center" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleMergeFiles}
          >
            Merge Files
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default FileMerger;
