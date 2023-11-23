const simpleBetAccountId = "simplebet.near";
const defaultValue = "1";

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
  let valueInNear = state.value ?? defaultValue;
  let valueInYocto = toYoctoNear(valueInNear);
  Near.call(simpleBetAccountId, "bet", {}, "15000000000000", valueInYocto);
}

let Style = styled.div`
.container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    width: 80%;
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
      <div class="container">
        <input
          id="custom-bet-value"
          type="number"
          min="0"
          value={state.value ?? defaultValue}
          onChange={(e) => {
            State.update({ value: e.target.value });
          }}
        />
        <button id="submit-bet" onClick={() => bet()}>
          Bet {state.value ?? defaultValue}Ⓝ
        </button>
      </div>
    </Style>
  </>
);
