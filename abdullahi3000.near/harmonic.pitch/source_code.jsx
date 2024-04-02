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
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f0f0f0;
        }
        .video-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>
    </head>
    <body>

      <div class="video-container">
        <video controls autoplay style="max-width:100%;height:auto;">
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
      minHeight: "1000px",
      minWidth: "300px",
    }}
  >
    <iframe className="w-100 h-100" srcDoc={code} title="Embedded Media" />
  </div>
);
