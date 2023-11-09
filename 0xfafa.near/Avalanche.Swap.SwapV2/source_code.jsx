const { title } = props;
const WETH_ADDRESS = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7";
const DexConfig = {
  TraderJoe: {
    factoryAddress: "0x8e42f2F4101563bF679975178e880FD87d3eFd4e",
    routerAddress: "0xb4315e873dBcf96Ffd0acd8EA43f689D8c20fB30",
    quoterAddress: "0xd76019A16606FDa4651f636D9751f500Ed776250",
    uniType: "v3",
    defaultCurrencies: {
      input: {
        chainId: 43114,
        address: "native",
        decimals: 18,
        symbol: "AVAX",
        name: "Avalanche",
        icon: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/avalanchec/assets/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png",
      },
      output: {
        chainId: 43114,
        address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
        decimals: 18,
        symbol: "WAVAX",
        name: "Wrapped AVAX",
        icon: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/avalanchec/assets/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png",
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
const AVAXSwap = styled.div``;
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
  border: 1px solid #ececfe;
  padding: 30px;
  background-color: #FFF;
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
  <AVAXSwap>
    <Title>{title}</Title>
    <Panel>
      <PanelLabel>Swap From</PanelLabel>
      <Widget
        src="0xfafa.near/widget/Avalanche.Swap.CurrencyInput"
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
        <Widget src="0xfafa.near/widget/Avalanche.Swap.ExchangeIcon" />
      </ExchangeIcon>
      <PanelLabel>To</PanelLabel>
      <Widget
        src="0xfafa.near/widget/Avalanche.Swap.CurrencyInput"
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
        src="0xfafa.near/widget/Avalanche.Swap.SwapButton"
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
        src="0xfafa.near/widget/Avalanche.Swap.CurrencySelect"
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
        src="0xfafa.near/widget/Avalanche.Swap.QuoterV3"
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
  </AVAXSwap>
);
