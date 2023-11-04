const aaveTopLogo = (
  <img
    alt=""
    src="https://ipfs.near.social/ipfs/bafkreifo5sociwc3g7yktjcivk5imjwpub3j4ntg26ofq7b4d6ar3go4xy"
  />
);

const aaveBottomLogo = (
  <img
    alt=""
    src="https://ipfs.near.social/ipfs/bafkreift6cwhat5jn6pxkphzhedz5dt37jxese5zkhldvgrlncenkjtk7q"
  />
);
const {
  walletConnected,
  chainId,
  DEFAULT_CHAIN_ID,
  getNetworkConfig,
  isChainSupported,
} = props;
const Container = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  .title{
    font-size:32px;
    color:#fff;
    font-weight:700;
    margin-top:30px;
  }
  .loginButton{
    margin-top:24px;
    .web3-connect{
      width:488px;
      height:60px;
      border-radius:10px;
      background-color:#794FDD;
      color:#fff;
      font-size:18px;
      font-weight:500;
      border:none;
    }
  }
  .text{
    font-size:18px;
    color:#fff;
    font-weight:500;
    margin-top:30px;
  }
`;
return (
  <Container>
    {aaveTopLogo}
    {aaveBottomLogo}
    <div className="title">Spark</div>
    {walletConnected ? (
      isChainSupported ? (
        <span className="text">Loading...</span>
      ) : (
        <span className="text">
          Please switch network to{" "}
          {getNetworkConfig(DEFAULT_CHAIN_ID).chainName}
        </span>
      )
    ) : (
      <div className="loginButton">
        <Web3Connect
          className="web3-connect"
          connectLabel="Connect ETH wallet"
        />
      </div>
    )}
  </Container>
);
