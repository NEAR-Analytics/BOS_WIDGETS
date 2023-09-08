const { title, src, imgStyle } = props;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .bridge-text {
    font-size: 32px;
    letter-spacing: 0em;
    color: #ffffff;
    @media (max-width: 900px) {
      font-size: 24px;
      font-weight: 700;
      line-height: 29px;
      letter-spacing: 0em;
      text-align: center;
    }
  }

  .connect-button {
    background: #794fdd;
    width: 488px;
    height: 60px;
    border-radius: 10px;
    color: #ffffff;
    border: none;
  }

  @media (max-width: 900px) {
    padding: 24px;
      img{
        width:320px !important;
      }
      .connect-button {
        width:100%
      }
  }
`;

return (
  <Wrapper>
    <img
      src={src}
      style={{
        ...imgStyle,
      }}
    />
    <div className="bridge-text">{title}</div>

    <Web3Connect className="connect-button" connectLabel="Connect ETH Wallet" />
  </Wrapper>
);
