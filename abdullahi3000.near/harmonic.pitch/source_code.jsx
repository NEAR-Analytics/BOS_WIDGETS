const coverImage =
  "https://arweave.net/20P7TRwdQ45AB9EBG72AEOswods5UoMXZb42EAoLxBE";
const mediaImage = "http://media.w3.org/2010/05/sintel/trailer.mp4";

const code = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <style>
        body, html {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: RED;
        }
        .video-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100vh;
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
  <div>
    <iframe className="w-100 h-100" srcDoc={code} title="Embedded Media" />
  </div>
);
