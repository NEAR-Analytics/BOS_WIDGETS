if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}
if (state.chainId !== undefined && state.chainId !== 1313161554) {
  return <p>Switch to Aurora Mainnet</p>;
}

const shitzuContractAddress = "0x68e401B61eA53889505cc1366710f733A60C2d41";
const migrateContractAddress = "0xA6f40A8Ca2CE1A5D570A52BD34897aBDF75438FF";
const tokenDecimals = 18;

const migrateAbi = fetch(
  "https://raw.githubusercontent.com/Shitzu-Apes/token/main/abi/ShitzuMigrate.abi"
);
if (!migrateAbi.ok) {
  return "Loading";
}

const shitzuRes = fetch(
  "https://old.explorer.aurora.dev/api/v2/smart-contracts/0x8BEc47865aDe3B172A928df8f990Bc7f2A3b9f79"
);
if (!shitzuRes.ok) {
  return "Loading";
}
const shitzuAbi = shitzuRes.body.abi;

const setAllowance = (amount) => {
  if (!state.receiverId || amount === undefined || amount === 0) {
    return;
  }
  const shitzuContract = new ethers.Contract(
    shitzuContractAddress,
    shitzuAbi,
    Ethers.provider().getSigner()
  );
  const migrateAmount = ethers.utils
    .parseUnits(amount, tokenDecimals)
    .toString();
  shitzuContract
    .approve(migrateContractAddress, migrateAmount)
    .then((txHash) => {
      console.log("txHash", txHash);
    })
    .finally(() => {
      State.update({
        loading: false,
      });
    });
  State.update({
    loading: true,
  });
};

const migrate = (amount) => {
  if (!state.receiverId || amount === undefined || amount === 0) {
    return;
  }

  asyncFetch("https://beta.rpc.mainnet.near.org", {
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
        account_id: state.receiverId,
      },
    }),
  }).then((res) => {
    if (!res.ok || res.body.error) {
      State.update({
        receiverError: `Account ${state.receiverId} does not exist!`,
      });
      return;
    }

    const migrateContract = new ethers.Contract(
      migrateContractAddress,
      migrateAbi.body,
      Ethers.provider().getSigner()
    );

    const migrateAmount = ethers.utils
      .parseUnits(amount, tokenDecimals)
      .toString();

    migrateContract
      .migrate(state.receiverId, migrateAmount)
      .then((txHash) => {
        console.log("txHash", txHash);
      })
      .finally(() => {
        State.update({
          loading: false,
        });
      });
    State.update({
      loading: true,
    });
  });
};

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
} else {
  const shitzuContract = new ethers.Contract(
    shitzuContractAddress,
    shitzuAbi,
    Ethers.provider().getSigner()
  );
  shitzuContract
    .allowance(state.sender, migrateContractAddress)
    .then((allowance) => {
      State.update({ allowance });
    });
}

const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};

const updateShitzuBalance = (receiver) => {
  const shitzuContract = new ethers.Contract(
    shitzuContractAddress,
    shitzuAbi,
    Ethers.provider().getSigner()
  );
  shitzuContract.balanceOf(receiver).then((shitzuBalance) => {
    State.update({ shitzuBalance });
  });
};

if (state.shitzuBalance === undefined && state.sender) {
  updateShitzuBalance(state.sender);
}

let notEnoughAllowance;
if (
  state.allowance !== undefined &&
  state.amount !== undefined &&
  !!state.amount
) {
  notEnoughAllowance =
    state.allowance.toBigInt() <
    ethers.utils.parseUnits(state.amount, tokenDecimals).toBigInt();
}
const disabled =
  state.loading || state.amount === undefined || state.receiverId === undefined;
let shitzuBalance;
if (!!state.shitzuBalance) {
  shitzuBalance = Big(state.shitzuBalance.toString())
    .div(Big(10).pow(tokenDecimals))
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 30rem;
    margin: 0 auto;

    label {
        font-size: 1.2rem;
        margin-bottom: 0.1rem;
    }
`;
const Error = styled.span`
    color: #c00;
`;

return (
  <Wrapper>
    <div>{getSender()}</div>

    <label for="receiver">
      Receiver (Near address)
      <input
        id="receiver"
        disabled={!state.sender}
        value={state.receiverId}
        onChange={(e) =>
          State.update({ receiverId: e.target.value, receiverError: undefined })
        }
        placeholder="Receiver (Near address)"
      />
      {state.receiverError && <Error>{state.receiverError}</Error>}
    </label>

    <label for="amount">
      Amount (SHITZUv1)
      <input
        id="amount"
        disabled={!state.sender}
        value={state.amount}
        onChange={(e) => {
          const amount = e.target.value;
          State.update({ amount: amount.replace(/[^0-9.]/g, "") });
        }}
        placeholder="Amount (SHITZUv1)"
      />
      <button
        onClick={() => {
          const shitzuBalance = state.shitzuBalance
            .toString()
            .replace(/[^0-9.]/g, "");
          const amount = Big(shitzuBalance.toString())
            .div(Big(10).pow(tokenDecimals))
            .toString();
          State.update({
            amount,
          });
        }}
      >
        MAX
      </button>
    </label>

    {state.sender && typeof shitzuBalance === "string" && (
      <div>SHITZUv1 balance: {shitzuBalance}</div>
    )}

    {!!state.sender ? (
      <>
        <button
          onClick={() => {
            if (notEnoughAllowance) {
              setAllowance(state.amount);
            } else {
              migrate(state.amount);
            }
          }}
          disabled={disabled}
        >
          <span>{notEnoughAllowance ? "approve SHITZUv1" : "Migrate"}</span>
        </button>
      </>
    ) : (
      <Web3Connect
        connectLabel="Connect Web3 Wallet"
        disconnectLabel="Disconnect Web3 Wallet"
        connectingLabel="Connecting..."
      />
    )}
  </Wrapper>
);
