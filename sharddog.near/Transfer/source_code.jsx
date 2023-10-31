// This is a demo component to transfer NEAR tokens using BOS component with a helper `transfer-near.near` contract as native transfers are not supported on BOS yet: https://t.me/neardev/29391
// Here is the contract itself: https://github.com/frol/transfer-near-contract; it is implemented with nesdie, so it only requires only 1 TGas attached to the function call.

const amount = props.amount ?? "1";
const receiver = "comic.sharddog.near";
const showReceiver = props.showReceiver ?? false;
const showAmount = props.showAmount ?? true;

State.init({
  amount: amount,
  receiver: receiver,
  showReceiver: showReceiver,
  showAmount: showAmount,
});
const transferNEAR = () => {
  const oneTeraGas = 1000000000000;
  const oneNEARInYoctoNEAR = 1000000000000000000000000;
  Near.call(
    "transfer-near.near",
    "transfer_near",
    state.receiver,
    oneTeraGas,
    state.amount * oneNEARInYoctoNEAR
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
    width: 100%;
  }

  .amount {
    padding: 0 14px 0 42px;
    border: 1px solid #d0d5dd !important;
    background: #ffffff;
    border-radius: 100px;
    width: 20px;
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
      color: #7E868C;
    }
  }
`;

return (
  <>
    {state.showAmount && (
      <div className="mb-2">
        Missed this panel?
        <br />
        Pay what you want (even zero) and then claim this panel through the link
        below.
        <br />
        <input
          type="number"
          className="amount"
          placeholder={state.amount}
          onChange={(e) => onChangeAmount(e.target.value)}
        />
      </div>
    )}
    {state.showReceiver && (
      <div className="mb-2">
        Receiver Address
        <input type="text" readOnly={true} placeholder={state.receiver} />
      </div>
    )}

    <Actions>
      <FollowButtonWrapper>
        <Wrapper>
          <button className="join-button" onClick={transferNEAR}>
            Send {state.amount} NEAR to {state.receiver}
          </button>
        </Wrapper>
      </FollowButtonWrapper>
    </Actions>
  </>
);
