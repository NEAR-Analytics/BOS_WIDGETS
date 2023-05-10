const Container = styled.div`
    padding-bottom:10px;
    .inputArea{
      position:relative;
      display:flex;
      align-items:center;
    }
    .maxButton{
      display:flex;
      align-items:center;
      justify-content:center;
      position:absolute;
      right:14px;
      width: 40px;
      height: 25px;
      font-size: 12px;
      line-height: 16px;
      color: #4B6778;
      border: 1px solid #4B6778;
      border-radius: 6px;
      cursor:pointer;
    }
    .maxButton:hover{
      color:#5f8399;
      border: 1px solid #5f8399;
    }
    .normalInput{
      width:100%;
      background: #152528;
      border-radius: 12px;
      height: 55px;
      font-size:20px;
      color: #7E8A93;
      padding:0 60px 0 15px;
      border:none;
      margin-bottom:4px;
    }
    .normalInput:focus{
      outline:none;
      background: #152528; 
      color: #7E8A93;
    }
    .valueArea {
      display:flex;
      align-items:center;
      justify-content:space-between;
      font-size:12px;
      color:#4B6778;
      padding:0 6px;
    }
    .normalInput::-webkit-outer-spin-button,
    .normalInput::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    }
    .mt_20 {
      margin-top:20px;
    }
    .rangeInput{
      width:100%;
    }
    input[type=range]{
      padding:0;
      -webkit-appearance: none;
      background-color:transparent;
    }
   
    input[type=range]::-webkit-slider-runnable-track {
      height:6px;
      background: #0F1D27;
      border-radius: 5px;
    }
    input[type=range]::-webkit-slider-thumb {
      position:relative;
      -webkit-appearance: none;
      height: 18px;
      width: 18px;
      margin-top: -5px;
      background: #00D6AF;
      border-radius: 50%;
      cursor:pointer;
      z-index:10;
  }
  .rangeArea{
    position:relative;
    width:100%;
  }
  .bgLine{
    position:absolute;
    left:0;
    top:12px;
    height:6px;
    border-radius: 5px;
    background: #00D6AF;
  }
  .scale{
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .scale .item {
    display:flex;
    flex-direction:column;
    align-items:center;
    font-size:12px;
    color:#7E8A93;
  }
  .item::after{
    content: '';
    width:1px;
    height:5px;
    margin-top:4px;
    background-color:#7E8A93;
  }
`;
const { amount, handleAmount, balance, balance$ } = props;
const subBalance = Big(balance || "0").toFixed(4);
function changeAmount(e) {
  const value = e.target.value;
  if (Big(value || 0).gt(subBalance || 0)) return;
  const isMax = Big(value || 0).eq(subBalance || 0);
  handleAmount(value, isMax);
}
function changeRangeAmount(e) {
  const value = Number(e.target.value);
  console.log("value", value);
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
console.log("99999999-rangeAmount", rangeAmount);
const bgLineWidth = rangeAmount + "%";
function displayAmount() {
  let result;
  let v = (amount || 0).toString();
  if (v.indexOf(".") > -1) {
    // 小数
    result = v.replace(/^0+\./g, "0.");
  } else {
    // 整数
    result = v.replace(/^[0]+/, "");
  }
  return result || 0;
}
return (
  <Container>
    <div class="inputArea">
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
    <div class="valueArea">
      <span class="value">${balance$ || "0"}</span>
      <span>Balance:{subBalance}</span>
    </div>
    <div class="scale mt_20">
      <span class="item">0%</span>
      <span class="item">25%</span>
      <span class="item">50%</span>
      <span class="item">75%</span>
      <span class="item">100%</span>
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
    </div>
  </Container>
);
