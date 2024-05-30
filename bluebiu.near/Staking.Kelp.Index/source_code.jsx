const StyledContainer = styled.div`
  padding-top: 34px;
  width: 1244px;
  margin: 0 auto;
`;
const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BridgeWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 15px auto 0;
  padding: 0 18px;
  gap: 15px;
  width: 478px;
  height: 70px;
  border-radius: 16px;
  background: rgba(97, 223, 255, 0.15);
  cursor: pointer;
  .bridge-icon {
    width: 26px;
    height: 26px;
  }
  .bridge-body {
    flex-grow: 1;
    color: #61dfff;
  }
  .bridge-title {
    font-size: 16px;
    font-weight: 600;
  }
  .bridge-des {
    font-size: 14px;
    font-weight: 400;
  }
  .bridge-arrow {
  }
`;

const networks = {
  // Linea
  59144: {
    DepositPool: "0x057297e44a3364139edcf3e1594d6917ed7688c2",
    StakeTokens: [
      {
        name: "ETH",
        symbol: "ETH",
        icon: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
        decimals: 18,
        isNative: true,
        address: "native",
      },
    ],
    ExchangeToken: {
      decimals: 18,
      symbol: "wrsETH",
      name: "rsETHWrapper",
      icon: "https://ipfs.near.social/ipfs/bafkreiablktwaz4gul2cnx4zkkfl5zqolg76imnp7dzjaqkdywknvadzty",
    },
  },
  // mode
  34443: {
    DepositPool: "0xbDf612E616432AA8e8D7d8cC1A9c934025371c5C",
    StakeTokens: [
      {
        name: "ETH",
        symbol: "ETH",
        icon: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
        decimals: 18,
        isNative: true,
        address: "native",
      },
    ],
    ExchangeToken: {
      decimals: 18,
      symbol: "wrsETH",
      name: "rsETHWrapper",
      icon: "https://ipfs.near.social/ipfs/bafkreiablktwaz4gul2cnx4zkkfl5zqolg76imnp7dzjaqkdywknvadzty",
    },
  },
  1: {
    DepositPool: "0x036676389e48133B63a802f8635AD39E752D375D",
    WithdrawalContract: "0x62De59c08eB5dAE4b7E6F7a8cAd3006d6965ec16",
    StakeTokens: [
      {
        name: "ETH",
        symbol: "ETH",
        icon: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
        decimals: 18,
        isNative: true,
        address: "native",
      },
      {
        name: "ETHx",
        symbol: "ETHx",
        icon: "",
        decimals: 18,
        address: "0xA35b1B31Ce002FBF2058D22F30f95D405200A15b",
        icon: "https://ipfs.near.social/ipfs/bafkreifggmgi5gqqqjng463qqbcdwtga53p64fkp644rflb74dowv5j43y",
      },
      {
        name: "Liquid staked Ether 2.0 ",
        symbol: "stETH",
        icon: "",
        decimals: 18,
        address: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
        icon: "https://ipfs.near.social/ipfs/bafkreigduz3yuk2z4cruwat6tolqr36rbl3ijjiaqzoj2ona35s7c7jdqq",
      },
      {
        name: "Staked Frax Ether",
        symbol: "sfrxETH",
        icon: "",
        decimals: 18,
        address: "0xA35b1B31Ce002FBF2058D22F30f95D405200A15b",
        icon: "https://ipfs.near.social/ipfs/bafkreiaq5taf3cuvvqar5qbqpqzbj5ys2xx2skgstbaorxgxchtswispmi",
      },
    ],
    ExchangeToken: {
      address: "0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7",
      symbol: "rsETH",
      name: "rsETH",
      decimals: 18,
      icon: "https://ipfs.near.social/ipfs/bafkreibhmbhdfll7apn5mjmlmt6eh2fgn4wcvrkl3yhqfujgw5dgkqvg2e",
    },
  },
};
const STORED_TAB = Storage.privateGet("STORED_TAB");
State.init({
  tab: STORED_TAB || "Stake",
  chainId: -1,
  loading: true,
  isSupport: false,
});

const {
  CHAIN_LIST,
  curChain,
  dexConfig,
  wethAddress,
  multicallAddress,
  multicall,
  prices,
  onSwitchChain,
  switchingChain,
  addAction,
  toast,
  chainId,
  nativeCurrency,
  isChainSupported,
  account,
  windowOpen,
} = props;
const { type } = dexConfig;
const SUPPOR_CHAINS = [...CHAIN_LIST?.map((item) => item.chain_id), 1];

const { StakeTokens } = state;

if (!Ethers.provider())
  return (
    <Widget
      src="bluebiu.near/widget/Swap.ChainWarnigBox"
      props={{
        chain: curChain,
        onSwitchChain: onSwitchChain,
        switchingChain: switchingChain,
        theme: dexConfig.theme?.button,
      }}
    />
  );

useEffect(() => {
  Ethers.provider()
    .getNetwork()
    .then((res) => {
      State.update({
        isSupport: SUPPOR_CHAINS.includes(res.chainId),
        chainId: res.chainId,
        ...networks[res.chainId],
      });
    })
    .catch((err) => {
      console.log("catch-getNetwork-error--", err);
    });
}, []);

useEffect(() => {
  if (!state.StakeTokens) return;

  let _balanceRes = {};
  function formatData() {
    const _stakeTokens = [...StakeTokens];
    console.log("_balanceRes--", _balanceRes);
    for (let i = 0; i < _stakeTokens.length; i++) {
      _stakeTokens[i].balance = _balanceRes[_stakeTokens[i].address];
    }

    State.update({
      loading: false,
      StakeTokens: _stakeTokens,
    });
  }
  function getWalletBalance() {
    // not eth
    const underlyingTokens = StakeTokens.filter((market) => {
      return market.address && !market.isNative;
    });

    Ethers.provider()
      .getBalance(account)
      .then((rawBalance) => {
        _balanceRes["native"] = ethers.utils.formatUnits(rawBalance, 18);

        if (underlyingTokens.length) {
          const calls = underlyingTokens.map((token) => ({
            address: token.address,
            name: "balanceOf",
            params: [account],
          }));

          multicall({
            abi: [
              {
                constant: true,
                inputs: [
                  {
                    name: "_owner",
                    type: "address",
                  },
                ],
                name: "balanceOf",
                outputs: [
                  {
                    name: "balance",
                    type: "uint256",
                  },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
              },
            ],
            calls,
            options: {},
            multicallAddress,
            provider: Ethers.provider(),
          })
            .then((res) => {
              console.log("getWalletBalance--", res);
              for (let i = 0, len = res.length; i < len; i++) {
                _balanceRes[underlyingTokens[i].address] = res[i]
                  ? ethers.utils.formatUnits(
                      res[i][0],
                      underlyingTokens[i].decimals
                    )
                  : "0";
              }
              formatData();
            })
            .catch((err) => {
              console.log("getWalletBalance-error--", err);
              // setTimeout(() => {
              //   getWalletBalance();
              // }, 500);
            });
        } else {
          formatData();
        }
      });
  }
  getWalletBalance();
}, [state.StakeTokens]);

const tabsArray = [
  { key: "Stake", label: "Stake" },
  { key: "Unstake", label: "Unstake" },
  // { key: "Withdraw", label: "Withdraw" },
];
const handleBridge = () => {
  windowOpen("bridge-x/stargate", "_blank");
};

return (
  <StyledContainer style={dexConfig.theme}>
    <StyledHeader>
      <Widget
        src="bluebiu.near/widget/Lending.CardTabs"
        props={{
          tabs: tabsArray,
          active: state.tab,
          onChange: (tab) => {
            Storage.privateSet("STORED_TAB", tab.key);
            State.update({
              tab: tab.key,
            });
          },
        }}
      />

      <Widget
        src="bluebiu.near/widget/Lending.Chains"
        props={{
          chains: CHAIN_LIST,
          curChain,
          onSwitchChain,
          onChange: (tab) => {
            State.update({
              tab: tab.key,
            });
          },
        }}
      />
    </StyledHeader>
    {state.loading ? (
      <Widget src="bluebiu.near/widget/Lending.Spinner" />
    ) : (
      <>
        <Widget
          src="bluebiu.near/widget/Staking.Kelp.Content"
          props={{
            ...props,
            tab: state.tab,
            ...state,
            onChange: (tab) => {
              State.update({
                tab: tab.key,
              });
            },
          }}
        />
        {/* <BridgeWrap onClick={handleBridge}>
          <img src={curChain?.logo} className="bridge-icon" />
          <div className="bridge-body">
            <div className="bridge-title">Native {curChain?.name} Bridge</div>
            <div className="bridge-des">
              Deposit tokens to the {curChain?.name} network
            </div>
          </div>
          <span className="bridge-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="12"
              viewBox="0 0 7 12"
              fill="none"
            >
              <path
                d="M1.00055 11L5.00055 6L1.00055 1"
                stroke="#61DFFF"
                stroke-width="2"
              />
            </svg>
          </span>
        </BridgeWrap> */}
      </>
    )}

    {!state.isSupport && (
      <Widget
        src="bluebiu.near/widget/Swap.ChainWarnigBox"
        props={{
          chain: curChain,
          onSwitchChain: onSwitchChain,
          switchingChain: switchingChain,
          theme: dexConfig.theme?.button,
        }}
      />
    )}
  </StyledContainer>
);
