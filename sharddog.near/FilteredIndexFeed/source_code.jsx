const filter = context.accountId && {
  ignore: Social.getr(`${context.accountId}/graph/hide`),
};

return (
  <Widget src="sharddog.near/widget/IndexFeed" props={{ filter, ...props }} />
);
