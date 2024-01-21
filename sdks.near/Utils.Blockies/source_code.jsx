const $ = VM.require("sdks.near/widget/Loader");
const { ExternalDependencyAdapter } = $("@sdks/abstracts");

return (Store, status) => {
  const Blockies = {
    ...ExternalDependencyAdapter(Store, status, "blockies"),
    package: "ethereum-blockies@0.1.1/blockies.js",
    create: (config) => {
      return Blockies.request(
        Blockies.createRequest("create", [config], "canvas")
      );
    },
  };

  return Blockies;
};
