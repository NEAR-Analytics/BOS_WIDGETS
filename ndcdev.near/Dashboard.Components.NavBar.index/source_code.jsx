const { assets } = VM.require(`ndcdev.near/widget/Dashboard.Config`);
const { NavBar } = VM.require(
  `ndcdev.near/widget/Dashboard.Components.NavBar.styled`,
);

if (!assets || !NavBar) return <Widget src="flashui.near/widget/Loading" />;

const HomeLink = styled.a`
  :hover {
    text-decoration: none;
  }
`;

return (
  <NavBar>
    <HomeLink href={`/ndcdev.near/widget/Dashboard.App?page=home`}>
      <div className="d-flex gap-3 align-items-center">
        <img src={assets.logoWhite} />
        <div className="header-text">NDC DASHBOARD</div>
      </div>
    </HomeLink>
    <div className="color-text">FOR PEOPLE BY PEOPLE</div>
  </NavBar>
);
