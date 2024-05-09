const {
  updater,
  routerAddress,
  DVMFactory,
  DPPFactory,
  DSPFactory,
  wethAddress,
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  onLoad,
  slippage,
  account,
  multicall,
  multicallAddress,
  rpc,
} = props;

useEffect(() => {
  if (!updater) return;

  if (
    (!inputCurrency.address && !inputCurrency.isNative) ||
    (!outputCurrency.address && !outputCurrency.isNative) ||
    !inputCurrencyAmount
  ) {
    return;
  }

  const wrapType =
    inputCurrency.isNative && outputCurrency.address === wethAddress
      ? 1
      : inputCurrency.address === wethAddress && outputCurrency.isNative
      ? 2
      : 0;

  if (wrapType) {
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
    let params = [];
    let options = {};
    let method = "";
    if (wrapType === 1) {
      method = "deposit";
      options.value = ethers.utils.parseEther(
        Big(inputCurrencyAmount).toFixed(18).toString()
      );
    } else {
      method = "withdraw";
      params = [
        ethers.utils.parseEther(
          Big(inputCurrencyAmount).toFixed(18).toString()
        ),
      ];
    }
    const returnData = {
      inputCurrency,
      inputCurrencyAmount,
      outputCurrency,
      outputCurrencyAmount: inputCurrencyAmount,
      noPair: false,
      routes: null,
      routerStr: "",
      gas: "",
    };
    const getTx = (_gas) => {
      WethContract.populateTransaction[method](...params, {
        ...options,
        gasLimit: _gas || 4000000,
      })
        .then((res) => {
          onLoad({
            ...returnData,
            gas: _gas,
            unsignedTx: res,
          });
        })
        .catch((err) => {
          onLoad({
            ...returnData,
          });
        });
    };
    const estimateGas = () => {
      WethContract.estimateGas[method](...params, options)
        .then((_gas) => {
          getTx(_gas);
        })
        .catch((err) => {
          console.log(err);
          getTx();
        });
    };
    estimateGas();
    return;
  }

  const amount = ethers.utils.parseUnits(
    Big(inputCurrencyAmount || 0).toFixed(inputCurrency.decimals),
    inputCurrency.decimals
  );

  const path = [
    inputCurrency.address === "native"
      ? "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      : inputCurrency.address,
    outputCurrency.address === "native"
      ? "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      : outputCurrency.address,
  ];
  const getAmountsOut = () => {
    const params = encodeURIComponent(
      `chainId=${inputCurrency.chainId}&fromAmount=${amount}&fromTokenAddress=${
        path[0]
      }&toTokenAddress=${path[1]}&rpc=${rpc}&slippage=${
        slippage * 100 || 0.5
      }&userAddr=${account}`
    );
    asyncFetch(`/dapdap/dodo/swap?params=${params}`)
      .then((res) => {
        const data = res.body?.data?.data;
        if (data?.resAmount) {
          const wallet = Ethers.provider().getSigner();
          const returnData = {
            inputCurrency,
            inputCurrencyAmount,
            outputCurrency,
            outputCurrencyAmount: data.resAmount,
            priceImpact: data.priceImpact,
            noPair: false,
            routerAddress: data.targetApproveAddr,
          };
          wallet
            .estimateGas({
              to: data.to,
              data: data.data,
              value: inputCurrency.isNative ? amount : 0,
            })
            .then((gasRes) => {
              const tx = {
                from: account,
                to: data.to,
                value: inputCurrency.isNative ? amount : 0,
                data: data.data,
                gasLimit: gasRes,
              };
              onLoad({
                ...returnData,
                gas: gasRes,
                unsignedTx: tx,
              });
            })
            .catch((err) => {
              console.log("err");
              onLoad(returnData);
            });
        } else {
          onLoad({
            inputCurrency,
            inputCurrencyAmount,
            outputCurrency,
            outputCurrencyAmount: "",
            noPair: true,
          });
        }
      })
      .catch((err) => {
        onLoad({
          inputCurrency,
          inputCurrencyAmount,
          outputCurrency,
          outputCurrencyAmount: "",
          noPair: true,
        });
      });
  };

  getAmountsOut();
}, [updater]);
