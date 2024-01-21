const $ = VM.require("sdks.near/widget/Loader");
const { ExternalDependencyAdapter } = $("@sdks/abstracts");

return (Store, status) => {
  const Blockies = {
    ...ExternalDependencyAdapter(Store, status, "ethereum-blockies-base64"),
    package: "ethereum-blockies-base64",
    create: (config) => {
      return Blockies.request(
        Blockies.createRequest("create", [config], "canvas")
      );
    },
  };

  return Blockies;
};
