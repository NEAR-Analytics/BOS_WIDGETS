const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 20vh;
  overflow: hidden;
  
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 100%;
    font-size:8px;
  }

  @media (max-width: 480px) {
    width: 100%;
        font-size:8px;

  }
`;

const Logo = styled.img`
  border-radius:50%;
  width: 45px; 
  height: auto;
  margin-right: 8px; 
  
`;

const LogoLink = styled.a`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: none;


   &:hover {
    & > ${Logo} {
      animation: tilt 2s ease infinite;
    }
  }

  @keyframes tilt {
    0% { transform: rotateZ(0deg); }
    25% { transform: rotateZ(-5deg); }
    50% { transform: rotateZ(5deg); }
    75% { transform: rotateZ(-5deg); }
    100% { transform: rotateZ(5deg); }
  }
`;

const Text = styled.span`
  color:black;
  font-size: 14px;
font-family: Baskerville, Baskerville Old Face, Garamond, Times New Roman, serif.;
  background-color: none;
    @media (max-width: 768px) {
    width: 100%;
    font-size:15px;
  }

  @media (max-width: 480px) {
    width: 100%;
        font-size:10px;

  }
`;

const MenuContainer = styled.div`
  position: absolute;
  top: 20px; /* Adjust this value to move the menu closer to the top */
  left: 50%;
font-family: Baskerville, Baskerville Old Face, Garamond, Times New Roman, serif.;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  align-items: center;
  
`;

const Label = styled.span`
  font-size: 18px;
  background-color: white;
  padding: 5px;
  opacity: 0.6; /* Initial opacity, 40% */
  transition: opacity 0.3s ease, color 0.3s ease;
  border-radius:4px;
  ${MenuItem}:hover & {
    color: #fca311;
    opacity: 1; /* Hover opacity, 100% */
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const MenuItem = styled.a`
  color: black;
  font-size: 18px;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #fca311;
  }
    @media (max-width: 768px) {
    width: 100%;
    font-size:15px;
  }

  @media (max-width: 480px) {
    width: 100%;
        font-size:12px;

  }
`;

const MenuItemWallet = styled.a`
  color: black;
  font-size: 18px;
  text-decoration: none;
    top: 20px;
  right: 20px;
  transition: color 0.3s ease;

  &:hover {
    color: #fca311;
  }
    @media (max-width: 768px) {
    width: 100%;
    font-size:15px;
  }

  @media (max-width: 480px) {
    width: 100%;
        font-size:12px;

  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderMain = () => {
  return (
    <Container>
      <Image src="https://ipfs.near.social/ipfs/bafybeidiuvg353gd5pld3peiv6w4c74mdnzbysrbgzpjo3id5vbfrhywwm" />
      <Header>
        <LogoLink href="https://near.social/trendingpostbos.near/widget/Index">
          {" "}
          <Logo
            src="https://ipfs.near.social/ipfs/bafkreiejtc7czgogpg4yho7zevihttpafvdoonncfrqhbjh5a4asoz2bcq"
            alt="Logo"
          />
          <Text>TrendingPost</Text>
        </LogoLink>
        <MenuContainer>
          <Label>
            <MenuItem href="https://github.com/pichtranst123/trendingpost-on-bos">
              Docs
            </MenuItem>
          </Label>
          <Label>
            <MenuItem href="https://github.com/pichtranst123/trendingpost-on-bos/issues">
              Help
            </MenuItem>
          </Label>
        </MenuContainer>
      </Header>
    </Container>
  );
};

return (
  <>
    <HeaderMain />
  </>
);
