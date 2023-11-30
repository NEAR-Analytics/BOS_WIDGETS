const user = context.accountId;

const Home = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 100px;
    margin-bottom: 100px;
`;

const [connectSectionActive, SetConnectSectionActive] = useState(true);

useEffect(() => {
  if (Ethers.provider()) {
    SetConnectSectionActive(false);
  }
}, []);

console.log("Ethers", Ethers.provider());

return (
  <Home>
    <Widget src="mitchyugan.near/widget/LinkETHAccountsToNearAccount.Navbar" />
    <Widget src="mitchyugan.near/widget/LinkETHAccountsToNearAccount.LandingPage" />
    {}
    {user &&
      (connectSectionActive ? (
        <Widget src="segunojo1.near/widget/LinkETHAccountsToNearAccount.ConnectWallet" />
      ) : (
        <Widget src="mitchyugan.near/widget/LinkETHAccountsToNearAccount.ConnectedAccount" />
      ))}
  </Home>
);
