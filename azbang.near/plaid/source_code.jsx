const PLAID_API = "http://localhost:3000";
State.init({
  origin: null,
  selected: null,
  accessToken: "access-sandbox-ba9ee489-90fd-4b20-be28-96f9828cc5da",
});

const AppContainer = styled.div`
  width: 400px;
  margin: auto;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Transaction = styled.div`
  padding: 16px;
  border-radius: 12px;
  margin: 0 12px 12px;
  border: 1px solid #ccc;
  position: relative;
  cursor: pointer;
  transition: 0.2s box-shadow;
  p { margin: 0; }

  &:hover {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  }
`;

const Checkbox = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;

  display: block;
  border: 2px solid var(--bs-body-bg, #fff); 
  box-shadow: 0 0 0 4px #255ff4;
  transition: 0.2s background-color;
  background-color: transparent;
  border-radius: 50%;
  width: 16px;
  height: 16px;

  &.active {
    background-color: #255ff4;
  }

`;

const VerifyButton = styled.button`
  color: #fff;
  font-size: 16px;
  display: flex;
  flex-direction: center;
  align-items: center;
  background-color: #255ff4;
  position: absolute;
  bottom: 0;
  padding: 16px;
  width: 250px;
  border-radius: 32px;
  border: none;
  left: 50%;
  margin-left: -125px;
  text-align: center;
  font-weight: bold;
  transition: 0.2s background-color;
  &:hover {
    color: #fff;
    text-decoration: none;
    background-color: rgb(107 148 255);
  }
`;

const accessToken = state.accessToken || Storage.privateGet("plaidAccessToken");
if (accessToken === null) return null;

console.log({ accessToken });

if (accessToken) {
  const response = fetch(`${PLAID_API}/transactions?token=${accessToken}`);
  if (!response.ok) return null;

  const handleVerify = () => {
    const tx = response.body.added.find(
      (t) => t.transaction_id === state.selected
    );

    const signer = Ethers.provider().getSigner();
    const signedMessage = "Verify transactin";
    const promises = Promise.all([
      signer.getAddress(),
      signer.signMessage(signedMessage),
    ]);

    promises.then(([address, signed]) => {
      console.log([address, signed]);
      State.update({
        iframe: {
          type: "verify",
          date: tx.date,
          access_token: state.accessToken,
          transaction_id: tx.transaction_id,
          signedMessage,
          address,
          signed,
        },
      });
    });
  };

  const iframeSrc = `
    <script>
        let litNodeClient;
        fetch("https://cdn.jsdelivr.net/npm/@lit-protocol/lit-node-client-vanilla/lit-node-client.js").then(res => res.text()).then(code => {
            const script = document.createElement('script');
            eval(code.replaceAll("window.localStorage", "window.MockLocalStorage").replace("var LitJsSdk_litNodeClient", "window.LitJsSdk_litNodeClient"))

            setTimeout(() => {
                const sdk = window.LitJsSdk_litNodeClient
                console.log(window.LitJsSdk_litNodeClient)
                litNodeClient = new sdk.LitNodeClientNodeJs({
                    alertWhenUnauthorized: false,
                    litNetwork: "serrano",
                    debug: true,
                });
            }, 1000);
        })

        window.addEventListener("message", async ({ data }) => {
            if (data?.type !== "verify") return;
            const { date, address, signedMessage, signed, access_token, transaction_id } = data;
            
            const pkpPubKey = "0x04f80a948f038f5d69855268f749457d5b465b78fd7bf603de13bd4bf01d718175bf512c828414e227a8289e7512b331658394c4d37a34aec3eca9c585056b7180";
            await litNodeClient.connect();

            const {signatures, response, logs} = await litNodeClient.executeJs({
                ipfsId: "QmQ9UdaF3XCesLJSDuE8THi769VXUHPm5erYcjmedsQ4br",
                authSig: {
                    sig: signed,
                    derivedVia: "web3.eth.personal.sign",
                    signedMessage: signedMessage,
                    address: address,
                },
                jsParams: {
                    chain: "ethereum",
                    publicKey: pkpPubKey,
                    sigName: "sig1",
                    access_token,
                    transaction_id,
                    start_date: date,
                    end_date: date
                },
            });

            console.log(response);
            console.log(signatures);
            console.log(logs);
            return
        }, false);

        const init = () => {
       


        }
    </script>  
  `;

  const appStyle = { marginTop: 48, paddingBottom: 24, position: "relative" };
  return (
    <div>
      <iframe
        srcDoc={iframeSrc}
        message={state.iframe}
        style={{ display: "none" }}
      ></iframe>
      <AppContainer style={appStyle}>
        <h4 style={{ fontWeight: "bold" }}>Plaid x Blockhain</h4>
        <p>Select payment to verify it on-chain:</p>
        <AppContainer style={{ height: 500 }}>
          {response.body?.added.map((tx) => (
            <Transaction
              key={tx.transaction_id}
              onClick={() => State.update({ selected: tx.transaction_id })}
            >
              <p style={{ fontWeight: "bold" }}>{tx.name}</p>
              <p>
                {tx.amount} {tx.iso_currency_code}
              </p>
              <Checkbox
                key={tx.transaction_id}
                onClick={() => State.update({ selected: tx.transaction_id })}
                className={state.selected === tx.transaction_id && "active"}
              />
            </Transaction>
          ))}
        </AppContainer>
        <VerifyButton onClick={() => handleVerify()}>
          <div style={{ margin: "auto" }}>Verify transaction</div>
        </VerifyButton>
      </AppContainer>
    </div>
  );
}

// Connecting bank
if (props.public_token) {
  const response = fetch(`${PLAID_API}/exchange-public-token`, {
    body: JSON.stringify({ public_token: props.public_token }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  if (response?.ok) {
    Storage.privateSet("plaidAccessToken", response.body.access_token);
    State.update({ accessToken: response.body.access_token });
    return null;
  }
}

const location = `${state.origin}/${context.widgetSrc}`;
const src = `
<script>
const origin = document.location.ancestorOrigins[0];
window.top.postMessage(origin, "*")
</script>
`;

return (
  <div style={{ marginTop: 48, background: "#fff" }}>
    <a href={`${PLAID_API}?return_url=${location}`}>
      <VerifyButton style={{ position: "initial", margin: "auto" }}>
        <span style={{ margin: "auto" }}>Connect bank</span>
      </VerifyButton>
    </a>

    <iframe
      style={{ display: "none" }}
      onMessage={(origin) => State.update({ origin })}
      srcDoc={src}
    ></iframe>
  </div>
);
