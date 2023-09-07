const {
  tokenIn,
  tokenOut,
  amountIn,
  tokenInDecimals,
  tokenOutDecimals,
  loadRes,
} = props;

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

  console.log("reset", resetObject);
  State.update({
    res: Object.assign(state.res ?? {}, resetObject),
  });
}

const quoterContractId =
  props.quoterContractId ?? "0x032b241De86a8660f1Ae0691a4760B426EA246d7";
const sqrtPriceLimitX96 = props.sqrtPriceLimitX96 ?? 0;

const quoterABI =
  props.quoterABI ??
  "https://gist.githubusercontent.com/zavodil/d20c267e2f1318f76fdee1a9ce000ac6/raw/2eb1c452e171b6665c353812c268acf7319cf7ca/iziSwap-quoter.txt";

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

  // const fees = path.length == 2 ? ["000064"] : ["0001f4", "000064"];

  //const pathBytes = encodePath(path, fees);
  // console.log("pathBytes", pathBytes);

  console.log("iface", iface);

  const feeList = [100, 500, 3000, 10000];
  feeList.map((fee) => {
    console.log("check fee", fee);
    //const fee = 10000;
    const tokenInAddress = path[0];
    const tokenOutAddress = path[path.length - 1];
    const isX2Y = tokenInAddress.toLowerCase() < tokenOutAddress.toLowerCase();
    const boundaryPt = isX2Y ? -799999 : 799999;
    const amountHex = ethers.utils.parseUnits(amountIn, tokenInDecimals);
    console.log("amountIn", amountIn, amountHex);
    const inputs = isX2Y
      ? [tokenInAddress, tokenOutAddress, fee, amountHex, boundaryPt]
      : [tokenOutAddress, tokenInAddress, fee, amountHex, boundaryPt];
    const method = isX2Y ? "swapX2Y" : "swapY2X";
    console.log("inputs: ", inputs, method);
    const encodedData = iface.encodeFunctionData(method, inputs);
    console.log("encodedData: ", encodedData);
    console.log("quoterContractId: ", quoterContractId);

    return Ethers.provider()
      .call({
        to: quoterContractId,
        data: encodedData,
      })
      .then((data) => {
        console.log("data", data);
        const res = iface.decodeFunctionResult(method, data);
        console.log("resdata: ", res);

        const amountName = isX2Y ? "amountY" : "amountX";

        const rawAmountOut = Big(Number(res[amountName]._hex)).toFixed();
        const estimate = new Big(rawAmountOut)
          .div(Big(10).pow(tokenOutDecimals))
          .toFixed();

        console.log(
          "estimate",
          estimate,
          state.res[name]?.estimate,
          "fee",
          fee
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
  /*
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
    });*/
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
