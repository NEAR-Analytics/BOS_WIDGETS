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

      <iframe src="https://harmonicguild-my.sharepoint.com/personal/quinn_harmonicguild_io/_layouts/15/stream.aspx?id=%2Fpersonal%2Fquinn%5Fharmonicguild%5Fio%2FDocuments%2FContent%2FAttachments%2FProduct%20Demo%5FShort%5FNoMusic%201%2Emp4&ga=1&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview" title="Harmonic Guild Pitch" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    </body>
  </html>
`;

return (
  <div
    className="w-100"
    style={{
      minHeight: "500px",
      minWidth: "300px",
    }}
  >
    <iframe
      iframeResizer
      className="w-100"
      srcDoc={code}
      message={{
        data: chartData,
        colors,
        balances: {
          totalUsd: balances.totalUsd,
          balancesTotal: balancesTotal,
        },
      }}
    />
  </div>
);
