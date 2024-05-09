const easRenderAttestation = ({ attestation }) => {
  return (
    <div className="attestation">
      <h2>Attestation Details</h2>
      <strong>UID:</strong> {attestation.uid}
      <br />
      <strong>Schema:</strong> {attestation.schema}
      <br />
      <strong>Time:</strong>{" "}
      {new Date(attestation.time * 1000).toLocaleString()}
      <br />
      <strong>Expiration Time:</strong>{" "}
      {new Date(attestation.expirationTime * 1000).toLocaleString()}
      <br />
      <strong>Revocation Time:</strong>{" "}
      {attestation.revocationTime
        ? new Date(attestation.revocationTime * 1000).toLocaleString()
        : "Not revoked"}
      <br />
      <strong>Ref UID:</strong> {attestation.refUID}
      <br />
      <strong>Recipient:</strong> {attestation.recipient}
      <br />
      <strong>Attester:</strong> {attestation.attester}
      <br />
      <strong>Revocable:</strong> {attestation.revocable ? "Yes" : "No"}
      <br />
      <strong>Data:</strong>{" "}
      {attestation.data ? attestation.data.toString("hex") : "No data"}
      <hr />
      <b>Raw JSON:</b> {JSON.stringify(attestation)}
    </div>
  );
};
return { easRenderAttestation };
