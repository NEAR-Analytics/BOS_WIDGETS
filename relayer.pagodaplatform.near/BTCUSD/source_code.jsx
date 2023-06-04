const Wrapper = styled.div`
    font-size: 70px;
    font-weight: 600;
    background-image: linear-gradient(to left, #553c9a, #b393d3);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
`;

const bitcoinPriceCall = () => {
  const thisUrl = "https://api.coinbase.com/v2/prices/BTC-USD/buy";
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return asyncFetch(thisUrl, params);
};

const getBitcoinUsdPrice = () => {
  bitcoinPriceCall().then((resp) => {
    console.log(`resp: ${JSON.stringify(resp)}`);
    State.update({ price: resp.body.data.amount });
  });
};

return (
  <Wrapper>
    {state.price}
    <button type="button" onClick={getBitcoinUsdPrice}>
      Get BTC USD Quote
    </button>
  </Wrapper>
);
