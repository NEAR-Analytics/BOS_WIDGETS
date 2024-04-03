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
      body, html {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
      }
      .pdf-container {
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: hidden; /* Hides scrollbars on the pdf-container */
      }
      iframe {
        width: 100%;
        height: 100%;
        border: none; /* Removes the default iframe border */
      }
    </style>
  </head>
  <body>
    <div class="pdf-container">
      <iframe src="${url}" allowfullscreen webkitallowfullscreen></iframe>
    </div>
  </body>
</html>
`;

return (
  <div
    className="container-fluid d-flex flex-column justify-content-center align-items-center"
    style={{ backgroundColor: "#151718", overflowY: "auto", height: "100vh" }}
  >
    {url ? (
      <>
        <iframe
          className="w-100 h-100" // Ensures the iframe takes up the entire area of its parent
          style={{ border: "none" }} // Removes any default styling (e.g., border)
          srcDoc={code}
          title="PDF Viewer"
        ></iframe>
      </>
    ) : (
      <div>Loading...</div>
    )}
  </div>
);
