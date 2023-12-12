const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(6px);
  background-color: rgba(0, 0, 0, 0.5);

  .content {
    color: black;
    padding: 4rem;
    margin: 4rem;
    background-color: white;
    border-radius: 4px;
    border: 1px solid #ccc;
    max-width: 800px;
  }

  h2 {
    font-size: 1.2rem;
    padding: 0.5rem 0;
  }

  button {
    all: unset;
  }

  .CheckboxRoot {
    background-color: #000;
    min-width: 20px;
    height: 20px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .CheckboxIndicator {
    color: white;
  }

  .Label {
    padding-left: 15px;
    line-height: 1.4rem;
  }

  div.checks {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  div.cb {
    display: flex;
  }

  a {
    color: black;
    text-decoration: underline;
  }

  button.agree {
    cursor: pointer;
    background-color: #000;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
  }
`;

State.init({
  isAgreed: false,
  cb1: false,
  cb2: false,
  cb3: false,
});

const { isAgreed, cb1, cb2, cb3 } = state;

const handleAgree = () => {
  if (cb1 && cb2 && cb3) {
    State.update({ isAgreed: true });
  }
};

if (isAgreed) {
  return <div />;
}

return (
  <Container>
    <div className="content">
      <h1>Disclaimer</h1>
      <h2>
        Please check the boxes below to confirm you have read and understand the
        following disclaimers:
      </h2>
      <div className="checks">
        <div className="cb">
          <Checkbox.Root
            className="CheckboxRoot"
            id="c1"
            checked={cb1}
            onCheckedChange={(cb1) => State.update({ cb1 })}
          >
            <Checkbox.Indicator className="CheckboxIndicator">
              <i class="bi bi-check" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label className="Label" htmlFor="c1">
            I acknowledge and agree that the BOS Showcase is for informational
            purposes only.
          </label>
        </div>
        <div className="cb">
          <Checkbox.Root
            className="CheckboxRoot"
            id="c2"
            checked={cb2}
            onCheckedChange={(cb2) => State.update({ cb2 })}
          >
            <Checkbox.Indicator className="CheckboxIndicator">
              <i class="bi bi-check" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label className="Label" htmlFor="c2">
            I acknowledge and agree that the developer or developers of the BOS
            Showcase component have no control over any blockchain, blockchain
            protocol, smart contract, or blockchain-based applications.
          </label>
        </div>
        <div className="cb">
          <Checkbox.Root
            className="CheckboxRoot"
            id="c3"
            checked={cb3}
            onCheckedChange={(cb3) => State.update({ cb3 })}
          >
            <Checkbox.Indicator className="CheckboxIndicator">
              <i class="bi bi-check" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label className="Label" htmlFor="c3">
            Any interaction with a component or blockchain based application
            layer protocol is a locally run instance by me and not known to or
            otherwise under the control of the developer or developers of the
            Software.
          </label>
        </div>
      </div>
      <button className="agree" onClick={handleAgree}>
        I Agree
      </button>
    </div>
  </Container>
);
