let POOLOPTIONS = props.poolOptions;
let POOLOPTIONSELECTED = props.poolOptionsSelected;
const setPoolOption = props.setPoolOption;
const closeModal = props.closeModal;

const getFeeWidthFormat = (n) => {
  const decimalPart = (n % 1).toFixed(20).substring(2);
  const zeroCount = decimalPart.match(/^0*/)[0].length;
  var format = (n * 100).toFixed(zeroCount > 3 ? 3 : 2);
  return format + "%";
};

const formatNumber = (n) => {
  if (n < 0.01 && n > 0) {
    return "<$0.01";
  } else if (n >= 1000000) {
    return "$" + (n / 1000000).toFixed(2) + "m";
  } else if (n >= 1000) {
    return "$" + (n / 1000).toFixed(2) + "k";
  } else {
    return "$" + n.toFixed(2);
  }
};

const formatAPR = (n) => {
  if (n == 0) {
    return null;
  }
  const roundedNumber = (n * 100).toFixed(3);
  const [integerPart, decimalPart] = roundedNumber.split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const formattedNumber = `${formattedInteger}.${decimalPart}%`;
  return formattedNumber;
};

const getPercentageSelectedFormat = (n) => {
  if (n < 1) {
    return "<1%";
  }
  return n.toFixed(2) + "%";
};

const handleSelectPoolOption = (selectedPool) => {
  const updatedPoolOptions = state.allPoolOptions.map((pool) => {
    if (pool.id === selectedPool.id) {
      State.update({ poolOptionSelected: pool });
      return { ...pool, selected: !pool.selected };
    } else {
      return { ...pool, selected: false };
    }
  });
  State.update({ allPoolOptions: updatedPoolOptions });
};

const setPercentageSelected = () => {
  let poolOptions = POOLOPTIONS;
  const totalTVL = poolOptions.reduce(
    (total, pool) => total + pool.tvl.amount,
    0
  );
  console.log(totalTVL);
  for (let i = 0; i < poolOptions.length; i++) {
    const tvlAmount = poolOptions[i].tvl.amount;
    const percentageSelected = (tvlAmount * 100) / totalTVL;
    poolOptions[i].percentageSelected = percentageSelected;
  }

  poolOptions.sort((a, b) => b.tvl.amount - a.tvl.amount);
  console.log(poolOptions);

  State.update({ allPoolOptions: poolOptions });
  handleSelectPoolOption(POOLOPTIONSELECTED);
};

if (!state.allPoolOptions) {
  setPercentageSelected();
}

return (
  <div
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
        <div>Pool Options of {POOLOPTIONS[0].name}</div>
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
      <h6
        style={{
          margin: "0px",
          fontWeight: "400",
          fontSize: "0.75rem",
          lineHeight: "1.57",
          color: "rgba(255, 255, 255, 0.5)",
        }}
      >
        Select an item from the list
      </h6>

      <div style={{ width: "100%", fontSize: "0.875rem", marginTop: "15px" }}>
        <div style={{ height: "230px", overflow: "auto" }}>
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              position: "relative",
              minWidth: "0px",
              padding: "0px",
              margin: "0px",
              border: "0px",
              verticalAlign: "top",
              width: "100%",
            }}
          >
            {state.allPoolOptions.map((po, key) => {
              return (
                <div
                  style={{
                    color: "rgb(255, 255, 255)",
                    backgroundImage:
                      "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                    overflow: "hidden",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backgroundColor: "rgba(255, 255, 255, 0.01)",
                    borderRadius: "20px",
                    marginBottom: "15px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSelectPoolOption(po)}
                >
                  <div class="row">
                    <div class="col-10" style={{ padding: "20px" }}>
                      <span
                        style={{
                          margin: "0px",
                          fontWeight: "400",
                          fontSize: "1rem",
                          lineHeight: "1.1875rem",
                        }}
                      >
                        <div style={{ padding: "4px", width: "100%" }}>
                          <div style={{ display: "flex" }}>
                            <h6
                              style={{
                                margin: "0px 0px 8px",
                                fontWeight: "450",
                                fontSize: "1rem",
                                lineHeight: "1.1875rem",
                                borderRadius: "5px",
                                display: "flex",
                              }}
                            >
                              <span
                                style={{
                                  display: "inline",
                                  marginRight: "5px",
                                  fontSize: "0.75rem",
                                  border: "1px solid rgb(97, 97, 97)",
                                  borderRadius: "5px",
                                  padding: "3px",
                                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                                }}
                              >
                                {getFeeWidthFormat(po.fee)} Fee
                              </span>
                              <span
                                style={{
                                  display: "inline",
                                  marginRight: "5px",
                                  fontSize: "0.75rem",
                                  border: "1px solid rgb(97, 97, 97)",
                                  borderRadius: "5px",
                                  padding: "3px",
                                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                                }}
                              >
                                {getFeeWidthFormat(po.width)} Width
                              </span>
                            </h6>
                          </div>
                          <div class="row" style={{ fontSize: "10px" }}>
                            <div class="col-4">
                              <span
                                style={{ color: "rgba(255, 255, 255, 0.5)" }}
                              >
                                TVL
                              </span>
                              <br />
                              {formatNumber(po.tvl.amount)}
                            </div>
                            <div class="col-4">
                              <span
                                style={{ color: "rgba(255, 255, 255, 0.5)" }}
                              >
                                Volume 24h
                              </span>
                              <br />
                              {formatNumber(po.volume.amount)}
                            </div>
                            <div class="col-4">
                              <span
                                style={{ color: "rgba(255, 255, 255, 0.5)" }}
                              >
                                Fees 24h
                              </span>
                              <br />
                              {formatNumber(po.feeVolume)}
                            </div>
                          </div>
                          <div
                            class="row"
                            style={{ fontSize: "10px", marginTop: "5px" }}
                          >
                            <div class="col-4">
                              <span
                                style={{
                                  color:
                                    po.tvlChange < 0
                                      ? "rgba(255, 255, 255, 0.5)"
                                      : "rgb(38, 189, 0)",
                                }}
                              >
                                {formatAPR(po.tvlChange)}
                              </span>
                            </div>
                            <div class="col-4">
                              <span
                                style={{
                                  color:
                                    po.volumeChange < 0
                                      ? "rgba(255, 255, 255, 0.5)"
                                      : "rgb(38, 189, 0)",
                                }}
                              >
                                {formatAPR(po.volumeChange)}
                              </span>
                            </div>
                            <div class="col-4">
                              <span
                                style={{
                                  color:
                                    po.feeChange < 0
                                      ? "rgba(255, 255, 255, 0.5)"
                                      : "rgb(38, 189, 0)",
                                }}
                              >
                                {formatAPR(po.feeChange)}
                              </span>
                            </div>
                          </div>

                          <div
                            class="row"
                            style={{ fontSize: "10px", marginTop: "5px" }}
                          >
                            <div
                              class="col-12"
                              style={{
                                display: "flex",
                                justifyContent: "start",
                              }}
                            >
                              <span
                                style={{
                                  display: "inline",
                                  marginRight: "5px",
                                  fontSize: "0.75rem",
                                  border: "1px solid rgb(97, 97, 97)",
                                  borderRadius: "5px",
                                  padding: "3px",
                                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                                }}
                              >
                                {getPercentageSelectedFormat(
                                  po.percentageSelected
                                )}{" "}
                                select
                              </span>
                            </div>
                          </div>
                        </div>
                      </span>
                    </div>
                    <div class="col-2" style={{ padding: "20px" }}>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          checked={po.selected}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
            setPoolOption(state.allPoolOptions, state.poolOptionSelected);
          }}
        >
          Select
        </button>
      </div>
    </div>
  </div>
);
