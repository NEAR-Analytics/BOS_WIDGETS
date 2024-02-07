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
  margin-top: 48px;
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
  color: #888baf;
`;

const InfoSectionModal = styled.div`
  background: #292a3d;
  border-radius: 8px;
  width: 60%;
  padding: 24px;
  color: white;
  margin-top: ${(props) => props.marginTop || 0}px;
`;

const CollateralInfoModal = () => (
  <InfoSectionModal>
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
  </InfoSectionModal>
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
  align-items: center;
  justify-content: center;
  align-self: center;

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
  font-size: 16px;
  font-weight: 600;

  text-align: center;

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
  font-size: 16px;
  font-weight: 600;

  text-align: center;

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
  margin-right: 10px;
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
  color: #888baf;
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

const SectionSubHeader = styled.span`
  color: #888baf;
  margin-top: 24px;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const DropdownContainer = styled.div`
  position: relative;
  z-index: 9999;
  .DropdownMenuItem {
    border-radius: 24px;
    background: #373a53;
    padding: 16px;
    width: 19vw;

    @media (max-width: 1680px) {
      min-width: 24vw;
    }

    @media (max-width: 1440px) {
      min-width: 28vw;
    }

    @media (max-width: 1380px) {
      min-width: 25vw;
    }
    @media (max-width: 1200px) {
      min-width: 30vw;
    }

    @media (max-width: 1024px) {
      min-width: min-content;
    }

    @media (max-width: 728px) {
      min-width: min-content;
    }
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
        <CryptoIcon src={selectedItem.networkImage} alt="Ethereum" />
        <OverlappingCryptoIcon src={selectedItem.image} alt="USDC" />
      </CryptoPairIcon>
      <CryptoLabel>{selectedItem.name}</CryptoLabel>
      <CryptoLabel color="#888baf">{selectedItem.network}</CryptoLabel>
    </CryptoContainer>
  );
};

const NetworkDropdown = ({}) => {
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
        <DropdownMenu.Content sideOffset={5}>
          <DropdownMenu.Item className="DropdownMenuItem">
            <Widget
              props={{
                updateSelectedItem: updateSelectedItem,
                selectedItem: selectedItem,
              }}
              src="thalesb.near/widget/NetworkDropdown"
            />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </DropdownContainer>
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

const CollateralItemComponent = ({ item, balance }) => (
  <Container>
    <Icon src={item.image} alt="coin image" />

    <InfoContainer>
      <CollateralLabel>{item.name}</CollateralLabel>

      <SubLabelContainer>
        <SubLabel>{item.subLabel}</SubLabel>
        <CenterContainer>{CircleDivider}</CenterContainer>
        <Value>{balance ? balance : "0.00"}</Value>
        <SmallIcon>{WalletIcon}</SmallIcon>
      </SubLabelContainer>
    </InfoContainer>
  </Container>
);

const ContainerModal = styled.div`
  width: 100%;

  .DialogOverlay {
    background: #000000b2;
    position: fixed;
    inset: 0;
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .DialogContent {
    background-color: #1e202f;
    z-index: 999;
    border-radius: 6px;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
      hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 860px;
    max-height: 85vh;
    padding: 25px;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .DialogContent:focus {
    outline: none;
  }

  .DialogTitle {
    margin: 0;
    font-weight: 500;
    color: var(--mauve-12);
    font-size: 17px;
  }

  .DialogDescription {
    margin: 10px 0 20px;
    color: var(--mauve-11);
    font-size: 15px;
    line-height: 1.5;
  }

  .Button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 0 15px;
    font-size: 15px;
    line-height: 1;
    font-weight: 500;
    height: 35px;
  }
  .Button.violet {
    background-color: white;
    color: var(--violet-11);
    box-shadow: 0 2px 10px var(--black-a7);
  }
  .Button.violet:hover {
    background-color: var(--mauve-3);
  }
  .Button.violet:focus {
    box-shadow: 0 0 0 2px black;
  }
  .Button.green {
    background-color: var(--green-4);
    color: var(--green-11);
  }
  .Button.green:hover {
    background-color: var(--green-5);
  }
  .Button.green:focus {
    box-shadow: 0 0 0 2px var(--green-7);
  }

  .IconButton {
    border-radius: 100%;
    height: 25px;
    width: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .Fieldset {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 15px;
  }

  .Label {
    font-size: 15px;
    color: var(--violet-11);
    width: 90px;
    text-align: right;
  }

  .Input {
    width: 100%;
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 0 10px;
    font-size: 15px;
    line-height: 1;
    color: var(--violet-11);
    box-shadow: 0 0 0 1px var(--violet-7);
    height: 35px;
  }
  .Input:focus {
    box-shadow: 0 0 0 2px var(--violet-8);
  }

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const { address, addToast, selectedItem, updateSelectedItem, ethPrice } = props;

const { contractInfo, collateralItems } = selectedItem;

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

const abiBulk = fetch(
  "https://raw.githubusercontent.com/ThalesBMC/bulk-api/main/BulkAbi.json"
);

if (!abi) return "Loading...";

const balancesPromise = new Promise((resolve, reject) => {
  const rpcProvider = new ethers.providers.JsonRpcProvider(
    contractInfo.httpRpcUrl
  );

  const contract = new ethers.Contract(
    contractInfo.address,
    abi.body,
    rpcProvider
  );
  const newContract = new ethers.Contract(
    selectedItem.address,
    abi.body,
    rpcProvider
  );

  function fetchBalancesForCollateralItem(item) {
    if (item.isBaseAsset) {
      // For the base asset, fetch the native balance directly from the network
      return rpcProvider.getBalance(address).then((nativeBalance) => {
        const formattedNativeBalance = ethers.utils.formatUnits(
          nativeBalance,
          "ether"
        );
        return contract
          .collateralBalanceOf(address, item.address)
          .then((collateralBalance) => {
            const formattedCollateralBalance = ethers.utils.formatUnits(
              collateralBalance,
              item.decimals
            );

            // Return the object with both balances after fetching the collateral balance
            return {
              name: item.name,
              tokenBalance: formattedNativeBalance,
              collateralBalance: formattedCollateralBalance,
            };
          });
      });
    } else {
      const collateralContract = new ethers.Contract(
        item.address,
        abi.body,
        rpcProvider
      );

      return Promise.all([
        collateralContract.balanceOf(address),
        contract.collateralBalanceOf(address, item.address),
      ]).then(([tokenBalance, collateralBalance]) => {
        const formattedTokenBalance = ethers.utils.formatUnits(
          tokenBalance,
          item.decimals
        );
        const formattedCollateralBalance = ethers.utils.formatUnits(
          collateralBalance,
          item.decimals
        );

        return {
          name: item.name,
          tokenBalance: formattedTokenBalance,
          collateralBalance: formattedCollateralBalance,
        };
      });
    }
  }

  contract
    .balanceOf(address)
    .then((balance) =>
      Promise.all([
        balance,
        contract.decimals(),
        // Fetch balances for all collateral items
        Promise.all(
          collateralItems.map((item) => fetchBalancesForCollateralItem(item))
        ),
      ])
    )
    .then(([balance, decimals, collateralBalances]) => {
      const formattedBalance = ethers.utils.formatUnits(balance, decimals);

      return Promise.all([
        selectedItem.isBaseAsset
          ? rpcProvider.getBalance(address)
          : newContract.balanceOf(address),
        newContract.decimals(),
      ]).then(([newBalance, newDecimals]) => {
        let supplyBalanceFormatted;
        if (selectedItem.isBaseAsset) {
          supplyBalanceFormatted = ethers.utils.formatUnits(
            newBalance,
            "ether"
          );
        } else {
          supplyBalanceFormatted = ethers.utils.formatUnits(
            newBalance,
            newDecimals
          );
        }

        return {
          formattedBalance,
          assetBalance: balance,
          supplyBalance: supplyBalanceFormatted,
          unformattedSupplyBalance: newBalance,
          collateralBalances,
        };
      });
    })
    .then((result) => {
      // Update the state with all balances
      State.update({
        ...result,
      });
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
});

const withdrawToContract = (assetAddress, amount, decimals, isBaseAsset) => {
  const contractProxyAllowance = new ethers.Contract(
    contractInfo.address,
    abi.body,
    Ethers.provider().getSigner()
  );

  // If isBaseAsset is true, check and potentially set allowance before withdrawing
  if (isBaseAsset) {
    const comet = contractInfo.address; // Comet contract address
    const to = address; // recipient's actual address
    const amountData = ethers.utils.parseEther(amount.toString());
    const abiCoder = new ethers.utils.AbiCoder();

    // Encode the transaction data
    const data = abiCoder.encode(
      ["address", "address", "uint"],
      [comet, to, amountData]
    );
    const actionsEncoded = [
      ethers.utils.formatBytes32String("ACTION_WITHDRAW_NATIVE_TOKEN"),
    ];
    const dataArr = [data];

    const contractBulk = new ethers.Contract(
      selectedItem.bulkerAddress,
      abiBulk.body,
      Ethers.provider().getSigner()
    );

    // Function to execute the .invoke call
    const executeInvoke = () => {
      console.log(dataArr, " initiating invoke");
      contractBulk
        .invoke(actionsEncoded, dataArr, { value: amountData })
        .then((tx) => {
          console.log("Transaction hash:", tx.hash);
          return tx.wait(); // Wait for the transaction to be mined
        })
        .then((receipt) => {
          State.update({
            lastTransactionHash: receipt.transactionHash,
          });
          console.log("Transaction successful with receipt:", receipt);
        })
        .catch((error) => {
          addToast(`Transaction failed: ${error.message}`, "error");
          console.error("Transaction failed:", error);
        });
    };

    // Initial promise to handle allowance logic
    contractProxyAllowance
      .isAllowed(address, selectedItem.bulkerAddress)
      .then((isAllowed) => {
        if (!isAllowed) {
          console.log("Need to call allow");
          addToast(`Please approve the contract and wait`, "warning");

          return contractProxyAllowance
            .allow(selectedItem.bulkerAddress, true)
            .then((tx) => {
              console.log(`Allowance transaction hash: ${tx.hash}`);
              addToast(`Transaction submitted: ${tx.hash}`, "success");

              return tx.wait().then((receipt) => {
                addToast(
                  `Approval confirmed: ${receipt.transactionHash}`,
                  "success"
                );

                console.log(
                  `Allowance transaction confirmed with receipt: ${receipt.transactionHash}`
                );
                // After allowance is set, execute the .invoke call
                executeInvoke();
              });
            });
        } else {
          console.log("Allowance already set, no need to call allow");
          // Allowance is already set, directly execute the .invoke call
          executeInvoke();
        }
      })
      .catch((error) => {
        addToast(`Transaction failed: ${error.message}`, "error");
        console.error("Transaction failed:", error);
      });
  } else {
    const adjustedAmount = ethers.utils.parseUnits(amount.toString(), decimals);
    const contract = new ethers.Contract(
      contractInfo.address,
      abi.body,
      Ethers.provider().getSigner()
    );
    contract
      .withdraw(assetAddress, adjustedAmount)
      .then((tx) => {
        console.log(`Transaction submitted: ${tx.hash}`);
        addToast(`Transaction submitted: ${tx.hash}`, "success");

        State.update({ loadingWithdraw: true });
        return tx.wait();
      })
      .then((receipt) => {
        console.log(`Transaction confirmed: ${receipt.transactionHash}`);

        State.update({
          lastTransactionHash: receipt.transactionHash,
          loadingWithdraw: false,
        });
        addToast("Withdrawal successful", "success");
      })
      .catch((error) => {
        addToast(`Transaction failed: ${error.message}`, "error");
        console.error(`Transaction failed: ${error.message}`);
        // Optionally update state to reflect error
        State.update({ loadingWithdraw: false });
      });
  }
};

function checkAllowanceAndSupply(
  assetAddress,
  amount,
  decimals,
  isBaseAsset,
  isCollateral
) {
  const contractProxyAllowance = new ethers.Contract(
    contractInfo.address,
    abi.body,
    Ethers.provider().getSigner()
  );

  const MaxUint256 = ethers.BigNumber.from(
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  );

  if (isBaseAsset) {
    const comet = contractInfo.address; // Comet contract address
    const to = address; // Recipient's actual address
    const amountData = ethers.utils.parseEther(amount.toString());
    const abiCoder = new ethers.utils.AbiCoder();

    // Encode the transaction data
    const data = abiCoder.encode(
      ["address", "address", "uint"],
      [comet, to, amountData]
    );
    const actionsEncoded = [
      ethers.utils.formatBytes32String("ACTION_SUPPLY_NATIVE_TOKEN"),
    ];
    const dataArr = [data];

    const contractBulk = new ethers.Contract(
      selectedItem.bulkerAddress,
      abiBulk.body,
      Ethers.provider().getSigner()
    );

    // Function to execute the .invoke call
    const executeInvoke = () => {
      console.log(dataArr, " initiating invoke");
      contractBulk
        .invoke(actionsEncoded, dataArr, { value: amountData })
        .then((tx) => {
          console.log("Transaction hash:", tx.hash);
          return tx.wait(); // Wait for the transaction to be mined
        })
        .then((receipt) => {
          State.update({
            lastTransactionHash: receipt.transactionHash,
          });
          console.log("Transaction successful with receipt:", receipt);
        })
        .catch((error) => {
          addToast(`Transaction failed: ${error.message}`, "error");
          console.error("Transaction failed:", error);
        });
    };

    // Initial promise to handle allowance logic
    contractProxyAllowance
      .isAllowed(address, selectedItem.bulkerAddress)
      .then((isAllowed) => {
        if (!isAllowed) {
          console.log("Need to call allow");
          addToast(`Please approve the contract`, "warning");

          return contractProxyAllowance
            .allow(selectedItem.bulkerAddress, true)
            .then((tx) => {
              console.log(`Allowance transaction hash: ${tx.hash}`);
              addToast(`Transaction submitted: ${tx.hash}`, "success");
              return tx.wait().then((receipt) => {
                addToast(
                  `Approval confirmed: ${receipt.transactionHash}`,
                  "success"
                );

                console.log(
                  `Allowance transaction confirmed with receipt: ${receipt.transactionHash}`
                );
                // After allowance is set, execute the .invoke call
                executeInvoke();
              });
            });
        } else {
          console.log("Allowance already set, no need to call allow");
          // Allowance is already set, directly execute the .invoke call
          executeInvoke();
        }
      })
      .catch((error) => {
        addToast(`Transaction failed: ${error.message}`, "error");
        console.error("Transaction failed:", error);
      });
  } else {
    const contract = new ethers.Contract(
      assetAddress,
      abi.body,
      Ethers.provider().getSigner()
    );

    contract
      .allowance(address, contractInfo.address)
      .then((allowance) => {
        console.log(`Current allowance: ${allowance}`);
        if (allowance.eq(0)) {
          console.log("Approving...");
          addToast(`Please approve the contract`, "warning");

          return contract
            .approve(contractInfo.address, MaxUint256)
            .then((approvalTx) => {
              console.log(`Approval transaction hash: ${approvalTx.hash}`);
              addToast(`Transaction submitted: ${approvalTx.hash}`, "success");
              return approvalTx.wait(); // Wait for the transaction to be mined
            })
            .then((approvalResult) => {
              console.log(
                `Approval confirmed: ${approvalResult.transactionHash}`
              );
              addToast(
                `Approval confirmed: ${approvalResult.transactionHash}`,
                "success"
              );
            })
            .catch((error) => {
              addToast(`Approval failed: ${error.message}`, "error");
              console.error(`Approval failed: ${error.message}`);
              throw new Error("Approval failed, cannot proceed to supply.");
            });
        } else {
          return Promise.resolve(); // Resolve immediately if allowance is sufficient
        }
      })
      .then(() => {
        // Proceed with supply operation
        return supplyToContract(assetAddress, amount, decimals, isCollateral);
      })
      .catch((error) => {
        addToast(`Error during supply operation: ${error.message}`, "error");
        console.error(`Error during supply operation: ${error.message}`);
      });
  }
}

//TODO: possivelmente temos que remover os update de loading
// Porque ele nao esta funcionando mais, temos que descobrir
// alguma forma de mostrar loading na tela... ou so remover por inteiro.
const supplyToContract = (address, amount, decimals, isCollateral) => {
  const contract = new ethers.Contract(
    contractInfo.address,
    abi.body,
    Ethers.provider().getSigner()
  );
  console.log("salveee clan", amount, decimals);

  const adjustedAmount = ethers.utils.parseUnits(amount.toString(), decimals);

  contract
    .supply(address, adjustedAmount)
    .then((tx) => {
      console.log(`Transaction submitted: ${tx.hash}`);
      addToast(`Transaction submitted: ${tx.hash}`, "success");
      if (isCollateral) {
        State.update({ loadingSupplyCollateral: true });
      } else {
        State.update({ loadingSupply: true });
      }
      return tx.wait();
    })
    .then((receipt) => {
      console.log(`Transaction confirmed: ${receipt.transactionHash}`);
      addToast("Supply successful", "success");
      State.update({
        lastTransactionHash: receipt.transactionHash,
        loadingSupply: false,
      });
    })
    .catch((error) => {
      addToast(`Transaction failed: ${error.message}`, "error");
      console.error(`Transaction failed: ${error.message}`);
    });
};

return (
  <GridContainer key={address + Math.random()}>
    {/* Network dropdown and liquidation risk section */}

    <GridItem span={4}>
      <NetworkDropdown
        selectedNetwork={selectedNetwork}
        onChange={handleNetworkChange}
      />
    </GridItem>
    <GridItem span={8}>
      <SectionHeader>Liquidation Risk</SectionHeader>
      <LiquidationRiskBar riskPercent={40} />
    </GridItem>
    {/* Balance Section */}

    <GridItem span={4}>
      <SectionHeader>Balance</SectionHeader>
      <BalanceDisplay>
        <img
          src={selectedItem.image}
          style={{ width: 48, height: 48 }}
          alt="ETH"
        />
        <BalanceAmount>
          {state.formattedBalance ? state.formattedBalance.slice(0, 8) : 0}
        </BalanceAmount>
      </BalanceDisplay>
      <SubAmount></SubAmount>
      <ContainerModal>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <GhostButton
              marginTop={45}
              disabled={
                !state.formattedBalance ||
                state.formattedBalance === "0.0" ||
                state.loadingWithdraw
              }
            >
              {state.loadingWithdraw ? "Loading..." : "Withdraw"}
            </GhostButton>
          </Dialog.Trigger>

          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">
              Withdraw {selectedItem.name}
            </Dialog.Title>
            <div style={{ display: "flex", flexDirection: "row", gap: 24 }}>
              <Widget
                props={{
                  onConfirm: withdrawToContract,
                  balance: state.formattedBalance,
                  loading: state.loadingWithdraw,
                  selectedItem: selectedItem,
                  decimals: selectedItem.decimals,
                  address: selectedItem.address,
                  isBaseAsset: selectedItem.isBaseAsset,
                  type: "withdraw",
                }}
                src="thalesb.near/widget/Input"
              />
              <Widget
                src="thalesb.near/widget/PositionInfo"
                props={{
                  cometAddress: selectedItem.contractInfo.address,
                  baseAddress: selectedItem.address,
                }}
              />
            </div>
            <Dialog.Close asChild>
              <div className="IconButton" aria-label="Close">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Essential icons/X-mark">
                    <path
                      id="Union"
                      d="M7.5364 6.2636C7.18492 5.91213 6.61508 5.91213 6.2636 6.2636C5.91213 6.61508 5.91213 7.18492 6.2636 7.5364L10.7272 12L6.2636 16.4636C5.91213 16.8151 5.91213 17.3849 6.2636 17.7364C6.61508 18.0879 7.18492 18.0879 7.5364 17.7364L12 13.2728L16.4636 17.7364C16.8151 18.0879 17.3849 18.0879 17.7364 17.7364C18.0879 17.3849 18.0879 16.8151 17.7364 16.4636L13.2728 12L17.7364 7.5364C18.0879 7.18492 18.0879 6.61508 17.7364 6.2636C17.3849 5.91213 16.8151 5.91213 16.4636 6.2636L12 10.7272L7.5364 6.2636Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Root>
      </ContainerModal>
    </GridItem>

    {/* Supply USDC Section */}
    <GridItem span={4}>
      <SectionHeader>Supply {selectedItem.name}</SectionHeader>
      <Widget
        props={{
          onConfirm: checkAllowanceAndSupply,
          decimals: selectedItem.decimals,
          address: selectedItem.address,
          balance: state.supplyBalance,
          type: "supply",
          loading: state.loadingSupply,
          selectedItem: selectedItem,
          isBaseAsset: selectedItem.isBaseAsset,
        }}
        src="thalesb.near/widget/Input"
      />
    </GridItem>

    {/* Borrow USDC Section */}
    <GridItem span={4}>
      <SectionHeader>Borrow {selectedItem.name}</SectionHeader>
      <Widget
        props={{
          // onConfirm: supplyToContract,
          decimals: selectedItem.decimals,
          // balance: 0,
          selectedItem: selectedItem,
          type: "borrow",
          addToast: addToast,
          // loading: state.loadingSupply,
        }}
        src="thalesb.near/widget/Borrow"
      />
    </GridItem>

    {/* Net Borrow APR Section */}

    {/* Collateral Section */}
    <GridItem span={6} rowSpan={collateralRowSpan}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <SectionHeader>Collateral</SectionHeader>
        <SectionSubHeader>Asset</SectionSubHeader>
      </div>
      {collateralItems.map((item, index) => (
        <div key={index}>
          <CollateralItem>
            <CollateralItemComponent
              item={item}
              balance={
                state.collateralBalances && state.collateralBalances[index]
                  ? state.collateralBalances[index].tokenBalance.slice(0, 6)
                  : "0.00"
              }
            />
            <ActionGroup>
              <ActionContainer>
                <BalanceLabel>
                  {state.collateralBalances && state.collateralBalances[index]
                    ? state.collateralBalances[index].collateralBalance.slice(
                        0,
                        6
                      )
                    : "0.00"}
                </BalanceLabel>
                {/* <BalanceValue>0.7900</BalanceValue> */}
              </ActionContainer>
              <ButtonContainer>
                <ContainerModal>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <Button
                        disabled={
                          !state.collateralBalances ||
                          state.collateralBalances[index].tokenBalance ===
                            "0.0" ||
                          state.loadingSupplyCollateral
                        }
                      >
                        {state.loadingSupplyCollateral
                          ? "Loading..."
                          : "Supply"}
                      </Button>
                    </Dialog.Trigger>

                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent">
                      <Dialog.Title className="DialogTitle">
                        Supply {item.name}
                      </Dialog.Title>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",

                          gap: 24,
                        }}
                      >
                        <Widget
                          props={{
                            onConfirm: checkAllowanceAndSupply,
                            decimals: item.decimals,
                            address: item.address,
                            loading: state.loadingSupplyCollateral,
                            selectedItem: item,
                            balance:
                              state.collateralBalances &&
                              state.collateralBalances[index].tokenBalance,
                            type: "supply",
                            isBaseAsset: item.isBaseAsset,
                            isCollateral,
                          }}
                          src="thalesb.near/widget/Input"
                        />
                        <CollateralInfoModal />
                      </div>
                      <Dialog.Close asChild>
                        <div className="IconButton" aria-label="Close">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="Essential icons/X-mark">
                              <path
                                id="Union"
                                d="M7.5364 6.2636C7.18492 5.91213 6.61508 5.91213 6.2636 6.2636C5.91213 6.61508 5.91213 7.18492 6.2636 7.5364L10.7272 12L6.2636 16.4636C5.91213 16.8151 5.91213 17.3849 6.2636 17.7364C6.61508 18.0879 7.18492 18.0879 7.5364 17.7364L12 13.2728L16.4636 17.7364C16.8151 18.0879 17.3849 18.0879 17.7364 17.7364C18.0879 17.3849 18.0879 16.8151 17.7364 16.4636L13.2728 12L17.7364 7.5364C18.0879 7.18492 18.0879 6.61508 17.7364 6.2636C17.3849 5.91213 16.8151 5.91213 16.4636 6.2636L12 10.7272L7.5364 6.2636Z"
                                fill="white"
                              />
                            </g>
                          </svg>
                        </div>
                      </Dialog.Close>
                    </Dialog.Content>
                  </Dialog.Root>
                </ContainerModal>
                <ContainerModal>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <GhostButton
                        disabled={
                          !state.collateralBalances ||
                          state.collateralBalances[index].collateralBalance ===
                            "0.0" ||
                          state.loadingWithdrawCollateral
                        }
                      >
                        {state.loadingWithdraw ? "Loading..." : "Withdraw"}
                      </GhostButton>
                    </Dialog.Trigger>

                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent">
                      <Dialog.Title className="DialogTitle">
                        Supply {item.name}
                      </Dialog.Title>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 24,
                        }}
                      >
                        <Widget
                          props={{
                            onConfirm: withdrawToContract,
                            address: item.address,
                            selectedItem: item,
                            balance:
                              state.collateralBalances &&
                              state.collateralBalances[index].collateralBalance,
                            loading: state.loadingWithdrawCollateral,
                            type: "withdraw",
                            isBaseAsset: item.isBaseAsset,
                          }}
                          src="thalesb.near/widget/Input"
                        />
                        <CollateralInfoModal />
                      </div>
                      <Dialog.Close asChild>
                        <div className="IconButton" aria-label="Close">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="Essential icons/X-mark">
                              <path
                                id="Union"
                                d="M7.5364 6.2636C7.18492 5.91213 6.61508 5.91213 6.2636 6.2636C5.91213 6.61508 5.91213 7.18492 6.2636 7.5364L10.7272 12L6.2636 16.4636C5.91213 16.8151 5.91213 17.3849 6.2636 17.7364C6.61508 18.0879 7.18492 18.0879 7.5364 17.7364L12 13.2728L16.4636 17.7364C16.8151 18.0879 17.3849 18.0879 17.7364 17.7364C18.0879 17.3849 18.0879 16.8151 17.7364 16.4636L13.2728 12L17.7364 7.5364C18.0879 7.18492 18.0879 6.61508 17.7364 6.2636C17.3849 5.91213 16.8151 5.91213 16.4636 6.2636L12 10.7272L7.5364 6.2636Z"
                                fill="white"
                              />
                            </g>
                          </svg>
                        </div>
                      </Dialog.Close>
                    </Dialog.Content>
                  </Dialog.Root>
                </ContainerModal>
              </ButtonContainer>
            </ActionGroup>
          </CollateralItem>
          <ButtonContainerMobile>
            <ContainerModal>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button
                    width="100%"
                    disabled={
                      !state.collateralBalances[index].tokenBalance ||
                      state.collateralBalances[index].tokenBalance === "0.0" ||
                      state.loadingSupplyCollateral
                    }
                  >
                    {state.loadingSupplyCollateral ? "Loading..." : "Supply"}
                  </Button>
                </Dialog.Trigger>

                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                  <Dialog.Title className="DialogTitle">
                    Supply {item.name}
                  </Dialog.Title>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",

                      gap: 24,
                    }}
                  >
                    <Widget
                      props={{
                        onConfirm: checkAllowanceAndSupply,
                        decimals: item.decimals,
                        address: item.address,
                        loading: state.loadingSupplyCollateral,
                        selectedItem: item,
                        balance:
                          state.collateralBalances &&
                          state.collateralBalances[index].tokenBalance,
                        isBaseAsset: item.isBaseAsset,
                        type: "supply",
                      }}
                      src="thalesb.near/widget/Input"
                    />
                    <CollateralInfoModal />
                  </div>
                  <Dialog.Close asChild>
                    <div className="IconButton" aria-label="Close">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="Essential icons/X-mark">
                          <path
                            id="Union"
                            d="M7.5364 6.2636C7.18492 5.91213 6.61508 5.91213 6.2636 6.2636C5.91213 6.61508 5.91213 7.18492 6.2636 7.5364L10.7272 12L6.2636 16.4636C5.91213 16.8151 5.91213 17.3849 6.2636 17.7364C6.61508 18.0879 7.18492 18.0879 7.5364 17.7364L12 13.2728L16.4636 17.7364C16.8151 18.0879 17.3849 18.0879 17.7364 17.7364C18.0879 17.3849 18.0879 16.8151 17.7364 16.4636L13.2728 12L17.7364 7.5364C18.0879 7.18492 18.0879 6.61508 17.7364 6.2636C17.3849 5.91213 16.8151 5.91213 16.4636 6.2636L12 10.7272L7.5364 6.2636Z"
                            fill="white"
                          />
                        </g>
                      </svg>
                    </div>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Root>
            </ContainerModal>
            <ContainerModal>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <GhostButton
                    width="100%"
                    disabled={
                      !state.formattedBalance ||
                      state.formattedBalance === "0.0" ||
                      state.loadingWithdrawCollateral
                    }
                  >
                    {state.loadingWithdrawCollateral
                      ? "Loading..."
                      : "Withdraw"}
                  </GhostButton>
                </Dialog.Trigger>

                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                  <Dialog.Title className="DialogTitle">
                    Supply {item.name}
                  </Dialog.Title>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 24,
                    }}
                  >
                    <Widget
                      props={{
                        onConfirm: withdrawToContract,
                        address: item.address,
                        loading: state.loadingWithdrawCollateral,
                        selectedItem: item,
                        balance:
                          state.collateralBalances &&
                          state.collateralBalances[index].collateralBalance,
                        isBaseAsset: item.isBaseAsset,
                        type: "withdraw",
                      }}
                      src="thalesb.near/widget/Input"
                    />
                    <CollateralInfoModal />
                  </div>
                  <Dialog.Close asChild>
                    <div className="IconButton" aria-label="Close">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="Essential icons/X-mark">
                          <path
                            id="Union"
                            d="M7.5364 6.2636C7.18492 5.91213 6.61508 5.91213 6.2636 6.2636C5.91213 6.61508 5.91213 7.18492 6.2636 7.5364L10.7272 12L6.2636 16.4636C5.91213 16.8151 5.91213 17.3849 6.2636 17.7364C6.61508 18.0879 7.18492 18.0879 7.5364 17.7364L12 13.2728L16.4636 17.7364C16.8151 18.0879 17.3849 18.0879 17.7364 17.7364C18.0879 17.3849 18.0879 16.8151 17.7364 16.4636L13.2728 12L17.7364 7.5364C18.0879 7.18492 18.0879 6.61508 17.7364 6.2636C17.3849 5.91213 16.8151 5.91213 16.4636 6.2636L12 10.7272L7.5364 6.2636Z"
                            fill="white"
                          />
                        </g>
                      </svg>
                    </div>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Root>
            </ContainerModal>
          </ButtonContainerMobile>
        </div>
      ))}
    </GridItem>
    <GridItem span={3}>
      <Widget
        src="thalesb.near/widget/NetBorrowApr"
        props={{
          selectedItem: selectedItem,
        }}
      />
    </GridItem>
    <GridItem span={3}>
      <Widget
        src="thalesb.near/widget/NetSupplyApr"
        props={{
          selectedItem: selectedItem,
        }}
      />
    </GridItem>
    <GridItem span={6} style={{ maxHeight: "220px" }} rowSpan={2}>
      <Widget
        src="thalesb.near/widget/PositionInfo"
        props={{
          cometAddress: selectedItem.contractInfo.address,
          baseAddress: selectedItem.address,
          httpRpcUrl: props.selectedItem.contractInfo.httpRpcUrl,
        }}
      />
    </GridItem>
  </GridContainer>
);
