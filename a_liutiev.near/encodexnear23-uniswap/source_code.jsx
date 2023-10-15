const uniswapV2RouterContract = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const tokenAContractAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; //WETH
const tokenBContractAddress = `0xdac17f958d2ee523a2206206994597c13d831ec7`; //USDT
const lptokenaddresss = "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc"; //usdt weth
const apiurl =
  "https://api.etherscan.io/api?module=contract&action=getabi&address";
const apikey = "HXXJWINJIBIRGIIUY9Q9FZ2G377BWEEJAK";

const tokenAABI = fetch(`${apiurl}=${tokenAContractAddress}&apikey=${apikey}`);
const tokenBABI = fetch(`${apiurl}=${tokenBContractAddress}&apikey=${apikey}`);
const lpABI = fetch(`${apiurl}=${lptokenaddresss}&apikey=${apikey}`);
const uniswapABI = fetch(
  "https://unpkg.com/@uniswap/v2-periphery@1.1.0-beta.0/build/IUniswapV2Router02.json"
);

const tokenDecimalsETH = 18;
const tokenDecimalsUSDT = 6;
const fixedDecimals = 5;

const options = [
  { name: "WETH", price: 5, maxAmount: 0.001, minSlippage: 0.01 },
  { name: "USDT", price: 0, maxAmount: 1.5483, minSlippage: 0.01 },
];

State.init({
  options: options,
  coinA: options[0],
  coinB: options[1],
  feeTier: 0.05,
  showButtons: false,
  priceMinA: 0,
  priceMinB: 0,
  web3connectLabel: "Connect Wallet",
  liquidityResult: null,
  liquidityError: null,
  gasPrice: null,
  estimatedGasLimit: null,
});

const provider = Ethers.provider();
const signer = Ethers.provider();
const gas = {
  gasPrice: ethers.utils.parseUnits("9", tokenDecimalsETH / 2),
  gasLimit: 250000,
};

const uniContract = new ethers.Contract(
  uniswapV2RouterContract,
  uniswapABI.body.abi,
  provider.getSigner()
);

const getDeadline = () => {
  return ethers.BigNumber.from(
    Math.floor(Date.now() / 1000) + offsetSeconds
  ).toHexString();
};

let amountADesired = ethers.utils
  .parseUnits(
    parseFloat(state.coinA.maxAmount).toFixed(fixedDecimals),
    tokenDecimalsETH
  )
  .toHexString();

let amountBDesired = ethers.utils
  .parseUnits(
    parseFloat(state.coinB.maxAmount).toFixed(fixedDecimals + 3),
    tokenDecimalsUSDT
  )
  .toHexString();

let amountAMin = ethers.utils
  .parseUnits(
    parseFloat(state.coinA.maxAmount * (1 - state.coinA.minSlippage)).toFixed(
      fixedDecimals
    ),
    tokenDecimalsETH
  )
  .toHexString();

let amountBMin = ethers.utils
  .parseUnits(
    parseFloat(state.coinB.maxAmount * (1 - state.coinB.minSlippage)).toFixed(
      fixedDecimals
    ),
    tokenDecimalsUSDT
  )
  .toHexString();

let lpAmountRaw = "0.00000001663";
let lpAmount = ethers.utils
  .parseUnits(lpAmountRaw, tokenDecimalsETH)
  .toHexString();

let to = state.sender;
let tokenAabi = tokenAABI.body.result;
let tokenBabi = tokenBABI.body.result;
let lpabi = lpABI.body.result;
let factory = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
let pair;

if (!state.theme) {
  State.update({
    theme: styled.div`
        font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        ${cssFont}
        ${css}
        .container {
            display: flex; justify-content: space-between;align-items: center; margin-bottom: 10px;
          }
        .centered-container { display: flex; justify-content: center; align-items: center;margin-top: 10px; margin-bottom: 10px;
          }
    `,
  });
}

const Theme = state.theme;
const web3connectLabel = state.web3connectLabel || "n/a";

// FRONT END CONTROLS
const handleIncrement = () => {
  State.update((prev) => ({ price: prev.price + 0.1 }));
};

const handleDecrement = () => {
  if (state.price > 0) State.update((prev) => ({ price: prev.price - 0.1 }));
};

const handleMaxClick = () => {
  console.log("MAX clicked!");
  // Add functionality for max click here
};

const handleApprove = () => {
  console.log("Approve clicked!");
  // Add functionality for approve here
};

const updateOptionPrice = (name, newPrice) => {
  const updatedOptions = state.options.map((option) => {
    if (option.name === name) {
      return { ...option, price: newPrice };
    }
    return option;
  });
  State.update({ options: updatedOptions });
};

const toggleShowButtons = () => {
  State.update({ showButtons: !state.showButtons });
};

// HELPER FUNCTIONS/STATE
if (state.txCost === undefined) {
  const gasEstimate = ethers.BigNumber.from(1875000);
  const gasPrice = ethers.BigNumber.from(1500000000);

  const gasCostInWei = gasEstimate.mul(gasPrice);
  const gasCostInEth = ethers.utils.formatEther(gasCostInWei);

  let responseGql = fetch(
    "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
          bundle(id: "1" ) {
            ethPrice
          }
        }`,
      }),
    }
  );

  if (!responseGql) return "";

  const ethPriceInUsd = responseGql.body.data.bundle.ethPrice;
  const txCost = Number(gasCostInEth) * Number(ethPriceInUsd);
  State.update({ txCost: `$${txCost.toFixed(2)}` });
}

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    console.log("set sender", accounts[0]);
  }
}

const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};

const addLiquidityUni = () => {
  const tokenAcontract = new ethers.Contract(
    tokenAContractAddress,
    tokenAabi,
    provider.getSigner()
  );

  tokenAcontract
    .approve(uniswapV2RouterContract, amountADesired)
    .then((response) => {
      console.log("response token A GOOD --------", response);
    })
    .catch((error) => {
      console.log("Error A:", error);
    });

  const tokenBcontract = new ethers.Contract(
    tokenBContractAddress,
    tokenBabi,
    provider.getSigner()
  );
  tokenBcontract
    .approve(uniswapV2RouterContract, amountBDesired, gas)
    .then((response) => {
      console.log("response token B GOOD --------", response);
      uniContract
        .addLiquidity(
          tokenAContractAddress,
          tokenBContractAddress,
          amountADesired,
          amountBDesired,
          amountAMin,
          amountBMin,
          to,
          getDeadline(),
          gas
        )
        .then((response) => {
          console.log("response UNI is " + JSON.stringify(response));
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    })
    .catch((error) => {
      console.log("Error B:", error);
    });
  return;
};

const removeLiquidityUni = () => {
  const lpTokenContract = new ethers.Contract(
    lptokenaddresss,
    lpabi,
    provider.getSigner()
  );

  lpTokenContract
    .approve(uniswapV2RouterContract, lpAmount)
    .then((response) => {
      console.log("lp token approve GOOD --------", response);
      uniContract
        .removeLiquidity(
          tokenAContractAddress,
          tokenBContractAddress,
          lpAmount,
          amountAMin,
          amountBMin,
          to,
          getDeadline()
        )
        .then((response) => {
          console.log("lp token remove request --------", response);
        })
        .catch((error) => {
          console.log("Error A:", error);
        });
    })
    .catch((error) => {
      console.log("Error A:", error);
    });
  return;
};

return (
  <div>
    <div>
      <button onClick={addLiquidityUni}>Add Liquidity</button>

      {state.liquidityResult && <div>{state.liquidityResult}</div>}
      {state.liquidityError && (
        <div style={{ color: "red" }}>{state.liquidityError}</div>
      )}
      <button onClick={removeLiquidityUni}>Remove Liquidity</button>
    </div>

    <Theme>
      <div>
        <div className="container">
          <div></div>
          <div>
            <Widget
              src="a_liutiev.near/widget/button_web3connect"
              props={{ web3connectLabel }}
            />
          </div>
        </div>
        <div>
          <br></br>
        </div>

        <div class="card">
          <div class="card-header">
            <div className="container">
              <div>
                <p>Pools</p>
              </div>
              <div>
                <button class="btn btn-primary m-0 p-1">
                  <p>New Position</p>
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="centered-container">
              <div>
                <p>Your active V3 liquidity positions will appear here.</p>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div className="centered-container">
              <p>{getSender()}</p>
            </div>
          </div>
        </div>

        <div>
          <br></br>
        </div>

        <div class="card">
          {/* First div */}
          <div class="card-header p-3">
            <div className="container">
              <div>
                <a href="#">←</a>
                <span>Add Liquidity</span>
              </div>
              <div>
                <a href="#">Clear All</a>
                <span>
                  <a href="#">⚙️</a>
                </span>
              </div>
            </div>
          </div>

          {/* Second div */}
          <div class="card-body">
            <div className="container">
              <span>Select Pair</span>
            </div>
            <div className="container">
              <select
                value={state.coinA.name}
                onChange={(e) => {
                  const selectedOption = state.options.find(
                    (option) => option.name === e.target.value
                  );
                  State.update({ coinA: selectedOption });
                }}
              >
                {state.options.map((option) => (
                  <option value={option.name} key={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>

              <select
                value={state.coinB.name}
                onChange={(e) => {
                  const selectedOption = state.options.find(
                    (opt) => opt.name === e.target.value
                  );
                  State.update({ coinB: selectedOption });
                }}
              >
                {state.options
                  .filter((option) => option.name === "banana")
                  .concat(
                    state.options.filter((option) => option.name !== "banana")
                  )
                  .map((option) => (
                    <option value={option.name} key={option.name}>
                      {option.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="container">
              <input
                type="text"
                value={state.feeTier}
                placeholder="Fee Tier"
                onChange={(e) => State.update({ feeTier: e.target.value })}
              />
              <button onClick={toggleShowButtons}>Edit</button>
            </div>
            {state.showButtons && (
              <div className="container">
                <button onClick={() => State.update({ feeTier: 0.001 })}>
                  0.01%
                </button>
                <button onClick={() => State.update({ feeTier: 0.005 })}>
                  0.05%
                </button>
                <button onClick={() => State.update({ feeTier: 0.003 })}>
                  0.3%
                </button>
                <button onClick={() => State.update({ feeTier: 0.01 })}>
                  1%
                </button>
              </div>
            )}
          </div>

          {/* Third div */}
          <div class="card-body">
            <div class="container">
              <span>Set Price Range</span>

              <div>
                <button>Full Range</button>
                <button>{state.coinA.name}</button>
                <button>{state.coinB.name}</button>
              </div>
            </div>
            <div class="container">
              <span class="p-2">Price</span>
              <input
                type="number"
                value={state.priceMinA}
                onChange={(e) =>
                  State.update({ priceMinA: Number(e.target.value) })
                }
              />
            </div>
            <div class="container">
              <span class="p-2">Price</span>
              <input
                type="number"
                value={state.priceMinB}
                onChange={(e) =>
                  State.update({ priceMinB: Number(e.target.value) })
                }
              />
            </div>
            <div class="container">
              <span>Current Price</span>
              <span>
                {state.coinA.name} per {state.coinB.name}
              </span>
            </div>
          </div>

          {/* Fourth div */}
          <div class="card-body">
            <span>Deposit Amounts</span>
            <div>
              <input type="text" />
              <span>{state.coinA.name}</span>
              <span>Balance: 100USD</span>
              <a href="#" onClick={handleMaxClick}>
                MAX
              </a>
            </div>
            <div>
              <input type="text" />
              <span>{state.coinB.name}</span>
              <span>Balance: 100USD</span>
              <a href="#" onClick={handleMaxClick}>
                MAX
              </a>
            </div>

            <p>Estimated Transaction Cost: {state.txCost}</p>
          </div>

          {/* Pill button */}
          <div class="card-footer">
            <div className="centered-container">
              <button
                style={{ borderRadius: "20px", width: "300px" }}
                onClick={handleApprove}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
        {/* Third div 
            <div>
                <button>
                    <p>Show closed positions</p>
                </button>
            </div>
            */}
      </div>
      <div class="card m-3">
        <div class="card-header">
          <div className="centered-container">
            <div>
              <p>Add Liquidity</p>
            </div>
          </div>
        </div>

        <div class="card-body">
          <div className="container">
            <div>{state.coinA.name + " / " + state.coinB.name}</div>
            <div>In Range 🟢</div>
          </div>
          <div class="card m-3 p-3">
            <div className="container">
              <div>{state.coinA.name}</div>
              <div>{state.coinA.price}</div>
            </div>
            <div className="container">
              <div>{state.coinB.name}</div>
              <div>{state.coinB.price}</div>
            </div>
            <br></br>
            <div className="container">
              <div>
                <p>Fee tier</p>
              </div>
              <div>{state.feeTier + "%"}</div>
            </div>
          </div>
          <div className="container p-2 center">
            <div>
              <p>Selected range</p>
            </div>
            <div>
              <button>{state.coinA.name}</button>
              <button>{state.coinB.name}</button>
            </div>
          </div>
          <div className="container p-2 center">
            <div>
              <p>Selected range</p>
            </div>
            <div>
              <button>{state.coinA.name}</button>
              <button>{state.coinB.name}</button>
            </div>
          </div>
          <div className="container">
            <div class="card m-3 p-3">
              <div className="centered-container">
                <div>
                  <p>MIN Price</p>
                  {state.coinA.name}
                  {state.coinA.price}
                  {state.coinA.name + " per " + state.coinB.name}
                  <p>
                    Your position will be 100% composed of {state.coinA.name} at
                    this price
                  </p>
                </div>
              </div>
            </div>
            <div class="card m-3 p-3">
              <div className="centered-container">
                <div>
                  <p>MAX Price</p>
                  {state.coinA.name}
                  {state.coinA.price}
                  {state.coinA.name + " per " + state.coinB.name}
                  <p>
                    Your position will be 100% composed of {state.coinA.name} at
                    this price
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="centered-container">
            <div class="card m-3 p-3">
              <div>
                <p>MAX Price</p>
                {state.coinA.name}
                {state.coinA.price}
                {state.coinA.name + " per " + state.coinB.name}
                <p>
                  Your position will be 100% composed of {state.coinA.name} at
                  this price
                </p>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <div className="centered-container">
              <button
                style={{ borderRadius: "20px", width: "300px" }}
                onClick={handleApprove}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </Theme>
  </div>
);
