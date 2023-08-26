const { contractAddress, chainIdIPT, rpcUrl } = props;

if (!contractAddress) {
  return "Please specify contract address";
}

const UserVerifyLevel = [1, 2, 3, 4];

const AssetType = ["token", "nft"];

const RewardToken = ["IPT", "BTC", "ETH"];

const RandomType = ["chainlink", "local"];

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
  chainId: undefined,
  name: "",
  startTime: setDatePlusMinutes(new Date(), 1),
  endTime: setDatePlusMinutes(new Date(), 3),
  userVerifyLevel: UserVerifyLevel[0],
  assetType: AssetType[0],
  rewardToken: RewardToken[0],
  rewardTokenAmount: 1,
  nftID: "",
  randomType: RandomType[0],
  userMustClaim: false,
  isFormSubmitted: false,
  formError: {
    name: null,
    startTime: null,
    endTime: null,
    rewardTokenAmount: null,
    nftID: null,
  },
});

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);

  if (accounts.length) {
    State.update({
      ...state,
      sender: accounts[0],
    });
    // console.log("set sender", accounts[0]);
  }
}

if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  // console.log("get network data");

  console.log("provider", Ethers.provider());

  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      console.log("chainIdData", chainIdData);

      if (chainIdData?.chainId) {
        State.update({ ...state, chainId: chainIdData.chainId });
      }
    });
}

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

const onChangeAssetType = (assetType) => {
  if (assetType === AssetType[0]) {
    State.update({
      ...state,
      nftID: "",
      assetType,
      formError: {
        ...state.formError,
        nftID: null,
      },
    });
  }

  if (assetType === AssetType[1]) {
    State.update({
      ...state,
      rewardToken: RewardToken[0],
      rewardTokenAmount: 1,
      assetType,
      formError: {
        ...state.formError,
        rewardToken: null,
        rewardTokenAmount: null,
      },
    });
  }
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
  if (state.assetType === AssetType[1]) {
    return null;
  }

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

const getNFTIDError = () => {
  if (state.assetType === AssetType[0]) {
    return null;
  }

  if (!state.nftID) {
    return "NFT id is required";
  } else {
    return null;
  }
};

const validateForm = () => {
  const nameError = getNameError();
  const startTimeError = getStartTimeError();
  const endTimeError = getEndTimeError();
  const tokenAmountError = getTokenAmountError();
  const nftError = getNFTIDError();

  const formErr = {
    ...state.formError,
    name: nameError,
    startTime: startTimeError,
    endTime: endTimeError,
    rewardTokenAmount: tokenAmountError,
    nftID: nftError,
  };

  updateState(formErr, "formError");
};

const createContractParam = () => {
  return {
    name: state.name,
    startBlock:
      getSeconds(state.startTime) - getSeconds(Date.now()) / 6 - curentBlock,
  };
};

const handleSubmit = () => {
  validateForm();

  if (!isFormInvalid()) {
    console.log("Process with smartcontract");
  }
};

const switchImpetus = () => {
  console.log("switching network");

  Ethers.send("wallet_addEthereumChain", [
    {
      chainId: "0x142",
      rpcUrls: [rpcUrl],
      chainName: "Impetus testnet",
      nativeCurrency: {
        name: "Impetus",
        symbol: "IPT",
        decimals: 18,
      },
      blockExplorerUrls: null,
    },
  ])
    .then((data) => {
      console.log("switch network data", data);
    })
    .catch((e) => {
      console.log("switch network error", e);
    });
};

const renderTokenReward = () => {
  return (
    <>
      <div class="col-xs-12 col-sm">
        <div class="form-floating">
          <select
            class="form-select text-uppercase"
            id="rewardToken"
            value={state.rewardToken}
            onChange={(e) => updateState(e.target.value, "rewardToken")}
          >
            {RewardToken.map((token) => (
              <option value={token}>{token}</option>
            ))}
          </select>
          <label for="rewardToken">Select token</label>
        </div>
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

const renderNftID = () => {
  return (
    <div class="col-xs-12 col-sm">
      <div class="form-floating">
        <input
          class={`form-control ${
            hasError("nftID")
              ? "is-invalid"
              : state.isFormSubmitted
              ? "is-valid"
              : ""
          }`}
          id="nftID"
          placeholder="NFT id"
          value={state.nftID}
          onChange={(e) => updateState(e.target.value, "nftID")}
        />
        <label for="nftID">NFT id *</label>
        {hasError("nftID") && (
          <div class="invalid-feedback">{state.formError.nftID}</div>
        )}
      </div>
    </div>
  );
};

return (
  <div class="container  mt-3">
    <div class="row mb-3">
      <div class="col-12 mb-3">
        <Web3Connect />
      </div>
      {!!state.sender && state.chainId !== Number(chainIdIPT) && (
        <div class="col-12">
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => switchImpetus()}
          >
            Switch Impetus
          </button>
        </div>
      )}
    </div>
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
      </div>
    </div>
    <div class="row mb-3">
      <label for="assetType" class="col-sm-2 col-form-label">
        Reward Type
      </label>
      <div class="col-sm-10">
        <div class="row">
          <div
            class={`col-xs-12 ${
              state.assetType === AssetType[0] ? "col-sm" : "col-sm-4"
            }`}
          >
            <select
              class="form-select text-capitalize"
              id="assetType"
              value={state.assetType}
              onChange={(e) => onChangeAssetType(e.target.value)}
            >
              {AssetType.map((type) => (
                <option value={type}>{type}</option>
              ))}
            </select>
          </div>
          {state.assetType === AssetType[0] && renderTokenReward()}
          {state.assetType === AssetType[1] && renderNftID()}
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <label for="randomType" class="col-sm-2 col-form-label">
        Random type
      </label>
      <div class="col-sm-10">
        <select
          class="form-select text-capitalize"
          id="randomType"
          value={state.randomType}
          onChange={(e) => updateState(e.target.value, "randomType")}
        >
          {RandomType.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-sm-10 offset-sm-2">
        <Widget
          src="nearui.near/widget/Input.Checkbox"
          props={{
            checked: state.userMustClaim,
            onChange: (checked) => updateState(checked, "userMustClaim"),
            label: "User must claim reward manually",
            id: "userMustClaim",
          }}
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-sm-10 offset-sm-2">
        <button type="button" class="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  </div>
);
