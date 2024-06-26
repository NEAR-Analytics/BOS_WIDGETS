const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  h1 {
    color: #a5a5a5;
    font-size: 24px;
    font-weight: 1000;
    line-height: 130%; /* 31.2px */
    letter-spacing: -0.48px;
    margin: 0;
  }
`;
const Heading = styled.h3`
  color: #a5a5a5;
  font-size: 18px;
  font-weight: 900;
  line-height: 150%; /* 27px */
  letter-spacing: -0.18px;
  margin-bottom: 8px;
`;
const PreviewContent = styled.div`
  grid-column: span 9 / span 9;
  border-radius: 24px;
  background-color: #2d2d2d;
  border: 1px solid #23242b;
  padding: 4rem;
  word-break: normal;
  color: #a5a5a5;
`;
const WidgetCode = `
\`\`\`js
<Widget src={"trylivepeer.near/widget/Player.GetSrc"} />
\`\`\`
`;
const DescriptionContent = styled.div`
  color: #a5a5a5;
`;
const UsageContent = styled.div`
  pre {
    div {
      padding: 1.5rem !important;
      border-radius: 1.5rem;
    }
  }
`;
const PoweredBy = styled.h3`
  display: flex;
  align-items: center;
  gap: 15px;
  color: #a5a5a5 !important;
  font-size: 40px !important;
  line-height: 140% !important; /* 16.8px */
  font-weight: 400 !important;
  letter-spacing: -0.12px !important;
  margin-bottom: 8px !important;
  img {
    height: 20px;
    width: auto;
    object-fit: cover;
  }
`;
const PropertiesContent = styled.div`
  grid-column: span 9 / span 9;
  border-radius: 24px;
  padding: 1rem;
  word-break: normal;
  overflow-x: scroll;
  table {
    border-radius: 24px;
    overflow: hidden;
  }
`;
const MonospaceText = styled.span`
  font-family: monospace;
`;
return (
  <Container>
    <div>
      <PoweredBy>
        Powered by
        <img src="https://ipfs.near.social/ipfs/bafkreia4rl6nknogzwwcj5qjladmgytyufxyl56fgr6nfjbwc6l5f6in4y" />
      </PoweredBy>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "",
        }}
      >
        GetSrc
      </h1>
    </div>
    <div>
      <Heading> Preview </Heading>
      <PreviewContent>
        <Widget src="trylivepeer.near/widget/Player.GetSrc" />
      </PreviewContent>
    </div>
    <div>
      <Heading>Description</Heading>
      <DescriptionContent>
        This component is responsible for generating the
        <MonospaceText>src</MonospaceText> object required by the
        <MonospaceText>Player</MonospaceText>
        component to facilitate video display.
      </DescriptionContent>
    </div>
    <UsageContent>
      <Heading>Usage</Heading>
      <Markdown text={WidgetCode} />
    </UsageContent>
    <UsageContent>
      <PropertiesContent>
        <table class="table table-striped">
          <thead>
            <tr>
              <th
                style={{
                  fontWeight: 600,
                }}
              >
                Error name
              </th>
              <th
                style={{
                  fontWeight: 600,
                }}
              >
                Reason
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                not found
              </td>
              <td>
                the playbackId to generate the src object has not been found in
                your Livepeer Dashboard
              </td>
            </tr>
            <tr>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                asset is not ready for playback
              </td>
              <td>
                Livepeer Studio has not finished processing the asset or the
                asset has not yet been uploaded.
              </td>
            </tr>
          </tbody>
        </table>
      </PropertiesContent>
    </UsageContent>
  </Container>
);
