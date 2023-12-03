const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "dontcare",
    method: "query",
    params: {
      request_type: "view_access_key_list",
      finality: "final",
      account_id: "zavodil.near",
    },
  }),
};

asyncFetch("https://rpc.mainnet.near.org", options).then((r) =>
  State.update({ keys: r.body.result.keys })
);

const getNear = (amount) => {
  let balance = new Big(amount).div(Big(10).pow(24));
  return balance.toFixed(5);
};

const printKey = (key) => {
  return key.access_key.permission.FunctionCall ? (
    <li>
      {key.access_key.permission["FunctionCall"].receiver_id}{" "}
      <small>[{key.public_key}]</small>
      <br />
      Fee Alowance:{" "}
      {getNear(key.access_key.permission["FunctionCall"].allowance)}
    </li>
  ) : (
    <></>
  );
};

if (state.keys == undefined) {
  return "Loading...";
}

return (
  <div>
    <ul>{state.keys.map((item) => printKey(item))}</ul>
    {/*JSON.stringify(state.keys)*/}
  </div>
);
