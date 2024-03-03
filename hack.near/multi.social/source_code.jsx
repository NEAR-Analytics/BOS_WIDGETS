const identity = Social.getr("*/identity/*", "final");

if (!identity) {
  return "";
}

const accounts = Object.keys(identity);

return (
  <>
    <p>{JSON.stringify(identity)}</p>
    <p>{JSON.stringify(accounts)}</p>
    <Widget
      src="efiz.near/widget/SocialGraph"
      props={{ accountIds: accounts }}
    />
  </>
);
