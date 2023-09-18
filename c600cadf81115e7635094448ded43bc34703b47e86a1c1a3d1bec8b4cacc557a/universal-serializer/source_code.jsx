const onChange = ({ target }) => {
  State.update({ json: target.value });
};

const onHandleNear = () => {
  State.update({ result: "" });
  const json = `{
    "id": 0,
    "jsonrpc": "2.0",
    "method": "dapp:serializeTransaction",
    "params": [
      {
          "network": "near:test",
          "from": {
              "address": "**YOUR ACCOUNT**",
              "publicKey": "**YOUR ACCESSKEY**"
          },
          "to": "dsrv-kms.testnet",
          "txs": [
              {
                  "method": "functionCall",
                  "params": [
                    "increment",
                                  {},
                    "30000000000000",
                                  "0"
                  ]
              }
          ]
      }
    ]
  }`;
  State.update({ json });
};

const onHandleEthereum = () => {
  State.update({ result: "" });
  const json = `{
    "id": 0,
    "jsonrpc": "2.0",
    "method": "dapp:serializeTransaction",
    "params": [
      {
          "network": "sui:test",
          "from": {
              "address": "**YOUR ADDRESS**"
          },
          "txs": [
              {
                  "method": "functionCall",
                  "params": [
                      {
                          "type": "moveCall",
                          "args": [
                              "**PACKAGE ADDRESS**::**MODULE**::**FUNCTION**",
                              [0]
                          ]
                      }
                  ]
              }
          ]
      }
    ]
  }`;
  State.update({ json });
};

const onHandleSui = () => {
  State.update({ result: "" });
  const json = `{
    "id": 0,
    "jsonrpc": "2.0",
    "method": "dapp:serializeTransaction",
    "params": [
      {
          "network": "ethereum:0x5",
          "from": {
              "address": "**YOUR ADDRESS**"
          },
          "to": "**ANY ADDRESS**",
          "txs": [
              {
                  "method": "transfer",
                  "params": [
                    "1"
                  ]
              },
              {
                  "method": "functionCall",
                  "params": [
                    [ "uint", "string" ], [ 1234, "Hello World" ]
                  ]
              }
          ]
      }
    ]
  }`;
  State.update({ json });
};

const onHandleRun = () => {
  asyncFetch("https://api.welldonestudio.io/universal-tx-serializer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(JSON.parse(state.json)),
  })
    .then((res) => {
      State.update({ result: res.body.result.serializedTx });
    })
    .catch(() => {
      State.update({ result: "errors" });
    });
};

return (
  <>
    <div class="container">
      <p>
        <b> Input Tx Info (JSON): </b>
      </p>
      <textarea value={state.json} rows="15" cols="50" onChange={onChange} />
      <br />
      <div>
        <p>
          <b> Examples: </b>
        </p>
        <button onClick={onHandleNear}>Near (JSON)</button>
        <button onClick={onHandleSui}>Ethereum (JSON)</button>
        <button onClick={onHandleEthereum}>Sui (JSON)</button>
      </div>
      <br />
      <button onClick={onHandleRun}>Run</button>
      <p>
        <b> Serialized Tx: </b> {state.result}{" "}
      </p>
    </div>
  </>
);
