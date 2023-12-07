State.init({
  creds: null,
  link: null,
});

const Page = styled.div`
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    display: flex;
`;

const BlurScreen = styled.div`
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
`;

if (context.accountId == null) {
  return (
    <Page>
      <h2 style={{ width: "100%", textAlign: "center" }}>Sign in please</h2>
    </Page>
  );
}

const code = fetch(
  "https://nftstorage.link/ipfs/bafybeicgzd7pnlaswyf3xohphkja6x35fyl5icjyyehyj564pgpkxksusu"
);

if (code.body != null && state.creds != null) {
  const script = `
        <script>
            window.accountId = "${state.creds.accountId}";
            window.privateKey = "${state.creds.privateKey}";
            window.openLink = (link) => {
            window.top.postMessage(link, "*")
            }

            window.mockLocalStorage = {
            setItem: () => {},
            getItem: () => null,
            removeItem: () => {}
            }
        </script>
    `;

  return (
    <Page style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <iframe
        onMessage={(link) => State.update({ link })}
        style={{ width: "100%", maxWidth: "812px", height: "555px" }}
        srcDoc={
          script +
          code.body
            .replaceAll("window.localStorage", "window.mockLocalStorage")
            .replaceAll("window.location.assing", "window.openLink")
            .replaceAll("window.open", "window.openLink")
        }
      />

      {state.link && (
        <BlurScreen>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={state.link}
            style={{ fontSize: 24, textAlign: "center" }}
            onClick={() => State.update({ link: null })}
          >
            Open {state.link.split("/")?.[2] || "link"} <br /> to export account
          </a>
        </BlurScreen>
      )}
    </Page>
  );
}

return (
  <div
    style={{
      width: 480,
      border: "1px solid #ccc",
      padding: 24,
      paddingTop: 16,
      borderRadius: 24,
      margin: "20% auto 0",
    }}
  >
    <h2 style={{ marginTop: 0 }}>Export account</h2>
    <p>
      In order to export your account to a new wallet, you need to create a new
      full access key, which, using the official secure private key transfer
      protocol, will be exported to one of the possible wallets.
    </p>
    <button class="btn btn-dark btn-lg">Create new access key</button>
  </div>
);
