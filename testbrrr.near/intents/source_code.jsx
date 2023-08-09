const CreatePrompt = styled.div`
        margin:auto;
        width:100%;
        max-width: 400px;
        border: 1px solid rgba(0,0,0, .15);
        padding: 1.5rem;
        border-radius: .7rem;
        box-shadow: .3rem .3rem 1rem rgba(0,0,0, .1);
        h1 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 2rem;
        }
        input, textarea {
            resize: none;
            &::placeholder {
                font-size: .8rem;
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
    border-radius:10px;
    background-color:#2fbc2f;
    text-align:center;
    cursor: pointer;
    user-select: none;
    box-shadow: 0 3px 3px rgba(0,0,0,.3);

    &:active {
      box-shadow: 0 0 0 rgba(0,0,0,0);
      transform: translateY(2px);
    }
`;

State.init({
  prompt: null,
  response: "",
  widget: null,
  isLoading: false,
});

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
    // console.log(inference);
    const parsed = JSON.parse(inference);
    if (parsed.action) {
      console.log(parsed.action);
      const widget = (
        <Widget
          src="testbrrr.near/widget/Untitled-1"
          props={{
            ...parsed,
            resendPrompt: resendPrompt,
            inference: inference,
            onClose: () => State.update({ response: null }),
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
  <CreatePrompt>
    <div
      style={{
        display: "none",
      }}
    ></div>

    <h1>Sus Loans</h1>

    {state.widget}

    <div className="form-group">
      <input
        id="name"
        type="text"
        placeholder="What is Sus?"
        value={state.prompt}
        onChange={(event) => State.update({ prompt: event.target.value })}
        required
      />
    </div>

    {state.isLoading ? (
      <img
        height="20"
        width="70"
        style={{ margin: 10 }}
        src="https://ipfs.io/ipfs/bafkreidmr43cuwv5kre4fzrum4lgpkkiwwj47nl54hunfsvgutyhocklza"
      />
    ) : null}

    {!state.isLoading ? <p>{state.response ? state.response : null}</p> : null}

    <Button onClick={() => sendPrompt()}>Send</Button>
  </CreatePrompt>
);
