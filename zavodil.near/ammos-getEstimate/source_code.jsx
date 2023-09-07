const { tokenIn, tokenOut, amountIn, tokenOutDecimals, loadRes } = props;

State.init({ res: { tokenIn, tokenOut, amountIn } });

const middlePool =
  props.middlePool ?? "0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE";

const useMiddlePool = tokenIn !== middlePool && tokenOut !== middlePool;

const WMNT = "0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8";
const MNT = "0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000";

if (tokenIn == MNT) {
  tokenIn = WMNT;
}

if (tokenOut == MNT) {
  tokenOut = WMNT;
}

const optionDirectSwap = {
  name: "directSwap",
  path: [tokenIn, tokenOut],
};

const optionMiddlePoolSwap = {
  name: "middlePoolSwap",
  path: [tokenIn, middlePool, tokenOut],
};

const swapOptions = useMiddlePool
  ? [optionMiddlePoolSwap, optionDirectSwap]
  : [optionDirectSwap];

if (state.res.amountIn !== amountIn) {
  const resetObject = { amountIn };
  swapOptions.map((option) => (resetObject[option.name] = undefined));

  console.log("resetObject", resetObject);
  State.update({
    res: Object.assign(state.res ?? {}, resetObject),
  });
}

const quoterContractId =
  props.quoterContractId ?? "0x42cE770b8B765938De04984e006c1B54F1A567f8";
const sqrtPriceLimitX96 = props.sqrtPriceLimitX96 ?? 0;

const quoterABI =
  props.quoterABI ??
  "https://gist.githubusercontent.com/zavodil/008e400b78a6c06456499bf800ce6c0f/raw/5ea3c4302296444b9bc8ada5cfbaf005fd7e6702/ammos-quorter.txt";

const quoterContractJson = fetch(quoterABI);
if (!quoterContractJson.ok) {
  return "";
}

const getEstimate = (path, name) => {
  console.log("path", path);
  const abi = JSON.parse(quoterContractJson.body);
  const iface = new ethers.utils.Interface(abi);
  const tokenInAddress = path[0];
  const tokenOutAddress = path[path.length - 1];

  const feeList = [100, 500, 3000, 10000];
  feeList.map((fee) => {
    console.log("check fee", fee);

    const inputs = [
      {
        tokenIn: tokenInAddress,
        tokenOut: tokenOutAddress,
        amountIn: amountIn,
        fee: fee,
        sqrtPriceLimitX96: 0,
      },
    ];
    console.log("inputs", inputs);

    const encodedData = iface.encodeFunctionData(
      "quoteExactInputSingle",
      inputs
    );

    Ethers.provider()
      .call({
        to: quoterContractId,
        data: encodedData,
      })
      .then((data) => {
        console.log("data", data);
        const decodedData = iface.decodeFunctionResult(
          "quoteExactInputSingle",
          data
        );

        // decodedData = [amountOut, fee]
        const amountOut = decodedData[0];
        //const fee = decodedData[1];

        const estimate = Big(amountOut.toString())
          .div(Big(10).pow(tokenOutDecimals))
          .toFixed(18);

        console.log(
          "estimate",
          estimate,
          fee,
          state.res[name].estimate,
          state.res,
          name
        );
        if (
          parseFloat(estimate) > parseFloat(state.res[name]?.estimate ?? "0")
        ) {
          State.update({
            res: Object.assign(state.res ?? {}, {
              [name]: { estimate, path, fee },
            }),
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
};

swapOptions.map((option) => {
  if (state.res[option.name] === undefined) {
    getEstimate(option.path, option.name);
  }
});

const allDataReceived = swapOptions.reduce(
  (accumulator, option) => accumulator && state.res[option.name] !== undefined,
  true
);

if (state.res !== undefined && allDataReceived) {
  if (props.debug) {
    console.log("res", state.res);
    if (typeof loadRes !== "function") {
      loadRes = (res) => {
        return <div>{JSON.stringify(res)}</div>;
      };
    }
  }

  if (typeof loadRes === "function") {
    let res = state.res;

    res.estimate = 0;
    res.path = "";

    swapOptions.map((option) => {
      let estimate = parseFloat(state.res[option.name].estimate);
      if (res.estimate < estimate) {
        res.estimate = estimate;
        res.path = state.res[option.name].path;
        res.fee = state.res[option.name].fee;
      }
    });

    return loadRes(res);
  }
}
