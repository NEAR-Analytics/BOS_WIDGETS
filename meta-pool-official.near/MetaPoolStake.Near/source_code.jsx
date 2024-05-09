const accountId = context.accountId;
const authorId = "meta-pool-official.near";
const isSignedIn = !!accountId;
const tokenDecimals = 24;
const BIG_ROUND_DOWN = 0;
const MIN_BALANCE_CHANGE = 0.5;
const contractId = "meta-pool.near";
const GAS = "200000000000000";
const ONE_NEAR = new BN("1" + "0".repeat(24));

State.init({
  openModal: false,
  validation: "",
  nearUsdPrice: null,
  nearUsdPriceIsFetched: false,
  metrics: null,
  metricsIsFetched: false,
  nearBalance: null,
  nearBalanceIsFetched: false,
  stNearBalance: null,
  stNearBalanceIsFetched: false,
  EpochInfo: null,
  EpochInfoIsFetched: false,
  dataIntervalStarted: false,
  isStNearMaxSelected: false,
  action: "stake",
  contractState: null,
  contractStateIsFetched: false,
  accountInfo: null,
  accountInfoIsFetched: false,
  feeBP: 30,
});

function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}

function getDiscountBasisPoints(liquidity, sell, contractState) {
  try {
    if (Big(sell).mul(Big(10).pow(tokenDecimals)).gt(liquidity)) {
      return contractState.nslp_max_discount_basis_points;
    }

    const target = Big(contractState.nslp_target);
    const liq_after = Big(liquidity).sub(
      Big(sell).mul(Big(10).pow(tokenDecimals))
    );
    if (liq_after.gte(target)) {
      return contractState.nslp_min_discount_basis_points;
    }

    let range = Big(
      contractState.nslp_max_discount_basis_points -
        contractState.nslp_min_discount_basis_points
    );

    const proportion = range.mul(liq_after).div(target);

    return contractState.nslp_max_discount_basis_points - Number(proportion);
  } catch (ex) {
    console.error(ex);
    return contractState.nslp_current_discount_basis_points;
  }
}

const fetchMetrics = () => {
  asyncFetch("https://validators.narwallets.com/metrics_json").then((resp) => {
    if (resp) {
      console.log("@metrics", resp?.body);
      State.update({ metrics: resp?.body ?? "...", metricsIsFetched: true });
    }
  });
};

const fetchNearPrice = () => {
  asyncFetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd"
  ).then((resp) => {
    const nearUsdPrice = resp?.body?.near.usd;
    if (nearUsdPrice && !isNaN(nearUsdPrice)) {
      console.log("@nearPrice", nearUsdPrice);
      State.update({
        nearUsdPrice: Number(nearUsdPrice),
        nearUsdPriceIsFetched: true,
      });
    }
  });
};

function getStNearBalance(subscribe) {
  Near.asyncView(
    contractId,
    "ft_balance_of",
    {
      account_id: accountId,
    },
    undefined,
    subscribe
  ).then((stNearBalanceRaw) => {
    if (!stNearBalanceRaw) return "-";
    const balance = Big(stNearBalanceRaw).div(Big(10).pow(tokenDecimals));
    console.log("@stNEAR balance", balance.lt(0) ? "0" : balance.toFixed());
    State.update({
      stNearBalance: balance.lt(0) ? "0" : balance.toFixed(),
      stNearBalanceIsFetched: true,
    });
  });
}

function getContractState(subscribe) {
  Near.asyncView(
    contractId,
    "get_contract_state",
    {},
    undefined,
    subscribe
  ).then((contractState) => {
    if (!contractState) return;
    State.update({
      contractState: contractState,
      contractStateIsFetched: true,
    });
  });
}

function getAccountInfo(subscribe) {
  Near.asyncView(
    contractId,
    "get_account_info",
    {
      account_id: accountId,
    },
    undefined,
    subscribe
  ).then((accountInfo) => {
    if (!accountInfo) return;
    State.update({
      accountInfo: accountInfo,
      contractStateIsFetched: true,
    });
  });
}

function getNearBalance(onInvalidate) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "query",
      params: {
        request_type: "view_account",
        finality: "final",
        account_id: accountId,
      },
    }),
  };
  asyncFetch("https://rpc.mainnet.near.org", options).then((res) => {
    console.log("@rpc view account", res);
    const { amount, storage_usage } = res?.body?.result;
    const COMMON_MIN_BALANCE = 0.05;

    let newBalance = "-";
    if (amount) {
      const availableBalance = Big(amount || 0).minus(
        Big(storage_usage).mul(Big(10).pow(19))
      );
      const balance = availableBalance
        .div(Big(10).pow(tokenDecimals))
        .minus(COMMON_MIN_BALANCE);
      newBalance = balance.lt(0) ? "0" : balance.toFixed(5, BIG_ROUND_DOWN);
    }
    console.log("@near balance", newBalance);
    State.update({
      nearBalance: newBalance,
      nearBalanceIsFetched: true,
    });
    if (onInvalidate) {
      onInvalidate(nearBalance, newBalance);
    }
  });
}
const update = (state) => State.update(state);

const handleInputNear = (value) => {
  if (
    (parseFloat(value) < 1 && parseFloat(value) > 0) ||
    parseFloat(value) < 0
  ) {
    State.update({
      validation: "The minimum amount is 1 NEAR.",
    });
  } else if (parseFloat(value) > parseFloat(state.nearBalance)) {
    State.update({
      validation: "You don't have enough NEAR.",
    });
  } else {
    State.update({
      validation: "",
    });
  }
  State.update({ value });
};

const handleInputStNear = (value) => {
  if (
    (parseFloat(value) < 1 && parseFloat(value) > 0) ||
    parseFloat(value) < 0
  ) {
    State.update({
      validation: "The minimum amount is 1 stNEAR.",
    });
  } else if (parseFloat(value) > parseFloat(state.stNearBalance)) {
    State.update({
      validation: "You don't have enough stNEAR.",
    });
  } else {
    State.update({
      validation: "",
    });
  }
  const feeBP = state.contractState
    ? getDiscountBasisPoints(
        state.contractState.nslp_liquidity,
        value,
        state.contractState
      )
    : 30;
  State.update({ value, isStNearMaxSelected: false, feeBP });
};

const getUserAddress = () => {
  if (!accountId) return "";
  return accountId.length > 20
    ? accountId.substring(0, 8) +
        "..." +
        accountId.substring(accountId.length - 6, accountId.length)
    : accountId;
};

const onClickMaxNear = () => {
  const value =
    state.nearBalance > 0.1
      ? (parseFloat(state.nearBalance) - 0.1).toFixed(2)
      : "0";
  handleInputNear(value);
};

const onClickMaxstNear = () => {
  handleInputStNear(
    (Math.trunc(parseFloat(state.stNearBalance) * 100) / 100).toFixed(2)
  );
  State.update({ isStNearMaxSelected: true });
};

const getEpochInfo = (prevBlock, startBlock, lastBlock) => {
  let prev_timestamp = Math.round(prevBlock.header.timestamp / 1e6);
  let start_block_height = startBlock.header.height;
  let start_timestamp = Math.round(startBlock.header.timestamp / 1e6);
  let last_block_timestamp = Math.round(lastBlock.header.timestamp / 1e6);

  if (start_timestamp < new Date().getTime() - 48 * 60 * 60 * 1000) {
    start_timestamp = new Date().getTime() - 6 * 60 * 60 * 1000;
  }
  if (prev_timestamp < new Date().getTime() - 48 * 60 * 60 * 1000) {
    prev_timestamp = new Date().getTime() - 12 * 60 * 60 * 1000;
  }

  let length = startBlock.header.height - prevBlock.header.height;
  let advance;
  let duration_ms;

  if (length == 0) {
    length = 43200;
    duration_ms = 12 * 60 * 60 * 1000;
    advance =
      Math.round(
        Number(
          Big(lastBlock.header.height)
            .sub(Big(start_block_height))
            .mul(Big(1000000))
            .div(Big(length))
        )
      ) / 1000000;
    start_timestamp = last_block_timestamp - duration_ms * advance;
    prev_timestamp = start_timestamp - duration_ms;
  } else {
    duration_ms = start_timestamp - prev_timestamp;
  }

  let ends_dtm = new Date(start_timestamp + duration_ms);
  return { duration_ms, ends_dtm };
};

function fetchEpochInfo() {
  getLastBlock().then((lastBlock) => {
    getBlock(lastBlock.body.result.header.next_epoch_id).then((firstBlock) => {
      getBlock(lastBlock.body.result.header.epoch_id).then((prevBlock) => {
        const epochCached = getEpochInfo(
          prevBlock.body.result,
          firstBlock.body.result,
          lastBlock.body.result
        );
        const newEndOfEpochCached = new Date(epochCached.ends_dtm);
        const newEpochDurationMs = epochCached.duration_ms;
        State.update({
          epochInfo: {
            endOfEpochCached: newEndOfEpochCached,
            epochDurationMs: newEpochDurationMs,
          },
        });
      });
    });
  });
}

async function getLastBlock() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "block",
      params: {
        finality: "optimistic",
      },
    }),
  };
  return asyncFetch("https://rpc.mainnet.near.org", options);
}
async function getBlock(blockId) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "block",
      params: {
        block_id: blockId,
      },
    }),
  };
  return asyncFetch("https://rpc.mainnet.near.org", options);
}

// UPDATE DATA

const updateData = () => {
  fetchNearPrice();
  fetchMetrics();
  getNearBalance();
  getStNearBalance();
  getContractState();
  getAccountInfo();
  fetchEpochInfo();
};

if (!state.dataIntervalStarted) {
  State.update({ dataIntervalStarted: true });
  updateData();
  setInterval(() => {
    updateData();
  }, 20000);
}

const render = {
  stake: (
    <Widget
      src={`${authorId}/widget/MetaPoolStake.Near.Stake`}
      props={{
        update,
        state,
        isSignedIn,
        handleInputNear,
        onClickMaxNear,
      }}
    />
  ),
  fast: (
    <Widget
      src={`${authorId}/widget/MetaPoolStake.Near.FastUnstake`}
      props={{
        update,
        state,
        isSignedIn,
        handleInputStNear,
        onClickMaxstNear,
      }}
    />
  ),
  delayed: (
    <Widget
      src={`${authorId}/widget/MetaPoolStake.Near.DelayUnstake`}
      props={{
        update,
        state,
        isSignedIn,
        handleInputStNear,
        onClickMaxstNear,
      }}
    />
  ),
}[state.action];

const SelectionContainer = styled.div`
    width: 100%;
    max-width: 600px;
    align-self: center;
    background-color: white;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    font-weight: 400;
    font-size: 12px;
    line-height: 1.6em;
    border-radius: 20px;
    padding: 12px 26px;
    box-shadow: none;
    color: #fff;    
    margin-bottom: 1em;
    padding: 12px 26px 32px 26px;
  `;

const ActionItem = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 16px;
  width: 14em;
  height:5em;;
  text-align: left;
  align-items: center;
  border: 0.8px solid rgb(215, 224, 228);
  background: rgb(247, 249, 251);
  opacity: 0.8;

  border-radius: 24px;

  ${({ active }) =>
    active
      ? `
    background: rgb(206, 255, 26);
  `
      : `
    :hover {
      background: rgb(215, 224, 228);
    }
  `}


  div {
    display: flex;
    flex-direction: column;
  }
`;

const Text = styled.p`
  color:#000000;
  font-size: 14px;
  line-height: 21px;
`;

const SelectAction = styled.div`
border-bottom-left-radius: 0px;
border-bottom-right-radius: 0px;
border-radius: 20px;
display: flex;
flex-direction: column;
width: 100%;
`;

const TokensList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const renderActions = (
  <SelectAction>
    <Text>Select action</Text>
    <TokensList>
      <ActionItem
        onClick={() => {
          State.update({
            action: "stake",
            value: "0",
            validation: "",
            isStNearMaxSelected: false,
          });
        }}
        active={state.action == "stake"}
      >
        <div>Stake</div>
        <div>
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width="24"
            height="24"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M16,7,6,17l1.41,1.41L15,10.83V28H2v2H15a2,2,0,0,0,2-2V10.83l7.59,7.58L26,17Z"></path>
            <path d="M6,8V4H26V8h2V4a2,2,0,0,0-2-2H6A2,2,0,0,0,4,4V8Z"></path>
          </svg>
        </div>
      </ActionItem>
      <ActionItem
        onClick={() => {
          State.update({
            action: "fast",
            value: "0",
            validation: "",
            isStNearMaxSelected: false,
          });
        }}
        active={state.action == "fast"}
      >
        <div>Fast Unstake</div>
        <div>
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width="24"
            height="24"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M18,30H4a2,2,0,0,1-2-2V14a2,2,0,0,1,2-2H18a2,2,0,0,1,2,2V28A2,2,0,0,1,18,30ZM4,14V28H18V14Z"></path>
            <path d="M25,23H23V9H9V7H23a2,2,0,0,1,2,2Z"></path>
            <path d="M30,16H28V4H16V2H28a2,2,0,0,1,2,2Z"></path>
          </svg>
        </div>
      </ActionItem>

      <ActionItem
        onClick={() => {
          State.update({
            action: "delayed",
            value: "0",
            validation: "",
            isStNearMaxSelected: false,
          });
        }}
        active={state.action == "delayed"}
      >
        <div>Delayed Unstake</div>
        <div>
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width="24"
            height="24"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M15 19H17V21H15zM15 23H17V25H15z"></path>
            <path d="M23,11.67V4h3V2H6V4H9v7.67a2,2,0,0,0,.4,1.2L11.75,16,9.4,19.13a2,2,0,0,0-.4,1.2V28H6v2H26V28H23V20.33a2,2,0,0,0-.4-1.2L20.25,16l2.35-3.13A2,2,0,0,0,23,11.67ZM21,4v7H11V4Zm0,16.33V28H11V20.33L14.25,16,12,13h8l-2.25,3Z"></path>
          </svg>
        </div>
      </ActionItem>
    </TokensList>
  </SelectAction>
);

return (
  <>
    <SelectionContainer>{renderActions}</SelectionContainer>
    {render}
  </>
);
