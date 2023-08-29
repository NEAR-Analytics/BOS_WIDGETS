const { tokenIn, tokenOut, amountIn, tokenOutDecimals, loadRes } = props;

State.init({ res: { tokenIn, tokenOut, amountIn } });

const middlePool =
  props.middlePool ?? "0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE";

const useMiddlePool = tokenIn !== middlePool && tokenOut !== middlePool;

const WMNT = "0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8";
const MNT = "0xdEAddEaDdeadDEadDEADDEAddEADDEAddead0000";

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
  props.quoterContractId ?? "0x9488C05a7b75a6FefdcAE4f11a33467bcBA60177";
const sqrtPriceLimitX96 = props.sqrtPriceLimitX96 ?? 0;

const quoterABI =
  props.quoterABI ??
  "https://gist.githubusercontent.com/zavodil/a9f97cdace5b2050e0895ae9ff4a0d03/raw/9bbd537c5d5a73f179ef31d3a62f09beb87cc198/Quoter.Agni.json";

const quoterContractJson = fetch(quoterABI);
if (!quoterContractJson.ok) {
  return "";
}

const encodePath = (path, fees) => {
  if (path.length != fees.length + 1) {
    throw new Error("path/fee lengths do not match");
  }

  let encoded = "0x";
  for (let i = 0; i < fees.length; i++) {
    // 20 byte encoding of the address
    encoded += path[i].slice(2);
    // 3 byte encoding of the fee
    encoded += fees[i].toString(16).padStart(2 * FEE_SIZE, "0");
  }
  // encode the final token
  encoded += path[path.length - 1].slice(2);

  return encoded.toLowerCase();
};

const getEstimate = (path, name) => {
  console.log("path", path);
  const abi = JSON.parse(quoterContractJson.body);
  const iface = new ethers.utils.Interface(abi);

  const fees = path.length == 2 ? ["000064"] : ["0001f4", "000064"];

  const pathBytes = encodePath(path, fees);
  console.log("pathBytes", pathBytes);

  const inputs = [pathBytes, amountIn];

  const encodedData = iface.encodeFunctionData("quoteExactInput", inputs);

  Ethers.provider()
    .call({
      to: quoterContractId,
      data: encodedData,
    })
    .then((data) => {
      console.log("data", data);
      const decodedData = iface.decodeFunctionResult("quoteExactInput", data);

      // decodedData = [amountOut, fee]
      const amountOut = decodedData[0];
      const fee = decodedData[1];

      const estimate = Big(amountOut.toString())
        .div(Big(10).pow(tokenOutDecimals))
        .toFixed(18);

      console.log("estimate", estimate);
      State.update({
        res: Object.assign(state.res ?? {}, {
          [name]: { estimate, path, fee },
        }),
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
