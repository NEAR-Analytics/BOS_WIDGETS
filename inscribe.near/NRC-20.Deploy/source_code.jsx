const TGas = Big(10).pow(12);
const MaxGasPerTransaction = TGas.mul(250);
const GasPerTransaction = MaxGasPerTransaction.plus(TGas);
const pageAmountOfPage = 5;
const ipfsPrefix = "https://ipfs.near.social/ipfs";
const landingUrl = "https://neatprotocol.ai";
const partnerProgramUrl = "https://forms.gle/4M3fvw3LPiJSyffcA";
const nrc20DocHost = "https://docs.nrc-20.io/";
function toLocaleString(source, decimals, rm) {
  if (typeof source === "string") {
    return toLocaleString(Number(source), decimals);
  } else if (typeof source === "number") {
    return decimals !== undefined
      ? source.toLocaleString(undefined, {
          maximumFractionDigits: decimals,
          minimumFractionDigits: decimals,
        })
      : source.toLocaleString();
  } else {
    // Big type
    return toLocaleString(
      decimals !== undefined
        ? Number(source.toFixed(decimals, rm))
        : source.toNumber(),
      decimals
    );
  }
}

function formatAmount(_balance, _decimal) {
  const balance = _balance ?? 0;
  const decimal = _decimal ?? 8;
  return toLocaleString(
    Big(balance).div(Big(10).pow(decimal)).toFixed(),
    decimal
  );
}

function formatDeployTime(blockTime) {
  const milliseconds = blockTime / 1000000;
  const date = new Date(milliseconds);

  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

// Config for Bos app
function getConfig(network) {
  switch (network) {
    case "mainnet":
      return {
        ownerId: "inscribe.near",
        graphUrl:
          "https://api.thegraph.com/subgraphs/name/inscriptionnear/neat",
        nodeUrl: "https://rpc.mainnet.near.org",
        contractName: "inscription.near",
        methodName: "inscribe",
        args: {
          p: "nrc-20",
          op: "mint",
          tick: "neat",
          amt: "100000000",
        },
        transferArgs: {
          p: "nrc-20",
          op: "transfer",
          tick: "neat",
        },
        ftWrapperFactory: "nrc-20.near",
        ftWrapper: "neat.nrc-20.near",
        refFinance: "https://app.ref.finance/",
        minMintEvents: 1_000_000,
        minHolders: 1_000,
        neatDecimals: 8,
      };
    case "testnet":
      return {
        ownerId: "inscribe.testnet",
        graphUrl:
          "https://api.thegraph.com/subgraphs/name/inscriptionnear/neat-test",
        nodeUrl: "https://rpc.testnet.near.org",
        contractName: "inscription.testnet",
        methodName: "inscribe",
        args: {
          p: "nrc-20",
          op: "mint",
          tick: "neat",
          amt: "100000000",
        },
        transferArgs: {
          p: "nrc-20",
          op: "transfer",
          tick: "neat",
        },
        ftWrapperFactory: "nrc-20.testnet",
        ftWrapper: "neat.nrc-20.testnet",
        refFinance: "https://testnet.ref-finance.com/",
        minMintEvents: 10,
        minHolders: 5,
        neatDecimals: 8,
      };
    default:
      throw Error(`Unconfigured environment '${network}'.`);
  }
}
const config = getConfig(context.networkId);
const tx = {
  contractName: config.contractName,
  methodName: config.methodName,
  args: config.args,
  gas: GasPerTransaction,
};

function ftWrapperAddress(tick) {
  return tick.toLowerCase() + "." + config.ftWrapperFactory;
}

const FormContainer = styled.div`
  max-width: 650px;
  width: 100%;
  background: #141414;
  border-radius: 4px;
  border: 1px solid #ffffff1a;
  display: flex;
  flex-direction: column;
  gap: 36px;

  padding: 16px;
  @media (min-width: 640px) {
    padding: 24px;
  }
`;

const FormTitle = styled.div`
  font-size: 22px;
  font-weight: 600px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const FormDescription = styled.div`
  font-size: 16px;
  font-weight: 500;
  font-style: italic;
`;

const FormDivider = styled.hr`
  margin: 8px 0;
`;

const FormButton = styled.button`
  height: 56px;
  width: 100%;
  display: grid;
  place-content: center;
  cursor: pointer;
  border: 1px solid #ffffff;
  font-size: 18px;
  font-weight: 600;
  border-radius: 4px;
  background: transparent;
  color: #ffffff;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const isInputDigit = (value) => /^(\d*(\.\d*)?|\.\d+)$/.test(value);
const isDigit = (value) => /^\d+(\.\d+)?$/.test(value);
const isInteger = (value) => /^\d+$/.test(value);
const isLetterAndDigit = (value) => /^[a-zA-Z0-9]+$/.test(value);
const removePrefix0 = (value) => {
  if (!isDigit(value)) return value;
  if (Number(value) === 0 && !value.includes(".")) return "0";
  else {
    if (value.includes(".")) {
      if (!value.startsWith(".")) {
        return value;
      }
      return value.replace(/^0+/, "0");
    } // 00. transform to 0.
    else return value.replace(/^0+/, ""); // 01 transform to 1
  }
};

const isMaxDecimals = (_value, _decimals) => {
  const value = String(_value);
  const decimals = Number(_decimals ?? 0);
  if (!value.includes(".")) {
    return true;
  }
  const splits = value.split(".");
  if (decimals === 0) {
    return false;
  }
  const num = splits[1].length;
  return decimals >= num;
};

function fetchFromGraph(query) {
  return fetch(config.graphUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });
}

function asyncFetchFromGraph(query) {
  return asyncFetch(config.graphUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });
}

function fetchEventCounts(_tick) {
  const tick = _tick || "NEAT";
  return asyncFetchFromGraph(`
    query {
      eventCounts(where: {id:"${tick}"}) {
        id
        ticker
        mintEventCount
        transferEventCount
      }
    }
  `).then((response) => {
    if (response.body?.data?.eventCounts) {
      return response.body.data.eventCounts;
    }
    return undefined;
  });
}

function fetchTokenInfosAsync() {
  return asyncFetchFromGraph(`
    query {
      tokenInfos(first: 1000) {
        ticker
        maxSupply
        totalSupply
        limit
        createdBlockTimestamp
        decimals
      }
      holderCounts(first: 1000) {
        ticker
        count
      }
    }
  `).then((tokensInfoResponse) => {
    if (tokensInfoResponse.body?.data) {
      return tokensInfoResponse.body?.data;
    }
    return undefined;
  });
}

function fetchTokenInfoAsync(token) {
  return asyncFetchFromGraph(`
    query {
      tokenInfo (
        id: "${token.toUpperCase()}",
      ) {
        ticker
        limit
        decimals
        maxSupply
        totalSupply
        creatorId
        createdBlockHeight
        createdBlockTimestamp
      }
      holderCount (
        id: "${token.toUpperCase()}",
      ) {
        ticker
        count
      }
    }
  `).then((tokenInfoResponse) => {
    if (tokenInfoResponse.body?.data) {
      return tokenInfoResponse.body.data;
    }
    return undefined;
  });
}

function fetchOwnTokenInfosAsync(creatorId) {
  return asyncFetchFromGraph(`
    query {
      tokenInfos(where:{creatorId:"${creatorId}"}) {
        ticker
        decimals
        limit
      }
    }
  `).then((tokenInfoResponse) => {
    if (tokenInfoResponse.body?.data) {
      return tokenInfoResponse.body.data;
    }
    return undefined;
  });
}

function getBalance() {
  const accountId = props.accountId || context.accountId;
  return asyncFetchFromGraph(`
    query {
      holderInfos(
        where: {
          accountId: "${accountId}"
          ticker: "neat"
        }
      ) {
        accountId
        amount
      }
    }
  `).then((balanceResponse) => {
    const holder = balanceResponse.body.data.holderInfos[0];
    if (holder) {
      return holder.amount;
    }
    return "0";
  });
}

function getBalances() {
  const accountId = props.accountId || context.accountId;
  return asyncFetchFromGraph(`
    query {
      holderInfos(
        where: {
          accountId: "${accountId}"
        }
      ) {
        ticker
        amount
      }
    }
  `).then((balanceResponse) => {
    if (balanceResponse.body?.data) {
      return balanceResponse.body.data.holderInfos;
    }
    return undefined;
  });
}

function getFtWrappers(n, _data) {
  const i = n ?? 0;
  const data = _data ?? [];
  const amount = 500;
  return Near.asyncView(config.ftWrapperFactory, "get_ft_wrappers", {
    offset: i * amount,
    limit: amount,
  })
    .then((subcontracts) => {
      if (subcontracts.length < amount) {
        return [...subcontracts, ...data];
      } else {
        return getFtWrappers(i + 1, subcontracts).then((response) => {
          return [...response, ...data];
        });
      }
    })
    .catch((err) => {
      console.error(err);
      return data;
    });
}

function getNep141Balance(contractName) {
  const accountId = props.accountId || context.accountId;
  return Near.asyncView(contractName, "ft_balance_of", {
    account_id: accountId,
  });
}

function getWrapFeeRate(contractName) {
  const accountId = props.accountId || context.accountId;
  return Near.asyncView(contractName, "get_wrap_fee_rate", {
    account_id: accountId,
  });
}

function getUnwrapFeeRate(contractName) {
  const accountId = props.accountId || context.accountId;
  return Near.asyncView(contractName, "get_unwrap_fee_rate", {
    account_id: accountId,
  });
}

function getWrappedFtBalance() {
  const accountId = props.accountId || context.accountId;
  return Near.asyncView(config.ftWrapper, "ft_balance_of", {
    account_id: accountId,
  });
}

function getNrc20TotalSupply() {
  if (!state.nep141TotalSupply || !state.tokenInfo?.maxSupply) return undefined;
  return Big(state.tokenInfo.maxSupply)
    .minus(state.nep141TotalSupply)
    .toFixed();
}

function getNep141TotalSupply() {
  return Near.asyncView(config.ftWrapper, "ft_total_supply");
}



const accountId = props.accountId || context.accountId;
const isSignedIn = !!accountId;
const minMintEvents = config.minMintEvents;
const minHolders = config.minHolders;
function getVariantByAccount() {
  if (state.validAccount === false) return "red";
  if (state.validAccount === true) return "green";
  return undefined;
}
const variant = getVariantByAccount();

const ERROR_INVALID_AIRDROP_PARAMS =
  "Please fill in both airdrop amount and target token, or leave both of them empty";

function updateBalance() {
  const interval = setInterval(() => {
    getBalance().then((balance) => {
      if (balance && state.balance !== balance) {
        State.update({ balance });
        clearInterval(interval);
      }
    });
  }, 500);
}

State.init({
  tickInput: "",
  totalSupplyInput: "",
  limitPerMintInput: "1",
  decimalsInput: "8",
  airdropAmountInput: "",
  targetNrc20TokenInput: "",
});

function updateTickInput(value) {
  State.update({ tickInputError: undefined });
  if (!isSignedIn) {
    State.update({
      tickInputError: "Sign in please",
    });
    return;
  }
  State.update({ tickInput: value });
  // debounce
  clearTimeout(state.timer);
  State.update({
    timer: setTimeout(() => {
      if (value !== "") {
        if (!isLetterAndDigit(value) || value.length < 3 || value.length > 8) {
          State.update({
            tickInputError:
              "Ticker must be of length 3 to 8 and contains letters and numbers only",
          });
          return;
        }
        fetchTokenInfoAsync(value).then((response) => {
          if (response.tokenInfo) {
            State.update({
              tickInputError: "The ticker name already exists",
            });
            return;
          }
        });
      }
    }, 300),
  });
}

function updateTotalSupplyInput(value) {
  if (!isSignedIn) {
    State.update({
      totalSupplyInputError: "Sign in please",
    });
    return;
  }

  if (value === "" || isInteger(value)) {
    State.update({
      totalSupplyInputError: undefined,
      totalSupplyInput: removePrefix0(value),
    });
    updateAirdropAmountInput(state.airdropAmountInput);
  }

  if (isDigit(value) && Big(value).eq(0)) {
    State.update({
      totalSupplyInputError: "The total supply should be greater than 0",
    });
  }
}

function updateLimitPerMintInput(value) {
  if (!isSignedIn) {
    State.update({
      limitPerMintInputError: "Sign in please",
    });
    return;
  }

  if (value === "" || isInteger(value)) {
    State.update({
      limitPerMintInputError: undefined,
      limitPerMintInput: removePrefix0(value),
    });
  }

  if (isDigit(value) && Big(value).eq(0)) {
    State.update({
      limitPerMintInputError: "The limit per mint should be greater than 0",
    });
  }
}

function updateDecimalsInput(value) {
  State.update({ decimalsInputError: undefined });
  if (!isSignedIn) {
    State.update({
      decimalsInputError: "Sign in please",
    });
    return;
  }

  if (value === "" || isInteger(value)) {
    State.update({ decimalsInput: removePrefix0(value) });
  }

  if (isDigit(value) && Big(value).gt(24)) {
    State.update({
      decimalsInputError: "The decimals should be less than 24",
    });
  }
}

function updateAirdropAmountInput(value) {
  State.update({
    airdropAmountInputError: undefined,
  });
  if (ERROR_INVALID_AIRDROP_PARAMS === state.targetNrc20TokenInputError) {
    State.update({
      targetNrc20TokenInputError: undefined,
    });
  }
  if (!isSignedIn) {
    State.update({
      airdropAmountInputError: "Sign in please",
    });
    return;
  }

  if (value === "0") {
    return;
  }

  if (value === "" || isInteger(value)) {
    State.update({
      airdropAmountInputError: undefined,
      airdropAmountInput: removePrefix0(value),
    });
  }

  const halfTotalSupply = Big(
    isDigit(state.totalSupplyInput) ? state.totalSupplyInput : "0"
  ).times(0.5);
  if (isDigit(value)) {
    if (Big(value).gt(halfTotalSupply)) {
      State.update({
        airdropAmountInputError:
          "Airdrop amount should not exceed 50% of total supply!",
      });
    }
  }
}

function updateTargetNrc20TokenInput(value) {
  State.update({
    targetNrc20TokenInputError: undefined,
  });
  if (ERROR_INVALID_AIRDROP_PARAMS === state.airdropAmountInputError) {
    State.update({
      airdropAmountInputError: undefined,
    });
  }
  if (!isSignedIn) {
    State.update({
      targetNrc20TokenInputError: "Sign in please",
    });
    return;
  }
  State.update({ targetNrc20TokenInput: value });
  // debounce
  clearTimeout(state.timer);
  State.update({
    timer: setTimeout(() => {
      if (value !== "") {
        if (!isLetterAndDigit(value) || value.length < 3 || value.length > 8) {
          State.update({
            targetNrc20TokenInputError:
              "Ticker must be of length 3 to 8 and contains letters and numbers only",
          });
          return;
        }
        fetchTokenInfoAsync(value).then((response) => {
          if (response.tokenInfo) {
            const holderCount = response.holderCount?.count;
            if (
              Big(response.tokenInfo.totalSupply ?? "0").lt(
                response.tokenInfo.maxSupply ?? "0"
              )
            ) {
              State.update({
                targetNrc20TokenInputError:
                  "The target token hasn't been 100% minted",
              });
              return;
            } else if (Big(holderCount).lt(minHolders)) {
              State.update({
                targetNrc20TokenInputError: `Target token has less than ${minHolders.toLocaleString()} holders`,
              });
              return;
            }
            fetchEventCounts(value.toUpperCase()).then((response) => {
              if (response && response.length > 0) {
                const mintEventCount = response[0].mintEventCount ?? "0";
                if (Big(mintEventCount).lt(minMintEvents)) {
                  State.update({
                    targetNrc20TokenInputError: `Target token has less than ${minMintEvents.toLocaleString()} valid mint events`,
                  });
                }
              }
            });
            return;
          } else {
            State.update({
              targetNrc20TokenInputError: "The ticker name does not exists",
            });
            return;
          }
        });
      }
    }, 300),
  });
}

const disabled =
  state.tickInput === "" ||
  !isDigit(state.totalSupplyInput) ||
  !isDigit(state.limitPerMintInput) ||
  !isDigit(state.decimalsInput) ||
  !!state.tickInputError ||
  !!state.totalSupplyInputError ||
  !!state.limitPerMintInputError ||
  !!state.decimalsInputError ||
  !!state.airdropAmountInputError ||
  !!state.targetNrc20TokenInputError;

const NRC20Link = styled.a`
  color: white;
  text-decoration: underline;
  text-underline-offset: 3px;
  display: flex;
  align-items: center;
`;

return (
  <FormContainer>
    <FormTitle>Deploy</FormTitle>
    <Widget
      src={`${config.ownerId}/widget/NEAT.FormInput`}
      props={{
        title: "Tick",
        value: state.tickInput,
        onChange: updateTickInput,
        error: state.tickInputError,
        placeholder: "ticker name is case insensitive",
      }}
    />
    <Widget
      src={`${config.ownerId}/widget/NEAT.FormInput`}
      props={{
        title: "Total Supply",
        value: state.totalSupplyInput,
        onChange: updateTotalSupplyInput,
        error: state.totalSupplyInputError,
      }}
    />
    <Widget
      src={`${config.ownerId}/widget/NEAT.FormInput`}
      props={{
        title: "Limit Per Mint",
        value: state.limitPerMintInput,
        onChange: updateLimitPerMintInput,
        error: state.limitPerMintInputError,
      }}
    />
    <Widget
      src={`${config.ownerId}/widget/NEAT.FormInput`}
      props={{
        title: "Decimals",
        value: state.decimalsInput,
        onChange: updateDecimalsInput,
        error: state.decimalsInputError,
      }}
    />
    <FormDivider />
    <Widget
      src={`${config.ownerId}/widget/NEAT.FormInput`}
      props={{
        title: "Airdrop Amount* (Optional)",
        titleNormal: true,
        value: state.airdropAmountInput,
        onChange: updateAirdropAmountInput,
        error: state.airdropAmountInputError,
        placeholder: "≤ 50% of total supply",
      }}
    />
    <Widget
      src={`${config.ownerId}/widget/NEAT.FormInput`}
      props={{
        title: "Airdrop Target NRC-20 Token* (Optional)",
        titleNormal: true,
        value: state.targetNrc20TokenInput,
        onChange: updateTargetNrc20TokenInput,
        error: state.targetNrc20TokenInputError,
        placeholder: `≥ ${minMintEvents.toLocaleString()} valid mint events and ≥ ${minHolders.toLocaleString()} holders`,
      }}
    />
    <FormDescription>
      <NRC20Link href={`${nrc20DocHost}/extension/airdrop/`} target="_blank">
        Register Airdrop and Reach More Users
        <img
          src={`${ipfsPrefix}/bafkreic5cf2mzo67sfrloi7j3h6tpqry2zpvihzkx6d6nhb7atqlxrg75m`}
          width={25}
          height={25}
        />
      </NRC20Link>
    </FormDescription>
    <FormButton
      disabled={disabled}
      onClick={() => {
        const deployTx = {
          contractName: config.contractName,
          methodName: config.methodName,
          args: {
            p: config.args.p,
            op: "deploy",
            tick: state.tickInput.toLowerCase(),
            max: Big(state.totalSupplyInput)
              .times(Big(10).pow(Number(state.decimalsInput)))
              .toFixed(0),
            lim: Big(state.limitPerMintInput)
              .times(Big(10).pow(Number(state.decimalsInput)))
              .toFixed(0),
            dec: Number(state.decimalsInput),
          },
          gas: GasPerTransaction,
        };
        if (state.airdropAmountInput && !state.targetNrc20TokenInput) {
          State.update({
            targetNrc20TokenInputError: ERROR_INVALID_AIRDROP_PARAMS,
          });
        } else if (!state.airdropAmountInput && state.targetNrc20TokenInput) {
          State.update({
            airdropAmountInputError: ERROR_INVALID_AIRDROP_PARAMS,
          });
        } else if (state.airdropAmountInput && state.targetNrc20TokenInput) {
          const airdropTx = {
            contractName: config.contractName,
            methodName: config.methodName,
            args: {
              p: config.args.p,
              op: "register_airdrop",
              tick: state.tickInput.toLowerCase(),
              to: state.targetNrc20TokenInput.toLowerCase(),
              amt: Big(state.airdropAmountInput)
                .times(Big(10).pow(Number(state.decimalsInput)))
                .toFixed(0),
            },
          };
          Near.call([deployTx, airdropTx]);
        } else {
          Near.call(deployTx);
        }
      }}
    >
      Deploy
    </FormButton>
  </FormContainer>
);
