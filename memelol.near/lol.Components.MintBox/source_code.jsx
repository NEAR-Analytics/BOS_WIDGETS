const { contractName, canMint } = props;
const { Button } = VM.require(`memelol.near/widget/lol.Components.Button`);

const OneNear = Big(10).pow(24);
const TGas = Big(10).pow(12);

const [boxAmount, setBoxAmount] = useState(1);

const handleMint = () => {
  if (handleError() || !context.accountId || !canMint) return;

  const data = {
    contractName,
    methodName: "open_box",
    deposit: OneNear.mul(0.05),
    gas: TGas.mul(250),
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

    .button.disabled {
      opacity: 0.5;
    }

    input[type="number"] {
      border-radius: 10px;
      border: 3px solid;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0px 20px 30px 0px rgba(0, 0, 0, 0.25);
      font-size: 24px;
      font-weight: 800;
      padding: 15px;
      width: 100px;

      &:disabled {
        opacity: 0.5;
      }

      @media screen and (max-width: 786px) {
        width: 100%;
        text-align: center;
      }
    }

    @media screen and (max-width: 786px) {
      width: 100%;
      flex-direction: column;
    }
  }

  .error {
    margin: 10px 0;
    font-size: 16px;
    color: red;
  }
`;

return (
  <MintSection className="d-flex gap-2 flex-column align-items-center">
    <div className="wrapper d-flex gap-2 justify-content-center">
      <input
        type="number"
        disabled={!context.accountId || !canMint}
        onInput={(e) => setBoxAmount(e.target.value)}
        value={boxAmount}
      />
      <Button
        className={`button ${
          !canMint || handleError() || !context.accountId ? "disabled" : ""
        }`}
        onClick={handleMint}
      >
        <span>Mint Box{boxAmount > 1 ? "es" : ""}</span>
        <i className="bi bi-chevron-right" />
      </Button>
    </div>
    <div className="error">{handleError()}</div>
  </MintSection>
);
