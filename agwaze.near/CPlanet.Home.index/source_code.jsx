const Root = styled.div`
  border-radius: 16px;
  .hero {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 0px;

    .text:first-letter {
      color: #FFF;
      font-family: Helvetica Neue;
      font-size: 188px;
      font-style: italic;
      font-weight: 200;
      line-height: normal;
    }
    .text {
      color: #FFF;
      font-family: Helvetica Neue;
      font-size: 188px;
      font-style: normal;
      text-align: right;
      font-weight: 400;
      line-height: normal;
    }
  }
`;

return (
  <Root>
    <div
      className="hero"
      style={{
        backgroundImage: `url("https://ipfs.near.social/ipfs/bafkreicyp6dvoorfcavir27knzieosjjwaslbam73an4ciscx6opbs4wsm")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "790px",
      }}
    >
      <Widget
        src="agwaze.near/widget/CPlanet.Navbar.index"
        props={{ isHome: true }}
      />
      <h1 className="text">CPLANET</h1>
    </div>
  </Root>
);
