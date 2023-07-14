const accountId = props.accountId ?? "ndcplug.near";

// IAH Verification
const getFirstSBTToken = () => {
  const view = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
    account: accountId,
    issuer: "fractal.i-am-human.near",
  });
  return view?.[0]?.[1]?.[0];
};

const human = getFirstSBTToken(state.accountId) !== undefined;

return <>{human && <span>✅</span>}</>;
