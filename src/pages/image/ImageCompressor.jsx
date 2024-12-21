import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Slider,
  Card,
  CardMedia,
  CardContent,
  Paper,
  TextField,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import {
  AddRounded,
  KeyboardDoubleArrowRightRounded,
} from "@mui/icons-material";
import { getBase64SizeInKB } from "../../constants/functions";

function ImageCompressor() {
  const [image, setImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [size, setSize] = useState(90); // Initial size percentage

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImage(file);
      setOriginalImage(URL.createObjectURL(file));
      setCompressedImage(URL.createObjectURL(file)); // Show preview initially
    }
  };

  useEffect(() => {
    if (image && size !== "" && size !== null && size !== undefined) {
      handleResize(image);
    }
  }, [image, size]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
    },
    multiple: false,
  });

  const handleResize = (image) => {
    if (image) {
      const img = new Image();
      img.src = URL.createObjectURL(image);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (ctx) {
          const newWidth = (img.width * size) / 100;
          const newHeight = (img.height * size) / 100;
          canvas.width = newWidth;
          canvas.height = newHeight;
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
          const resizedImage = canvas.toDataURL("image/jpeg", 0.8); // Compress image
          setCompressedImage(resizedImage);
        }
      };
    }
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
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          border: "1px dashed",
          borderColor: "grey.400",
          borderRadius: 2,
          cursor: "pointer",
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
          <AddRounded />
          <Typography variant="h6" color="textSecondary">
            Drag & Drop an image here or click to upload
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          my: 2,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {image && (
          <>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Card sx={{ maxWidth: 400, boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  height="auto"
                  width="400"
                  image={originalImage}
                  alt="Uploaded Image"
                />
                <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography variant="body2" color="textSecondary">
                    {image.name} ({(image.size / 1024).toFixed(2)} KB)
                  </Typography>
                </CardContent>
              </Card>
              <Box sx={{ p: 2 }}>
                <KeyboardDoubleArrowRightRounded />
              </Box>
              <Card sx={{ maxWidth: 400, boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  height="auto"
                  width="400"
                  image={compressedImage}
                  alt="Uploaded Image"
                />
                <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography variant="body2" color="textSecondary">
                    compressed-image ({getBase64SizeInKB(compressedImage)} KB)
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Box width={300} sx={{ py: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography gutterBottom>Resize Percentage:</Typography>
                <TextField
                  size="small"
                  value={size}
                  onChange={(e) => {
                    let val = e.target.value;
                    if (+val < 201 && +val > 0) {
                      setSize(val);
                    } else if (val == "") {
                      setSize(val);
                    }
                  }}
                  type="number"
                  sx={{ width: "100px" }}
                />
              </Box>
              <Slider
                value={size}
                onChange={(e, value) => setSize(value)}
                min={10}
                max={200}
                step={5}
                valueLabelDisplay="auto"
              />
            </Box>
          </>
        )}

        {compressedImage && (
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              const link = document.createElement("a");
              link.href = compressedImage;
              link.download = "compressed-image.jpg";
              link.click();
            }}
            disabled={!compressedImage || size == "" || size == null}
          >
            Download Compressed Image
          </Button>
        )}
      </Box>
    </Paper>
  );
}

export default ImageCompressor;
