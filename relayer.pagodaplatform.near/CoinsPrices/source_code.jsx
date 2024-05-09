const colors = {
  brightRed: "#ff3d00",
  deepBlue: "#2835f8",
  lightBeige: "#f4e9e1",
  slateBlack: "#2B2B2B",
};

const DropdownIcon = styled.div`
  border-bottom: 3px solid ${colors.brightRed};
  border-left: 3px solid ${colors.brightRed};
  height: 16px;
  transform: ${(props) => (props.isOpen ? "rotate(45deg)" : "rotate(0)")};
  transition: transform 0.3s ease;
  width: 16px;
`;

const ImgOptions = styled.img`
  height: 22px;
  width: 22px;
`;

const Option = styled.div`
  color: ${colors.lightBeige};
  cursor: pointer;
  display: flex;
  font-size: 13px;
  gap: 10px;
  padding: 8px;
  transition: background-color 0.3s ease 0s;

  &:hover {
    background-color: ${colors.deepBlue};
    transform: scale(1.02);
  }
`;

const OptionsWrapper = styled.div`
  background: ${colors.slateBlack};
  border-radius: 16px;
  max-height: 416px;
  overflow-y: auto;
  padding: 10px 2px;
  width: 100%;
  z-index: 1000;
  margin-top: 8px;
`;

const SelectWrapper = styled.div`
  align-items: center;
  background: ${colors.lightBeige};
  border: 1px solid #0E0E0E;
  border-radius: 16px; 
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  &:hover {
    background-color: ${colors.slateBlack};
    color: ${colors.lightBeige};
  }
`;

const Container = styled.div`
  align-items: center;
  position: relative;
`;

const DisplayInfo = styled.div`
  background-color: blue;
  display: block;
  padding: 16px;
  margin-top: 50px;
  border-radius: 10px;
  
  .current-price {
    font-size: 30px;
    font-weight: bold;
    color: black; /* Choose an appropriate text color */
  }

  .high-24h {
     font-size: 30px;
    font-weight: bold;
    color: #fff; /* Choose an appropriate text color */
  }

  .market-cap {
     font-size: 30px;
    font-weight: bold;
    color: red; /* Choose an appropriate text color */
  }

  .market-cap-rank {
     font-size: 30px;
    font-weight: bold;
    color: black; /* Choose an appropriate text color */
  }
`;

State.init({
  selectedCoin: null,
  renderOptions: null,
});

const currency = props.currency || "usd";
const query = props.query || "&order=market_cap_desc";
const pagination = props.pagination || 50;

// Coingeco API documentation
// https://www.coingecko.com/api/documentations/v3#/
const BASE_URL = "https://api.coingecko.com/api/v3/coins/markets";
const CNS_URL = `${BASE_URL}?vs_currency=${currency}${query}&per_page=${pagination}&page=1"`;

const coinsList = fetch(CNS_URL)?.body || [];
console.log(coinsList);

function updateSelectedCoin(coin) {
  State.update({ selectedCoin: coin, isOpen: false });
  Storage.set("coinSelectValue", state.selectedCoin);
}

const handleOptionClick = props.handleOptionClick || updateSelectedCoin;

if (!state.renderOptions && coinsList.length) {
  const renderOptions = (
    <OptionsWrapper>
      {coinsList?.map((coin) => {
        return (
          <Option key={coin.id} onClick={() => handleOptionClick(coin)}>
            {coin.image && <ImgOptions src={coin.image} alt="coin" />}
            {coin.name}
          </Option>
        );
      })}
    </OptionsWrapper>
  );

  State.update({ renderOptions });
}

const { isOpen, selectedCoin } = state;

return (
  <Container>
    <SelectWrapper onClick={() => State.update({ isOpen: !isOpen })}>
      <>
        {selectedCoin?.name ? (
          <div>
            <ImgOptions src={selectedCoin.image} />
            {selectedCoin.name}
          </div>
        ) : (
          "Select a coin.."
        )}
      </>
      <DropdownIcon isOpen={isOpen} />
    </SelectWrapper>
    {isOpen && state.renderOptions}
    <DisplayInfo>
      <div className="current-price">
        Current Price: ${selectedCoin.current_price}
      </div>
      <div className="high-24h">High in 24Hrs: ${selectedCoin.high_24h}</div>
      <div className="market-cap">Market Cap: ${selectedCoin.market_cap}</div>
      <div className="market-cap-rank">
        Rank in Market: {selectedCoin.market_cap_rank}
      </div>
    </DisplayInfo>
  </Container>
);

//current_price, high_24h, market_cap, market_cap_rank;
