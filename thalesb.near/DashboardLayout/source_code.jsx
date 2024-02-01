const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 16px;
  padding: 32px;
  position: relative;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 728px) {
    padding-bottom: 140px;
  }
`;

const GridItem = ({ span, rowSpan, children, style }) => {
  const GridItemStyled = styled.div`
    background: #292a3d;
    border-radius: 8px;
    padding: 20px;
    color: #fff;
    grid-column: span ${span || 6};
    ${rowSpan && `grid-row: span ${rowSpan};`}
    @media (max-width: 1024px) {
      grid-column: 1;
      grid-row: auto;
    }
    @media (max-width: 768px) {
      grid-column: span ${2};
    }
  `;

  return <GridItemStyled style={style}>{children}</GridItemStyled>;
};

const BalanceDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  margin-top: 18px;
`;

const BalanceAmount = styled.div`
  font-size: 36px;
  font-weight: 500;
  line-height: 45px;
  letter-spacing: 0em;
  text-align: left;
`;

const SubAmount = styled.div`
  display: flex;
  align-items: flex-end;

  gap: 8px;
`;

const SubAmountText = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  color: #888baf;
`;

const SubArrow = styled.div`
  cursor: pointer;
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

const CircleDivider = (
  <svg
    width="6"
    height="6"
    viewBox="0 0 6 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle id="Ellipse 3" cx="2.00012" cy="2" r="2" fill="#00EC97" />
  </svg>
);

const ArrowPath = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="heroicons-mini/arrow-path-rounded-square">
      <path
        id="Vector (Stroke)"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 5.39998C13.4581 5.39998 14.9005 5.46578 16.3245 5.59455C16.7099 5.62939 17.0163 5.92715 17.0622 6.31119C17.2111 7.5564 17.3118 8.81659 17.3622 10.0899L15.3365 8.06365C14.985 7.71214 14.4152 7.71208 14.0637 8.06351C13.7122 8.41494 13.7121 8.98479 14.0635 9.3363L17.6626 12.9362C18.0141 13.2877 18.5839 13.2878 18.9354 12.9363L22.5363 9.33646C22.8878 8.98504 22.8879 8.41519 22.5365 8.06367C22.1851 7.71215 21.6152 7.71207 21.2637 8.06349L19.1662 10.1603C19.1159 8.79119 19.0096 7.43614 18.8495 6.09746C18.7026 4.86928 17.7184 3.91324 16.4866 3.80186C15.0088 3.66823 13.5122 3.59998 12 3.59998C10.4878 3.59998 8.99126 3.66823 7.51339 3.80186C6.28159 3.91324 5.2974 4.86928 5.15053 6.09746C5.07398 6.73754 5.00973 7.38138 4.95801 8.02871C4.91843 8.52419 5.288 8.95794 5.78348 8.99753C6.27895 9.03711 6.71271 8.66754 6.7523 8.17206C6.80213 7.54826 6.86404 6.92789 6.93779 6.31119C6.98372 5.92715 7.29017 5.62939 7.67548 5.59455C9.09954 5.46578 10.542 5.39998 12 5.39998ZM6.33737 11.064C5.98595 10.7125 5.41615 10.7124 5.06464 11.0638L1.46373 14.6635C1.11219 15.0149 1.11209 15.5847 1.46351 15.9363C1.81491 16.2878 2.38476 16.2879 2.7363 15.9365L4.83379 13.8397C4.88413 15.2088 4.99044 16.5638 5.15053 17.9025C5.2974 19.1307 6.28159 20.0867 7.51339 20.1981C8.99126 20.3317 10.4878 20.4 12 20.4C13.5122 20.4 15.0088 20.3317 16.4866 20.1981C17.7184 20.0867 18.7026 19.1307 18.8495 17.9025C18.9261 17.2619 18.9904 16.6176 19.0421 15.9697C19.0817 15.4742 18.7121 15.0405 18.2166 15.0009C17.7212 14.9614 17.2874 15.3309 17.2478 15.8264C17.198 16.4507 17.136 17.0716 17.0622 17.6888C17.0163 18.0728 16.7099 18.3706 16.3245 18.4054C14.9005 18.5342 13.4581 18.6 12 18.6C10.542 18.6 9.09954 18.5342 7.67548 18.4054C7.29017 18.3706 6.98372 18.0728 6.93779 17.6888C6.78889 16.4436 6.68824 15.1834 6.63779 13.9102L8.66357 15.9363C9.01501 16.2878 9.58486 16.2879 9.93636 15.9364C10.2879 15.585 10.2879 15.0151 9.93646 14.6636L6.33737 11.064Z"
        fill="#888BAF"
      />
    </g>
  </svg>
);

const WalletIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="react-icons/bi/BiWallet">
      <path
        id="Vector"
        d="M10.6665 8H11.9998V10.6667H10.6665V8Z"
        fill="#888BAF"
      />
      <path
        id="Vector_2"
        d="M13.3335 4.66667V3.33333C13.3335 2.598 12.7355 2 12.0002 2H3.3335C2.23083 2 1.3335 2.89733 1.3335 4V12C1.3335 13.4673 2.5295 14 3.3335 14H13.3335C14.0688 14 14.6668 13.402 14.6668 12.6667V6C14.6668 5.26467 14.0688 4.66667 13.3335 4.66667ZM3.3335 3.33333H12.0002V4.66667H3.3335C3.16184 4.65899 2.99977 4.5854 2.88101 4.46121C2.76226 4.33703 2.69598 4.17182 2.69598 4C2.69598 3.82818 2.76226 3.66297 2.88101 3.53879C2.99977 3.4146 3.16184 3.34101 3.3335 3.33333V3.33333ZM13.3335 12.6667H3.3415C3.0335 12.6587 2.66683 12.5367 2.66683 12V5.87667C2.87616 5.952 3.09816 6 3.3335 6H13.3335V12.6667Z"
        fill="#888BAF"
      />
    </g>
  </svg>
);

const ethImage =
  "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png";

const usdcImage =
  "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389";

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
  padding: 12px 0px 12px 0px;

  @media (max-width: 1024px) {
    padding: 24px 0px 12px 0px;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const InfoSection = styled.div`
  background: #292a3d;
  border-radius: 8px;
  color: white;
  margin-top: ${(props) => props.marginTop || 0}px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #333;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  color: #fff;
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 6px;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const ButtonContainerMobile = styled.div`
  display: none;
  gap: 6px;
  width: 100%;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    display: flex;
  }
`;

const Button = styled.button`
  background-color: ${(props) => props.bgColor || "#00EC97"};
  color: ${(props) => props.color || "#373a53"};
  width: ${(props) => props.width || "100%"};
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: ${(props) => props.marginTop || 0}px;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover,
  &:focus {
    opacity: 0.8;

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:last-child {
    margin-right: 0;
  }
`;

const GhostButton = styled.button`
  margin-top: ${(props) => props.marginTop || 0}px;
  width: ${(props) => props.width || "100%"};
  background-color: transparent;
  color: white;
  border: 1px solid white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.2s ease, opacity 0.2s ease;

  &:hover,
  &:focus {
    opacity: 0.8;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
  font-size: 16px;
  font-weight: 700;
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 12;
`;

const BalanceLabel = styled.span`
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;

  text-align: right;
  color: #fff;
`;

const BalanceValue = styled.span`
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: right;
  color: #888baf;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  flex-direction: column;
  margin-top: 24px;
`;

const InputLabel = styled.label`
  margin-right: 10px;
  color: #aaa;
  display: flex;
  align-self: flex-end;
  margin-top: 8px;
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

  font-size: 18px;
  font-weight: 700;
`;

const DropdownContainer = styled.div`
  position: relative;

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
const BorrowCapacityText = styled.span`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: right;
  color: #888baf;
`;

const LiquidationRiskBar = ({ riskPercent }) => {
  return (
    <ProgressBarContainer>
      <BorrowCapacityText> Borrow Capacity</BorrowCapacityText>
      <ProgressBarLimit>
        <RiskPercentage>{0}%</RiskPercentage>
        <BorrowLine
          style={{
            left: `calc(${90}% - 20px)`,
          }}
        />

        <ProgressBarFilled
          style={{
            width: `${riskPercent}%`,
            backgroundColor: riskPercent >= 90 && "red",
          }}
        />

        <RiskPercentage style={{ left: `calc(${riskPercent}% - 20px)` }}>
          {riskPercent}%
        </RiskPercentage>
        {riskPercent <= 85 && (
          <RiskPercentage style={{ left: `calc(${90}% - 30px)` }}>
            {90}%
          </RiskPercentage>
        )}
      </ProgressBarLimit>
    </ProgressBarContainer>
  );
};

const ProgressBarContainer = styled.div`
  width: calc(100% - 16px);
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  padding-bottom: 12px;
`;

const ProgressBarLimit = styled.div`
  height: 20px;
  border-radius: 4px;
  background-color: #888baf;
  width: 100%;
  position: relative;
`;

const ProgressBarFilled = styled.div`
  height: 100%;
  background-color: #00ec97;
  border-radius: 4px;
  transition: width 0.3s ease-in-out;
`;

const ProgressBarFilledLimit = styled.div`
  height: 100%;

  border-radius: 4px;
  transition: width 0.3s ease-in-out;
`;

const RiskPercentage = styled.span`
  position: absolute;
  bottom: -22px;
  color: #888baf;
  transition: left 0.3s ease-in-out;
`;

const BorrowLine = styled.div`
  position: absolute;

  color: #fff;
  transition: left 0.3s ease-in-out;

  border-radius: 4px;
  width: 4px;
  height: 100%;
  background-color: #fff;
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

const CryptoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  position: relative;
`;

const CryptoPairIcon = styled.div`
  position: relative;
  align-items: center;
`;

const CryptoIcon = styled.img`
  width: 48px;
  height: 48px;
  position: relative;
  z-index: 2;
`;

const OverlappingCryptoIcon = styled.img`
  width: 48px;
  height: 48px;
  margin-left: -12px;
`;

const CryptoLabel = styled.div`
  margin-left: 8px;
  font-size: 16px;
  color: ${(props) => props.color || "#FFF"};
`;

const CryptoCurrencyPair = () => {
  return (
    <CryptoContainer>
      <CryptoPairIcon>
        <CryptoIcon src={ethImage} alt="Ethereum" />
        <OverlappingCryptoIcon src={usdcImage} alt="USDC" />
      </CryptoPairIcon>
      <CryptoLabel>USDC</CryptoLabel>
      <CryptoLabel color="#888baf">Ethereum</CryptoLabel>
    </CryptoContainer>
  );
};

// NetworkDropdown component
const NetworkDropdown = ({ selectedNetwork, onChange }) => {
  return (
    <DropdownContainer>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <DropdownTrigger>
            <SectionHeader>NETWORK</SectionHeader>
            <ArrowIcon />
          </DropdownTrigger>
        </DropdownMenu.Trigger>
        <CryptoCurrencyPair />
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

const InterestContainer = styled.div`
  margin-top: 4;
  font-size: 14;
  font-weight: 600;
`;
const InterestText = styled.span`
  margin-left: 2;
  color: #888baf;
  font-size: 14;
  font-weight: 600;
`;

const AprProgressBar = ({ barPercent }) => {
  return (
    <ProgressBarContainer>
      <ProgressBarAprContainer>
        <ProgressBarApr width={barPercent} />

        <InterestContainer>
          13,5%
          <InterestText>Interest</InterestText>
        </InterestContainer>
      </ProgressBarAprContainer>
      <ProgressBarBorrowContainer>
        <ProgressBarBorrow />
        <BorrowText> 3.09%</BorrowText>
      </ProgressBarBorrowContainer>
    </ProgressBarContainer>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 48px;
  height: 48px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

const SubLabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SubLabel = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #888baf;
`;

const Value = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-left: 4px;
  color: #888baf;
`;

const SmallIcon = styled.div`
  width: 16px;
  height: 16px;
  margin-left: 4px;
  display: flex;
  align-items: center;
  margin-bottom: 2px;
`;
const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
  margin-right: 4px;
`;

const CollateralItemComponent = ({ item }) => (
  <Container>
    <Icon src={usdcImage} alt="ETH" />

    <InfoContainer>
      <CollateralLabel>{item.label}</CollateralLabel>

      <SubLabelContainer>
        <SubLabel>{item.subLabel}</SubLabel>
        <CenterContainer>{CircleDivider}</CenterContainer>
        <Value>{item.value}</Value>
        <SmallIcon>{WalletIcon}</SmallIcon>
      </SubLabelContainer>
    </InfoContainer>
  </Container>
);

const collateralItems = [
  { label: "Ethereum", subLabel: "ETH", value: "28.00" },
  { label: "Ethereum", subLabel: "ETH", value: "28.00" },
  { label: "Ethereum", subLabel: "ETH", value: "28.00" },
  { label: "Ethereum", subLabel: "ETH", value: "28.00" },
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

const abi = fetch(
  "https://docs.compound.finance/public/files/comet-interface-abi-98f438b.json"
);

if (!abi) return "Loading...";

const contractInfo = {
  network: "Polygon Mainnet",
  address: "0xF25212E676D1F7F89Cd72fFEe66158f541246445",
  chainId: 137,
  httpRpcUrl: "https://polygon-rpc.com/",
  borrowAssetCoingeckoId: "usdc",
};

const { address } = props;

// //TODO: Na mainnet está com problema De promise not supported
// const balancesPromise = new Promise((resolve, reject) => {
//   const rpcProvider = new ethers.providers.JsonRpcProvider(
//     contractInfo.httpRpcUrl
//   );

//   const contract = new ethers.Contract(
//     contractInfo.address,
//     abi.body,
//     rpcProvider
//   );

//   contract
//     .balanceOf(address)
//     .then((res) => {
//       return Promise.all([res, contract.decimals()]);
//     })
//     .then(([balance, decimals]) => {
//       const formattedBalance = ethers.utils.formatUnits(balance, decimals);
//       return Ethers.provider()
//         .getBalance(address)
//         .then((ethBalance) => {
//           return { formattedBalance, assetBalance: balance, ethBalance };
//         });
//     })
//     .then(({ formattedBalance, assetBalance, ethBalance }) => {
//       const balanceInEth = Big(ethBalance).div(Big(10).pow(18)).toFixed(2);
//       State.update({
//         formattedBalance: formattedBalance,
//         assetBalance: assetBalance,
//         balance: balanceInEth,
//       });
//       resolve();
//     })
//     .catch((error) => {
//       reject(error);
//     });
// });

const withdrawToContract = (address, amount) => {
  const contract = new ethers.Contract(
    contractInfo.address,
    abi.body,
    Ethers.provider().getSigner()
  );
  console.log("aquii");
  contract
    .withdraw(address, state.assetBalance)
    .then((tx) => {
      console.log(`Transaction submitted: ${tx.hash}`);
      // Wait for the transaction to be mined
      return tx.wait();
    })
    .then((receipt) => {
      console.log(`Transaction confirmed: ${receipt.transactionHash}`);
      // Update state or UI as needed
      State.update({ lastTransactionHash: receipt.transactionHash });
    })
    .catch((error) => {
      console.error(`Transaction failed: ${error.message}`);
    });
  console.log("finalizou");
};

const supplyToContract = (address, amount) => {
  const contract = new ethers.Contract(
    contractInfo.address,
    abi.body,
    Ethers.provider().getSigner()
  );
  console.log("aquii");
  contract
    .supply(address, amount)
    .then((tx) => {
      console.log(`Transaction submitted: ${tx.hash}`);

      return tx.wait();
    })
    .then((receipt) => {
      console.log(`Transaction confirmed: ${receipt.transactionHash}`);

      State.update({ lastTransactionHash: receipt.transactionHash });
      //TODO: Temos que descobrir como atualizar o balanço sem quebrar o componente.
    })
    .catch((error) => {
      console.error(`Transaction failed: ${error.message}`);
    });
};

return (
  <GridContainer key={address + Math.random()}>
    {/* Network dropdown and liquidation risk section */}

    <GridItem span={3}>
      <NetworkDropdown
        selectedNetwork={selectedNetwork}
        onChange={handleNetworkChange}
      />
    </GridItem>
    <GridItem span={9}>
      <SectionHeader>Liquidation Risk</SectionHeader>
      <LiquidationRiskBar riskPercent={40} />
    </GridItem>
    {/* Balance Section */}

    <GridItem span={4}>
      <SectionHeader>Balance</SectionHeader>
      <BalanceDisplay>
        <img src={usdcImage} style={{ width: 48, height: 48 }} alt="ETH" />
        <BalanceAmount>
          {state.formattedBalance ? state.formattedBalance : 0}
        </BalanceAmount>
      </BalanceDisplay>
      <SubAmount>
        <SubAmountText>124.000 USD</SubAmountText>
        <SubArrow> {ArrowPath}</SubArrow>
      </SubAmount>
      <GhostButton
        marginTop={24}
        disabled={state.formattedBalance && state.formattedBalance === 0}
        onClick={() => {
          withdrawToContract(
            "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
            10000
          );
        }}
      >
        Withdraw
      </GhostButton>
    </GridItem>

    {/* Supply USDC Section */}
    <GridItem span={4}>
      <SectionHeader>Supply USDC</SectionHeader>
      <InputGroup>
        <InputField id="supply-input" placeholder="0.00" />

        <InputLabel htmlFor="supply-input">
          Wallet Balance: 1111 USDC
        </InputLabel>
        <Button
          marginTop={24}
          onClick={() =>
            supplyToContract(
              "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
              10000
            )
          }
        >
          SUPPLY
        </Button>
      </InputGroup>
    </GridItem>

    {/* Borrow USDC Section */}
    <GridItem span={4}>
      <SectionHeader>Borrow USDC</SectionHeader>
      <InputGroup>
        <InputField id="borrow-input" placeholder="0.00" />
        <InputLabel htmlFor="borrow-input">Available: 11111 USDC</InputLabel>
        <Button marginTop={24} color="#FFF" bgColor="#AA00FA">
          BORROW
        </Button>
      </InputGroup>
    </GridItem>

    {/* Net Borrow APR Section */}

    {/* Collateral Section */}
    <GridItem span={6} rowSpan={collateralRowSpan}>
      <SectionHeader>Collateral</SectionHeader>
      {collateralItems.map((item, index) => (
        <div key={index}>
          <CollateralItem>
            <CollateralItemComponent item={item} />
            <ActionGroup>
              <ActionContainer>
                <BalanceLabel>1.000</BalanceLabel>
                <BalanceValue>0.7900</BalanceValue>
              </ActionContainer>
              <ButtonContainer>
                <Button width={65}>Supply</Button>
                <GhostButton width={80}>Withdraw</GhostButton>
              </ButtonContainer>
            </ActionGroup>
          </CollateralItem>
          <ButtonContainerMobile>
            <Button width="100%">Supply</Button>
            <GhostButton width="100%">Withdraw</GhostButton>
          </ButtonContainerMobile>
        </div>
      ))}
    </GridItem>
    <GridItem span={3}>
      <SectionHeader>Net Borrow APR</SectionHeader>
      <InfoSection marginTop={12}>
        <InfoRow>
          <InfoLabel>APR</InfoLabel>
          <InfoValue>0.7900</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Fee</InfoLabel>
          <InfoValue>0.0000</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Interest</InfoLabel>
          <InfoValue>0.5100</InfoValue>
        </InfoRow>
      </InfoSection>
    </GridItem>
    <GridItem span={3}>
      <SectionHeader>Net Supply APR</SectionHeader>
      <InfoSection marginTop={12}>
        <InfoRow>
          <InfoLabel>APR</InfoLabel>
          <InfoValue>0.7900</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Fee</InfoLabel>
          <InfoValue>0.0000</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Interest</InfoLabel>
          <InfoValue>0.5100</InfoValue>
        </InfoRow>
      </InfoSection>
    </GridItem>
    <GridItem span={6} style={{ maxHeight: "220px" }} rowSpan={2}>
      <CollateralInfo />
    </GridItem>
  </GridContainer>
);
