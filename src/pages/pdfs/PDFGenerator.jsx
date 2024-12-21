import React from "react";
import { PDFDocument, rgb, PageSizes } from "pdf-lib";
import html2canvas from "html2canvas";

function PDFGenerator() {
  const generatePDF = async () => {
    // A4 page size in points (595 x 842)
    const A4Width = 595;
    const A4Height = 842;
    const padding = 28.35;

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Add an A4-sized page
    const page = pdfDoc.addPage(PageSizes.A4);

    // Get the HTML element to be converted
    const element = document.getElementById("content-to-pdf");

    if (element) {
      // Capture the HTML element as an image
      html2canvas(element).then(async (canvas) => {
        const imageDataUrl = canvas.toDataURL("image/png");
        const image = await pdfDoc.embedPng(imageDataUrl);

        const { width: imgWidth, height: imgHeight } = image.scale(0.5); // scale if necessary

        // Position the image on the page
        page.drawImage(image, {
          x: (A4Width - imgWidth) / 2,
          y: A4Height - imgHeight - 50, // adjust y for padding
          width: imgWidth,
          height: imgHeight,
        });

        // Serialize the PDF to bytes
        const pdfBytes = await pdfDoc.save();

        // Download the PDF
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "generated.pdf";
        link.click();
      });
    }
  };

  return (
    <div>
      <h1>PDF Generator</h1>

      {/* HTML content to convert to PDF */}
      <div
        id="content-to-pdf"
        style={{ padding: "20px", backgroundColor: "#f4f4f4" }}
      >
        <h2>This is the content that will be added to the PDF.</h2>
        <p>
          Some more content here. You can style it and add anything you like.
        </p>
      </div>

      {/* Button to generate PDF */}
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
}

export default PDFGenerator;
