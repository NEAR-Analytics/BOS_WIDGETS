const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

const policy = Near.view(daoId, "get_policy");
console.log(accountId);

const groups = policy.roles
  .filter((role) => role.name === "council")
  .map((role) => {
    const group = role.kind.Group;

    return group;
  });
console.log(groups);

const check = groups.map((group) => {
  console.log(group);
  return group
    ? false
    : group.filter((address) => address === accountId).length > 0;
});
console.log(check);

State.init({
  receiver_id: "",
  amount: "",
});

const handleProposal = () => {
  const gas = 200000000000000;
  const deposit = 100000000000000000000000;
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "transfer proposal",
          kind: {
            Transfer: {
              token_id: "",
              receiver_id: state.receiver_id,
              amount: state.amount,
            },
          },
        },
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};

const onChangeRecipient = (receiver_id) => {
  State.update({
    receiver_id,
  });
};

const onChangeAmount = (amount) => {
  State.update({
    amount,
  });
};

return (
  <div className="mb-3">
    <div className="mb-2">
      Recipient:
      <input type="text" onChange={(e) => onChangeRecipient(e.target.value)} />
    </div>
    <div className="mb-3">
      Amount:
      <input type="number" onChange={(e) => onChangeAmount(e.target.value)} />
    </div>
    {!check && (
      <button className="btn btn-success" onClick={handleProposal}>
        Submit
      </button>
    )}
  </div>
);
