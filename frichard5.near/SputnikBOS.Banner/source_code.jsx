const Banner = styled.div`
    width: 100%;
    margin-bottom: 70px;
    margin-top: 24px;
`;
const Logo = styled.img`
    width: 70px;
    z-index: 1;
    border-radius: 50%;
    box-shadow:rgba(68, 152, 224, 0.5) -6px 2px 24px;
    margin-right: 30px;
    margin-left: 30px;
`;


const Header = styled.div`
  display: flex;
  align-items: center;
  h1 {
    font-size: 50px;
  }
`;

return (
    <Banner role="banner">
        <Header>
            <Logo src="https://pbs.twimg.com/profile_images/1409918699230744584/6kUQ-4xH_400x400.jpg" />
            <h1>Sputnik BOS</h1>
        </Header>
        <h2 style={{marginTop: '16px', fontSize:'20px', color:'#78788b'}}>A complete dashboard and interface for any Sputnik DAO provided by
            <a href={'https://pikespeak.ai'} target={'_blank'}>
                pikespeak.ai
                <img
                    src={'https://pbs.twimg.com/profile_images/1539950049316278273/RoyRevrB_400x400.jpg'}
                    style={{width: "50px", borderRadius: '50%',     boxShadow:'rgba(68, 152, 224, 0.5) -6px 2px 24px'}}
                />
            </a>
        </h2>
    </Banner>
);
