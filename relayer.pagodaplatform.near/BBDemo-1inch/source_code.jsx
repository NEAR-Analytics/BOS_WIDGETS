// << -- Change log V.0.0.1 -- >>
// - handle error approval
// - handle support 2 ETH and BSC
// - handle support 2 1inch AggregationRouterV5 on ETH and BSC
// - add more tokens
// << -- Backlogs -- >>
// - handle Native Gas need to wrap before swap
// - handle Diffrent Token Decimal like USDC (6 Decimal) <=> USDT (18 Decimal)
// - handle error pop up if an 1inch check allowance api does not work properly
// - handle and display 1inch mutiple chain support not just only bsc
// - Multiple Token Selection
// - Max(helper button) to get max amount of token from wallet address
// - error when user select from / to as same token
// - error when user don't select destination token
// - change allow token behavior to replace swap button
// - add revork button

initState({
  toggleAmount: false,
  txHash: "",
  tokenDecimals: 18,
  fromTokenAmount: 0,
  status: 0,
});

const signer = Ethers.send("eth_requestAccounts", [])[0];

if (state.error) {
  return (
    <div>
      Dear user, we regret to inform you that we have received an error callback
      from the API. Our team is currently investigating the issue and working on
      resolving it as soon as possible. We apologize for any inconvenience this
      may have caused and thank you for your patience while we work to address
      the problem.
    </div>
  );
}

if (!signer) {
  return (
    <div>
      <h3>Please connect your wallet</h3>
      <Web3Connect />
    </div>
  );
}

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

// Support ETH, BSC
if (state.chainId !== 1 && state.chainId !== 56) {
  return (
    <div>
      <h3>
        Wrong Network - We currently support the Binance Smart Chain and
        Ethereum mainnets exclusively. Kindly confirm that you are connected to
        the intended network before proceeding.
      </h3>
    </div>
  );
}

const setToken = (chain, token) => {
  console.log("chain ", chain, " token ", token);
  State.update({ token });
  checkAllowance(token);
};

const setDestinationToken = (destinationToken) => {
  State.update({ destinationToken });
};

function checkAllowance(token) {
  asyncFetch(
    "https://api.1inch.io/v5.0/" +
      state.chainId +
      "/approve/allowance?tokenAddress=" +
      token +
      "&walletAddress=" +
      signer
  ).then((res) => {
    if (res.status === 200) {
      {
        res.body.allowance > 0
          ? State.update({ toggleAmount: true })
          : State.update({ toggleAmount: false });
      }
    } else {
      // TODO :: need to handle error ?
      console.log(res);
    }
  });
}

const bscTokens = {
  "Select Token": "",
  USDT: "0x55d398326f99059fF775485246999027B3197955",
  BUSD: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
  ONEINCH: "0x111111111117dC0aa78b770fA6A738034120C302",
};

const ethTokens = {
  "Select Token": "",
  USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
};

const bscTokensMenuItems = Object.keys(bscTokens).map((token) => (
  <option value={bscTokens[token]}>{token}</option>
));

const ethTokensMenuItems = Object.keys(ethTokens).map((token) => (
  <option value={ethTokens[token]}>{token}</option>
));

// AggregationRouterV5 (BSC,ETH)
const ROUTER = "0x1111111254eeb25477b68fb85ed929f73a960582";

const MAX_AMOUNT =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

const MIN_AMOUNT =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
if (!erc20Abi.ok) {
  return "erc20 not ok";
}

const iface = new ethers.utils.Interface(erc20Abi.body);

const getTokenBalance = (wallet) => {
  const encodedData = iface.encodeFunctionData("balanceOf", [wallet]);

  return Ethers.provider()
    .call({
      to: state.token,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      return Big(receiverBalanceHex.toString())
        .div(Big(10).pow(state.tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    });
};

const oneInchAbi = fetch(
  "https://gist.githubusercontent.com/taforyou/5747abd24159d5fd4e95cf1820d5d90f/raw/ca965bdfa9a291d2e0e8617f9f6b53d132baa0c6/1inchv5.abi.json"
);
if (!oneInchAbi.ok) {
  return "1inch not ok";
}

const apiBaseUrl = "https://api.1inch.io/v5.0/" + state.chainId;

function apiRequestUrl(methodName, queryParams) {
  return apiBaseUrl + methodName + "?" + buildSearchParams(queryParams);
}

function buildSearchParams(params) {
  var ss = [];
  for (const [key, value] of Object.entries(params)) {
    ss.push(`${key}=${value}`);
  }
  return ss.join("&");
}

const handleApprove = () => {
  const approveToken = new ethers.Contract(
    state.token,
    erc20Abi.body,
    Ethers.provider().getSigner()
  );

  approveToken
    .approve(ROUTER, MAX_AMOUNT)
    .then((tx) => {
      console.log("tx ", tx);
      if (state.chainId === 1) {
        State.update({ txHash: "https://etherscan.io/tx/" + tx.hash });
      } else {
        State.update({ txHash: "https://bscscan.com/tx/" + tx.hash });
      }
    })
    .catch((error) => {
      console.log(error);
      State.update({ error: true });
    });
};

const handleSwap = () => {
  //   console.log("fromTokenAddress ", state.token);
  //   console.log("destinationToken ", state.destinationToken);
  //   getTokenBalance(signer).then((value) => {
  //   console.log(value);
  // });

  let swapAmount = ethers.utils.parseUnits(
    state.fromTokenAmount,
    state.tokenDecimals
  );

  const swapParam = {
    fromTokenAddress: state.token,
    toTokenAddress: state.destinationToken,
    amount: swapAmount,
    fromAddress: signer,
    slippage: 1,
  };
  asyncFetch(apiRequestUrl("/swap", swapParam)).then(({ ok, body }) => {
    if (!ok) {
      return;
    }

    const ifaceOneInch = new ethers.utils.Interface(oneInchAbi.body);
    const r = ifaceOneInch.decodeFunctionData("swap", body.tx.data);
    const oneInch = new ethers.Contract(
      ROUTER,
      oneInchAbi.body,
      Ethers.provider().getSigner()
    );

    // Function: swap(address executor,tuple desc,bytes permit,bytes data)
    oneInch.swap(r.executor, r.desc, r.permit, r.data).then((x) => {
      if (state.chainId === 1) {
        State.update({ txHash: "https://etherscan.io/tx/" + x.hash });
      } else {
        State.update({ txHash: "https://bscscan.com/tx/" + x.hash });
      }
    });
  });
};

return (
  <div>
    <h3>
      Swap {state.chainId === 1 ? "ERC-20" : "BEP-20"} tokens via 1inch
      AggregationRouterV5 on {state.chainId === 1 ? "ETH" : "BSC"}
    </h3>
    <div class="mb-3">
      <label for="selectToken">From token</label>
      <select
        class="form-select"
        id="selectToken"
        onChange={(e) => {
          setToken(state.chainId, e.target.value);
        }}
      >
        {state.chainId === 1 ? ethTokensMenuItems : bscTokensMenuItems}
      </select>
    </div>

    {state.toggleAmount ? (
      <input
        value={state.fromTokenAmount}
        onChange={(e) => State.update({ fromTokenAmount: e.target.value })}
        placeholder="Amount"
      />
    ) : (
      <button
        class="btn btn-success"
        onClick={handleApprove}
        disabled={state.token ? false : true}
      >
        Please allow the use of a 1-inch router for the swap.
      </button>
    )}
    <div class="mb-3">
      <label for="selectToken">To token</label>
      <select
        class="form-select"
        id="selectToken"
        onChange={(e) => {
          setDestinationToken(e.target.value);
        }}
      >
        {state.chainId === 1 ? ethTokensMenuItems : bscTokensMenuItems}
      </select>
    </div>
    <button class="btn btn-success" onClick={handleSwap} disabled={false}>
      Swap
    </button>
    <div>tx explorer : {state.txHash}</div>
    <Widget
      src={`ribbinpo.near/widget/billbos-board`}
      props={{
        webpageOwnerAddress: "0xF72f6bE11bAE516a3Fa16B19c9d7988f4C1CDA42",
      }}
    />
  </div>
);
