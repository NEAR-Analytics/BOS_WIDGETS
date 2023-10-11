const uniswapV2RouterContract = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const uniswapABI = fetch(
  "http://api.etherscan.io/api?module=contract&action=getabi&address=0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D&format=raw"
);

const iface = new ethers.utils.Interface(uniswapABI.body);
const tokenDecimals = 18;
const options = [
  { name: "APPLE", price: 5 },
  { name: "BANANA", price: 0 },
];

State.init({
  options: options,
  fruitSelection1: options[0],
  fruitSelection2: options[1],
  feeTier: 0.05,
  showButtons: false,
  priceLow: 0,
  priceHigh: 0,
  web3connectLabel: "Connect Wallet",
});

if (!state.theme) {
  State.update({
    theme: styled.div`
        font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        ${cssFont}
        ${css}

        .container {
            display: flex;
            justify-content: space-between; 
            align-items: center;
            margin-bottom: 10px;
          }

          .centered-container {
            display: flex;
            justify-content: center; /* Centers horizontally */
            align-items: center;     /* Centers vertically */
            margin-top: 10px;
            margin-bottom: 10px;
          }
          
    `,
  });
}

const Theme = state.theme;
const web3connectLabel = state.web3connectLabel || "n/a";

const handleMaxClick = () => {
  console.log("MAX clicked!");
  // Add functionality for max click here
};

const handleApprove = () => {
  console.log("Approve clicked!");
  // Add functionality for approve here
};

const toggleShowButtons = () => {
  State.update({ showButtons: !state.showButtons });
};

return (
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
            <p>{}</p>
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
          <span>Select Pair</span>
          <div className="container">
            <select
              value={state.fruitSelection1.name}
              onChange={(e) => {
                const selectedOption = state.options.find(
                  (option) => option.name === e.target.value
                );
                State.update({ fruitSelection1: selectedOption });
              }}
            ></select>

            <select
              value={state.fruitSelection2}
              onChange={(e) =>
                State.update({ fruitSelection2: e.target.value })
              }
            ></select>
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
              <button>0.01%</button>
              <button>0.05%</button>
              <button>0.3%</button>
              <button>1%</button>
            </div>
          )}
        </div>

        {/* Third div */}
        <div class="card-body">
          <span>Set Price Range</span>
          <button>Full Range</button>
          <button>{state.fruitSelection1.name}</button>
          <button>{state.fruitSelection2.name}</button>
          <div>
            <span>Price</span>
            <input
              type="number"
              value={state.priceLow}
              onChange={(e) =>
                State.update({ priceLow: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <span>Price</span>
            <input
              type="number"
              value={state.priceLow}
              onChange={(e) =>
                State.update({ priceLow: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <span>Current Price</span>
            <span>
              {state.fruitSelection1.name} per {state.fruitSelection2.name}
            </span>
          </div>
        </div>

        {/* Fourth div */}
        <div class="card-body">
          <span>Deposit Amounts</span>
          <div>
            <input type="text" />
            <span>{state.fruitSelection1.name}</span>
            <span>Balance: 100USD</span>
            <a href="#" onClick={handleMaxClick}>
              MAX
            </a>
          </div>
          <div>
            <input type="text" />
            <span>{state.fruitSelection2.name}</span>
            <span>Balance: 100USD</span>
            <a href="#" onClick={handleMaxClick}>
              MAX
            </a>
          </div>
          <div>
            <p>Estimated Transaction Cost: {}</p>
          </div>
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
          <div>
            {state.fruitSelection1.name + " / " + state.fruitSelection2.name}
          </div>
          <div>In Range 🟢</div>
        </div>
        <div class="card m-3 p-3">
          <div className="container">
            <div>{state.fruitSelection1.name}</div>
            <div>{state.fruitSelection1.price}</div>
          </div>
          <div className="container">
            <div>{state.fruitSelection2.name}</div>
            <div>{state.fruitSelection2.price}</div>
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
            <button>{state.fruitSelection1.name}</button>
            <button>{state.fruitSelection2.name}</button>
          </div>
        </div>
        <div className="container p-2 center">
          <div>
            <p>Selected range</p>
          </div>
          <div>
            <button>{state.fruitSelection1.name}</button>
            <button>{state.fruitSelection2.name}</button>
          </div>
        </div>
        <div className="container">
          <div class="card m-3 p-3">
            <div className="centered-container">
              <div>
                <p>MIN Price</p>
                {state.fruitSelection1.name}
                {state.fruitSelection1.price}
                {state.fruitSelection1.name +
                  " per " +
                  state.fruitSelection2.name}
                <p>
                  Your position will be 100% composed of{" "}
                  {state.fruitSelection1.name} at this price
                </p>
              </div>
            </div>
          </div>
          <div class="card m-3 p-3">
            <div className="centered-container">
              <div>
                <p>MAX Price</p>
                {state.fruitSelection1.name}
                {state.fruitSelection1.price}
                {state.fruitSelection1.name +
                  " per " +
                  state.fruitSelection2.name}
                <p>
                  Your position will be 100% composed of{" "}
                  {state.fruitSelection1.name} at this price
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="centered-container">
          <div class="card m-3 p-3">
            <div>
              <p>MAX Price</p>
              {state.fruitSelection1.name}
              {state.fruitSelection1.price}
              {state.fruitSelection1.name +
                " per " +
                state.fruitSelection2.name}
              <p>
                Your position will be 100% composed of{" "}
                {state.fruitSelection1.name} at this price
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
);
