return {
  libs: {
    "eth-signer": "SDKs.EthereumSigner.Main",
    lens: {
      definitions: ["SDKs.Lens.Constants", "SDKs.Lens.Interfaces"],
      api: ["SDKs.Lens.API.Auth"],
      commons: ["SDKs.Lens.Main"],
    },
    "light-client": "SDKs.LightClient"
  },
};
