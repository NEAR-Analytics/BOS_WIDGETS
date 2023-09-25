const CreatePrompt = styled.div`
        color: #FFE7C3;
        margin:auto;
        width:100%;
        max-width: 420px;
        padding: 1.5rem;
        border-radius: .7rem;
        h1 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 2rem;
        }
        input, textarea {
            color: #CB4439 !important;
            background-color: #FFE7C3 !important;
            resize: none;
            border-radius: 5px 0px 0px 5px;
            box-shadow: 3px 3px 3px rgba(0,0,0,.3);
            &:active {
              background-color: #FFE7C3 !important;
            }
            &::placeholder {
                font-size: .8rem;
                color: #CB4439;
            }
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
            }

            &:placeholder-shown {
                & + label {
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-1rem);
                }
                & + .eth-label {
                    opacity: 0;
                    visibility: hidden;
                    transform: translateX(-18rem);
                }
            }

        }

        label {
            font-size: .8rem;
            color: rgba(0,0,0,.4);
            margin-left: .8rem;
            margin-top: .2rem;
            display: block;
            transition: all .3s;
        }

        ul { 
          list-style-type: none;
          position: relative;
        }

        li {
          width: 100%;
          position: absolute;
          border: 1px solid rgba(0,0,0, .1);
          top: 2px;
          left: 0;
          padding: 8px;
          border-radius: 5px; 
          background-color: white;
          box-shadow: 1px 4px 8px rgba(0,0,0,.2);
          font-size: .8rem;

          &:hover {
            cursor: pointer;
            background-color: #f0eded;
          }
        }

        .eth-label {
            margin-top: -1.7rem;
            margin-left: 19rem;
            margin-bottom: 2.6rem;
        }
        .form-group {
            margin-bottom: .5rem;
        }
        .selected {
          display: none;
        }
`;

const Button = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:bold;
    color:#fff;
    width:100%;
    height:50px;
    border-radius: 0px 5px 5px 0px;
    background-color:#CB4439;
    text-align:center;
    cursor: pointer;
    user-select: none;
    box-shadow: 3px 3px 6px 1px rgba(0,0,0,.3);

    &:active {
      box-shadow: 0 0 0 rgba(0,0,0,0);
      transform: translateY(2px);
    }
`;

const Command = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:bold;
    font-size: 14px;
    color:#CB4439;
    background-color: #FFE7C3;
    width:80%;
    height:40px;
    border-radius: 5px;
    text-align:center;
    cursor: pointer;
    user-select: none;
    box-shadow: 0 3px 3px rgba(0,0,0,.3);
    border: 3px solid black;
    margin-top: 10px;
    margin-bottom: 10px;

    &:active {
      box-shadow: 0 0 0 rgba(0,0,0,0);
      transform: translateY(2px);
      background-color:gray;
    }

    &:hover {
      box-shadow: 0 0 0 rgba(0,0,0,0);
      transform: translateY(2px);
      background-color:gray;
    }

    @media (min-width: 768px) {
        width: 300px;
    }

`;

const ButtonContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    width: 650px!important;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

// check if correct chain
const { chainId } = Ethers.getNetwork();
const chainIdToSwitch = "0x66eed";
const switchChain = () => {
  const goerliChain = {
    chainId: "0x66eed", // The chain ID for Aurora (1313161554 in hexadecimal)
    chainName: "Arbitrum Goerli", // The name of the Aurora chain
    nativeCurrency: {
      name: "GoerliETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://arbitrum-goerli.publicnode.com"], // The RPC endpoint for the Aurora chain
    blockExplorerUrls: ["https://goerli.arbiscan.io/"], // The block explorer URL for Aurora
  };

  Ethers.send("wallet_addEthereumChain", [goerliChain]);
};

if (chainId !== 421613) {
  return (
    <div style={{ margin: "auto", textAlign: "center" }}>
      <h2>Please switch to Goerli</h2>
      <br />
      <button onClick={switchChain}>Switch to Goerli</button>
      <br />
      <br />
      <p>**Please refresh once after switch chain**</p>
    </div>
  );
}

initState({
  prompt: null,
  response: "",
  widget: null,
  isLoading: false,
});

const buttonList = [
  "View my balances",
  "Borrow 10 SUS using 0.1 WETH",
  "Provide 10 SUS into stability pool",
  "Remove 10 SUS from stability pool",
  "Repay 10 SUS against WETH debt",
  "Withdraw 0.1 WETH",
  "Deposit 0.1 WETH",
  "Close my SUS position for WETH",
]; // Add your button texts here

const resendPrompt = (error) => {
  console.log("Error");
  console.log(error);
  const res = fetch(
    `https://cmvfgq7owf7agld24uu4azhr5m0plyil.lambda-url.us-east-1.on.aws/`,
    {
      method: "POST",
      body: JSON.stringify({
        prompt: `What is missing from these inputs: ${error.inference} ?`,
      }),
    }
  );

  if (!res.body || res.body.error) return;
  // console.log("getNamesForOwner raw res", res.body);

  const inference = res.body;
  console.log(inference);
  State.update({ response: inference });
};

const sendPrompt = () => {
  State.update({ isLoading: true });

  asyncFetch(
    `https://cmvfgq7owf7agld24uu4azhr5m0plyil.lambda-url.us-east-1.on.aws/`,
    {
      method: "POST",
      body: JSON.stringify({
        prompt: state.prompt,
      }),
    }
  ).then((res) => {
    if (!res.body || res.body.error) return;
    // console.log("getNamesForOwner raw res", res.body);

    const inference = res.body;
    const parsed = JSON.parse(inference);
    if (parsed.action) {
      const widget = (
        <Widget
          src="testbrrr.near/widget/Sus"
          props={{
            ...parsed,
            resendPrompt: resendPrompt,
            // inference: inference,
            // onClose: () => State.update({ response: null }),
          }}
        />
      );
      State.update({ response: parsed.text, widget: widget, isLoading: false });
    } else {
      State.update({ response: inference, isLoading: false });
    }
  });
};

return (
  <div style={{ backgroundColor: "#CB4439" }}>
    <CreatePrompt>
      <div
        style={{
          display: "none",
        }}
      ></div>
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}
      >
        <img
          style={{ width: 120, height: 120 }}
          src="https://ipfs.io/ipfs/bafybeieub4xgdcph5cj4oa6kfskfpm2nj5vtd5xgbkyi7jvgr2pbodscjq/kendallc_Cartoon_logo_for_steak.loans_minimal_colors_solid_colo_575f812c-6e0d-4827-95d3-dac64469271c.png"
        />
      </div>
      <div className="form-group" style={{ display: "flex" }}>
        <input
          id="name"
          type="text"
          placeholder="What is Steak Loans?"
          value={state.prompt}
          onChange={(event) => State.update({ prompt: event.target.value })}
          required
          style={{ width: "80%", height: "50px" }}
        />
        <Button
          onClick={() => sendPrompt()}
          style={{ width: "15%", height: "50px" }}
        >
          <img
            src="https://ipfs.io/ipfs/bafybeigb3yfd3t4qz6sxoz3sfwljmlbth5zrwfindvdjxezyn3rcdeei6m/send%282%29.png"
            alt="arrow"
            style={{ height: "60%" }}
          />
        </Button>
      </div>

      {state.isLoading ? (
        <img
          height="20"
          width="70"
          style={{ margin: 10 }}
          src="https://ipfs.io/ipfs/bafkreidmr43cuwv5kre4fzrum4lgpkkiwwj47nl54hunfsvgutyhocklza"
        />
      ) : null}

      {!state.isLoading ? (
        <p>{state.response ? state.response : null}</p>
      ) : null}

      {!state.isLoading ? state.widget : null}

      <h5 style={{ marginTop: 50, marginBottom: 20 }}>Quick Commands</h5>
    </CreatePrompt>
    <ButtonContainer>
      {buttonList.map((buttonText, index) => (
        <Command
          key={index}
          onClick={() => State.update({ prompt: buttonText })}
        >
          {buttonText}
        </Command>
      ))}
    </ButtonContainer>
  </div>
);
