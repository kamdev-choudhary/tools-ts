import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";
import CustomDropDown from "../../components/CustomDropDown";
import { jsPDF } from "jspdf";

const ImageConverter = () => {
  const [image, setImage] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState(null);
  const [imageFormat, setImageFormat] = useState("image/jpeg"); // Default format to JPEG

  // Handle image upload
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      setConvertedImage(null);
      setError(null);
    } else {
      setError("Invalid file. Please upload an image.");
    }
  };

  // Handle image format selection
  const handleFormatChange = (event) => {
    setImageFormat(event.target.value);
  };

  // Convert the image to the selected format
  const convertImage = () => {
    if (!image) {
      setError("Please upload an image first.");
      return;
    }

    setIsConverting(true);
    setError(null);
    switch (imageFormat) {
      case "image/jpef":
      case "image/png":
      case "image/gif":
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target.result;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const convertedFile = new File(
                    [blob],
                    `${image.name.split(".")[0]}.${imageFormat.split("/")[1]}`,
                    { type: imageFormat }
                  );
                  const convertedUrl = URL.createObjectURL(convertedFile);
                  setConvertedImage({
                    url: convertedUrl,
                    name: convertedFile.name,
                  });
                  saveAs(convertedUrl, convertedFile.name);
                } else {
                  setError("Conversion failed. Please try again.");
                }
                setIsConverting(false);
              },
              imageFormat,
              1.0
            );
          };
          img.onerror = () => {
            setError("Failed to load the image. Please try again.");
            setIsConverting(false);
          };
        };
        reader.onerror = () => {
          setError("File reading failed. Please try again.");
          setIsConverting(false);
        };
        reader.readAsDataURL(image);
        break;
      case "pdf":
        const pdf = new jsPDF();
        const img = new Image();
        img.src = URL.createObjectURL(image);
        img.onload = () => {
          const pageWidth = 210; // A4 page width in mm
          const pageHeight = 297; // A4 page height in mm
          const aspectRatio = img.width / img.height;
          let imgWidth, imgHeight;
          if (aspectRatio > 1) {
            imgWidth = pageWidth;
            imgHeight = pageWidth / aspectRatio;
          } else {
            imgHeight = pageHeight;
            imgWidth = pageHeight * aspectRatio;
          }
          const x = (pageWidth - imgWidth) / 2;
          const y = (pageHeight - imgHeight) / 2;
          pdf.addImage(img, "JPEG", x, y, imgWidth, imgHeight);
          pdf.save("image.pdf");
        };

        setIsConverting(false);
        break;
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
    },
    onDrop,
    multiple: false,
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Image Converter
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
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Dropzone */}
        <Box
          {...getRootProps()}
          sx={{
            border: "1px dashed gray",
            p: 3,
            textAlign: "center",
            cursor: "pointer",
            mb: 3,
            borderRadius: 1,
          }}
        >
          <input {...getInputProps()} />
          <Typography variant="h6">
            Drag & drop an image here, or click to select one
          </Typography>
        </Box>

        {/* Display Uploaded Image */}
        {image && (
          <Box
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded Preview"
              style={{ width: "auto", maxHeight: "300px" }}
            />
          </Box>
        )}

        <Divider />
        {/* Image Format Selection */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            columnGap: 2,
            p: 2,
            borderRadius: 1,
            justifyContent: "center",
          }}
        >
          <Typography variant="body1">Select Output Format</Typography>
          <Box sx={{ width: 150 }}>
            <CustomDropDown
              label="Image Format"
              value={imageFormat}
              onChange={handleFormatChange}
              dropdownValue="value"
              name="name"
              data={[
                { name: "JPEG", value: "image/jpeg" },
                { name: "PNG", value: "image/png" },
                { name: "GIF", value: "image/gif" },
                { name: "PDF", value: "pdf" },
              ]}
              showClearButton={false}
            />
          </Box>

          {/* Convert Button */}
          <Button
            variant="contained"
            onClick={convertImage}
            disabled={isConverting || !image}
          >
            {isConverting ? (
              <CircularProgress size={24} />
            ) : (
              "Convert and Download Image"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ImageConverter;
