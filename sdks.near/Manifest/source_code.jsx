let availableComponents = Object.keys(Social.getr(`sdks.near/widget`));

const resolve = (componentPath) =>
  availableComponents.filter((path) => path.indexOf(componentPath) != -1) || [];

return {
  libs: {
    "eth-signer": "SDKs.EthereumSigner",
    lens: {
      definitions: ["SDKs.Lens.Constants", "SDKs.Lens.Interfaces"],
      api: resolve("SDKs.Lens.API"),
      requests: resolve("SDKs.Lens.Requests"),
      utils: resolve("SDKs.Lens.Helpers"),
      queries: resolve("SDKs.Lens.Queries"),
    },
    "lens-sdk": "SDKs.Lens.LensSDK",
    "light-client": "SDKs.LightClient",
    verifiers: resolve("SDKs.Verifiers"),
    "eth-utils": [...resolve("Utils.Ethereum"), "SDKs.EthereumSigner"],
    "near-utils": resolve("Utils.Near"),
    "near-fs": "Utils.NearFS",
    "ens-resolver": "Utils.Ethereum.ENSResolver",
    utils: resolve("Utils."),
    abstracts: resolve("Abstracts."),
    "crypto-js": ["SDKs.Abstracts.ExternalDependency", "Utils.CryptoJS"],
    blockies: ["SDKs.Abstracts.ExternalDependency", "Utils.Blockies"],
  },
  links: {
    telegram: "@OxMattB",
    twitter: "@0xMattB",
    near: "@mattb.near",
  },
};
