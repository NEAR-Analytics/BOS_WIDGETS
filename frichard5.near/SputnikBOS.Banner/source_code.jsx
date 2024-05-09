const Banner = styled.div`
    width: 100%;
    margin-bottom: 70px;
    margin-top: 24px;
    @media screen and (max-width: 1150px) {
      margin-top: 0;
    }
`;
const Logo = styled.img`
    width: 70px;
    z-index: 1;
    border-radius: 50%;
    box-shadow:rgba(68, 152, 224, 0.5) -6px 2px 24px;
    margin-right: 30px;
    margin-left: 30px;
    @media screen and (max-width: 1150px) {
      width: 35px;
    }
`;


const Header = styled.div`
  display: flex;
  align-items: center;
  h1 {
    font-size: 50px;
  }
  @media screen and (max-width: 1150px) { 
    h1 {
      font-size: 30px;
      margin-block-start: 0;
      margin-block-end: 0;
    }
  }
`;

const SubtitleContainer = styled.h2 `
  margin-top: 16px;
  font-size: 20px; 
  color: #78788b;
  img {
    width: 50px; 
    border-radius: 50%;
    box-shadow: rgba(68, 152, 224, 0.5) -6px 2px 24px;
  }
  @media screen and (max-width: 1150px) {
    img {
      width: 20px;
    }
    font-size: 11px !important;
  }
`

return (
    <Banner role="banner">
        <Header>
            <Logo src="https://pbs.twimg.com/profile_images/1409918699230744584/6kUQ-4xH_400x400.jpg" />
            <h1>Sputnik BOS</h1>
        </Header>
        <SubtitleContainer>
            <span>A complete dashboard and interface for any Sputnik DAO provided by</span>
            <a href={'https://pikespeak.ai'} target={'_blank'}>
                pikespeak.ai
                <img
                    src={'https://pbs.twimg.com/profile_images/1539950049316278273/RoyRevrB_400x400.jpg'}
                />
            </a>
        </SubtitleContainer>
    </Banner>
);
