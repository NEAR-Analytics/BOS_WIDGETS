const { text, price, label, onClick, loading } = props;

const Wrapper = styled.div`
  .unlock-content-overlay {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    background-color: rgba(255, 255, 255, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .unlock-content-overlay > .text {
    color: #000;
    text-align: center;
    font-family: Helvetica;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .unlock-content-overlay > .price {
    color: #000;
    text-align: center;
    font-family: Helvetica;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

return (
  <Wrapper>
    <div className="unlock-content-overlay">
      <div className="text">{text}</div>
      <div className="price">{price} $NEAR</div>
      <Widget
        src="paywall.near/widget/PaywallDapplet-Button"
        props={{ label, onClick, loading }}
      />
    </div>
  </Wrapper>
);
