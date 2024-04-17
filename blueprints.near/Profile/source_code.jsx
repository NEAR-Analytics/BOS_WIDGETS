const accountId = props.accountId ?? context.accountId;
const profileLayout = Social.getr(`${accountId}/profile`).profileLayout;
return profileLayout === "pixel" ? (
  <Widget src="blueprints.near/widget/Profile.Pixel" props={props} />
) : (
  <Widget src="blueprints.near/widget/Profile.Modern" props={props} />
);
