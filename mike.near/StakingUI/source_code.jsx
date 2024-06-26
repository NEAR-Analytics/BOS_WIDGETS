const ProgressBar = VM.require("mike.near/widget/ProgressBar");
// console.log("aloha StakingUI propz", props);
const yoctoZeroes = "000000000000000000000000";

const [stakingAmount, setStakingAmount] = useState("6");
const [unstakingWithdrawlAmount, setUnstakingWithdrawlAmount] = useState("19");
const StakeUnstakeWithdraw = ({ validator, method, amount }) => {
  const openAnotherModal = ({ validator, method, amount }) => {
    // console.log('aloha top of openAnotherModal amount', amount);
    // Let's explicitly have these in a switch so no one tries any funny business with methods
    switch (method) {
      case "stake":
        Near.call(
          validator,
          "deposit_and_stake",
          { amount: `${stakingAmount}${yoctoZeroes}` },
          null,
          amount
        );
        break;
      case "unstake":
        Near.call(validator, "unstake", {
          amount: unstakingWithdrawlAmount + yoctoZeroes,
        });
        break;
      case "withdraw":
        // Near.call(validator, "withdraw", { amount });
        Near.call(validator, "withdraw", {
          amount: unstakingWithdrawlAmount + yoctoZeroes,
        });
        break;
    }
  };

  const handleCancel = () => {
    // eventually add fade-out effect
    setShowStakingModal(false);
  };
  const handleUnstake = (amount) => {
    console.log("Unstaking…", amount);
    openAnotherModal({ validator, method, amount });
  };
  const handleStake = (amount) => {
    console.log("Staking…", amount);
    openAnotherModal({ validator, method, amount });
  };
  const handleWithdraw = () => {
    console.log("Withdrawing…", unstakingWithdrawlAmount);
    openAnotherModal({ validator, method, amount: unstakingWithdrawlAmount });
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
      {method == "stake" ? (
        <input
          value={stakingAmount}
          onChange={(e) => setStakingAmount(e.target.value)}
          style={{
            padding: "13px",
            width: "80%",
            margin: "13px auto",
            display: "block",
          }}
        />
      ) : (
        <input
          value={unstakingWithdrawlAmount}
          onChange={(e) => setUnstakingWithdrawlAmount(e.target.value)}
          style={{
            padding: "13px",
            width: "80%",
            margin: "13px auto",
            display: "block",
          }}
        />
      )}
      <button
        onClick={(e) => {
          // console.log('aloha method', method);
          if (method === "unstake") {
            handleUnstake(`${stakingAmount}${yoctoZeroes}`);
          } else if (method === "stake") {
            // Assuming you have a function handleStake for the "stake" action
            handleStake(`${stakingAmount}${yoctoZeroes}`);
          } else if (method === "withdraw") {
            // handleWithdraw(`${stakingAmount}${yoctoZeroes}`);
            handleWithdraw(`${stakingAmount}${yoctoZeroes}`);
          }
        }}
        style={{ padding: "13px", margin: "13px auto", display: "block" }}
      >
        <span
          style={{
            textTransform: "capitalize",
          }}
        >
          {method}
        </span>
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

// Interesting, this seems to need to be above the StakeUnstakeWithdrawModal declaration
const walletUnstake = ({ validator, amount }) => {
  setStakingModalData({ validator, method: "unstake", amount });
  setShowStakingModal(true);
};
const walletWithdraw = ({ validator, amount }) => {
  console.log("aloha walletWithdraw amount", amount);
  // setStakingModalData({ validator, method: "withdraw", amount });
  setStakingModalData({ validator, method: "withdraw" });
  setShowStakingModal(true);
};
const walletStake = ({ validator, amount }) => {
  console.log("aloha stake validator", validator);
  setStakingModalData({ validator, method: "stake", amount });
  setShowStakingModal(true);
};

const { mainnetValidators } = VM.require(
  "mike.near/widget/StakingUI.getValidators"
);

// State initialization
const [progressVal, setProgressVal] = useState(0);
// 219 validators, sending at least two messages, sometimes a third.
// this sane starting place helps so the progress bar doesn't jump around
const [progressMax, setProgressMax] = useState(442);
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
            // todo: can make this a var
            setStakingAmount(
              parseInt(Math.floor(parseNearAmount(stakedBalance)))
            );
            setUnstakingWithdrawlAmount(
              parseInt(Math.floor(parseNearAmount(unstakedBalance)))
            );
            return {
              validatorAddress,
              stakedBalance,
              stakedBalanceWholeNums: parseInt(
                Math.floor(parseNearAmount(stakedBalance))
              ),
              unstakedBalance,
              unstakedBalanceWholeNums: parseInt(
                Math.floor(parseNearAmount(unstakedBalance))
              ),
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

  // only fair we tell the end user about the prep work for the promises
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

// debug by commenting this badboy out to see it
const stakingModalDisplayStyles = {
  display: showStakingModal ? "flex" : "none",
  opacity: showStakingModal ? 1 : 0,
};

const StakeUnstakeWithdrawModal = () => {
  if (!StakeUnstakeWithdraw) {
    return <></>;
  } else {
    const handleOutsideClick = (e) => {
      setShowStakingModal(false);
    };

    const outerDivStyle = {
      position: "fixed",
      top: "6%",
      left: 0,
      width: "100%",
      backgroundImage:
        "radial-gradient(ellipse, rgba(0, 0, 0, 0.3) 66%, transparent 80%)",
      display: "flex",
      justifyContent: "center",
      zIndex: 998,
      cursor: "pointer",
      ...stakingModalDisplayStyles,
    };

    const innerDivStyle = {
      cursor: "auto",
      position: "relative",
      width: "37%",
      height: "auto",
      overflowY: "hidden",
      padding: "1%",
      background:
        "radial-gradient(ellipse, rgba(151, 151, 255, .8) 19%, rgba(0, 0, 0, 0.8) 100%)",
      borderRadius: "13px",
      boxShadow:
        "0 0 15px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.2), 0 0 35px rgba(255, 255, 255, 0.1), 0 0 40px rgba(255, 255, 255, 0.05)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
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
        position: relative,
        width: "100%",
        filter: "contrast(166%)",
      }}
    >
      <div
        style={{
          fontFamily: "'Lucida Console', Monaco, monospace",
          padding: "13px 16px",
          maxWidth: "900px",
          margin: "0 auto",
          background: `radial-gradient(circle at top right, slategray, transparent 80%), 
                         radial-gradient(circle at center, darkslategray, transparent 83%)`,
          backgroundImage:
            'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPjxkZWZzPjxmaWx0ZXIgaWQ9InNsYXRlTm9pc2UiIHg9Ii01MCUiIHk9Ii01MCUiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIxLjkiIG51bU9jdGF2ZXM9IjYiIHJlc3VsdD0ibm9pc2UiLz48ZmVHYXVzc2lhbkJsdXIgaW49Im5vaXNlIiBzdGREZXZpYXRpb249IjIiIHJlc3VsdD0iYmx1cnJlZE5vaXNlIi8+PGZlQ29tcG9uZW50VHJhbnNmZXIgaW49InNsYXRlTm9pc2UiPjxmZUZ1bmNSIHR5cGU9ImxpbmVhciIgc2xvcGU9IjAuOSIgaW50ZXJjZXB0PSIwLjA1Ii8+PGZlRnVuY0cgdHlwZT0ibGluZWFyIiBzbG9wZT0iMC45IiBpbnRlcmNlcHQ9IjAuMDUiLz48ZmVGdW5jQiB0eXBlPSJsaW5lYXIiIHNsb3BlPSIwLjk1IiBpbnRlcmNlcHQ9IjAuMSIvPjwvZmVDb21wb25lbnRUcmFuc2Zlcj48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI3NsYXRlTm9pc2UpIiBmaWxsPSJkYXJrZ3JheSIgLz48L3N2Zz4=")',
          backgroundBlendMode: "hard-light",
          borderRadius: "16px 16px 0 0",
          filter: "saturate(6) grayscale(6%)",
        }}
      >
        <LoadingModal />
        <StakeUnstakeWithdrawModal />
        <h1
          style={{
            textAlign: "center",
            color: "#f2f1e9",
            textShadow: `-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,3px 3px 3px #000`,
            letterSpacing: "6px",
            textTransform: "uppercase",
          }}
        >
          Staking
        </h1>
        <div>
          <div>
            <div
              style={{
                background:
                  "radial-gradient(circle at top left, rgba(0, 0, 0, 0.6) 30%, rgba(0, 0, 0, 0.2) 70%)",
                filter: "drop-shadow(3px 3px 3px rgba(255, 255, 255, 0.6)",
                backdropFilter: "contrast(0.1)",
                padding: "10px",
                margin: "auto",
                marginBottom: "13px",
                color: "#fff",
                borderRadius: "6px",
              }}
            >
              <h3>Active</h3>
              <div
                className="faux-table"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "6px 0",
                  borderRadius: "6px",
                  boxShadow: "0 0 1px 0 #f2f1e9",
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
                      fontSize: "1.3em",
                    }}
                  >
                    <div style={{ flex: 2, padding: "0 10px" }}>Validator</div>
                    <div style={{ flex: 2, padding: "0 10px" }}>Staked</div>
                    <div style={{ flex: 2, padding: "0 10px" }}>Unstaked</div>
                  </div>
                  <div
                    style={{
                      height: "6px",
                      background:
                        "linear-gradient(to right, #00ec97, #fff, #00ec97)",
                      filter: "saturate(13%)",
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
                      borderBottom: "1px solid rgba(250, 250, 250, 0.3)",
                      padding: "10px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        flex: 2,
                        padding: "0 10px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {detail.validatorAddress}
                    </div>
                    <div
                      style={{
                        flex: 2,
                        padding: "0 10px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span>{detail.stakedBalanceWholeNums}</span>
                      <button
                        style={{
                          marginLeft: "10px",
                          background:
                            "linear-gradient(to right, #9797ff 6%, rgba(151, 151, 255, 0.6) 100%, #17d9d4 100%)",
                        }}
                        onClick={() =>
                          walletStake({
                            validator: detail.validatorAddress,
                            amount: "0", // what the heck, it's from state and not passed in
                          })
                        }
                      >
                        Stake
                      </button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flex: 2,
                        padding: "0 10px",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {formatNearAmount(detail.unstakedBalance) === "0.000"
                          ? "—"
                          : detail.unstakedBalanceWholeNums}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          paddingLeft: "10px",
                        }}
                      >
                        <button
                          onClick={() =>
                            walletUnstake({
                              validator: detail.validatorAddress,
                              amount: detail.stakedBalance,
                            })
                          }
                          style={{
                            marginBottom: "10px",
                            background:
                              "linear-gradient(to right, #9797ff 6%, rgba(151, 151, 255, 0.6) 100%, #17d9d4 100%)",
                          }}
                        >
                          Unstake
                        </button>
                        {detail.isUnstakedBalanceAvailable && (
                          <button
                            style={{
                              background:
                                "linear-gradient(to right, #9797ff 6%, rgba(151, 151, 255, 0.6) 100%, #17d9d4 100%)",
                            }}
                            onClick={() =>
                              walletWithdraw({
                                validator: detail.validatorAddress,
                                amount: detail.unstakedBalance,
                                // amount: "19", // this likely needs to be another RPC call here
                              })
                            }
                          >
                            Withdraw
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background:
                  "radial-gradient(circle at top left, rgba(0, 0, 0, 0.6) 19%, rgba(0, 0, 0, 0.1) 100%)",
                filter: "drop-shadow(3px 3px 3px rgba(255, 255, 255, 0.6)",
                backdropFilter: "contrast(0.6)",
                padding: "10px",
                margin: "auto",
                color: "#fff",
                borderRadius: "6px",
              }}
            >
              <h3>Others</h3>
              <div
                className="faux-table"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "6px 0",
                  borderRadius: "6px",
                  boxShadow: "0 0 1px 0 #f2f1e9",
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
                      fontSize: "1.3em",
                    }}
                  >
                    <div style={{ flex: 3, padding: "0 10px" }}>Validator</div>
                  </div>
                  <div
                    style={{
                      height: "6px",
                      background:
                        "linear-gradient(to right, #ff7966, #fff, #ff7966)",
                      filter: "saturate(13%)",
                    }}
                  />
                </div>
                <div
                  className={"white-scrollbar"}
                  style={{
                    maxHeight: "90vh",
                    overflow: "auto",
                  }}
                >
                  {rangedRows.map((detail) => (
                    <div
                      key={detail.validatorAddress}
                      className="faux-table-row"
                      style={{
                        display: "flex",
                        background: "#111",
                        color: "#fff",
                        borderBottom: "1px solid rgba(250, 250, 250, 0.3)",
                        padding: "10px",
                        alignItems: "center",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          flex: 3,
                          padding: "0 10px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          marginRight: "10px",
                        }}
                      >
                        {detail.validatorAddress}
                      </div>
                      <div style={{ flex: 1, padding: "0 10px" }}>
                        <button
                          style={{
                            marginLeft: "10px",
                            background:
                              "linear-gradient(to right, #9797ff 6%, rgba(151, 151, 255, 0.6) 100%, #17d9d4 100%)",
                          }}
                        >
                          Stake
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
