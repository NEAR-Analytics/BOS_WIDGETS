const Text = styled.div`
  width: 640px;
  color: #1e1d22;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 50px 0;
  @media screen and (max-width: 1188px) {
    width: 70%;
  }
`;

const Social = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
  margin-bottom: 100px;
`;

const Logo = styled.img`
  @media screen and (max-width: 1188px) {
    width: 70%;
  }
`;

const { assets, socialLinks } = VM.require(
  `ndcdev.near/widget/Dashboard.Config`,
);

if (!assets || !socialLinks)
  return <Widget src="flashui.near/widget/Loading" />;

return (
  <div className="d-flex flex-grow-1 flex-column justify-content-center align-items-center">
    <Text>
      Oops! Looks like we lost this page in the virtual cosmos. Don't worry! Go
      back to the main page and try again. If this happens again, let us know,
      and we'll send a search robot with a flashlight!
    </Text>
    <Logo src={assets.notFoundLogo} />
    <Text>Join our community</Text>
    <Social>
      <a href={socialLinks.near} target="_blank">
        <img src={assets.nearLogo} />
      </a>
      <a href={socialLinks.twitter} target="_blank">
        <img src={assets.twitterLogo} />
      </a>
      <a href={socialLinks.telegram} target="_blank">
        <img src={assets.telegramLogo} />
      </a>
    </Social>
  </div>
);
