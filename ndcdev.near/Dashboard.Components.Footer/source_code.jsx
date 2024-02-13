const Footer = styled.div`
  position: relative;
  width: 100%;
  height: 130px;
  padding: 3.5rem 4.5rem;
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
    padding: 2rem;
    justify-content: center;

    img {
      width: 35px;
      height: 35px;
    }
  }
`;

const Social = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  margin-left: -100px;

  img {
    height: 30px;
  }

  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;

const DashboardText = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NearLogo = styled.div`
  img {
    height: 30px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const { assets, socialLinks } = VM.require(
  `ndcdev.near/widget/Dashboard.Config`,
);

if (!assets || !socialLinks)
  return <Widget src="flashui.near/widget/Loading" />;

return (
  <Footer>
    <DashboardText>
      <a href={`/ndcdev.near/widget/Dashboard.App?page=home`}>
        <div className="d-flex gap-3 align-items-center">
          <img src={assets.logoWhite} />
          <div className="header-text">NDC DASHBOARD</div>
        </div>
      </a>
    </DashboardText>
    <Social>
      <a href={socialLinks.near} target="_blank">
        <img src={assets.footer.nearLogoBlock} />
      </a>
      <a href={socialLinks.twitter} target="_blank">
        <img src={assets.footer.twitterLogo} />
      </a>
      <a href={socialLinks.telegram} target="_blank">
        <img src={assets.footer.telegramLogo} />
      </a>
    </Social>
    <NearLogo>
      <img src={assets.footer.nearLogo} />
    </NearLogo>
  </Footer>
);
