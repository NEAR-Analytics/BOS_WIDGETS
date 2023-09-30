State.init({
  contractAddress: "",
  rpcUrl: "https://rpc.near.org/", //https://rpc.testnet.near.org
  archivalRpc: "https://archival-rpc.mainnet.near.org", //https://archival-rpc.testnet.near.org
  nearBlockRpc: "https://api.nearblocks.io/", // https://api-testnet.nearblocks.io
  contractAbi: {
    schema_version: "0.3.0",
    metadata: {
      name: "",
      version: "1.0.0",
      authors: [],
      build: {
        compiler: "",
        builder: "",
      },
    },
    body: {
      functions: [],
    },
  },
  functionsName,
  functionsAction: "view",
  contractAbiCall: [],
  contractAbiView: [],
  contractAbiArg,
  createMethodError,
  response,
  createArgError,
  checkMethodExport: [],
  commitLoading: false,
});
