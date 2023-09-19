const staticRouter = "0xAdB09F65bd90d19e3148D9ccb693F3161C6DB3E8";

const staticRedeemAbis = [
  {
    inputs: [
      {
        internalType: "address",
        name: "YT",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "netPYToRedeem",
        type: "uint256",
      },
    ],
    name: "redeemPyToSyStatic",
    outputs: [
      {
        internalType: "uint256",
        name: "netSyOut",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "YT",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "netPYToRedeem",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenOut",
        type: "address",
      },
      {
        internalType: "address",
        name: "bulk",
        type: "address",
      },
    ],
    name: "redeemPyToTokenStatic",
    outputs: [
      {
        internalType: "uint256",
        name: "netTokenOut",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const wethAddress = "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1";

const {
  inputCurrencyAmount,
  outputCurrency,
  inputCurrency,
  mintType,
  market,
  account,
  onLoadOut,
} = props;

State.init({
  quoting: false,
  // amount: "",
});

const signer = Ethers.provider().getSigner();

const contract = new ethers.Contract(staticRouter, staticRedeemAbis, signer);

const YT = market.yt.address;

const getRedeemPyToSy = (amount) => {
  return contract
    .redeemPyToSyStatic(YT, amount)
    .then((res) => {
      const netSyOutRaw = res.toString();

      const parsedOut = ethers.utils.formatUnits(
        netSyOutRaw,
        market.pt.decimals
      );

      State.update({
        amount: parsedOut,
        quoting: false,
        errorMsg: "",
      });

      onLoadOut({
        amount: parsedOut,
        quoting: false,
      });
    })
    .catch((e) => {
      onLoadOut({
        amount: "0",
        quoting: false,
      });
    });
};

const getkyberData = (tokenIn, tokenOut, amount, isUnderlying) => {
  const url = `https://aggregator-api.kyberswap.com/arbitrum/route/encode?tokenIn=${tokenIn}&tokenOut=${tokenOut}&amountIn=${amount}&to=0x0000000001e4ef00d069e71d6ba041b0a16f7ea0`;

  return asyncFetch(url)
    .then((res) => {
      if (isUnderlying) {
        return { amount };
      } else {
        const { outputAmount, routerAddress, encodedSwapData } = res.body;
        return { amount: outputAmount, routerAddress, encodedSwapData };
      }
    })
    .catch((e) => {
      return {
        error: true,
        amount,
      };
    });
};

const getStaticRedeem = () => {
  const netPyIn = Big(inputCurrencyAmount)
    .times(Big(10).pow(market.yt.decimals))
    .toFixed(0);

  if (outputCurrency.baseType === "SY") {
    return getRedeemPyToSy(netPyIn);
  } else {
    const bulk = "0x0000000000000000000000000000000000000000";

    const tokenOut =
      outputCurrency.address === "native"
        ? wethAddress
        : outputCurrency.address;

    // console.log("YT, netPyIn, tokenOut, bulk: ", YT, netPyIn, tokenOut, bulk);

    contract
      .redeemPyToTokenStatic(YT, netPyIn, tokenOut, bulk)
      .then((res) => {
        //  if is underlying, redeem  it.
        const netSyOutRaw = res.toString();
        console.log("netSyOutRaw: ", netSyOutRaw);

        const parsedOut = ethers.utils.formatUnits(
          netSyOutRaw,
          outputCurrency.decimals
        );

        State.update({
          amount: parsedOut,
          quoting: false,
          errorMsg: "",
        });

        onLoadOut({
          amount: parsedOut,
          quoting: false,
        });

        // if (isUnderlying) {
        //   const parsedOut = ethers.utils.formatUnits(
        //     netSyOutRaw,
        //     market.underlyingAsset.decimals
        //   );

        //   return;
        // }

        // contract
        //   .redeemPyToTokenStatic(
        //     YT,
        //     netPyIn,
        //     market.underlyingAsset.address,
        //     bulk
        //   )
        //   .then((underlyingRes) => {
        //     const rawUnderlyingRes = underlyingRes.toString();

        //     getkyberData(
        //       market.underlyingAsset.address,
        //       tokenOut,
        //       rawUnderlyingRes,
        //       market.underlyingAsset.address.toLowerCase() ===
        //         outputCurrency.address.toLowerCase()
        //     ).then(({ amount, error, routerAddress, encodedSwapData }) => {
        //       console.log("amount kyber: ", amount);
        //       // const useOrigin = !amount;

        //       if (!amount || Big(amount).lt(netSyOutRaw)) {
        //         State.update({
        //           amount: ethers.utils.formatUnits(
        //             netSyOutRaw,
        //             outputCurrency.decimals
        //           ),
        //           quoting: false,
        //           errorMsg: "Bad Route",
        //         });

        //         onLoadOut({
        //           amount: ethers.utils.formatUnits(
        //             netSyOutRaw,
        //             outputCurrency.decimals
        //           ),
        //           quoting: false,
        //         });
        //       } else {
        //         State.update({
        //           amount: ethers.utils.formatUnits(
        //             amount,
        //             outputCurrency.decimals
        //           ),
        //           quoting: false,
        //           errorMsg: "",
        //         });

        //         onLoadOut({
        //           amount: ethers.utils.formatUnits(
        //             amount,
        //             outputCurrency.decimals
        //           ),
        //           quoting: false,
        //           redeemParams: {
        //             routerAddress,
        //             encodedSwapData,
        //             swapType: 1,
        //           },
        //         });
        //       }
        //     });
        //   });
      })
      .catch((e) => {
        console.log("e1111: ", e);
        State.update({
          amount: "",
          quoting: false,
          errorMsg: "",
        });
        onLoadOut({
          amount: "",
        });
      });
  }
};

const qs = `${inputCurrencyAmount} ${outputCurrency.address} to ${mintType}`;

if (outputCurrency && market) {
  State.update({
    qs,
  });

  if (inputCurrencyAmount) {
    getStaticRedeem();
  }
}

return "";
