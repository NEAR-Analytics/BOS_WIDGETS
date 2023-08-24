State.init({
  placement: props.placement || "top",
  value: null,
  error: false,
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
          if (rpc_res.body.result.code_base64 !== ipfs_res.body) {
            State.update({
              value: false,
            });
            return;
          } else {
            asyncFetch(`${props.apiHost}/api/ipfs/getTxHash`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: `{ "cid": "${props.cid}" }`,
            })
              .then((res) => {
                State.update({ value: res.body.tx_hash === props.deploy_tx });
              })
              .catch((err) => {
                console.log(err);
                State.update({ error: true });
              });
          }
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
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
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
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
    </SVG>
  );
};

return (
  <>
    {state.value === null ? (
      <Widget src={`${props.ownerId}/widget/SourceScan.Common.Spinner`} />
    ) : state.value === true ? (
      <OverlayTrigger
        key={state.placement}
        placement={state.placement}
        overlay={<Tooltip id={`tooltip-${placement}`}>{"Approved"}</Tooltip>}
      >
        <CheckIcon width={"20px"} height={"20px"} />
      </OverlayTrigger>
    ) : (
      <OverlayTrigger
        key={state.placement}
        placement={state.placement}
        overlay={
          <Tooltip id={`tooltip-${placement}`}>
            {state.error ? "Error" : "Not approved"}
          </Tooltip>
        }
      >
        <CrossIcon width={"32px"} height={"32px"} />
      </OverlayTrigger>
    )}
  </>
);
