State.init({
  xavaToStake: "",
  styles: undefined,
  stakeHistory: [],
  xavaToWithdraw: "",
});

const TWStyles = state.styles;
const css = fetch(
  "https://gist.githubusercontent.com/Pikqi/658b6ee444d26dd69f0d5150797077dd/raw/d8f929729176bb30d86e2839443fddb83a87a685/tw-all-classes.css",
);

if (!css.ok) {
  return (
    <Widget
      props={{
        color1: "#ef4444",
        color2: "#7f1d1d",
      }}
      src="nui.sking.near/widget/Feedback.Spinner"
    />
  );
}

if (!state.styles) {
  State.update({
    styles: styled.div`
      font-family:
        Manrope,
        -apple-system,
        BlinkMacSystemFont,
        Segoe UI,
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        Fira Sans,
        Droid Sans,
        Helvetica Neue,
        sans-serif;
      ${css.body}
    `,
  });
}

if (state.user === undefined) {
  State.update({ user: Ethers.send("eth_requestAccounts", [])[0] });
}
if (!state.user) return <Web3Connect />;

if (state.chainId === undefined && ethers !== undefined && state.user) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}

console.log(state.user);

if (state.chainId !== undefined && state.chainId != 43114) {
  Ethers.send("wallet_switchEthereumChain", [
    {
      chainId: "0xA86A",
    },
  ]);
  return (
    <p>Your current network is not supported please switch to Avalanche </p>
  );
}

// Get deposit/withdraw history

// Helpers

const weisToTokens = (weis) => {
  const decimals = 18;
  const tokens = weis / Math.pow(10, decimals);
  return tokens;
};

const unixTimestampToLocalDate = (unixTimestamp) => {
  // Convert the timestamp to milliseconds (since Date works with milliseconds)
  const timestampInMillis = unixTimestamp * 1000;

  // Create a new Date object using the timestamp
  const date = new Date(timestampInMillis);

  // Get the local date components
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;

  return formattedDate;
};

const stakeHistoryQuery = `
 query {
 stakings(
	 where: {user: "${state.user}"}
	 orderBy: blockTimestamp
	 orderDirection: desc
 ) {
	 amount
	 blockTimestamp
	 withdraw
	 deposit
	 transactionHash
 
	}
}`;

const promise = fetch(
  "https://api.studio.thegraph.com/proxy/50002/avalaunchstakinggraph/version/latest/",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: stakeHistoryQuery }),
  },
);

if (promise.ok) {
  const stakeHistory = promise.body.data.stakings;

  State.update({ stakeHistory });
  console.log(state.stakeHistory);
}

const XAVA_ADDRESS = "0xd1c3f94DE7e5B45fa4eDBBA472491a9f4B166FC4";
const XAVA_STAKING = "0xA6A01f4b494243d84cf8030d982D7EeB2AeCd329";
const XAVA_ABIS = fetch(
  "https://gist.githubusercontent.com/Pikqi/b26446d1d891f880e85bfd181b5752e9/raw/422ab6565cad003553488c5dfea52c2bc87aa524/xava-abi-staking.json",
);

if (!XAVA_ABIS.ok) {
  return (
    <Widget
      props={{
        color1: "#ef4444",
        color2: "#7f1d1d",
      }}
      src="nui.sking.near/widget/Feedback.Spinner"
    />
  );
}
if (XAVA_ABIS.ok) {
  State.update({ stakingAbi: JSON.parse(XAVA_ABIS.body) });
}

const xavaAllocationIface = new ethers.utils.Interface(state.stakingAbi);

const ERC20_ABI = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json",
);
if (!ERC20_ABI.ok) {
  return (
    <Widget
      props={{
        color1: "#ef4444",
        color2: "#7f1d1d",
      }}
      src="nui.sking.near/widget/Feedback.Spinner"
    />
  );
}

// GET XAVA BALANCE
const tokenIface = new ethers.utils.Interface(ERC20_ABI.body);
const getXavaBalance = () => {
  const encodedData = tokenIface.encodeFunctionData("balanceOf", [state.user]);

  return Ethers.provider()
    .call({
      to: XAVA_ADDRESS,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = tokenIface.decodeFunctionResult(
        "balanceOf",
        rawBalance,
      );

      return Big(receiverBalanceHex.toString()).div(Big(10).pow(18)).toFixed(2);
    });
};

// GET STAKED BALANCE
const getStakedBalance = () => {
  const encodedData = xavaAllocationIface.encodeFunctionData("deposited", [
    0,
    state.user,
  ]);

  return Ethers.provider()
    .call({
      to: XAVA_STAKING,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = xavaAllocationIface.decodeFunctionResult(
        "deposited",
        rawBalance,
      );

      return Big(receiverBalanceHex.toString()).div(Big(10).pow(18)).toFixed(2);
    });
};

const setXavaBalance = () => {
  getXavaBalance().then((xavaBalance) => {
    State.update({ xavaBalance });
  });
};

if (state.xavaBalance === undefined && state.user) {
  setXavaBalance();
}

const setStakedXava = () => {
  getStakedBalance().then((xavaStaked) => {
    State.update({ xavaStaked });
  });
};

if (state.xavaStaked === undefined && state.user) {
  setStakedXava();
}

const convertToWei = (tokens) => {
  return Big(parseFloat(tokens)).times(Big(10).pow(18)).toFixed(0).toString();
};

const handleStakeXava = () => {
  let contract = new ethers.Contract(
    XAVA_STAKING,
    xavaAllocationIface,
    Ethers.provider().getSigner(),
  );
  contract
    .deposit("0", convertToWei(state.xavaToStake))
    .then((result) => {
      console.log(result);
      State.update({ txHash: result.hash, errorMsg: null });
    })
    .catch((e) => {
      console.log(e);
      State.update({ errorMsg: e.reason, txHash: null });
    });
};

const handleWithdrawXava = () => {
  const a = asyncFetch(
    "https://api.avalaunch.website/api/v1/staking/withdraw",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: state.user,
        amount: "1",
      }),
    },
  )
    .catch((err) => {
      console.log("error", err);
    })
    .then((result) => {
      const data = result.body.withdraw;
      State.update({
        nonce: data.nonce,
        expiration_timestamp: data.expiration_timestamp,
        signature: data.signature,
      });
    });

  let contract = new ethers.Contract(
    XAVA_STAKING,
    xavaAllocationIface,
    Ethers.provider().getSigner(),
  );
  console.log(
    "0",
    convertToWei(1),
    state.nonce,
    state.expiration_timestamp,
    state.signature,
  );
  contract
    .withdraw(
      "0",
      convertToWei(1),
      state.nonce,
      state.expiration_timestamp,
      state.signature,
    )
    .then((result) => {
      console.log(result);
    })
    .catch((e) => {
      console.log(e);
    });
};

return (
  <TWStyles>
    <div class="flex flex-col items-center w-full">
      <div class="bg-slate-100 shadow-lg rounded-xl flex flex-col items-center p-10 h-26 w-8/12">
        <div class="flex justify-between px-2 w-8/12">
          <p>
            Your Balance:
            <br /> <span className="text-bold">{state.xavaBalance}</span> XAVA
          </p>
          <p>
            Staked:
            <br /> {state.xavaStaked} XAVA
          </p>
        </div>
        <div class="flex gap-2 w-8/12">
          <div class="flex flex gap-1 w-full">
            <input
              placeholder="Amount to stake"
              style={{ flexGrow: 4 }}
              type="number"
              onChange={(e) => State.update({ xavaToStake: e.target.value })}
              value={state.xavaToStake}
            />
            <button
              style={{ flexGrow: 1 }}
              onClick={handleStakeXava}
              class="h-10 w-full py-3 bg-gradient-to-r from-red-500 to-red-800 rounded justify-center items-center gap-2 inline-flex text-white text-bold border-none"
              disabled={
                parseFloat(state.xavaToStake) > state.xavaBalance ||
                state.xavaToStake === ""
              }
            >
              Stake
            </button>
          </div>
        </div>
        <div class="flex gap-2 w-8/12 mt-3">
          <div class="flex flex gap-1 w-full">
            <input
              placeholder="Amount to withdraw"
              style={{ flexGrow: 4 }}
              type="number"
              onChange={(e) => State.update({ xavaToWithdraw: e.target.value })}
              value={state.xavaToWithdraw}
            />
            <button
              style={{ flexGrow: 1 }}
              onClick={handleStakeXava}
              class="h-10 w-full py-3 bg-gradient-to-r from-red-500 to-red-800 rounded justify-center items-center gap-2 inline-flex text-white text-bold border-none"
              onClick={handleWithdrawXava}
              disabled={
                parseFloat(state.xavaToWithdraw) > state.xavaStaked ||
                state.xavaToWithdraw === ""
              }
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>

      <div class="bg-slate-100 shadow-lg rounded-2xl flex flex-col items-center px-6 py-7 w-10/12 mt-2">
        {state.stakeHistory && (
          <div class="w-full">
            <h4 className="text-xl">Your recent deposits/withdrawals:</h4>
            <div class="flex flex-col gap-4">
              <div class="flex justify-between ">
                <p>Type</p>
                <p>Time</p>
                <p>Amount</p>
                <p>Transaction</p>
              </div>
              {state.stakeHistory.map((stake) => (
                <div class="flex justify-between">
                  <p class="">
                    {stake.deposit === "1" ? "Deposit" : "Withdraw"}
                  </p>
                  <p>{unixTimestampToLocalDate(stake.blockTimestamp)}</p>
                  <p>{weisToTokens(stake.amount).toFixed(2)} XAVA</p>
                  <a
                    target="_blank"
                    class="text-red-400 cursor-pointer"
                    href={`https://snowtrace.io/tx/${stake.transactionHash}`}
                  >
                    View transaction
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </TWStyles>
);
