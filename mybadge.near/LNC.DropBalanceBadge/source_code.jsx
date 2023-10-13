const drop = Near.view("betatest.learnclub.near", "get_caller_drop", {
  account_id: props.accountId,
});

return (
  <Widget
    src="mybadge.near/widget/Generic.DetailedBadge"
    props={{
      primaryText: "(L)Earner",
      secondaryText: typeof drop === "number" ? `${drop / 1e24} NEAR` : null,
      iconSrc: "mybadge.near/widget/LNC.LogoIcon",
      color: "orange",
    }}
  />
);
