const NavBar = styled.div`
  position: relative;
  width: 100%;
  padding: 1rem 4.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #151718;

  .header-text {
    color: #fcf8ff;
    font-size: 24px;
    font-weight: 750;
  }

  .color-text {
    font-size: 24px;
    font-weight: 750;
    background: linear-gradient(
      270deg,
      #59d -9.91%,
      #e89dbb 53.26%,
      #f8c050 113.62%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 1rem 2rem;
    justify-content: center;

    img {
      width: 50px;
      height: 50px;
    }
  }
`;

const { assets } = VM.require(`ndcdev.near/widget/Dashboard.Config`);

if (!assets) return <Widget src="flashui.near/widget/Loading" />;

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
