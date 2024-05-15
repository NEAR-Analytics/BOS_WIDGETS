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

const shitzuNearAddress = "token.0xshitzu.near";
const shitzuDaoAddress = "shitzu.sputnik-dao.near";
const shitzuContractAddress = "0x68e401B61eA53889505cc1366710f733A60C2d41";
const migrateContractAddress = "0xA6f40A8Ca2CE1A5D570A52BD34897aBDF75438FF";
const tokenDecimals = 18;
const migrationEndTime = new Date("2024-06-15T00:00:00.000Z");

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
    if (state.receiverId === shitzuNearAddress) {
      State.update({
        receiverError:
          "You must not send to the Shitzu token contract. Otherwise your tokens will be locked!",
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

const totalSupply = Near.view(shitzuNearAddress, "ft_total_supply");
if (!totalSupply) return "";
const progress = Big(totalSupply)
  .mul(100)
  .div(Big("576167000").mul(Big(10).pow(tokenDecimals)))
  .toFixed(3);
const price = JSON.parse(
  fetch("https://api.ref.finance/get-token-price?token_id=token.0xshitzu.near")
    .body
).price;
const marketCap = Big(price)
  .mul(totalSupply)
  .div(Big(10).pow(tokenDecimals))
  .toFixed(2);

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
const Text = styled.div`
  font-size: 1.1rem;
  font-style: italic;
`;
const Progress = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
  height: 1.6rem;
  width: 100%;
  background: ${({ progress }) =>
    `linear-gradient(to right, lightblue 0% ${progress}%, lightgrey ${progress}% 100%)`};
`;
const Countdown = styled.div`
  border: 1px solid #f00;
  border-radius: 0.6rem;
  background: #fcc;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  font-weight: bold;
`;

if (state.migrationEndDiff === undefined) {
  State.update({
    migrationEndDiff: Math.trunc(
      (migrationEndTime.valueOf() - Date.now()) / 1_000
    ),
  });
  return "";
}
setTimeout(() => {
  State.update({
    migrationEndDiff: Math.trunc(
      (migrationEndTime.valueOf() - Date.now()) / 1_000
    ),
  });
}, 1_000);

const seconds = String(state.migrationEndDiff.valueOf() % 60).padStart(2, "00");
const minutes = String(
  Math.trunc((state.migrationEndDiff.valueOf() / 60) % 60)
).padStart(2, "00");
const hours = String(
  Math.trunc((state.migrationEndDiff.valueOf() / (60 * 60)) % 24)
).padStart(2, "00");
const days = String(
  Math.trunc(state.migrationEndDiff.valueOf() / (60 * 60 * 24))
);

return (
  <Wrapper>
    <h2 style={{ alignSelf: "center" }}>SHITZU Migration</h2>

    <Countdown>
      <h3>Migration will close indefinitely in:</h3>
      {days}:{hours}:{minutes}:{seconds}
    </Countdown>

    <Progress progress={progress}>{progress}% migrated</Progress>

    <h5>Market Cap: {marketCap}$</h5>
    <span>(mcap calculation only includes SHITZUv2)</span>

    <a
      style={{ alignSelf: "center" }}
      href={`https://app.ref.finance/#near|${shitzuNearAddress}`}
      target="_blank"
    >
      <button>Buy SHITZU on Ref Finance</button>
    </a>

    <Text>
      This BOS component lets you migrate SHITZU from Aurora to the new contract
      on Near. The migration will close on June 15th 0:00am UTC. Until then you
      can migrate SHITZU 1:1 for the new token. The old SHITZU has address
      0x68e401B61eA53889505cc1366710f733A60C2d41 and can be bought at{" "}
      <a href="https://www.trisolaris.io/" target="_blank">
        Trisolaris
      </a>
      . The new SHITZU has address {shitzuNearAddress}
    </Text>

    <div>Logged in as: {getSender()}</div>

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
      <button
        onClick={() => {
          State.update({
            receiverId: shitzuDaoAddress,
          });
        }}
      >
        Donate to DAO
      </button>
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
