/**
 * We use buyerAccountId instead of accountId because it's reserved parameter in embeded pages
 * https://github.com/near/near-discovery/blob/dc58aa1c8ef5d4c0a5e19839230148009834088a/src/pages/embed/%5BaccountId%5D/widget/%5BcomponentName%5D.tsx#L16
 */
const { buyerAccountId } = props;

const Wrapper = styled.div`
  html,
  body {
    background: #f5f5f5 !important;
  }

  .main-container {
    padding: 15px;
    background: #f5f5f5;

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif;
  }

  .top-description {
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    margin-bottom: 10px;
    color: #747376;
  }

  .content-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 10px;
    gap: 10px;
    align-self: stretch;
    border-radius: 10px;
    border: 1px solid #e3e3e3;
  }

  .content-card {
    background-color: #fff;
    border-radius: 4px;
    padding: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .content-container-id {
    color: #919191;
    font-size: 12px;
  }
`;

if (!buyerAccountId) {
  return (
    <Wrapper>
      <div className="main-container">
        <div className="top-description">Connect your wallet</div>
      </div>
    </Wrapper>
  );
}

const purchases = buyerAccountId
  ? Near.view(
      "app.paywall.near",
      "purchases",
      {
        account_id: buyerAccountId,
      },
      "final",
      true
    )
  : false;

if (purchases === null) {
  return (
    <Wrapper>
      <div className="main-container"></div>
    </Wrapper>
  );
}

return (
  <Wrapper>
    <div className="main-container">
      <div className="top-description">
        The Paywall Dapplet seamlessly integrates with Twitter, utilizing the
        NEAR Protocol and NEAR BOS to display paid content, a solution developed
        during the Web3 Hackfest 2023 hackathon.
      </div>
      <div className="content-container">
        {purchases.map((contentId) => (
          <div className="content-card">
            <Widget
              key={contentId}
              src={`paywall.near/widget/PaywallDapplet-Content`}
              props={{
                accountId: buyerAccountId,
                contentId: contentId,
                basic: true,
              }}
            />
            <div className="content-container-id">id: {contentId}</div>
          </div>
        ))}
      </div>
    </div>
  </Wrapper>
);
