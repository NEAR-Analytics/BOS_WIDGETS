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
  onSuccess,
} = props;
const { ExchangeToken } = dexConfig;

const { parseUnits, formatUnits } = ethers.utils;
// console.log("Content--", props);

State.init({
  stakeAmount: "",
  curToken: "", // token symbol
  exchangeRate: 1,
  options: [],

  tokenBal: 0,
});

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

useEffect(() => {
  if (!state.curToken) return;

  if (tab === "Stake") {
    const _bal = StakeTokens.find(
      (item) => item.symbol === state.curToken
    ).balance;

    State.update({
      tokenBal: _bal,
    });
  }
}, [state.curToken, tab]);

// LUSDC balance
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
      console.log("get-LUSDC-balance--", _balance, balance);
      State.update({
        tokenBal: _bal,
      });
    })
    .catch((err) => {
      console.log("Catch-getTokenBalance-error--", err);
    });
}
useEffect(() => {
  if (tab === "Unstake") {
    getTokenBalance();

    const options = [ExchangeToken]?.map((item) => ({
      text: item.symbol,
      value: item.symbol,
    }));
    State.update({
      options,
      curToken: options[0].value,
    });
  }
}, [tab]);
// console.log(state);

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
            <div className="amount">7.0%</div>
          </SummaryItem>
        </Summary>

        <Content>
          <BlurWrap>
            <Panel>
              <div className="title">{tab}</div>
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
                  .toFixed()}{" "}
                {tab === "Stake" ? ExchangeToken.symbol : StakeTokens[0].symbol}
              </span>
            </List>
            <List>
              <span className="keys">Exchange rate</span>
              <span className="values">
                1{" "}
                {tab === "Stake" ? StakeTokens[0].symbol : ExchangeToken.symbol}
                ={Big(state.exchangeRate || 0).toFixed()}{" "}
                {tab === "Stake" ? ExchangeToken.symbol : StakeTokens[0].symbol}
              </span>
            </List>
          </BlurWrap>
          <Widget
            src="bluebiu.near/widget/Staking.Ledgity.Button"
            props={{
              ...props,
              actionText: tab,
              amount: state.stakeAmount,
              curToken: state.curToken,
              stakeToken:
                tab === "Stake"
                  ? StakeTokens.find((item) => item.symbol === state.curToken)
                  : {},
              onSuccess: () => {
                State.update({ stakeAmount: "" });
                onSuccess();
              },
            }}
          />
        </Content>
      </Wrapper>
    </StyledContainer>
  </div>
);
