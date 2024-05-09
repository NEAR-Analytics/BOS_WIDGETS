const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Chains = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ChainWrapper = styled.div`
  &:first-child {
    width: 60%;
  }
  &:nth-child(2) {
    width: 40%;
  }
  
`;
const Label = styled.div`
  font-family: Gantari;
  font-size: 18px;
  font-weight: 500;
  color: #979abe;
  &.spe {
    color: var(--spe-text-color);
  }
`;
const ChainLogo = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 10px;
`;
const ChainName = styled.div`
  font-family: Gantari;
  font-size: 18px;
  font-weight: 500;
  color: var(--chain-name-color);
`;
const ExchangeIcon = styled.div`
  color: #979abe;
  transform: rotate(90deg);
  margin-right: 30px;
  margin-top: 20px;
`;
const Chain = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
`;
const Receive = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
const AmountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;
const Amount = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: var(--chain-name-color);
`;
const Value = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: var(--thirdary-text-color);
`;
const Send = styled.div`
  position: relative;
`;
const ErrorTips = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #ff61d3;
`;

const {
  chain,
  mainnet,
  tokens,
  amountOutFn,
  chainId,
  handlerSwap,
  handleStargateTx,
  showNetwrokDialog,
  account,
  prices,
  showFee,
} = props;

const reverseCurrency = (_currency) => {
  const [_address, _decimals, _poolId] = [
    _currency.address,
    _currency.decimals,
    _currency.poolId,
  ];
  _currency.address = _currency.targetAddress;
  _currency.decimals = _currency.targetDecimals;
  _currency.poolId = _currency.targetPoolId;
  _currency.targetAddress = _address;
  _currency.targetDecimals = _decimals;
  _currency.targetPoolId = _poolId;

  return _currency;
};

const checkGas = (gasCost) => {
  if (!account || !gasCost) return;
  const provider = Ethers.provider();
  State.update({ checkingGas: true });
  provider.getBalance(account).then((rawBalance) => {
    const balance = ethers.utils.formatUnits(rawBalance._hex, 18);
    const _balance = state.currency.isNative
      ? Big(balance || 0).minus(state.amount || 0)
      : Big(balance || 0);

    State.update({
      isGasEnough: !_balance.lt(gasCost || 0),
      checkingGas: false,
    });
  });
};

useEffect(() => {
  if (Big(state.amount || 0).gt(state.maxInputBalance || 0)) {
    State.update({
      errorTips: "Invalid amount! Amount should be less than token balance",
    });
    return;
  }
  State.update({
    errorTips: "",
  });
}, [state.maxInputBalance, state.amount]);

useEffect(() => {
  const chains = chainId === chain.id ? [chain, mainnet] : [mainnet, chain];
  const params = {
    from: chains[0],
    to: chains[1],
    amount: "1",
    currency:
      chainId === mainnet.id
        ? cached_token || reverseCurrency(tokens[0])
        : cached_token || tokens[0],
    updateInputTokenBalance: true,
    loading: true,
  };
  if (chainId === mainnet.id) {
    params.tokens = tokens.map((token) => reverseCurrency(token));
  }
  State.update(params);
}, [chainId]);

useEffect(() => {
  function debounce(fn, wait) {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(fn, wait);
    };
  }

  const getTrade = () => {
    State.update({
      loading: true,
      isGasEnough: true,
    });
  };

  const debouncedGetTrade = debounce(getTrade, 500);

  State.update({
    debouncedGetTrade,
  });
}, []);

return (
  <>
    <Chains
      onClick={() => {
        State.update({ displayCurrencySelect: false });
      }}
    >
      <ChainWrapper >
        <Label className="spe">Bridge from</Label>
        <Flex>
          <Chain>
            {state.from.logo && <ChainLogo src={state.from.logo} />}
            <ChainName>{state.from.name}</ChainName>
          </Chain>
          <ExchangeIcon
            onClick={() => {
              showNetwrokDialog(state.to.id);
            }}
          >
            <Widget src="bluebiu.near/widget/Arbitrum.Swap.ExchangeIcon" />
          </ExchangeIcon>
        </Flex>
      </ChainWrapper>
      <ChainWrapper>
        <Label className="spe">To</Label>
        <Chain>
          {state.to.logo && <ChainLogo src={state.to.logo} />}
          <ChainName>{state.to.name}</ChainName>
        </Chain>
      </ChainWrapper>
    </Chains>
    <Send>
      <Label>Send</Label>
      <Widget
        src="bluebiu.near/widget/Base.Bridge.Input"
        props={{
          currency: state.currency,
          amount: state.amount,
          updateTokenBalance: state.updateInputTokenBalance,
          account,
          price: prices[state.currency.symbol],
          onCurrencySelectOpen: () => {
            State.update({
              displayCurrencySelect: !state.displayCurrencySelect,
              selectedTokenAddress: state.currency.address,
            });
          },
          onUpdateCurrencyBalance: (balance) => {
            State.update({
              maxInputBalance: ethers.utils.formatUnits(
                balance,
                state.currency.decimals
              ),
              updateInputTokenBalance: false,
            });
          },
          onAmountChange: (val) => {
            const params = {
              amount: val,
            };
            if (val && Number(val) && state.currency.address)
              state.debouncedGetTrade();
            State.update(params);
          },
        }}
      />
      <ErrorTips>{state.errorTips}</ErrorTips>
      <Widget
        src="bluebiu.near/widget/Base.Bridge.TokenList"
        props={{
          display: state.displayCurrencySelect,
          selectedTokenAddress: state.selectedTokenAddress,
          tokens: state.tokens || tokens || [],
          onClose: () => {
            State.update({
              displayCurrencySelect: false,
            });
          },
          onSelect: (currency) => {
            const params = {
              displayCurrencySelect: false,
              currency,
              updateInputTokenBalance: true,
            };
            if (state.amount) state.debouncedGetTrade();
            State.update(params);
          },
        }}
      />
    </Send>
    {
      showFee && <Receive>
        <Label>Fee</Label>
        <AmountWrapper>
          <Amount>
          {!state.gasCost
              ? "-"
              : Big(state.gasCost || 0).lt(0.0001)
              ? "<0.0001"
              : Big(state.gasCost).toFixed(4, 0)}{" "}
            {state.currency?.symbol}
          </Amount>
        </AmountWrapper>
      </Receive>
    }
    <Receive>
      <Label>Receive</Label>
      <AmountWrapper>
        <Amount>
          {!state.received
            ? "-"
            : Big(state.received || 0).lt(0.0001)
            ? "<0.0001"
            : Big(state.received).toFixed(4, 0)}{" "}
          {state.currency?.symbol}
        </Amount>
        <Value>
          ≈ $
          <Widget
            src="bluebiu.near/widget/Base.Bridge.Value"
            props={{
              price: prices[state.currency.symbol],
              amount: state.received,
            }}
          />
        </Value>
      </AmountWrapper>
    </Receive>
    <Widget
      src="bluebiu.near/widget/Base.Bridge.Button"
      props={{
        disabled: state.errorTips,
        amount: state.amount,
        maxInputBalance: state.maxInputBalance,
        currency: state.currency,
        target: {
          id: state.to?.id,
          dstId: state.to?.dstId,
          address: state.currency?.targetAddress,
          poolId: state.currency?.targetPoolId,
          name: state.to?.name,
        },
        from: state.from,
        gasCost: state.gasCost,
        isGasEnough: state.isGasEnough,
        handlerSwap,
        addAction: props.addAction,
        toast: props.toast,
        loading: state.loading || state.checkingGas,
        account,
        quote: state.quote,
        onSuccess: (hash) => {
          handleStargateTx({
            hash,
            amount: state.amount,
            price: prices[state.currency.symbol],
            from: state.from,
            to: state.to,
            currency: state.currency,
          });
          State.update({
            updateInputTokenBalance: true,
          });
        },
      }}
    />
    <Widget
      src={amountOutFn}
      props={{
        loading: state.loading,
        amount: state.amount,
        target: {
          dstId: state.to?.dstId,
          address: state.currency?.targetAddress,
        },
        source: {
          decimals: state.currency.decimals,
          address: state.currency?.address,
        },
        currency: state.currency,
        from: state.from,
        to: state.to,
        routerAddress: state.from?.routerAddress,
        onLoad: (data) => {
          console.log("data:", data);
          if (typeof data.amount === 'undefined' || data.amount === state.amount) {
            State.update({
              loading: false,
              ...data,
            });
          }
          checkGas(data.gasCost);
        },
      }}
    />
  </>
);
