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
      repr.push(`Transfer ${action.amount}N`);
      break;
    case "FunctionCall":
      let args = atob(action.args);
      console.log(args);
      if (action.method_name === "ft_transfer") {
        repr.push(
          `Transfer ${args.amount} of ${request.receiver_id} token to ${args.receiver_id}`
        );
      } else {
        repr.push(
          `Call ${request.receiver_id}'s method ${action.method_name}(${args}) with ${action.deposit}N deposit and ${action.gas} gas`
        );
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
    {repr}
    <a onClick={onConfirm}>Confirm</a>
    <a onClick={onDelete}>Delete</a>
  </div>
);
