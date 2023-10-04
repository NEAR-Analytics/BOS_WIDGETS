const BINS = props.bins ? props.bins : [];
const TOKENS = props.tokens ? props.tokens : {};
const setBins = props.setBins;
const closeModal = props.closeModal;
const allChecked = props.allChecked;

State.init({
  allChecked: allChecked,
  allBins: BINS,
});

const formatNumberToken = (n) => {
  if (n == 0) {
    return 0;
  }
  if (n < 0.1) {
    return n.toFixed(3);
  } else {
    return n.toFixed(2);
  }
};

const formatNumber = (n) => {
  return n.toFixed(2);
};

const handleSelectAllBins = () => {
  const allChecked = !state.allChecked;
  const newData = state.allBins.map((bin) => ({
    ...bin,
    selected: allChecked,
  }));
  State.update({ allChecked, allBins: newData });
};

const handleSelectBin = (b) => {
  const updatedBins = state.allBins.map((bin) => {
    if (bin.binId === b.binId) {
      return { ...bin, selected: !bin.selected };
    }
    return bin;
  });
  State.update({ allBins: updatedBins });
  const countBinsToRemove = btr.filter((b) => b.selected).lenght;
  if(countBinsToRemove != state.allBins.lenght){
      State.update({ allChecked: false });
  }
};

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
        <div>0 Bins Selected</div>
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
        Select bins to remove liquidity.
      </h6>
      <div
        style={{
          display: "flex",
          marginTop: "16px",
          justifyContent: "space-between",
        }}
      >
        <h5
          style={{
            margin: "0px",
            lineHeight: "1.35rem",
            fontWeight: "600",
            fontSize: "1rem",
          }}
        >
          Select All Bins
        </h5>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxSizing: "border-box",
            backgroundColor: "transparent",
            outline: "0px",
            border: "0px",
            margin: "0px",
            cursor: "pointer",
            userSelect: "none",
            verticalAlign: "middle",
            appearance: "none",
            textDecoration: "none",
            borderRadius: "50%",
            color: "rgba(255, 255, 255, 0.5)",
            padding: "0px",
          }}
        >
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              checked={state.allChecked}
              onChange={() => handleSelectAllBins()}
            />
          </div>
        </span>
      </div>
      <div style={{ width: "100%", fontSize: "0.875rem", marginTop: "15px" }}>
        <div style={{ height: "270px", overflow: "auto" }}>
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
            {state.allBins.map((b, key) => {
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
                  }}
                >
                  <label
                    style={{
                      cursor: "pointer",
                      verticalAlign: "middle",
                      display: "flex",
                      marginLeft: "0px",
                      marginRight: "0px",
                      flexDirection: "row-reverse",
                      alignItems: "start",
                      padding: "14px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        checked={b.selected}
                        onChange={() => handleSelectBin(b)}
                      />
                    </div>
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
                              }}
                            >
                              Id: {b.binId}
                            </span>
                            <span
                              style={{
                                display: "inline",
                                marginRight: "5px",
                                fontSize: "0.75rem",
                              }}
                            >
                              Total Supply: {formatNumber(b.totalSupply)}
                              <br /> Balance: {formatNumber(b.balance)}
                            </span>
                          </h6>
                        </div>
                        <h6
                          style={{
                            margin: "0px 0px 8px",
                            fontWeight: "400",
                            fontSize: "0.75rem",
                            lineHeight: "1.57",
                            color: "rgba(255, 255, 255, 0.5)",
                          }}
                        >
                          Bin Position
                        </h6>
                        <div style={{ display: "flex" }}>
                          <div
                            style={{
                              borderRadius: "5px",
                              border: "1px solid rgb(97, 97, 97)",
                              backgroundColor: "rgba(255, 255, 255, 0.15)",
                              display: "flex",
                              alignItems: "center",
                              padding: "3px",
                            }}
                          >
                            <img
                              src={TOKENS.tokenALogo}
                              style={{ height: "17px" }}
                            />
                            &nbsp;
                            {formatNumberToken(b.reserveA)}
                          </div>
                          &nbsp;
                          <div
                            style={{
                              borderRadius: "5px",
                              border: "1px solid rgb(97, 97, 97)",
                              backgroundColor: "rgba(255, 255, 255, 0.15)",
                              display: "flex",
                              alignItems: "center",
                              padding: "3px",
                            }}
                          >
                            <img
                              src={TOKENS.tokenBLogo}
                              style={{ height: "17px" }}
                            />
                            &nbsp;
                            {formatNumberToken(b.reserveB)}
                          </div>
                        </div>
                      </div>
                    </span>
                  </label>
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
            setBins(state.allBins, state.allChecked);
          }}
        >
          Select
        </button>
      </div>
    </div>
  </div>
);
