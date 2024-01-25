const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 16px;
  padding: 32px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #1e1e2d;
  border-radius: 8px;
  padding: 20px;
  color: #fff;
`;

const GridItem = ({ span, rowSpan, children, style }) => {
  const GridItemStyled = styled.div`
    background: #1e1e2d;
    border-radius: 8px;
    padding: 20px;
    color: #fff;
    grid-column: span ${span || 6};
    ${rowSpan && `grid-row: span ${rowSpan};`}
    @media (max-width: 768px) {
      grid-column: 1;
      grid-row: auto;
    }
  `;

  return <GridItemStyled style={style}>{children}</GridItemStyled>;
};

const BalanceDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #333;
  background: #1e1e2d;
  color: white;
  margin-bottom: 12px;

  &:focus {
    outline: none;
    border-color: #4e3f8e;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #aaa;
`;

const CollateralItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoSection = styled.div`
  background: #1e1e2d;
  border-radius: 8px;
  padding: 16px;
  color: white;
  margin-bottom: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #333;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  color: #aaa;
`;

const InfoValue = styled.span`
  color: white;
`;

const CollateralInfo = () => (
  <InfoSection>
    <InfoRow>
      <InfoLabel>Collateral value</InfoLabel>
      <InfoValue>0.7900</InfoValue>
    </InfoRow>
    <InfoRow>
      <InfoLabel>Liquidation point</InfoLabel>
      <InfoValue>0.0000</InfoValue>
    </InfoRow>
    <InfoRow>
      <InfoLabel>Borrow capacity</InfoLabel>
      <InfoValue>0.5100</InfoValue>
    </InfoRow>
    <InfoRow>
      <InfoLabel>Available to borrow</InfoLabel>
      <InfoValue>0.5100</InfoValue>
    </InfoRow>
  </InfoSection>
);

const APRSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
`;

const SectionTitle = styled.h2`
  color: #fff;
  margin-bottom: 16px;
`;

const Button = styled.button`
  background-color: #4e3f8e;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover,
  &:focus {
    background-color: #675aa9;

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:last-child {
    margin-right: 0;
  }
`;

const Slider = styled.div`
  background: #333;
  border-radius: 5px;
  position: relative;
  height: 20px;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: ${({ width }) => width}%;
    height: 8px;
    background: #4e3f8e;
    border-radius: 5px;
    transform: translateY(-50%);
  }
`;

const CollateralLabel = styled.span`
  font-size: 1rem;
  color: #fff;
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const InputLabel = styled.label`
  margin-right: 10px;
  color: #aaa;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #333;
  background: #1e1e2d;
  color: white;
  margin-right: 10px;

  &:focus {
    outline: none;
    border-color: #4e3f8e;
  }
`;

const SectionHeader = styled.span`
  color: #fff;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 700;
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 200px;
`;

const DropdownLabel = styled.label`
  color: #fff;
  display: block;
  margin-bottom: 5px;
`;

const DropdownSelect = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: #1e1e1e;
  color: white;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const LiquidationRiskBar = ({ riskPercent }) => {
  return (
    <ProgressBarContainer>
      <ProgressBarLimit>
        <RiskPercentage>{0}%</RiskPercentage>
        <ProgressBarFilled style={{ width: `${riskPercent}%` }} />
        <RiskPercentage style={{ left: `calc(${riskPercent}% - 20px)` }}>
          {riskPercent}%
        </RiskPercentage>
      </ProgressBarLimit>
    </ProgressBarContainer>
  );
};

const ProgressBarContainer = styled.div`
  width: calc(100% - 16px);
  display: flex;
  align-items: center;
`;

const ProgressBarLimit = styled.div`
  height: 20px;
  border-radius: 4px;
  background-color: grey;
  width: 100%;
  position: relative;
`;

const ProgressBarFilled = styled.div`
  height: 100%;
  background-color: purple;
  border-radius: 4px;
  transition: width 0.3s ease-in-out;
`;

const RiskPercentage = styled.span`
  position: absolute;
  bottom: -22px;
  color: #888baf;
  transition: left 0.3s ease-in-out;
`;

const ProgressBarBorrowContainer = styled.div`
  width: ${(props) => props.width}%;
`;

const ProgressBarBorrow = styled.div`
  height: 20px;
  border-radius: 4px;
  background-color: #6200ea;
  width: 100px;
  margin-left: 4px;
  transition: width 0.3s ease-in-out;
`;

const BorrowText = styled.span`
  color: #888baf;
  font-size: 14px;
  font-weight: 600;
  margin-left: 4px;
`;

//TODO: need to make the dropdown according to the design.
const NetworkDropdown = ({ selectedNetwork, onChange }) => {
  return (
    <DropdownContainer>
      <DropdownLabel>NETWORK</DropdownLabel>
      <DropdownSelect value={selectedNetwork} onChange={onChange}>
        <option value="usdc">USDC Ethereum</option>
        <option value="usdc">USDC Ethereum</option>
        <option value="usdc">USDC Ethereum</option>
      </DropdownSelect>
    </DropdownContainer>
  );
};

const ProgressBarAprContainer = styled.div`
  width: 100%;
`;

const ProgressBarApr = styled.div`
  height: 20px;
  border-radius: 4px;
  background-color: grey;
  width: ${(props) => props.width}%;
  transition: width 0.3s ease-in-out;
`;

const AprProgressBar = ({ barPercent }) => {
  return (
    <ProgressBarContainer>
      <ProgressBarAprContainer>
        <ProgressBarApr width={barPercent} />

        <div style={{ marginTop: 4, fontSize: 14, fontWeight: 600 }}>
          13,5%
          <span
            style={{
              marginLeft: 2,
              color: "#888baf",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Interest
          </span>
        </div>
      </ProgressBarAprContainer>
      <ProgressBarBorrowContainer>
        <ProgressBarBorrow />
        <BorrowText> 3.09%</BorrowText>
      </ProgressBarBorrowContainer>
    </ProgressBarContainer>
  );
};

const collateralItems = [
  { label: "Chainlink (LINK)" },
  { label: "Ethereum (ETH)" },
  { label: "Ethereum (ETH)" },
  { label: "Ethereum (ETH)" },
];

const rowSpan = Math.floor(collateralItems.length / 2) * 1;

let collateralRowSpan;
if (collateralItems.length < 3) {
  collateralRowSpan = 1;
} else if (collateralItems.length < 4) {
  collateralRowSpan = 2;
} else {
  collateralRowSpan = rowSpan;
}

return (
  <GridContainer>
    {/* Network dropdown and liquidation risk section */}
    <GridItem span={3}>
      <NetworkDropdown
        selectedNetwork={selectedNetwork}
        onChange={handleNetworkChange}
      />
    </GridItem>
    <GridItem span={9}>
      <LiquidationRiskBar riskPercent={20} />
    </GridItem>
    {/* Balance Section */}

    <GridItem span={4}>
      <SectionHeader>Balance</SectionHeader>
      <BalanceDisplay>
        <span>123.64 USDC</span>
        <Button>Withdraw</Button>
      </BalanceDisplay>
    </GridItem>

    {/* Supply USDC Section */}
    <GridItem span={4}>
      <SectionHeader>Supply USDC</SectionHeader>
      <InputGroup>
        <InputLabel htmlFor="supply-input">Wallet Balance:</InputLabel>
        <InputField id="supply-input" defaultValue="0.00 USDC" />
        <Button>SUPPLY</Button>
      </InputGroup>
    </GridItem>

    {/* Borrow USDC Section */}
    <GridItem span={4}>
      <SectionHeader>Borrow USDC</SectionHeader>
      <InputGroup>
        <InputLabel htmlFor="borrow-input">Available to Borrow:</InputLabel>
        <InputField id="borrow-input" defaultValue="0.00 USDC" />
        <Button>BORROW</Button>
      </InputGroup>
    </GridItem>

    {/* Net Borrow APR Section */}

    {/* Collateral Section */}
    <GridItem span={8} rowSpan={collateralRowSpan}>
      <SectionHeader>Collateral</SectionHeader>
      {collateralItems.map((item, index) => (
        <CollateralItem key={index}>
          <CollateralLabel>{item.label}</CollateralLabel>
          <ActionGroup>
            <Button>Supply</Button>
            <Button>Withdraw</Button>
          </ActionGroup>
        </CollateralItem>
      ))}
    </GridItem>
    <GridItem span={4}>
      <SectionHeader>Net Borrow APR</SectionHeader>
      <div style={{ marginTop: 16 }}>
        <AprProgressBar></AprProgressBar>
      </div>
      <div style={{ marginTop: 16 }}>
        <SectionHeader>Net Supply APR</SectionHeader>
        <div style={{ marginTop: 16 }}>
          <AprProgressBar></AprProgressBar>
        </div>
      </div>
    </GridItem>
    <GridItem span={4} style={{ maxHeight: "220px" }} rowSpan={2}>
      <CollateralInfo />
    </GridItem>
  </GridContainer>
);
