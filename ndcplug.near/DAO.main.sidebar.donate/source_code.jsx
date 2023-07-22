// let amount;
// amount = props.amount;
// let yoctoConvert = amount / 1e24;
let hardcode = 420000000000000000000000; // .6
// let yoctoConvert = props.amount * 1e24;
// let yoctoConvert = hardcode / 1e24;
let yoctoConvert = hardcode * 10;
let reciever = props.reciever ?? "root.near";
let amount = props.amount ?? 1; // start with 1 NEAR

initState({ amount, reciever });

// yoctoConvert = state.amount;

const donate = () => {
  let yoctoConvert1 = state.amount * 1e24;
  Near.call(
    state.reciever,
    "donate",
    {},
    "30000000000000",
    state.amount * 1e24
  );
};
const onChangeAmount = (amount) => {
  State.update({
    amount,
  });
};

// styled div
const Actions = styled.div`
  display: flex;
  gap: 6px;
`;
const FollowButtonWrapper = styled.div`
  width: 100%;
  div,
  button {
    width: 100%;
  }
  @media (max-width: 1200px) {
    width: auto;
    div,
    button {
      width: auto;
    }
  }
`;
const Wrapper = styled.div`
 .bi-search {
    position: absolute;
    top: 0;
    z-index: 100;
    font-size: 14px;
    width: 100%;
    line-height: 40px;
    color: #687076;
  }

  .input-group {
    height: 100%;
    wdith: 100%;
  }

  input {
    padding: 0 14px 0 42px;
    border: 1px solid #d0d5dd !important;
    background: #ffffff;
    border-radius: 100px;
  }

  .join-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    background: #FBFCFD;
    border: 1px solid #D7DBDF;
    color: ${props.primary ? "#006ADC" : "#11181C"} !important;
    white-space: nowrap;

    &:hover,
    &:focus {
      background: #ECEDEE;
      text-decoration: none;
      outline: none;
    }

    i {
      display: inline-block;
      transform: rotate(90deg);
      color: #7E868C;
    }
  }
`;

return (
  <div className="row">
    <Actions>
      <Wrapper>
        <input
          type="number"
          className=".bi-search col"
          placeholder={state.amount}
          value={state.amount}
          onChange={(e) => onChangeAmount(e.target.value)}
        />
      </Wrapper>
      <FollowButtonWrapper>
        <Wrapper>
          <button
            disabled={context.loading}
            onClick={donate}
            className="join-button"
          >
            <i className="bi bi-heart"></i>
            Donate {state.amount} NEAR
          </button>
        </Wrapper>
      </FollowButtonWrapper>
    </Actions>
  </div>
);
