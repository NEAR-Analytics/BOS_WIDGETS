const ethAddress = "0x0000000000000000000000000000000000000000";
const wethAddress = "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9";

const {
  NETWORK_NEAR,
  NETWORK_ETH,
  NETWORK_ZKSYNC,
  NETWORK_ZKEVM,
  NETWORK_AURORA,
  NETWORK_POLYGON,
  DEX,
  debug,
} = props;

let onLoad = props.onLoad;
const forceReload = props.forceReload ?? false;

const { onShowNoPool } = props;

State.init({ loadComplete: false });

if (forceReload) {
  State.update({
    forceReload: false,
    factoryAbi: undefined,
    erc20Abi: undefined,
    routerAbi: undefined,
  });
}

if (state.loadComplete && !forceReload) {
  return <div />;
}

if (typeof onLoad !== "function") return "Error";

const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};

const callTxBalancerZKEVM = (input, onComplete, gasPrice, gasLimit) => {
  if (
    input.sender &&
    input.routerContract !== undefined &&
    input.routerAbi &&
    input.inputAssetAmount &&
    input.inputAsset.metadata.decimals
  ) {
    const value = expandToken(
      input.inputAssetAmount,
      input.inputAsset.metadata.decimals
    ).toFixed();

    const WethContract = new ethers.Contract(
      wethAddress,
      [
        {
          constant: false,
          inputs: [],
          name: "deposit",
          outputs: [],
          payable: true,
          stateMutability: "payable",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ internalType: "uint256", name: "wad", type: "uint256" }],
          name: "withdraw",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      Ethers.provider().getSigner()
    );

    console.log("WethContract: ", WethContract);

    if (
      input.inputAssetTokenId === ethAddress &&
      input.outputAssetTokenId === wethAddress
    ) {
      return WethContract.deposit({
        value: ethers.utils.parseEther(input.inputAssetAmount),
        gasLimit: gasLimit ?? 300000,
      }).then((res) => {
        onComplete(res);
      });
    }

    if (
      input.inputAssetTokenId === wethAddress &&
      input.outputAssetTokenId === ethAddress
    ) {
      return WethContract.withdraw(
        ethers.utils.parseEther(input.inputAssetAmount)
      ).then((res) => {
        onComplete(res);
      });
    }

    const swapContract = new ethers.Contract(
      input.routerContract,
      input.routerAbi,
      Ethers.provider().getSigner()
    );

    const USDC = "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035";
    const WETH = "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9";
    const WBTC = "0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1";
    const MATIC = "0xa2036f0538221a77a3937f1379699f44945018d0";
    const USDT = "0x1E4a5963aBFD975d8c9021ce480b42188849D41d";
    const DAI = "0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4";

    // [asset1, asset2, asset3...], pool1
    const pools = [
      [
        [MATIC, WETH, USDC],
        "0xc951aebfa361e9d0063355b9e68f5fa4599aa3d1000100000000000000000017",
      ],
      [
        [WETH, DAI],
        "0xa7f602cfaf75a566cb0ed110993ee81c27fa3f53000200000000000000000009",
      ],
      [
        [WETH, DAI, USDT],
        "0xe8ca7400eb61d5bdfc3f8f2ea99e687e0a4dbf78000100000000000000000019",
      ],
      [
        [WETH, USDC],
        "0x53ddc1f1ef585b426c03674f278f8107f1524ade000200000000000000000012",
      ],
    ];

    const finalPool = pools
      .filter(
        (poolData) =>
          poolData[0].includes(input.inputAssetTokenId) &&
          poolData[0].includes(input.outputAssetTokenId)
      )
      .map((poolData) => poolData[1]);

    if (!finalPool.length) {
      onShowNoPool();
    }

    const assets = [input.inputAssetTokenId, input.outputAssetTokenId];

    const funds = [input.sender, false, input.sender, false];

    const swap_steps = [
      {
        poolId: finalPool[0],
        assetIn: input.inputAssetTokenId,
        assetOut: input.outputAssetTokenId,
        amount: value,
      },
    ];

    const token_data = {};

    token_data[input.inputAssetTokenId] = {
      symbol: input.inputAsset.metadata.symbol,
      decimals: input.inputAsset.metadata.decimals,
      limit: value,
    };
    token_data[input.outputAssetTokenId] = {
      symbol: input.outputAsset.metadata.symbol,
      decimals: input.outputAsset.metadata.decimals,
      limit: "0",
    };

    var token_addresses = Object.keys(token_data);
    const token_indices = {};
    for (var i = 0; i < token_addresses.length; i++) {
      token_indices[token_addresses[i]] = i;
    }

    const swap_steps_struct = [];
    for (const step of swap_steps) {
      const swap_step_struct = [
        step["poolId"],
        token_indices[step["assetIn"]],
        token_indices[step["assetOut"]],
        step["amount"],
        "0x",
      ];
      swap_steps_struct.push(swap_step_struct);
    }

    const swap_kind = 0;
    const token_limits = [value, 0];
    const deadline = new Big(Math.floor(Date.now() / 1000)).add(new Big(1800));

    swapContract
      .batchSwap(
        swap_kind,
        swap_steps_struct,
        assets,
        funds,
        token_limits,
        deadline.toFixed(),
        {
          gasPrice: ethers.utils.parseUnits(gasPrice ?? "0.50", "gwei"),
          gasLimit: gasLimit ?? 20000000,
        }
      )
      .then((transactionHash) => {
        onComplete(transactionHash);
      })
      .catch(() => {});
  }
};

const callTxQuickSwap = (
  input,
  onComplete,
  gasPrice,
  gasLimit,
  sqrtPriceLimitX96,
  path
) => {
  console.log("callTxQuickSwap", input, path);
  if (
    input.sender &&
    input.routerContract !== undefined &&
    input.routerAbi &&
    input.inputAssetAmount &&
    input.inputAsset.metadata.decimals
  ) {
    const value = expandToken(
      input.inputAssetAmount,
      input.inputAsset.metadata.decimals
    ).toFixed(0);

    const WethContract = new ethers.Contract(
      wethAddress,
      [
        {
          constant: false,
          inputs: [],
          name: "deposit",
          outputs: [],
          payable: true,
          stateMutability: "payable",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ internalType: "uint256", name: "wad", type: "uint256" }],
          name: "withdraw",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      Ethers.provider().getSigner()
    );

    console.log("WethContract: ", WethContract);

    if (
      input.inputAssetTokenId === ethAddress &&
      input.outputAssetTokenId === wethAddress
    ) {
      return WethContract.deposit({
        value: ethers.utils.parseEther(input.inputAssetAmount),
        gasLimit: gasLimit ?? 300000,
      }).then((res) => {
        onComplete(res);
      });
    }

    if (
      input.inputAssetTokenId === wethAddress &&
      input.outputAssetTokenId === ethAddress
    ) {
      return WethContract.withdraw(
        ethers.utils.parseEther(input.inputAssetAmount)
      ).then((res) => {
        onComplete(res);
      });
    }

    const deadline = new Big(Math.floor(Date.now() / 1000)).add(new Big(1800));

    const iface = new ethers.utils.Interface(input.routerAbi);
    console.log("input.routerAbi: ", input.routerAbi);
    console.log("iface: ", iface);

    const tokenIn =
      input.inputAssetTokenId === ethAddress
        ? wethAddress
        : input.inputAssetTokenId;

    const tokenOut =
      input.outputAssetTokenId === ethAddress
        ? wethAddress
        : input.outputAssetTokenId;

    // console.log("tokenIn: ", tokenIn, "path", path);

    const recipient =
      input.outputAssetTokenId === ethAddress
        ? input.outputAssetTokenId
        : input.sender;

    const multicallParams = [];

    if (path.length === 2) {
      console.log("value33333 ", value);

      const inputs = [
        {
          tokenIn,
          tokenOut,
          recipient,
          deadline: deadline.toFixed(),
          amountIn: value,
          amountOutMinimum: "0",
          limitSqrtPrice: sqrtPriceLimitX96 ?? 0,
        },
      ];

      const encodedDataCallSwap = iface.encodeFunctionData(
        "exactInputSingle",
        inputs
      );

      console.log("encodedDataCallSwap: ", encodedDataCallSwap);

      multicallParams.push(encodedDataCallSwap);
    } else if (path.length > 2) {
      // path recepient deadline amountIn amountOutMinimum
      const pathBytes =
        "0x" + path.map((address) => address.substr(2)).join("");

      const inputs = [pathBytes, input.sender, deadline, value, "0"];

      const encodedDataCallSwap = iface.encodeFunctionData(
        "exactInput",
        inputs
      );
      multicallParams.push(encodedDataCallSwap);
    }

    if (input.outputAssetTokenId === ethAddress) {
      multicallParams.push(
        iface.encodeFunctionData("unwrapWNativeToken", ["0", input.sender])
      );
    }

    console.log("multicallParams: ", multicallParams);

    const swapContract = new ethers.Contract(
      input.routerContract,
      input.routerAbi,
      Ethers.provider().getSigner()
    );

    const options = {
      gasPrice: ethers.utils.parseUnits(gasPrice ?? "10", "gwei"),
      gasLimit: gasLimit ?? 300000,
      value: input.inputAssetTokenId === ethAddress ? value : "0",
    };

    console.log("options: ", options);

    return swapContract
      .multicall(multicallParams, options)
      .then((transactionHash) => {
        onComplete(transactionHash);
      })
      .catch((e) => {
        console.log("e111", e);
      });
  }
};

const callTxPancakeZKEVM2 = (
  input,
  onComplete,
  gasPrice,
  gasLimit,
  sqrtPriceLimitX96,
  path
) => {
  const poolFee = "2500";
  console.log(
    "callTxPancakeZKEVM2",
    input,
    gasPrice,
    gasLimit,
    sqrtPriceLimitX96,
    path
  );
  if (
    input.sender &&
    input.routerContract !== undefined &&
    input.routerAbi &&
    input.inputAssetAmount &&
    input.inputAsset.metadata.decimals
  ) {
    const value = expandToken(
      input.inputAssetAmount,
      input.inputAsset.metadata.decimals
    ).toFixed();

    const WethContract = new ethers.Contract(
      wethAddress,
      [
        {
          constant: false,
          inputs: [],
          name: "deposit",
          outputs: [],
          payable: true,
          stateMutability: "payable",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ internalType: "uint256", name: "wad", type: "uint256" }],
          name: "withdraw",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      Ethers.provider().getSigner()
    );

    console.log("WethContract: ", WethContract);

    if (
      input.inputAssetTokenId === ethAddress &&
      input.outputAssetTokenId === wethAddress
    ) {
      return WethContract.deposit({
        value: ethers.utils.parseEther(input.inputAssetAmount),
        gasLimit: gasLimit ?? 300000,
      }).then((res) => {
        onComplete(res);
      });
    }

    if (
      input.inputAssetTokenId === wethAddress &&
      input.outputAssetTokenId === ethAddress
    ) {
      return WethContract.withdraw(
        ethers.utils.parseEther(input.inputAssetAmount)
      ).then((res) => {
        onComplete(res);
      });
    }

    const ifaceErc20 = new ethers.utils.Interface(input.routerAbi);

    const deadline = new Big(Math.floor(Date.now() / 1000)).add(new Big(1800));

    let swapType;

    const WETH = "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9";
    if (input.inputAssetTokenId != WETH && input.outputAssetTokenId != WETH) {
      swapType = "complex";
      path = [input.inputAssetTokenId, WETH, input.outputAssetTokenId];
    } else {
      swapType = "single";
    }

    let encodedExactOutputSingleData;
    if (swapType == "complex") {
      console.log(swapType, "path", path);
      const pathBytes =
        "0x" + path.map((address) => address.substr(2)).join("");

      encodedExactOutputSingleData = ifaceErc20.encodeFunctionData(
        "exactInput",
        [
          {
            path: pathBytes,
            recipient: input.sender,
            amountIn: value,
            amountOutMinimum: "0",
          },
        ]
      );
    } else {
      console.log(swapType);
      encodedExactOutputSingleData = ifaceErc20.encodeFunctionData(
        "exactInputSingle",
        [
          {
            tokenIn: input.inputAssetTokenId,
            tokenOut: input.outputAssetTokenId,
            fee: poolFee,
            recipient: input.sender,
            amountIn: value,
            amountOutMinimum: "0",
            sqrtPriceLimitX96: sqrtPriceLimitX96 ?? "0",
          },
        ]
      );
    }

    const multicallParams = [encodedExactOutputSingleData];

    const multicallContract = new ethers.Contract(
      input.routerContract,
      input.routerAbi,
      Ethers.provider().getSigner()
    );

    const multicallData = ifaceErc20.encodeFunctionData(
      "multicall(uint256,bytes[])",
      [
        //const multicallData = ifaceErc20.encodeFunctionData("multicall", [
        deadline.toFixed(),
        multicallParams,
      ]
    );

    console.log("multicallData", multicallData, deadline.toFixed());

    console.log("multicallData", multicallData);

    const txArgs = {
      to: input.routerContract,
      from: input.sender,
      data: multicallData,
      gasPrice: ethers.utils.parseUnits(gasPrice ?? "1.81", "gwei"),
      gasLimit: gasLimit ?? 300000,
    };

    console.log("txArgs", txArgs);

    Ethers.provider()
      //.send("eth_sendTransaction", txArgs)
      .getSigner()
      .sendTransaction(txArgs)
      .then((transactionHash) => {
        onComplete(transactionHash);
      })
      .catch(() => {});

    return;

    const swapContract = new ethers.Contract(
      input.routerContract,
      input.routerAbi,
      Ethers.provider().getSigner()
    );

    if (path.length === 2) {
      // tokenIn tokenOut recipient deadline amountIn amountOutMinimum sqrtPriceLimitX96
      console.log("swapContract", swapContract);
      swapContract
        .aggregate(
          [
            {
              target: input.routerContract,
              callData: encodedExactOutputSingleData,
            },
          ] /*,
          {
            gasPrice: ethers.utils.parseUnits(gasPrice ?? "0.801", "gwei"),
            gasLimit: gasLimit ?? 300000,
          }*/
        )
        .then((transactionHash) => {
          console.log("transactionHash", transactionHash);
          // onComplete(transactionHash);
        });
    } else {
      console.log("path.length", path.length);
    }
  }
};

const callTokenApprovalEVM = (input, onComplete, gweiPrice, gasLimit) => {
  if (
    input.sender &&
    input.erc20Abi &&
    input.inputAssetAmount &&
    input.inputAsset.metadata.decimals &&
    input.routerContract
  ) {
    const value = expandToken(
      input.inputAssetAmount,
      input.inputAsset.metadata.decimals
    ).toFixed();

    const approveContract = new ethers.Contract(
      input.inputAssetTokenId,
      input.erc20Abi,
      Ethers.provider().getSigner()
    );

    let gasArgs = {};

    if (gweiPrice !== undefined && gasLimit !== undefined) {
      gasArgs.gasPrice = ethers.utils.parseUnits(gweiPrice ?? "0.26", "gwei");
      gasArgs.gasLimit = gasLimit ?? 20000000;
    }

    approveContract
      .approve(input.routerContract, value, gasArgs)
      .then((transactionHash) => {
        transactionHash.wait().then(() => {
          onComplete(transactionHash);
        });
      })
      .catch((e) => {
        console.log("e1111", e);
      });
  }
};

if (ethers !== undefined && Ethers.send("eth_requestAccounts", [])[0]) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      // ZKEVM
      if (DEX === "QuickSwap") {
        if (state.erc20Abi == undefined) {
          const erc20Abi = fetch(
            "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
          );
          if (!erc20Abi.ok) {
            return "Loading";
          }
          State.update({ erc20Abi: erc20Abi.body });
        }

        if (state.routerAbi == undefined) {
          const routerAbi = fetch(
            "https://gist.githubusercontent.com/zavodil/a50ed9fcd2e1ba1adc40db19a94c79fe/raw/a3b92a2b9120d7d503e01714980ad44bd10c9030/quickswap_swapRouter_zkevm.json"
          );
          if (!routerAbi.ok) {
            return "Loading";
          }

          State.update({ routerAbi: routerAbi.body });
        }

        if (!state.routerAbi || !state.erc20Abi) return "Loading ABIs";

        onLoad({
          network: NETWORK_ZKEVM,
          assets: [
            "0x0000000000000000000000000000000000000000", // ETH
            "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035", // USDC
            "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9", // WETH
            "0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1", // WBTC
            "0xa2036f0538221a77a3937f1379699f44945018d0", // MATIC
            "0x1E4a5963aBFD975d8c9021ce480b42188849D41d", // USDT
            "0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4", // DAI
          ],
          coinGeckoTokenIds: {
            "0x0000000000000000000000000000000000000000":
              "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035":
              "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035":
              "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9":
              "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1":
              "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
            "0xa2036f0538221a77a3937f1379699f44945018d0":
              "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
            "0x1E4a5963aBFD975d8c9021ce480b42188849D41d":
              "0xdac17f958d2ee523a2206206994597c13d831ec7",
            "0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4":
              "0x6b175474e89094c44da98b954eedeac495271d0f",
            "0xa2036f0538221a77A3937F1379699f44945018d0":
              "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
          },
          routerContract: "0xF6Ad3CcF71Abb3E12beCf6b3D2a74C963859ADCd",
          dexName: "QuickSwap",
          erc20Abi: state.erc20Abi,
          routerAbi: state.routerAbi,
          callTx: callTxQuickSwap,
          callTokenApproval: callTokenApprovalEVM,
        });
        State.update({ loadComplete: true });
      } else if (DEX === "Balancer") {
        if (state.erc20Abi == undefined) {
          const erc20Abi = fetch(
            "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
          );
          if (!erc20Abi.ok) {
            return "Loading";
          }
          State.update({ erc20Abi: erc20Abi.body });
        }

        if (state.routerAbi == undefined) {
          const routerAbi = fetch(
            "https://raw.githubusercontent.com/gerrrg/balancer-tutorials/master/abis/Vault.json"
          );
          if (!routerAbi.ok) {
            return "Loading";
          }

          State.update({ routerAbi: routerAbi.body });
        }

        if (!state.routerAbi || !state.erc20Abi) return "Loading ABIs";

        onLoad({
          network: NETWORK_ZKEVM,
          assets: [
            "0x0000000000000000000000000000000000000000", // ETH
            "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035", // USDC
            "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9", // WETH
            "0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1", // WBTC
            "0xa2036f0538221a77a3937f1379699f44945018d0", // MATIC
            "0x1E4a5963aBFD975d8c9021ce480b42188849D41d", // USDT
            "0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4", // DAI
          ],
          coinGeckoTokenIds: {
            "0x0000000000000000000000000000000000000000":
              "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035":
              "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9":
              "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1":
              "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
            "0xa2036f0538221a77a3937f1379699f44945018d0":
              "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
            "0x1E4a5963aBFD975d8c9021ce480b42188849D41d":
              "0xdac17f958d2ee523a2206206994597c13d831ec7",
            "0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4":
              "0x6b175474e89094c44da98b954eedeac495271d0f",
            "0xa2036f0538221a77A3937F1379699f44945018d0":
              "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
            "0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035":
              "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          },
          routerContract: "0xBA12222222228d8Ba445958a75a0704d566BF2C8", // Balancer Vault
          dexName: "Balancer",
          erc20Abi: state.erc20Abi,
          routerAbi: state.routerAbi,
          callTx: callTxBalancerZKEVM,
          callTokenApproval: callTokenApprovalEVM,
        });

        State.update({ loadComplete: true });
      } else if (DEX === "Pancake Swap") {
        if (state.erc20Abi == undefined) {
          const erc20Abi = fetch(
            "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
          );
          if (!erc20Abi.ok) {
            return "Loading";
          }
          State.update({ erc20Abi: erc20Abi.body });
        }

        if (state.routerAbi == undefined) {
          const routerAbi = fetch(
            //"https://gist.githubusercontent.com/zavodil/5ab70bbbd8cf30c0edbf4837f473904d/raw/e9ec67d159b844222df04f3ad23c4c1cc771fa43/PancakeSwapRouter"
            "https://gist.githubusercontent.com/zavodil/c51f14cbc5c379ab15548dcd63bee279/raw/1f797efe368cadd6c817df0a736f1ea9a522bd8a/PancakeMixedRouteQuoterV1ABI?1"
          );
          if (!routerAbi.ok) {
            return "Loading";
          }

          State.update({ routerAbi: routerAbi.body });
        }

        if (!state.routerAbi || !state.erc20Abi) return "Loading ABIs";

        onLoad({
          network: NETWORK_ZKEVM,
          assets: [
            "0x0000000000000000000000000000000000000000",
            "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",
            "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",
            "0x1E4a5963aBFD975d8c9021ce480b42188849D41d",
          ],
          coinGeckoTokenIds: {
            "0x0000000000000000000000000000000000000000":
              "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035":
              "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9":
              "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "0x1E4a5963aBFD975d8c9021ce480b42188849D41d":
              "0xdac17f958d2ee523a2206206994597c13d831ec7",
            "0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035":
              "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          },
          routerContract: "0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86", // PancakeMixedRouteQuoterV1ABI
          dexName: "Pancake Swap",
          erc20Abi: state.erc20Abi,
          routerAbi: state.routerAbi,
          callTx: callTxPancakeZKEVM2,
          callTokenApproval: callTokenApprovalEVM,
        });

        State.update({ loadComplete: true });
      }
    });
}

return <div></div>;
