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
  flex: 1;
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

const { updateSelectedItem, selectedItem, networkTabs } = props;

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

const assetEntries = Object.keys(networkTabs);

if (!assetEntries || !networkTabs) return <></>;

const [activeBlockchain, setActiveBlockchain] = useState(
  selectedItem.network || assetEntries[0]
);

return (
  <DropdownContainer key={"Dropdown" + Math.random()}>
    {/* Networks Column */}
    <NetworksColumn>
      {assetEntries.map((blockchain) => (
        <NetworkItem
          key={blockchain}
          name={blockchain}
          icon={networkTabs[blockchain].icon}
          onMouseEnter={() => setActiveBlockchain(blockchain)}
          isActive={activeBlockchain === blockchain}
        />
      ))}
    </NetworksColumn>
    {/* Assets Column */}

    <AssetsColumn>
      {networkTabs[activeBlockchain].tokens.map((asset, index) => (
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
