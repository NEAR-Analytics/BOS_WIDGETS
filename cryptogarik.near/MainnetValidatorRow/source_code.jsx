const accountId = props.accountId || "";
const isSlashed = props.isSlashed || true;
const numExpectedBlocks = props.numExpectedBlocks || 0;
const numExpectedChunks = props.numExpectedChunks || 0;
const numProducedBlocks = props.numProducedBlocks || 0;
const numProducedChunks = props.numProducedChunks || 0;
const stake = props.stake || "0";

const nearInYocto = 1000000000000000000000000;

return (
  <table className="table table-striped">
    <tbody>
      <tr>
        <td>{accountId}</td>
        <td>{(!isSlashed).toString()}</td>
        <td>{stake && (stake / nearInYocto).toFixed(0)}</td>
        <td>{numExpectedBlocks}</td>
        <td>{numProducedBlocks}</td>
        <td>
          {numExpectedBlocks &&
            ((numExpectedBlocks / numProducedBlocks) * 100).toFixed(0)}{" "}
          %
        </td>
        <td>{numExpectedChunks}</td>
        <td>{numProducedChunks}</td>
        <td>
          {numExpectedChunks &&
            ((numExpectedChunks / numProducedChunks) * 100).toFixed(0)}{" "}
          %
        </td>
      </tr>
    </tbody>
  </table>
);
