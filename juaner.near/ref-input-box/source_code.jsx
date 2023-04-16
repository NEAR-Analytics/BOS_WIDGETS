const Container = styled.div`
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
`;
const { amount, handleAmount, balance, balance$ } = props;
function changeAmount(e) {
  const value = Number(e.target.value);
  if (Big(value || 0).gt(balance || 0)) return;
  handleAmount(value);
}
function changeToMax() {
  handleAmount(balance || 0);
}
const subBalance = Big(balance || "0").toFixed(4);
return (
  <Container>
    <div class="inputArea">
      <input
        class="normalInput"
        type="number"
        value={amount}
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
  </Container>
);
