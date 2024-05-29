const StyledContainer = styled.div`
  padding-top: 18px;
  width: 478px;
  border: 1px solid rgba(55, 58, 83, 1);
  border-radius: 16px;
  margin: 50px auto 0;
  padding: 20px 0 0px;
  position: relative;
`;
const Content = styled.div`
  padding: 20px 15px;
`;
const Wrapper = styled.div``;
const BlurWrap = styled.div`
  position: relative;
`;
const Blur = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  backdrop-filter: blur(4px);
`;
const Summary = styled.div`
  display: flex;
  padding: 0 20px 20px;
  border-bottom: 1px solid rgba(55, 58, 83, 1);
  align-items: center;
  justify-content: space-between;
`;

const SummaryItem = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  .title {
    color: rgba(151, 154, 190, 1);
  }
  .amount {
    margin-top: 5px;
    color: rgba(255, 255, 255, 1);
  }
`;
const Panel = styled.div`
  height: 100px;
  border-radius: 12px;
  border: 1px solid rgba(55, 58, 83, 1);
  background-color: rgba(46, 49, 66, 1);
  padding: 15px;
  margin-bottom: 20px;
  .title {
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    color: rgba(151, 154, 190, 1);
  }
  .body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  .foot {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    color: rgba(151, 154, 190, 1);
  }
`;
const Input = styled.input`
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  border: none;
  height: 24px;
  width: 200px;
  outline: none;
  background-color: transparent;
  padding: 0;
  &:focus {
    color: #fff;
    background-color: transparent;
    border-color: transparent;
    outline: none;
    box-shadow: none;
  }
`;
const List = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  .keys {
    color: rgba(151, 154, 190, 1);
  }
  .values {
    color: #fff;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;
const Btn = styled.button`
  background-color: var(--switch-color);
  color: var(--button-text-color);

  display: block;
  width: 100%;
  /* width: 130px;
  height: 40px; */
  height: 56px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background-color: #075a5a;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.5;
  }
`;

const {
  dexConfig,
  wethAddress,
  multicallAddress,
  chainIdNotSupport,
  multicall,
  prices,
  account,
  addAction,
  toast,
  chainId,
  nativeCurrency,
  tab,
  StakeTokens,
  ExchangeToken,
  onChange,
} = props;
const { parseUnits, formatUnits } = ethers.utils;
console.log("Content--", props);
const { tokenPairs } = dexConfig;
State.init({
  stakeAmount: "",
  curToken: "", // token symbol
  exchangeRate: "",
  options: [],

  tokenBal: 0,
  showDialog: false,
});

useEffect(() => {
  State.update({
    loading: !chainIdNotSupport,
  });
}, []);

useEffect(() => {
  console.log("tab--", tab);
  const options = StakeTokens?.map((item) => ({
    text: item.symbol,
    value: item.symbol,
  }));
  State.update({
    options,
    curToken: options[0].value,
  });
}, [tab]);

const clickBalance = (_bal) => {
  State.update({
    stakeAmount: Big(_bal).toFixed(4, 0),
  });
};
function getExchangeRate(symbol) {
  const url = `https://universe.kelpdao.xyz/rseth/exchangeRate/?lrtToken=${symbol}`;
  return asyncFetch(url)
    .then((res) => {
      return res.body.value;
    })
    .catch((err) => {
      console.log("Catch - getExchangeRate--", err);
      setTimeout(getExchangeRate, 500);
    });
}
function fetchData(url) {
  return asyncFetch(url);
}
function getAPY() {
  const url = `https://universe.kelpdao.xyz/rseth/apy`;
  fetchData(url)
    .then((res) => {
      State.update({
        APY: res.body.value || "-",
      });
    })
    .catch((err) => {
      setTimeout(getAPY, 500);
      console.log("Catch-getAPY--", err);
    });
}
function getTVL() {
  const url = `https://universe.kelpdao.xyz/rseth/tvl/?lrtToken`;
  fetchData(url)
    .then((res) => {
      State.update({
        TVL: res.body.usdTvl || "-",
      });
    })
    .catch((err) => {
      console.log("Catch-getTVL--", err);
    });
}

useEffect(() => {
  getAPY();
  getTVL();
}, []);

useEffect(() => {
  if (!state.curToken) return;

  getExchangeRate(state.curToken).then((_rate) => {
    State.update({
      exchangeRate: _rate,
    });
  });

  if (tab === "Stake") {
    const _bal = StakeTokens.find(
      (item) => item.symbol === state.curToken
    ).balance;

    State.update({
      tokenBal: _bal,
    });
  }
}, [state.curToken, tab]);

// rsETH balance
function getTokenBalance() {
  const contract = new ethers.Contract(
    ExchangeToken.address,
    [
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );
  contract
    .balanceOf(account)
    .then((_balance) => {
      const _bal = formatUnits(_balance, ExchangeToken.decimals);
      console.log("get-resETH-balance--", _balance, balance);
      State.update({
        tokenBal: _bal,
      });
    })
    .catch((err) => {
      console.log("Catch-getTokenBalance-error--", err);
    });
}
useEffect(() => {
  // ethereum unstake
  if (chainId !== 1) return;
  if (tab === "Unstake") {
    getTokenBalance();

    const options = StakeTokens?.map((item) => ({
      text: item.symbol,
      value: item.symbol,
    })).filter((item) => item.value !== "ETH");
    State.update({
      options,
      curToken: options[0].value,
    });
  }
}, [tab]);

function handleTabChange() {
  // const curTab = tab === "Stake" ? "Unstake" : "Stake";
  // onChange(curTab);
}
function handleOpenWrap() {
  State.update({
    showDialog: true,
  });
}
function handleCloseWrap() {
  State.update({
    showDialog: false,
  });
}
console.log("state--", state);
return (
  <div>
    <StyledContainer>
      <Wrapper>
        <Summary>
          <SummaryItem>
            <div className="title">TVL</div>
            <div className="amount">
              $
              <Widget
                src="bluebiu.near/widget/Utils.FormatNumber"
                props={{
                  number: state.TVL,
                }}
              />
            </div>
          </SummaryItem>
          <SummaryItem>
            <div className="title">APY</div>
            <div className="amount">{state.APY}%</div>
          </SummaryItem>
        </Summary>

        <Content>
          <BlurWrap>
            {chainId !== 1 && (tab === "Unstake" || tab === "Withdraw") ? (
              <Blur></Blur>
            ) : null}

            <Panel>
              <div className="title">
                {tab === "Unstake" ? "Withdraw rsETH as" : tab}
              </div>
              <div className="body">
                <Input
                  type="text"
                  placeholder="0"
                  value={state.stakeAmount}
                  onChange={(ev) => {
                    if (isNaN(Number(ev.target.value))) return;
                    let amount = ev.target.value.replace(/\s+/g, "");

                    if (Big(amount || 0).gt(Big(state.tokenBal || 0))) {
                      amount = Big(state.tokenBal || 0).toFixed(4, 0);
                    }
                    State.update({
                      stakeAmount: amount,
                    });
                  }}
                />
                <Widget
                  src="bluebiu.near/widget/UI.Select.Index"
                  props={{
                    options: state.options,
                    value: state.options.find(
                      (obj) => obj.value === state.curToken
                    ),
                    onChange: (option) => {
                      console.log("onchange--", option);
                      State.update({
                        curToken: option.value,
                      });
                    },
                  }}
                />
              </div>
              <div className="foot">
                <div class="prices">
                  $
                  {Big(state.stakeAmount || 0)
                    .times(Big(prices[state.curToken] || 1))
                    .toFixed(2, 0)}
                </div>
                <div class="balance">
                  Balance:
                  <Widget
                    src="bluebiu.near/widget/Staking.Kelp.Balance"
                    props={{
                      value: state.tokenBal,
                      digit: 4,
                      onClick: clickBalance,
                      symbol:
                        tab === "Stake" ? state.curToken : ExchangeToken.symbol,
                    }}
                  />
                </div>
              </div>
            </Panel>
            <List>
              <span className="keys">You will get</span>
              <span className="values">
                {Big(state.stakeAmount || 0)
                  .div(state.exchangeRate || 1)
                  .toFixed(4, 0)}{" "}
                {tab === "Stake" ? ExchangeToken.symbol : state.curToken}
              </span>
            </List>
            <List>
              <span className="keys">Exchange rate</span>
              <span className="values">
                1 {ExchangeToken?.symbol} ={" "}
                {Big(state.exchangeRate || 0).toFixed(4, 0)} {state.curToken}
                {/* {tab === "Stake" ? ExchangeToken.symbol : state.curToken} */}
              </span>
            </List>
          </BlurWrap>
          <Widget
            src="bluebiu.near/widget/Staking.Kelp.Button"
            props={{
              ...props,
              actionText: tab,
              amount: state.stakeAmount,
              curToken: state.curToken,
              stakeToken: StakeTokens
                ? StakeTokens.find((item) => item.symbol === state.curToken)
                : {},
              onSuccess: () => {
                State.update({ loading: true, stakeAmount: "" });
              },
            }}
          />

          <BtnWrap>
            {[59144, 34443].includes(chainId) && (
              <Btn onClick={handleOpenWrap}>Wrap</Btn>
            )}

            {/* <Btn onClick={handleTabChange}>
              {tab === "Stake" ? "Stake" : "Unstake"}
            </Btn> */}
          </BtnWrap>
        </Content>

        {/* {tab === "Withdraw" && <div>null</div>} */}
      </Wrapper>

      {/* {state.loading && <Widget src="bluebiu.near/widget/Lending.Spinner" />} */}
      {state.showDialog && (
        <Widget
          src={"bluebiu.near/widget/Wrap.Index"}
          props={{
            account,
            toast,
            chainId,
            addAction,
            SYMBOL_ADDRESS,
            tokenPairs,
            onCloseWrap: handleCloseWrap,
            multicall,
            multicallAddress,
          }}
        />
      )}
    </StyledContainer>
  </div>
);
