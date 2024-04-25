// Configure provider and signer outside the exported functions if they do not depend on dynamic user input
const provider = new ethers.providers.JsonRpcProvider(
  "https://optimism.drpc.org"
);

function getSchema(contractAddress, abi, uid) {
  if (!uid.trim()) return Promise.reject("UID must be provided.");

  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  return contract
    .getSchema(uid) // Ensure this method is correctly named and implemented in the contract
    .then((schemaData) => {
      if (!schemaData) throw new Error("Schema data not found");
      return { schema: schemaData, error: null };
    })
    .catch((err) => {
      console.error("Error fetching schema:", err);
      return { error: "Failed to retrieve schema." };
    });
}

function fetchABI() {
  return fetch(
    "https://raw.githubusercontent.com/ethereum-attestation-service/eas-contracts/939c0fb110ea35e601e4476e81a4f83a6029f7ad/deployments/optimism/SchemaRegistry.json"
  )
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      if (!data.abi) throw new Error("ABI data is not available");
      return data.abi;
    })
    .catch((error) => {
      console.error("Failed to load ABI:", error);
      throw error; // Rethrow or handle as needed
    });
}

// Export the functions
return { getSchema, fetchABI };
