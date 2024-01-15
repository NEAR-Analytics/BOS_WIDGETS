const $ = VM.require("sdks.near/widget/Loader");
const { ExternalDependency } = $("@sdks/abstracts");

return (props) => (
  <ExternalDependency
    package="crypto-js"
    name="CryptoJS"
    onCreate={props.onCreate}
  />
);
