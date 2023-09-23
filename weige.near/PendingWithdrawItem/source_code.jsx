const { item, config, chainId } = props;

const txHash = item.tx;

const arbExplorerBaseUrl = "https://arbiscan.io/tx/";

const genAction = (
  <Widget
    src="weige.near/widget/gen-claim-action"
    props={{
      config,
      txHash,
      onLoadExecute: (params) =>
        State.update({
          ...params,
        }),
    }}
  />
);

return (
  <tr>
    <td>{item.from}</td>

    <td>{item.to}</td>

    <td>{item.amount}</td>

    <td>{item.symbol}</td>

    <td>
      <a href={arbExplorerBaseUrl + item.tx} target="_blank">
        {item.tx.substring(0, 6) + "..." + item.tx.substring(58, 64)}
      </a>
    </td>

    <td>
      {!state.checkDone || state.isPending || !state.execute ? (
        <div
          title={
            chainId !== config.chains.l2.id
              ? 'Please switch to "Arbitrum" network'
              : 'Please wait for "Pending" status'
          }
        >
          Pending
        </div>
      ) : (
        <div
          style={{
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={state.execute}
        >
          {" "}
          Claim{" "}
        </div>
      )}
    </td>
    {genAction}
  </tr>
);
