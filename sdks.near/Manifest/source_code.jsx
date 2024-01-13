return {
  libs: {
    "eth-signer": "SDKs.EthereumSigner.Main",
    lens: {
      definitions: ["SDKs.Lens.Constants", "SDKs.Lens.Interfaces"],
      api: ["SDKs.Lens.API.AuthAPI", "SDKs.Lens.API.HealthAPI"],
      utils: ["SDKs.Lens.Helpers.ApiHelper"],
      queries: ["SDKs.Lens.Queries.Auth", "SDKs.Lens.Queries.Health"],
      sdk: ["SDKs.Lens.Main"],
    },
    "light-client": "SDKs.LightClient",
  },
  links: {
    telegram: "@OxMattB",
  },
};
