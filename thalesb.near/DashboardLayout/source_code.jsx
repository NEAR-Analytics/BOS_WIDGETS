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
  background: #292a3d;
  border-radius: 8px;
  padding: 20px;
  color: #fff;
`;

const GridItem = ({ span, rowSpan, children, style }) => {
  const GridItemStyled = styled.div`
    background: #292a3d;
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
  background: #292a3d;
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
  background: #292a3d;
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
  background-color: ${(props) => props.bgColor || "#00EC97"};
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
    opacity: 0.7;

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:last-child {
    margin-right: 0;
  }
`;

const GhostButton = styled.button`
  background-color: transparent;
  color: white;
  border: 1px solid white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover,
  &:focus {
    opacity: 0.7;

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
  background: #292a3d;
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

  .DropdownMenuItem {
    padding: 16px;
  }
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
  background-color: #292a3d;
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
  padding-top: 24px;
  padding-bottom: 24px;
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
  background-color: #00ec97;
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

const DropdownTrigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ArrowIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Essential icons">
      <path
        id="Vector (Stroke)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.2762 8.65128C6.6345 8.30676 7.20424 8.31793 7.54875 8.67623L12 13.4015L16.4513 8.67623C16.7958 8.31793 17.3655 8.30676 17.7238 8.65128C18.0821 8.99579 18.0933 9.56553 17.7487 9.92382L12.6488 15.3238C12.4791 15.5003 12.2448 15.6 12 15.6C11.7552 15.6 11.5209 15.5003 11.3513 15.3238L6.25125 9.92382C5.90674 9.56553 5.91791 8.99579 6.2762 8.65128Z"
        fill="#888BAF"
      />
    </g>
  </svg>
);

// NetworkDropdown component
const NetworkDropdown = ({ selectedNetwork, onChange }) => {
  return (
    <DropdownContainer>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <DropdownTrigger>
            <div>NETWORK</div>
            <ArrowIcon /> {/* Use the Radix UI icon here */}
          </DropdownTrigger>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          style={{ backgroundColor: "black" }}
          sideOffset={5}
        >
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger style={{ padding: 16 }}>
              Ethereum
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent
              style={{ backgroundColor: "black" }}
              sideOffset={2}
              alignOffset={-5}
            >
              <DropdownMenu.Item className="DropdownMenuItem">
                USDC
              </DropdownMenu.Item>
              <DropdownMenu.Item className="DropdownMenuItem">
                ETH
              </DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator className="DropdownMenuSeparator" />

          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
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
      <SectionHeader>Liquidation Risk</SectionHeader>
      <LiquidationRiskBar riskPercent={20} />
    </GridItem>
    {/* Balance Section */}

    <GridItem span={4}>
      <SectionHeader>Balance</SectionHeader>
      <BalanceDisplay>
        <span>123.64 USDC</span>
        <GhostButton>Withdraw</GhostButton>
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
        <Button bgColor="#AA00FA"> BORROW</Button>
      </InputGroup>
    </GridItem>

    {/* Net Borrow APR Section */}

    {/* Collateral Section */}
    <GridItem span={6} rowSpan={collateralRowSpan}>
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
    <GridItem span={3}>
      <SectionHeader>Net Borrow APR</SectionHeader>
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
    </GridItem>
    <GridItem span={3}>
      <SectionHeader>Net Supply APR</SectionHeader>
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
    </GridItem>
    <GridItem span={6} style={{ maxHeight: "220px" }} rowSpan={2}>
      <CollateralInfo />
    </GridItem>
  </GridContainer>
);
