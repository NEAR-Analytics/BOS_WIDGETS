const coverImage =
  "https://arweave.net/20P7TRwdQ45AB9EBG72AEOswods5UoMXZb42EAoLxBE";
const mediaImage = "http://media.w3.org/2010/05/sintel/trailer.mp4";

const code = `
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%; /* This will make sure the body takes the full viewport height */
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: red; /* Ensure this is lowercase or use a hex value like #ff0000 */
    }
    .video-container {
      width: 100%;
      height: 100%; /* Make sure the container takes the full height of its parent */
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 50px; /* Missing semicolon added */
    }
    video {
      width: 100%; /* Adjust as needed */
      height: auto; /* Adjust as needed */
      max-height: 100%; /* Ensure the video does not exceed the container's height */
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
      minHeight: "500px",
      minWidth: "300px",
    }}
  >
    <iframe className="w-100 h-100" srcDoc={code} title="Embedded Media" />
  </div>
);
