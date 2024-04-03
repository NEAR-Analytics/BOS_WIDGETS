const url =
  "https://drive.google.com/file/d/1id_f8nkc8skMyrqfnecW6TOI8Q9r7dIy/preview";

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
        height: 100%; /* Responsive height */
        overflow: auto; /* Enables scrollbars when needed */
        position: relative; /* Ensures proper scaling within container */
      }
      iframe {
        width: 100%;
        height: 100vh; /* Responsive height based on viewport */
        border: none; /* Removes the default iframe border */
        position: absolute; /* Allows responsive scaling */
        top: 0;
        left: 0;
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
    className="container-fluid justify-content-center align-items-center"
    style={{ backgroundColor: "#151718", overflowY: "auto", height: "100vh" }}
  >
    {url ? (
      <>
        <iframe
          className="w-100 h-100"
          style={{ border: "none" }}
          srcDoc={code}
          title="PDF Viewer"
        ></iframe>
        <Widget src={`abdullahi3000.near/widget/harmonic.docs`} />
      </>
    ) : (
      <div>Loading...</div>
    )}
  </div>
);
