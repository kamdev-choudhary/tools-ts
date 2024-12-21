import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ExcelJS from "exceljs";

interface FileProps {
  file: File | null; // Explicitly typing the 'file' prop as 'File | null'
}

const FileReaderComponent: React.FC<FileProps> = ({ file }) => {
  const [fileContent, setFileContent] = useState<React.ReactNode | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;

    // Ensure the file has an extension and handle invalid filenames
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (!fileExtension) {
      setFileContent(
        <Typography>Invalid file: No extension found.</Typography>
      );
      return;
    }

    setFileType(fileExtension);
    console.log("Selected file:", file); // Debugging the file

    const handleFile = () => {
      switch (fileExtension) {
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
          const imageReader = new FileReader();
          imageReader.onload = () => {
            setFileContent(
              <img
                src={imageReader.result as string}
                alt="Uploaded content"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            );
          };
          imageReader.onerror = () => {
            setFileContent(<Typography>Failed to load image.</Typography>);
          };
          imageReader.readAsDataURL(file);
          break;

        case "mp3":
        case "wav":
        case "ogg":
          const audioReader = new FileReader();
          audioReader.onload = () => {
            setFileContent(
              <audio controls src={audioReader.result as string} />
            );
          };
          audioReader.onerror = () => {
            setFileContent(<Typography>Failed to load audio.</Typography>);
          };
          audioReader.readAsDataURL(file);
          break;

        case "mp4":
        case "avi":
        case "mov":
          const videoReader = new FileReader();
          videoReader.onload = () => {
            setFileContent(
              <video
                controls
                style={{ width: "100%", height: "100%" }}
                src={videoReader.result as string}
              />
            );
          };
          videoReader.onerror = () => {
            setFileContent(<Typography>Failed to load video.</Typography>);
          };
          videoReader.readAsDataURL(file);
          break;

        case "pdf":
          const fileUrl = URL.createObjectURL(file); // Create object URL for PDF file
          console.log("Generated PDF URL:", fileUrl); // Debugging the generated PDF URL
          setPdfUrl(fileUrl);
          setFileContent(
            <Box sx={{ height: "100%", overflow: "auto" }}>
              <iframe
                src={fileUrl}
                width="100%"
                height="800"
                title="PDF Viewer"
                style={{ border: "none" }}
              />
            </Box>
          );
          break;

        case "txt":
        case "json":
          const textReader = new FileReader();
          textReader.onload = () => {
            const content = textReader.result as string;
            setFileContent(<pre>{content}</pre>);
          };
          textReader.onerror = () => {
            setFileContent(<Typography>Failed to read file.</Typography>);
          };
          textReader.readAsText(file);
          break;

        case "xlsx":
        case "csv":
          const excelReader = new FileReader();
          excelReader.onload = async () => {
            try {
              const workbook = new ExcelJS.Workbook();
              await workbook.xlsx.load(excelReader.result as ArrayBuffer);
              const worksheet = workbook?.getWorksheet(1);
              const rows: any[] = [];
              worksheet?.eachRow((row, rowNumber) => {
                rows.push(row.values);
              });
              setFileContent(
                <Box>
                  <Typography variant="h6">Excel Data:</Typography>
                  <table style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        {rows[0]?.map((cell, index) => (
                          <th key={index}>{cell}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              );
            } catch (error) {
              setFileContent(
                <Typography>Error processing Excel file.</Typography>
              );
            }
          };
          excelReader.onerror = () => {
            setFileContent(<Typography>Failed to read Excel file.</Typography>);
          };
          excelReader.readAsArrayBuffer(file);
          break;

        default:
          setFileContent(<Typography>Unsupported file type.</Typography>);
          break;
      }
    };

    handleFile();
  }, [file]);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {fileContent ? (
        <Box
          sx={{
            border: "1px solid #ccc",
            padding: 2,
            borderRadius: 2,
            overflow: "auto",
            flexGrow: 1, // Allow the content to take the full available height
            display: "flex",
            flexDirection: "column",
          }}
        >
          {fileContent}
        </Box>
      ) : (
        <Typography variant="body1">
          No file selected or file is being processed.
        </Typography>
      )}
    </Box>
  );
};

export default FileReaderComponent;
