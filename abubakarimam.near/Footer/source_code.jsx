const FooterWrapper = styled.footer`
  background-color: #333;
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
    width: 40px; /* Set the desired width for the logos */
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
        <img src="/path/to/near-logo.png" alt="Near Protocol" />
      </LogoLink>
      <LogoLink
        href="https://twitter.com/yourtwitterhandle"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/path/to/twitter-logo.png" alt="Twitter" />
      </LogoLink>
      <LogoLink
        href="https://discord.com/invite/yourdiscordinvite"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/path/to/discord-logo.png" alt="Discord" />
      </LogoLink>
    </LogoContainer>
    <p>&copy; 2023 Your Company Name. All rights reserved.</p>
  </FooterWrapper>
);
