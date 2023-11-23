const simpleBetAccountId = "simplebet.near";

let pool = Near.view(simpleBetAccountId, "pool");
let ratio = Near.view(simpleBetAccountId, "max_bet_ratio");

function toNear(yoctoNear) {
  if (yoctoNear.length < 25) {
    yoctoNear = "0".repeat(25 - yoctoNear.length) + yoctoNear;
  }
  let len = yoctoNear.length;
  let big = yoctoNear.slice(0, len - 24);
  let small = yoctoNear.slice(len - 24, len - 24 + 5);
  return big + "." + small;
}

let poolInNear = toNear(pool);
let maxBet =
  Math.round(
    ((Number(poolInNear) * Number(ratio.num)) / Number(ratio.den)) * 100000
  ) / 100000;

let Style = styled.div`


.buttons-all {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: 1000px;
    margin: auto;
}

.buttons-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: 400px;
    margin: auto;
}

#custom-bet-value, #submit-bet {
    width: 100%;
}
`;

return (
  <>
    <Style>
      <div class="buttons-all">
        <div class="buttons-row">
          <Widget src="yacare.near/widget/Bet-N" props={{ amount: "0.1" }} />
          <Widget src="yacare.near/widget/Bet-N" props={{ amount: "1" }} />
          <Widget src="yacare.near/widget/Bet-N" props={{ amount: "10" }} />
        </div>
        <div class="buttons-row">
          <Widget src="yacare.near/widget/BetCustom" />
        </div>
      </div>
      <p>
        <strong>
          Pool Balance: <strong>{poolInNear} Ⓝ</strong>
        </strong>
      </p>
      <p>
        <strong>
          Max bet allowed: <strong>{maxBet} Ⓝ</strong>
        </strong>
      </p>
      <p>
        <small>
          If you play any amout higher than the maximum bet allowed, the
          remaining will be refunded to you.
        </small>
      </p>
      <h3>Bettors</h3>
      <Widget src="yacare.near/widget/BetFeed" />
      <p></p>
    </Style>
  </>
);
