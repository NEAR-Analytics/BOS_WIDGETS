const { href } = VM.require("devgovgigs.near/widget/core.lib.url");

href || (href = () => {});

const imageLink =
  "https://ipfs.near.social/ipfs/bafybeiap2mzwsly4apaldxguiunx4rjwqyadksj5yxuzwrww3kue3ao5qe";

const WrapperSocial = styled.div`
  display: flex;
  margin-bottom: 2em;
  width: 180px;
  align-items: center;
  justify-content: space-around;
`;

const SocialText = styled.p`
  font-family: "Kodchasan", sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: #ffffff;
  text-transform: uppercase;
  margin: 0;
`;

const SocialLink = styled.a`
  cursor: pointer;
  text-align: none;
  height: 16px;
  margin: 0;
  padding: 0;
`;

const SocialIcon = styled.img`
  height: 100%;
  vertical-align: unset;
`;

const HeroSection = styled.div`
  position: relative;
  height: auto;
  z-index: 3;
  width: 70%;
  background: #011b27;
  clip-path: polygon(0 0, 100% 0%, 75% 100%, 0% 100%);

  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-left: 3.375rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 1rem 1.5rem;
    clip-path: none;
  }
`;

const Title = styled.h1`
  color: #f4f4f4;
  font-family: "Kodchasan", sans-serif;
  font-size: 4rem;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 88px */
  letter-spacing: -1.76px;

  @media screen and (max-width: 768px) {
    font-size: 2.25rem;
    letter-spacing: -0.72px;
    margin: 0;
  }
`;

const Lead = styled.p`
  color: #151515;
  font-family: "Kodchasan", sans-serif;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 39.6px */

  width: 70%;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    width: 100%;
  }
`;

const CTA = styled.a`
  display: inline-flex;
  padding: 0.875rem 1rem;
  align-items: center;
  gap: 0.5rem;

  border-radius: 1rem;
  border: 1px solid #151515;

  color: #151515 !important;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 28.8px */
  letter-spacing: -0.48px;

  &:hover {
    background: #151515;
    color: #f4f4f4 !important;
    text-decoration: none; // Remove underline on hover
  }

  @media screen and (max-width: 768px) {
    display: inline-flex;
    padding: 8px 16px;
    align-items: center;
    gap: 8px;

    border-radius: 16px;
    background: #00ec97;

    border: none;

    color: #f4f4f4 !important;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%; /* 19.2px */
    letter-spacing: -0.32px;

    &:hover {
      background: #151515;
      color: #f4f4f4;
      text-decoration: none; // Remove underline on hover
    }
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: max-content;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    background: #ffcb00;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  background: transparent;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Image = styled.img`
  margin-left: 15.625rem;
  height: 100%;
  width: 100%;
  filter: grayscale(100%);
  object-fit: cover;
`;

const DesktopDescription = styled.div`
  @media screen and (max-width: 786px) {
    display: none;
  }
`;

const MobileImage = styled.img`
  display: none;

  width: 100%;
  height: 196px;

  width: 100%;
  object-fit: cover;
  filter: grayscale(1);

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MobileDescription = styled.div`
  display: none;
  padding: 24px 16px;

  width: 100%;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

return (
  <Container>
    <HeroSection>
      <Title>
        The biggest <br />
        <span style={{ color: "#fff" }}>Near guild</span> <br />
        for NEAR builders
      </Title>
      <DesktopDescription>
        <SocialText>
          Join a vibrant community of innovators shaping the open web.
        </SocialText>
        <WrapperSocial>
          <SocialText>Follow us</SocialText>
          <SocialLink href="https://twitter.com/nearuaguild" target="_blank">
            <SocialIcon
              src="https://ipfs.near.social/ipfs/bafkreibhvlipldq5qnolfb74ufbgqkbcwlim5vvtk3mbz6ujvbsar6fesq"
              alt="Twitter"
            />
          </SocialLink>
          <SocialLink href="https://t.me/nearprotocolua" target="_blank">
            <SocialIcon
              src="https://ipfs.near.social/ipfs/bafkreihcqu65spu6o5z6vw5atbjx7iqphzvlss3hvz4l7bj3syhvavzf5a"
              alt="Telegram"
            />
          </SocialLink>
          <SocialLink
            href="https://near.org/near/widget/ProfilePage?accountId=nearukraineguild.near"
            target="_blank"
          >
            <SocialIcon
              src="https://ipfs.near.social/ipfs/bafkreier4aong3uumu4ndl6iahol2kgeisfqtl6c237x3q34ql6smjvare"
              alt="Near Social"
            />
          </SocialLink>
        </WrapperSocial>
      </DesktopDescription>
    </HeroSection>
    <MobileImage src={imageLink} />
    <ImageContainer>
      <Image src={imageLink} />
    </ImageContainer>
    <MobileDescription>
      <Lead>Join a vibrant community of innovators shaping the open web.</Lead>
      <WrapperSocial>
        <SocialText>Follow us</SocialText>
        <SocialLink href="https://twitter.com/nearuaguild" target="_blank">
          <SocialIcon
            src="https://ipfs.near.social/ipfs/bafkreibhvlipldq5qnolfb74ufbgqkbcwlim5vvtk3mbz6ujvbsar6fesq"
            alt="Twitter"
          />
        </SocialLink>
        <SocialLink href="https://t.me/nearprotocolua" target="_blank">
          <SocialIcon
            src="https://ipfs.near.social/ipfs/bafkreihcqu65spu6o5z6vw5atbjx7iqphzvlss3hvz4l7bj3syhvavzf5a"
            alt="Telegram"
          />
        </SocialLink>
        <SocialLink
          href="https://near.org/near/widget/ProfilePage?accountId=nearukraineguild.near"
          target="_blank"
        >
          <SocialIcon
            src="https://ipfs.near.social/ipfs/bafkreier4aong3uumu4ndl6iahol2kgeisfqtl6c237x3q34ql6smjvare"
            alt="Near Social"
          />
        </SocialLink>
      </WrapperSocial>
    </MobileDescription>
  </Container>
);
