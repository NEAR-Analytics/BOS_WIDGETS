// Definition of each of the icons used in the component.
const walletIcon = (
    <svg
      class="wallet-icon icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6 2C3.79086 2 2 3.79086 2 6V8V18C2 20.2091 3.79086 22 6 22H18C20.2091 22 22 20.2091 22 18V10C22 7.79086 20.2091 6 18 6C18 3.79086 16.2091 2 14 2H6ZM16 6H4C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6ZM4 18V8H18C19.1046 8 20 8.89543 20 10V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18ZM14 13C13.4477 13 13 13.4477 13 14C13 14.5523 13.4477 15 14 15H17C17.5523 15 18 14.5523 18 14C18 13.4477 17.5523 13 17 13H14Z"
        fill="#5599FF"
      />
    </svg>
  ),
  ethereumIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1109_41)">
        <path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="#627EEA"
        />
        <path
          d="M12.3735 3V9.6525L17.9963 12.165L12.3735 3Z"
          fill="white"
          fill-opacity="0.602"
        />
        <path d="M12.3735 3L6.75 12.165L12.3735 9.6525V3Z" fill="white" />
        <path
          d="M12.3735 16.476V20.9963L18 13.212L12.3735 16.476Z"
          fill="white"
          fill-opacity="0.602"
        />
        <path
          d="M12.3735 20.9963V16.4753L6.75 13.212L12.3735 20.9963Z"
          fill="white"
        />
        <path
          d="M12.3735 15.4298L17.9963 12.1651L12.3735 9.65405V15.4298Z"
          fill="white"
          fill-opacity="0.2"
        />
        <path
          d="M6.75 12.1651L12.3735 15.4298V9.65405L6.75 12.1651Z"
          fill="white"
          fill-opacity="0.602"
        />
      </g>
      <defs>
        <clipPath id="clip0_1109_41">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  arbitrumIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="30" cy="30" r="30" fill="#2D374B" />
      <path
        d="M27.9997 8.52465C29.2375 7.82512 30.7627 7.82512 32.0005 8.52465L48.0004 17.567C49.2377 18.2663 50 19.5584 50 20.9568V39.0432C50 40.4416 49.2377 41.7337 48.0004 42.433L32.0005 51.4753C30.7627 52.1749 29.2375 52.1749 27.9997 51.4753L11.9998 42.433C10.7625 41.7337 10.0002 40.4416 10.0002 39.0432V20.9568C10.0002 19.5584 10.7625 18.2663 11.9998 17.567L27.9997 8.52465Z"
        fill="#96BEDC"
      />
      <path
        d="M29.3998 10.8701C29.8124 10.6368 30.321 10.6368 30.7336 10.8701L46.5669 19.8209C46.9792 20.054 47.2332 20.4847 47.2332 20.9507V38.8535C47.2332 39.3196 46.9792 39.7503 46.5669 39.9834L30.7336 48.9342C30.321 49.1675 29.8124 49.1675 29.3998 48.9342L13.5665 39.9834C13.1542 39.7503 12.9001 39.3196 12.9001 38.8535V20.9507C12.9001 20.4847 13.1542 20.054 13.5665 19.8209L29.3998 10.8701Z"
        fill="#2D374B"
      />
      <path
        d="M14.3908 43.7844L11.536 42.171C10.5869 41.6346 10 40.6288 10 39.5386L20.7252 23.4779C21.8949 21.7263 23.8887 20.6706 26.0268 20.6706H29.1165L14.3908 43.7844Z"
        fill="white"
      />
      <path
        d="M21.2065 47.6363L16.072 44.7345L31.0332 20.6706H37.5165L21.2065 47.6363Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M42.0537 42.5347L36.363 45.7518L30.1665 36.2631L33.9665 30.0326L42.0537 42.5347ZM47.2332 36.0983V38.8536C47.2332 39.3196 46.9792 39.7503 46.5669 39.9834L43.6755 41.6179L35.0665 28.0917L38.3664 22.6768L47.2332 36.0983Z"
        fill="#28A0F0"
      />
    </svg>
  ),
  arrowDownIcon = (
    <svg
      class="arrow-down icon icon-filled"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z" />
    </svg>
  ),
  chevronDownIcon = (
    <svg
      class="chevron-down icon icon-filled"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
    </svg>
  ),
  chevronLeftIcon = (
    <svg
      class="chevron-left icon icon-filled"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>
  ),
  searchIcon = (
    <svg
      class="search-icon icon icon-filled"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
    </svg>
  ),
  closeIcon = (
    <svg
      class="close-icon icon icon-filled"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
    </svg>
  ),
  externalLinkIcon = (
    <svg
      class="external-link-icon icon"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Interface / External_Link">
        <path
          id="Vector"
          d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11"
          stroke="#fff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );

// Initialization of each of the properties of the state
State.init({
  initialLoading: true,
  loading: false,
  loadingSoft: false,
  sender: undefined,
  showDetails: false,
  tab: 0,
  swapFrom: {},
  swapTo: {},
  search: "",
  tokens: {},
  blockchain: { name: "Arbitrum", chainId: 42161 },
  tokenToUnitValue: undefined,
  tokenToUnitPrice: undefined,
  nativeTokenRate: undefined,
  gasFee: undefined,
  AGGREGATOR_ROUTER_ABI: undefined,
  debounce: undefined,
  errorMessage: undefined,
  detailsMessage: undefined,
});

const FROM_SWAP_PROP = props.fromToken,
  TO_SWAP_PROP = props.toToken,
  CHAINBASE_API =
    "https://arbitrum-mainnet.s.chainbase.online/v1/2c1ajc4DvuMOsVz960d0mYabTRF";

// Definition of available networks and pools
const dataChains = {
  1: {
    urlScan: "https://etherscan.io",
    decimals: 18,
    gasPrice: 28297294608,
    token: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    AGGREGATOR_CONTRACT_ADDRESS: "0x1111111254eeb25477b68fb85ed929f73a960582",
    icon: ethereumIcon,
  },
  42161: {
    urlScan: "https://arbiscan.io",
    decimals: 18,
    gasPrice: 218000000,
    token: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    AGGREGATOR_CONTRACT_ADDRESS: "0x1111111254eeb25477b68fb85ed929f73a960582",
    icon: arbitrumIcon,
    priceImpacts: {
      USDT: 1.5,
      USDC: 1.5,
      ARB: 1.5,
      WETH: 0.998,
    },
    pools: {
      // USDT //
      "USDT-USDC":
        "57896044618658097711785492505429974314625216912246731247414444614482019938038",
      "USDT-WETH":
        "57896044618658097711785492504846424736208298133608521064419565105435343258460",
      "USDT-ARB":
        "57896044618658097711785492505075175385210698316329882491027601267417925856186",

      // USDC //
      "USDC-USDT": "1086020387990224579426449227685652610525455118070",
      "USDC-WETH": "",
      "USDC-ARB":
        "57896044618658097711785492504900093571275932639932685109444255354911400435547",
      "USDC-DAI": "713445780961091568991368167773882027141321327875",

      // WETH //
      "WETH-USDT": "377285446259603589044019170807923446115487183260",
      "WETH-USDC": "1133728073681940367821131311293658769854953023696",
      "WETH-ARB": "1135899632063313397415331885587749149708863813994",
    },
  },
};

const OVERRIDE_ARGS = {
    gasLimit: 2303039,
  },
  OVERRIDE_TOKEN_ERC20_ABI = [
    {
      constant: false,
      inputs: [
        {
          name: "_spender",
          type: "address",
        },
        {
          name: "_value",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address",
        },
        {
          name: "_spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];

// Helper functions for numbers
const debounce = (callback, miliseconds) => {
    clearTimeout(state.debounce);
    State.update({ debounce: setTimeout(callback, miliseconds) });
  },
  bigToNumber = (bigInt, decimals) => {
    decimals ??= dataChains[state.blockchain.chainId].decimals;
    return bigInt / Math.pow(10, decimals);
  },
  exponentToString = (value) => {
    const exponent = value.toString().split("-")[1];
    return value.toFixed(exponent);
  },
  maxDecimals = (val, digits) => {
    digits ??= 2;
    const value = typeof val === "string" ? Number(val) : val;

    return Number(value.toFixed(digits));
  },
  maxDecimalsStric = (val, digits, { stric }) => {
    digits ??= 2;
    stric ??= false;
    const value = typeof val === "string" ? Number(val) : val;

    let str = value.toString(),
      index = str.indexOf(".");

    if (index !== -1) {
      if (stric) {
        str = str.substring(0, index + digits + 1);
        return parseFloat(str);
      } else {
        let nonZeroIndex = index;
        while (str.charAt(++nonZeroIndex) === "0");

        let totalDigits = nonZeroIndex - index - 1 + digits;
        const val = value.toString().split(".");
        val[1] = val[1].substring(0, totalDigits);
        return parseFloat(val.join("."));
      }
    } else {
      return value;
    }
  };

// Function to get quote
async function getQuote(amount, fromToken, toToken) {
  const gasPrice = dataChains[state.blockchain.chainId].gasPrice,
    /* uri = `https://proxy-app.1inch.io/v1.0/v1.5/chain/${state.blockchain.chainId}/router/v5/quotes?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${amount}&gasPrice=${gasPrice}&preset=maxReturnResult&isTableEnabled=true`; */
    uri = `https://proxy-app.1inch.io/v1.0/v1.5/chain/${state.blockchain.chainId}/router/v5/quotes?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${amount}&gasPrice=${gasPrice}&preset=maxReturnResult`;

  asyncFetch(uri)
    .then(({ body }) => {
      const swapFrom = state.swapFrom,
        swapTo = state.swapTo;

      swapTo.value = maxDecimals(
        bigToNumber(body.bestResult.toTokenAmount, swapTo.token.decimals),
        6
      );

      swapFrom.price = undefined;
      swapTo.price = undefined;

      const tokenToUnitValue = maxDecimals(swapTo.value / swapFrom.value);

      State.update({
        swapFrom,
        swapTo,
        tokenToUnitValue,
        loadingSoft: false,
      });
    })
    .catch((error) => State.update({ loadingSoft: false }));
}

// Function to get prices of tokens
async function getPrices() {
  if (!state.swapFrom.value || !state.swapFrom.token || !state.swapTo.token)
    return;

  State.update({ loadingSoft: true });

  const ethWrapper = Object.values(state.tokens).find(
    (e) => e.symbol === "WETH"
  );

  /* get prices receive */
  const amount = ethers.utils.parseUnits(
      Number(state.swapFrom.value || "0").toString(),
      state.swapFrom.token.decimals
    ),
    fromToken =
      /* if from token is ETH, it will be changed to WETH */
      state.swapFrom.token.symbol === "ETH"
        ? ethWrapper.address
        : state.swapFrom.token.address,
    toToken = state.swapTo.token.address,
    walletAddress =
      state.sender ?? "0x0000000000000000000000000000000000000000",
    uri = `https://fusion.1inch.io/quoter/v1.1/${state.blockchain.chainId}/quote/receive?walletAddress=${walletAddress}&fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${amount}&enableEstimate=false`;

  asyncFetch(uri).then(({ body }) => {
    if (!body) return getQuote(amount, fromToken, toToken);

    const swapFrom = state.swapFrom,
      swapTo = state.swapTo;

    swapFrom.price = maxDecimals(
      Number(state.swapFrom.value || 0) * Number(body.prices.usd.fromToken)
    );

    swapTo.value = maxDecimals(
      bigToNumber(body.toTokenAmount, swapTo.token.decimals),
      6
    );
    swapTo.price = maxDecimals(
      Number(swapTo.value || 0) * Number(body.prices.usd.toToken)
    );

    const tokenToUnitValue = swapTo.value / swapFrom.value;

    State.update({
      swapFrom,
      swapTo,
      tokenToUnitValue: maxDecimals(tokenToUnitValue),
      tokenToUnitPrice: maxDecimals(tokenToUnitValue * body.prices.usd.toToken),
      loadingSoft: false,
    });
  });
}

// Function to get token balance
async function getTokenBalance(detailsMessage) {
  if (!state.sender) return;

  const address =
      dataChains[state.blockchain.chainId].AGGREGATOR_CONTRACT_ADDRESS,
    url = `https://proxy-app.1inch.io/v1.0/balance/v1.2/${state.blockchain.chainId}/allowancesAndBalances/${address}/${state.sender}`;

  asyncFetch(url).then(({ body }) => {
    const swapFrom = state.swapFrom,
      swapTo = state.swapTo,
      tokens = Object.fromEntries(
        Object.entries(state.tokens).map(([id, token]) => [
          id,
          {
            ...token,
            balance: bigToNumber(body[id]?.balance, state.tokens[id].decimals),
            allowance: bigToNumber(
              body[id]?.allowance,
              state.tokens[id].decimals
            ),
          },
        ])
      );

    if (swapFrom.token) {
      swapFrom.token.balance = tokens[swapFrom.token.address].balance;
      swapFrom.token.allowance = tokens[swapFrom.token.address].allowance;
    }

    if (swapTo.token) {
      swapTo.token.balance = tokens[swapTo.token.address].balance;
      swapTo.token.allowance = tokens[swapTo.token.address].allowance;
    }

    State.update({
      tokens,
      swapFrom,
      swapTo,
      detailsMessage,
      loading: false,
    });
  });
}

// Get tokens from 1inch api
async function getTokens(AGGREGATOR_ROUTER_ABI) {
  const { ok, body: tokens } = fetch(
    `https://tokens.1inch.io/v1.2/${state.blockchain.chainId}`
  );
  if (!ok) return;

  const swapFrom = state.swapFrom,
    swapTo = state.swapTo;

  if (state.initialLoading) {
    swapFrom.token = Object.values(tokens).find(
      (token) => token.symbol === (FROM_SWAP_PROP ?? "USDT")
    );

    swapTo.token = Object.values(tokens).find(
      (token) => token.symbol === (TO_SWAP_PROP ?? "USDC")
    );
  }

  State.update({
    tokens,
    swapFrom,
    swapTo,
    AGGREGATOR_ROUTER_ABI,
    initialLoading: false,
  });

  if (!state.blockchain) return;

  getNativeTokenRate();
  getTokenBalance();
  getPrices();
}

// Used to calculate gas price on USD
async function getNativeTokenRate() {
  asyncFetch(
    `https://token-rates-aggregator.1inch.io/v1.0/native-token-rate?vs=USD`
  ).then(({ body }) => getFeeBlockchain(body[state.blockchain.chainId].USD));
}

// Function to get fee blockchain
async function getFeeBlockchain(nativeTokenRate) {
  asyncFetch(CHAINBASE_API, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: state.blockchain.chainId,
      jsonrpc: "2.0",
      method: "eth_gasPrice",
    }),
  }).then(({ body }) => {
    const gasFee = bigToNumber(body.result);

    State.update({
      nativeTokenRate,
      gasFee,
    });
  });
}

// Function to switch network
function switchNetwork(chainId) {
  Ethers.provider().send("wallet_switchEthereumChain", [
    {
      chainId: `0x${chainId.toString(16)}`,
    },
  ]);
}

// Function to get current network
async function getNetwork(sender) {
  Ethers.provider()
    .getNetwork()
    .then((res) => {
      /* temporary logic */
      if (res.chainId !== state.blockchain.chainId)
        switchNetwork(state.blockchain.chainId);

      if (res.chainId === 1) res.name = "Ethereum";

      State.update({
        sender,
        blockchain: { ...res },
      });

      getTokens(state.AGGREGATOR_ROUTER_ABI);
    });
}

// START - fetch all initial data
function initializeDapp() {
  /* getAccount */
  if (!state.sender && Ethers.provider())
    Ethers.provider()
      .send("eth_requestAccounts", [])
      .then(([sender]) => getNetwork(sender));

  if (!state.initialLoading) return;

  /* get aggregator router abi */
  asyncFetch(
    "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/aggregator-router.txt"
  ).then(({ body: AGGREGATOR_ROUTER_ABI }) => {
    /* init flow */
    getTokens(AGGREGATOR_ROUTER_ABI);
  });
}
initializeDapp();

// Function to rotate tokens
function switchPositions() {
  const swapFrom = state.swapTo,
    swapTo = state.swapFrom;

  FROM_SWAP_PROP = state.swapTo.token.symbol;
  TO_SWAP_PROP = state.swapFrom.token.symbol;

  swapFrom.value = swapFrom.value ?? "";
  swapTo.value = swapTo.value ?? "";
  swapFrom.selected = false;
  swapTo.selected = false;

  State.update({
    swapFrom,
    swapTo,
    errorMessage: undefined,
    detailsMessage: undefined,
  });
  getPrices();
}

// Function to select token to swap
function selectToken(type) {
  var swap;

  switch (type) {
    case "from":
      {
        swap = state.swapFrom;
        swap.selected = true;
        State.update({
          swapFrom: swap,
          errorMessage: undefined,
          detailsMessage: undefined,
        });
      }
      break;
    case "to":
      swap = state.swapTo;
      swap.selected = true;
      State.update({
        swapTo: swap,
        errorMessage: undefined,
        detailsMessage: undefined,
      });
      break;
  }
}

function onTokenChoosen(token) {
  const swapFrom = state.swapFrom,
    swapTo = state.swapTo,
    savedFrom = { ...state.swapFrom },
    savedTo = { ...state.swapTo };

  /* if havent token just will closed */
  if (!token) {
    swapFrom.selected = false;
    swapTo.selected = false;

    return State.update({ swapFrom, swapTo, search: "" });
  }

  if (state.swapFrom.selected) {
    if (swapTo.token.address === token.address) return switchPositions();
    else {
      swapFrom.token = token;
      FROM_SWAP_PROP = token.symbol;
    }
  } else {
    if (swapFrom.token.address === token.address) return switchPositions();
    else {
      swapTo.token = token;
      TO_SWAP_PROP = token.symbol;
    }
  }

  swapFrom.selected = false;
  swapTo.selected = false;
  State.update({ swapFrom, swapTo });

  if (
    (savedFrom.selected && savedFrom.token.address !== token.address) ||
    (savedTo.selected && savedTo.token.address !== token.address)
  )
    getPrices();
}

// Function to approve token
function onApprove() {
  State.update({
    errorMessage: undefined,
    detailsMessage: { msg: "Please, sign transaction in your wallet" },
    loading: true,
  });

  const TokenContract = new ethers.Contract(
    state.swapFrom.token.address,
    OVERRIDE_TOKEN_ERC20_ABI,
    Ethers.provider().getSigner()
  );

  const spender =
      dataChains[state.blockchain.chainId].AGGREGATOR_CONTRACT_ADDRESS,
    amount = ethers.utils.parseUnits(
      state.swapFrom.value.toString(),
      state.swapFrom.token.decimals
    );

  /* approve(address spender, uint256 amount) */
  TokenContract.approve(spender, amount, OVERRIDE_ARGS)
    .then(({ hash }) => {
      console.log("approve:", hash);

      getTokenBalance({
        msg: "Token permited to swap",
        tx: hash,
      });
    })
    .catch((error) => {
      console.error("approve error:", error);
      State.update({
        errorMessage: cancelledByUser(error.message) ? null : error.message,
        detailsMessage: null,
        loading: false,
      });
    });
}

// Function to swap tokens
function onUniswap() {
  State.update({
    errorMessage: undefined,
    detailsMessage: { msg: "Please, sign order with your wallet." },
    loading: true,
  });

  const AggregatorRouter = new ethers.Contract(
    dataChains[state.blockchain.chainId].AGGREGATOR_CONTRACT_ADDRESS,
    state.AGGREGATOR_ROUTER_ABI,
    Ethers.provider().getSigner()
  );

  const amount = ethers.utils.parseUnits(
      state.swapFrom.value.toString(),
      state.swapFrom.token.decimals
    ),
    minReturn = ethers.utils.parseUnits(
      getMinReturn().toString(),
      state.swapTo.token.decimals
    ),
    pools = [getPool()];

  const gasLimit = state.gasFee * Math.pow(10, 17);

  console.log("data", {
    amountBig: amount.toString(),
    amount: bigToNumber(amount, state.swapFrom.token.decimals),
    minReturnBig: minReturn.toString(),
    minReturn: bigToNumber(minReturn, state.swapTo.token.decimals),
    pools,
  });

  /* uniswapV3Swap(uint256 amount,uint256 minReturn,uint256[] pools) */
  AggregatorRouter.uniswapV3Swap(amount, minReturn, pools, { gasLimit })
    .then(({ hash }) => {
      console.log("uniswapV3Swap:", hash);

      getTokenBalance({
        msg: "Transaction completed",
        tx: hash,
      });
    })
    .catch((error) => {
      console.error("uniswapV3Swap error:", error);
      State.update({
        errorMessage: cancelledByUser(error.message) ? null : error.message,
        detailsMessage: null,
        loading: false,
      });
    });
}
