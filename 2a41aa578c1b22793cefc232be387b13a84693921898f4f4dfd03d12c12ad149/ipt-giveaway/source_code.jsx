const { contractAddress, walletAddress } = props;

if (!contractAddress || !walletAddress) {
  return "Please return to dashboard to connect to BOS";
}

if (!Ethers.provider()) {
  return "Something went wrong!! Try refresh the page";
}

const giveAwayAbi = [
  {
    inputs: [
      {
        internalType: "uint32",
        name: "index",
        type: "uint32",
      },
    ],
    name: "claimReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint32",
        name: "startBlock",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "endBlock",
        type: "uint32",
      },
      {
        internalType: "uint8",
        name: "kycStatus",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "randomType",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "assetType",
        type: "uint8",
      },
      {
        internalType: "uint32",
        name: "assetId",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "maxJoin",
        type: "uint32",
      },
    ],
    name: "createGiveaway",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "index",
        type: "uint32",
      },
    ],
    name: "participate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const iface = new ethers.utils.Interface(giveAwayAbi);

const UserVerifyLevel = [0, 1];

const AssetType = ["token"];

const RewardToken = ["IPT"];

const RandomType = ["chainlink"];

const updateState = (value, field) => {
  State.update({
    ...state,
    [field]: value,
  });
};

const setDatePlusMinutes = (date, minutes) => {
  date.setMinutes(date.getMinutes() + minutes);

  return date;
};

const getSeconds = (date) => {
  return date.getTime() / 1000;
};

State.init({
  name: "",
  startTime: setDatePlusMinutes(new Date(), 1),
  endTime: setDatePlusMinutes(new Date(), 3),
  userVerifyLevel: UserVerifyLevel[0],
  assetType: AssetType[0],
  rewardToken: RewardToken[0],
  rewardTokenAmount: 1,
  randomType: RandomType[0],
  maxJoin: 1,
  isFormSubmitted: false,
  formError: {
    name: null,
    startTime: null,
    endTime: null,
    rewardTokenAmount: null,
    maxJoin: null,
  },
  isSendingContract: false,
  contractMessage: null,
  contractStatus: null,
});

const isFormInvalid = () =>
  Object.values(state.formError).some((error) => error !== null);

const hasError = (fieldName) => state.formError[fieldName] !== null;

const formatToDatetimeInput = (date) => {
  if (!date) {
    return "";
  }

  date.setSeconds(null);

  const utcString = date.toISOString().substring(0, 19),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes();

  const localDatetime =
    year +
    "-" +
    (month < 10 ? "0" + month.toString() : month) +
    "-" +
    (day < 10 ? "0" + day.toString() : day) +
    "T" +
    (hour < 10 ? "0" + hour.toString() : hour) +
    ":" +
    (minute < 10 ? "0" + minute.toString() : minute) +
    utcString.substring(16, 19);

  return localDatetime;
};

const onSelectDatetime = (value, timeProp) => {
  updateState(!!value ? new Date(value) : "", timeProp);
};

// Form fields validation

const getNameError = () => {
  if (!state.name) {
    return "Name is required";
  } else {
    return null;
  }
};

const getStartTimeError = () => {
  if (!state.startTime) {
    return "Start time is required";
  } else if (state.startTime.getTime() < new Date().getTime()) {
    return "Start time cannot be in the past";
  } else {
    return null;
  }
};

const getEndTimeError = () => {
  if (!state.endTime) {
    return "End time is required";
  } else if (
    !state.startTime ||
    state.endTime.getTime() < state.startTime.getTime()
  ) {
    return "End time must be after Start time";
  } else {
    return null;
  }
};

const getTokenAmountError = () => {
  if (!state.rewardTokenAmount) {
    return "Token amount is required";
  } else if (isNaN(state.rewardTokenAmount)) {
    return "Must be a number";
  } else if (Math.sign(state.rewardTokenAmount) === -1) {
    return "Must be a positive number";
  } else {
    return null;
  }
};

const getMaxJoinError = () => {
  if (!state.maxJoin) {
    return "Max participants is required";
  } else if (isNaN(state.maxJoin)) {
    return "Must be a number";
  } else if (state.maxJoin < 1) {
    return "There must be at least 1 participant";
  } else {
    return null;
  }
};

const validateForm = () => {
  const nameError = getNameError();
  const startTimeError = getStartTimeError();
  const endTimeError = getEndTimeError();
  const tokenAmountError = getTokenAmountError();
  const maxJoinError = getMaxJoinError();

  const formErr = {
    ...state.formError,
    name: nameError,
    startTime: startTimeError,
    endTime: endTimeError,
    rewardTokenAmount: tokenAmountError,
    maxJoin: maxJoinError,
  };

  updateState(formErr, "formError");
};

const createContractParam = () => {
  return {
    name: state.name,

    kycStatus: State.userVerifyLevel,
    randomType,
  };
};

const handleSubmit = () => {
  validateForm();
  if (!isFormInvalid()) {
    updateState(true, "isSendingContract");

    Ethers.provider()
      .getBlock("latest")
      .then((block) => {
        const startBlock =
          Math.floor((state.startTime.getTime() - Date.now()) / 6000) +
          block.number;
        const endBlock =
          Math.floor((state.endTime.getTime() - Date.now()) / 6000) +
          block.number;
        console.log(1);

        const giveaway = new ethers.Contract(
          contractAddress,
          giveAwayAbi,
          Ethers.provider().getSigner(walletAddress)
        );
        console.log(2);

        const amount = ethers.utils
          .parseUnits(`${state.rewardTokenAmount}`, 18)
          .toString();
        console.log(amount);
        console.log(state);
        return giveaway
          .createGiveaway(
            state.name,
            startBlock, // start block
            endBlock, // end blokc
            state.userVerifyLevel,
            state.randomType === "chainlink" ? 0 : 1, // random type
            state.assetType === "token" ? 0 : 1, // asset type
            state.rewardToken === "IPT" ? 0 : 1, //assetId
            amount, // amount
            state.maxJoin
          )
          .then((transactionHash) => {
            State.update({
              isSendingContract: false,
              contractStatus: "success",
              contractMessage: "Giveaway has been created.",
            });
            console.log("transactionHash is " + transactionHash);
          })
          .catch((e) => {
            State.update({
              isSendingContract: false,
              contractStatus: "error",
              contractMessage: e.message,
            });
          });
      });
  }
};

const renderContractMessage = () => {
  let status = "";

  if (state.contractStatus === "success") {
    status = "success";
  } else if (state.contractStatus === "error") {
    status = "danger";
  }

  return (
    <div class={`alert alert-${status}`} role="alert">
      {state.contractMessage}
    </div>
  );
};

const renderTokenReward = () => {
  return (
    <>
      <div class="col-xs-12 col-sm">
        <input
          class="form-control text-capitalize"
          type="text"
          id="rewardToken"
          value={state.rewardToken}
          disabled
          readonly
        />
      </div>
      <div class="col-xs-12 col-sm">
        <div class="form-floating">
          <input
            type="number"
            class={`form-control ${
              hasError("rewardTokenAmount")
                ? "is-invalid"
                : state.isFormSubmitted
                ? "is-valid"
                : ""
            }`}
            id="rewardTokenAmount"
            placeholder="Token amount"
            value={state.rewardTokenAmount}
            onChange={(e) => updateState(e.target.value, "rewardTokenAmount")}
          />
          <label for="rewardTokenAmount">Token amount *</label>
          {hasError("rewardTokenAmount") && (
            <div class="invalid-feedback">
              {state.formError.rewardTokenAmount}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

return (
  <div class="container mt-3">
    {!!state.contractStatus && (
      <div class="row mb-3">
        <div class="col-sm-10 offset-sm-2">{renderContractMessage()}</div>
      </div>
    )}
    <div class="row mb-3">
      <label for="name" class="col-sm-2 col-form-label">
        Name *
      </label>
      <div class="col-sm-10">
        <input
          class={`form-control ${
            hasError("name")
              ? "is-invalid"
              : state.isFormSubmitted
              ? "is-valid"
              : ""
          }`}
          id="name"
          value={state.name}
          onChange={(e) => updateState(e.target.value, "name")}
        />
        {hasError("name") && (
          <div class="invalid-feedback">{state.formError.name}</div>
        )}
      </div>
    </div>
    <div class="row mb-3">
      <label for="startTime" class="col-sm-2 col-form-label">
        Start time *
        <br />
        <small>
          <i>(mm/dd/yyyy)</i>
        </small>
      </label>
      <div class="col-sm-10">
        <input
          type="datetime-local"
          class={`form-control ${
            hasError("startTime")
              ? "is-invalid"
              : state.isFormSubmitted
              ? "is-valid"
              : ""
          }`}
          id="startTime"
          value={formatToDatetimeInput(state.startTime)}
          onChange={(e) => onSelectDatetime(e.target.value, "startTime")}
        />
        {hasError("startTime") && (
          <div class="invalid-feedback">{state.formError.startTime}</div>
        )}
      </div>
    </div>
    <div class="row mb-3">
      <label for="endTime" class="col-sm-2 col-form-label">
        End time *
        <br />
        <small>
          <i>(mm/dd/yyyy)</i>
        </small>
      </label>
      <div class="col-sm-10">
        <input
          type="datetime-local"
          class={`form-control ${
            hasError("endTime")
              ? "is-invalid"
              : state.isFormSubmitted
              ? "is-valid"
              : ""
          }`}
          id="endTime"
          value={formatToDatetimeInput(state.endTime)}
          onChange={(e) => onSelectDatetime(e.target.value, "endTime")}
        />
        {hasError("endTime") && (
          <div class="invalid-feedback">{state.formError.endTime}</div>
        )}
      </div>
    </div>
    <div class="row mb-3">
      <label for="userVerifyLevel" class="col-sm-2 col-form-label">
        User verify level
      </label>
      <div class="col-sm-10">
        <select
          class="form-select"
          id="userVerifyLevel"
          value={state.userVerifyLevel}
          onChange={(e) => updateState(e.target.value, "userVerifyLevel")}
        >
          {UserVerifyLevel.map((level) => (
            <option value={level}>Level {level}</option>
          ))}
        </select>
        <span class="fs-6 fst-italic text-black-50">
          <small>
            Level 0 means no KYC verification - Level 1 required basic KYC
            verification
          </small>
        </span>
      </div>
    </div>
    <div class="row mb-3">
      <label for="assetType" class="col-sm-2 col-form-label">
        Reward Type
      </label>
      <div class="col-sm-10">
        <div class="row">
          <div class="col-xs-12 col-sm">
            <input
              class="form-control text-capitalize"
              type="text"
              id="assetType"
              value={state.assetType}
              disabled
              readonly
            />
          </div>
          {renderTokenReward()}
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <label for="randomType" class="col-sm-2 col-form-label">
        Random type
      </label>
      <div class="col-sm-10">
        <input
          class="form-control text-capitalize"
          type="text"
          id="randomType"
          value={state.randomType}
          disabled
          readonly
        />
      </div>
    </div>
    <div class="row mb-3">
      <label for="maxJoin" class="col-sm-2 col-form-label">
        Max participants *
      </label>
      <div class="col-sm-10">
        <input
          type="number"
          class={`form-control ${
            hasError("maxJoin")
              ? "is-invalid"
              : state.isFormSubmitted
              ? "is-valid"
              : ""
          }`}
          id="maxJoin"
          value={state.maxJoin}
          onChange={(e) => updateState(e.target.value, "maxJoin")}
        />
        {hasError("maxJoin") && (
          <div class="invalid-feedback">{state.formError.maxJoin}</div>
        )}
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-sm-10 offset-sm-2">
        <button
          class="btn btn-primary"
          type="button"
          disabled={state.isSendingContract}
          onClick={() => handleSubmit()}
        >
          {state.isSendingContract && (
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            />
          )}
          Submit
        </button>
      </div>
    </div>
  </div>
);
