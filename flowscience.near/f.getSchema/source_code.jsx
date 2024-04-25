// Configure provider and signer outside the exported functions if they do not depend on dynamic user input
const provider = new ethers.providers.JsonRpcProvider(
  "https://optimism.drpc.org"
);

function getSchema(contractAddress, abi, uid) {
  if (!uid.trim()) {
    console.error("UID must be a non-empty string.");
    return Promise.resolve({ error: "UID must be provided." });
  }

  const signer = provider.getSigner(); // Assuming this will dynamically resolve the signer
  const contract = new ethers.Contract(contractAddress, abi, signer);

  return contract
    .getSchema(uid)
    .then(([uid, resolver, revocable, schemaData]) => {
      return {
        schema: {
          uid,
          resolver,
          revocable,
          schema: schemaData,
        },
        error: null,
      };
    })
    .catch((err) => {
      console.error("Error fetching schema:", err);
      return {
        error: "Failed to retrieve data. Please try with a verified uid.",
      };
    });
}

function fetchABI() {
  return fetch(
    "https://raw.githubusercontent.com/ethereum-attestation-service/eas-contracts/939c0fb110ea35e601e4476e81a4f83a6029f7ad/deployments/optimism/SchemaRegistry.json"
  )
    .then((response) => response.json())
    .then((data) => data.abi)
    .catch((err) => {
      console.error("Error fetching ABI:", err);
      return null;
    });
}

// Export the functions
return { getSchema, fetchABI };
