const accountId = "gotvbot.near";
if (!accountId) {
  return "No account ID";
}
const isBeta = props.beta === undefined ? true : props.beta;
return (
  <Widget
    src="near/widget/Explorer.Iframe"
    props={{
      url: `${isBeta ? "beta/" : ""}accounts/${accountId}`,
      query: { language: props.language, embedded: true },
      network: "mainnet",
      baseUrl: props.baseUrl,
    }}
  />
);
