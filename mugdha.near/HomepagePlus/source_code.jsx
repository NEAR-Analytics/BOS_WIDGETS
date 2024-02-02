const accountId = props.accountId ?? context.accountId;

const homepage = accountId
  ? Social.get(`${accountId}/settings/near.social/homepage`)
  : undefined;

if (homepage === null) {
  return "Loading";
}

const markdown = ` ## SocialTeen`;

return (
  <div style={{ display: "flex", flexDirection: "row" }}>
    {/* Main content area for the feed */}
    <div style={{ flex: 1 }}>
      <Markdown text={markdown} />
      <Widget src="mugdha.near/widget/Feed" props={props} />
    </div>

    {/* Right sidebar for the Welcome widget */}
    <div style={{ width: "300px", paddingLeft: "20px" }}>
      {" "}
      {/* Adjust width and padding as needed */}
      <Widget src="create.near/widget/Followers" props={props} />
    </div>
  </div>
);
