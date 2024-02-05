const { assets, socialLinks } = VM.require(
  `ndcdev.near/widget/Dashboard.Config`,
);
const { Footer, Social, DashboardText, NearLogo } = VM.require(
  `ndcdev.near/widget/Dashboard.Components.Footer.styled`,
);

if (
  !assets ||
  !Footer ||
  !Social ||
  !socialLinks ||
  !DashboardText ||
  !NearLogo
)
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
