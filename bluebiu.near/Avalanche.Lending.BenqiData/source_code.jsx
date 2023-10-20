const markets = {
  // "0x5C0401e81Bc07Ca70fAD469b451682c0d747Ef1c": {
  //   underlyingToken: {
  //     address: "native",
  //     decimals: 18,
  //     symbol: "AVAX",
  //   },
  //   decimals: 8,
  //   symbol: "qiAVAX",
  //   address: "0x5C0401e81Bc07Ca70fAD469b451682c0d747Ef1c",
  //   icon: "https://ipfs.near.social/ipfs/bafkreiaxodsgromeeaihu44fazsxdopkrqvinqzhyfxvx5mrbcmduqdfpq",
  // },
  "0xe194c4c5aC32a3C9ffDb358d9Bfd523a0B6d1568": {
    underlyingToken: {
      address: "0x50b7545627a5162F82A992c33b87aDc75187B218",
      decimals: 8,
      symbol: "WBTC.e",
    },
    decimals: 8,
    symbol: "qiBTC",
    address: "0xe194c4c5aC32a3C9ffDb358d9Bfd523a0B6d1568",
    icon: "https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q",
  },
  "0x334AD834Cd4481BB02d09615E7c11a00579A7909": {
    underlyingToken: {
      address: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
      decimals: 18,
      symbol: "WETH.e",
    },
    decimals: 8,
    symbol: "qiETH",
    address: "0x334AD834Cd4481BB02d09615E7c11a00579A7909",
    icon: "https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq",
  },
  "0xc9e5999b8e75C3fEB117F6f73E664b9f3C8ca65C": {
    underlyingToken: {
      address: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
      decimals: 6,
      symbol: "USDT.e",
    },
    decimals: 8,
    symbol: "qiUSDT",
    address: "0xc9e5999b8e75C3fEB117F6f73E664b9f3C8ca65C",
    icon: "https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i",
  },
  "0x4e9f683A27a6BdAD3FC2764003759277e93696e6": {
    underlyingToken: {
      address: "0x5947BB275c521040051D82396192181b413227A3",
      decimals: 18,
      symbol: "LINK.e",
    },
    decimals: 8,
    symbol: "qiLINK",
    address: "0x4e9f683A27a6BdAD3FC2764003759277e93696e6",
    icon: "https://ipfs.near.social/ipfs/bafkreidrq7qk3d6epwaxobq4gk7yowljr5tnslxwrsbd7vnw3srkt7ok3u",
  },
  "0x835866d37AFB8CB8F8334dCCdaf66cf01832Ff5D": {
    underlyingToken: {
      address: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
      decimals: 18,
      symbol: "DAI.e",
    },
    decimals: 8,
    symbol: "qiDAI",
    address: "0x835866d37AFB8CB8F8334dCCdaf66cf01832Ff5D",
    icon: "https://ipfs.near.social/ipfs/bafkreieuxntkdzi2mzkzdcbk6kahwxqpftxnipxcwc4oe4p4jm2rhj2xhu",
  },
  "0xBEb5d47A3f720Ec0a390d04b4d41ED7d9688bC7F": {
    underlyingToken: {
      address: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
      decimals: 6,
      symbol: "USDC.e",
    },
    decimals: 8,
    symbol: "qiUSDC",
    address: "0xBEb5d47A3f720Ec0a390d04b4d41ED7d9688bC7F",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },
  "0xB715808a78F6041E46d61Cb123C9B4A27056AE9C": {
    underlyingToken: {
      address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
      decimals: 6,
      symbol: "USDC",
    },
    decimals: 8,
    symbol: "qiUSDCn",
    address: "0xB715808a78F6041E46d61Cb123C9B4A27056AE9C",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },
  "0xd8fcDa6ec4Bdc547C0827B8804e89aCd817d56EF": {
    underlyingToken: {
      address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
      decimals: 6,
      symbol: "USDt",
    },
    decimals: 8,
    symbol: "qiUSDTn",
    address: "0xd8fcDa6ec4Bdc547C0827B8804e89aCd817d56EF",
    icon: "https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i",
  },
  "0xF362feA9659cf036792c9cb02f8ff8198E21B4cB": {
    underlyingToken: {
      address: "0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE",
      decimals: 18,
      symbol: "sAVAX",
    },
    decimals: 8,
    symbol: "qisAVAX",
    address: "0xF362feA9659cf036792c9cb02f8ff8198E21B4cB",
    icon: "https://ipfs.near.social/ipfs/bafkreia2hefekktykcred4hdkfduh62aeygtdn3r3qzj3ox53val6laosy",
  },
  "0x89a415b3D20098E6A6C8f7a59001C67BD3129821": {
    underlyingToken: {
      address: "0x152b9d0FdC40C096757F570A51E494bd4b943E50",
      decimals: 8,
      symbol: "BTC.b",
    },
    decimals: 8,
    symbol: "qiBTC.b",
    address: "0x89a415b3D20098E6A6C8f7a59001C67BD3129821",
    icon: "https://ipfs.near.social/ipfs/bafkreig2h2vpf7u7ukbgomgurcvvfyujl66qdrbsp6u2bcga3wdyxladii",
  },
};
const MULTICALL_ABI = [
  {
    inputs: [
      { internalType: "bool", name: "requireSuccess", type: "bool" },
      {
        components: [
          { internalType: "address", name: "target", type: "address" },
          { internalType: "bytes", name: "callData", type: "bytes" },
        ],
        internalType: "struct Multicall2.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "tryAggregate",
    outputs: [
      {
        components: [
          { internalType: "bool", name: "success", type: "bool" },
          { internalType: "bytes", name: "returnData", type: "bytes" },
        ],
        internalType: "struct Multicall2.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const OTOKEN_ABI = [
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalBorrows",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "exchangeRateStored",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "getAccountSnapshot",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "supplyRatePerTimestamp",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "borrowRatePerTimestamp",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
const UNITROLLER_ABI = [
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "markets",
    outputs: [
      { internalType: "bool", name: "isListed", type: "bool" },
      {
        internalType: "uint256",
        name: "collateralFactorMantissa",
        type: "uint256",
      },
      { internalType: "bool", name: "isQied", type: "bool" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      {
        internalType: "contract IOToken",
        name: "oToken",
        type: "address",
      },
    ],
    name: "checkMembership",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "uint8", name: "", type: "uint8" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "supplyRewardSpeeds",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "uint8", name: "", type: "uint8" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "borrowRewardSpeeds",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "uint8", name: "", type: "uint8" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "rewardAccrued",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
const ORACLE_ABI = [
  {
    inputs: [
      {
        internalType: "contract IOToken",
        name: "oToken",
        type: "address",
      },
    ],
    name: "getUnderlyingPrice",
    outputs: [{ internalType: "uint256", name: "price", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
const ERC20_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const {
  multicallAddress,
  unitrollerAddress,
  oracleAddress,
  account,
  update,
  dapp,
  onLoad,
} = props;

if (!multicallAddress || !unitrollerAddress || !update || !account) return "";
const MulticallContract = new ethers.Contract(
  multicallAddress,
  MULTICALL_ABI,
  Ethers.provider().getSigner()
);
console.log(`${dapp}-update`);
const multicallv2 = (abi, calls, options, onSuccess, onError) => {
  const { requireSuccess, ...overrides } = options || {};
  const itf = new ethers.utils.Interface(abi);
  const calldata = calls.map((call) => ({
    target: call.address.toLowerCase(),
    callData: itf.encodeFunctionData(call.name, call.params),
  }));
  MulticallContract.callStatic
    .tryAggregate(requireSuccess || true, calldata, overrides)
    .then((res) => {
      onSuccess(
        res.map((call, i) => {
          const [result, data] = call;
          return result && data !== "0x"
            ? itf.decodeFunctionResult(calls[i].name, data)
            : null;
        })
      );
    })
    .catch((err) => {
      onError?.(err);
    });
};
let _cTokensData = {};
let _loanToValue = null;
let _underlyPrice = {};
let _underlyingBalance = null;
let _userMerberShip = null;
let _rewardsApy = {};
let _accountRewards = {};
let count = 0;
let oTokensLength = Object.values(markets).length;
const AVAX = {
  icon: "https://ipfs.near.social/ipfs/bafkreiaxodsgromeeaihu44fazsxdopkrqvinqzhyfxvx5mrbcmduqdfpq",
  symbol: "AVAX",
};
const QI = {
  icon: "https://ipfs.near.social/ipfs/bafkreiel5ejkjafpw2au4v34muga4im5afzztojy7jedbnd24dtumgtzsi",
  symbol: "QI",
};

const formatedData = (key) => {
  console.log(`${dapp}-${key}`, count);
  if (count < 5) return;
  count = 0;
  oTokensLength = Object.values(markets).length;
  let totalSupplyUsd = Big(0);
  let totalBorrowUsd = Big(0);
  let userTotalSupplyUsd = Big(0);
  let userTotalBorrowUsd = Big(0);
  let totalCollateralUsd = Big(0);
  let totalAccountQiDistributionApy = Big(0);
  let totalAccountAvaxDistributionApy = Big(0);
  const markets = {};
  Object.values(_cTokensData).forEach((market) => {
    const underlyingPrice = _underlyPrice[market.address] || 1;
    const marketSupplyUsd = Big(market.totalSupply || 0).mul(underlyingPrice);
    const marketBorrowUsd = Big(market.totalBorrows || 0).mul(underlyingPrice);
    totalSupplyUsd = totalSupplyUsd.plus(marketSupplyUsd);
    totalBorrowUsd = totalBorrowUsd.plus(marketBorrowUsd);
    userTotalSupplyUsd = userTotalSupplyUsd.plus(
      Big(market.userSupply).mul(underlyingPrice)
    );
    userTotalBorrowUsd = userTotalBorrowUsd.plus(
      Big(market.userBorrow).mul(underlyingPrice)
    );
    if (_userMerberShip[market.address]) {
      totalCollateralUsd = totalCollateralUsd.plus(
        Big(market.userSupply)
          .mul(underlyingPrice)
          .mul(_loanToValue[market.address])
          .div(100)
      );
    }
    const rewardsApy = _rewardsApy[market.address];
    const avaxSupplyDistributionApy = rewardsApy.avax.supply
      .div(marketSupplyUsd.eq(0) ? 1 : marketSupplyUsd)
      .mul(100)
      .toFixed(2);
    const avaxBorrowDistributionApy = rewardsApy.avax.borrow
      .div(marketBorrowUsd.eq(0) ? 1 : marketBorrowUsd)
      .mul(100)
      .toFixed(2);
    const qiSupplyDistributionApy = rewardsApy.qi.supply
      .div(marketSupplyUsd.eq(0) ? 1 : marketSupplyUsd)
      .mul(100)
      .toFixed(2);
    const qiBorrowDistributionApy = rewardsApy.qi.borrow
      .div(marketBorrowUsd.eq(0) ? 1 : marketBorrowUsd)
      .mul(100)
      .toFixed(2);
    const distributionApy = [
      {
        ...AVAX,
        supply: avaxSupplyDistributionApy + "%",
        borrow: avaxBorrowDistributionApy + "%",
      },
      {
        ...QI,
        supply: qiSupplyDistributionApy + "%",
        borrow: qiBorrowDistributionApy + "%",
      },
    ];
    totalAccountQiDistributionApy = totalAccountQiDistributionApy
      .plus(qiSupplyDistributionApy)
      .plus(qiBorrowDistributionApy);
    totalAccountAvaxDistributionApy = totalAccountAvaxDistributionApy
      .plus(avaxSupplyDistributionApy)
      .plus(avaxBorrowDistributionApy);
    const supplyApy = Big(market.supplyRatePerTimestamp)
      .mul(60 * 60 * 24)
      .plus(1)
      .pow(365)
      .minus(1)
      .mul(100);
    const borrowApy = Big(market.borrowRatePerTimestamp)
      .mul(60 * 60 * 24)
      .plus(1)
      .pow(365)
      .minus(1)
      .mul(100);

    markets[market.address] = {
      ...market,
      loanToValue: _loanToValue[market.address],
      liquidity: Big(market.totalSupply || 0)
        .minus(market.totalBorrows || 0)
        .toString(),
      underlyingPrice: underlyingPrice,
      userUnderlyingBalance: _underlyingBalance[market.address],
      userMerberShip: _userMerberShip[market.address],
      supplyApy: supplyApy.toFixed(2) + "%",
      borrowApy: borrowApy.toFixed(2) + "%",
      dapp,
      distributionApy,
    };
  });
  let rewards = [];

  if (_accountRewards && Big(_accountRewards.qiReward || 0).gt(0)) {
    const dailyRewards = totalAccountQiDistributionApy
      .mul(userTotalSupplyUsd.add(userTotalBorrowUsd))
      .div(365 * 100)
      .div(_accountRewards.qiPrice);
    rewards.push({
      ...QI,
      dailyRewards: dailyRewards.lt(0.000001)
        ? "0.000001"
        : dailyRewards.toString(),
      price: _accountRewards.qiPrice,
      unclaimed: _accountRewards.qiReward,
    });
  }
  if (_accountRewards && Big(_accountRewards.avaxReward || 0).gt(0)) {
    const dailyRewards = totalAccountAvaxDistributionApy
      .mul(userTotalSupplyUsd.add(userTotalBorrowUsd))
      .div(365 * 100)
      .div(_accountRewards.avaxPrice);
    rewards.push({
      ...QI,
      dailyRewards: dailyRewards.lt(0.000001)
        ? "0.000001"
        : dailyRewards.toString(),
      price: _accountRewards.avaxPrice,
      unclaimed: _accountRewards.avaxReward,
    });
  }

  onLoad({
    markets,
    rewards,
    totalSupplyUsd: totalSupplyUsd.toString(),
    totalBorrowUsd: totalBorrowUsd.toString(),
    userTotalSupplyUsd: userTotalSupplyUsd.toString(),
    userTotalBorrowUsd: userTotalBorrowUsd.toString(),
    totalCollateralUsd: totalCollateralUsd.toString(),
  });
};
const getUnitrollerData = () => {
  const calls = [];
  const oTokens = Object.values(markets);
  oTokens.forEach((token) => {
    calls.push({
      address: unitrollerAddress,
      name: "markets",
      params: [token.address],
    });
    if (account) {
      calls.push({
        address: unitrollerAddress,
        name: "checkMembership",
        params: [account, token.address],
      });
    }
  });
  multicallv2(
    UNITROLLER_ABI,
    calls,
    {},
    (res) => {
      _loanToValue = {};
      _userMerberShip = {};
      for (let i = 0, len = res.length; i < len; i++) {
        const index = Math.floor(i / (account ? 2 : 1));
        const mod = i % (account ? 2 : 1);
        switch (mod) {
          case 0:
            _loanToValue[oTokens[index].address] = ethers.utils.formatUnits(
              res[i][1]._hex,
              16
            );
            break;
          case 1:
            _userMerberShip[oTokens[index].address] = res[i][0];
            break;
          default:
        }
      }
      count++;
      formatedData("getUnitrollerData");
    },
    (err) => {
      console.log("error-getUnitrollerData", err);
      setTimeout(() => {
        getUnitrollerData();
      }, 1000);
    }
  );
};
const getUnderlyPrice = () => {
  if (!oracleAddress) return;
  const oTokens = Object.keys(markets);
  const calls = oTokens.map((token) => ({
    address: oracleAddress,
    name: "getUnderlyingPrice",
    params: [token],
  }));
  multicallv2(
    ORACLE_ABI,
    calls,
    {},
    (res) => {
      _underlyPrice = {};
      for (let i = 0, len = res.length; i < len; i++) {
        _underlyPrice[oTokens[i]] = ethers.utils.formatUnits(
          res[i][0]._hex,
          36 - markets[oTokens[i]].underlyingToken.decimals
        );
      }
      count++;
      formatedData("getUnderlyPrice");
    },
    (err) => {
      console.log("error-getUnderlyPrice", err);
    }
  );
};
const getWalletBalance = () => {
  let nativeOToken = "";
  const underlyingTokens = Object.values(markets)
    .filter((market) => {
      if (market.underlyingToken.address === "native")
        nativeOToken = market.address;
      return (
        market.underlyingToken.address &&
        market.underlyingToken.address !== "native"
      );
    })
    .map((market) => ({
      ...market.underlyingToken,
      oTokenAddress: market.address,
    }));
  const calls = underlyingTokens.map((token) => ({
    address: token.address,
    name: "balanceOf",
    params: [account],
  }));
  multicallv2(
    ERC20_ABI,
    calls,
    {},
    (res) => {
      _underlyingBalance = {};
      for (let i = 0, len = res.length; i < len; i++) {
        _underlyingBalance[underlyingTokens[i].oTokenAddress] =
          ethers.utils.formatUnits(
            res[i][0]._hex,
            underlyingTokens[i].decimals
          );
      }
      const provider = Ethers.provider();
      provider.getBalance(account).then((rawBalance) => {
        _underlyingBalance[nativeOToken] = ethers.utils.formatUnits(
          rawBalance._hex,
          18
        );
        count++;
        formatedData("underlyingTokens");
      });
    },
    () => {
      setTimeout(() => {
        getWalletBalance();
      }, 500);
    }
  );
};
const getCTokenData = (oToken) => {
  if (oTokensLength === 0) return;
  const calls = [
    {
      address: oToken.address,
      name: "exchangeRateStored",
    },
    {
      address: oToken.address,
      name: "totalSupply",
    },
    {
      address: oToken.address,
      name: "totalBorrows",
    },
    {
      address: oToken.address,
      name: "supplyRatePerTimestamp",
    },
    {
      address: oToken.address,
      name: "borrowRatePerTimestamp",
    },
    {
      address: oToken.address,
      name: "getAccountSnapshot",
      params: [account],
    },
  ];
  multicallv2(
    OTOKEN_ABI,
    calls,
    {},
    (res) => {
      oTokensLength--;
      const exchangeRateStored = ethers.utils.formatUnits(
        res[0][0]._hex,
        10 + oToken.underlyingToken.decimals
      );
      const userSupply = ethers.utils.formatUnits(
        res[5][1]._hex,
        oToken.decimals
      );
      const totalSupply = ethers.utils.formatUnits(
        res[1][0]._hex,
        oToken.decimals
      );
      _cTokensData[oToken.address] = {
        ...oToken,
        exchangeRateStored,
        totalSupply: Big(totalSupply).mul(exchangeRateStored).toString(),
        totalBorrows: ethers.utils.formatUnits(
          res[2][0]._hex,
          oToken.underlyingToken.decimals
        ),
        supplyRatePerTimestamp: ethers.utils.formatUnits(res[3][0]._hex, 18),
        borrowRatePerTimestamp: ethers.utils.formatUnits(res[4][0]._hex, 18),
        userSupply: Big(userSupply).mul(exchangeRateStored).toString(),
        userBorrow: ethers.utils.formatUnits(
          res[5][2]._hex,
          oToken.underlyingToken.decimals
        ),
      };
      if (oTokensLength === 0) {
        count++;
        formatedData("oTokens data");
      }
    },
    () => {
      setTimeout(() => {
        getCTokenData(oToken);
      }, 500);
    }
  );
};

const getCTokensData = () => {
  Object.values(markets).forEach((market) => {
    getCTokenData(market);
  });
};

const getCTokenReward = ({ avaxPrice, qiPrice, cTokens, index }) => {
  const token = cTokens[index];
  const calls = [
    {
      address: unitrollerAddress,
      name: "borrowRewardSpeeds",
      params: [0, token],
    },
    {
      address: unitrollerAddress,
      name: "borrowRewardSpeeds",
      params: [1, token],
    },
    {
      address: unitrollerAddress,
      name: "supplyRewardSpeeds",
      params: [0, token],
    },
    {
      address: unitrollerAddress,
      name: "supplyRewardSpeeds",
      params: [1, token],
    },
    {
      address: unitrollerAddress,
      name: "rewardAccrued",
      params: [0, account],
    },
    {
      address: unitrollerAddress,
      name: "rewardAccrued",
      params: [1, account],
    },
  ];
  multicallv2(
    UNITROLLER_ABI,
    calls,
    {},
    (res) => {
      const qiBorrow = Big(ethers.utils.formatUnits(res[0][0]._hex, 18)).mul(
        qiPrice
      );
      const avaxBorrow = Big(ethers.utils.formatUnits(res[1][0]._hex, 18)).mul(
        avaxPrice
      );
      const qiSupply = Big(ethers.utils.formatUnits(res[2][0]._hex, 18)).mul(
        qiPrice
      );
      const avaxSupply = Big(ethers.utils.formatUnits(res[3][0]._hex, 18)).mul(
        avaxPrice
      );
      _accountRewards.qiReward = ethers.utils.formatUnits(res[4][0]._hex, 18);
      _accountRewards.avaxReward = ethers.utils.formatUnits(res[5][0]._hex, 18);
      _rewardsApy[token] = {
        avax: {
          borrow: avaxBorrow.mul(60 * 60 * 24 * 365),
          supply: avaxSupply.mul(60 * 60 * 24 * 365),
        },
        qi: {
          borrow: qiBorrow.mul(60 * 60 * 24 * 365),
          supply: qiSupply.mul(60 * 60 * 24 * 365),
        },
      };
      if (index === cTokens.length - 1) {
        count++;
        formatedData("rewards");
      } else {
        getCTokenReward({
          avaxPrice,
          qiPrice,
          cTokens,
          index: index + 1,
        });
      }
    },
    (err) => {
      console.log("error-rewards", err);
    }
  );
};

const getRewards = () => {
  asyncFetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2,benqi&vs_currencies=usd"
  ).then((response) => {
    const data = response.body || [];
    const avaxPrice = data["avalanche-2"].usd;
    const qiPrice = data["benqi"].usd;
    const cTokens = Object.keys(markets);
    _accountRewards.avaxPrice = avaxPrice;
    _accountRewards.qiPrice = qiPrice;
    getCTokenReward({
      avaxPrice,
      qiPrice,
      cTokens,
      index: 0,
    });
  });
};

const init = () => {
  getUnitrollerData();
  getUnderlyPrice();
  getWalletBalance();
  getCTokensData();
  getRewards();
};

init();
