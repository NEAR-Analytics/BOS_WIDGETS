const { config, chainId, switchNetwork, disabled } = props;

const ETH_MATIC = () => (
  <img
    height={36}
    src={`${config.ipfsPrefix}/bafkreibcyx5qsxnzwklrar7vcksny2us5ijavtfcxwlwj2plabspzenwii`}
  />
);

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left:16px;
  cursor: ${disabled ? "auto" : "pointer"};

  position: relative;

  .dropdown-pc {
    display: none;
    position: absolute;
    top: 40px;
    min-width: 290px;

    background: #373A53;
    padding: 16px 0;
    border-radius: 16px;
    font-size: 16px;
    font-weight:bold;
    color:#fff;
    z-index: 50;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
  }

  .network-img {
    width: 16px;
    height: 16px;
    transition: all 0.3s ease-in-out;
  }

  .dropdown-img {
    width: 16px;
    height: 16px;
    margin-left: 8px;
    transition: all 0.3s ease-in-out;

    transform: scale(0.8) rotate(${() =>
      state.showDropdown ? "0deg" : "180deg"});
  }

  @media (min-width: 640px) {
    img {
      height: 60px;
    }

    .network-img {
      width: 25px;
      height:25px;
    }

    .dropdown-img {
      width: 32px;
      height: 32px;
    }

    .dropdown-pc {
      display: flex;
      flex-direction: column;
    }

    .dropdown-pc-item {
      display: flex;
      align-items: center;
      justify-content:space-between;
      height:56px;
      padding:0 16px;
      &:hover, &.active{
        background-color:rgba(24, 26, 39, 0.3);
      }
      .left{
        display: flex;
        align-items: center;
        gap:15px;
      }
    }
  }
`;

const SwitchTitle = styled.div`
  color: white;

  font-size: 18px;

  @media (min-width: 640px) {
    font-size: 20px;
    margin:0 20px 0 10px;
  }
`;

const DropdownMobile = styled.div`
  position: fixed;
  z-index: 9999;

  height: 80vh;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #151718;

  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 20px 12px;
  font-size: 12px;

  .dropdown-mobile-item {
    .dropdown-img {
      width: 32px;
      height: 32px;
    }
    font-size: 14px;
    display: flex;
    align-items: center;

    div {
      margin-left: 10px;
    }
  }

  @media (min-width: 640px) {
    display: none;
  }
`;

const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DropdownImage = () => (
  <img
    className="dropdown-img"
    src={`${config.ipfsPrefix}/bafkreiexo22bzy2dnto7xlzee5dgz3mkb5smmpvzdgx7ed3clbw3ad3jsa`}
  />
);

const PolygonImage = () => (
  <img
    className="network-img"
    src={`${config.ipfsPrefix}/bafkreieaobutw4ibjbh7cyom4wjzjc3rx2fxs2gpfhzasgsoj5f4hjxo2m`}
  />
);

const EthImage = () => (
  <img
    className="network-img"
    src={`${config.ipfsPrefix}/bafkreih7c6cip4ckunan7c3n5ckyf56mfnqmu7u5zgvxvhqvjsyf76kwxy`}
  />
);

const GnosisImage = () => (
  <img
    className="network-img"
    src={`${config.ipfsPrefix}/bafkreibdtyo65gd4cvjjylw3etf6sw4ipvwmvqvfv267maqwp77gu2hovm`}
  />
);

const OptimismImage = () => (
  <img
    className="network-img"
    src={`${config.ipfsPrefix}/bafkreih2tj74xd54wt7egai5mmo3pa7rcg4v6q6dimuwlxgxokxmiej2sy`}
  />
);

const BaseImage = () => (
  <img
    className="network-img"
    src={`${config.ipfsPrefix}/bafkreibyfofm47gzgepqzjcky5jp3a2d2vwaq5tf55642rpemdgdmivlcq`}
  />
);

const AvaxImage = () => (
  <img
    className="network-img"
    src={`${config.ipfsPrefix}/bafkreiazt7i6bykuzfi7kqpxokriohm7boo6vqqviftintvfj4y545gm3y`}
  />
);

const MetisImage = () => (
  <img
    className="network-img"
    src={`${config.ipfsPrefix}/bafkreieavbzowayvcykgc4pso4wplbprf7xwvqbjixdievsxtncc77r4vm`}
  />
);

const ArbiImage = () => (
  <img
    className="network-img"
    src={`${config.ipfsPrefix}/bafkreifwrsmcivbybdhrtq7yqywquo56qtzigb4boyl7bzwceatsemivcm`}
  />
);

const toggleDropdown = disabled
  ? () => {}
  : () => State.update({ showDropdown: !state.showDropdown });

const getChainImage = (chainId) => {
  switch (chainId) {
    case 1:
      return EthImage;
    case 100:
      return GnosisImage;
    case 137:
      return PolygonImage;
    case 10:
      return OptimismImage;
    case 8453:
      return BaseImage;
    case 43114:
      return AvaxImage;
    case 1088:
      return MetisImage;
    case 42161:
      return ArbiImage;
    default:
      throw new Error("unknown chain id");
  }
};

const ChainImage = getChainImage(chainId);

State.init({
  showDropdown: false,
});
const selected_icon = (
  <svg
    width="17"
    height="12"
    viewBox="0 0 17 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 3.71493L6.21739 9.82353L16 1"
      stroke="#9E75FF"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);
const arrow_icon = (
  <svg
    width="17"
    height="9"
    viewBox="0 0 17 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L8.5 7.5L16 1"
      stroke="#8C7EBD"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

//updated the dropdown menus to include only the supported networks (Ethereum, Polygon, and Gnosis)
return (
  <SwitchContainer>
    {state.showDropdown && (
      <DropdownMobile>
        <div>Select Spark Market</div>
        <div
          className="dropdown-mobile-item"
          onClick={() => {
            State.update({ showDropdown: false });
            switchNetwork(1);
          }}
        >
          <EthImage />
          <div>Ethereum</div>
        </div>

        <div
          className="dropdown-mobile-item"
          onClick={() => {
            State.update({ showDropdown: false });
            switchNetwork(100);
          }}
        >
          <GnosisImage />
          <div>Gnosis</div>
        </div>
        <div
          className="dropdown-mobile-item"
          onClick={() => {
            State.update({ showDropdown: false });
            switchNetwork(137);
          }}
        >
          <PolygonImage />
          <div>Polygon</div>
        </div>
      </DropdownMobile>
    )}
    <DropdownContainer onClick={toggleDropdown}>
      <ChainImage />
      <SwitchTitle>{config.chainName}</SwitchTitle>
      {!disabled && arrow_icon}
    </DropdownContainer>
    {state.showDropdown && (
      <div className="dropdown-pc">
        <div
          className={`dropdown-pc-item ${chainId == 100 ? "active" : ""}`}
          onClick={() => {
            State.update({ showDropdown: false });
            switchNetwork(100);
          }}
        >
          <div className="left">
            <GnosisImage />
            <div>Gnosis</div>
          </div>
          {chainId == 100 && <span className="right">{selected_icon}</span>}
        </div>

        <div
          className={`dropdown-pc-item ${chainId == 1 ? "active" : ""}`}
          onClick={() => {
            State.update({ showDropdown: false });
            switchNetwork(1);
          }}
        >
          <div className="left">
            <EthImage />
            <div>Ethereum</div>
          </div>
          {chainId == 1 && <span className="right">{selected_icon}</span>}
        </div>

        <div
          className={`dropdown-pc-item ${chainId == 137 ? "active" : ""}`}
          onClick={() => {
            State.update({ showDropdown: false });
            switchNetwork(137);
          }}
        >
          <div className="left">
            <PolygonImage />
            <div>Polygon</div>
          </div>
          {chainId == 137 && <span className="right">{selected_icon}</span>}
        </div>

        <div
          className={`dropdown-pc-item ${chainId == 42161 ? "active" : ""}`}
          onClick={() => {
            State.update({ showDropdown: false });
            switchNetwork(42161);
          }}
        >
          <div className="left">
            <ArbiImage />
            <div>Arbitrum</div>
          </div>
          {chainId == 42161 && <span className="right">{selected_icon}</span>}
        </div>

        <div
          className={`dropdown-pc-item ${chainId == 10 ? "active" : ""}`}
          onClick={() => {
            State.update({ showDropdown: false });
            switchNetwork(10);
          }}
        >
          <div className="left">
            <OptimismImage />
            <div>Optimism</div>
          </div>
          {chainId == 10 && <span className="right">{selected_icon}</span>}
        </div>

        <div
          className={`dropdown-pc-item ${chainId == 8453 ? "active" : ""}`}
          onClick={() => {
            State.update({ showDropdown: false });
            switchNetwork(8453);
          }}
        >
          <div className="left">
            <BaseImage />
            <div>Base</div>
          </div>
          {chainId == 8453 && <span className="right">{selected_icon}</span>}
        </div>

        <div
          className={`dropdown-pc-item ${chainId == 43114 ? "active" : ""}`}
          onClick={() => {
            State.update({ showDropdown: false });
            switchNetwork(43114);
          }}
        >
          <div className="left">
            <AvaxImage />
            <div>Avalanche</div>
          </div>
          {chainId == 43114 && <span className="right">{selected_icon}</span>}
        </div>

        <div
          className={`dropdown-pc-item ${chainId == 1088 ? "active" : ""}`}
          onClick={() => {
            State.update({ showDropdown: false });
            switchNetwork(1088);
          }}
        >
          <div className="left">
            <MetisImage />
            <div>Metis</div>
          </div>
          {chainId == 1088 && <span className="right">{selected_icon}</span>}
        </div>
      </div>
    )}
  </SwitchContainer>
);
