const DropdownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background: #373a53;
  border-radius: 6px;
`;

const NetworksColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-right: 1px dotted #ffffff4d;
`;

const AssetsColumn = styled.div`
  flex: 1; /* Equal width */
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  color: white;
  padding: 8px 12px;
  margin: 2px 0;
  background: ${(props) => (props.active ? "#292a3d" : "transparent")};
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;

  &:hover {
    background: #292a3d;
  }
`;

const CryptoIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const AssetName = styled.span`
  background: ${(props) => (props.active ? "#292a3d" : "transparent")};
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
`;

const { updateSelectedItem, selectedItem } = props;

const NetworkItem = ({ name, icon, onMouseEnter, isActive }) => {
  return (
    <StyledItem onMouseEnter={onMouseEnter} active={isActive}>
      <CryptoIcon src={icon} alt={name} />
      <span>{name}</span>
    </StyledItem>
  );
};

const AssetItem = ({ name, icon, onClick, isActive }) => {
  return (
    <StyledItem onClick={onClick} active={isActive}>
      <CryptoIcon src={icon} alt={name} />
      <AssetName>{name}</AssetName>
    </StyledItem>
  );
};

const ethImage =
  "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png";

const usdcImage =
  "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389";

const maticImage =
  "https://raw.githubusercontent.com/sushiswap/list/master/logos/native-currency-logos/matic.svg";

const [activeBlockchain, setActiveBlockchain] = useState("Ethereum");

const assets = {
  Ethereum: [
    { name: "USDC", icon: usdcImage },
    { name: "ETH", icon: ethImage },
  ],
  Polygon: [{ name: "USDC", icon: usdcImage }],
};

return (
  <DropdownContainer key={"teste" + Math.random()}>
    {/* Networks Column */}
    <NetworksColumn>
      <NetworkItem
        name="Ethereum"
        icon={ethImage}
        onMouseEnter={() => setActiveBlockchain("Ethereum")}
        isActive={activeBlockchain === "Ethereum"}
      />
      <NetworkItem
        name="Polygon"
        icon={maticImage}
        onMouseEnter={() => setActiveBlockchain("Polygon")}
        isActive={activeBlockchain === "Polygon"}
      />
    </NetworksColumn>
    {/* Assets Column */}
    <AssetsColumn>
      {assets[activeBlockchain].map((asset, index) => (
        <AssetItem
          key={index}
          name={asset.name}
          icon={asset.icon}
          isActive={
            asset.name === selectedItem.name &&
            activeBlockchain === selectedItem.network
          }
          onClick={() => updateSelectedItem(activeBlockchain, index)}
        />
      ))}
    </AssetsColumn>
  </DropdownContainer>
);
