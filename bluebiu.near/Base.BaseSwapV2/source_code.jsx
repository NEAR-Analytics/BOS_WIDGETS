const { title } = props;
const WETH_ADDRESS = "0x4200000000000000000000000000000000000006";
const DexConfig = {
  BaseSwap: {
    factoryAddress: "0xFDa619b6d20975be80A10332cD39b9a4b0FAa8BB",
    routerAddress: "0x327Df1E6de05895d2ab08513aaDD9313Fe505d86",
    uniType: "v2",

    defaultCurrencies: {
      input: {
        chainId: 8453,
        address: "native",
        decimals: 18,
        symbol: "ETH",
        name: "Ether",
        icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
      },
      output: {
        chainId: 8453,
        address: "0x78a087d713Be963Bf307b18F2Ff8122EF9A63ae9",
        decimals: 18,
        symbol: "BSWAP",
        name: "Baseswap Token",
        icon: "https://baseswap.fi/images/tokens/0x78a087d713be963bf307b18f2ff8122ef9a63ae9.png",
      },
    },
  },
  RocketSwap: {
    factoryAddress: "0x1B8128c3A1B7D20053D10763ff02466ca7FF99FC",
    routerAddress: "0x4cf76043B3f97ba06917cBd90F9e3A2AAC1B306e",
    uniType: "v2",

    defaultCurrencies: {
      input: {
        chainId: 8453,
        address: "native",
        decimals: 18,
        symbol: "ETH",
        name: "Ether",
        icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
      },
      output: {
        chainId: 8453,
        address: "0x6653dD4B92a0e5Bf8ae570A98906d9D6fD2eEc09",
        decimals: 18,
        symbol: "RCKT",
        name: "RocketSwap",
        icon: "https://app.rocketswap.cc/_next/image?url=https%3A%2F%2Ftoken.g34gsgv.top%2Flogo.png&w=256&q=75",
      },
    },
  },
  SwapBased: {
    factoryAddress: "0x04C9f118d21e8B767D2e50C946f0cC9F6C367300",
    routerAddress: "0xaaa3b1F1bd7BCc97fD1917c18ADE665C5D31F066",
    uniType: "v2",
    defaultCurrencies: {
      input: {
        chainId: 8453,
        address: "native",
        decimals: 18,
        symbol: "ETH",
        name: "Ether",
        icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
      },
      output: {
        chainId: 8453,
        address: "0xd07379a755A8f11B57610154861D694b2A0f615a",
        decimals: 18,
        symbol: "BASE",
        name: "BASE Token",
        icon: "https://swapbased.finance/static/media/0xd07379a755a8f11b57610154861d694b2a0f615a.8e4c7d33.png",
      },
    },
  },
  Synthswap: {
    factoryAddress: "0x4bd16d59A5E1E0DB903F724aa9d721a31d7D720D",
    routerAddress: "0x8734B3264Dbd22F899BCeF4E92D442d538aBefF0",
    uniType: "v2",

    defaultCurrencies: {
      input: {
        chainId: 8453,
        address: "native",
        decimals: 18,
        symbol: "ETH",
        name: "Ether",
        icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
      },
      output: {
        chainId: 8453,
        address: "0xbd2DBb8eceA9743CA5B16423b4eAa26bDcfE5eD2",
        decimals: 18,
        symbol: "SYNTH",
        name: "Synth Token",
        icon: "https://www.synthswap.io/_next/image?url=%2Fimages%2Ftokens%2Fsynth.png&w=64&q=100",
      },
    },
  },
  HorizonDEX: {
    factoryAddress: "0x07AceD5690e09935b1c0e6E88B772d9440F64718",
    routerAddress: "0x99AEC509174Cbf06F8F7E15dDEeB7bcC32363827",
    quoterAddress: "0x94ddDe405A00180891eD79Dc1147F0d841c30D73",
    uniType: "v3",
    defaultCurrencies: {
      input: {
        chainId: 8453,
        address: "native",
        decimals: 18,
        symbol: "ETH",
        name: "Ether",
        icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
      },
      output: {
        chainId: 8453,
        address: "0x081AD949deFe648774C3B8deBe0E4F28a80716dc",
        decimals: 18,
        symbol: "HZN",
        name: "Horizon",
        icon: "https://assets.coingecko.com/coins/images/31156/small/Circle_logo_black_%281%29.png?1691040942",
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
const BaseSwap = styled.div``;
const Title = styled.div`
  color: #3d76ff;
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
    color: #82a7ff;
  }
`;
const PanelLabel = styled.div`
  color: #82a7ff;
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
  background-color: #004bfc;
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
  <BaseSwap>
    <Title>{title}</Title>
    <Panel>
      <PanelLabel>Swap From</PanelLabel>
      <Widget
        src="bluebiu.near/widget/Base.BaseCurrencyInput"
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
        src="bluebiu.near/widget/Base.BaseCurrencyInput"
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
        src="bluebiu.near/widget/Base.BaseSwapButton"
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
        }}
      />
    </Panel>
    {state.displayCurrencySelect && (
      <Widget
        src="bluebiu.near/widget/Base.BaseCurrencySelect"
        props={{
          display: state.displayCurrencySelect,
          selectedTokenAddress: state.selectedTokenAddress,
          title: props.title,
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
        src="bluebiu.near/widget/Base.BaseQuoterV3"
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
  </BaseSwap>
);
