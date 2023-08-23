const { accountId } = props;

if (!accountId) {
  return <div>Connect your Wallet</div>;
}

const purchases = accountId
  ? Near.view(
      "app.paywall.near",
      "purchases",
      {
        account_id: accountId,
      },
      "final",
      true
    )
  : false;

const Wrapper = styled.div``;

if (purchases === null) {
  return <div>Loading...</div>
}

return (
  <Wrapper>
    {purchases.map((contentId) => (
      <div key={contentId}>{contentId}</div>
    ))}
  </Wrapper>
);
