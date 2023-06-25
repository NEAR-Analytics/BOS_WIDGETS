const { sessionID } = props;

const nounFont = fetch(
  "https://fonts.googleapis.com/css2?family=Londrina+Solid:wght@100;300;400;900&display=swap"
).body;
const glyphFont = `
  @font-face {
    font-family: GraublauWeb;
    src: url("https://nouns.center/assets/nountown.otf") format("opentype");
  }
`;

const Centered = styled.div`
  padding-left: 12px;
  padding-right: 12px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-height: 400px;
`;

const Heading = styled.h1`
  display: block;
  ${glyphFont}
  color: white;
  background: blue;
  width: 100%;
  padding-top: 100px;
  padding-left: 24px;
  font-size: 96px;
  margin: 0px;
  font-family: GraublauWeb;

  span {
    position: absolute;
    bottom: 0;
    display: flex
  }
`;

const Subheading = styled.h3`
  padding: 12px;
  font-size: 20px;
  margin-top: 20px;
`;

const GrayText = styled.p`
  font-size: 16px;
  color: gray;
`;

const BlackText = styled.p`
  font-size:16px;
  color: black;
`;

const Town = styled.b`
  ${glyphFont}
  font-family: 'GraublauWeb';
`;

const Glyph = styled.b`
  ${nounFont}
  font-size: 23px;
  font-family: 'Londrina Solid', sans-serif;
`;

const Hidden = styled.div`
    height: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
`;

const numRetries = Storage.get("nounkzg_retries") ?? 0;
if (!state?.contributions) {
  function updateRetries() {
    Storage.set("nounkzg_retries", numRetries + 1);
  }

  function tryContribute() {
    asyncFetch("https://seq.ceremony.ethereum.org/lobby/try_contribute", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionID}`,
      },
    }).then((res) => {
      console.log(res);
      res?.body?.contributions &&
        State.update({
          contributions: resp.body.contributions,
        });
    });
  }
  tryContribute();
  setTimeout(updateRetries, 30000);
}

state?.sessionID &&
  state?.finishedContribution &&
  asyncFetch("https://seq.ceremony.ethereum.org/lobby/contribute", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionID}`,
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(state.finishedContribution),
  }).then((res) => {
    console.log(res);
    State.update({
      finished: true,
    });
  });

const entropy = props?.entropy ?? "a totally random value";

return (
  <>
    <Hidden>
      <iframe
        srcDoc={code}
        message={{
          stage: state?.stage,
          data:
            state?.stage === "calculating"
              ? {
                  contributions: state.contributions,
                  entropy,
                }
              : null,
        }}
        onMessage={(val) =>
          State.update({
            finishedContribution: val,
          })
        }
      />
    </Hidden>
    <Heading>
      {state?.finished ? "Congrats" : "Lobby"}
      <span>
        <img
          src={"https://api.cloudnouns.com/v1/pfp?background=n&size=100&text=l"}
        />
        <img
          src={"https://api.cloudnouns.com/v1/pfp?background=n&size=100&text=O"}
        />
        <img
          src={"https://api.cloudnouns.com/v1/pfp?background=n&size=100&text=b"}
        />
      </span>
    </Heading>
    <Centered>
      {state?.finished && (
        <>
          <Subheading>Congrats!</Subheading>
          <GrayText>
            Your message and Noun have been contributed to the KZG summoning
            ceremony.
          </GrayText>
        </>
      )}

      {!state?.contributions && (
        <>
          <Subheading>Waiting for your turn...</Subheading>
          <GrayText>
            KZG commitments must be combined one at a time - you may need to
            wait a while, depending on how many people are in the lobby.
          </GrayText>
          <GrayText>
            Retried <b>{numRetries}</b> times.
          </GrayText>
        </>
      )}

      {!state?.finished && state?.contributions && (
        <>
          <Subheading>Cleaning the Prop House...</Subheading>
          <BlackText>
            This tab is hard at work mapping your <Glyph>Noun</Glyph> onto a
            pairing-friendly elliptic curve, so <b>don't</b> close it!
            <br />
            <br />
            <GrayText>
              Why don't you{" "}
              <a
                href="https://ethereum.org/en/roadmap/danksharding"
                target="_blank"
              >
                read about KZG in the meantime?
              </a>
            </GrayText>
          </BlackText>
        </>
      )}
    </Centered>
  </>
);
