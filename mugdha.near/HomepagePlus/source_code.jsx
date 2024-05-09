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
    <div style={{ flex: 1 }}>
      <Markdown text={markdown} />
      <Widget src="mugdha.near/widget/Feed" props={props} />
    </div>

    <div style={{ width: "300px", paddingLeft: "20px" }}>
      {" "}
      <Widget src="create.near/widget/Followers" props={props} />
    </div>
  </div>
);
