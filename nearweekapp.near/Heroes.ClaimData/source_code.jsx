State.init({
  message: "",
  timeUnit: null,
  deadline: null,
});

const { contract, whitelistContract, kyc_config } = props;

//get_tokens
const tokens = Near.view(contract, "get_tokens", {
  from_index: 0,
});

const kycRequired =
  typeof kyc_config !== "string" && "KycRequired" in kyc_config;

function mapTokenMetadata(tokens) {
  let tokenMetaData = {};
  if (tokens.length > 0) {
    for (const token of tokens) {
      const metadataResponse = Near.view(token[0], "ft_metadata", {});
      if (metadataResponse) {
        tokenMetaData[token[0]] = {
          symbol: metadataResponse.symbol,
          decimals: metadataResponse.decimals,
        };
      }
    }
  }
  return tokenMetaData;
}

const isUserWhitelisted =
  Near.view(props.whitelistContract, "is_whitelisted", {
    account_id: context.accountId,
  }) ?? false;

const tokenMap = mapTokenMetadata(tokens);

function convertToNanoseconds(duration, unit) {
  const mapUnits = {
    months: 24 * 60 * 30,
    weeks: 24 * 60 * 7,
    days: 24 * 60,
    hours: 1 * 60,
  };
  return (Number(duration) * mapUnits[unit] * 60 * 1000 * 1000000).toString();
}

function dayToEpoch(days) {
  const now = Date.now();
  const xDay = Number(days) * 24 * 60 * 60 * 1000;
  const nextDay = now + xDay;
  const epochSeconds = Math.floor(nextDay * 1000000);

  return epochSeconds.toString();
}

const matchToken = (token) => tokenMap[token].symbol;
const convertAmount = (amount, token) =>
  amount / Math.pow(10, tokenMap[token].decimals);
const amountToReadable = (amount) =>
  amount
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const isDisabled =
  (kycRequired && !isUserWhitelisted) ||
  props.bountyClaimed ||
  !context.accountId ||
  !state.message ||
  !state.deadline
    ? " disabled"
    : "";

const onChangeMessage = (message) => {
  State.update({
    message,
  });
};

const ShieldIcon = () => {
  return (
    <svg
      width="36"
      height="36"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#198754"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
};

const TimeCommitment = () => {
  const onChangeTimeUnit = (timeUnit) => {
    State.update({
      timeUnit,
    });
  };

  const onChangeDeadline = (deadline) => {
    if (/^\+?([1-9]\d*)$/.test(deadline)) {
      State.update({
        deadline,
      });
    } else {
      State.update({
        deadline: null,
      });
    }
  };

  return (
    <div>
      <span class="">Set time commitments</span>
      <div class="input-group mb-3">
        <select
          id="units"
          class="form-select"
          aria-label="Default select example"
          onChange={(e) => onChangeTimeUnit(e.target.value)}
        >
          <option value="">-Unit-</option>
          <option value="hours">Hours</option>
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Months</option>
        </select>
        <input
          class="form-control"
          min="1"
          type="number"
          disabled={!state.timeUnit}
          onChange={(e) => onChangeDeadline(e.target.value)}
        />
      </div>
    </div>
  );
};

const handleClick = () => {
  Near.call([
    {
      contractName: contract,
      methodName: "bounty_claim",
      args: {
        id: props.bountyId,
        token: props.token,
        deadline: convertToNanoseconds(state.deadline, state.timeUnit),
        description: state.message,
      },
      gas: 300000000000000,
      deposit: 1000000000000000000000000,
    },
  ]);
};

return (
  <div css="min-width: 300px; max-width: 400px;">
    <div class="card">
      <div class="card-body">
        <div class="d-flex align-items-baseline">
          <span class="fw-bold">
            {props.token in tokenMap && matchToken(props.token)}{" "}
          </span>
          {props.token in tokenMap ? (
            <span class="d-flex fw-bold fs-2 align-items-center">
              ${amountToReadable(convertAmount(props.amount, props.token))}
              {kycRequired && <ShieldIcon />}
            </span>
          ) : (
            "0"
          )}
        </div>
        <h6 class="card-title">{props.bountyTitle}</h6>
        <p class="card-text"></p>
        {kycRequired && !isUserWhitelisted && !props.bountyCompleted ? (
          <div>
            {/*<span class="badge text-bg-dark p-2">
              <span class="fs-5">KYC requied</span>
            </span>*/}
            <hr />
            <div class="blockquote-footer figcaption">
              KYC is required, please head to
              <a href="https://heroes.build" target="_blank">
                https://heroes.build/
              </a>{" "}
              to pass KYC before claiming this bounty
            </div>
          </div>
        ) : (
          ""
        )}
        {!props.bountyCompleted ? (
          <>
            <div class="input-group mb-3">
              <span class="input-group-text" id="message">
                -
              </span>
              <input
                type="text"
                class="form-control"
                onChange={(e) => onChangeMessage(e.target.value)}
                placeholder="Enter short message"
                aria-label="message"
                aria-describedby="message"
              />
            </div>
            <TimeCommitment />
            <a
              class={"btn bg-warning float-end " + isDisabled}
              onClick={handleClick}
            >
              Claim
            </a>
            <p class="font-monospace small align-text-top">
              Bounty ID: {props.bountyId}
            </p>
          </>
        ) : (
          <>
            <span class="badge text-bg-success p-2">
              <span class="fs-5">Completed</span>
            </span>{" "}
            <hr />
            <div class="blockquote-footer figcaption">
              Bounty completed and can't be claimed any more, check details on
              <a href="https://heroes.build/bounties" target="_blank">
                https://heroes.build/bounties
              </a>{" "}
            </div>
          </>
        )}
      </div>
      {!context.accountId && !props.bountyCompleted ? (
        <div class="m-2">
          <p class="blockquote-footer text-end">
            Sign-in NEAR wallet to be able to interact
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  </div>
);
