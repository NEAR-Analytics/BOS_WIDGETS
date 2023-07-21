State.init({
  value: null,
});

const compareWasm = () => {
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
        request_type: "view_code",
        finality: "final",
        account_id: props.accountId,
      },
    }),
  };
  asyncFetch(props.rpcUrl, options)
    .then((rpc_res) => {
      asyncFetch(`${props.apiHost}/ipfs/${props.cid}/wasm_code_base64`)
        .then((ipfs_res) => {
          State.update({
            value: rpc_res.data === ipfs_res.data.result.code_base64,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(rpc_res);
    })
    .catch((err) => {
      console.log(err);
    });
};

compareWasm();

return (
  <>
    {state.value === null
      ? "Loading..."
      : state.value
      ? "Approved"
      : "Not Approved"}
  </>
);
