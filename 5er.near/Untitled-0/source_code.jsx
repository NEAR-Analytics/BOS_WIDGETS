const Root = styled.div`
  --gap-size: 2rem;
  --purple-100: #e2d9f3;
  --purple-300: #a98eda;
`;

const Page = styled.div`
  position: relative;
  margin: 0;
  padding: var(--gap-size);
`;

const Column = styled.div`
  display: flex;
  flex-flow: column;
  gap: var(--gap-size);
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row;
  gap: var(--gap-size);
`;
const Card = styled.div`
  flex: 1;
  max-width: 80%;
  min-width: 40%;
  padding: var(--gap-size);
  border-radius: var(--gap-size);
  background-color: var(--purple-300);
`;

const Title = styled.h1`
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  margin: 0;
  color: #fff;
`;

const Banner = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  margin: 0;
  padding: var(--gap-size);
  color: var(--purple-300);
`;

const Spinning = styled.div`
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

State.init({
  showCustomProverURLInput: false,
  proverURL: "http://localhost:3000",
  credentials: null,
  credentialsFile: null,
  waitingProve: false,
  waitingBefriend: false,
  result: null,
});

const DEFAULT_SCRIPT = 'credentials[0]["age"] >= 18;';
const SWEET_CREDS_CONTRACT_ADDRESS = "";
const REGISTRY_CONTRACT_ADDRESS = "dev-1699471202521-43971993724293";
const USED_SCHEMATA = [["lennczar.testnet", 0]];

async function prove(url, credentials, script) {
  return new Promise((resolve) => {
    if (state.waitingProve) return resolve(null);

    console.log("PROVE", JSON.stringify(credentials));

    State.update({ waitingProve: true });

    const taskId = asyncFetch(`${url}/holder/genproof`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credentials: [JSON.stringify(credentials)],
        script: script,
      }),
      method: "POST",
    }).then((res) => {
      console.log(res.body);
      if (res.body == -1) {
        console.error("prover busy");
        State.update({ waitingProve: false });
        return resolve(null);
      }

      console.log("prover not busy");

      let interval = setInterval(() => {
        asyncFetch(`${url}/holder/getproof/${res.body}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        }).then((res) => {
          if (res.body.proof === "") {
            console.log("waiting for proof...");
          } else {
            State.update({ result: res.body, waitingProve: false });
            console.log(res.body);
            clearInterval(interval);
            resolve(res.body);
          }
        });
      }, 5000);
    });
  });
}

async function befriend(rpAddress, usedSchemata) {
  if (state.waitingProve || state.waitingBefriend) return;

  console.log("BEFRIEND", JSON.stringify(credentials));

  State.update({ waitingBefriend: true });

  const promise = prove(state.proverURL, state.credentials, DEFAULT_SCRIPT);

  console.log("BEFRIEND promise", promise);

  promise.then((result) => {
    if (!result) {
      console.error("failed to get proof");
      State.update({ waitingBefriend: false });
      return;
    }

    // cred_call(rpAddress, results.proof, usedSchemata)
    Near.call(REGISTRY_CONTRACT_ADDRESS, "cred_call", {
      receiver: rpAddress,
      proof: result.proof,
      used_schemata: usedSchemata,
    }).then((receipt) => {
      console.log(receipt);
      State.update({ waitingBefriend: false });
    });
  });
}

return (
  <Root>
    <Page>
      <Column>
        <Banner>🍬🍬 Sweet Creds 🍬🍬</Banner>
        <Card>
          <Column>
            <Title>Verify Your Creds!</Title>
            <Files
              multiple
              accepts={["application/json"]}
              minFileSize={1}
              clickable
              className="btn btn-outline-light"
              onChange={(f) =>
                f[0].text().then((text) =>
                  State.update({
                    credentials: JSON.parse(text),
                    credentialsFile: f[0],
                  })
                )
              }
            >
              {state.credentialsFile == null
                ? "Upload File"
                : `Uploaded (${state.credentialsFile.name})`}
            </Files>
            <Row>
              <button
                className="btn btn-outline-light"
                onClick={(e) =>
                  !state.waitingBefriend &&
                  prove(state.proverURL, state.credentials, DEFAULT_SCRIPT)
                }
              >
                {state.waitingProve ? <Spinning>🍬</Spinning> : "SEND"}
              </button>
              <button
                className="btn btn-outline-light"
                onClick={(e) =>
                  befriend(SWEET_CREDS_CONTRACT_ADDRESS, USED_SCHEMATA)
                }
              >
                {state.waitingBefriend ? (
                  <Spinning>🍬</Spinning>
                ) : (
                  "BECOME OUR FRIEND"
                )}
              </button>
            </Row>
          </Column>
        </Card>
        {state.result !== null && (
          <Card>
            <Column>
              <Title>Your Proof</Title>
              <div style={{ width: "100%" }}>
                <p>Verdict</p>
                <b
                  style={{
                    width: "100%",
                    textAlign: "center",
                    display: "block",
                  }}
                >
                  {state.result.journal.result ? "true" : "false"}
                </b>
              </div>
              {state.result.journal.error_msg !== "" && (
                <div>
                  <p>Error Message</p>
                  <pre
                    style={{
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap",
                      width: "20rem",
                      height: "4rem",
                    }}
                  >
                    {state.result.journal.error_msg}
                  </pre>
                </div>
              )}
              <div>
                <p>Raw Proof</p>
                <pre
                  style={{
                    wordBreak: "break-all",
                    whiteSpace: "pre-wrap",
                    width: "20rem",
                    height: "10rem",
                  }}
                >
                  {state.result.proof}
                </pre>
              </div>
            </Column>
          </Card>
        )}
        <Card style={{ backgroundColor: "var(--purple-100)" }}>
          <Column>
            <input
              type="checkbox"
              className="btn-check"
              id="customProverURL"
              onChange={(e) =>
                State.update({
                  showCustomProverURLInput: !state.showCustomProverURLInput,
                })
              }
            />
            <label class="btn btn-outline-light btn-sm" for="customProverURL">
              {state.showCustomProverURLInput
                ? "close advanced options"
                : "open advanced options"}
            </label>
            {state.showCustomProverURLInput && (
              <input
                type="text"
                class="form-control"
                value={state.proverURL}
                onChange={(e) =>
                  State.update({
                    proverURL: e.target.value,
                  })
                }
              />
            )}
          </Column>
        </Card>
      </Column>
    </Page>
  </Root>
);
