const receiver = "vegan-friends.sputnik-dao.near";

// let TG_TO_YOCTONEAR_FACTOR = Big("1000000000000"); // 1e12
// let TGAmount = Big(300);
// let _yoctoNearAmount = TGAmount * TG_TO_YOCTONEAR_FACTOR;

State.init({
  currentDonations: 0,
  totalDonations: 100,
  amount: 0.1,
});

const DonateView = styled.div`
background-color: #b6d0ab;
display: inline-flex;
flex-direction: column;
border-radius: 8px;
text-align: center;
padding: 5px;
color: #002c11;
`;

const DonateButton = styled.button`
  background-color: #002c11;
  color: white;
  border: none;
  padding: 10px;
  margin: 1.5em;
  margin-top: 0px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
`;

const DonateInput = styled.input`
    margin-right: 10px;
    font-size: 16px;
    border-radius: 5px;
    border-color: transparent;
    text-align: left;
    color: #002c11;
`;

const handleButtonClick = () => {
  const NEAR_TO_YOCTONEAR_FACTOR = Big("1000000000000000000000000"); // 1e24
  let nearAmount = Big(Math.round(state.amount * 1e5) / 1e5); // Convert NEAR to a smaller unit that can be handled as an integer
  let yoctoNearAmount = nearAmount * NEAR_TO_YOCTONEAR_FACTOR;

  Near.call([
    {
      contractName: "donation-near-social.near",
      methodName: "donate",
      args: {
        beneficiary: receiver,
      },
      deposit: yoctoNearAmount,
      gas: "200000000000000",
    },
  ]);
};

const childrenComp = props.childrenComp || <div>Vegan Friends DAO</div>;

const handleChange = (e) => {
  let amount = e.target.value > 0.1 ? e.target.value : 0.1;
  State.update({
    ...state,
    amount,
  });
};

return (
  <DonateView>
    {childrenComp}
    {props.name && <div>Hi {props.name}</div>}
    <div style={{ margin: "2.5em" }}>
      <DonateInput
        type="number"
        label="Near"
        min="0.1"
        defaultValue={state.amount}
        onChange={handleChange}
      />
      <span>Near</span>
    </div>
    <DonateButton id="donateButton">
      <button
        onClick={handleButtonClick}
        style={{ backgroundColor: "transparent", border: "none" }}
      >
        Donate to Vegan Friends DAO
      </button>
    </DonateButton>
  </DonateView>
);
