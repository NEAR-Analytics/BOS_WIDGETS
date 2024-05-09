const { easRenderAttestation } = VM.require(
  "flowscience.near/widget/easRenderAttestation"
);

const App = () => {
  const attestation = {
    uid: props.uid,
    schema: props.schema,
    time: props.timestamp, // Example Unix timestamp = 1633036800
    expirationTime: props.expiration, // Example Unix timestamp
    revocationTime: props.revocation, // 0 indicates not revoked
    refUID: props.refUID,
    recipient: props.recipient, // Blockchain account, if self = {context.accountId}
    attester: props.attester, // Blockchain account, if self = {context.accountId}
    revocable: props.revocable, // Boolean
    data: props.data, // Example hex data = "0xdeadbeef"
  };
};

//export default App;

return (
  <div className="App">
    <easRenderAttestation attestation={attestation} />
  </div>
);
