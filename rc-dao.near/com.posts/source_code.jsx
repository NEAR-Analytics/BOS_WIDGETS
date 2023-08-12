const accountId = props.accountId ?? "rc-dao.near";

return (
  <>
    <Widget src="near/widget/Posts.Feed" props={{ accounts: [accountId] }} />
  </>
);
