const accountId = context.accountId;

const homepage = Social.get(`${accountId}/settings/discover.bos/homepage`);

if (homepage === null) {
  return "loading...";
}

State.init({
  homepage: homepage ?? "devs.near/widget/Home",
});

return <Widget src={state.homepage} />;
