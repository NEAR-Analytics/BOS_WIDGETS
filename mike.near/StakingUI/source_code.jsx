const ProgressBar = VM.require("mike.near/widget/ProgressBar");

const openAnotherModal = (validatorAddress, amount) => {
  Near.call(validatorAddress, "unstake", { amount });
};

const yoctoZeroes = "000000000000000000000000";

const StakeUnstakeWithdraw = ({ validator, method, amount }) => {
  const [stakingAmount, setStakingAmount] = useState("3");
  const handleCancel = () => {
    // eventually add fade-out effect
    setShowStakingModal(false);
  };

  const handleUnstake = (amount) => {
    console.log("Unstaking...", amount);
    openAnotherModal(validator, amount);
  };

  const containerStyle = {
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.6)",
    border: "3px solid #f2f1e9",
    backgroundColor: "rgba(0, 0, 0, .7)",
    background:
      "radial-gradient(circle at center, rgba(255, 255, 255, 0.7), rgba(0, 0, 0, 0.7) 100%), radial-gradient(circle at 10% 90%, rgba(200, 200, 255, 0.8), transparent 60%),radial-gradient(circle at 50% 50%, rgba(151, 151, 255, 0.7), transparent 50%)",
    padding: "20px",
    width: "100%",
    margin: "0 auto",
    borderRadius: "13px",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    transition: "opacity 0.3s ease-out",
    // transform: "rotate(19deg) skewX(31deg) skewY(19deg) scale(.666)",
    // transform: "rotate(19deg)",
    // transformOrigin = "50% 66%",
  };

  const titleStyle = {
    textAlign: "center",
    color: "#f2f1e9",
    fontWeight: "bold",
    marginBottom: "6px",
    textShadow: `
        -1px -1px 0 #000,
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000`,
    letterSpacing: "1px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{method} NEAR</h2>
      <input
        defaultValue={amount}
        onChange={(e) => setStakingAmount(e.target.value)}
        style={{
          padding: "13px",
          width: "80%",
          margin: "13px auto",
          display: "block",
        }}
      />
      <button
        onClick={(e) => handleUnstake(`${stakingAmount}${yoctoZeroes}`)}
        style={{ padding: "13px", margin: "13px auto", display: "block" }}
      >
        Unstake
      </button>
      <button
        onClick={handleCancel}
        style={{ padding: "13px", margin: "13px auto", display: "block" }}
      >
        Cancel
      </button>
    </div>
  );
};

const { mainnetValidators } = VM.require(
  "mike.near/widget/StakingUI.getValidators"
);

// State initialization
const [progressVal, setProgressVal] = useState(0);
// 219 validators, sending at least two messages, sometimes a third.
// this sane starting place helps so the progress bar doesn't jump around
const [progressMax, setProgressMax] = useState(440);
const [started, setStarted] = useState(false);
const [showProgressBar, setShowProgressBar] = useState(true);
const [validatorStakingDetails, setValidatorStakingDetails] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [showStakingModal, setShowStakingModal] = useState(false);
const [stakingModalData, setStakingModalData] = useState(false);

const YOCTO_DIGITS = 24;

// Modified from near-js utils
function formatNearAmount(balance) {
  balance = balance.toString();

  // Pad the balance if it's shorter than YOCTO_DIGITS
  if (balance.length <= YOCTO_DIGITS) {
    balance = balance.padStart(YOCTO_DIGITS + 1, "0");
  }

  const wholeStr = balance.substring(0, balance.length - YOCTO_DIGITS) || "0";
  let fractionStr = balance
    .substring(balance.length - YOCTO_DIGITS)
    .padEnd(YOCTO_DIGITS, "0");

  fractionStr = fractionStr.substring(0, 3);
  const fullNumber = `${wholeStr}.${fractionStr}`;

  return fullNumber;
}

function cleanupAmount(amt) {
  // Remove commas by splitting on them and joining the parts back together
  return amt.split(",").join("").trim();
}

function trimLeadingZeroes(str) {
  // Find the first non-zero character
  let firstNonZeroIndex = 0;
  while (firstNonZeroIndex < str.length && str[firstNonZeroIndex] === "0") {
    firstNonZeroIndex++;
  }

  // Return the substring from the first non-zero character or '0' if all characters were zeroes
  return firstNonZeroIndex === str.length
    ? "0"
    : str.substring(firstNonZeroIndex);
}

// Modified from near-js utils
function parseNearAmount(amt) {
  if (!amt) {
    return null;
  }

  amt = cleanupAmount(amt);
  const split = amt.split(".");
  const wholePart = split[0];
  const fracPart = split[1] || "";

  // Check for valid format
  if (split.length > 2 || fracPart.length > YOCTO_DIGITS) {
    throw new Error(`Cannot parse '${amt}' as NEAR amount`);
  }

  // Combine the whole part and the fractional part padded to NEAR_NOMINATION_EXP length
  return trimLeadingZeroes(wholePart + fracPart.padEnd(YOCTO_DIGITS, "0"));
}

// below is useful, just loud
// const himike = formatNearAmount("60606060606060606")
// console.log('aloha himike', himike)
// const himike2 = parseNearAmount("666")
// console.log('aloha himike2', himike2)

function createValidatorQueries(validators) {
  let accountId = context.accountId;

  if (!!!accountId) return;
  // Take into account the component loading, honestly
  let progressCounter = 20;

  const updateProgress = ({ amount }) => {
    if (!amount) amount = 1;
    progressCounter = progressCounter + amount;
    if (progressCounter % 20 == 0 && progressCounter > progressVal) {
      setProgressVal(progressCounter);
    }
  };

  const isPositiveNumber = (str) => {
    return !!str && !isNaN(str) && parseFloat(str) > 0;
  };

  const wrappedPromises = validators.map((validatorAddress) => {
    // fetching staked and unstaked balances
    const stakedBalancePromise = Near.asyncView(
      validatorAddress,
      "get_account_staked_balance",
      { account_id: accountId },
      "final"
    );
    const unstakedBalancePromise = Near.asyncView(
      validatorAddress,
      "get_account_unstaked_balance",
      { account_id: accountId },
      "final"
    );

    updateProgress(stakedBalancePromise.length + unstakedBalancePromise.length);

    return Promise.all([stakedBalancePromise, unstakedBalancePromise])
      .then(([stakedBalance, unstakedBalance]) => {
        // weird hack seeing that 1 yoctonear seems to say it can be unstaked
        // seems like a contract / near-js bug
        unstakedBalance = unstakedBalance === "1" ? "0" : unstakedBalance;

        const isHighlight =
          isPositiveNumber(unstakedBalance) || isPositiveNumber(stakedBalance);
        if (isPositiveNumber(unstakedBalance)) {
          // If unstaked balance is positive, check if it's available, adding another Promise
          return Near.asyncView(
            validatorAddress,
            "is_account_unstaked_balance_available",
            { account_id: accountId },
            "final"
          ).then((isAvailable) => {
            updateProgress();
            return {
              validatorAddress,
              stakedBalance,
              unstakedBalance,
              isHighlight,
              isUnstakedBalanceAvailable: isAvailable,
            };
          });
        } else {
          // If not, just return the balances
          updateProgress();
          return {
            validatorAddress,
            stakedBalance,
            unstakedBalance,
            isHighlight,
            isUnstakedBalanceAvailable: null,
          };
        }
      })
      .catch((err) => {
        console.error(
          "Error fetching balances for ",
          validatorAddress,
          ": ",
          err
        );
        updateProgress();
        return null;
      });
  });

  updateProgress(wrappedPromises.length);
  Promise.all(wrappedPromises)
    .then((results) => {
      const detailedStakingInfo = results.filter((info) => {
        return info !== null;
      });
      setValidatorStakingDetails(detailedStakingInfo);
      // intentionally not setting IsLoading here, the UI needs to finish
    })
    .catch((err) => {
      console.error("Error with promise all: ", err);
      setIsLoading(false);
    });
}

// It seems like using VM.require and useEffect is odd, so I am using a normal function here
const start = () => {
  // if it hasn't loaded the external widget yet, return
  if (!!!mainnetValidators) {
    // console.log("aloha start, mainnetValidators not ready");
    return;
  } else {
    // console.log("aloha start, mainnetValidators TOTALLY ready");
    setStarted(true);
  }
  // kick off the useEffect below
};

start();

useEffect(() => {
  // We need this check here again
  if (!!!mainnetValidators) return;

  mainnetValidators.getAddresses().then((vals) => {
    setProgressMax(vals.length * 2);
    createValidatorQueries(vals);
  });
}, [started]);

useEffect(async () => {
  if (progressVal >= progressMax) {
    // Compare these two approaches by commenting them out, it's interesting.

    // setIsLoading(false);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }
}, [progressVal, progressMax]);

const LoadingModal = () => {
  // This helps with the flash of red if it hasn't loaded yet
  if (!!!ProgressBar) {
    // console.log('ProgressBar not ready');
    return <></>;
  } else {
    if (!!!context.accountId) {
      console.log("context.accountId not ready");
      return;
    }

    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -150%)",
          padding: "6px",
          width: "19%",
          height: "13%",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(6px)",
          display: isLoading ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "300px", // Optional: for rounded corners
          transition: "opacity 0.2s ease-out, background-color 0.2s ease",
          opacity: isLoading ? 1 : 0,
          zIndex: 999,
          background: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.2) 100%)`,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <ProgressBar key={progressVal} value={progressVal} max={progressMax} />
      </div>
    );
  }
};

// Interesting, this seems to need to be above the StakeUnstakeWithdrawModal declaration
const walletUnstake = ({ validator, amount }) => {
  setStakingModalData({ validator, method: "unstake", amount });
  setShowStakingModal(true);
};

// debug by commenting this badboy out to see it
const stakingModalDisplayStyles = {
  display: showStakingModal ? "flex" : "none",
  opacity: showStakingModal ? 1 : 0,
};

const StakeUnstakeWithdrawModal = () => {
  // This helps with the flash of red if it hasn't loaded yet
  if (!!!StakeUnstakeWithdraw) {
    return <></>;
  } else {
    const handleOutsideClick = (e) => {
      // because we stop event propagation, we can just close it here
      setShowStakingModal(false);
    };

    const outerDivStyle = {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 998,
      cursor: "pointer",
      ...stakingModalDisplayStyles,
    };

    const innerDivStyle = {
      cursor: "auto",
      position: "relative",
      width: "37%",
      height: "auto",
      maxHeight: "90%",
      padding: "1%",
      background:
        "radial-gradient(ellipse, rgba(151, 151, 255, .8) 19%, rgba(0, 0, 0, 0.8) 100%)",
      // backgroundColor: "rgba(0, 0, 0, .3)",
      backdropFilter: "grayscale(100%)",
      borderRadius: "13px",
      boxShadow:
        "0 0 15px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.2), 0 0 35px rgba(255, 255, 255, 0.1), 0 0 40px rgba(255, 255, 255, 0.05)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    };

    return (
      <div style={outerDivStyle} onClick={handleOutsideClick}>
        <div style={innerDivStyle} onClick={(e) => e.stopPropagation()}>
          <StakeUnstakeWithdraw
            validator={stakingModalData.validator}
            method={stakingModalData.method}
            amount={stakingModalData.amount}
          />
        </div>
      </div>
    );
  }
};

const highlightedRows = useMemo(
  () => validatorStakingDetails.filter((row) => row.isHighlight),
  [validatorStakingDetails]
);
const rangedRows = useMemo(
  () => validatorStakingDetails.filter((row) => !row.isHighlight),
  [validatorStakingDetails]
);

if (!!!context.accountId) {
  return (
    <div>
      <p>Please login</p>
    </div>
  );
} else {
  return (
    <div
      style={{
        fontFamily: "'Lucida Console', Monaco, monospace",
        padding: "6px",
      }}
    >
      <LoadingModal />
      <StakeUnstakeWithdrawModal />
      <h1 style={{ color: "#fff" }}>Staking</h1>
      <div>
        <div>
          <div>
            <h3>Highlighted</h3>
            <div
              className="faux-table"
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "6px 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  className="faux-table-header"
                  style={{
                    display: "flex",
                    borderRadius: "6px 6px 0 0",
                    background: "#000",
                    color: "#f2f1e9",
                    textTransform: "uppercase",
                    padding: "9px",
                    fontWeight: "bold",
                  }}
                >
                  <div style={{ flex: 3, padding: "0 10px" }}>Validator</div>
                  <div style={{ flex: 2, padding: "0 10px" }}>Staked</div>
                  <div style={{ flex: 2, padding: "0 10px" }}>Unstaked</div>
                  <div style={{ flex: 1, padding: "0 10px" }}>Can Withdraw</div>
                </div>
                <div
                  style={{
                    height: "6px",
                    background:
                      "linear-gradient(to right, #00ec97, #fff, #00ec97)",
                  }}
                />
              </div>

              {highlightedRows.map((detail) => (
                <div
                  key={detail.validatorAddress}
                  className="faux-table-row"
                  style={{
                    display: "flex",
                    background: "#111",
                    color: "#fff",
                    borderBottom: "1px solid #333",
                    padding: "10px",
                  }}
                >
                  <div style={{ flex: 3, padding: "0 10px" }}>
                    {detail.validatorAddress}
                  </div>
                  <div style={{ flex: 2, padding: "0 10px" }}>
                    {formatNearAmount(detail.stakedBalance)}
                    <button style={{ marginLeft: "10px" }}>Stake</button>
                  </div>
                  <div style={{ flex: 2, padding: "0 10px" }}>
                    {formatNearAmount(detail.unstakedBalance) === "0.000"
                      ? "—"
                      : formatNearAmount(detail.unstakedBalance)}
                    <button
                      onClick={() =>
                        walletUnstake({
                          validator: detail.validatorAddress,
                          amount: detail.stakedBalance,
                        })
                      }
                    >
                      Unstake
                    </button>
                    {detail.isUnstakedBalanceAvailable ? (
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => console.log("unimplemented bro")}
                      >
                        Withdraw
                      </button>
                    ) : null}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      padding: "0 10px",
                    }}
                  >
                    {detail.isUnstakedBalanceAvailable !== null
                      ? detail.isUnstakedBalanceAvailable.toString()
                      : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3>Others</h3>
            <div
              className="faux-table"
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "6px 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  className="faux-table-header"
                  style={{
                    display: "flex",
                    borderRadius: "6px 6px 0 0",
                    background: "#000",
                    color: "#f2f1e9",
                    textTransform: "uppercase",
                    padding: "10px",
                    fontWeight: "bold",
                  }}
                >
                  <div style={{ flex: 3, padding: "0 10px" }}>Validator</div>
                  <div style={{ flex: 2, padding: "0 10px" }}>Staked</div>
                </div>
                <div
                  style={{
                    height: "6px",
                    background:
                      "linear-gradient(to right, #ff7966, #fff, #ff7966)",
                  }}
                />
              </div>
              {rangedRows.map((detail) => (
                <div
                  key={detail.validatorAddress}
                  className="faux-table-row"
                  style={{
                    display: "flex",
                    background: "#111",
                    color: "#fff",
                    borderBottom: "1px solid #333",
                    padding: "10px",
                  }}
                >
                  <div style={{ flex: 3, padding: "0 10px" }}>
                    {detail.validatorAddress}
                  </div>
                  <div style={{ flex: 2, padding: "0 10px" }}>
                    <button style={{ marginLeft: "10px" }}>Stake</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
