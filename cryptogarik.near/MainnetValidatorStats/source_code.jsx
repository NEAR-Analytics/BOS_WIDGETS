const nodeName = props.nodeName || "cryptogarik.poolv1.near";
const res = fetch("https://rpc.mainnet.near.org", {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  method: "POST",
  body: JSON.stringify({
    jsonrpc: "2.0",
    method: `validators`,
    params: [null],
    id: 1,
  }),
});

const body = res.body;

const nearInYocto = 1000000000000000000000000;
const nodeData = res.body.result.current_validators.filter(
  (item) => item.account_id === nodeName
)?.[0];

const accountId = nodeData.account_id;
const active = !nodeData.is_slashed;
const numExpectedBlocks = nodeData.num_expected_blocks;
const numExpectedChunks = nodeData.num_expected_chunks;
const numProducedBlocks = nodeData.num_produced_blocks;
const numProducedChunks = nodeData.num_produced_chunks;
const stake = nodeData.stake;

return (
  <table className="table table-striped">
    <tbody>
      <tr>
        <td>
          <h5>Pool</h5>
        </td>
        <td>
          <h5>{accountId}</h5>
        </td>
      </tr>
      <tr>
        <td>
          <h5>Active</h5>
        </td>
        <td>
          <h5>{active.toString()}</h5>
        </td>
      </tr>
      <tr>
        <td>
          <h5>Stake</h5>
        </td>
        <td>
          <h5>
            {stake &&
              (stake / nearInYocto)
                .toFixed(0)
                .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1,")}
          </h5>
        </td>
      </tr>
      <tr>
        <td>
          <h5>Expected blocks</h5>
        </td>
        <td>
          <h5>{numExpectedBlocks}</h5>
        </td>
      </tr>
      <tr>
        <td>
          <h5>Produced blocks</h5>
        </td>
        <td>
          <h5>{numProducedBlocks}</h5>
        </td>
      </tr>
      <tr>
        <td>
          <h5>Uptime</h5>
        </td>
        <td>
          <h5>
            {numProducedBlocks &&
              ((numProducedBlocks / numExpectedBlocks) * 100).toFixed(0)}{" "}
            %
          </h5>
        </td>
      </tr>
      <tr>
        <td>
          <h5>Expected chunks</h5>
        </td>
        <td>
          <h5>{numExpectedChunks}</h5>
        </td>
      </tr>
      <tr>
        <td>
          <h5>Produced chunks</h5>
        </td>
        <td>
          <h5>{numProducedChunks}</h5>
        </td>
      </tr>
      <tr>
        <td>
          <h5>Uptime %</h5>
        </td>
        <td>
          <h5>
            {numProducedChunks &&
              ((numProducedChunks / numExpectedChunks) * 100).toFixed(0)}{" "}
            %
          </h5>
        </td>
      </tr>
    </tbody>
  </table>
);
