const Banner = styled.div`
    width: 100%;
    height: 200px;
    margin-bottom: 10px;
    margin-top: 24px;
`;
const Logo = styled.img`
    width: 100px;
    position: absolute;
    top: 110px;
    left: 60px;
    z-index: 1;
    border-radius: 50%;
    box-shadow:rgba(68, 152, 224, 0.5) -6px 2px 24px;
`;

const Lines = styled.div`
    width: 100%;
    height: 200px;
    background: url("https://ipfs.near.social/ipfs/bafybeibrijoowwlrlhxn54skisw2uitt3bex54yirua74nlbo2gkee5d2a");
    background-size: contain;
    background-repeat: no-repeat;
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
    <Logo src="https://ipfs.near.social/ipfs/bafkreie4rfa63zedwnpbwm5lglqrwqhahcnf6slllqmq7sh46ngf5y4vsq" />
    <Header>
      <h1> Near Digital Collective DAOS </h1>
      <Lines src="https://ipfs.near.social/ipfs/bafybeifjsr4vz2266xw27t4uvlhelnixnbxozfkmr7c7zhpsnkttucrkli" />
    </Header>
  </Banner>
);
