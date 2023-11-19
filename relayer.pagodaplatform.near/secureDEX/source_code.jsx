/// Layout
const DaisyUIWrapper = ({ children }) => {
  return (
    <Widget
      src="igris.near/widget/DaisyUIWrapper"
      props={{
        children,
        daisyUiTheme: "dark",
      }}
    />
  );
};

const USDCIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24.002"
      viewBox="0 0 24 24.002"
      width="24"
    >
      <path
        d="M1000 2000c554.17 0 1000-445.83 1000-1000S1554.17 0 1000 0 0 445.83 0 1000s445.83 1000 1000 1000z"
        fill="#2775ca"
      />
      <path
        d="M1275 1158.33c0-145.83-87.5-195.83-262.5-216.66-125-16.67-150-50-150-108.34s41.67-95.83 125-95.83c75 0 116.67 25 137.5 87.5 4.17 12.5 16.67 20.83 29.17 20.83h66.66c16.67 0 29.17-12.5 29.17-29.16v-4.17c-16.67-91.67-91.67-162.5-187.5-170.83v-100c0-16.67-12.5-29.17-33.33-33.34h-62.5c-16.67 0-29.17 12.5-33.34 33.34v95.83c-125 16.67-204.16 100-204.16 204.17 0 137.5 83.33 191.66 258.33 212.5 116.67 20.83 154.17 45.83 154.17 112.5s-58.34 112.5-137.5 112.5c-108.34 0-145.84-45.84-158.34-108.34-4.16-16.66-16.66-25-29.16-25h-70.84c-16.66 0-29.16 12.5-29.16 29.17v4.17c16.66 104.16 83.33 179.16 220.83 200v100c0 16.66 12.5 29.16 33.33 33.33h62.5c16.67 0 29.17-12.5 33.34-33.33v-100c125-20.84 208.33-108.34 208.33-220.84z"
        fill="#fff"
      />
      <path
        d="M787.5 1595.83c-325-116.66-491.67-479.16-370.83-800 62.5-175 200-308.33 370.83-370.83 16.67-8.33 25-20.83 25-41.67V325c0-16.67-8.33-29.17-25-33.33-4.17 0-12.5 0-16.67 4.16-395.83 125-612.5 545.84-487.5 941.67 75 233.33 254.17 412.5 487.5 487.5 16.67 8.33 33.34 0 37.5-16.67 4.17-4.16 4.17-8.33 4.17-16.66v-58.34c0-12.5-12.5-29.16-25-37.5zM1229.17 295.83c-16.67-8.33-33.34 0-37.5 16.67-4.17 4.17-4.17 8.33-4.17 16.67v58.33c0 16.67 12.5 33.33 25 41.67 325 116.66 491.67 479.16 370.83 800-62.5 175-200 308.33-370.83 370.83-16.67 8.33-25 20.83-25 41.67V1700c0 16.67 8.33 29.17 25 33.33 4.17 0 12.5 0 16.67-4.16 395.83-125 612.5-545.84 487.5-941.67-75-237.5-258.34-416.67-487.5-491.67z"
        fill="#fff"
      />
    </svg>
  );
};

/// Assets
const IconETH = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24.002"
      viewBox="0 0 24 24.002"
      width="24"
    >
      <path d="m0 .003h24v24h-24z" fill="none" />
      <path
        d="m23.64 14.905a12 12 0 1 1 -8.74-14.545 12 12 0 0 1 8.74 14.545z"
        fill="#fff"
        transform="translate(0 -.001)"
      />
      <g transform="translate(6.858 3.628)">
        <path
          d="m383.612 0-.112.382v11.075l.112.112 5.141-3.039z"
          fill="#343434"
          transform="translate(-378.471)"
        />
        <path d="m5.141 0-5.141 8.53 5.141 3.039z" fill="#8c8c8c" />
        <path
          d="m387.3 727.927-.063.077v3.945l.063.185 5.144-7.245z"
          fill="#3c3c3b"
          transform="translate(-382.162 -715.385)"
        />
        <path
          d="m5.141 732.135v-4.207l-5.141-3.038z"
          fill="#8c8c8c"
          transform="translate(0 -715.385)"
        />
        <path
          d="m392.07 477.706 5.141-3.039-5.141-2.337z"
          fill="#141414"
          transform="translate(-386.929 -466.137)"
        />
        <path
          d="m0 474.667 5.141 3.039v-5.376z"
          fill="#393939"
          transform="translate(0 -466.137)"
        />
      </g>
    </svg>
  );
};

/// CONSTANTS
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const CONFIG = {
  testnet: {
    CHAIN_ID: 114,
    NETWORK_INFO: {
      blockExplorerUrls: ["https://coston2-explorer.flare.network//"],
      iconUrls: [
        "https://flare-explorer.flare.network/images/flare-120c821cf29e165c8d80f1ccfb076a37.svg?vsn=d",
      ],
      rpcUrls: ["https://coston2-api.flare.network/ext/bc/C/rpc"],
      chainId: "0x72",
      chainName: "Flare Testnet Coston2i",
      nativeCurrency: {
        name: "C2FLR",
        symbol: "C2FLR",
        decimals: 18,
      },
    },
  },
};

/// State
State.init({
  payAmount: "",
  payTokenData: undefined,
  leverage: 1.1,
  isLong: true,
  sender: undefined,
  balance: undefined,
  network: undefined,
  showSettings: false,
});
const {
  payAmount,
  payTokenData,
  leverage,
  isLong,
  sender,
  balance,
  network,
  showSettings,
} = state;

const price = ethers.utils.formatUnits(payTokenData || "0", 5);

console.log("price", price);
const currentConfig = CONFIG["testnet"];

const feeValue = leveragedValue && leveragedValue * 0.0014;
const feeValueDisplay =
  "-$" +
  Math.max(feeValue, 1.5).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// FETCH ABI
const abiResponse = fetch(
  "https://gist.githubusercontent.com/Markeljan/73299b201d5747a0f6bf89eb8b4b4af2/raw/3f2310a80104b8cfc6dbc4e575cb0e213e170f70/MULTIDEX_ABI.json"
);

const erc20Response = fetch(
  "https://gist.githubusercontent.com/Markeljan/f41987a09ba01048309c672e9101802c/raw/b92f08be7b0d7b9506784b911a921bf621105cb3/ERC20.json"
);

if (!erc20Response.ok) {
  return "Loading ERC20...";
}

if (!abiResponse.ok) {
  return "Loading ABI...";
}

const MULTIDEX_ABI = abiResponse.body;
const ERC_20_ABI = erc20Response.body;

// RECONNECT TO WALLET
if (sender === undefined) {
  State.update({ sender: Ethers.send("eth_requestAccounts", [])[0] });
}

// FETCH WALLET BALANCE
if (sender && balance === undefined) {
  Ethers.provider()
    .getBalance(sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(12) });
    });

  Ethers.provider()
    .getNetwork()
    .then((network) => {
      if (network.chainId === CONFIG.testnet.CHAIN_ID) {
        State.update({ network: "testnet" });
      } else {
        State.update({ network: "unsupported" });
      }
    });
}

const multidexContractAddress = "0x1A4ED2C40db8346C438bEcF99aC9d8512988240d";

const multidexContract =
  sender &&
  new ethers.Contract(
    multidexContractAddress,
    MULTIDEX_ABI,
    Ethers.provider().getSigner()
  );

// FETCH DATA
const flareOracleData =
  multidexContract &&
  multidexContract["getTokenPriceWei"]("testETH").then((res) => {
    // res is a promise i need res[0] it is in hex but I want to set State to it
    State.update({ payTokenData: res[0] });
  });

const ethTokenData = flareOracleData[0];

const primaryButtonText = "Swap";

// RECONNECT TO WALLET
if (sender === undefined) {
  State.update({ sender: Ethers.send("eth_requestAccounts", [])[0] });
}

// FETCH WALLET BALANCE
if (sender && balance === undefined) {
  Ethers.provider()
    .getBalance(sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(12) });
    });

  Ethers.provider()
    .getNetwork()
    .then((network) => {
      if (network.chainId === CONFIG.testnet.CHAIN_ID) {
        State.update({ network: "testnet" });
      } else {
        State.update({ network: "unsupported" });
      }
    });
}
const payAmountBigNumber = ethers.utils.parseEther(payAmount || "0");
/// FUNCTIONS

function swap() {
  multidexContract["swapTokenToToken"](
    // weth
    "0xDbCae8192036b8e52614899fd176F2804b01278C",
    // usdc
    "0xE38b9b20B5ff326AFA16284cA028cb5627B60722",
    //_tokensSold
    payAmountBigNumber,
    //priceGaurd
    0
  );
}

/// HANDLERS

function handleClickMax() {
  State.update({
    payAmount: (balance * 0.95).toFixed(4) || "0.0",
  });
}

function handleClickSwitchNetwork(network) {
  // try connecting if no sender
  if (!sender) {
    State.update({ sender: Ethers.send("eth_requestAccounts", [])[0] });
  }

  const chainId = CONFIG[network].CHAIN_ID;
  try {
    Ethers.send("wallet_switchEthereumChain", [{ chainId: chainId }]);
  } catch (e) {
    console.log("error switching network", e);
  }
  try {
    Ethers.send("wallet_addEthereumChain", [CONFIG[network].NETWORK_INFO]);
  } catch (e) {
    console.log("error adding new network", e);
  }
}

function handleChangePayAmount(e) {
  if (e.target.value === "." && !payAmount) {
    State.update({
      payAmount: "0.",
    });
  }
  if (isNaN(e.target.value)) {
    return;
  }

  State.update({
    payAmount: e.target.value,
  });
}

return (
  <DaisyUIWrapper>
    <div class="card max-w-2xl mx-auto bg-neutral text-white">
      <div class="px-4 pt-4">
        <div class="relative flex justify-center">
          {network && (
            <button
              class="btn btn-xs btn-outline absolute right-0 top-0"
              onClick={() => {
                State.update({ showSettings: !state.showSettings });
              }}
            >
              {network === "unsupported" ? "Unsupported network" : network}
            </button>
          )}

          {/* settings menu */}
          {state.showSettings && (
            <div class="absolute right-0 top-8 bg-gray-900 rounded p-3">
              <div class="flex flex-col gap-2">
                <button
                  class={`btn btn-xs btn-outline${
                    network === "testnet" ? " bg-red-700" : ""
                  }`}
                  onClick={() => {
                    network === "testnet"
                      ? State.update({ showSettings: false })
                      : handleClickSwitchNetwork("testnet");
                  }}
                >
                  Testnet
                </button>
              </div>
            </div>
          )}
        </div>

        <label class="label">
          <span class="label-text text-3xl">secureDEX</span>
        </label>

        <label class="label">
          <p class="label-text text-gray-500">Oracle Guarded Swaps with API3</p>
          <p class="label-text text-2xl">${price}</p>
        </label>

        <div class="bg-blue-900 rounded p-2 mb-2">
          <label class="label pl-4">
            <span class="label-text text-gray-500">Pay{payValueDisplay}</span>
            <span class="label-text text-gray-500">
              Balance:
              <span class="text-white">{Number(balance || 0).toFixed(4)}</span>
            </span>
          </label>
          <div class="flex">
            <input
              class="input w-full bg-slate-900 text-2xl focus:outline-none"
              onChange={(e) => handleChangePayAmount(e)}
              value={payAmount}
              placeholder="0.0"
            />
            <div class="flex items-center space-x-1">
              {balance > 0 && (
                <button
                  class="btn btn-sm border-none font-normal rounded-1 px-2 mx-1 bg-red-300 hover:bg-red-300 focus:bg-red-200"
                  onClick={() => payAmount !== balance && handleClickMax()}
                >
                  MAX
                </button>
              )}
              <IconETH />
              <select
                disabled
                class="select-ghost rounded-lg bg-blue-400 text-2xl"
              >
                <option disabled selected>
                  WETH
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="bg-blue-900 rounded p-2">
          <label class="label pl-4 pr-2">
            <span class="label-text text-gray-500">
              Receive
              {`$${price * payAmount}`}
            </span>
            <span class="label-text">
              <span class="text-gray-500">Leverage: </span>
              {leverage.toFixed(2)}x
            </span>
          </label>
          <div class="flex">
            <input
              class="input w-full bg-slate-900 text-2xl focus:outline-none"
              value={payAmount * price}
              placeholder="0.0"
            />
            <div class="flex items-center space-x-1">
              <USDCIcon />
              <select
                disabled
                class="select-ghost rounded-lg bg-blue-400 text-2xl"
              >
                <option disabled selected>
                  USDC
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="px-4 pb-4">
        {sender ? (
          <button
            class={`btn w-full bg-red-200 hover:bg-red-300 focus:bg-green-500 mt-2`}
            onClick={() => swap()}
          >
            {primaryButtonText}
          </button>
        ) : (
          <button
            disabled={sender && payAmount <= 0}
            class="relative btn w-full bg-green-700 hover:bg-green-300 focus:bg-indigo-500 mt-2"
          >
            Connect Wallet
            <Web3Connect
              className="opacity-0 absolute w-full h-full"
              connectLabel="Connect with Web3"
            />
          </button>
        )}
      </div>
    </div>
  </DaisyUIWrapper>
);
