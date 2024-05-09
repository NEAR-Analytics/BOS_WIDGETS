let FEE = props.fee > 0 ? props.fee : 0.1;
let WIDTH = props.width > 0 ? props.width : 0.5;
let POOLNAME1 = props.poolName1;
let POOLNAME2 = props.poolName2;
const setFeeWidth = props.setFeeWidth;
const closeModal = props.closeModal;
console.log(POOLNAME1, POOLNAME2);
console.log(props);

if (!state.filterPools) {
  asyncFetch(`https://api.mav.xyz/api/v3/pools/324
`)
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      const allPools = res.body.pools;
      const filterPools = allPools.filter(
        (p) => p.name == POOLNAME1 || p.name == POOLNAME2
      );
      if (!state.validated) {
        State.update({
          validated: true,
          filterPools: filterPools,
        });
        validateOptions(FEE, WIDTH, filterPools);
      }
    });
}

const stylesComponent = `
input[type=range] {
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
  background: none;
padding: 0px;
}
input[type=range]:focus {
  outline: none;
}
  
input[type=range]::-webkit-slider-runnable-track {
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  background: #9B00CB;
  border-radius: 5px;
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 0px 0px 0px #000000;
  border: 1px solid #000000;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #EBEBEB;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -7px;
}
`;

const feeAllowedValues = [
  0.002, 0.005, 0.008, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09,
  0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.5, 0.75, 1.0, 2.0, 3.0,
];

const widthAllowedValues = [
  0.01, 0.02, 0.04, 0.1, 0.2, 0.4, 0.5, 1, 2, 5, 10, 25, 50,
];

State.init({
  valueFeeRange: feeAllowedValues.indexOf(FEE),
  valueWidthRange: widthAllowedValues.indexOf(WIDTH),
  valueFee: FEE,
  valueWidth: WIDTH,
  validated: false,
});

const handleSliderFeeChange = (event) => {
  State.update({
    valueFeeRange: event.target.value,
    valueFee: feeAllowedValues[event.target.value],
  });
  validateOptions(feeAllowedValues[event.target.value], state.valueWidth);
};

const handleSliderWidthChange = (event) => {
  State.update({
    valueWidthRange: event.target.value,
    valueWidth: widthAllowedValues[event.target.value],
  });
  validateOptions(state.valueFee, widthAllowedValues[event.target.value]);
};

const validateOptions = (fee, width, filterPools) => {
  const existPool = filterPools
    ? filterPools.filter((p) => p.fee * 100 == fee && p.width * 100 == width)
    : state.filterPools.filter(
        (p) => p.fee * 100 == fee && p.width * 100 == width
      );

  if (existPool.length > 0) {
    console.log("Existe la pool");
    State.update({
      existPool: true,
    });
  } else {
    console.log("No existe la pool");
    State.update({
      existPool: false,
    });
  }
};

const formatNumberFee = (n) => {
  if (n >= 0.01) {
    return n.toFixed(2) + " %";
  }
  return n.toFixed(3) + " %";
};

const formatNumberWidth = (n) => {
  if (n < 0.1) {
    return n.toFixed(2) + " %";
  }
  if (n < 1) {
    return n.toFixed(1) + " %";
  }
  return n + " %";
};

const css = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/createPool.css"
).body;

if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${stylesComponent}
`,
  });
}

const Theme = state.theme;

return (
  <Theme
    style={{
      width: "350px",
      padding: "22px",
      background: "rgb(3, 5, 23)",
      color: "rgb(255, 255, 255)",
      backgroundImage:
        "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
      margin: "auto",
      position: "absolute",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      maxHeight: "calc(100% - 64px)",
      maxWidth: "600px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "20px",
      right: "0",
      left: "0",
      top: "10px",
      zIndex: "100",
    }}
  >
    <div style={{ color: "rgb(255, 255, 255)" }}>
      <div
        style={{
          minWidth: "320px",
          borderRadius: "8px",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          placeContent: "space-between flex-start",
        }}
      >
        <div>Select Options</div>
        <div style={{ float: "right", right: "16px", position: "absolute" }}>
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              boxSizing: "border-box",
              backgroundColor: "transparent",
              outline: "0px",
              border: "0px",
              cursor: "pointer",
              userSelect: "none",
              verticalAlign: "middle",
              appearance: "none",
              textDecoration: "none",
              textAlign: "center",
              flex: "0 0 auto",
              fontSize: "1.5rem",
              padding: "8px",
              borderRadius: "50%",
              overflow: "visible",
              transition:
                "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              color: "rgb(158, 158, 158)",
              margin: "-8px",
            }}
            onClick={async () => {
              closeModal();
            }}
          >
            x
          </button>
        </div>
      </div>
      {state.filterPools ? (
        <div style={{ width: "100%", fontSize: "0.875rem", marginTop: "15px" }}>
          <div
            style={{
              height: "150px",
              overflow: "auto",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "20px",
              padding: "14px",
            }}
          >
            <div class="row">
              <div class="col-12">
                <span>Fee Tier:</span>
              </div>
              <div class="col-8">
                <input
                  type="range"
                  min={0}
                  max={23}
                  step={1}
                  value={state.valueFeeRange}
                  onChange={handleSliderFeeChange}
                  list="allowedValues"
                />
              </div>
              <div class="col-4">
                <span
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    marginRight: "5px",
                    fontSize: "0.75rem",
                    border: "1px solid rgb(97, 97, 97)",
                    borderRadius: "5px",
                    padding: "3px",
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    fontWeight: "bold",
                  }}
                >
                  {formatNumberFee(state.valueFee)}
                </span>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-12">
                <span>Bin Width:</span>
              </div>
              <div class="col-8">
                <input
                  type="range"
                  min={0}
                  max={12}
                  step={1}
                  value={state.valueWidthRange}
                  onChange={handleSliderWidthChange}
                  list="allowedValues"
                />
              </div>
              <div class="col-4">
                <span
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    marginRight: "5px",
                    fontSize: "0.75rem",
                    border: "1px solid rgb(97, 97, 97)",
                    borderRadius: "5px",
                    padding: "3px",
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    fontWeight: "bold",
                  }}
                >
                  {formatNumberWidth(state.valueWidth)}
                </span>
              </div>
            </div>
          </div>
          {state.validated && !state.existPool ? (
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                boxSizing: "border-box",
                outline: "0px",
                border: "0px",
                margin: "15px 0px 0px",
                cursor: "pointer",
                userSelect: "none",
                verticalAlign: "middle",
                appearance: "none",
                textDecoration: "none",
                lineHeight: "1.0625rem",
                minWidth: "64px",
                backgroundColor: "rgb(100, 0, 255)",
                borderRadius: "0.625rem",
                textTransform: "capitalize",
                padding: "12px 18px",
                fontWeight: "700",
                fontSize: "1rem",
                width: "100%",
              }}
              onClick={async () => {
                setFeeWidth(state.valueFee, state.valueWidth);
              }}
            >
              Select
            </button>
          ) : (
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                boxSizing: "border-box",
                outline: "0px",
                border: "1px solid rgb(100, 0, 255)",
                margin: "15px 0px 0px",
                userSelect: "none",
                verticalAlign: "middle",
                appearance: "none",
                textDecoration: "none",
                lineHeight: "1.0625rem",
                minWidth: "64px",
                borderRadius: "0.625rem",
                textTransform: "capitalize",
                padding: "12px 18px",
                fontWeight: "700",
                fontSize: "1rem",
                width: "100%",
                background: "none",
              }}
            >
              Pool Already Deployed
            </button>
          )}
        </div>
      ) : (
        <div class="titleStep">Loading data...</div>
      )}
    </div>
  </Theme>
);
