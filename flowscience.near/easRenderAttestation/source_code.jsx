const easRenderAttestation = ({ attestation }) => {
  return (
    <div className="attestation">
      <h2>Attestation Details</h2>
      <p>
        <strong>UID:</strong> {attestation.uid}
      </p>
      <p>
        <strong>Schema:</strong> {attestation.schema}
      </p>
      <p>
        <strong>Time:</strong>{" "}
        {new Date(attestation.time * 1000).toLocaleString()}
      </p>
      <p>
        <strong>Expiration Time:</strong>{" "}
        {new Date(attestation.expirationTime * 1000).toLocaleString()}
      </p>
      <p>
        <strong>Revocation Time:</strong>{" "}
        {attestation.revocationTime
          ? new Date(attestation.revocationTime * 1000).toLocaleString()
          : "Not revoked"}
      </p>
      <p>
        <strong>Ref UID:</strong> {attestation.refUID}
      </p>
      <p>
        <strong>Recipient:</strong> {attestation.recipient}
      </p>
      <p>
        <strong>Attester:</strong> {attestation.attester}
      </p>
      <p>
        <strong>Revocable:</strong> {attestation.revocable ? "Yes" : "No"}
      </p>
      <p>
        <strong>Data:</strong>{" "}
        {attestation.data ? attestation.data.toString("hex") : "No data"}
      </p>
    </div>
  );
};

//export default easRenderAttestation;

return { easRenderAttestation };
