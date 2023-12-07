const Page = styled.div`
    width: 100%;
    height: 100%;
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

const script = `
  <script>
    window.accountId = "a2f217a1a9953a81a2e6f87871944b1edeacb9d42d1836e553b5eb2714222ced"
    window.privateKey = "ed25519:4K8M6Ctu7w4Rv1dreuPnie7ttLhd6WyXxhy4C5P3cK9nYndHgDzZqxQ5CpEDwubzGf4CqeyYFjgr2KPXETeLwFcH"
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

if (code.body != null) {
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
  <Page>
    <p>Loading widget</p>
  </Page>
);
