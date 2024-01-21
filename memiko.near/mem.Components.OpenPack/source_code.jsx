const { contractName, isWhitelisted, startDate } = props;

const OneNear = Big(10).pow(24);
const TGas = Big(10).pow(12);

const [boxAmount, setBoxAmount] = useState(1);
const [canMint, setCanMint] = useState(false);

const repeatInterval = setInterval(() => {
  setCanMint(startDate <= Date.now());
  clearInterval(repeatInterval);
}, 1000);

const handleMint = () => {
  if (handleError() || !context.accountId || !canMint) return;

  const data = {
    contractName,
    methodName: "token_mint",
    deposit: OneNear.mul(0.25),
    gas: TGas.mul(275),
  };

  Near.call(Array(parseInt(boxAmount)).fill(data));
};

const handleError = () => {
  let err = null;

  if (
    !boxAmount ||
    isNaN(boxAmount) ||
    parseInt(boxAmount) < 1 ||
    parseInt(boxAmount) > 100
  )
    err = "Value should be > 0 and <= 100";

  return err;
};

const MintSection = styled.div`
  .wrapper {
    flex-direction: row;
  }

  .open-btn {
    background-color: #66a0ff;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    color: #fff;

    &:hover {
      background-color: #5994f5;
    }

    &:disabled,
    &.disabled {
      border: 4px solid #888888;
      background-color: #999999;
      opacity: 0.5;

      &:hover {
        background-color: #999999;
      }
    }
  }

  .open-select {
    border: 4px solid #66a0ff;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    font-weight: 600;
    color: #000;
    outline: none;

    &:disabled,
    &.disabled {
      border: 4px solid #888888;
      background-color: #dddddd;
      opacity: 0.5;
    }
  }

  .text-sm {
    font-size: 0.9rem;
  }
`;

return (
  <MintSection className="d-flex gap-3 flex-column align-items-center">
    <h2>MEM Token Mint</h2>
    <div
      className={"mt-0 mb-3 text-sm text-center"}
      style={{ width: "60%", margin: "auto" }}
    >
      Open a pack to randomly receive MEM tokens and possibly one of NEAR
      memecoins: NEKO, LONK, BLACKDRAGON, LOL, or Shitzu. Join the whitelist for
      double MEM rewards.
    </div>

    <div className={"text-center"}>
      <Widget
        src="memiko.near/widget/mem.Components.Countdown"
        props={{ startDate: startDate }}
      />
    </div>

    {context.accountId ? (
      <>
        <div className="wrapper d-flex flex-row">
          <select
            value={boxAmount}
            className={"px-3 py-2 open-select"}
            disabled={!context.accountId || !canMint}
            onInput={(e) => setBoxAmount(e.target.value)}
          >
            <option value="1">1</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
          </select>
          <button
            className={`button px-4 py-3 border-0 open-btn ${
              !canMint || !context.accountId ? "disabled" : ""
            }`}
            onClick={handleMint}
          >
            <span>Open MEM Pack{boxAmount > 1 ? "s" : ""}</span>
          </button>
        </div>

        {isWhitelisted ? (
          <div style={{ color: "#279b30", fontSize: "1.5rem" }}>
            🎉 You are WHITELISTED! 🎉
          </div>
        ) : (
          <div className={"text-center mb-1 mt-3"}>
            <p
              className={"mb-0 pb-0"}
              style={{ color: "#bf0808", fontSize: "1.5rem" }}
            >
              😢 Sorry, you are NOT WHITELISTED 😢
            </p>
            <p
              className={"mt-0 mb-0 pt-0 text-center"}
              style={{ width: "72%", margin: "auto", color: "#bf0808" }}
            >
              Open the MEM Packs and share results on Twitter with tag
              #memAirdropJoin to join MEM Airdrop event.
            </p>
          </div>
        )}
      </>
    ) : (
      <div
        className={"text-center"}
        style={{ color: "#bf0808", fontSize: "1.5rem" }}
      >
        Please Sign In with your NEAR account to join!
      </div>
    )}
  </MintSection>
);
