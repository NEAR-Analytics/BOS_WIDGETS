const resolve = (componentPath) => Object.keys(Social.getr(`sdks.near/widget`)).filter((path) => path.indexOf(componentPath) != -1) || "";

return {
  libs: {
    "eth-signer": "SDKs.EthereumSigner.Main",
    lens: {
      definitions: ["SDKs.Lens.Constants", "SDKs.Lens.Interfaces"],
      api: resolve("SDKs.Lens.API"),
      requests: resolve("SDKs.Lens.Requests"),
      utils: resolve("SDKs.Lens.Helpers"),
      queries: resolve("SDKs.Lens.Queries")
    },
    "light-client": "SDKs.LightClient",
  },
  links: {
    telegram: "@OxMattB",
  },
};
