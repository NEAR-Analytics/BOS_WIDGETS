const FooterWrapper = styled.div`
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
          src="https://res-console.cloudinary.com/dzl44lobc/media_explorer_thumbnails/38dc14a6d822158c00b12b3a04cd1e49/detailed"
          alt="Near Protocol"
        />
      </LogoLink>
      <LogoLink
        href="https://twitter.com/yourtwitterhandle"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://res-console.cloudinary.com/dzl44lobc/media_explorer_thumbnails/422cfdfe9f0e5243f463d70753565647/detailed"
          alt="Twitter"
        />
      </LogoLink>
      <LogoLink
        href="https://discord.com/invite/yourdiscordinvite"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://res-console.cloudinary.com/dzl44lobc/media_explorer_thumbnails/3ebba257b07165529571749dee930328/detailed"
          alt="Discord"
        />
      </LogoLink>
    </LogoContainer>
    <p>&copy; 2023 Your Company Name. All rights reserved.</p>
  </FooterWrapper>
);
