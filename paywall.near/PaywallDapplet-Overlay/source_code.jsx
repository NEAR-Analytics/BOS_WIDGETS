/**
 * We use payerAccountId instead of accountId because it's reserved parameter in embeded pages
 * https://github.com/near/near-discovery/blob/dc58aa1c8ef5d4c0a5e19839230148009834088a/src/pages/embed/%5BaccountId%5D/widget/%5BcomponentName%5D.tsx#L16
 */
const { payerAccountId } = props;

if (!payerAccountId) {
  return <div>Connect your Wallet</div>;
}

const purchases = payerAccountId
  ? Near.view(
      "app.paywall.near",
      "purchases",
      {
        account_id: payerAccountId,
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
