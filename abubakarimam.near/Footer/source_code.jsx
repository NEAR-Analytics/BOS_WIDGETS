const FooterWrapper = styled.div`
  background-color: #4caf50;
  color: white;
  padding: 20px 0;
  text-align: center;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const LogoLink = styled.a`
  margin: 0 10px;
  img {
    width: 40px; 
    height: auto;
  }
`;

return (
  <FooterWrapper>
    <LogoContainer>
      <LogoLink
        href="https://near.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://res.cloudinary.com/dzl44lobc/image/upload/v1702305812/oca2zyuhvgmafqx7sspj.jpg"
          alt="Near Protocol"
        />
      </LogoLink>
      <LogoLink
        href="https://twitter.com/yourtwitterhandle"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://res.cloudinary.com/dzl44lobc/image/upload/v1702305527/gi40ee5fzrqxeqq8yzsu.jpg"
          alt="Twitter"
        />
      </LogoLink>
      <LogoLink
        href="https://discord.com/invite/yourdiscordinvite"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://res.cloudinary.com/dzl44lobc/image/upload/v1702305527/nwzrdayxprgodwmjzfid.png"
          alt="Discord"
        />
      </LogoLink>
    </LogoContainer>
    <p>&copy; Dispose-To-Earn. All rights reserved.</p>
  </FooterWrapper>
);
