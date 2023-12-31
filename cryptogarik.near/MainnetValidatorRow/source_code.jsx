const accountId = props.accountId || "";
const active = props.active || true;
const numExpectedBlocks = props.numExpectedBlocks || 0;
const numExpectedChunks = props.numExpectedChunks || 0;
const numProducedBlocks = props.numProducedBlocks || 0;
const numProducedChunks = props.numProducedChunks || 0;
const stake = props.stake || "0";

const nearInYocto = 1000000000000000000000000;

return (
  <tr>
    <td>{accountId}</td>
    <td>{(!!active).toString()}</td>
    <td>{stake && (stake / nearInYocto).toFixed(0)}</td>
    <td>{numExpectedBlocks}</td>
    <td>{numProducedBlocks}</td>
    <td>
      {numExpectedBlocks &&
        ((numProducedBlocks / numExpectedBlocks) * 100).toFixed(0)}{" "}
      %
    </td>
    <td>{numExpectedChunks}</td>
    <td>{numProducedChunks}</td>
    <td>
      {numExpectedChunks &&
        ((numProducedChunks / numExpectedChunks) * 100).toFixed(0)}{" "}
      %
    </td>
  </tr>
);
