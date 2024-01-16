const filter = context.accountId && {
  ignore: Social.getr(`${context.accountId}/graph/hide`),
};

return (
  <Widget
    loading={props.loading}
    src="nearbuilders.testnet/widget/PR.IndexFeed"
    props={{ filter, ...props }}
  />
);