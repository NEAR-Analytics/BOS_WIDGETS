const arrowDown = (
  <svg
    width="17"
    height="9"
    viewBox="0 0 17 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L8.5 7.5L16 1"
      stroke="#13DDC8"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

const ArrowDownWrapper = styled.div`
  position: absolute;
  right: 8px;
  top: 4px;
  @media (max-width: 900px) {
    transform: scale(0.75);
  }
`;

const Wrapper = styled.div`
  .seperator {
    background: #2c4a4b;
    border: 1px solid #2c4a4b;
    height: 1px;
  }
  .frcs {
    display: flex;
    align-items: center;
    justify-content: start;
  }
  .frcc {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .frcb {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .value-wrapper {
    color: #4f7375;
    font-family: Gantari;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0em;
    .balance-value {
      text-decoration: underline;
      cursor: pointer;
    }
    padding-top: 10px;
  }
  .token-field {
    cursor: pointer;
    background: linear-gradient(0deg, #1f3a3e, #1f3a3e),
      linear-gradient(0deg, #2c4a4b, #2c4a4b);
    border: 1px solid #2c4a4b;
    border-radius: 23px;
    position: relative;
    width: 159px;
    padding: 6px;
    flex-shrink: 0;
    .token-icon {
      height: 31px;
      width: 31px;
      border-radius: 100%;
    }
    .token-symbol {
      font-family: Gantari;

      padding-left: 8px;
      font-size: 18px;
      font-weight: 500;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: left;
      color: white;
    }
    @media (max-width: 900px) {
      width: 115px;

      .token-icon {
        height: 22px;
        width: 22px;
        border-radius: 100%;
      }

      .token-symbol {
        font-family: Gantari;

        padding-left: 8px;
        line-height: 22px;
        color: white;
        font-size: 15px;
        font-weight: 500;
        line-height: 18px;
        letter-spacing: 0em;
        text-align: left;
      }
    }
  }
`;

const Seperator = styled.div`
  background: #2c4a4b;
  border: 1px solid #2c4a4b;
  height: 1px;
  width: 327px;
  position: absolute;
  bottom: 0px;
`;

const Input = styled.input`
  background: none;
  color: #fff;
  text-align: left;
  border: none;
  outline: none;
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 19px;
  padding: 8px 0px 8px 8px;
  width: 100%;
  ::placeholder {
    color: #40435c;
  }
`;

const {
  config,
  curToken,
  amount,
  onChangeAmount,
  readOnly,
  sender,
  onTokenSelect,
  loadInputBalance,
  selectedDex,
} = props;

State.init({
  balanceLoaded: false,
  balance: "0",
});

console.log("balance: ", balance);

State.init({
  showModal: false,
});

const handleShow = () => {
  State.update({
    showModal: true,
  });
};

console.log("amount1111: ", amount, curToken);

const utils = {
  balanceFormated: () => {
    if (!curToken.address) return "-";
    if (!state.balanceLoaded) return "Loading";
    if (state.balance === "0") return "0";
    console.log("state.balance formate: ", state.balance);
    const balance = Big(state.balance).div(Big(10).pow(curToken.decimals));
    if (Big(balance).lt(0.0)) return "<0.0001";
    return Big(balance).toFixed(4);
  },
};

// console.log("state.balance: ", state.balance);
const AccessKey = Storage.get(
  "AccessKey",
  "guessme.near/widget/ZKEVMWarmUp.add-to-quest-card"
);
if (!state.priceMap) {
  const price = fetch("/dapdap/get-token-price-by-dapdap", {
    headers: { Authorization: AccessKey },
  }).body;

  State.update({
    priceMap: JSON.parse(price),
  });
}

console.log("state.priceMap: ", state.priceMap);

const displayValue =
  !state.priceMap || !state.priceMap[curToken.symbol] || !amount
    ? "-"
    : Big(state.priceMap[curToken.symbol]).times(amount).toFixed(4);

return (
  <Wrapper>
    <div className="frcb">
      <div
        className="frcs"
        style={{
          position: "relative",
        }}
      >
        <Input
          type="text"
          placeholder="0"
          value={amount}
          onChange={(e) => {
            onChangeAmount && onChangeAmount(e.target.value);
          }}
          readOnly={!!readOnly}
        />
        {!readOnly && <Seperator></Seperator>}
      </div>

      <div className="token-field" onClick={handleShow}>
        <div
          className="frcs"
          style={{
            width: "100%",
          }}
        >
          <img src={curToken.icon} class="token-icon" />
          <div class="token-symbol">{curToken.symbol}</div>
          <ArrowDownWrapper>{arrowDown}</ArrowDownWrapper>
        </div>
      </div>
    </div>

    <div className="frcb value-wrapper">
      <div>≈ ${displayValue}</div>

      <div>
        Balance: &nbsp;{" "}
        <span
          style={{
            textDecoration: readOnly ? "none" : "underline",
            cursor: readOnly ? "default" : "pointer",
          }}
          className="balance-value"
          onClick={() => {
            if (readOnly || Big(state.balance || "0").eq(0)) return;

            const balance = Big(state.balance)
              .div(Big(10).pow(curToken.decimals))
              .toFixed();

            onChangeAmount && onChangeAmount(balance == "0" ? "0" : balance);
          }}
        >
          {utils.balanceFormated()}
        </span>
      </div>
    </div>

    <Widget
      src="bluebiu.near/widget/Mantle.getBalance"
      props={{
        address: curToken.address,
        onLoad: (data) => {
          State.update({
            balance: data.balance,
            balanceLoaded: data.loaded,
          });
          loadInputBalance &&
            loadInputBalance(
              Big(data.balance).div(Big(10).pow(curToken.decimals)).toFixed()
            );
        },
        isNative: curToken.symbol === config.NATIVE_TOKEN_SYMBOL,
      }}
    ></Widget>

    {state.showModal && (
      <Widget
        src="bluebiu.near/widget/Mantle.TokenList"
        props={{
          config,
          sender,
          selectedDex,
          curToken: curToken,
          onClose: () => {
            State.update({
              showModal: false,
            });
          },
          onClick: onTokenSelect,
          hidden: !state.showModal,
        }}
      />
    )}
  </Wrapper>
);
