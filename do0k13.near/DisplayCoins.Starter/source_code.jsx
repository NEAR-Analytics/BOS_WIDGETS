// using mock data as an example
const mockData = [
  {
    name: "Bitcoin",
    current_price: 30624,
    image:
      "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
  },
  {
    name: "Ethereum",
    current_price: 1946.2,
    image:
      "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
  },
  {
    name: "Tether",
    current_price: 0.999598,
    image:
      "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663",
  },
];

// Style contants
const colors = {
  brightRed: "#ff3d00",
  deepBlue: "#2835f8",
  lightBeige: "#f4e9e1",
  slateBlack: "#2B2B2B",
};

// Styled Components
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
  position: absolute;
`;

// Initialize the state
State.init({
  renderOptions: null,
});

if (!state.renderOptions && mockData.length) {
  // Get mapped list of coins
  const renderOptions = (
    <OptionsWrapper>
      {mockData?.map((coin) => {
        return (
          <Option key={coin.id}>
            {coin.image && <ImgOptions src={coin.image} alt="coin" />}
            {coin.name}
          </Option>
        );
      })}
    </OptionsWrapper>
  );

  State.update({ renderOptions });
}

return <div>{state.renderOptions}</div>;
