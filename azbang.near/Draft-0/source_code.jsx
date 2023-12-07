const code = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@near-wallet-selector/account-export@8.9.1/styles.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@near-wallet-selector/modal-ui@8.9.1/styles.css" />
  </head>
  <body>
    <script src="https://nftstorage.link/ipfs/bafybeieyi4eheeqzvwdugohshqn3aucpbmqago7yhjx3rdix5abfiwnep4"></script>
  </body>
</html>
`;

return (
  <iframe
    style={{ width: "100%", height: 500, background: "#ccc" }}
    srcDoc={code}
  />
);
