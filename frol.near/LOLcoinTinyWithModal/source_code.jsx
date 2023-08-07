const balances = Near.view("lolcoin.qbit.near", "ft_balances", {});

if (!balances) {
  return <></>;
}

const send = (accountId, amount) => {
  Near.call(
    "lolcoin.qbit.near",
    "ft_transfer",
    {
      receiver_id: accountId,
      amount: "" + amount * 100,
    },
    30000000000000,
    1
  );
};

const Backdrop = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1001;
`;

const Modal = styled.div`
  width: 30rem;
  max-width: 95vw;
  max-height: 80vh;
  background-color: white;
  border-radius: 10px;
  margin: auto;
  padding: 1.5rem;
  display: flex;
  row-gap: 1rem;
  flex-direction: column;
`;

const ModalContent = styled.div`
display: flex;
flex-direction: column;
flex-grow:1
min-height 0;
overflow-y: auto;
`;

const ModalFooter = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

const AcceptSection = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 1rem;

  .continue-button {
    background: #59E692;
    color: #09342E;
    border-radius: 40px;
    height: 40px;
    padding: 0 35px;
    font-weight: 600;
    font-size: 14px;
    border: none;
    cursor: pointer;
    transition: background 200ms, opacity 200ms;

    &:hover,
    &:focus {
      background: rgb(112 242 164);
      outline: none;
    }

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
`;

State.init({ toggle: false });

return (
  <>
    {state.toggle && (
      <Backdrop>
        <Modal>
          <ModalContent>
            <label>
              Receiver: <input type="text" disabled value={state.accountId} />
            </label>
            <label>
              Amount:{" "}
              <input
                type="text"
                value={state.amount}
                onChange={(e) => {
                  State.update({ amount: e.target.value });
                }}
              />
              LOL
            </label>
          </ModalContent>
          <ModalFooter>
            <button
              onClick={() => {
                send(accountId, parseFloat(state.amount));
                State.update({ toggle: false });
              }}
            >
              Send
            </button>
            <button onClick={() => State.update({ toggle: false })}>
              Exit
            </button>
          </ModalFooter>
        </Modal>
      </Backdrop>
    )}

    <table>
      {balances.map(([accountId, balance]) => (
        <tr>
          <td>{accountId}</td>
          <td>{parseInt(balance) / 100} ЛОЛ</td>
          <td>
            <button
              onClick={() =>
                State.update({ accountId, amount: 0, toggle: true })
              }
            >
              Send
            </button>
          </td>
        </tr>
      ))}
    </table>
  </>
);
