// These functions use content of an EAS attestation or schema to generate a UID
// Assuming `Attestation` and `SchemaRecord` are defined in your React code
// with the same structure as in your Solidity code

function getAttestationUID(attestation, bump) {
  const hash = ethers.utils.keccak256(
    ethers.utils.solidityPack(
      [
        "bytes32",
        "address",
        "address",
        "uint256",
        "uint256",
        "bool",
        "bytes32",
        "bytes",
        "uint32",
      ],
      [
        attestation.schema,
        attestation.recipient,
        attestation.attester,
        attestation.time,
        attestation.expirationTime,
        attestation.revocable,
        attestation.refUID,
        attestation.data,
        bump,
      ]
    )
  );
  return hash;
}

function getSchemaUID(schemaRecord) {
  const hash = ethers.utils.keccak256(
    ethers.utils.solidityPack(
      ["bytes32", "address", "bool"],
      [schemaRecord.schema, schemaRecord.resolver, schemaRecord.revocable]
    )
  );
  return hash;
}

return { getAttestationUID, getSchemaUID };
