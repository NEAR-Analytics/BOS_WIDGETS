const HomeWarp = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  min-height: 720px;
  background-color: #080d17;
  position: relative;
  .pc-visible {
    display: block;
  }
  .mobile-visible {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    .pc-visible {
      display: none;
    }
    .mobile-visible {
      display: block;
    }
  }
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

State.init({
  groupVisible: false,
  contractInfo: exContract[0],
});
const MenuItem = styled("DropdownMenu.Item")``;
const SubMenuTrigger = styled("DropdownMenu.SubTrigger")``;

const compId =
  "720288545047ae42c47ce521b155241fb760359af60496c46cb74c4358c5870a";

return (
  <HomeWarp>
    <div class="pc-visible">
      <Widget src={`${compId}/widget/Header`} />
    </div>
    <div class="mobile-visible">
      <Widget src={`${compId}/widget/H5Header`} />
    </div>

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
            {exContract.map((item) => (
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
  </HomeWarp>
);
