const OutPut = styled.div``;
const OutPutItem = styled.div`
  display: flex;
  padding: 10px 20px;
  background-color: #222436;
  border-radius: 12px;
  margin-top: 20px;
`;
const Amount = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #fff;
`;
const Value = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #787da1;
`;
const AmountWrapper = styled.div`
  width: 60%;
  border-right: 1px solid #2c334b;
`;
const TokenWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  padding-left: 20px;
`;
const TokenIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 6px;
`;
const TokenSymbol = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  white-space: nowrap;
`;
const Expiry = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #787da1;
`;

const { onLoadMint } = props;

const staticRouter = "0xAdB09F65bd90d19e3148D9ccb693F3161C6DB3E8";

const staticMintAbis = [
  {
    inputs: [
      {
        internalType: "address",
        name: "YT",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "netSyToMint",
        type: "uint256",
      },
    ],
    name: "mintPyFromSyStatic",
    outputs: [
      {
        internalType: "uint256",
        name: "netPYOut",
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
        internalType: "address",
        name: "tokenIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "netTokenIn",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "bulk",
        type: "address",
      },
    ],
    name: "mintPyFromTokenStatic",
    outputs: [
      {
        internalType: "uint256",
        name: "netPyOut",
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
        name: "SY",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "netTokenIn",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "bulk",
        type: "address",
      },
    ],
    name: "mintSyFromTokenStatic",
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
];

const wethAddress = "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1";

const {
  inputCurrency,
  inputCurrencyAmount,
  mintType,
  SuccessCallBack,
  market,
} = props;

State.init({
  quoting: false,
  amount: "",
});

const signer = Ethers.provider().getSigner();

const contract = new ethers.Contract(staticRouter, staticMintAbis, signer);

const YT = market.yt.address;

const getStaticMintSY = (amountIn) => {
  return contract
    .mintPyFromSyStatic(market.yt.address, amountIn)
    .then((res) => {
      const netPYOutRaw = res.toString();

      const parsedOut = ethers.utils.formatUnits(
        netPYOutRaw,
        market.pt.decimals
      );

      State.update({
        amount: parsedOut,
        quoting: false,
        errorMsg: "",
      });

      onLoadMint({
        amount: parsedOut,
        quoitng: false,
      });
    })
    .catch((e) => {
      State.update({
        amount: "",
        quoting: false,
        errorMsg: "",
      });

      onLoadMint({
        amount: "",
        quoitng: false,
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

const getStaticMint = () => {
  const amountIn = ethers.utils.parseUnits(
    inputCurrencyAmount,
    inputCurrency.decimals
  );

  State.update({
    quoting: true,
  });
  if (inputCurrency.baseType === "SY") {
    return getStaticMintSY(amountIn);
  } else {
    const tokenIn =
      inputCurrency.address === "native" ? wethAddress : inputCurrency.address;

    const netTokenIn = Big(inputCurrencyAmount)
      .times(Big(10).pow(inputCurrency.decimals))
      .toFixed(0);

    const bulk = "0x0000000000000000000000000000000000000000";

    contract
      .mintPyFromTokenStatic(YT, tokenIn, netTokenIn, bulk)
      .then((rawAmount) => {
        // const isUnderlying =
        //   inputCurrency.address.toLowerCase() ===
        //   market.underlyingAsset.address.toLowerCase();

        // if (isUnderlying) {
        State.update({
          amount: ethers.utils.formatUnits(
            rawAmount.toString(),
            market.pt.decimals
          ),
          quoting: false,
          errorMsg: "",
        });

        onLoadMint({
          amount: ethers.utils.formatUnits(
            rawAmount.toString(),
            market.pt.decimals
          ),
        });

        return;
        // }

        // getkyberData(
        //   tokenIn,
        //   market.underlyingAsset.address,
        //   netTokenIn,
        //   inputCurrency.address.toLowerCase() ===
        //     market.underlyingAsset.address.toLowerCase()
        // ).then(({ amount, error, routerAddress, encodedSwapData }) => {
        //   const useOrigin = !amount;

        //   if (useOrigin) {
        //     State.update({
        //       amount: ethers.utils.formatUnits(
        //         rawAmount.toString(),
        //         market.pt.decimals
        //       ),
        //       quoting: false,
        //       errorMsg: "",
        //     });

        //     return;
        //   }

        //   contract
        //     .mintPyFromTokenStatic(
        //       YT,
        //       market.underlyingAsset.address,
        //       amount,
        //       bulk
        //     )
        //     .then((res) => {
        //       const netPYOutRaw = res.toString();

        //       const badRoute = Big(rawAmount.toString()).gt(netPYOutRaw);

        //       const parsedOut = ethers.utils.formatUnits(
        //         netPYOutRaw,
        //         market.pt.decimals
        //       );

        //       if (badRoute) {
        //         State.update({
        //           amount: ethers.utils.formatUnits(
        //             rawAmount.toString(),
        //             market.pt.decimals
        //           ),
        //           quoting: false,
        //           errorMsg: "Bad Route",
        //         });
        //         return;
        //       } else {
        //         State.update({
        //           amount: parsedOut,
        //           quoting: false,
        //           errorMsg: "",
        //           mintParams: {
        //             swapType: 1,
        //             routerAddress,
        //             encodedSwapData,
        //           },
        //         });

        //         const mintParams = {
        //           swapType: 1,
        //           routerAddress,
        //           encodedSwapData,
        //         };

        //         onLoadMint({
        //           mintParams,
        //         });
        //       }
        //     })
        //     .catch((e) => {
        //       State.update({
        //         amount: "",
        //         quoting: false,
        //         errorMsg: e.message,
        //       });
        //     });
        // });
      })
      .catch((e) => {
        State.update({
          amount: "",
          quoting: false,
          errorMsg: e.message,
        });
      });
  }
};

const qs = `${inputCurrencyAmount} ${inputCurrency.address} to ${mintType}`;

if (inputCurrencyAmount && inputCurrency && market && qs !== state.qs) {
  State.update({
    qs,
  });
  getStaticMint();
}

const pt = props.pt || {};
const yt = props.yt || {};

const formatValue = (currency) => {
  if (!state.amount || !currency.price) return "";
  return Big(state.amount).mul(currency.price.usd).toFixed(2);
};

return (
  <OutPut>
    <OutPutItem>
      <AmountWrapper>
        <Amount>{state.amount || 0}</Amount>
        <Value>≈ ${formatValue(pt)}</Value>
      </AmountWrapper>
      <TokenWrapper>
        <TokenIcon src={pt.proIcon} />
        <div>
          <TokenSymbol>{pt.proSymbol}</TokenSymbol>
          <Expiry>
            <Widget
              src="bluebiu.near/widget/Arbitrum.Pendle.FormatExpiryDate"
              props={{
                date: props.expiry,
              }}
            />
          </Expiry>
        </div>
      </TokenWrapper>
    </OutPutItem>
    <OutPutItem>
      <AmountWrapper>
        <Amount>{state.amount || 0}</Amount>
        <Value>≈ ${formatValue(yt)}</Value>
      </AmountWrapper>
      <TokenWrapper>
        <TokenIcon src={yt.proIcon} />
        <div>
          <TokenSymbol>{yt.proSymbol}</TokenSymbol>
          <Expiry>
            <Widget
              src="bluebiu.near/widget/Arbitrum.Pendle.FormatExpiryDate"
              props={{
                date: props.expiry,
              }}
            />
          </Expiry>
        </div>
      </TokenWrapper>
    </OutPutItem>
  </OutPut>
);
