const amount = props.amount ?? "1";

function toYoctoNear(amountInNear) {
  let point = amountInNear.indexOf(".");
  let big, small;

  if (point === -1) {
    big = amountInNear;
    small = "";
  } else {
    big = amountInNear.slice(0, point);
    small = amountInNear.slice(point + 1);
  }

  if (small.length > 24) {
    small = small.slice(0, 24);
  } else {
    small = small + "0".repeat(24 - small.length);
  }

  let yoctoNear = big + small;
  return yoctoNear;
}

function bet() {
  Near.call("simplebet.near", "bet", {}, "15000000000000", toYoctoNear(amount));
}

return (
  <div>
    <button onClick={() => bet()}>Bet {amount}Ⓝ</button>
  </div>
);
