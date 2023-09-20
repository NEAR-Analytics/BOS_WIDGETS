const user = "cryptogarik.near";
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

console.log(res.body);
const body = res.body;

const nearInYocto = 1000000000000000000000000;
const activeValidators = [];

for (let i = 0; i < res.body.result.current_validators.length; i++) {
  const validatorObj = res.body.result.current_validators[i];

  const accountId = validatorObj.account_id;
  const active = !validatorObj.is_slashed;
  const numExpectedBlocks = validatorObj.num_expected_blocks;
  const numExpectedChunks = validatorObj.num_expected_chunks;
  const numProducedBlocks = validatorObj.num_produced_blocks;
  const numProducedChunks = validatorObj.num_produced_chunks;
  const stake = validatorObj.stake;

  const props = {
    accountId,
    active,
    numExpectedBlocks,
    numProducedBlocks,
    numExpectedChunks,
    numProducedChunks,
    stake,
  };

  activeValidators.push(
    <Widget src={`${user}/widget/MainnetValidatorRow`} props={props} />
    // <tr>
    //   <td>{accountId}</td>
    //   <td>{(!isSlashed).toString()}</td>
    //   <td>
    //     {stake &&
    //       (stake / nearInYocto)
    //         .toFixed(0)
    //         .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1,")}
    //   </td>
    //   <td>{numExpectedBlocks}</td>
    //   <td>{numProducedBlocks}</td>
    //   <td>
    //     {numProducedBlocks &&
    //       ((numProducedBlocks / numExpectedBlocks) * 100).toFixed(0)}{" "}
    //     %
    //   </td>
    //   <td>{numExpectedChunks}</td>
    //   <td>{numProducedChunks}</td>
    //   <td>
    //     {numProducedChunks &&
    //       ((numProducedChunks / numExpectedChunks) * 100).toFixed(0)}{" "}
    //     %
    //   </td>
    // </tr>
  );
}

return (
  <table className="table table-striped">
    <tbody>
      <tr>
        <td>
          <h5>Pool</h5>
        </td>
        <td>
          <h5>Active</h5>
        </td>
        <td>
          <h5>Stake</h5>
        </td>
        <td>
          <h5>Expected blocks</h5>
        </td>
        <td>
          <h5>Produced blocks</h5>
        </td>
        <td>
          <h5>Uptime %</h5>
        </td>
        <td>
          <h5>Expected chunks</h5>
        </td>
        <td>
          <h5>Produced chunks</h5>
        </td>
        <td>
          <h5>Uptime %</h5>
        </td>
      </tr>{" "}
      {activeValidators}
    </tbody>
  </table>
);
