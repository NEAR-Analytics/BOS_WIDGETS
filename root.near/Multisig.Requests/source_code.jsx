const contract_id = props.contract_id;

const request_ids = Near.view(contract_id, "list_request_ids", {});

return (
  <div>
    Multisig contract: {contract_id}
    <div>
      {request_ids.map((request_id) => (
        <li key={request_id}>
          <Widget
            src="root.near/widget/Multisig.RequestItem"
            props={{ request_id, contract_id }}
          />
        </li>
      ))}
    </div>
  </div>
);
