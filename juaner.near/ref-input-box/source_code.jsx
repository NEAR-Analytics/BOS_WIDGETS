const Container = styled.div`
  padding-bottom: 30px;
  .inputArea {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 12px;
    margin-bottom: 4px;
    background-color: #373a53;
    .tokenIcon {
      width: 26px;
      height: 26px;
      border-radius: 100px;
      margin-left: 16px;
    }
  }
  .maxButton {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 14px;
    width: 40px;
    height: 25px;
    font-size: 12px;
    line-height: 16px;
    color: #7c7f96;
    border: 1px solid #7c7f96;
    border-radius: 6px;
    cursor: pointer;
  }
  .maxButton:hover {
    color: #5f8399;
    border: 1px solid #5f8399;
  }
  .normalInput {
    width: 100%;
    background-color: #373a53;
    border-radius: 12px;
    height: 55px;
    font-size: 20px;
    color: #fff;
    padding: 0 60px 0 0;
    padding: 0 60px 0 4px;
    border: none;
    outline: none;
  }
  .valueArea {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #7c7f96;
    .balance {
      color: #fff;
    }
  }
  .normalInput::-webkit-outer-spin-button,
  .normalInput::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }
  .mt_20 {
    margin-top: 20px;
  }
  .rangeInput {
    width: 100%;
    outline: none;
  }
  input[type="range"] {
    padding: 0;
    -webkit-appearance: none;
    background-color: transparent;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    height: 6px;
    background: #0f1d27;
    border-radius: 5px;
  }
  input[type="range"]::-webkit-slider-thumb {
    position: relative;
    -webkit-appearance: none;
    height: 18px;
    width: 18px;
    margin-top: -5px;
    background: #00d6af;
    border-radius: 50%;
    cursor: pointer;
    z-index: 10;
  }
  .rangeArea {
    position: relative;
    width: 100%;
  }
  .bgLine {
    position: absolute;
    left: 0;
    top: 12px;
    height: 6px;
    border-radius: 5px;
    background: #00d6af;
    pointer-events: none;
  }
  .scale {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .scale .item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    color: #7e8a93;
  }
  .scale .item:nth-of-type(n + 2) {
    left: 5px;
  }
  .item::after {
    content: "";
    width: 1px;
    height: 5px;
    margin-top: 4px;
    background-color: #7e8a93;
  }
  .processSpan {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 22px;
    background: #00c6a2;
    border-radius: 8px;
    font-weight: 700;
    font-size: 12px;
    width: 40px;
    color: #000;
    top: 30px;
  }
`;
const { wnearbase64 } = state;
const { amount, handleAmount, balance, balance$, metadata } = props;
const subBalance = Big(balance || "0").toFixed(4);
function changeAmount(e) {
  const value = e.target.value;
  if (Big(value || 0).gt(subBalance || 0)) return;
  const isMax = Big(value || 0).eq(subBalance || 0);
  handleAmount(value, isMax);
}
function changeRangeAmount(e) {
  const value = Number(e.target.value);
  const isMax = Big(value || 0).eq(subBalance || 0);
  const amount = Big(subBalance || 0)
    .mul(value || 0)
    .div(100)
    .toFixed(4);
  handleAmount(amount, isMax);
}

function quickChangeRangeAmount(valueStr) {
  const value = Number(valueStr);

  const isMax = Big(value || 0).eq(subBalance || 0);
  const amount = Big(subBalance || 0)
    .mul(value || 0)
    .div(100)
    .toFixed(4);
  handleAmount(amount, isMax);
}

function changeToMax() {
  handleAmount(Big(subBalance || 0).toFixed(), true);
}
const rangeAmount =
  Number(subBalance) > 0 ? (100 * Number(amount || 0)) / Number(subBalance) : 0;
const bgLineWidth = rangeAmount + "%";
const processMarginLeft = -10 - Big(18).mul(rangeAmount).div(100).toNumber();
function displayAmount() {
  if (isNaN(Number(amount))) return "";
  return amount;
}
function getWnearIcon(icon) {
  State.update({
    wnearbase64: icon,
  });
}
return (
  <Container>
    {/* load icons */}
    <Widget
      src="juaner.near/widget/ref-icons"
      props={{ getWnearIcon, getCloseButtonIcon }}
    />

    {!props.hideBalanceInputTop && (
      <div class="valueArea mb-2">
        <div class="label">{props.label || "Available to supply"}</div>
        <div>
          <span class="balance">{subBalance}</span>
          <span>(${balance$ || "0"})</span>
        </div>
      </div>
    )}

    <div class="inputArea">
      <img src={metadata.icon || wnearbase64} class="tokenIcon" />
      <input
        class="normalInput"
        type="number"
        value={displayAmount()}
        onChange={changeAmount}
      />
      <span class="maxButton" onClick={changeToMax}>
        Max
      </span>
    </div>

    {props.hideBalanceInputTop && (
      <div
        class="valueArea mb-2"
        style={{
          marginTop: "12px",
        }}
      >
        <div class="">${balance$ || "0"}</div>
        <div>
          <span>Balance:</span>

          <span
            class="balance"
            style={{
              color: "#7c7f96",
            }}
          >
            {subBalance}
          </span>
        </div>
      </div>
    )}

    <div class="scale mt_20">
      {["0", "25", "50", "75", "100"].map((p, i) => {
        return (
          <span
            class="item"
            style={{
              cursor: "pointer",
            }}
            key={`percent-${p}-${i}`}
            onClick={() => {
              quickChangeRangeAmount(p);
            }}
          >
            {p}%
          </span>
        );
      })}
    </div>
    <div class="rangeArea">
      <input
        class="rangeInput"
        type="range"
        value={rangeAmount}
        step="any"
        min="0"
        max="100"
        onChange={changeRangeAmount}
      />
      <span
        class="bgLine"
        style={{
          width: bgLineWidth,
        }}
      ></span>
      <span
        class="processSpan"
        style={{ left: bgLineWidth, marginLeft: processMarginLeft }}
      >
        {Big(rangeAmount || 0).toFixed(0)}%
      </span>
    </div>
  </Container>
);
