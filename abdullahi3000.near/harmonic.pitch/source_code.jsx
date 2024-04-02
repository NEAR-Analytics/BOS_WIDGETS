const coverImage =
  "https://arweave.net/20P7TRwdQ45AB9EBG72AEOswods5UoMXZb42EAoLxBE";
const mediaImage = "http://media.w3.org/2010/05/sintel/trailer.mp4";

const code = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
    </head>
    <body>

      <div className={styles.container}>
        <div>
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
    style={{
      minHeight: "500px",
      minWidth: "300px",
    }}
  >
    <iframe iframeResizer className="w-100 h-100" srcDoc={code} />
  </div>
);
