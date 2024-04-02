const mediaImage = "http://media.w3.org/2010/05/sintel/trailer.mp4";

const code = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f0f0;
        }
        iframe {
          /* Adjust iframe size as needed */
          width: 80%;
          height: 450px; /* Adjust height based on the aspect ratio */
        }
      </style>
    </head>
    <body>

      <div className={styles.container}>
        <div className="relative w-full md:w-1/2 mx-auto rounded-xl overflow-hidden">
          <video controls autoPlay>
            <source src=${mediaImage}></source>
          </video>
        </div>
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
    <iframe iframeResizer className="w-100 h-100" srcDoc={code} />
  </div>
);
