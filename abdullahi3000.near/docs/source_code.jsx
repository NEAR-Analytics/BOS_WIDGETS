const url =
  "https://v2.akord.com/public/vaults/active/FfYz40zp0UIrAqEIhbdfe97PMAdVYMyxvMD4YWIZ1xg/gallery#9ef7fdf1-8bd0-4c6d-a990-e4be8946dbf2";

const code = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>PDF Display Example</title>
      <style>
        .pdf-container {
          width: 100%; /* Adjust the width as needed */
          height: 600px; /* Adjust the height as needed */
          border: 1px solid #000; /* Optional: adds a border around the iframe */
          overflow: hidden; /* Ensures no scrollbars are visible, the PDF will have its own */
        }

        iframe {
          width: 100%;
          height: 100%;
        }
      </style>
    </head>
    <body>

      <div class="pdf-container">
        <iframe src=${url}>
          This browser does not support PDFs. Please download the PDF to view it: <a href="path_to_your_pdf.pdf">Download PDF</a>.
        </iframe>
      </div>
    </body>
  </html>

`;

return (
  <div
    className="container-fluid d-flex flex-column justify-content-center align-items-center"
    style={{ backgroundColor: "#151718", overflowY: "auto" }}
  >
    {url ? (
      <>
        <iframe
          className="w-100" // Use Bootstrap's width utility for 100% width.
          style={{ height: "80vh", border: "none" }} // Adjust height as necessary.
          frameBorder="0"
          allowFullScreen
          src={code}
        ></iframe>
        <Widget src={`abdullahi3000.near/widget/harmonic.docs`} />
      </>
    ) : (
      <div>Loading...</div>
    )}
  </div>
);
