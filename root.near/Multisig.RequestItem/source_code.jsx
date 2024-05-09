const contract_id = props.contract_id;
const request_id = props.request_id;

const request = Near.view(contract_id, "get_request", { request_id });
const confirmations = Near.view(contract_id, "get_confirmations", {
  request_id,
});

console.log(request, confirmations);

let repr = [];
for (let i = 0; i < request.actions.length; ++i) {
  const action = request.actions[i];
  switch (action.type) {
    case "Transfer":
      {
        let deposit = new Big(action.deposit).div(new Big(10).pow(24));
        repr.push(`Transfer ${deposit} N`);
      }
      break;
    case "FunctionCall":
      {
        let args = JSON.parse(atob(action.args));
        let gas = new Big(action.gas).div(new Big(10).pow(12));
        let deposit = new Big(action.deposit).div(new Big(10).pow(24));
        const metadata = Near.view(request.receiver_id, "ft_metadata", {});
        console.log(args);
        if (action.method_name === "ft_transfer") {
          repr.push(
            `Transfer ${new Big(args.amount).div(
              new Big(10).pow(metadata.decimals)
            )} of ${request.receiver_id} token to ${args.receiver_id}`
          );
        } else {
          repr.push(
            `Call ${request.receiver_id}'s method ${action.method_name}(${args}) with ${deposit} N deposit and ${gas} Tgas`
          );
        }
      }
      break;
    default:
      repr.push(JSON.stringify(action));
      break;
  }
}

console.log(JSON.stringify(repr));

function onConfirm() {
  Near.call(contract_id, "confirm", { request_id: request_id });
}

function onDelete() {
  Near.call(contract_id, "delete", { request_id: request_id });
}

return (
  <div>
    <p>Receiver: {request.receiver_id}</p>
    <p>{repr}</p>
    <p>Confirmed by: {confirmations}</p>
    <p>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onDelete}>Delete</button>
    </p>
  </div>
);
