/**
 * @description
 * Initialize State for UI rendering
 */
State.init({
  displayColl: "",
  displayBorrow: "",
  coll: 0,
  borrow: 0,
  borrowingFee: 0,
  totalcoll: 0,
  collateralRatio: 0,
  liquidationReserve: 0,
  complete: false,
  loading: false,
  msg: "",
  borrowRateRaw: 0,
  borrowRate: 0,
  address: undefined,
  chainId: undefined,
  balance: undefined,
  price: 0,
  isOpenTrove: undefined,
  isRecoveryMode: undefined,
  isBlocked: true,
  isGasAllocated: false,
  isBorrowingRate: false,
  borrowWrapperStyle: undefined,
});

/**
 *
 * @param depositChangeEvent
 * @description
 * Update 'coll' when user fills ETH to number field.
 * Recalculate collateral ratio when ETH and LUSD number field is updated.
 * Collateral ratio : ((ETH * cueerent ETH price) / (borowwing LUSD + liquidation reserve + borrowing fee)) * 100
 * Check requirements for an active "Open Trove" button.
 */
const setcoll = (depositChangeEvent) => {
  const value = depositChangeEvent.target.value.replace(/[^.0-9]/g, "");
  const coll = Number(value);
  const { totalcoll } = state;
  const collateralRatio = ((coll * state.price) / Number(totalcoll)) * 100;

  State.update({
    displayColl: value,
    coll,
    collateralRatio,
  });

  validateTrove();
};

/**
 *
 * @param borrowChangeEvent
 * @description
 * Update 'borrow' when user fills LUSD to number field.
 * Calculate borrowing fee and total coll(=== total debt)
 * Borrowing fee formula cases.
 *   1. recovery mode : 0
 *   2. normal mode: (borrow * borrow rate) / 100
 *
 * Collateral ratio formula : ((ETH * cueerent ETH price) / (borowwing LUSD + liquidation reserve + borrowing fee)) * 100
 * Check requirements for an active "Open Trove" button.
 */
const setBorrow = (borrowChangeEvent) => {
  const { coll, liquidationReserve, borrowRate, isRecoveryMode } = state;
  const value = borrowChangeEvent.target.value.replace(/[^.0-9]/g, "");
  const borrow = Number(value);
  const borrowingFee =
    isRecoveryMode === true ? 0 : (borrow * borrowRate) / 100;
  const totalcoll =
    borrow + Number(borrowingFee.toFixed(2)) + liquidationReserve;
  const collateralRatio = ((coll * state.price) / Number(totalcoll)) * 100;

  State.update({
    displayBorrow: value,
    borrow,
    borrowingFee,
    totalcoll,
    collateralRatio,
  });
  validateTrove();
};

/**
 *
 * @description
 * check list for an active "Open Trove" button.
 *   1. LUSD being borrowed must be over 1800(LUSD).
 *   2. if the system is in recovery mode, the collateral ratio must exceed 150%.
 *   3. if the system is in normal mode, the collateral ratio must exceed 110%.
 *   4. you can only add coll(ETH) on your ETH balance.
 */
const validateTrove = () => {
  const { coll, borrow, totalcoll, balance, isRecoveryMode } = state;

  if (borrow < 1800) {
    State.update({
      msg: "Borrow must be at least 1800 LUSD",
      isBlocked: true,
    });
    return;
  }

  const collateralRatio = ((coll * state.price) / Number(totalcoll)) * 100;

  if (isRecoveryMode === true) {
    if (collateralRatio < 150) {
      State.update({
        msg: "Collateral ratio must be at least 150%",
        isBlocked: true,
      });
      return;
    }
  } else {
    if (collateralRatio < 110) {
      State.update({
        msg: "Collateral ratio must be at least 110%",
        isBlocked: true,
      });
      return;
    }
  }

  if (coll > Number(balance)) {
    State.update({
      msg: `The amount you're trying to deposit exceeds your balance by ${coll} ETH`,
      isBlocked: true,
    });
    return;
  }

  State.update({ msg: "", isBlocked: false });
};

/**
 * @description
 * 5 out of all contracts are being used for open trove.
 * Only the used functions are defined in the abi objects.
 * The contract address is registered on the Ethereum mainnet.
 *
 * Contract list.
 *   1. borrowerOperation
 *   2. troveManager
 *   3. priceFeed
 *   4. sortedTroves
 *   5. hintHelpers
 */
const borrowerOperationAddress = "0xD69fC8928D4F3229341cb431263F1EBd87B1ade8";
const borrowerOperationABI = [
  {
    inputs: [
      { internalType: "uint256", name: "_maxFeePercentage", type: "uint256" },
      { internalType: "uint256", name: "_LUSDAmount", type: "uint256" },
      { internalType: "address", name: "_upperHint", type: "address" },
      { internalType: "address", name: "_lowerHint", type: "address" },
    ],
    name: "openTrove",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const troveManagerAddress = "0x0ECDF34731eE8Dd46caa99a1AAE173beD1B32c67";

const troveManagerABI = [
  {
    inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
    name: "getTroveStatus",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_price", type: "uint256" }],
    name: "getTCR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LUSD_GAS_COMPENSATION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_LUSDDebt", type: "uint256" }],
    name: "getBorrowingFeeWithDecay",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBorrowingRateWithDecay",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_price", type: "uint256" }],
    name: "checkRecoveryMode",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
];

const priceFeedAddress = "0x07dD4Ce17De84bA13Fc154A7FdB46fC362a41E2C";
const priceFeedABI = [
  {
    inputs: [],
    name: "getPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

const sortedtrovesAddress = "0x136eF31a3aF35929e3Fc870dDB9b7c071DAB1B97";
const sortedtrovesABI = [
  {
    inputs: [],
    name: "getSize",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_NICR", type: "uint256" },
      { internalType: "address", name: "_prevId", type: "address" },
      { internalType: "address", name: "_nextId", type: "address" },
    ],
    name: "findInsertPosition",
    outputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const hintHelpersAddress = "0x5E24dC4C8f8052903c5dBe801F5A5faC18561a83";
const hintHelpersABI = [
  {
    inputs: [
      { internalType: "uint256", name: "_CR", type: "uint256" },
      { internalType: "uint256", name: "_numTrials", type: "uint256" },
      { internalType: "uint256", name: "_inputRandomSeed", type: "uint256" },
    ],
    name: "getApproxHint",
    outputs: [
      { internalType: "address", name: "hintAddress", type: "address" },
      { internalType: "uint256", name: "diff", type: "uint256" },
      { internalType: "uint256", name: "latestRandomSeed", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

/**
 * @description
 * Calculate two hints to reduce the gas cost; in which the gas spent is to insert the money into the trove list before calling the transaction.
 * The gas cost is O(n) in the worst case, but we want to reduce it for efficient O(1).
 * Call transaction "borrowingOperation.openTrove()" user click Open Trove button.
 * Example Borrower Operations with Hints reference link is "https://github.com/liquity/dev#example-borrower-operations-with-hints".
 */
const openTrove = async () => {
  if (state.complete) {
    State.update({ complete: false, hash: null });
  }

  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationABI,
    Ethers.provider().getSigner()
  );

  const sortedTroveContract = new ethers.Contract(
    sortedtrovesAddress,
    sortedtrovesABI,
    Ethers.provider().getSigner()
  );

  const hintHelpersContract = new ethers.Contract(
    hintHelpersAddress,
    hintHelpersABI,
    Ethers.provider().getSigner()
  );

  const LUSDAmount = ethers.BigNumber.from(
    ethers.utils.parseEther(state.borrow.toString())
  );

  const expectedDebt = ethers.BigNumber.from(
    ethers.utils.parseEther(state.totalcoll.toString())
  );

  const _1e20 = ethers.BigNumber.from(ethers.utils.parseEther("100"));

  const ETHColl = ethers.BigNumber.from(
    ethers.utils.parseEther(state.coll.toString())
  );

  /** Mission 3. NICR의 값을 구해주세요
   * 계산 식: NICR = ETHColl * 1e20 / expectedDebt
   * 아래의 계산 방법을 이용하되 ethersjs의 BigNumber API를 이용하세요
   * 참고 문서: https://docs.ethers.org/v5/api/utils/bignumber/#BigNumber--BigNumber--methods--math-operations
   * 입력창에 2ETH, 1800LUSD를 입력했을 때 NICR.toString()의 결과 값: "99552015928322548"
   */
  // const NICR = (ETHColl * 1e20) / expectedDebt;
  const NICR = ETHColl.mul(1e20).div(expectedDebt);
  console.log({ NICR: NICR.toString() });
  sortedTroveContract.getSize().then((numTroves) => {
    const _numTrials = numTroves.mul(ethers.BigNumber.from("15"));

    hintHelpersContract
      .getApproxHint(NICR.toString(), _numTrials.toString(), 42)
      .then((approxHintRes) => {
        const approxHint = approxHintRes[0];

        sortedTroveContract
          .findInsertPosition(NICR.toString(), approxHint, approxHint)
          .then((hintRes) => {
            const upperHint = hintRes[0];
            const lowerHint = hintRes[1];

            borrowerOperationContract
              .openTrove(
                state.borrowRateRaw,
                LUSDAmount,
                upperHint,
                lowerHint,
                {
                  value: ETHColl,
                }
              )
              .then((transactionHash) => {
                State.update({
                  loading: true,
                  hash: transactionHash.hash,
                  borrow: 0,
                  displayBorrow: "",
                  coll: 0,
                  displayColl: "",
                  borrowingFee: 0,
                  totalcoll: state.liquidationReserve,
                  collateralRatio: 0,
                  liquidationReserve: state.liquidationReserve,
                });
              });
          });
      });
  });
};

/**
 * @description
 * This code block initializes sceanario
 * The checklist assumes you have already connected your wallet.
 * Check List
 *   1. The network must be the Ethereum mainnet.
 *   2. Get ETH balance in your wallet.
 *   3. Check your trove is already open.
 *   4. Get liquity system LUSD_GAS_COMPENSATION.
 *   5. Get liquity system borrowing rate.
 *   6. Get ETH:USD price.
 *   7. Get liquity system called TCR(total collateral ratio).
 *   8. Get liquity system is recovery mode.
 */
if (Ethers.provider()) {
  const signer = Ethers.provider().getSigner();
  signer.getAddress().then((address) => {
    State.update({ address });
    if (state.chainId === 11155111) {
      const troveManagerContract = new ethers.Contract(
        troveManagerAddress,
        troveManagerABI,
        Ethers.provider().getSigner()
      );

      if (state.balance === undefined) {
        Ethers.provider()
          .getBalance(address)
          .then((balance) => {
            State.update({
              balance: Big(balance).div(Big(10).pow(18)).toFixed(2),
            });
          });
      }

      if (state.isOpenTrove === undefined) {
        troveManagerContract.getTroveStatus(address).then((res) => {
          const isOpenTrove = ethers.utils.formatEther(res).includes("1");
          State.update({ isOpenTrove });
        });
      }

      if (state.isGasAllocated === false) {
        troveManagerContract
          .LUSD_GAS_COMPENSATION()
          .then((liquidationReserveRes) => {
            const liquidationReserve = Number(
              ethers.utils.formatEther(liquidationReserveRes)
            );

            State.update({
              isGasAllocated: true,
              totalcoll: liquidationReserve,
              liquidationReserve: liquidationReserve,
            });
          });
      }

      if (state.isBorrowingRate === false) {
        troveManagerContract
          .getBorrowingRateWithDecay()
          .then((borrowingRateRes) => {
            State.update({
              isBorrowingRate: true,
              borrowRateRaw: borrowingRateRes,
              borrowRate:
                Number(
                  ethers.utils.formatEther(borrowingRateRes).substring(0, 6)
                ) * 100,
            });
          });
      }
    }
  });

  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });

  if (state.price === 0) {
    const priceFeedContract = new ethers.Contract(
      priceFeedAddress,
      priceFeedABI,
      Ethers.provider().getSigner()
    );

    const troveManagerContract = new ethers.Contract(
      troveManagerAddress,
      troveManagerABI,
      Ethers.provider().getSigner()
    );

    priceFeedContract.getPrice().then((priceRes) => {
      const price = Number(ethers.utils.formatEther(priceRes));

      State.update({ price });
      troveManagerContract.getTCR(priceRes).then((tcrRes) => {
        const tcr = Number(ethers.utils.formatEther(tcrRes)) * 100;

        State.update({ tcr });
      });

      troveManagerContract
        .checkRecoveryMode(ethers.BigNumber.from(priceRes))
        .then((isRecoveryMode) => {
          State.update({ isRecoveryMode: isRecoveryMode });
        });
    });
  }
}

const complete = () => {
  State.update({ complete: true });
};

/**
 * @description
 * Present the current status of the UI where the transaction is in progress.
 */
Ethers.provider() &&
  Ethers.provider()
    .waitForTransaction(state.hash)
    .then((res) => {
      State.update({
        loading: false,
      });
      complete();
    })
    .catch((err) => {
      State.update({ loading: false });
    });

/**
 * Mission 2. `borrowWrapper` 컴포넌트의 스타일을 외부 css파일을 불러와서 적용해보세요.
 * 외부 css 파일 링크: "https://raw.githubusercontent.com/LudiumAgwn/collegium-bos-wk2/main/assets/code/liquity-widget.css"
 * 여기를 고쳐주세요.
 */
const cssLink =
  "https://raw.githubusercontent.com/LudiumAgwn/collegium-bos-wk2/main/assets/code/liquity-widget.css";
const cssData = fetch(cssLink).body;

/**
 * 여기는 고치지 마세요!
 */
if (cssLink !== "PUT CSS FILE LINK") {
  if (!cssData) return "";
}

if (state.borrowWrapperStyle === undefined) {
  State.update({
    borrowWrapperStyle: styled.div`
    width: 100%;
    ${cssData}
`,
  });
}

/**
 * @description
 * This UI style uses the the "Styled Component" library.
 * Update this code block to change the style.
 */
const BorrowWrapper = state.borrowWrapperStyle;

/**
 * @description
 * This code block is HTML tags for building the UI structure.
 *
 * The UI is activated when the conditions below are satisfied.
 * 1. Connect your wallet.
 * 2. Network is Ethereum mainnet.
 * 3. Passes the "validateTrove" function result.
 * 4. There should be no active trove.
 * 5. Enter a value greater than 0 in the "coll" and "borrow" Number fields.
 */

// function setTrove() {
//   if (isOpenTrove !== true) {
//     console.log("이 지갑은 이미 활성화된 트로브가 있습니다.");
//     return <div>이 지갑은 이미 활성화된 트로브가 있습니다.</div>;
//   } else {
//     console.log("트로브가 없는데용?");
//     return <div>없다니까요??</div>;
//   }
// }
// const setsetset = () => {};

return (
  <BorrowWrapper>
    <div className="input-section deposit">
      <div className="input-label">Deposit (ETH)</div>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="0.0000 ETH"
          disabled={
            !state.address || state.isOpenTrove || state.chainId !== 11155111
          }
          onChange={setcoll}
          value={state.displayColl}
        ></input>
      </div>
    </div>
    <div className="input-section">
      <div className="input-label">Borrow (LUSD)</div>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="0.0000 LUSD"
          disabled={
            !state.address || state.isOpenTrove || state.chainId !== 11155111
          }
          onChange={setBorrow}
          value={state.displayBorrow}
        />
      </div>
    </div>
    <div className="error-message">{state.msg}</div>
    <div className="info-wrapper">
      <div className="detail-info-wrapper">
        <div className="detail-info-label">Liquidation Reserve</div>
        <div className="detail-info-value">
          <span className="">{state.liquidationReserve}</span>
          <span className="info-unit">LUSD</span>
        </div>
      </div>
      <div className="detail-info-wrapper">
        <div className="detail-info-label">Borrowing Fee</div>
        <div className="detail-info-value">
          <span className="">{state.borrowingFee.toFixed(2)}</span>{" "}
          <span className="info-unit">
            LUSD (
            {state.isRecoveryMode === true ? 0 : state.borrowRate.toFixed(2)}%)
          </span>
        </div>
      </div>

      <div className="detail-info-wrapper">
        <div className="detail-info-label">Recieve</div>
        <div className="detail-info-value">
          <span className="">{state.borrow.toFixed(2)}</span>
          <span className="info-unit">LUSD</span>
        </div>
      </div>

      <div className="detail-info-wrapper">
        <div className="detail-info-label">Total debt</div>
        <div className="detail-info-value">
          <span className="">{state.totalcoll.toFixed(2)}</span>
          <span className="info-unit">LUSD</span>
        </div>
      </div>
      <div className="detail-info-wrapper">
        <div className="detail-info-label">Collateral ratio</div>
        <div className="detail-info-value">
          <span>{state.collateralRatio.toFixed(1)}</span>
          <span className="info-unit">%</span>
        </div>
      </div>
    </div>
    <div className="confirm-wrapper">
      {state.address ? (
        <button
          className={`confirm ${state.isBlocked ? "not-ok" : "ok"}`}
          disabled={state.isBlocked}
          onClick={openTrove}
        >
          {Ethers.provider() && state.chainId !== 11155111
            ? "Change network to Sepolia"
            : state.isOpenTrove !== false
            ? "이 지갑은 이미 활성화된 트로브가 있습니다."
            : /**
             * Mission 1. "이 지갑은 이미 활성화된 트로브가 있습니다." 메시지를 추가해주세요.
             */
            state.loading
            ? "Loading..."
            : state.complete
            ? "Done ✅"
            : state.coll === 0 || state.borrow === 0
            ? "Enter input value"
            : state.isBlocked
            ? "Check stats"
            : "Open Trove"}
        </button>
      ) : (
        <Web3Connect className="connect-wallet" />
      )}
    </div>
  </BorrowWrapper>
);
