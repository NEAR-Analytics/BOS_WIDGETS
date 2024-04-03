const mediaImage =
  "https://hudsuller-digital-product.s3.amazonaws.com/Product+Demo_Short_NoMusic+1.mp4";

const code = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body, html {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background-color: #151718;
    }
    .video-container {
      position: relative;
      width: 100%; /* Full width */
      /* Define aspect ratio via padding (56.25% for 16:9 aspect ratio) */
      padding-top: 56.25%;
    }
    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
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
    style={{
      height: "100vh",
      width: "100%",
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
