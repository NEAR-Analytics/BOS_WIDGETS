const Home = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    gap: 100px;
    margin-bottom: 100px;
`;

return (
  <Home>
    <Widget src="segunojo1.near/widget/LinkETHAccountsToNearAccount.Navbar" />
    <Widget
      props={connectSectionActivee}
      src="mitchyugan.near/widget/LinkETHAccountsToNearAccount.LandingPage"
    />
    {item.accountId == accountId ? (
      <Widget src="mitchyugan.near/widget/LinkETHAccountsToNearAccount.ConnectedAccount" />
    ) : (
      <div></div>
    )}
  </Home>
);
