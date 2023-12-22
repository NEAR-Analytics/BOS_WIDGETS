function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

const HomeWarp = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  min-height: 720px;
  padding: 15px 0;
  background-color: #080d17;
  position: relative;
`;

const TradeWarp = styled.div`
  width: ${isMobileDevice() ? "100%" : "460px"};
  background-color: #080d17;
  border: 1px solid #323232;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  padding-bottom: 10px;
`;

const DropdownMenu = styled.div`
  color: #fff;

  position: relative;

  .menu-box {
    padding: 0 0.75rem;
    font-weight: 600;
    height: 48px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #323232;
  }
  .menu-left {
    flex: 1 1 0%;
    display: flex;
    column-gap: 10px;
  }
  .menu-right {
    flex: none;
  }
  .coin-logo {
    width: 28px;
  }
  .coin-name {
    font-size: 18px;
  }
  .markets-text {
    color: #98969e;
  }
`;
const GroupWarp = styled.div`
  width: 100%;
  position: absolute;
  top: 48px;
  left: 0;
  opacity: 0;
  height: auto;
  background-color: #080d17;
  border: 1px solid #323232;
  z-index: 0;
  animation-name: slideLeftAndFade;
  animation: slideLeftAndFade 0.6s linear forwards;
  animation-iteration-count: 1;

  cursor: pointer;
  .group-ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
    padding-left: 0;
  }
  .group-li {
    display: flex;
    padding: 6px 0.75rem;
    font-weight: 600;
  }
  .group-li-left {
    flex: 1 1 0%;
  }
  .group-li-right {
    flex: none;
  }

  .group-header-box {
    padding: 10px 0.75rem;
    display: flex;
    align-items: center;
    color: #98969e;
    font-size: 12px;
  }
  .header-th {
    flex: 1 1 0%;
  }
  .coin-logo {
    width: 24px;
  }
  .coin-name {
    font-size: 14px;
  }

  @keyframes slideLeftAndFade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const TradeTab = styled.div`
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #323232;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  .tab-btn {
    display: flex;
    flex: 1 1 0%;
    align-items: center;
    justify-content: center;
    height: 40px;
    cursor: pointer;
    &.active {
      border-bottom: 2px solid #617168;
      animation-name: slideLeftAndFade;
      animation: slideLeftAndFade 0.3s linear forwards;
      animation-iteration-count: 1;
    }
  }
  @keyframes slideLeftAndFade {
    from {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }
`;

const TardeType = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  column-gap: 0.75rem;
  color: #fff;
  .type-btn {
    flex: 1 1 0%;
    height: 36px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #3d3947;
    background-color: #252526;
    font-size: 14px;
    font-weight: 600;
    border-radius: 10px;
    &.active {
      border-color: #009b72;
      color: #009b72;
      background-color: #111114;
      transition: cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }
`;

const exContract = [
  {
    symbol: "ETH-USD",
    price: "0",
    id: 1,
    settleCoin: {
      name: "USD",
    },
    tradeCoin: {
      name: "ETH",
      coin: "https://trade.dydx.exchange/currencies/eth.svg",
    },
  },
  {
    symbol: "BTC-USD",
    price: "0",
    id: 2,
    settleCoin: {
      name: "USD",
    },
    tradeCoin: {
      name: "BTC",
      coin: "	https://trade.dydx.exchange/currencies/btc.svg",
    },
  },
];

const [exContractList, setExContractList] = useState(exContract);

const exUrl = "https://zksync.satori.finance/";

const nearId =
  "720288545047ae42c47ce521b155241fb760359af60496c46cb74c4358c5870a";

const keys = [
  "aurora",
  "2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near",
];

State.init({
  groupVisible: false,
  contractInfo: exContractList[0],
  tradeTabIndex: 0,
  tradeTypeIndex: 0,
});

const fetchPrices = async () => {
  const priceData = Near.view("priceoracle.near", "get_price_data", {});
  const assetsData = Near.view("oracle-prices.near", "get_config", { keys });
  const priceDataPrepared = [];
  priceData.prices.map(
    (data) => (priceDataPrepared[data.asset_id] = data.price)
  );
  const newPrices = assetsData.map((asset, index) => {
    const assetAccountId = asset[0];
    const assetDecimals = asset[1].decimals;

    const assetPrice = priceDataPrepared[assetAccountId];
    const price = new Big(assetPrice.multiplier).div(
      new Big(10).pow(assetPrice.decimals - assetDecimals)
    );
    return price.toString();
  });

  return newPrices;
};

const loopPrice = async () => {
  try {
    const [etpPrice, btcPrice] = fetchPrices();
    exContract[0].price = etpPrice;
    exContract[1].price = btcPrice;
    setExContractList(exContract);
  } finally {
    setTimeout(() => {
      loopPrice();
    }, 30000);
  }
};

const sizeContractSymbol = useMemo(() => {
  return [
    state.contractInfo.tradeCoin.name,
    state.contractInfo.settleCoin.name,
  ];
}, [state.contractInfo]);

const tradeTab = [{ name: "Limit" }, { name: "Market" }];

const tradeTypeBtn = [{ name: "Long" }, { name: "Short" }];

useEffect(() => {
  loopPrice();
}, []);

return (
  <HomeWarp>
    <TradeWarp>
      <Widget src={`${nearId}/widget/H5Header`} />
      <DropdownMenu>
        <div
          class="menu-box"
          onClick={() => {
            State.update({ groupVisible: !state.groupVisible });
            console.log(state.groupVisible);
          }}
        >
          <div class="menu-left">
            <img
              class="coin-logo"
              src={state.contractInfo.tradeCoin.coin}
              alt=""
            />
            <span class="coin-name">{state.contractInfo.symbol}</span>
          </div>

          <div class="menu-right">
            <span class="markets-text">All Markets</span>
            <span class="down-triangle">
              <svg
                data-v-fd82d23f=""
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  data-v-fd82d23f=""
                  d="M7.29273 9.76817C7.68325 10.1588 8.31646 10.1588 8.707 9.76823L12.0065 6.46872L11.0645 5.52539L7.99984 8.59206L4.93583 5.52539L3.99316 6.46806L7.29273 9.76817Z"
                  fill="#98969e"
                ></path>
              </svg>
            </span>
          </div>
        </div>

        {state.groupVisible && (
          <GroupWarp>
            <ul class="group-ul">
              <li class="group-header-box">
                <div class="header-th">
                  <span class="th-txt">Market</span>
                </div>
                <div>
                  <span class="th-txt">Price</span>
                </div>
              </li>
              {exContractList.map((item) => (
                <li
                  class="group-li"
                  onClick={() => {
                    State.update({ contractInfo: item, groupVisible: false });
                  }}
                >
                  <div class="group-li-left">
                    <img class="coin-logo" src={item.tradeCoin.coin} alt="" />
                    <span class="coin-name">{item.symbol}</span>
                  </div>
                  <div class="group-li-right">
                    <span class="price">{item.price}</span>
                  </div>
                </li>
              ))}
            </ul>
          </GroupWarp>
        )}
      </DropdownMenu>
      <TradeTab>
        {tradeTab.map((item, index) => (
          <div
            class={`tab-btn ${state.tradeTabIndex === index ? "active" : ""}`}
            onClick={() => {
              State.update({ tradeTabIndex: index });
            }}
          >
            <span>{item.name}</span>
          </div>
        ))}
      </TradeTab>
      <TardeType>
        {tradeTypeBtn.map((item, index) => (
          <div
            class={`type-btn ${state.tradeTypeIndex === index ? "active" : ""}`}
            onClick={() => {
              State.update({ tradeTypeIndex: index });
            }}
          >
            <span>{item.name}</span>
          </div>
        ))}
      </TardeType>
      {state.tradeTabIndex === 0 ? (
        <Widget
          src={`${nearId}/widget/Limit`}
          props={{
            contractSymbol: sizeContractSymbol,
            price: state.contractInfo.price,
            exUrl,
            nearId,
          }}
        />
      ) : (
        <Widget
          src={`${nearId}/widget/Market`}
          props={{
            contractSymbol: sizeContractSymbol,
            price: state.contractInfo.price,
            exUrl,
            nearId,
          }}
        />
      )}
    </TradeWarp>
  </HomeWarp>
);
