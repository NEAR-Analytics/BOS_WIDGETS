const { title, chainId, theme } = props;
const WETH_ADDRESS = "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1";
const DexConfig = {
  Camelot: {
    factoryAddress: "0x6EcCab422D763aC031210895C81787E87B43A652",
    routerAddress: "0xc873fEcbd354f5A56E00E710B90EF4201db2448d",
    uniType: "v2",
    defaultCurrencies: {
      input: {
        chainId: props.chainId,
        address: "native",
        decimals: 18,
        symbol: "ETH",
        name: "Ether",
        icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
      },
      output: {
        chainId: props.chainId,
        address: "0x3d9907F9a368ad0a51Be60f7Da3b97cf940982D8",
        decimals: 18,
        symbol: "GRAIL",
        name: "Camelot token",
        icon: "https://arbiscan.io/token/images/camelotexchange_32.png",
      },
    },
  },
  Apeswap: {
    factoryAddress: "0xCf083Be4164828f00cAE704EC15a36D711491284",
    routerAddress: "0x7d13268144adcdbEBDf94F654085CC15502849Ff",
    uniType: "v2",
    defaultCurrencies: {
      input: {
        chainId: props.chainId,
        address: "native",
        decimals: 18,
        symbol: "ETH",
        name: "Ether",
        icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
      },
      output: {
        chainId: props.chainId,
        address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        decimals: 6,
        symbol: "USDT",
        name: "Tether USD",
        icon: "https://arbiscan.io/token/images/tether_32.png",
      },
    },
  },
  Spartadex: {
    factoryAddress: "0xFe8EC10Fe07A6a6f4A2584f8cD9FE232930eAF55",
    routerAddress: "0x89AE36E3B567b914a5E97E6488C6EB5b9C5d0231",
    uniType: "v2",
    defaultCurrencies: {
      input: {
        chainId: props.chainId,
        address: "native",
        decimals: 18,
        symbol: "ETH",
        name: "Ether",
        icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
      },
      output: {
        chainId: props.chainId,
        address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
        decimals: 18,
        symbol: "ARB",
        name: "Arbitrum",
        icon: "https://arbiscan.io/token/images/arbitrumone2_32_new.png",
      },
    },
  },
  "Ramses V2": {
    factoryAddress: "0xAA2cd7477c451E703f3B9Ba5663334914763edF8",
    routerAddress: "0xAA23611badAFB62D37E7295A682D21960ac85A90",
    quoterAddress: "0xAA20EFF7ad2F523590dE6c04918DaAE0904E3b20",
    uniType: "v3",
    defaultCurrencies: {
      input: {
        chainId: props.chainId,
        address: "native",
        decimals: 18,
        symbol: "ETH",
        name: "Ether",
        icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
      },
      output: {
        chainId: props.chainId,
        address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        decimals: 6,
        symbol: "USDC",
        name: "USD Coin",
        icon: "https://arbiscan.io/token/images/centre-usdc_28.png",
      },
    },
  },
};
let initialLoading = false;
if (Storage.privateGet("prevTitle") !== title || !state.config) {
  State.update({
    config: DexConfig[title],
    inputCurrency: DexConfig[title].defaultCurrencies.input,
    outputCurrency: DexConfig[title].defaultCurrencies.output,
    uniType: DexConfig[title].type,
    inputCurrencyAmount: "1",
    outputCurrencyAmount: "",
    maxInputBalance: "0",
    maxOutputBalance: "0",
    tradeType: "in",
    targetUnitAmount: 0,
    noPair: false,
    updateInputTokenBalance: true,
    updateOutputTokenBalance: true,
    loading: true,
    displayCurrencySelect: false,
    selectedTokenAddress: "",
    currencySelectType: 0,
  });
  initialLoading = true;
  Storage.privateSet("prevTitle", title);
}
// styled area
const SwapContainer = styled.div``;
const Title = styled.div`
  color: ${theme.textColor};
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  padding-left: 30px;
  padding-bottom: 10px;
  @media (max-width: 900px) {
    display: none;
  }
`;
const Panel = styled.div`
  width: 100%;
  border-radius: 16px;
  border: 1px solid #2c334b;
  padding: 30px;
  background-color: #181a27;
`;
const ExchangeIcon = styled.div`
  width: 60px;
  margin: 20px auto;
  svg {
    color: ${theme.textColor};
  }
`;
const PanelLabel = styled.div`
  color: ${theme.textColor};
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
`;
const Price = styled.div`
  font-size: 14px;
  color: #4f5375;
  text-align: right;
  margin-bottom: 30px;
  margin-top: 20px;
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;
const SwapButton = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  background-color: ${theme.buttonColor};
  color: #fff;
  font-size: 18px;
  line-height: 22px;
  border: none;
  transition: 0.5s;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
// styled area end

const getPairContract = (_pairAddress) =>
  new ethers.Contract(
    _pairAddress,
    [
      {
        constant: true,
        inputs: [],
        name: "getReserves",
        outputs: [
          { internalType: "uint112", name: "_reserve0", type: "uint112" },
          { internalType: "uint112", name: "_reserve1", type: "uint112" },
          {
            internalType: "uint32",
            name: "_blockTimestampLast",
            type: "uint32",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "token0",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );

const RouterContract = new ethers.Contract(
  state.config.routerAddress,
  [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amountOut",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "reserveIn",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "reserveOut",
          type: "uint256",
        },
      ],
      name: "getAmountIn",
      outputs: [
        {
          internalType: "uint256",
          name: "amountIn",
          type: "uint256",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amountIn",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "reserveIn",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "reserveOut",
          type: "uint256",
        },
      ],
      name: "getAmountOut",
      outputs: [
        {
          internalType: "uint256",
          name: "amountOut",
          type: "uint256",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
  ],
  Ethers.provider().getSigner()
);

const FactoryContract = new ethers.Contract(
  state.config.factoryAddress,
  [
    {
      constant: true,
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "address", name: "", type: "address" },
      ],
      name: "getPair",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ],
  Ethers.provider().getSigner()
);
const getBestTrade = () => {
  const curDexUniType = DexConfig[title].uniType;
  if (
    !state.inputCurrency.address ||
    !state.outputCurrency.address ||
    curDexUniType === "v3"
  ) {
    State.update({
      loading: false,
    });
    return;
  }
  const wrapType =
    state.inputCurrency.address === "native" &&
    state.outputCurrency.symbol === "WETH"
      ? 1
      : state.inputCurrency.symbol === "WETH" &&
        state.outputCurrency.address === "native"
      ? 2
      : 0;
  if (wrapType) {
    State.update(
      state.tradeType === "in"
        ? {
            outputCurrencyAmount: state.inputCurrencyAmount,
            loading: false,
            noPair: false,
          }
        : {
            inputCurrencyAmount: state.outputCurrencyAmount,
            loading: false,
            noPair: false,
          }
    );
    return;
  }
  const currentCurrency =
    state.tradeType === "in" ? state.inputCurrency : state.outputCurrency;
  const currentAmount = Big(
    state.tradeType === "in"
      ? state.inputCurrencyAmount
      : state.outputCurrencyAmount
  )
    .mul(0.995)
    .toFixed(5);
  const outCurrency =
    state.tradeType === "in" ? state.outputCurrency : state.inputCurrency;
  const RouterContract = new ethers.Contract(
    state.config.routerAddress,
    [
      {
        inputs: [
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "address[]", name: "path", type: "address[]" },
        ],
        name: "getAmountsOut",
        outputs: [
          { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );
  const path = [
    currentCurrency.address === "native"
      ? WETH_ADDRESS
      : currentCurrency.address,
    outCurrency.address === "native" ? WETH_ADDRESS : outCurrency.address,
  ];
  RouterContract.getAmountsOut(
    ethers.utils.parseUnits(currentAmount, currentCurrency.decimals),
    path
  )
    .then((res) => {
      State.update({
        outputCurrencyAmount: Big(
          ethers.utils.formatUnits(res[1], outCurrency.decimals)
        ).toFixed(4),
        loading: false,
        noPair: false,
      });
    })
    .catch(() => {
      State.update({
        loading: false,
        noPair: true,
      });
    });
};

if (initialLoading) {
  getBestTrade();
}

function debounce(fn, wait) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, wait);
  };
}
const debouncedGetBestTrade = debounce(getBestTrade, 500);

const getUnitAmount = () => {
  const bigInputAmount = Big(state.inputCurrencyAmount || 0);
  const bigOutputAmount = Big(state.outputCurrencyAmount || 0);
  if (bigInputAmount.eq(0) || bigOutputAmount.eq(0)) return "-";
  const unitAmount = bigOutputAmount.div(bigInputAmount);
  if (unitAmount.lt(0.001)) return unitAmount.toPrecision(1);
  return unitAmount.toFixed(3);
};

return (
  <SwapContainer>
    <Title>{title}</Title>
    <Panel>
      <PanelLabel>Swap From</PanelLabel>
      <Widget
        src="bluebiu.near/widget/Arbitrum.Swap.CurrencyInput"
        props={{
          currency: state.inputCurrency,
          amount: state.inputCurrencyAmount,
          updateTokenBalance: state.updateInputTokenBalance,
          onCurrencySelectOpen: () => {
            State.update({
              displayCurrencySelect: true,
              currencySelectType: 0,
              selectedTokenAddress: state.inputCurrency.address,
            });
          },
          onUpdateCurrencyBalance: (balance) => {
            State.update({
              maxInputBalance: ethers.utils.formatUnits(
                balance,
                state.inputCurrency.decimals
              ),
              updateInputTokenBalance: false,
            });
          },
          onAmountChange: (val) => {
            State.update({
              inputCurrencyAmount: val,
              tradeType: "in",
              loading:
                val &&
                Number(val) &&
                state.inputCurrency.address &&
                state.outputCurrency.address,
            });
            if (val && Number(val)) debouncedGetBestTrade();
          },
        }}
      />
      <ExchangeIcon
        onClick={() => {
          const [inputCurrency, outputCurrency] = [
            state.outputCurrency,
            state.inputCurrency,
          ];
          State.update({
            inputCurrency,
            outputCurrency,
            outputCurrencyAmount: "",
            tradeType: "in",
            updateInputTokenBalance: true,
            updateOutputTokenBalance: true,
            loading: true,
          });
          if (Big(state.inputCurrencyAmount || 0).gt(0)) getBestTrade();
        }}
      >
        <Widget src="bluebiu.near/widget/Base.BaseExchangeIcon" />
      </ExchangeIcon>
      <PanelLabel>To</PanelLabel>
      <Widget
        src="bluebiu.near/widget/Arbitrum.Swap.CurrencyInput"
        props={{
          currency: state.outputCurrency,
          amount: state.outputCurrencyAmount,
          updateTokenBalance: state.updateOutputTokenBalance,
          disabled: true,
          onCurrencySelectOpen: () => {
            State.update({
              displayCurrencySelect: true,
              currencySelectType: 1,
              selectedTokenAddress: state.outputCurrency.address,
            });
          },
          onUpdateCurrencyBalance: () => {
            State.update({
              updateOutputTokenBalance: false,
            });
          },
        }}
      />
      <Price>
        1 {state.inputCurrency.symbol}≈ {getUnitAmount()}{" "}
        {state.outputCurrency.symbol}
      </Price>
      <Widget
        src="bluebiu.near/widget/Arbitrum.Swap.SwapButton"
        props={{
          routerAddress: state.config.routerAddress,
          wethAddress: WETH_ADDRESS,
          title,
          inputCurrency: state.inputCurrency,
          outputCurrency: state.outputCurrency,
          inputCurrencyAmount: state.inputCurrencyAmount,
          outputCurrencyAmount: state.outputCurrencyAmount,
          maxInputBalance: state.maxInputBalance,
          onSuccess: () => {
            State.update({
              updateInputTokenBalance: true,
              updateOutputTokenBalance: true,
            });
          },
          noPair: state.noPair,
          loading: state.loading,
          fee: state.v3Fee,
          uniType: DexConfig[title].uniType,
          theme: props.theme,
        }}
      />
    </Panel>
    {state.displayCurrencySelect && (
      <Widget
        src="bluebiu.near/widget/Arbitrum.Swap.CurrencySelect"
        props={{
          display: state.displayCurrencySelect,
          selectedTokenAddress: state.selectedTokenAddress,
          title: props.title,
          chainId: props.chainId,
          onClose: () => {
            State.update({
              displayCurrencySelect: false,
            });
          },
          onSelect: (currency) => {
            const updatedParams = {
              outputCurrencyAmount: "",
              noPair: false,
              updateInputTokenBalance: true,
            };
            if (state.currencySelectType === 0) {
              updatedParams.inputCurrency = currency;
              if (currency.address === state.outputCurrency.address)
                updatedParams.outputCurrency = null;
            }
            if (state.currencySelectType === 1) {
              updatedParams.outputCurrency = currency;
              if (currency.address === state.inputCurrency.address) {
                updatedParams.inputCurrency = null;
                updatedParams.inputCurrencyAmount = "";
              }
            }
            if (
              state.inputCurrencyAmount &&
              Number(state.inputCurrencyAmount) &&
              state.inputCurrency?.address
            ) {
              updatedParams.loading = true;
            }
            State.update(updatedParams);
            if (updatedParams.loading) getBestTrade();
          },
        }}
      />
    )}

    {DexConfig[title].uniType === "v3" && (
      <Widget
        src="bluebiu.near/widget/Arbitrum.Swap.QuoterV3"
        props={{
          amountIn: state.inputCurrencyAmount,
          tokenIn: state.inputCurrency,
          tokenOut: state.outputCurrency,
          quoterContractId: DexConfig[title].quoterAddress,
          loadAmountOut: (data) => {
            State.update({
              outputCurrencyAmount: data.amountOut,
              v3Fee: data.fee,
              loading: false,
            });
          },
        }}
      />
    )}
  </SwapContainer>
);
