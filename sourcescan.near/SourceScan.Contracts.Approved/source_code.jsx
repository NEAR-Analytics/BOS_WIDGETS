State.init({
  placement: props.placement || "top",
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
            value: rpc_res.body.result.code_base64 === ipfs_res.body,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

compareWasm();

const CheckIcon = (width, height) => {
  const SVG = styled.svg`
    width: ${width}
    height: ${height}
  `;

  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="w-6 h-6"
    >
      <path
        fill-rule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clip-rule="evenodd"
      />
    </SVG>
  );
};

const CrossIcon = (width, height) => {
  const SVG = styled.svg`
    width: ${width}
    height: ${height}
  `;

  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="w-6 h-6"
    >
      <path
        fill-rule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
        clip-rule="evenodd"
      />
    </SVG>
  );
};

return (
  <>
    {state.value === null ? (
      "Loading..."
    ) : state.value === true ? (
      <OverlayTrigger
        key={state.placement}
        placement={state.placement}
        overlay={
          <Tooltip id={`tooltip-${placement}`}>{"Wasm code matches"}</Tooltip>
        }
      >
        <CheckIcon width={"32px"} height={"32px"} />
      </OverlayTrigger>
    ) : (
      <OverlayTrigger
        key={state.placement}
        placement={state.placement}
        overlay={
          <Tooltip id={`tooltip-${placement}`}>{"Wasm code mismatch"}</Tooltip>
        }
      >
        <CrossIcon width={"32px"} height={"32px"} />
      </OverlayTrigger>
    )}
  </>
);
