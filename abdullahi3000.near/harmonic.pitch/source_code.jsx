const mediaImage =
  "https://hudsuller-digital-product.s3.amazonaws.com/Product+Demo_Short_NoMusic+1.mp4";

const code = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      body, html {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f0f0f0;
      }
      .video-container {
        width: 100%; /* Ensure the container fills the width */
        height: 100%; /* Ensure the container fills the height */
        display: flex;
        justify-content: center;
        align-items: center;
      }
      video {
        width: 100%; /* Make the video fill the container width */
        height: auto; /* Adjust height automatically to keep the aspect ratio */
        max-height: 100%; /* Ensure it does not exceed the container's height */
      }
    </style>
  </head>
  <body>

    <div class="video-container">
      <video controls autoplay>
        <source src="${mediaImage}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>

  </body>
</html>
`;

return (
  <div
    className="w-100 h-100"
    style={{
      minHeight: "30rem",
      minWidth: "30rem",
    }}
  >
    <iframe
      className="w-100 h-100"
      srcDoc={code}
      title="Embedded Media"
      style={{ border: "none" }}
    />
  </div>
);
