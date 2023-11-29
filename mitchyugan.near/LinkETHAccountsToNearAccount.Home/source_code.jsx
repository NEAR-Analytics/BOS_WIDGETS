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
    {/* <p>Text{connectSectionActivee}</p> */}
    <Widget src="segunojo1.near/widget/LinkETHAccountsToNearAccount.ConnectWallet" />
    <Widget src="mitchyugan.near/widget/LinkETHAccountsToNearAccount.ConnectedAccount" />
  </Home>
);

{
  <Widget src="segunojo1.near/widget/LinkETHAccountsToNearAccount.ConnectWallet" />;
}
