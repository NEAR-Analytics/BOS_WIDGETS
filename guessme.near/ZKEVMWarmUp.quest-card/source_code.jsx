const { isInMoreList, onStickyTop } = props;

const iconMap = {
  "native bridge": (
    <img
      className="quest-card-name-icon"
      src="https://ipfs.near.social/ipfs/bafkreigawbz26l7mhfewlxwnjomos6njdkchnfnw2dnb6xtzf7j2t6jdxm"
    />
  ),

  "Pancake Swap": (
    <img
      className="quest-card-name-icon "
      src="https://repository-images.githubusercontent.com/440462673/6872d684-f7ed-463c-9a5c-76542eddbcc4"
    />
  ),

  "0vix Lending": (
    <img
      className="quest-card-name-icon "
      src="https://ipfs.near.social/ipfs/bafkreigyodedyhiqmstq3g5edcqw25yyari4y3rcbsnqtxldb2zb2vpah4"
    />
  ),

  "0vix": (
    <img
      className="quest-card-name-icon "
      src="https://ipfs.near.social/ipfs/bafkreigyodedyhiqmstq3g5edcqw25yyari4y3rcbsnqtxldb2zb2vpah4"
    />
  ),
  Gamma: (
    <img
      className="quest-card-name-icon "
      src="https://ipfs.near.social/ipfs/bafkreial4i3eb5uuxkhecn7nwos76km3qvb7jzxmups57rkxizr5i7dyaa"
    />
  ),
  "Pancake Swap": (
    <img
      className="quest-card-name-icon "
      src="https://repository-images.githubusercontent.com/440462673/6872d684-f7ed-463c-9a5c-76542eddbcc4"
    />
  ),
  QuickSwap: (
    <img
      className="quest-card-name-icon "
      src="https://ipfs.near.social/ipfs/bafkreibzpvczmrw2jvua3lsuwmvb7ldlztsszbo4dd6jagfsqkk6ub5opa"
    />
  ),
  Balancer: (
    <img
      className="quest-card-name-icon "
      src="https://ipfs.near.social/ipfs/bafkreieg6jpfhxra6c3dspiijg6fj5ga5dpqcn4vmtzdceqa3nheredq5m"
    />
  ),
};

const stickTopIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 4L2 8.52941M8 4L14 8.52941M8 4V15"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M1 1H15"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const QuestCardWrapper = styled.div`
  position: relative;

  .delete-icon {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: 2px solid #7c7f96;
    width: 16px;
    height: 16px;

    .row-bar {
      width: 75%;
      height: 2px;
      background: #7c7f96;
      border-radius: 6px;
    }
  }

  .delete-icon:hover {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: 2px solid #ff61d3;
    width: 16px;
    height: 16px;

    .row-bar {
      width: 75%;
      height: 2px;
      background: #ff61d3;
      border-radius: 6px;
    }
  }

  .quest-card-out {
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding: 4px; */
    width: 259px;
    .quest-card-inner {
      border-radius: 20px;
      background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
      width: 250px;
      height: 108px;
      position: relative;
      :hover {
        text-decoration: none;
      }

      color: #02051e;

      padding: 0px 12px;

      padding-top: 20px;

      .quest-card-name {
        position: absolute;
        display: flex;
        align-items: center;
        bottom: 12px;
        left: 50%;
        transform: translateX(-50%);
        gap: 4px;
        white-space: nowrap;

        .quest-card-name-icon {
          width: 26px;
          height: 26px;
          border-radius: 8px;
        }
      }

      .quest-card-info {
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        line-height: 24px;
      }
      .trend-card-execute-mobile {
        display: none;
      }
    }
  }

  .quest-card-execute-date {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: #979abe;
    width: 250px;

    padding: 8px 12px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .quest-card-show-delete-icon {
      cursor: pointer;
    }
  }

  .quest-card-execute-date-number {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: black;
    opacity: 0.5;
    z-index: 1000;
  }

  .operation-filed {
    display: flex;
    align-items: center;
    gap: 8px;

    .sticky-top {
      cursor: pointer;
      color:#7C7F96;
      z-index: 0;
      :hover {
        color: #ebf479;
      }
    }
  }

  @media (max-width: 900px) {
    .quest-card-out {
      width: 100%;

      .quest-card-inner {
        background: rgba(55, 58, 83, 0.5);
        width: 100%;
        height: 80px;
        padding: 14px 12px;

        .quest-card-info {
          color: rgba(255, 255, 255, 1);
          font-size: 16px;
          text-align: left;
        }

        .quest-card-name {
          transform: translateX(-0);
          left: 20px;
          color: rgba(151, 154, 190, 1);
          font-size: 14px;
          img {
            width: 18px;
            height: 18px;
          }
          .quest-card-name-icon {
            width: 18px;
            height: 18px;
          }
        }

        .trend-card-execute-mobile {
          display: inline-block;
          color: #979abe;
          font-size: 12px;
          position: absolute;
          right: 14px;
          bottom: 12px;
          border-bottom: 1px rgba(151, 154, 190, 1) solid;
        }
      }
    }

    .quest-card-execute-date {
      .quest-card-execute-date-number {
        display: none;
      }
      .quest-card-show-delete-icon {
        display: none;
      }
      .quest-card-show-delete-mobile {
        position: absolute;
        top: 16px;
        right: 16px;
      }
    }
    .delete-card {
      font-weight: 500;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid rgba(65, 68, 90, 1);
      padding: 28px 12px 18px 12px;
      background: linear-gradient(0deg, #1e202f, #1e202f),
        linear-gradient(0deg, #41445a, #41445a);
      .delete-card-mobile {
        display: block;
        color: #979abe;
        font-size: 16px;
        margin: 12px 0px;
        font-weight: 500;
        text-align: center;
      }
    }
  }
`;

const { item, onDelete } = props;

const SwapTokens = [
  {
    address: "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",
    chainId: 1101,
    symbol: "WETH",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295",
  },
  {
    address: "0xa2036f0538221a77a3937f1379699f44945018d0",
    chainId: 1101,
    symbol: "MATIC",
    extra: true,
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
  },
  {
    address: "0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4",
    chainId: 1101,
    symbol: "DAI",
    extra: true,
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png?1687143508",
  },
  {
    address: "0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035",
    chainId: 1101,
    symbol: "USDC",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  },

  {
    address: "0x1E4a5963aBFD975d8c9021ce480b42188849D41d",
    chainId: 1101,
    symbol: "USDT",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663",
  },
  {
    address: "0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1",
    chainId: 1101,
    symbol: "WBTC",
    decimals: 8,
    extra: true,
    logoURI:
      "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744",
  },
];

State.init({
  showDelete: false,
});

const onCancel = () =>
  State.update({
    showDelete: false,
  });

let link = "";

const arr = item.action_title.split(/\s+/);

const [action_type, amount, symbol, on, dexName1, dexName2] = arr;

const isBridge = arr[0].toLowerCase() === "bridge";

const isSwap = arr[0].toLowerCase() === "swap";

const isSupply = arr[0].toLowerCase() === "supply";
const isBorrow = arr[0].toLowerCase() === "borrow";
const isRepay = arr[0].toLowerCase() === "repay";

const isWithdraw = arr[0].toLowerCase() === "withdraw";

const isDeposit = arr[0].toLowerCase() === "deposit";

const isWithdrawGamma = isWithdraw && arr?.[3]?.toLowerCase() === "gamma";

if (isBridge) {
  link = "/guessme.near/widget/ZKEVMSwap.zkevm-bridge?source=quest-card";
}
if (isSwap) {
  link = "/guessme.near/widget/ZKEVMSwap.zkevm-swap?source=quest-card";
}

if (isDeposit) {
  link = "/guessme.near/widget/ZKEVM.GAMMA?tab=deposit";
}

if (isWithdrawGamma) {
  link = "/guessme.near/widget/ZKEVM.GAMMA?tab=withdraw";
}
if (isSupply || (isWithdraw && !isWithdrawGamma)) {
  link = "/bluebiu.near/widget/0vix.Lending?tab=supply";
}

if (isBorrow || isRepay) {
  link = "/bluebiu.near/widget/0vix.Lending?tab=borrow";
}

const onSaveParams = () => {
  if (isBridge) {
    const [action_type, symbol, from, chain] = arr;

    Storage.set("zk-evm-bridge-params", {
      symbol,
      chain,
    });
  }

  if (isSwap) {
    const [action_type, amount, symbol, on, dexName1, dexName2] = arr;

    const token = SwapTokens.find((item) => item.symbol === symbol);

    Storage.set("zk-evm-swap-params", {
      amount,
      symbol,
      dexName: dexName1 + (dexName2 ? " " + dexName2 : ""),
      assetId: token.address,
    });
  }
};

const getAmountFromTitle = (title) => {
  const arr = title.split(/\s+/);

  const index = arr.findIndex(
    (item) => !isNaN(item) || !isNaN(item.substring(1))
  );

  return index;
};

let displayTitle = item.action_title;

const amountIndex = getAmountFromTitle(item.action_title);

if (amountIndex > -1) {
  const arr = item.action_title.split(/\s+/);
  const amount = item.action_title.split(/\s+/)[amountIndex];

  const amountNumber = amount;

  displayTitle = (
    <>
      {" "}
      {arr.slice(0, amountIndex).join(" ")}{" "}
      <span
        style={{
          color: "#7C7F96",
        }}
      >
        {amountNumber}{" "}
      </span>{" "}
      {arr.slice(amountIndex + 1, arr.length).join(" ")}
    </>
  );
}

return (
  <QuestCardWrapper>
    <div className={"quest-card-out"} onClick={() => onSaveParams()}>
      <a
        className="quest-card-inner"
        href={link}
        style={{
          background: isInMoreList ? "#373A53" : "",
          color: isInMoreList ? "white" : "",
        }}
      >
        <div className="quest-card-info">{displayTitle}</div>
        <div className="quest-card-name">
          {iconMap[item.template]} {item.template}
        </div>
        <div className="trend-card-execute-mobile">
          {item.count_number} times
        </div>
      </a>
    </div>

    <div className="quest-card-execute-date">
      <span className="quest-card-execute-date-number">
        My Execution
        <span>{item.count_number}</span>
      </span>

      <div className="operation-filed">
        {isInMoreList && (
          <div
            className="sticky-top"
            onClick={() => {
              onStickyTop();
            }}
          >
            {stickTopIcon}
          </div>
        )}

        <div
          className="delete-icon"
          onClick={() => {
            onDelete(item.action_id);
          }}
        >
          <div className="row-bar"></div>
        </div>
      </div>
    </div>
  </QuestCardWrapper>
);
