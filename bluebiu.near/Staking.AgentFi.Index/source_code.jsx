const StyledContainer = styled.div`
  padding-top: 34px;
  width: var(--container-width);
  margin: 0 auto;
`;
const StyledTabs = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background: linear-gradient(90deg, rgba(22, 24, 29, 0.00) 0%, #373A53 50%, rgba(22, 24, 29, 0.00) 100%);
  }

  .tab-item {
    position: relative;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 200px;
    height: 46px;
    cursor: pointer;
    color: #979ABE;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    
    &.active {
      color: #ffffff;
    }
  }
`;
const StyledTabsPointer = styled.div`
  content: "";
  display: block;
  width: 200px;
  height: 1px;
  background: #ffffff;
  position: absolute;
  z-index: 2;
  left: 0;
  bottom: 0;
  transition: transform .3s ease-in-out;
`;
const StyledContentTopTVL = styled.div`
  position: absolute;
  z-index: 1;
  right: 0;
  top: 0;
  color: #979ABE;
  height: 46px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  
  .tvl-value {
    color: var(--button-color);
    font-weight: 600;
  }
`;
const StyledContent = styled.div``;

const ERC20_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: "owner",
        type: "address",
      },
      {
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "spender",
        type: "address",
      },
      {
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];
const QUERY_POOL_ABI = [
  {
    "inputs": [],
    "name": "slot0",
    "outputs": [
      { "internalType": "uint160", "name": "sqrtPriceX96", "type": "uint160" },
      { "internalType": "int24", "name": "tick", "type": "int24" },
      { "internalType": "uint16", "name": "observationIndex", "type": "uint16" },
      { "internalType": "uint16", "name": "observationCardinality", "type": "uint16" },
      { "internalType": "uint16", "name": "observationCardinalityNext", "type": "uint16" },
      { "internalType": "uint8", "name": "feeProtocol", "type": "uint8" },
      { "internalType": "bool", "name": "unlocked", "type": "bool" },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "liquidity",
    "outputs": [
      { "internalType": "uint128", "name": "", "type": "uint128" },
    ],
    "stateMutability": "view",
    "type": "function",
  },
];

//#region tickMath
const MAX_TICK = 887272;
const MIN_TICK = -887272;
const CLM_FEES = {
  100: {
    value: 100,
    space: 1,
    desc: "Best for stable pairs",
  },
  500: {
    value: 500,
    space: 10,
    desc: "Best for most pairs",
  },
  3000: {
    value: 3000,
    space: 60,
    desc: "Best for exotic pairs",
  },
};

function wrapNativeToken(token) {
  if (token.isNative) return { ...token, address: "0x4300000000000000000000000000000000000004" };
  return token;
}

function sortTokens(token0, token1) {
  if (!token0 || !token1) return [];
  const _token0 = wrapNativeToken(token0);
  const _token1 = wrapNativeToken(token1);
  if (_token0.address.toLowerCase() > _token1.address.toLowerCase()) return [token1, token0];

  return [token0, token1];
}

function tickToPrice({ tick, token0, token1 }) {
  const [_token0, _token1] = sortTokens(token0, token1);
  const decimals = _token1.decimals - _token0.decimals;
  const isReverse = _token1.address === token0.address;
  const price = new Big(Math.pow(1.0001, tick)).div(Math.pow(10, decimals)).toNumber();
  return isReverse ? 1 / price : price;
}

function priceToTick({ price, token0, token1 }) {
  const [_token0, _token1] = sortTokens(token0, token1);
  const decimals = _token1.decimals - _token0.decimals;
  const isReverse = _token1.address === token0.address;
  return Math.floor(Math.log(new Big(isReverse ? 1 / price : price).mul(Big(10).pow(decimals)).toNumber()) / Math.log(1.0001));
}

function nearestUsableTick(tick, fee) {
  if (!fee) return tick;
  const tickSpacing = CLM_FEES[fee].space;
  const rounded = Math.round(tick / tickSpacing) * tickSpacing;
  if (rounded < MIN_TICK) return rounded + tickSpacing;
  else if (rounded > MAX_TICK) return rounded - tickSpacing;
  else return rounded;
}

function priceToUsableTick({ price, token0, token1, fee }) {
  const tick = priceToTick({ price, token0, token1 });
  return nearestUsableTick(tick, fee);
}
//#endregion

const { parseUnits, formatUnits } = ethers.utils;

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
  account,
  chainIdNotSupport,
  isChainSupported,
} = props;

const {StakeTokens } = dexConfig;

const tabs = [
  {
    key: 1,
    title: 'Strategy Factory',
  },
  {
    key: 2,
    title: 'My Strategies',
  },
];

State.init({
  currentTabIdx: 0,
  // strategy factory selected
  currentStrategy: {},
  // my strategies selected
  record: {},
  loading: true,
  tvl: 0,
  multiplier: 0,
  numKnownMissions: 0,
  totalMissions: 12,
  // dex apr
  dexAPR: '',

  //#region user
  listData: [],
  listDataLoaded: false,
  rootAgent: {},
  listLoading: false,
  totalDeposited: '0.00',
  //#endregion
});

const handleTab = (index) => {
  if (state.currentTabIdx === index) return;
  State.update({
    currentTabIdx: index,
  });
};

const handleStrategy = (strategy) => {
  State.update({
    currentStrategy: strategy,
  });
};

const handleRecord = (_record) => {
  State.update({
    record: _record,
  });
};

const handleStrategyClose = () => {
  State.update({
    currentStrategy: {},
  });
};

const handleRecordClose = () => {
  State.update({
    record: {},
  });
};

const getTokenBalance = (token) => {
  return new Promise((resolve) => {
    if (token.address === 'native') {
      Ethers.provider()
        .getBalance(account)
        .then((rawBalance) => {
          resolve(formatUnits(rawBalance, token.decimals || 18));
        }).catch((err) => {
        console.log('get native balance error', err);
        resolve(0);
      });
      return;
    }
    const contract = new ethers.Contract(
      token.address,
      [
        {
          inputs: [{ internalType: "address", name: "account", type: "address" }],
          name: "balanceOf",
          outputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
      ],
      Ethers.provider().getSigner(),
    );
    contract
      .balanceOf(account)
      .then((_balance) => {
        resolve(formatUnits(_balance, token.decimals || 18));
      })
      .catch((err) => {
        console.log("getTokenBalance failed", err);
        resolve(0);
      });
  });
}

const handleUpdateData = () => {
  State.update({
    loading: true,
  });
};

const getTVLData = () => {
  const url = `https://stats-cdn.agentfi.io/protocolSummary.json`;
  asyncFetch(url).then((res) => {
    if (!res.ok || !res.body) {
      return;
    }
    State.update({
      // not this one, see getAppInformation fn
      // tvl: res.body.tvl,
      multiplier: res.body.multiplier,
      numKnownMissions: res.body.numKnownMissions,
    });
  }).catch((err) => {
    console.log(err);
  });
};

const getDexBalancerData = () => {
  const url = `https://api.agentfi.io/strategy/dex-balancer`;
  asyncFetch(url).then((res) => {
    if (!res.ok || !res.body || !res.body.data || !res.body.data.apr) {
      return;
    }
    const { net } = res.body.data.apr;
    State.update({
      dexAPR: Big(net || 0).toFixed(1),
    });
  }).catch((err) => {
    console.log(err);
  });
};

const formatTVL = (record) => {
  if (!record.balances || !record.balances.length) {
    return { value: '$0.00', list: [], usd: Big(0) };
  }
  const calcList = record.balances.filter((b) => !["All Gas", "Max Gas Reclaim"].includes(b.name));
  if (!calcList.length) {
    return { value: '$0.00', list: [], usd: Big(0) };
  }
  const calcValue = (balance) => {
    if (!balance) return Big(0);
    return Big(balance.balance).times(prices[balance.symbol]);
  };

  if (["Concentrated Liquidity Manager", "Dex Balancer"].includes(record.name)) {
    let totalValue = Big(0);
    const balanceList = [];
    calcList.forEach((it) => {
      if (!it.underlying) return;
      it.underlying.forEach((_it) => {
        _it.balanceValue = calcValue(_it);
        totalValue = totalValue.plus(_it.balanceValue);

        const blei = balanceList.findIndex((bl) => bl.address === _it.address);
        if (blei > -1) {
          balanceList[blei].balance = Big(balanceList[blei].balance).plus(_it.balance).toString();
          balanceList[blei].amount = Big(balanceList[blei].amount).plus(_it.amount).toString();
        } else {
          const currTk = StakeTokens.find((st) => st.symbol === _it.symbol);
          _it.icon = currTk?.icon;
          balanceList.push(_it);
        }
      });
    });
    return {
      value: `$${totalValue.toFixed(2)}`,
      list: balanceList,
      usd: totalValue,
    };
  }

  let totalValue = Big(0);
  const balanceList = [];
  calcList.forEach((it) => {
    it.balanceValue = calcValue(it);
    const currTk = StakeTokens.find((st) => st.symbol === it.symbol);
    it.icon = currTk?.icon;
    totalValue = totalValue.plus(it.balanceValue);
    balanceList.push({ ...it });
  });
  return {
    value: `$${totalValue.toFixed(2)}`,
    list: balanceList,
    usd: totalValue,
  };
};

const getListData = () => {
  if (!account || !curChain) return;
  State.update({
    listLoading: true,
  });
  const url = `https://api.agentfi.io/agents/${account}?chainID=${curChain.chain_id}`;
  asyncFetch(url).then((res) => {
    if (!res.ok || !res.body || !res.body.data) {
      return;
    }
    const ls = res.body.data || [];
    const _listData = [];
    let totalDeposited = Big(0);
    let _rootAgent = [];
    for (const it of ls) {
      if (it.agentType === 'ROOT') {
        _rootAgent = it;
        const { usd } = formatTVL(it);
        totalDeposited = totalDeposited.plus(usd);
        continue;
      }
      _listData.push(it);
    }
    _listData.forEach((record) => {
      const { usd } = formatTVL(record);
      totalDeposited = totalDeposited.plus(usd);
    });
    State.update({
      listLoading: false,
      listData: _listData,
      totalDeposited: totalDeposited.toFixed(2),
      rootAgent: _rootAgent || {},
    });
  }).catch((err) => {
    console.log('getListData failed, ', err);
    State.update({
      listLoading: false,
    });
  });
};

const handleApprove = (spender, tokenAddress, tokenAmount, tokenDecimals) => {
  return new Promise((resolve) => {
    // eth will not approve
    if (['0x0000000000000000000000000000000000000000', 'native'].includes(tokenAddress)) {
      resolve(true);
      return;
    }
    const TokenContract = new ethers.Contract(
      tokenAddress,
      ERC20_ABI,
      Ethers.provider().getSigner()
    );
    const allowanceParams = [
      // owner
      account,
      // spender
      spender,
    ];
    const approveParams = [
      // spender
      spender,
      // amount
      parseUnits(tokenAmount, tokenDecimals),
    ];
    const approveFailed = (msg) => {
      toast?.fail({
        title: "Approve Failed!",
        text: msg || `Approve ${Big(state.usdAmount).toFixed(2)} ${state.currentUsdToken.value}`,
      });
    };
    TokenContract.allowance(...allowanceParams).then((res) => {
      const allowanceValue = Big(formatUnits(res, tokenDecimals));
      if (allowanceValue.gte(tokenAmount || 0)) {
        resolve(true);
        return;
      }
      // re-approve
      TokenContract.approve(...approveParams).then((tx) => {
        tx.wait()
          .then((res) => {
            const { status, transactionHash } = res;
            if (status !== 1) {
              resolve(false);
              approveFailed();
              return;
            }
            resolve(true);
            toast?.success({
              title: "Approve Successfully!",
              tx: transactionHash,
              chainId,
            });
          })
          .catch((err) => {
            resolve(false);
            console.log(err);
            approveFailed();
          });
      })
        .catch((err) => {
          resolve(false);
          approveFailed(err?.message?.includes("user rejected transaction") ? 'User rejected transaction' : '');
        });
    }).catch((err) => {
      console.log(err);
      resolve(false);
    });
  });
};

const getAppInformation = () => {
  const url = `https://api.llama.fi/protocol/agentfi`;
  asyncFetch(url).then((res) => {
    if (!res.ok || !res.body || !res.body.tvl || !res.body.tvl.length) {
      return;
    }
    const tvlList = res.body.tvl.sort((a, b) => b.date - a.date);
    State.update({
      tvl: tvlList[0]?.totalLiquidityUSD,
    });
  }).catch((err) => {
    console.log(err);
  });
};

const {
  currentTabIdx,
  currentStrategy,
  loading,
  listLoading,
  record,
  tvl,
  multiplier,
  numKnownMissions,
  totalMissions,
  listData,
  rootAgent,
  totalDeposited,
  dexAPR,
} = state;

useEffect(() => {
  State.update({
    loading: !chainIdNotSupport,
  });
}, [chainIdNotSupport]);

useEffect(() => {
  getAppInformation();
  getTVLData();
  getDexBalancerData();
}, []);

useEffect(() => {
  if (!prices || !Object.keys(prices).length || state.listDataLoaded) return;
  getListData();
  State.update({
    listDataLoaded: true,
  });
}, [prices, state.listDataLoaded]);

return (
  <StyledContainer style={dexConfig.theme}>
    {
      loading || listLoading ? (
        <Widget src="bluebiu.near/widget/Lending.Spinner" />
      ) : (
        <>
          <StyledTabs>
            {
              tabs.map((tab, index) => (
                <div
                  className={`tab-item ${currentTabIdx === index ? 'active' : ''}`}
                  key={tab.key}
                  onClick={() => handleTab(index)}
                >
                  {tab.title}
                </div>
              ))
            }
            <StyledTabsPointer
              style={{
                left: `calc((100% - 200px * ${tabs.length}) / 2)`,
                transform: `translateX(${currentTabIdx * 200}px)`,
              }}
            />
            {
              currentTabIdx === 0 && (
                <StyledContentTopTVL>
                  <span className="tvl-label">Protocol TVL</span>
                  <span className="tvl-value">
                    $
                    <Widget
                      src="bluebiu.near/widget/Utils.FormatNumber"
                      props={{
                        number: tvl,
                      }}
                    />
                  </span>
                </StyledContentTopTVL>
              )
            }
          </StyledTabs>
          <StyledContent>
            {
              currentTabIdx === 0 && (
                <Widget
                  src={"bluebiu.near/widget/Staking.AgentFi.StrategyFactory"}
                  props={{
                    ...props,
                    currentStrategy,
                    handleStrategy,
                    onStrategyClose: handleStrategyClose,
                    getTokenBalance,
                    handleUpdateData,
                    totalMissions,
                    multiplier,
                    numKnownMissions,
                    rootAgent,
                    handleApprove,
                    tickToPrice,
                    priceToUsableTick,
                    QUERY_POOL_ABI,
                    dexAPR,
                    onSuccess: () => {
                      State.update({
                        loading: true,
                      });
                      getListData();
                    },
                  }}
                />
              )
            }
            {
              currentTabIdx === 1 && (
                <Widget
                  src={"bluebiu.near/widget/Staking.AgentFi.MyStrategies"}
                  props={{
                    ...props,
                    record,
                    handleRecord,
                    onRecordClose: handleRecordClose,
                    getTokenBalance,
                    multiplier,
                    numKnownMissions,
                    totalMissions,
                    listData,
                    loading: listLoading,
                    totalDeposited,
                    rootAgent,
                    formatTVL,
                    handleApprove,
                    tickToPrice,
                    priceToUsableTick,
                    QUERY_POOL_ABI,
                    onSuccess: () => {
                      State.update({
                        loading: true,
                      });
                      getListData();
                    },
                  }}
                />
              )
            }
          </StyledContent>
        </>
      )
    }
    <Widget
      src="bluebiu.near/widget/Staking.AgentFi.Data"
      props={{
        update: loading,
        account,
        wethAddress,
        multicallAddress,
        multicall,
        prices,
        ...dexConfig,
        onLoad: (data) => {
          State.update({
            loading: false,
            ...data,
          });
        },
      }}
    />
    {!isChainSupported && (
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
